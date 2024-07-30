const express = require("express");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const driver = neo4j.driver(
  "neo4j://35.205.214.62:7687",
  neo4j.auth.basic("neo4j", "12341234")
);
const session = driver.session();

app.post("/createUser", async (req, res) => {
  const { userId, email, postalCode, address, church } = req.body;
  try {
    const result = await session.run(
      `MATCH (c:Church {parroquia: $church})
       MERGE (u:User {userId: $userId})
       ON CREATE SET u.postalCode = $postalCode, u.address = $address, u.email = $email, u.userId = $userId
       MERGE (u)-[:GOES_TO]->(c)
       RETURN u, c, c.horarioDeMisas AS horarioDeMisas;`,
      { userId, email, postalCode, address, church }
    );
    res.json({
      user: result.records[0].get("u").properties,
      church: result.records[0].get("c").properties,
      horarioDeMisas: result.records[0].get("horarioDeMisas"),
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

app.get("/getChurch", async (req, res) => {
  const churchName = req.query.name;

  try {
    const result = await session.run(
      `
      MATCH (c:Church {parroquia: $churchName})<-[:HOLD_BY]-(e:Event)
      RETURN c.horario_de_misas AS horarioDeMisas, 
             collect({image: e.image, title: e.title}) AS events
      `,
      { churchName }
    );

    const response = result.records.map((record) => ({
      horarioDeMisas: record.get("horarioDeMisas"),
      events: record.get("events"),
    }));

    res.json(response[0]);
  } catch (error) {
    console.error("Error fetching church data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching church data." });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
