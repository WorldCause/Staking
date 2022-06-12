import React, {  useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {MdAccountBalanceWallet} from "react-icons/md";
import {GiPadlock} from "react-icons/gi";
import {GiCoins} from "react-icons/gi";
import {GiPayMoney} from "react-icons/gi";
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    onChange={(e) => handleChange(e, name)}
    step="0.0001"
    value={value}
    className="my-2 rounded-full w-full md:w-[70%] p-4  outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { connectWallet,currentAccount,formData,setFormData,handleChange,sendTransaction,isLoading } = useContext(TransactionContext);
  const handleSubmit = (e) => {
    const { amount} =formData;
    e.preventDefault();

    if(!addressTo || !amount || !message) return;
    sendTransaction()
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col  md:p-12 px-4">
        
          
          
        {!currentAccount &&(
          <div className="flex md:mt-20  mt-40 justify-center flex-col md:mr-10">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Stake your Cause <br />
            
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
           Earn money with your Cause coins, with some APR of 12% 
          </p>
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row md:w-[40%] w-full justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <p className="text-white text-base font-semibold">Connect Wallet</p>
          </button>

          </div>
        )}
       

        {currentAccount &&(
        <div className="flex md:flex-row  flex-col md:mr-4 md:mt-0 mt-20 ">
          {/* <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#000" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">{currentAccount ?shortenAddress(currentAccount) : "Address"}</p>
                <p className="text-white font-semibold text-xl">Ethereum</p>
              </div>
            </div>
          </div> */}



          
<div className="p-5 md:w-full md:mr-4  w-full flex flex-col blue-glassmorphism ">
<h2 className="text-white text-2xl mb-8 text-center flex flex-row  justify-center items-center">
  <GiCoins fontSize={21} color="white"/>
 <p className="text-white ml-4">Amount Staked</p> 
  </h2>

<div className="flex flex-row w-full mt-2 mx-auto justify-center items-center ligth-blue-glassmorphism rounded text-blue-400 mb-4">
    <div className="flex flex-row flex-1 justify-around items-center  ">
          <p>Cause coins Staked</p>
          <p>{100000}</p>
    </div>

    <div className="flex flex-row flex-1 rounded-full  justify-around items-center">
          <p>Staking Interest</p>
          <p> 12 % APR </p>
    </div>
</div>

<div className="flex flex-row mt-4 justify-center items-center">


<div className="flex flex-col justify-center rounded-full border-1 bg-blue-600 mx-2  text-white rounded  p-6">
<div className="flex flex-row justify-center  pb-4 items-center">
<GiPadlock fontSize={21} color="orange"/>
<h3 className="text-white text-xl ml-2">Staked amount</h3>
</div>

<p>Amount  : {0}</p>
</div>


<div className="flex flex-col  justify-center rounded-full border-1 bg-blue-600 mx-2 text-white rounded  p-6">
<div>

<div className="flex flex-row justify-center pb-4  items-center">
<GiPayMoney fontSize={21} color="orange"/>
<h3 className="text-white text-xl ml-2">Your Rewards</h3>
</div>

</div>

<p className="">Amount : {0}</p>
</div>
            
</div>




</div>

<div className="p-5 md:w-full  md:mr-4 w-full flex flex-col blue-glassmorphism">
<h2 className="text-white text-2xl mb-8 text-center">Add to Liquidity</h2>

<div className="flex flex-col w-[100%] mt-2 mx-auto p-2 ligth-blue-glassmorphism rounded text-blue-400 mb-4">
    <div className="flex flex-row justify-between items-center mb-2">
          <p>Cause coins Staked</p>
          <p>{100000}</p>
    </div>

    <div className="flex flex-row justify-between items-center">
          <p>Staking Interest</p>
          <p> 12 % APR </p>
    </div>
</div>

<div className="flex flex-row justify-between items-center text-white">

<h3 className="text-white text-xl">Stake amount</h3>

<p>Balance : {0}</p>
</div>

<div className="flex flex-row justify-between items-center mt-0 ">
<select className="bg-transparent text-white px-2 text-sm mr-2">
  <option value="cause">CAUSE</option>
</select>
            <Input
              placeholder="Amount (CAUSE)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />
</div>
            



            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d47fc] hover:bg-amber-600	 rounded-full cursor-pointer mt-8"
              >
                Enter Amount
              </button>
            )}
</div>

        </div>
        )}
        
                  {/* <div className="ligth-blue-glassmorphism mx-auto  mb-4 flex w-[100%] flex-col rounded p-2 text-blue-400">
            <div className="mb-2 flex flex-row items-center justify-between">
              <p>Cause coins Staked</p>
              
              <p className="px-2 text-red-700 bg-green-100 rounded-full ">{totalStakedAmount?`${totalStakedAmount}`:null}</p>
            </div>

            <div className="flex flex-row items-center justify-between">
              <p>Staking Interest</p>
              <p> 10 % APY </p>
            </div>
          </div> */}

        
      </div>
    </div>
  );
};

export default Welcome;
