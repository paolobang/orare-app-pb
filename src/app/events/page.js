import React from "react";
import Card from "../components/card/Card";
import Navbar from "../components/navbar/Navbar";

const Events = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const events = await res.json();
  const slicedEvents = events.slice(0, 4);

  return (
    <>
      <Navbar />
      <h1>Events</h1>
      <ul className="not-prose grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {slicedEvents.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </ul>
    </>
  );
};

export default Events;
