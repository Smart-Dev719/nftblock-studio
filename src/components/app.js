import React, { useEffect, useState } from 'react';
import { Router, Location, Redirect } from '@reach/router';
import ScrollToTopBtn from './menu/ScrollToTop';
import Header from './menu/header';
import Home2 from './pages/home2';
import Home1 from './pages/home1';
import Home from './pages/home';
import Explore from './pages/explore';
import Explore2 from './pages/explore2';
import Helpcenter from './pages/helpcenter';
import Rangking from './pages/rangking';
import Colection from './pages/colection';
import ItemDetail from './pages/ItemDetail';
import Author from './pages/Author';
import Wallet from './pages/wallet';
import Login from './pages/login';
import LoginTwo from './pages/loginTwo';
import Register from './pages/register';
import Price from './pages/price';
import Works from './pages/works';
import News from './pages/news';
import Create from './pages/create';
import Auction from './pages/Auction';
import Activity from './pages/activity';
import Contact from './pages/contact';
import ElegantIcons from './pages/elegantIcons';
import EtlineIcons from './pages/etlineIcons';
import FontAwesomeIcons from './pages/fontAwesomeIcons';
import Accordion from './pages/accordion';
import Alerts from './pages/alerts';
import Progressbar from './pages/progressbar';
import Tabs from './pages/tabs';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
// import { ethers } from "ethers";
import NFTBlocks from '../abis/NFTBLOCK.json';
import R4p from '../abis/R4p.json';
// const contractAddress = "0xf1bfA9F5D499A60A0C22d0421A854767E335767D";
// const abi = contract.abi;

import { createGlobalStyle } from 'styled-components';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import axios from 'axios';
import {
	connectAccount,
	getNftState,
	changeAccount,
	approveTokenCall,
} from '../store/actions/accountActions';
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');
const NFTBlockTokenAddress = '0x7D9dB75274472FD4cE326EAA197A612D4E56B3aD';
const tokenAddress = '0x00D046D0BCb7F09365CEa2413786d59B8c43916B';
const GlobalStyles = createGlobalStyle`
  :root {
    scroll-behavior: unset;
  }
`;

export const ScrollTop = ({ children, location }) => {
	React.useEffect(() => window.scrollTo(0, 0), [location]);
	return children;
};

const PosedRouter = ({ children }) => (
	<Location>
		{({ location }) => (
			<div id='routerhang'>
				<div key={location.key}>
					<Router location={location}>{children}</Router>
				</div>
			</div>
		)}
	</Location>
);

