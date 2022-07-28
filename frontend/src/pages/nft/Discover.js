import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";
import "../../styles/Responsive.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomNavbar from "../components/CustomNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ethers } from "ethers";
import NftMarket from '../../contracts/NftMarket.json';
import DiscoverCard from "../components/DiscoverCard";
import discoverCardThumbnail1 from "../../assets/images/discoverCardThumbnail1.png";
import discoverCardThumbnail2 from "../../assets/images/discoverCardThumbnail2.png";
import discoverCardThumbnail3 from "../../assets/images/discoverCardThumbnail3.png";
import discoverCardThumbnail4 from "../../assets/images/discoverCardThumbnail4.png";
// import { getNfts } from "../../redux/actions/nftActions";
import SigninPopup from "../components/SigninPopup";
import SignUpPopup from "../components/SignUpPopup";
import axios from 'axios';

const Discover = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [status, setStatus] = useState(false);
  const [nftId, setNftId] = useState("");
  let nftsFromChain = [];
  const buyNftHandler = async () => {
    try {
      // const provider = ethers.getDefaultProvider('ropsten');
      // const wallet = provider.getSigner();
      // const contract = new ethers.Contract(NftMarket.networks['3'].address, NftMarket.abi, wallet);
      // const tx = await contract.buyNft(nftId, { value: ethers.utils.parseEther('0.1') });
      // console.log(tx.hash);

      window.ethereum.send('eth_requestAccounts');

      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      console.log('contractAddress', contractAddress);
      const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_PROVIDER);

      // get the end user
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, NftMarket.abi, signer);

      // get the smart contract
      console.log(contract)

      // nftsFromChain = [];
      const coreNfts = await contract?.getAllNftsOnSale();
      let meta = null;
      for (let i = 0; i < coreNfts.length; i++) {
        const item = coreNfts[i];
        const tokenURI = await contract?.tokenURI(item?.tokenId);
        // console.log('tokenURI', tokenURI);
        const metaRes = await fetch(tokenURI);
        // console.log('metaRes', metaRes);
        meta = await metaRes.json();
        // console.log('meta', meta);

        nftsFromChain.push({
          price: parseFloat(ethers.utils.formatEther(item.price)),
          tokenId: item.tokenId.toNumber(),
          creator: item.creator,
          isListed: item.isListed,
          meta
        })
      }
      setNfts([...nfts, nftsFromChain]);
      console.log('nftsFromChain', nftsFromChain)

      await axios.get(`/api/nfts/user/${meta?.creatorMongoUId}`).then(res => {
        setNftId(res.data)
        console.log('nftId', res.data)
        // setOwnerStatus(true)
      }).catch(err => {
        console.error(err)
      })
      // return nftsFromChain;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!status) {
      buyNftHandler();
      setStatus(true);
    }
  }, [nfts, nftsFromChain])

  // console.log('nfts', nfts[0])

  async function getNfts() {
    await axios.get(`/api/nfts/owned`).then(res => {
      setNfts(res.data)
      console.log('nfts=>res.data=>', res.data)
    }).catch(err => {
      console.error(err)
    })
  }
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!status) {
  //     getNfts();
  //     setStatus(true);
  //   }
  // }, [nfts])
  console.log('nfts', nfts[0])
  return (
    <div className="body">
      {/* Section2 */}

      {/* Signup and register popups */}
      {showPopup &&
        <SigninPopup showPopup={showPopup} setShowPopup={setShowPopup} />
      }
      {
        showSignupPopup &&
        <SignUpPopup showSignupPopup={showSignupPopup} setShowSignupPopup={setShowSignupPopup} />

      }
      {/* Signup and register popups */}


      <div className="navBarDiscover">
        <CustomNavbar onSigninClick={() => setShowPopup(!showPopup)} onSignupClick={() => setShowSignupPopup(!showSignupPopup)} />
      </div>

      <div className="discoverSection">
        <div className="container">
          <div className="row discoverTitleWrapper">
            <div className="col-sm-12">
              <div className="trendingTitle">Discover</div>
            </div>
          </div>

          <div className="row discoverHeadBar">
            <div className="col-sm-4">
              <div className="trendingDateWrapper">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Recently added
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
              <div className="trendingDateWrapper showMobile">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  All items
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>

            <div className="col-sm-6 showDesk">
              <div className="discoverHeadBarMenu row">
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem discoverHeadBarItemActive">
                    All items
                  </div>
                </div>

                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Art</div>
                </div>
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Game</div>
                </div>
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Photography</div>
                </div>
                <div className="col-sm-2">
                  <div className="discoverHeadBarItem">Others</div>
                </div>
              </div>
            </div>

            <div className="col-sm-1">
              <div className="dicoverHeadBarFilterButtonWrapper">
                <div className="dicoverHeadBarFilterButton showDeskFlex">
                  Filter
                  <span style={{ marginLeft: 10 }}>X</span>
                </div>
                <div className="dicoverHeadBarFilterButton showMobile">Advance Filter</div>
              </div>
            </div>
          </div>

          <div className="row filterActions showDeskFlex">
            <div className="col-sm-3">
              <div className="filterActionTitle">PRICE</div>
              <div className="trendingDateWrapper2 ">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Highest price
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="filterActionTitle">LIKES</div>
              <div className="trendingDateWrapper2 ">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Most liked
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="filterActionTitle">CREATOR</div>
              <div className="trendingDateWrapper2 ">
                <div className="trendingDateText" style={{ color: "#6B6F77" }}>
                  Verified only
                </div>
                <a href="#" className="trendingDateArrow">
                  <FontAwesomeIcon icon={faChevronDown} color="white" />
                </a>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="filterActionTitle">PRICE RANGE</div>
            </div>
          </div>

          <div className="row discoverCardWrapper">
            {
              nfts[0]?.length === 0 ?
                <div className="alert alert-danger mt-5 w-100"><b>NFT Assets Not Found!</b></div>
                :
                nfts[0]?.map((nft, index) => {
                  // console.log('nft', nft)
                  // <DiscoverCard key={index} ipfsDataLink={nft?.ipfsDataLink} thumbnail={discoverCardThumbnail3} />
                  return (
                    <DiscoverCard
                      key={index}
                      creator={nft?.creator}
                      id={nft?.meta?.creatorMongoUId || null}
                      name={nft.meta.name}
                      image={nft.meta.image.substring(34)}
                      description={nft.meta.description}
                      price={nft.price.toString()}
                      tokenId={nft.tokenId.toString()}
                      len={nfts[0].length}
                      thumbnail={discoverCardThumbnail2}
                    />
                  )
                  // console.log(nft, index)
                  // ))
                })
            }
            {/* <DiscoverCard thumbnail={discoverCardThumbnail2} />
                <DiscoverCard thumbnail={discoverCardThumbnail3} />
                <DiscoverCard thumbnail={discoverCardThumbnail4} />
                <DiscoverCard thumbnail={discoverCardThumbnail4} />
                <DiscoverCard thumbnail={discoverCardThumbnail2} />
                <DiscoverCard thumbnail={discoverCardThumbnail3} />
              <DiscoverCard thumbnail={discoverCardThumbnail1} /> */}
          </div>

          <div className="trendingSecBtnWrapper">
            <div className="trendingSecBtn">
              Load more
              <FontAwesomeIcon icon={faSpinner} style={{ marginLeft: 10 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Discover;
