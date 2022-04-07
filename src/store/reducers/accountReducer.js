import { GET_ACCOUNT, GET_NFT, GET_SINGLE_NFT } from '../types';

const initialState = {
	account: null,
	nfts: [],
	single: null,
	approvedCall: false,
	category: null,
	search: null,
};
const accountReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ACCOUNT:
			return {
				...state,
				account: action.payload,
			};
		case GET_NFT:
			return {
				...state,
				nfts: action.payload,
			};
		case GET_SINGLE_NFT:
			return {
				...state,
				single: action.payload,
			};
		case 'APPROVE_CALL':
			return {
				...state,
				approvedCall: true,
			};
		case 'ADD_SEARCH':
			return {
				...state,
				search: action.payload,
			};
		case 'CLEAR_SEARCH':
			return {
				...state,
				search: null,
			};
		case 'SELECT_CATEGORY':
			return {
				...state,
				category: action.payload,
			};
		default:
			return state;
	}
};

export default accountReducer;
