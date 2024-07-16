"use client";
import React from "react";
import Link from "next/link";

const Card = ({ event }) => {
  return (
    <div className="card card-compact hover:bg-base-200 transition-all duration-200 hover:-translate-y-1 shadow-xl">
      <figure>
        <img src={event.url} alt={event.title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Event!</h2>
        <p>{event.title}</p>
        <div className="card-actions justify-end">
          <Link
            className="btn btn-accent"
            href={{
              pathname: `/events/detail/${event.id}`,
              query: { event: JSON.stringify(event) },
            }}
          >
            Join Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
