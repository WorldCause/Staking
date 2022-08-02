import { useContext, useEffect, useState } from "react";
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

const Btn = ({ time }) => {
  const { SetDuration } = useContext(TransactionContext);
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (e) => {
    setIsClicked(!isClicked);
    e.preventDefault();
    SetDuration(time);
  };
  return (
    <button
      onClick={(e)=>handleClick(e)}
      className={
        !isClicked
          ? `mx-2 rounded bg-slate-500 px-2 py-2`
          : `rounded bg-amber-500 px-4 py-2 `
      }
    >
      {time} Months at{" "}
      {time === 6
        ? "5.12%"
        : time === 12
        ? "8.30%"
        : time === 18
        ? "16.08%"
        : "30.60%"}
    </button>
  );
};

const Staking = () => {
  const router = useRouter();
  const {
    currentAccount,
    formData,
    Causebalance,
    totalStakedAmount,
    handleChange,
    stakeCause,
    isStaking,
    stakePeriod,
    calculateStakedAmount,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { amount } = formData;

    e.preventDefault();
    if (!amount || stakePeriod === null) {
      alert("add a duration period for staking")
      return;}
    stakeCause();
  };

  useEffect(() => {
    if (!currentAccount) {
      router.push("/");
    }
  });

  useEffect(() => {
    calculateStakedAmount()
  },[]);
  return (
    <div className="min-h-screen bg-[#10122d] text-white">
      <Navbar />

      <div className="mt-12 flex flex-col items-center md:mx-24 md:mt-28 md:flex-row md:justify-between ">
        <div className="blue-glassmorphism flex w-full  flex-col py-14 md:mx-2 md:w-full ">
          <h2 className="mb-8 flex flex-row items-center justify-center text-center  text-2xl text-white">
            <GiCoins fontSize={21} color="white" />
            <p className="ml-4 text-white">Total Locked Stakes</p>
          </h2>

          <div className="mt-4 flex flex-row items-center justify-center">
            <div className="border-1 mx-2 flex flex-col justify-center  rounded   p-6  text-white">
              <div className="flex flex-row items-center  justify-center pb-4">
                <GiPadlock fontSize={21} color="orange" />
                <h3 className="ml-2 text-xl text-white">Staked Cause</h3>
              </div>

              <p className="text-center">Amount : {totalStakedAmount} </p>
            </div>

            <div className="border-1 mx-2  flex flex-col justify-center  rounded  p-6  text-white">
              <div>
                <div className="flex flex-row items-center justify-center  pb-4">
                  <GiPayMoney fontSize={21} color="orange" />
                  <h3 className="ml-2 text-lg text-white">Average Staking Period </h3>
                </div>
              </div>

              <p className="text-center">
                Months : {24}
              </p>
            </div>
          </div>

          <Link href="/stakes">
            <button className="mx-auto mt-10 w-[50%] rounded-full border-none bg-[#2952e3] p-3 text-lg hover:bg-[#2546bd] ">
              View Stakes ...
            </button>
          </Link>
        </div>

        <div className="blue-glassmorphism flex w-full flex-col px-8 py-6 md:mx-2 md:w-full">
          <h2 className="mb-8 text-center text-2xl text-white">
            Add to Liquidity
          </h2>


          <div className="flex flex-row items-center justify-between text-white">
            <h3 className="text-xl text-white">Stake amount</h3>

            <div>
              {currentAccount ? (
                <p>{`Balance : ${Causebalance} `}</p>
              ) : (
                <p className="w-full animate-pulse p-2"></p>
              )}
            </div>
          </div>

          <div className="my-2 ">
            <p className="my-2 text-lg text-slate-300">Staking Period</p>
            <div className="flex  items-center justify-around ">
              <Btn time={6} />
              <Btn time={12} />
              <Btn time={18} />
              <Btn time={24} />
            </div>
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
              onClick={(e)=>handleSubmit(e)}
              className=" mt-8 w-full cursor-pointer rounded-full border-none bg-[#2952e3] p-3 text-lg	text-white hover:bg-[#2546bd] "
            >
              Stake Amount
            </button>
          )}
        </div>
      </div>
      <p className="my-8 text-center  text-xl   text-slate-400">
        The longer you stake the more the APY
      </p>
    </div>
  );
};

export default Staking;
