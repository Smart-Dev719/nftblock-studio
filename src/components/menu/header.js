import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { header } from 'react-bootstrap';
import { Link } from '@reach/router';
import { useSelector } from "react-redux";
import useOnclickOutside from "react-cool-onclickoutside";

import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import Web3 from "web3";
import R4P from '../../abis/R4p.json';
const tokenAddress = '0xCea6660950676a39AE9724686fdf7B44316E429E';
setDefaultBreakpoints([{ xs: 0 }, { l: 1199 }, { xl: 1200 }]);

const NavLink = props => (
	<Link
		{...props}
		getProps={({ isCurrent }) => {
			// the object returned here is passed to the
			// anchor element's props
			return {
				className: isCurrent ? 'active' : 'non-active',
			};
		}}
	/>
);

const Header = props => {
	const {
		metamaskConnected,
		setMetamaskConnected,
		setAccount,
		connectToMetamask,
	} = props;

	const { account } = useSelector(state => state.accounts);
	const [openMenu, setOpenMenu] = React.useState(false);
	const [openMenu1, setOpenMenu1] = React.useState(false);
	const [openMenu2, setOpenMenu2] = React.useState(false);
	const [openMenu3, setOpenMenu3] = React.useState(false);
	const handleBtnClick = () => {
		setOpenMenu(!openMenu);
	};
	const handleBtnClick1 = () => {
		setOpenMenu1(!openMenu1);
	};
	const handleBtnClick2 = () => {
		setOpenMenu2(!openMenu2);
	};
	const handleBtnClick3 = () => {
		setOpenMenu3(!openMenu3);
	};
	const closeMenu = () => {
		setOpenMenu(false);
	};
	const closeMenu1 = () => {
		setOpenMenu1(false);
	};
	const closeMenu2 = () => {
		setOpenMenu2(false);
	};
	const closeMenu3 = () => {
		setOpenMenu3(false);
	};
	const ref = useOnclickOutside(() => {
		closeMenu();
	});
	const ref1 = useOnclickOutside(() => {
		closeMenu1();
	});
	const ref2 = useOnclickOutside(() => {
		closeMenu2();
	});
	const ref3 = useOnclickOutside(() => {
		closeMenu3();
	});

	const handleTransfer = async address => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const tokenData = new web3.eth.Contract(R4P, tokenAddress);
		console.log('token contract', tokenData, address);
		const balenceof = await tokenData.methods.balanceOf(address).call();
		console.log('balance', balenceof);
		const decimal = await tokenData.methods.decimals().call();
		console.log('decimals', decimal);
		let transferdAddress = '0x30989894b6Af41a2BFD7112B70c024678E796E59';
		let amountTotal = 12 * 1e18;
		// const trandferToken = await tokenData.methods
		// 	.mint(transferdAddress, amountTotal)
		// 	.send({ from: address });
		// console.log('transferd', trandferToken);
		const owner = '0x30989894b6Af41a2BFD7112B70c024678E796E59';
		// const transferData = await tokenData.methods
		// 	.transfer(owner, 1000000000000000)
		// 	.send({ from: address })
		// 	.on('confirmation', () => {
		// 		console.log('transfer');
		// 	})
		// 	.on('error', err => {
		// 		console.log('error', err);
		// 	});
		// console.log(transferData);
	};

	const [showmenu, btn_icon] = useState(false);
	useEffect(() => {
		const header = document.getElementById('myHeader');
		const totop = document.getElementById('scroll-to-top');
		const sticky = header.offsetTop;
		const scrollCallBack = window.addEventListener('scroll', () => {
			btn_icon(false);
			if (window.pageYOffset > sticky) {
				header.classList.add('sticky');
				totop.classList.add('show');
			} else {
				header.classList.remove('sticky');
				totop.classList.remove('show');
			}
			if (window.pageYOffset > sticky) {
				closeMenu();
			}
		});
		return () => {
			window.removeEventListener('scroll', scrollCallBack);
		};
	}, []);
	return (
		<header id='myHeader' className='navbar white'>
			<div className='container'>
				<div className='row w-100-nav'>
					<div className='logo px-0'>
						<div className='navbar-title navbar-item'>
							<NavLink to='/'>
								<img
									src='./img/logo-3.png'
									className='img-fluid d-block'
									alt='#'
								/>
								<img
									src='./img/logo-3.png'
									className='img-fluid d-3'
									alt='#'
								/>
								<img
									src='./img/logo-light.png'
									className='img-fluid d-none'
									alt='#'
								/>
							</NavLink>
						</div>
					</div>

					<div className='search'>
						<input
							id='quick_search'
							className='xs-hide'
							name='quick_search'
							placeholder='search item here...'
							type='text'
						/>
					</div>

					<BreakpointProvider>
						<Breakpoint l down>
							{showmenu && (
								<div className='menu'>
									<div className='navbar-item'>
										<div ref={ref}>
											<div
												className='dropdown-custom dropdown-toggle btn'
												onClick={handleBtnClick}
											>
												Home
											</div>
											{openMenu && (
												<div className='item-dropdown'>
													<div
														className='dropdown'
														onClick={closeMenu}
													>
														{/* <NavLink to="/" onClick={() => btn_icon(!showmenu)}>Homepage</NavLink> */}
													</div>
												</div>
											)}
										</div>
									</div>
									<div className='navbar-item'>
										<div ref={ref1}>
											<div
												className='dropdown-custom dropdown-toggle btn'
												onClick={handleBtnClick1}
											>
												Explore
											</div>
											{openMenu1 && (
												<div className='item-dropdown'>
													<div
														className='dropdown'
														onClick={closeMenu1}
													>
														<NavLink
															to='/explore'
															onClick={() =>
																btn_icon(
																	!showmenu
																)
															}
														>
															Explore
														</NavLink>
													</div>
												</div>
											)}
										</div>
									</div>
									<div className='navbar-item'>
										<div ref={ref2}>
											<div
												className='dropdown-custom dropdown-toggle btn'
												onClick={handleBtnClick2}
											>
												Pages
											</div>
											{openMenu2 && (
												<div className='item-dropdown'>
													<div
														className='dropdown'
														onClick={closeMenu2}
													>
														<NavLink
															to='/Author'
															onClick={() =>
																btn_icon(
																	!showmenu
																)
															}
														>
															Author
														</NavLink>
														<NavLink
															to='/create'
															onClick={() =>
																btn_icon(
																	!showmenu
																)
															}
														>
															Create
														</NavLink>
													</div>
												</div>
											)}
										</div>
									</div>
									<div className='navbar-item'>
										<NavLink
											to='/activity'
											onClick={() => btn_icon(!showmenu)}
										>
											Activity
										</NavLink>
									</div>
								</div>
							)}
						</Breakpoint>

						<Breakpoint xl>
							<div className='menu'>
								{/* <div className='navbar-item'>
                        <div ref={ref}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                             onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                            Home
                            <span className='lines'></span>
                            {openMenu && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu}>
                                <NavLink to="/">Homepage</NavLink>
                                <NavLink to="/home1">Homepage 1</NavLink>
                                <NavLink to="/home2">Homepage 2</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                          
                        </div>
                    </div> */}
								<div className='navbar-item'>
									<NavLink to='/home'>
										Home
										<span className='lines'></span>
									</NavLink>
								</div>
								<div className='navbar-item'>
									<div ref={ref1}>
										<div
											className='dropdown-custom dropdown-toggle btn'
											onMouseEnter={handleBtnClick1}
											onMouseLeave={closeMenu1}
										>
											Explore
											<span className='lines'></span>
											{openMenu1 && (
												<div className='item-dropdown'>
													<div
														className='dropdown'
														onClick={closeMenu1}
													>
														<NavLink to='/explore'>
															Explore
														</NavLink>
														{/* <NavLink to="/explore2">Explore 2</NavLink> */}
														{/* <NavLink to="/rangking">Rangking</NavLink> */}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className='navbar-item'>
									<div ref={ref2}>
										<div
											className='dropdown-custom dropdown-toggle btn'
											onMouseEnter={handleBtnClick2}
											onMouseLeave={closeMenu2}
										>
											Pages
											<span className='lines'></span>
											{openMenu2 && (
												<div className='item-dropdown'>
													<div
														className='dropdown'
														onClick={closeMenu2}
													>
														<NavLink to='/Author'>
															Author
														</NavLink>
														{/* <NavLink to="/wallet">Wallet</NavLink> */}
														<NavLink to='/create'>
															Create
														</NavLink>
														{/* <NavLink to="/news">News</NavLink> */}
														{/* <NavLink to="/works">Gallery</NavLink> */}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className='navbar-item'>
									<NavLink to='/activity'>
										Activity
										<span className='lines'></span>
									</NavLink>
								</div>
								{/* <div className='navbar-item'>
                  <div ref={ref3}>
                    <div className="dropdown-custom dropdown-toggle btn"
                      onMouseEnter={handleBtnClick3} onMouseLeave={closeMenu3}>
                      Elements
                      <span className='lines'></span>
                      {openMenu3 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu3}>
                            <NavLink to="/elegantIcons">Elegant Icon</NavLink>
                            <NavLink to="/etlineIcons">Etline Icon</NavLink>
                            <NavLink to="/fontAwesomeIcons">Font Awesome Icon</NavLink>
                            <NavLink to="/accordion">Accordion</NavLink>
                            <NavLink to="/alerts">Alerts</NavLink>
                            <NavLink to="/price">Pricing Table</NavLink>
                            <NavLink to="/progressbar">Progess Bar</NavLink>
                            <NavLink to="/tabs">Tabs</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div> */}
							</div>
						</Breakpoint>
					</BreakpointProvider>
					{/* <div className='mainside'>
						<div className='btn-main'>
							{metamaskConnected == true ? (
							{account ? (
								<div
									onClick={() => {
										handleTransfer(account);
									}}
								>
									Transfer Token
								</div>
							) : (
								<a onClick={connectToMetamask}>
									Connect Wallet
								</a>
							)}
							<a onClick={handleConnectWallet}>Connect Wallet</a>
						</div>
					</div> */}
					<div className='mainside'>
						<div
							onClick={connectToMetamask}
							disabled={account}
							className='btn-main'
						>
							{/* {metamaskConnected == true ? ( */}
							{
								account ? (
									<div>
										{account &&
											`${account.substring(
												0,
												6
											)}...${account.substring(
												account.length - 6
											)}`}
									</div>
								) : (
									// <a onClick={connectToMetamask}>
									'Connect Wallet'
								)
								// </a>
							}
							{/* <a onClick={handleConnectWallet}>Connect Wallet</a> */}
						</div>
					</div>
				</div>

				<button
					className='nav-icon'
					onClick={() => btn_icon(!showmenu)}
				>
					<div className='menu-line white'></div>
					<div className='menu-line1 white'></div>
					<div className='menu-line2 white'></div>
				</button>
			</div>
		</header>
	);
};
export default Header;