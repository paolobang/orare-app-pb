"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import Card from "../../components/card/Card";
import Layout from "../../components/layout/Layout";
import Search from "../../components/search/Search";
import ChurchSchedule from "../../components/church_schdule/ChurchSchedule";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [horarioDeMisas, setHorarioDeMisas] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [church, setChurch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session.user) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, "users", session.user.id));
          const userData = userDoc.data();
          setChurch(userData.church);

          if (userData && userData.church) {
            // Fetch church data from Neo4j
            console.log(userData.church);
            const churchRes = await axios.get(
              `http://localhost:3002/getChurch?name=${session.user.id}`
            );

            // Set the horarioDeMisas and events from the response
            const horarioDeMisasData = churchRes.data.horarioDeMisas || [];
            const eventsData = churchRes.data.events || [];
            const allEvents = churchRes.data.allEvents || [];

            setHorarioDeMisas(horarioDeMisasData);
            setEvents(eventsData);
            setAllEvents(allEvents);
          }
        } catch (error) {
          console.error("Error fetching church data:", error);
        }
      }
    };

    fetchData();
  }, [status, session]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.title_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAllEvents = allEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.title_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  console.log(horarioDeMisas, events, allEvents);
  return (
    <Layout>
      <div className="p-3">
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        {horarioDeMisas && horarioDeMisas.length > 0 && (
          <div>
            <span className="font-bold ">Tu Parroquia: </span>
            {church}
            <ul>
              <ChurchSchedule misa={horarioDeMisas} />
            </ul>
          </div>
        )}
        <h1 className="font-bold text-4xl my-7 text-stone-500 font-serif">
          Eventos Para Tí
        </h1>
        <ul className="not-prose grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEvents?.length > 0 ? (
            events.map((event, index) => <Card key={index} event={event} />)
          ) : (
            <p>No Hay Eventos Cerca de Tí!</p>
          )}
        </ul>
        <h1 className="font-bold text-4xl my-20 text-stone-500 font-serif ">
          Todos Eventos
        </h1>
        <ul className="not-prose grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAllEvents.map((event, index) => (
            <Card key={index} event={event} />
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Events;
