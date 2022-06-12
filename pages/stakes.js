import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import Navbar from "../components/NavBar";
import { useRouter } from "next/router";

const StakingTitle = () => (
  <div className="bg-blue  shadow-2 my-3  flex w-full flex-row items-center justify-around rounded p-4 text-2xl text-blue-400">
    <p className="rounded px-2 ">Stake ID</p>

    <p className="rounded px-2 ">Stake Amount</p>
    <p className="-ml-16 rounded px-2  ">Stake Period</p>

    <p className="-ml-12 rounded px-2 ">Stake Reward</p>

    <div className="w-20 p-4"></div>
  </div>
);

const StakeCard = ({ amountStaked, reward, stakeId, duration, dueDate }) => {
  const { unStakeCause } = useContext(TransactionContext);
  const [isUnstaked, setIsUnstaked] = useState(false);
  const [isDisable, setisDisable] = useState(true);

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
  return (
    <div className="shadow-2  my-3 flex  w-full flex-row items-center justify-around rounded-lg  bg-white p-4 text-black">
      <p className="w-20 rounded px-4 ">{stakeId}</p>

      <p className="rounded px-2 ">{amountStaked} CAUSE</p>

      <p className="rounded px-2 "> {duration + " Months"}</p>
      <p className="rounded px-2 ">{reward} CAUSE</p>

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
    connectWallet,
    currentAccount,
    chainId,
    BnBbalance,
    Causebalance,
    accountStakes,
    totalAddressStakes,
  } = useContext(TransactionContext);

  let apy = 0.01;
  const totalReward = totalAddressStakes * apy;

  return (
    <div className="flex w-full justify-between rounded-3xl bg-slate-800 p-4">
      <div className="w-[50%]">
        <p className="text-2xl">Total Stakes</p>
        <p className="p-2 text-xl">{totalAddressStakes}</p>
      </div>

      <div>
        <p className="text-2xl">Total Rewards</p>
        <p className="p-2  text-xl">{totalReward}</p>
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
    connectWallet,
    currentAccount,
    chainId,
    BnBbalance,
    Causebalance,
    accountStakes,
    totalAddressStakes,
  } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, message } = formData;
    e.preventDefault();

    if (!addressTo || !amount || !message) return;
    console.log("mama");
  };

  const getReward = (amount) => {
    let apy = 0.01;
    const totalReward = amount + amount * apy;

    return totalReward;
  };

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
          <div className="mt-4 w-full rounded-full border-b bg-white "></div>
          <StakingTitle />
          {accountStakes ? (
            accountStakes.map((stake, idx) => {
              if (stake.amount !== 0) {
                return (
                  <StakeCard
                    dueDate={stake.dueDate}
                    amountStaked={stake.amount}
                    duration={stake.duration}
                    reward={getReward(stake.amount)}
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
  );
};

export default Staking;
