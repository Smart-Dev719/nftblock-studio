import { GET_ACCOUNT, GET_NFT, GET_SINGLE_NFT } from '../types';
import Web3 from 'web3';
import NFTBlocks from '../../abis/NFTBLOCK.json';
import axios from 'axios';
const NFTBlockTokenAddress = '0x7D9dB75274472FD4cE326EAA197A612D4E56B3aD';

export const connectAccount = () => async dispatch => {
	if (typeof window.ethereum !== 'undefined') {
		await window.ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		//   setAccount(accounts[0]);
		// localStorage.setItem("accounts", accounts[0]);
		dispatch({ type: GET_ACCOUNT, payload: accounts[0] });
	}
};

export const getNftState = nfts => async dispatch => {
	dispatch({ type: GET_NFT, payload: nfts });
};
export const addSearch = data => async dispatch => {
	dispatch({ type: 'ADD_SEARCH', payload: data });
};
export const clearSearch = () => async dispatch => {
	dispatch({ type: 'CLEAR_SEARCH' });
};

export const selectedCategory = category => async dispatch => {
	dispatch({ type: 'SELECT_CATEGORY', payload: category });
};

export const changeAccount = accounts => async dispatch => {
	// localStorage.setItem("accounts", accounts[0]);
	dispatch({ type: GET_ACCOUNT, payload: accounts[0] });
};

export const getSingleNft = id => async dispatch => {
	window.web3 = new Web3(window.ethereum);
	const web3 = window.web3;
	const nftBlocksContract = new web3.eth.Contract(
		NFTBlocks,
		NFTBlockTokenAddress
	);
	const nftBlock = await nftBlocksContract.methods.allNFTBlocks(id).call();
	let imageResponse;
	if (nftBlock.tokenURI) {
		const { data } = await axios.get(nftBlock.tokenURI);
		imageResponse = data;
	}
	let obj = {
		...nftBlock,
		imageResponse,
	};

	dispatch({ type: GET_SINGLE_NFT, payload: obj });
};

export const approveTokenCall = () => async dispatch => {
	dispatch({ type: 'APPROVE_CALL' });
};
