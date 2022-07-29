import React from 'react'
import ReactPlayer from 'react-player/lazy'
import Image from "next/image";
import { MdCancel } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../public/logo.png";
import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { TransactionContext } from "../context/TransactionContext";
const NavbarItem = ({ title, classProps }) => {
  return (
    <li className={`mx-4 cursor-pointer  rounded-full${classProps}`}>
      {title}
    </li>
  );
};

const mobileNav = () => {
  return (
    <div className="relative flex">
      {toggleMenu ? (
        <AiOutlineClose
          fontSize={28}
          className="cursor-pointer text-white md:hidden"
          onClick={() => setToggleMenu(false)}
        />
      ) : (
        <HiMenuAlt4
          fontSize={28}
          className="cursor-pointer text-white md:hidden"
          onClick={() => setToggleMenu(true)}
        />
      )}

      {toggleMenu && (
        <ul className="blue-glassmorphism animate-slide-in fixed top-0 -right-2 z-10 flex h-screen w-[70vw] list-none flex-col items-end justify-start rounded-md p-3 text-white shadow-2xl md:hidden">
          <li className="my-2 w-full text-xl">
            <AiOutlineClose
              fontSize={28}
              className="cursor-pointer text-white md:hidden"
              onClick={() => setToggleMenu(false)}
            />
          </li>

          {["Markets", "Exchange", "Tutorials", "Wallets"].map(
            (item, index) => (
              <NavbarItem
                key={item + index}
                title={item}
                classProps="text-lg my-2 text-white"
              />
            )
          )}
        </ul>
      )}
    </div>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { disconnectAccount, currentAccount, connectWallet } =
    useContext(TransactionContext);

  return (
    <nav className="relative flex  w-full items-center justify-between p-4">
      <div className="flex-initial md:flex-[0.75] ">
        <Image src={logo} alt="cause coin logo" />
      </div>

     {toggleMenu &&<div className="ligth-blue-glassmorphism fixed top-0 left-0 right-0  z-10 mx-auto mt-28 flex min-h-[58%] w-[46%] text-xl text-white">
        <div className="flex-col justify-center items-center px-4">
          <h3 className="text-gradient text-justify text-xl mt-2">
            How staking works
          </h3>
          <div className="mx- mt-6 flex ">
          <ReactPlayer  url="https://www.youtube.com/watch?v=vZ2UZdB07fo" />
          </div>
        </div>
        <button type="button" className="fixed top-4 right-5 " 
        onClick={()=>setToggleMenu(!toggleMenu)}
        >
          <MdCancel fontSize={24} color="#fff"/>
        </button>
      </div>}

      <ul className="mr-20 hidden list-none flex-row  py-2 w-[33%] justify-evenly text-white md:flex">
      <li className=" cursor-pointer  px-2 text-white mr-2">
        
        <Link href="https://worldcausecoin.com/">
            <button className=" mt-2 cursor-pointer border-none py-2 rounded-full  text-[#c6c7ca]  hover:text-white  ">
             Home
            </button>
          </Link>
      </li>
      
      <li className=" cursor-pointer  px-2 text-white ">
        
        <Link href="/staking">
            <button className=" mt-2 cursor-pointer border-none py-2 rounded-full  text-[#c6c7ca]  hover:text-white  ">
             Stake
            </button>
          </Link>
      </li>

      <li className="py-2 px-7 mr-2 text-white ">
        <button
          type="button"
          onClick={()=>setToggleMenu(!toggleMenu)}
          className="mt-2 cursor-pointer  border-none  text-[#c6c7ca]  hover:text-white "
        >
          What`s Staking
        </button>
      </li>


      <li>

        <button
          type="button"
          onClick={currentAccount ? disconnectAccount : connectWallet}
          className="mt-2 w-full cursor-pointer rounded-full border-none bg-[#2952e3] 	py-2 px-2 text-white hover:bg-[#2546bd] "
        >
          {!currentAccount ? "Connect Wallet" : "Disconnect Wallet"}
        </button>
      </li>


        <li className="mx-4 hidden cursor-pointer rounded-full bg-[#2952e3] py-2 px-7 text-white hover:bg-[#2546bd]">
          Disconnect
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
