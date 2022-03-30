import React, { useEffect, useState } from "react";
import { getERC20TokenAccountBalance } from "../../../Resourses/Services/polygonMaticService";
import './tokenItem.css'

const TokenItem = ({ token, current_account, parms,  filter= () => false }) => {
    const [tokenBalance, setTokenBalance] = useState(0)
    const web3 = parms.web3;
    const setWeb3 = parms.setWeb3;
    
    // The minimum ABI required to get the ERC20 Token balance
    const minABI = [
        // balanceOf
        {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
        },
    ];
    
    
    
    const getBalance = async (contract) => {
        const balance = await contract.methods.balanceOf(current_account).call(); // 29803630997051883414242659
        if(balance){
            const format_balance = web3.utils.fromWei(balance); // 29803630.997051883414242659
            setTokenBalance(format_balance);
            console.log(format_balance);
        }
    }
  
    

    useEffect(
    () => {
        const getTokenBalance = async () => {
            const contract = new web3.eth.Contract(minABI, token.address);
            await getBalance(contract);
            //Call for API end point on mumbai or Matic mainnet that enables until 5 tx/s for a free account. 
            //Key is set up in config.js
            //const token_balance = await getERC20TokenAccountBalance(current_account, token.address);
        }
        if (token && current_account) {
            getTokenBalance()
        }
    }, [token, current_account])

    
    if (filter(tokenBalance)) {
        return null
    }

    return <>
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img className="token-image" style={{ backgroundImage: `url(${token?.logoURI})` }} />

                </div>
                <div className="flip-card-back">
                    <h3>{token?.name}</h3>
                    <h3>{token?.symbol}</h3>
                    <p>Balance</p>
                    <p>{tokenBalance}</p>
                </div>
            </div>
            <h3> {token?.name} </h3>
            <p className="title"> {token?.symbol} </p>
            <h3>Balance</h3>
            <p> {tokenBalance} </p>
            {/* <a href="#"><i class="fa fa-dribbble"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a> */}
            <p><button>Details</button></p>
        </div>
    </>
}

export default TokenItem