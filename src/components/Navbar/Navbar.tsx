"use client";

import Image from "next/image";
import logo from "public/logo.svg";
import { TiThMenu } from "react-icons/ti";
import { MdSearch } from "react-icons/md";

function Navbar() {
  return (
    <nav>
      <TiThMenu className="h-[32px] w-[32px] text-deepred" />
      <Image src={logo} alt="logo" width={32} height={32} className="logo" />
      <div className="grid w-1/3 grid-cols-[32px_1fr] gap-1 rounded-md bg-gold p-1 text-jetblack">
        <label htmlFor="search-input">
          <MdSearch className="h-[32px] w-[32px]" />
        </label>
        <input
          type="text"
          id="search-input"
          name="search-input"
          className="w-full border-none bg-inherit outline-none"
        />
      </div>
    </nav>
  );
}

export default Navbar;
