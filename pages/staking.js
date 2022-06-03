import { useContext, useEffect } from "react";
import { GiPadlock } from "react-icons/gi";
import { GiCoins } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { TransactionContext } from "../context/TransactionContext";
import Navbar from "../components/NavBar";
import { useRouter } from "next/router";
import Link from "next/link";
import Loader from "../components/Loader";


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

const Staking = () => {

  const router = useRouter();
  const {
    currentAccount,
    formData,
    Causebalance,
    totalStakedAmount,
    isLoading,
    handleChange,
    stakeCause,
    isStaking

  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { amount } = formData;
    e.preventDefault();
    if (!amount) return;
    stakeCause();
  };

  
  useEffect(() => {
    if (!currentAccount) {
      router.push("/");
    }
  });

  return (
    <div className="bg-[#10122d] min-h-screen text-white">
      <Navbar />

      <div className=" mt-20 flex flex-col items-center md:mx-24 md:mt-28 md:flex-row md:justify-between ">
        
        <div className="blue-glassmorphism flex w-full  flex-col py-14 md:mx-2 md:w-full ">
          <h2 className="mb-8 flex flex-row items-center justify-center text-center  text-2xl text-white">
            <GiCoins fontSize={21} color="white" />
            <p className="ml-4 text-white">Your Account</p>
          </h2>


          <div className="mt-4 flex flex-row items-center justify-center">
            <div className="border-1 mx-2 flex flex-col justify-center rounded-full rounded   p-6  text-white">
              <div className="flex flex-row items-center  justify-center pb-4">
                <GiPadlock fontSize={21} color="orange" />
                <h3 className="ml-2 text-xl text-white">Staked Cause</h3>
              </div>

              <p>Amount : {totalStakedAmount} </p>
            </div>

            <div className="border-1 mx-2  flex flex-col justify-center rounded-full rounded  p-6  text-white">
              <div>
                <div className="flex flex-row items-center justify-center  pb-4">
                  <GiPayMoney fontSize={21} color="orange" />
                  <h3 className="ml-2 text-xl text-white">Total Rewards</h3>
                </div>
              </div>

              <p className="">Amount : {totalStakedAmount + (totalStakedAmount*0.01)} </p>
            </div>
          </div>

          <Link href="/stakes">
            <button className="mx-auto mt-10 w-[50%] rounded-full border-none bg-[#2952e3] p-3 hover:bg-[#2546bd] text-lg ">
              View Stakes ...
            </button>
          </Link>
        </div>

        <div className="blue-glassmorphism flex px-8 w-full flex-col py-6 md:mx-2 md:w-full">
          <h2 className="mb-8 text-center text-2xl text-white">
            Add to Liquidity
          </h2>

          <div className="ligth-blue-glassmorphism mx-auto mt-2 mb-4 flex w-[100%] flex-col rounded p-2 text-blue-400">
            <div className="mb-2 flex flex-row items-center justify-between">
              <p>Cause coins Staked</p>
              
              <p className="px-2 text-red-700 bg-green-100 rounded-full ">{totalStakedAmount?`${totalStakedAmount}`:null}</p>
            </div>

            <div className="flex flex-row items-center justify-between">
              <p>Staking Interest</p>
              <p> 10 % APY </p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between text-white">
            <h3 className="text-xl text-white">Stake amount</h3>

            <p>{currentAccount ? `Balance : ${Causebalance} ` : <p className="p-2 w-full animate-pulse"></p>}</p>
          </div>

          <div className="mt-0 flex flex-row items-center justify-between ">
            <select className="mr-2 bg-transparent px-2 text-sm text-white">
              <option value="cause">CAUSE</option>
            </select>
            <Input
              placeholder="Amount (CAUSE)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
          </div>

          {isStaking ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className=" mt-8 w-full cursor-pointer rounded-full border-none bg-[#2952e3] p-3 hover:bg-[#2546bd]	text-lg text-white "
            >
              Stake Amount
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staking;
