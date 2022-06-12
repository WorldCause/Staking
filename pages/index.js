import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Navbar from "../components/NavBar";
import { useRouter } from "next/router";
import Image from "next/image";
import anime from "../public/updated-staking.gif";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    step="0.0001"
    value={value}
    className="white-glassmorphism my-2 w-full rounded-full border-none  bg-transparent p-4 text-sm text-white outline-none md:w-[70%]"
  />
);

const Home = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);
  const router = useRouter();
  useEffect(() => {
    if (currentAccount) {
      router.push("/staking");
    }
  });

  return (
    <div className="">
      <div className="relative min-h-screen  bg-[#10122d] bg-gear ">
        <Navbar />

        <div className=" w-full  py-12">
          <div className="flex  py-12 md:flex  md:items-center md:justify-around ">
            <div className=" flex flex-col justify-center px-4  md:mr-10">
              <h1 className="text-gradient py-1 text-5xl text-white sm:text-5xl">
                Stake your Cause <br />
              </h1>
              <p className="mt-5 w-11/12 text-left text-base font-light text-white md:w-9/12">
                Grow your coins by earning APY of 5.12% to 30.60% when you
                stake.
              </p>
              <button
                type="button"
                onClick={connectWallet}
                className="my-5 flex w-full cursor-pointer flex-row items-center justify-center rounded-full bg-[#2952e3] p-3 hover:bg-[#2546bd] md:w-[40%]"
              >
                <p className="text-base font-semibold text-white">
                  Connect Wallet
                </p>
              </button>
            </div>

            <div className="flex-[0.5] ">
              <Image src={anime} className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
