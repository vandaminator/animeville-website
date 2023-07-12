"use client";

import Image from "next/image";
import logo from "public/logo.svg";
import { TiThMenu } from "react-icons/ti";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// import Menu from "../Menu";
import Link from "next/link";

// Todo: Animate the menu on mobile devices properly on 36:0
function Navbar() {
  const toggleMenu = () =>
    document.getElementById("menu-comp")?.classList.toggle("open");
  return (
    <>
      <nav className="fixed z-20 w-full bg-jetblack">
        <TiThMenu
          className="h-[32px] w-[32px] text-deepred lg:hidden"
          onClick={toggleMenu}
        />
        <Link href={"/"} className="flex">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="logo"
          />
          <p className="font-logo text-4xl font-black text-gold max-lg:hidden">
            Animixstream
          </p>
        </Link>
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

      {/* <AnimatePresence>
        // {//Menu}
        {openMenu && (
          <motion.div
            className="absolute top-[100px] z-10 min-h-screen w-screen bg-lightjetblack sm:hidden"
            initial={{ x: "-100vh" }}
            animate={{ x: 0 }}
            exit={{ x: "-100vh" }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            <Menu />
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}

export default Navbar;
