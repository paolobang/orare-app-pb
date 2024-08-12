import React from "react";

const ChurchSchedule = ({ misa }) => {
  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        Horario de Misa
      </div>
      <div
        tabIndex={0}
        className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-full p-2 shadow"
        style={{ backgroundColor: "rgb(153, 102, 204)", width: "300px" }}
      >
        <div className="card-body">
          {misa.map((misa, index) => (
            <p key={index}>{misa}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChurchSchedule;
