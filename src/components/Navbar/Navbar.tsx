"use client";

import Image from "next/image";
import logo from "public/logo.svg";
import { TiThMenu } from "react-icons/ti";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import Menu from "../Menu";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu((prev) => !prev);
  return (
    <>
      <nav className="relative">
        <TiThMenu
          className="h-[32px] w-[32px] text-deepred lg:hidden"
          onClick={toggleMenu}
        />
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
      {/* Menu */}
      {openMenu && (
        <motion.div
          className="absolute top-[100px] z-10 min-h-screen w-full"
          initial={{ x: "-100vh" }}
          animate={{ x: 0 }}
          exit={{ x: "100vh" }}
          transition={{type: "tween"}}
        >
          <Menu />
        </motion.div>
      )}
    </>
  );
}

export default Navbar;
