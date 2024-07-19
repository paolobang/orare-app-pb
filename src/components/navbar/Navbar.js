"use client";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";


import Link from "next/link";
import Avatar from "../avatar/Avatar";
import logo from "../../../public/logo_orare.png";
import Image from "next/image";

const Navbar = ({ toggleSidebar }) => {
  const { data: session } = useSession();
  //console.log(session);

  
  return (
    <div
      className=" hero-overlay bg-opacity-60
  text-base-content sticky top-0 z-30 flex h-16 w-full justify-center transition-shadow duration-100 [transform:translate3d(0,0,0)] 
 
  "
    >
      <nav className="navbar w-full">
        <div className="flex flex-1 md:gap-1 lg:gap-2">
          <span
            className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
            data-tip="Menu"
            onClick={toggleSidebar}
          >
            <label aria-label="Open menu" className="btn btn-square btn-ghost">
              <svg
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </span>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex-0 btn btn-ghost gap-1 px-2 md:gap-2">
              <Image
                src={logo}
                alt="Logo"
                className="h-8 w-8 md:h-10 md:w-10"
              />
              <span
                className="text-gray-400"
                style={{ fontFamily: "Montserrat" }}
              >
                Oraré
              </span>
            </Link>
          </div>
        </div>
        {session?.user ? (
          <div className="flex-0">
            <div className=" hidden flex-none items-center lg:block">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <img src={session.user.image} alt="" />
                </div>
              </div>
              
              <button
                onClick={() => {
                  signOut({
                    callbackUrl:"/",
                  })
            
                }}
                className="btn btn-ghost drawer-button font-normal"
              >
                Salir
              </button>
            </div>
            
            <div className=" flex-none items-center lg:block">
              <Link
                href="/chat"
                className="btn btn-ghost drawer-button font-normal"
              >
                Diario
              </Link>
            </div>
            <div className="hflex-none items-center lg:block">
              <Link
                href="/events"
                className="btn btn-ghost drawer-button font-normal"
              >
                Eventos
              </Link>
            </div>
            <div className="hflex-none items-center lg:block">
              <Link
                href="/dashboard"
                className="btn btn-ghost drawer-button font-normal"
              >
                Dashboard
              </Link>
            </div>
          </div>
        ) : (
            <></>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
