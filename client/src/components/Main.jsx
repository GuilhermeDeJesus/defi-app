import React, {useState, useEffect, useContext} from 'react'
import { RiSettings3Fill } from 'react-icons/ri';
import { AiOutlineDown } from 'react-icons/ai';
import { TransactionContext } from '../../context/TransactionContext';

const style = {
    wrapper: `w-screen flex items-center justify-center mt-14`,
    content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
    formHeader: `px-2 flex justify-between`,
    transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl border border-[#20242A] hover:border-[#41444F] flex justify-between`,
    currencySelector: `flex w-1/4`,
    transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
    currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
    currencySelectorIcon: `flex items-center`,
    currencySelectorTicker: `mx-2`,
    currencySelectorArrow: `text-lg`,
    confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-2 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
}

export default function Main(){

    const {formData, handleChange, sendTransaction } = useContext(TransactionContext);
    const handleSubmit = async (e) => {
        const { addressTo, amount } = formData;
        e.preventDefault;

        if(!addressTo  || !amount) return;
        
        sendTransaction();
    }

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.formHeader}>
                    <div>
                        Swap
                    </div>
                    <div>
                        <RiSettings3Fill />
                    </div>
                </div>
                <div className={style.transferPropContainer}>
                    <input 
                        type='text' 
                        className={style.transferPropInput} 
                        placeholder='0.0' 
                        pattern='^[0.9]*[.,]?[0-9]*$'
                        onChange={e => handleChange(e, 'amount')}/>
                    <div className={style.currencySelector}>
                        <div className={style.currencySelectorContent}>
                            <div className={style.currencySelectorIcon}>
                                <img src='/ether.png' alt='eth logo' height={20} width={20} />
                            </div>
                            <div className={style.currencySelectorTicker}>
                                ETH
                            </div>
                            <AiOutlineDown className={style.currencySelectorArrow} />
                        </div>
                    </div>
                </div>
                <div className={style.transferPropContainer}>
                    <input 
                            type='text' 
                            className={style.transferPropInput} 
                            placeholder='0x...'
                            onChange={e => handleChange(e, 'addressTo')}/>
                    
                    <div className={style.currencySelector}>
                        
                    </div>
                </div>
                <div onClick={(e) => handleSubmit(e)} className={style.confirmButton}>
                    Confirm
                </div>
            </div>
        </div>
    );
}