import React, { Component, useState } from "react";
import Clock from "../components/Clock";
import Footer from '../components/footer';
import Loader from "react-loader-spinner";
// import {etheres} from 'ethers'
import Web3 from "web3";
import NFTBlocks from '../../abis/NFTBlocks.json';

// import { create as ipfsHttpClient } from 'ipfs-http-client';
// const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');


const Createpage = (props) => {
  const { title, description, price,bidding, files, royalty, tokenUri,
    handleFilesInput, handleTitleInput, handleDescriptionInput, handleRoyaltyInput, handlePriceInput, handleBidInput ,mintMyNFT ,loading} = props;

  // const [files, setFiles] = useState('');
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [price, setPrice] = useState('');
  // const [royalty, setRoyalty] = useState('');
  // const [lastMintTime, setLastMintTime] = useState(null);
  // const [tokenUri, setTokenUri] = useState('');
  // // const [accountAddress, setAccountAddress] = useState('');

  // const handleFilesInput = e => {
  //   setFiles(e.target.files);
  // };

  // const handleTitleInput = e => {
  //   setTitle(e.target.value);
  // };

  // const handleDescriptionInput = e => {
  //   setDescription(e.target.value);
  // };

  // const handlePriceInput = e => {
  //   setPrice(e.target.value);
  // };

  // const handleRoyaltyInput = e => {
  //   setRoyalty(e.target.value);
  // };

  // const  uploadIpfs = async(e) => {
  //   // mintMyNFT = async (image, title, tokenPrice) => {

  //   setFiles(e.target.files);
  //   console.log(files);
  //   var filesArr = Array.prototype.slice.call(files);
  //   console.log(filesArr);
  //   document.getElementById("file_name").style.display = "none";
  //   setFiles([...filesArr]);
  //   // this.setState({ files: [...filesArr] });
  //   // this.setState({ files: [...files, ...filesArr] });
  //   let imageUri = '';

  //   try {
  //     const added = await client.add(
  //       files[files.length - 1],
  //       {
  //         progress: (prog) => console.log(`received: ${prog}`)
  //       }
  //     );
  //     imageUri = `https://ipfs.infura.io/ipfs/${added.path}`;
  //     // console.log(imageURI);
  //     // setFileUrl(url)
  //     // this.setState(file: imageURI);
  //   } catch (error) {
  //     console.log('Error uploading file:', error);
  //   }
  //   console.log(imageUri);
  //   const data = JSON.stringify({ title: title, description: description, price: price, file: imageUri });
  //   try {
  //     const added1 = await client.add(data)
  //     const tokenUri1 = `https://ipfs.infura.io/ipfs/${added1.path}`;
  //     // this.setState({ tokenUri: tokenUri1 });
  //     setTokenUri(tokenUri1);
  //     console.log(tokenUri1);
  //     console.log(tokenUri);
  //     /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
  //     // createSale(url)
  //   } catch (error) {
  //     console.log('Error uploading file: ', error)
  //   }
  // }

  return (
    <div>

      <section className='jumbotron breadcumb no-bg'>
        <div className='mainbreadcumb'>
          <div className='container'>
            <div className='row m-10-hor'>
              <div className='col-12'>
                <h1 className='text-center'>Create</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container'>

        <div className="row">
          <div className="col-lg-4 offset-lg-1 mb-5">
            <form id="form-create-item" className="form-border" action="#">
              <div className="field-set">
                <h5>Upload file</h5>

                <div className="d-create-file">
                  <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                  {/* {files.map(x =>
                    <p key="{index}">PNG, JPG, GIF, WEBP or MP4. Max 200mb.{x.name}</p>
                  )} */}
                  <div className='browse'>
                    <input type="button" id="get_file" className="btn-main" value="Browse" />
                    <input id='upload_file' type="file" multiple onChange={handleFilesInput} />
                  </div>
                </div>

                <div className="spacer-single"></div>

                <h5>Title</h5>
                <input type="text" name="item_title" id="item_title" className="form-control" placeholder="e.g. 'Crypto Funk"
                  value={title} onChange={handleTitleInput} />

                <div className="spacer-10"></div>
                <h5>Description</h5>
                <textarea data-autoresize name="item_desc" id="item_desc" className="form-control" placeholder="e.g. 'This is very limited item'"
                  value={description} onChange={handleDescriptionInput}></textarea>

                <div className="spacer-10"></div>

                <h5>Price</h5>
                <input type="text" name="item_price" id="item_price" className="form-control" placeholder="enter price for one item (ETH)"
                  value={price} onChange={handlePriceInput} />

                <div className="spacer-10"></div>
                
                <h5>Bidding Available <input type="checkbox" name="item__bidding" id="item__bidding"
                  value={bidding} onChange={handleBidInput}
                   /></h5>
                
                <div className="spacer-10"></div>

                {/* <h5>Royalties</h5>
                <input type="text" name="item_royalties" id="item_royalties" className="form-control" placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  value={royalty} onChange={handleRoyaltyInput} /> */}

                <div className="spacer-10"></div>
                {loading?
                <Loader type="ThreeDots" color="#d91414" height={30} width={200}/>:
                <input type="button" onClick={mintMyNFT} id="mintBtn" className="btn-main " value="Mint My NFT Block"/>}
              </div>
            </form>
          </div>

          <div className="col-lg-6 col-sm-6 col-xs-12">
            <h5>Preview item</h5>
            <div className="nft__item m-0">
              <div className="de_countdown">
                <Clock deadline="December, 30, 2021" />
              </div>
              <div className="author_list_pp">
                <span>
                  <img className="lazy" src="./img/author/author-1.jpg" alt="" />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <span>
                  {
                    files.length > 0 ?
                      <img src={URL.createObjectURL(files[files.length - 1])} id="get_file_2" className="lazy nft__item_preview" alt="" /> : <img src="./img/items/static-7.jpg" id="get_file_2" className="lazy nft__item_preview" alt="" />
                  }
                </span>
              </div>
              <div className="nft__item_info">
                <span >
                  <h4>{title}</h4>
                </span>
                <div className="nft__item_price" >
                  {price} ETH
                </div>
                <div className="nft__item_action">
                  <span>Uploaded NFT IPFS Metadata: </span>
                  <a href={tokenUri} target="_blank">
                    {tokenUri &&
                      `${tokenUri.substring(0, 33)}...${tokenUri.substring(
                        tokenUri.length - 6
                      )}`}
                  </a>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i><span>50</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );

};

export default Createpage;