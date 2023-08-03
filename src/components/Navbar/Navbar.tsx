"use client";

import Image from "next/image";
import logo from "public/logo.svg";
import { TiThMenu } from "react-icons/ti";
import { MdSearch } from "react-icons/md";
import { HiHome } from "react-icons/hi";
import {FaAngleLeft} from "react-icons/fa"
import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// import Menu from "../Menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const toggleMenu = () =>
    document.getElementById("menu-comp")?.classList.toggle("open");

  const handleEnter = () => {
    const searchPath = `/search?query=${search}`;
    router.push(searchPath);
  };

  const handleHome = () => router.push("/");
  const handleBack = () => router.back()

  return (
    <>
      <nav className="fixed z-20 flex w-full bg-jetblack lg:justify-around lg:space-x-6">
        <TiThMenu
          className="h-[32px] w-[32px] text-deepred lg:hidden"
          onClick={toggleMenu}
        />

        <div className="flex gap-4">
          <button className="max-lg:hidden" onClick={handleBack}>
            <FaAngleLeft size={"24px"} className="fill-deepred"/>
          </button>
          <button className="max-lg:hidden" onClick={handleHome}>
            <HiHome size={"24px"} className="fill-deepred"/>
          </button>
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
        </div>

        <div className="grid w-1/3 grid-cols-[32px_1fr] gap-1 rounded-md bg-gold p-1 text-jetblack">
          <label htmlFor="search-input">
            <MdSearch className="h-[32px] w-[32px]" />
          </label>
          <input
            type="text"
            id="search-input"
            name="search-input"
            className="w-full border-none bg-inherit outline-none placeholder:text-jetblack"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleEnter();
            }}
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
