import React, { useEffect, useState } from 'react';
import Clock from '../components/Clock';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Web3 from 'web3';
import { useParams } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import NFTBlocks from '../../abis/NFTBLOCK.json';
import { getSingleNft } from '../../store/actions/accountActions';
import '../style/styles.css';
import { Spinner } from 'react-bootstrap';
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;
const NFTBlockTokenAddress = '0x7D9dB75274472FD4cE326EAA197A612D4E56B3aD';

const Colection = function ({ loadBlockchainData, tokenContract }) {
	const params = useParams();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	// const { single } = location.state;
	const [openMenu, setOpenMenu] = React.useState(true);
	const [openMenu1, setOpenMenu1] = React.useState(false);
	const [stopper, setStopper] = React.useState(false);
	const [bidAmount, setBidAmount] = React.useState(0);
	const [highestBid, setHighestBid] = React.useState({
		bidderAddress: '',
		amount: 0,
		approved: false,
	});
	const [, forceUpdate] = React.useReducer(x => x + 1, 0);

	const { account, single, nfts } = useSelector(state => state.accounts);
	const handleBtnClick = (): void => {
		setOpenMenu(!openMenu);
		setOpenMenu1(false);
		document.getElementById('Mainbtn').classList.add('active');
		document.getElementById('Mainbtn1').classList.remove('active');
	};
	const handleBtnClick1 = (): void => {
		setOpenMenu1(!openMenu1);
		setOpenMenu(false);
		document.getElementById('Mainbtn1').classList.add('active');
		document.getElementById('Mainbtn').classList.remove('active');
	};

	const handleBuyToken = async () => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const networkId = await web3.eth.net.getId();
		// const networkData = NFTBlocks.networks[networkId];
		// console.log('networkId', networkId);
		if (networkId) {
			// console.log('networkData', networkData);
			const nftBlocksContract = new web3.eth.Contract(
				NFTBlocks,
				NFTBlockTokenAddress
			);
			console.log('contract', nftBlocksContract, single);
			let price;
			if (!single.isBiddingAvailable) {
				price = web3.utils.toWei(
					single['imageResponse'].Price,
					'ether'
				);
			} else {
				price = web3.utils.toWei(highestBid.amount.toString(), 'ether');
			}
			const allowance = await tokenContract.methods
				.allowance(account, NFTBlockTokenAddress)
				.call();
			// if (price > allowance) {
			// 	const transferData = await tokenContract.methods
			// 		.approve(NFTBlockTokenAddress, '1000000000000000000000')
			// 		.send({ from: account })
			// 		.on('confirmation', () => {})
			// 		.on('error', () => console.log('error'));
			// }
			const tokenResponse = await nftBlocksContract.methods
				.buyToken(single.tokenId)
				.send({
					from: account,
					// value: price
				});
			await loadBlockchainData();
			await dispatch(getSingleNft(params.token));
			// window.location.reload(false);
			forceUpdate();
			console.log('response', tokenResponse);
		}
	};
	const handleSaleToken = async () => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const networkId = await web3.eth.net.getId();
		// const networkData = NFTBlocks.networks[networkId];
		// console.log('networkId', networkId);
		if (networkId) {
			// console.log('networkData', networkData);
			const nftBlocksContract = new web3.eth.Contract(
				NFTBlocks,
				NFTBlockTokenAddress
			);
			console.log('contract', nftBlocksContract, single);
			const tokenResponse = await nftBlocksContract.methods
				.toggleForSale(single.tokenId)
				.send({ from: account });
			// await loadBlockchainData().then((res) => {
			// getNFTData(params.token);

			await dispatch(getSingleNft(params.token));

			setStopper(true);
			forceUpdate();
			// });
			//   let promise = new Promise((resolve, reject) => {
			//     console.log("in promise");
			//     loadBlockchainData().then((res) => {
			//       console.log("success")
			//       setStopper(!stopper);
			//       resolve("success");
			//     });
			//   });
			//  Promise.all([promise]).then((res) => {
			//     console.log("after all nfts");
			//     getNFTData(params.token)
			//   });
			console.log('response', tokenResponse);
		}
	};

	const handleBidToken = async () => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const networkId = await web3.eth.net.getId();
		// const networkData = NFTBlocks.networks[networkId];
		// console.log('networkId', networkId);
		if (networkId) {
			// console.log('networkData', networkData);
			const nftBlocksContract = new web3.eth.Contract(
				NFTBlocks,
				NFTBlockTokenAddress
			);
			console.log('contract', nftBlocksContract, single);
			const price = web3.utils.toWei(bidAmount, 'ether');
			if (price < single.price) {
				alert('Bid is too low');
				return;
			}
			const tokenResponse = await nftBlocksContract.methods
				.bidOnToken(single.tokenId, price)
				.send({ from: account });

			console.log('response', tokenResponse);
			getHighestBid();
			setBidAmount(0);
			await loadBlockchainData();
			await dispatch(getSingleNft(params.token));
			setStopper(true);
			forceUpdate();
		}
	};

	const getHighestBid = async () => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const networkId = await web3.eth.net.getId();
		// const networkData = NFTBlocks.networks[networkId];
		if (networkId) {
			// console.log('networkData', networkData);
			const nftBlocksContract = new web3.eth.Contract(
				NFTBlocks,
				NFTBlockTokenAddress
			);
			console.log('contract', nftBlocksContract, single);
			if (single && single.tokenId) {
				const highestBid = await nftBlocksContract.methods
					.getHighestBidder(single.tokenId)
					.call();
				// debugger
				console.log('response highestBid', highestBid);
				// highestBid.amount = web3.utils.fromWei(highestBid,
				const highestBidData = {
					bidderAddress: highestBid['0'],
					amount: parseFloat(
						web3.utils.fromWei(highestBid['1'], 'ether')
					),
					approved: highestBid['2'],
				};
				// debugger
				setHighestBid(highestBidData);
			}
		}
	};

	const handleApproveBid = async () => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const networkId = await web3.eth.net.getId();
		// const networkData = NFTBlocks.networks[networkId];
		// console.log('networkId', networkId);
		if (networkId) {
			// console.log('networkData', networkData);
			const nftBlocksContract = new web3.eth.Contract(
				NFTBlocks,
				NFTBlockTokenAddress
			);
			console.log('contract', nftBlocksContract, single);
			const tokenResponse = await nftBlocksContract.methods
				.approveBid(single.tokenId)
				.send({ from: account });
			await loadBlockchainData();
			await dispatch(getSingleNft(params.token));
			console.log('response', tokenResponse);
			getHighestBid();
			setBidAmount(0);
			setStopper(true);
			forceUpdate();
		}
	};
	const getNFTData = async id => {
		setLoading(true);
		console.log('id', id);
		dispatch(getSingleNft(id));

		setLoading(false);
	};
	React.useEffect(() => {
		console.log('stopper', stopper);
		// const func = async () => {
		// 	getNFTData(params.token);
		// };
		if (nfts.length < 1) {
			console.log('nft length less then one');

			getNFTData(params.token);
		} else {
			console.log('else');
			getNFTData(params.token);
		}

		// if (stopper) {
		// 	window.location.reload(false);
		// }
		getHighestBid();
		setStopper(false);
		// debugger
	}, [stopper]);

	const handleBidInput = async e => {
		if (e.target.value >= 0) {
			setBidAmount(e.target.value);
		}
	};

	return (
		<div>
			<GlobalStyles />
			{loading ? (
				<Spinner />
			) : (
				<section className='container'>
					<div className='row mt-md-5 pt-md-4'>
						<div className='col-md-6 text-center'>
							<img
								src={
									single &&
									single.imageResponse &&
									single.imageResponse.File
								}
								className='img-fluid img-rounded mb-sm-30'
								alt=''
							/>
						</div>
						<div className='col-md-6'>
							<div className='item_info'>
								<h2>Title: {single && single.tokenName}</h2>
								<div className='item_info_counts'>
									<div className='item_info_type'>
										<i className='fa fa-image'></i>Art
									</div>
									<div className='item_info_views'>
										<i className='fa fa-eye'></i>250
									</div>
									<div className='item_info_like'>
										<i className='fa fa-heart'></i>18
									</div>
								</div>
								<h5 className='description_text'>
									Description:{' '}
									{single &&
										single.imageResponse &&
										single.imageResponse.Colors &&
										single.imageResponse.Colors[0]}
								</h5>

								<div className='item_author'>
									<div className='author_list_pp'></div>
									<div className='author_list_info'>
										<span>
											Owner:{' '}
											{account &&
												single &&
												single.currentOwner}
										</span>
									</div>
								</div>
								<>
									<div className='item_author'>
										<div className='author_list_pp'></div>
										{highestBid.approved ? (
											<div className='author_list_info'>
												<span>
													Price: {highestBid.amount}{' '}
													ETH
												</span>
											</div>
										) : (
											<div className='author_list_info'>
												<span>
													Price:{' '}
													{single &&
														parseFloat(
															single.price
														) /
														10 ** 18}{' '}
													ETH
												</span>
											</div>
										)}
									</div>
								</>
								<div className='spacer-40'></div>
								{account &&
									single &&
									single.currentOwner !== account &&
									((single && !single.isBiddingAvailable) ||
										(highestBid.bidderAddress.toLowerCase() ==
											account &&
											highestBid.approved)) &&
									single &&
									single.forSale && (
										<button
											onClick={handleBuyToken}
											className='btn-main'
										>
											Buy
										</button>
									)}
								{account &&
									single &&
									single.currentOwner !== account &&
									single.isBiddingAvailable &&
									!highestBid.approved && (
										<>
											<input
												className='form-control'
												type='number'
												placeholder='Place your bid'
												value={bidAmount}
												onChange={handleBidInput}
											/>
											<button
												onClick={handleBidToken}
												className='btn-main'
											>
												Bid
											</button>
										</>
									)}

								{highestBid.amount > 0 && (
									<>
										<h3>Highest Bid</h3>
										<h5>
											{highestBid.bidderAddress} :{' '}
											{highestBid.amount} ETH
										</h5>
										{account &&
											single &&
											single.currentOwner === account &&
											!highestBid.approved && (
												<button
													onClick={handleApproveBid}
													className='btn-main'
												>
													Approve Bid
												</button>
											)}
									</>
								)}
								<br />

								{account &&
									single &&
									single.currentOwner === account && (
										<button
											onClick={handleSaleToken}
											className='btn-main'
										>
											{!single.forSale
												? 'Activate For Sale'
												: 'Deactivate For Sale'}
										</button>
									)}
								{/* </div> */}
							</div>
						</div>
					</div>
				</section>
			)}

			<Footer />
		</div>
	);
};
export default Colection;
