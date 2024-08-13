"use client";
import React from "react";
import Link from "next/link";
const Card = ({ event }) => {
  return (
    <div className="card card-compact hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 shadow-xl">
      <figure>
        <img src={event.image} alt={event.title} />
      </figure>
      <div className="card-body text-stone-600">
        <h2 className="card-title">{event.title_description}</h2>
        <p className="text-base font-semibold">{event.title}</p>
        <div>
          <span className="font-bold ">Día: </span>
          {event.date}
          <span className="font-bold ml-4">Hora: </span>
          {event.hour}
        </div>
        <div>
          <span className="font-bold">Lugar: </span>
          {event.location}
        </div>
        <div className="card-actions justify-end">
          <Link
            className="btn text-white"
            href={event.url}
            style={{ backgroundColor: "rgb(153, 102, 204)" }}
          >
            Suscríbete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
