"use client";
import React from "react";
import { useSession } from "next-auth/react";

function DashboardPage() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {session?.user ? (
        <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
          <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Hace 2 días</span>
            </div>
            <div className="mt-6 w-fit mx-auto">
              <img
                src={session.user.image}
                className="rounded-full w-28 "
                alt="profile picture"
              />
            </div>

            <div className="mt-8 ">
              <h2 className="text-white font-bold text tracking-wide">
                {session.user.email} <br /> {session.user.name}{" "}
              </h2>
            </div>
            <p className="text-emerald-400 font-semibold mt-2.5">Activo</p>

            <div className="h-1 w-full bg-black mt-8 rounded-full">
              <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
            </div>
            <div className="mt-3 text-white text-sm">
              <span className="text-gray-400 font-semibold">Completar:</span>
              <span>40%</span>
            </div>
          </section>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
}

export default DashboardPage;
