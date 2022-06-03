import Image from "next/Image";
import { useRouter } from "next/router";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../public/logo.png";
import { useState, useContext, useEffect } from "react";
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

      <div className="ligth-blue-glassmorphism fixed top-0 left-0 right-0  z-10 mx-auto mt-28 flex min-h-[60%] w-[60%] text-xl text-white">
        <div className="flex justify-center p-4">
          <h3 className="text-gradient text-justify text-3xl">
            HOW STAKING WORKS
          </h3>
        </div>

        <button type="button" className="fixed top-4 right-10 ">
          X
        </button>
      </div>

      <ul className="mr-20 hidden list-none flex-row items-center justify-between text-white md:flex">
        {/* {["Network", "Wallet"].map(
            (item, index) => (
              <NavbarItem key={item + index} title={item} />
            )
          )} */}
        <button
          type="button"
          className="mt-2 mr-2 w-full cursor-pointer rounded-full border-none bg-[#2952e3] px-2	 px-4 text-white hover:bg-[#2546bd] "
        >
          How staking works
        </button>
        <button
          type="button"
          onClick={currentAccount ? disconnectAccount : connectWallet}
          className="mt-2 w-full cursor-pointer rounded-full border-none bg-[#2952e3]  p-2	 px-4 text-white hover:bg-[#2546bd] "
        >
          {!currentAccount ? "Connect Wallet" : "Disconnect Wallet"}
        </button>
        <li className="mx-4 hidden cursor-pointer rounded-full bg-[#2952e3] py-2 px-7 text-white hover:bg-[#2546bd]">
          Disconnect
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
