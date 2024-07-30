"use client";
import React from "react";
import Link from "next/link";
import Avatar from "../avatar/Avatar";
import { useSession } from "next-auth/react";

const Sidebar = ({ isSidebarOpen }) => {
  const { data: session } = useSession();
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-base-100 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out w-80`}
    >
      {session?.user && (
        <div className="bg-base-100 sticky top-0 z-20 flex items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex ">
          <Link href="/home" className="flex-0 btn btn-ghost px-2">
            <Avatar name={session.user.email} />
          </Link>
        </div>
      )}
      <div className="h-4"></div>
      <ul className="menu px-4 py-0">
        <li>
          <Link href="#">I'm so Glad</Link>
          <Link href="#">I'm so Sad</Link>
          <Link href="#">I'm so Numb</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
