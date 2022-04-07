import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import {
	addSearch,
	clearSearch,
	selectedCategory,
} from '../../store/actions/accountActions';
import ColumnNew from '../components/ColumnNew';
import Footer from '../components/footer';

const customStyles = {
	option: (base, state) => ({
		...base,
		background: '#212428',
		color: '#fff',
		borderRadius: state.isFocused ? '0' : 0,
		'&:hover': {
			background: '#16181b',
		},
	}),
	menu: base => ({
		...base,
		background: '#212428 !important',
		borderRadius: 0,
		marginTop: 0,
	}),
	menuList: base => ({
		...base,
		padding: 0,
	}),
	control: (base, state) => ({
		...base,
		padding: 2,
	}),
};

const options = [
	{ value: 'all', label: 'All categories' },
	{ value: 'sale', label: 'On Sale' },
	{ value: 'auction', label: 'On Auction' },
	// { value: "Domain Names", label: "Domain Names" },
];
const options1 = [
	{ value: 'Buy Now', label: 'Buy Now' },
	{ value: 'On Auction', label: 'On Auction' },
	{ value: 'Has Offers', label: 'Has Offers' },
];
const options2 = [
	{ value: 'All Items', label: 'All Items' },
	{ value: 'Single Items', label: 'Single Items' },
	{ value: 'Bundles', label: 'Bundles' },
];

const Explore = ({ nftData }) => {
	const dispatch = useDispatch();

	const handleChange = selectedOption => {
		console.log(selectedOption.value);
		dispatch(selectedCategory(selectedOption.value));
	};

	const [search, setSearch] = useState('');
	return (
		<div>
			<section className='jumbotron breadcumb no-bg'>
				<div className='mainbreadcumb'>
					<div className='container'>
						<div className='row m-10-hor'>
							<div className='col-12'>
								<h1 className='text-center'>Explore</h1>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='items_filter'>
							<form
								className='row form-dark'
								id='form_quick_search'
								name='form_quick_search'
								onSubmit={e => {
									e.preventDefault();
									dispatch(addSearch(search));
								}}
							>
								<div className='col'>
									<input
										className='form-control'
										id='name_1'
										name='name_1'
										onChange={e => {
											if (e.target.value == '') {
												dispatch(clearSearch());
											}
											setSearch(e.target.value);
										}}
										placeholder='search item here...'
										type='text'
										required
									/>{' '}
									<button type='submit' id='btn-submit'>
										<i className='fa fa-search bg-color-secondary'></i>
									</button>
									<div className='clearfix'></div>
								</div>
							</form>
							<div className='dropdownSelect one'>
								<Select
									className='select1'
									styles={customStyles}
									menuContainerStyle={{ zIndex: 999 }}
									defaultValue={options[0]}
									onChange={handleChange}
									options={options}
								/>
							</div>
							{/*<div className='dropdownSelect two'>
								<Select
									className='select1'
									styles={customStyles}
									defaultValue={options1[0]}
									options={options1}
								/>
							</div>
							<div className='dropdownSelect three'>
								<Select
									className='select1'
									styles={customStyles}
									defaultValue={options2[0]}
									options={options2}
								/>
                  </div>*/}
						</div>
					</div>
				</div>
				<ColumnNew />
			</section>

			<Footer />
		</div>
	);
};
export default Explore;
