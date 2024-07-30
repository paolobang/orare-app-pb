"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import Card from "../../components/card/Card";
import Layout from "../../components/layout/Layout";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [horarioDeMisas, setHorarioDeMisas] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session.user) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", session.user.id));
          const userData = userDoc.data();

          if (userData && userData.church) {
            // Fetch church data from Neo4j
            console.log(userData.church);
            const churchRes = await axios.get(
              `http://localhost:3002/getChurch?name=${userData.church}`
            );

            // Set the horarioDeMisas and events from the response
            const horarioDeMisasData = churchRes.data.horarioDeMisas || [];
            const eventsData = churchRes.data.events || [];

            setHorarioDeMisas(horarioDeMisasData);
            setEvents(eventsData);
          }
        } catch (error) {
          console.error("Error fetching church data:", error);
        }
      }
    };

    fetchData();
  }, [status, session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  console.log(horarioDeMisas, events);
  return (
    <Layout>
      <div className="p-3">
        {horarioDeMisas && horarioDeMisas.length > 0 && (
          <div>
            <h1>Horario de Misas</h1>
            <ul>
              {horarioDeMisas.map((misa, index) => (
                <li key={index}>{misa}</li>
              ))}
            </ul>
          </div>
        )}
        <h1>Events</h1>
        <ul className="not-prose grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event, index) => (
            <Card key={index} event={event} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Events;
