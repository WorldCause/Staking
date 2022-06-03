import {useContext,useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import {MdAccountBalanceWallet} from "react-icons/md";
import {GiPadlock} from "react-icons/gi";
import {GiCoins} from "react-icons/gi";
import {GiPayMoney} from "react-icons/gi";
import { TransactionContext } from "../context/TransactionContext";
import Navbar from "../components/NavBar"
import { useRouter } from 'next/router'

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const StakingTitle=()=>(
    <div className="w-full  p-4 flex  flex-row justify-around items-center bg-blue text-blue-400 text-2xl rounded shadow-2 my-3">
    <p className="px-2 rounded ">Stake ID</p>

    <p className="px-2 rounded ">Stake Amount</p>

    <p className="px-2 rounded -ml-12 ">Stake Reward</p>

    <div className="w-20 p-4" ></div>

</div>
);

const StakeCard = ({amountStaked, reward, stakeId}) => {
  const { connectWallet, currentAccount,chainId, BnBbalance, Causebalance,accountStakes,totalAddressStake,unStakeCause } =  useContext(TransactionContext);
  const [isUnstaked, setIsUnstaked] = useState(false);
  const handleUnstake=async(id)=>{
    setIsUnstaked(true);
    unStakeCause(id);
  }

  return(<div className="w-full  p-4 flex  flex-row justify-around items-center bg-white text-black  rounded-lg shadow-2 my-3">
      <p className="px-4 w-20 rounded ">{stakeId}</p>

      <p className="px-2 rounded ">{amountStaked} CAUSE</p>

      <p className="px-2 rounded ">{reward} CAUSE</p>

      {!isUnstaked?
      <button className="bg-green-400 rounded-full px-4 hover:bg-green-700 hover:text-white " onClick={()=>handleUnstake(stakeId)} >Unstake</button>
      :
      <Loader />
      }
  </div>)
};

const StakingTotalCard=()=>{
  const { connectWallet, currentAccount, chainId, BnBbalance, Causebalance,accountStakes,totalAddressStakes } =
  useContext(TransactionContext);

  let apy=0.01;
  const totalReward=(totalAddressStakes*apy);;



 return( <div className="w-full p-4 flex justify-between bg-slate-800 rounded-3xl">

    <div className="w-[50%]">
      <p className="text-2xl">Total Stakes</p>
      <p className="p-2 text-xl">{totalAddressStakes}</p>
    </div>

    <div>
      <p className="text-2xl">Total Rewards</p>
      <p className="p-2  text-xl" >{totalReward}</p>
    </div>

    
  </div>)
}

const Loader = () => {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-700" />
    </div>
  )
};


const Staking=()=>{

  const { connectWallet, currentAccount, chainId, BnBbalance, Causebalance,accountStakes,totalAddressStakes } =
  useContext(TransactionContext);
    
    const handleSubmit = (e) => {
        const { addressTo,amount,message} =formData;
        e.preventDefault();
    
        if(!addressTo || !amount || !message) return;
     console.log("mama")
      };

      const getReward=(amount)=>{
        let apy=0.01;
        const totalReward=amount +(amount*apy);

        return totalReward
      }
 

      const router = useRouter()
      useEffect(()=>{
        if(!currentAccount){
          router.push('/')
        }
      })

      useEffect(() => {},[])

    return(
        <div className=" bg-[#10122d] min-h-screen text-white">
             <Navbar />
             
            <div className="w-full flex mt-10">
                <div className="flex w-[80%] mx-auto flex-col  rounded">
               < StakingTotalCard />
               <div className="w-full border-b mt-4 rounded-full bg-white "></div>
                <StakingTitle /> 
                {accountStakes?(
                  accountStakes.map((stake, idx) => {
                  if(stake.amount !==0){
                    return <StakeCard amountStaked={stake.amount}  reward={getReward(stake.amount)} key={idx} stakeId={stake.id}/>
                  }
                    
                  }
                ))
                :<p>Start Staking</p>}
                  
                </div>
            </div>
        </div>
    )
}

export default Staking;