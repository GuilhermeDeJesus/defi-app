import React, {useState, useEffect, useContext} from 'react'
import { FiArrowUpRight } from 'react-icons/fi';
import { AiOutlineDown } from 'react-icons/ai';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { TransactionContext } from '../../context/TransactionContext';

const style = {
    wrapper: `p-4 w-screen flex justify-between items-center`,
    headerLogo: `flex w-1/4 items-center justify-start`,
    nav: `flex justify-center items-center`,
    navItemsCaontainer: `flex bg-[#181B1F] rounded-3xl`,
    navitem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
    activeNavItem: `bg-[#20242A]`,
    buttonsContainer: `flex w-1/4 justify-end items-center`,
    button: `flex items-center bg-[#191B1f] rounded-2xl mx-2 text-[0.9rem] font-semibold cursor-pointer`,
    buttonPadding: `p-2`,
    buttonTextContainer: `h-8 flex items-center`,
    buttonIconContainer: `flex items-center justify-center w-8 h-8`,
    buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4f90EA]`
}

export default function Header(){
    
    const {connectWallet, currentAccount} = useContext(TransactionContext);
    const [selectedNav, setSelectedNav] = useState('swap');
    console.log({connectWallet, currentAccount});
    
    return (
        <div className={style.wrapper}>
            <div className={style.headerLogo}>
                <img src='/uniswap.png' alt='uniswap' height={40} width={40} />
            </div>
            <div className={style.nav}>
                <div className={style.navItemsCaontainer}>
                    <div onClick={() => setSelectedNav('swap')}
                        className={`${style.navitem} ${selectedNav === 'swap' && style.activeNavItem}`}>
                        Swap
                    </div>
                    <div onClick={() => setSelectedNav('pool')}
                        className={`${style.navitem} ${selectedNav === 'pool' && style.activeNavItem}`}>
                        Pool
                    </div>
                    <div onClick={() => setSelectedNav('vote')}
                        className={`${style.navitem} ${selectedNav === 'vote' && style.activeNavItem}`}>
                        Vote
                    </div>
                    <a href='https://info.uniswap.org/#/' target='_blank' rel='norefererr'>
                        <div className={style.navitem}>Charts <FiArrowUpRight/> </div>
                    </a>
                </div>
            </div>
            <div className={style.buttonsContainer}>
                <div className={`${style.button} ${style.buttonPadding}`}>
                    <div className={style.buttonIconContainer}>
                        <img src='/ether.png' alt='eth logo' header={40} width={40} />
                    </div>
                    <p>Ethereum</p>
                    <div className={style.buttonIconContainer}>
                        <AiOutlineDown />
                    </div>
                </div>
                {currentAccount ? (
                    <div className={`${style.button} ${style.buttonPadding}`}>
                        <div className={style.buttonTextContainer}>
                            {currentAccount}
                        </div>
                    </div>
                ) : (
                    <div className={`${style.button} ${style.buttonPadding}`} onClick={() => connectWallet()}>
                        <div className={`${style.buttonAccent} ${style.buttonPadding}`}>
                            Connect Wallet
                        </div>
                    </div>
                )}
                
                <div className={`${style.button} ${style.buttonPadding}`}>
                    <div className={`${style.buttonIconContainer} mx-2`}>
                        <HiOutlineDotsVertical />
                    </div>
                </div>
            </div>
        </div>
    );
}