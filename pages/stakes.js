import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Navbar from "../components/NavBar";
import { useRouter } from "next/router";
import { IoMdInformationCircleOutline} from "react-icons/io";
import Countdown from "react-countdown";


const StakingTitle = () => (
  <div className=" shadow-2 my-2  px-4  w-full flex items-center justify-around rounded p-4 text-xl text-blue-400">
    <p className="rounded mx-2 pl-  text-center w-3/6">Stake ID</p>

    <p className="rounded mx-3  text-center pl-2 w-4/6">Stake Amount</p>
    <p className="pl-8 mx-3 rounded  text-left w-2/6">Next Unlock</p>

    <p className=" mx-2 rounded  text-center w-4/6">Stake Reward</p>

    <div className="w-1/5 p-4 mx-2   text-right flex justify-right">
      <p className="text-center" title="Unstake button will be active when staking period elapses">
    <IoMdInformationCircleOutline fontSize={24} color="white"/>
      </p>
    </div>
  </div>
);

const StakeCard = ({ amountStaked, reward, stakeId, duration, dueDate }) => {
  const { unStakeCause } = useContext(TransactionContext);
  const [isUnstaked, setIsUnstaked] = useState(false);
  const [isDisable, setisDisable] = useState(true);
  const time = new Date();
 let timeStamp= Math.floor(Date.now()/1000);

  let m=((dueDate)-(timeStamp))
  const handleUnstake = async (id) => {
    setIsUnstaked(true);
    unStakeCause(id);
  };

  useEffect(() => {
    const now = Date.now();
    if (Math.floor(now / 1000) >= dueDate) {
      setisDisable(false);
    }
  }, []);

  const renderer = ({ days,hours, minutes,completed }) => {
    if (completed) {
      return <></>
    } else {
       return <span className="text-black text-center text-lg">{days ?days + " days ":""} {" "} {hours ?hours +" hrs":""} </span>;
     
  
    }
  };
  return (
    <div className="  my-3 flex  w-full flex-row items-center justify-evenly rounded-lg  bg-white py-4 text-black">
      <p className=" rounded px-2  text-center w-1/6">{stakeId}</p>

      <p className="rounded  text-center w-1/6">{amountStaked} CAUSE</p>

      <p className="rounded px-2  text-center w-1/6">
         <Countdown date={Date.now() + m*1000}  renderer={renderer}/> 
         </p>
      <p className="rounded px-2   text-center w-1/6">{reward.toString().slice(0,6)} CAUSE</p>

      {!isUnstaked ? (
        <button
          disabled={isDisable}
        
          className={
            !isDisable
              ? `rounded-full bg-green-400 px-4 hover:bg-green-700 hover:text-white `
              : "rounded-full bg-slate-400 px-4"
          }
          onClick={() => handleUnstake(stakeId)}
        >
          Unstake
        </button>
      ) : (
        <Loader />
      )}
    </div>
  );
};

const StakingTotalCard = () => {
  const {
    totalAddressStakes,
    addressRewards,
    calculateStakedRewards,
    totalStakedAmount
  } = useContext(TransactionContext);

  useEffect(() => {
    calculateStakedRewards()
  }, []);



  return (
    <div className="flex w-full   justify-end rounded-xl bg-[#282d64da] p-4">

      <div className="mr-8 flex-col  order-last justify-center border-l-4 border-indigo-500 pl-8 ">
        <p className="text-xl text-[#c6c7ca] " title="Total cause locked">Total Cause Staked</p>
        <p className="py-1 text-lg text-right">{totalStakedAmount}</p>
      </div>

      <div className="mr-8 flex-col  justify-center border-r-4 border-indigo-500 pr-8 ">
        <p className="text-xl text-[#c6c7ca] ">Your Stakes</p>
        <p className="py-1 text-lg text-right">{totalAddressStakes}</p>
      </div>

      <div className="flex-col items-center justify-center pr-8 ">
        <p className="text-xl text-[#c6c7ca] ">Your Rewards</p>
        <p className="py-1  text-lg text-right">{addressRewards}</p>
      </div>
    </div>
  );
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-red-700" />
    </div>
  );
};

const Staking = () => {
  const {
    currentAccount,
    accountStakes,
  } = useContext(TransactionContext);

  const router = useRouter();
  useEffect(() => {
    if (!currentAccount) {
      router.push("/");
    }
  });

  useEffect(() => {}, []);

  return (
    <div className=" min-h-screen bg-[#10122d] text-white">
      <Navbar />
      <div className="mt-10 flex w-full">
        <div className="mx-auto flex w-[80%] flex-col  rounded">
          <StakingTotalCard />
          <StakingTitle />
          <div className="overflow-y-auto">
          {accountStakes ? (
            accountStakes.map((stake, idx) => {
              if (stake.id !== 0) {
                return (
                  <StakeCard
                    dueDate={stake.dueDate}
                    amountStaked={stake.amount}
                    duration={stake.duration}
                    reward={stake.reward}
                    key={idx}
                    stakeId={stake.id}
                  />
                );
              }
            })
          ) : (
            <p>Start Staking</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
