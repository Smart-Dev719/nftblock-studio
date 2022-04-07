import React from "react";
import ColumnNewAuthor from '../components/ColumnNewAuthor';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

const Colection= function({nftData}) {
const [openMenu, setOpenMenu] = React.useState(true);
const [openMenu1, setOpenMenu1] = React.useState(false);
const [openMenu2, setOpenMenu2] = React.useState(false);

const { account } = useSelector((state) => state.accounts);


const handleBtnClick = (): void => {
  setOpenMenu(!openMenu);
  setOpenMenu1(false);
  setOpenMenu2(false);
  document.getElementById("Mainbtn").classList.add("active");
  document.getElementById("Mainbtn1").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};
const handleBtnClick1 = (): void => {
  setOpenMenu1(!openMenu1);
  setOpenMenu2(false);
  setOpenMenu(false);
  document.getElementById("Mainbtn1").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn2").classList.remove("active");
};
const handleBtnClick2 = (): void => {
  setOpenMenu2(!openMenu2);
  setOpenMenu(false);
  setOpenMenu1(false);
  document.getElementById("Mainbtn2").classList.add("active");
  document.getElementById("Mainbtn").classList.remove("active");
  document.getElementById("Mainbtn1").classList.remove("active");
};

React.useEffect(() => {
}, [])

return (
<div>
<GlobalStyles/>

  <section className='container no-bottom'>
    <div className='row'>
      <div className='spacer-double'></div>
      <div className="col-md-12">
         <div className="d_profile de-flex">
              <div className="de-flex-col">
                  <div className="profile_avatar">
                      <div className="profile_name">
                          <h4>
                              <span id="wallet" className="profile_wallet">Account: {account}</span>
                              <button id="btn_copy" title="Copy Text">Copy</button>
                          </h4>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </div>
  </section>

  <section className='container no-top'>
        {/* <div className='row'>
          <div className='col-lg-12'>
              <div className="items_filter">
                <ul className="de_nav text-left">
                    <li id='Mainbtn' className="active"><span onClick={handleBtnClick}>On Sale</span></li>
                    <li id='Mainbtn1' className=""><span onClick={handleBtnClick1}>Created</span></li>
                    <li id='Mainbtn2' className=""><span onClick={handleBtnClick2}>Liked</span></li>
                </ul>
            </div>
          </div>
        </div> */}
        <div id='zero1' className='onStep fadeIn'>
         <ColumnNewAuthor nftData = {nftData} account = {account}/>
        </div>
      </section>


  <Footer />
</div>
);
}
export default Colection;