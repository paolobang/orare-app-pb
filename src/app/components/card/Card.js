import React from "react";

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
          <button className="btn btn-accent">Join Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