const App = () => {
	const [metamaskConnected, setMetamaskConnected] = useState(false);
	// const [account, setAccount] = useState();
	const [loading, setLoading] = useState(false);
	const [accountAddress, setAccountAddress] = useState('');
	const [accountBalance, setAccountBalance] = useState('');
	const [nftBlocksContract, setNftBlocksContract] = useState(null);
	const [nftBlokTokenContract, setBlokTokenContract] = useState(null);
	const [nftTokenContract, setNftTokenContract] = useState(null);
	const [contractDetected, setContractDetected] = useState(false);
	const [nftBlockCounter, setNftBlockCounter] = useState(0);
	const [nftBlocks, setNftBlocks] = useState([]);
	const [totalTokenMinted, setTotalTokenMinted] = useState(0);
	const [totalTokenOwnedByAccount, setTotalTokenOwnedByAccount] = useState(0);
	const [nameIsUsed, setNameIsUsed] = useState(false);
	const [lastMintTime, setLastMintTime] = useState(null);
	const [allNFTData, setAllNFTData] = useState([]);
	// create page
	const [files, setFiles] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [bidding, setBidding] = useState(false);
	const [royalty, setRoyalty] = useState('');
	const [tokenUri, setTokenUri] = useState('');

	const dispatch = useDispatch();

	const { account, approvedCall } = useSelector(state => state.accounts);

	const handleFilesInput = e => {
		setFiles(e.target.files);
	};

	const handleTitleInput = e => {
		setTitle(e.target.value);
	};

	const handleDescriptionInput = e => {
		setDescription(e.target.value);
	};

	const handlePriceInput = e => {
		setPrice(e.target.value);
	};

	const handleBidInput = e => {
		console.log('Bidding is', e.target.checked);
		setBidding(e.target.checked);
	};

	const handleRoyaltyInput = e => {
		setRoyalty(e.target.value);
	};

	useEffect(() => {
		// loadWeb3();
		connectToMetamask();
		loadBlockchainData();
		// setMintBtnTimer();
	}, [window.ethereum]);

	//Connect wallet using ethers
	// const handleConnectWallet = async () => {
	//   if (typeof window.ethereum !== 'undefined') {
	//     await window.ethereum.request({ method: 'eth_requestAccounts' });
	//     const provider = new ethers.providers.Web3Provider(window.ethereum);
	//     let tem = await provider.listAccounts();
	//     setAccount(tem[0]);
	//     setMetamaskConnected(true);
	//     console.log(account);
	//   }
	// }
	const handleTransfer = async address => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const tokenData = new web3.eth.Contract(R4p, tokenAddress);
		setBlokTokenContract(tokenData);
		const balenceOf = await tokenData.methods.balanceOf(address).call();
		console.log('balance', balenceOf);
		const allowance = await tokenData.methods
			.allowance(address, NFTBlockTokenAddress)
			.call();
		console.log('allowance', allowance);
		// let apprvoedAmount = web3.utils.fromWei('10000000000000000000');
		// console.log('amount', );
		if (allowance < '10000000000000000000') {
			const transferData = await tokenData.methods
				.approve(NFTBlockTokenAddress, '1000000000000000000000')
				.send({ from: address })
				.on('confirmation', () => { })
				.on('error', () => console.log('error'));
			console.log(transferData);
		}
	};

	//Connect wallet using web3
	const connectToMetamask = async () => {
		if (!account) {
			dispatch(connectAccount()).then(res => {
				setMetamaskConnected(true);
			});
		}
		window.ethereum.on('accountsChanged', ac => {
			dispatch(changeAccount(ac)).then(res => {
				setMetamaskConnected(true);
			});
		});
	};

	// const setMintBtnTimer = () => {
	//   const mintBtn = document.getElementById("mintBtn");
	//   if (mintBtn !== undefined && mintBtn !== null) {
	//     setLastMintTime(localStorage.getItem(accountAddress));
	//     lastMintTime === undefined || lastMintTime === null
	//       ? (mintBtn.innerHTML = "Mint My NFT Block")
	//       : checkIfCanMint(parseInt(lastMintTime));
	//   }
	// };

	// const checkIfCanMint = (lastMintTime) => {
	//   const mintBtn = document.getElementById("mintBtn");
	//   const timeGap = 300000; //5min in milliseconds
	//   const countDownTime = lastMintTime + timeGap;
	//   const interval = setInterval(() => {
	//     const now = new Date().getTime();
	//     const diff = countDownTime - now;
	//     if (diff < 0) {
	//       mintBtn.removeAttribute("disabled");
	//       mintBtn.innerHTML = "Mint My Crypto Boy";
	//       localStorage.removeItem(accountAddress);
	//       clearInterval(interval);
	//     } else {
	//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);
	//       mintBtn.setAttribute("disabled", true);
	//       mintBtn.innerHTML = `Next mint in ${minutes}m ${seconds}s`;
	//     }
	//   }, 1000);
	// };

	// const loadWeb3 = async () => {
	//   if (window.ethereum) {
	//     window.web3 = new Web3(window.ethereum);
	//   } else if (window.web3) {
	//     window.web3 = new Web3(window.web3.currentProvider);
	//   } else {
	//     window.alert(
	//       "Non-Ethereum browser detected. You should consider trying MetaMask!"
	//     );
	//   }
	// };

	const loadBlockchainData = async () => {
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		if (accounts.length == 0) {
			setMetamaskConnected(false);
		} else {
			console.log('accounts', accounts.length);
			setMetamaskConnected(true);
			setLoading(true);
			setAccountAddress(accounts[0]);
			let accountBalance = await web3.eth.getBalance(accounts[0]);
			accountBalance = web3.utils.fromWei(accountBalance, 'Ether');
			setAccountBalance({ accountBalance });
			setLoading(false);

			handleTransfer(accounts[0]);

			const networkId = await web3.eth.net.getId();
			// const networkData = NFTBlocks.networks[networkId];
			// console.log('networkId', networkId);
			// if (networkData) {
			setLoading(true);
			// console.log('networkData', networkData);
			const nftBlocksContract = new web3.eth.Contract(
				NFTBlocks,
				NFTBlockTokenAddress
			);

			console.log('nftBlocksContract', nftBlocksContract);
			setNftBlocksContract(nftBlocksContract);
			setContractDetected(true);
			let promises = [];
			let totalNFTData = [];
			const nftBlockCounter = await nftBlocksContract.methods
				.nftBlockCounter()
				.call();
			setNftBlockCounter(nftBlockCounter);
			for (let i = 1; i <= nftBlockCounter; i++) {
				let imageResponse = null;
				promises.push(
					new Promise(async (resolve, reject) => {
						const nftBlock = await nftBlocksContract.methods
							.allNFTBlocks(i)
							.call();
						if (nftBlock.tokenURI) {
							const { data } = await axios.get(nftBlock.tokenURI);
							imageResponse = data;
						}
						let obj = {
							...nftBlock,
							imageResponse,
						};
						totalNFTData.push(obj);
						setNftBlocks([...nftBlocks, nftBlock]);
						resolve();
					})
				);
			}

			Promise.all(promises).then(async res => {
				dispatch(getNftState(totalNFTData));
				console.log(totalNFTData);
				setAllNFTData(totalNFTData);

				let totalTokensMinted = await nftBlocksContract.methods
					.getNumberOfTokensMinted()
					.call();
				totalTokensMinted = Number(totalTokensMinted);
				setTotalTokenMinted(totalTokensMinted);
				let totalTokensOwnedByAccount = await nftBlocksContract.methods
					.getTotalNumberOfTokensOwnedByAnAddress(accounts[0])
					.call();
				totalTokensOwnedByAccount = Number(totalTokensOwnedByAccount);
				setTotalTokenOwnedByAccount(totalTokensOwnedByAccount);
				setLoading(false);
				return totalNFTData;
			});
			// } else {
			// 	setContractDetected(false);
			// }
		}
	};

	const mintMyNFT = async e => {
		console.log(nftBlocksContract);
		console.log('you click');
		setFiles(e.target.files);
		console.log(files);
		var filesArr = Array.prototype.slice.call(files);
		console.log(filesArr);
		document.getElementById('file_name').style.display = 'none';
		setFiles([...filesArr]);
		let imageUri = '';
		//upload image on ipfs
		if (title && price && description) {
			setLoading(true);
			try {
				const added = await client.add(files[files.length - 1], {
					progress: prog => console.log(`received: ${prog}`),
				});
				imageUri = `https://ipfs.infura.io/ipfs/${added.path}`;
			} catch (error) {
				console.log('Error uploading file:', error);
			}
			console.log({ imageUri });
			//upload metadata
			console.log(nftBlocksContract);
			if (nftBlocksContract) {
				let previousTokenId;
				previousTokenId = await nftBlocksContract.methods
					.nftBlockCounter()
					.call();
				previousTokenId = Number(previousTokenId);
				const tokenId = previousTokenId + 1;
				const tokenObject = {
					tokenName: 'NFT Block',
					tokenSymbol: 'NB',
					tokenId: `${tokenId}`,
					Name: title,
					Colors: [description],
					Price: price,
					File: imageUri,
				};

				const data = JSON.stringify(tokenObject);
				let tokenUri1;
				try {
					const added1 = await client.add(data);
					tokenUri1 = `https://ipfs.infura.io/ipfs/${added1.path}`;
					// this.setState({ tokenUri: tokenUri1 });
					setTokenUri(tokenUri1);
					console.log({ tokenUri1 });
					/* after file is uploaded to IPFS, pass the URL to save it on Polygon */
					// createSale(url)
				} catch (error) {
					console.log('Error uploading file: ', error);
				}

				const price1 = window.web3.utils.toWei(String(price), 'Ether');

				console.log('title', title);
				console.log('tokenUri1', tokenUri1);
				console.log('price1', price1);
				console.log('colors', [description]);

				console.log({
					title,
					tokenUri1,
					price1,
					colors: [description],
				});
				const colors = [];
				colors.push(description);

				nftBlocksContract.methods
					.mintNFTBlock(title, tokenUri1, price1, colors, bidding)
					.send({ from: accountAddress })
					.on('confirmation', () => {
						localStorage.setItem(
							accountAddress,
							new Date().getTime()
						);
						loadBlockchainData();
						// setLoading(false);
						// window.location.reload();
					})
					.on('error', err => {
						console.log('Error', err);
					});
			} else {
				loadBlockchainData();
			}
			setLoading(false);
		}
	};

	// const toggleForSale = (tokenId) => {
	//   setLoading(true);
	//   this.state.cryptoBoysContract.methods
	//     .toggleForSale(tokenId)
	//     .send({ from: this.state.accountAddress })
	//     .on("confirmation", () => {
	//       this.setState({ loading: false });
	//       window.location.reload();
	//     });
	// };

	return (
		<div className='wraper'>
			<GlobalStyles />
			<Header
				metamaskConnected={metamaskConnected}
				setMetamaskConnnected={setMetamaskConnected}
				// setAccount={setAccount}
				account={account}
				connectToMetamask={connectToMetamask}
			/>
			<PosedRouter>
				<ScrollTop path='/'>
					<Home nftData={allNFTData} exact path='/'>
						<Redirect to='/home' />
					</Home>
					{/* <Home1 path="/home1" /> */}
					{/* <Home2 path="/home2" /> */}
					<Explore nftData={allNFTData} path='/explore' />
					<Explore2 path='/explore2' />
					<Helpcenter path='/helpcenter' />
					<Rangking path='/rangking' />
					<Colection path='/colection' />
					<ItemDetail
						loadBlockchainData={loadBlockchainData}
						tokenContract={nftBlokTokenContract}
						path='/ItemDetail/:token'
					/>
					<Author nftData={allNFTData} path='/Author' />
					<Wallet path='/wallet' />
					<Login path='/login' />
					<LoginTwo path='/loginTwo' />
					<Register path='/register' />
					<Price path='/price' />
					<Works path='/works' />
					<News path='/news' />
					<Create
						path='/create'
						title={title}
						description={description}
						price={price}
						bidding={bidding}
						files={files}
						royalty={royalty}
						tokenUri={tokenUri}
						handleFilesInput={handleFilesInput}
						handleTitleInput={handleTitleInput}
						handlePriceInput={handlePriceInput}
						handleBidInput={handleBidInput}
						handleDescriptionInput={handleDescriptionInput}
						handleRoyaltyInput={handleRoyaltyInput}
						mintMyNFT={mintMyNFT}
						loading={loading}
					/>
					<Auction path='/Auction' />
					<Activity path='/activity' />
					<Contact path='/contact' />
					<ElegantIcons path='/elegantIcons' />
					<EtlineIcons path='/etlineIcons' />
					<FontAwesomeIcons path='/fontAwesomeIcons' />
					<Accordion path='/accordion' />
					<Alerts path='/alerts' />
					<Progressbar path='/progressbar' />
					<Tabs path='/tabs' />
				</ScrollTop>
			</PosedRouter>
			<ScrollToTopBtn />
		</div>
	);
};
export default App;
