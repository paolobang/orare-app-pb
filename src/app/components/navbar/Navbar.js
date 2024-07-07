import React from "react";

const Navbar = () => {
  return (
    <div
      className="
  bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] 
  shadow-sm
  "
    >
      <nav className="navbar w-full">
        <div className="flex flex-1 md:gap-1 lg:gap-2"></div>
        <div className="flex-0">
          <div className="hidden flex-none items-center lg:block">
            <a className="btn btn-ghost drawer-button font-normal">comp</a>
          </div>
          <div className="hidden flex-none items-center lg:block">
            <a className="btn btn-ghost drawer-button font-normal">nom</a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
