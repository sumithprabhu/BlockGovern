import Header from "../components/Header";
import Vote from "../components/Vote";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Governance } from "../Governance";
import { ethers, providers, Contract } from "ethers";
import Web3Modal from "web3modal";

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get("companyName") || "Default Company"; // Use a default value if companyName is not provided
  const companyAbout = searchParams.get("CompanyAbout") || "Default About";
  const votecost = searchParams.get("votecost") || "Default Amount";

  const [Headline, setHeadline] = useState("Headline");
  const [About, SetAbout] = useState("this is about the vote");
  const [images, setImages] = useState([]);
  const [allVotes, setAllVotes] = useState([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [currentAccount, setCurrentAccount] = useState("acc");
  const web3ModalRef = useRef();
  const [sig, setSig] = useState("");
  const [contract, setContract] = useState(null);
  const CONTRACT_ADDRESS = "0x1342Aff9e1da497252Fed598a9b8B0ab9511Bfc4";
  const [company_about, setCompany_about] = useState("");

  const getTextData = async (hash) => {
    try {
      const response = await axios.get(`http://localhost:3001/text/${hash}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleHeadlineChange = (e) => {
    console.log(e.target.value);
    setHeadline(e.target.value);
  };
  const handleAboutChange = (e) => {
    console.log(e.target.value);
    SetAbout(e.target.value);
  };

  const handleCreatePost = () => {
    if (Headline.trim() && About.trim() && images.length > 0) {
      const newVote = {
        headline: Headline,
        about: About,
        image: images,
      };

      setAllVotes([...allVotes, newVote]);
      console.log(allVotes);
      setHeadline("");
      SetAbout("");
      setImages([]);
    }
  };

  const connectWallet = async () => {
    await checkIfWalletIsConnected();
    setWalletConnected(true);
    setWallet("Wallet connected");

    const signer = await checkIfWalletIsConnected(true);
    setCurrentAccount(await signer.getAddress());
    const NContract = new Contract(CONTRACT_ADDRESS, Governance, signer);
    setContract(NContract);
    console.log("signer", signer);
  };
  const connect_contract = async () => {
    const company_about_id = await contract.retrive_about(companyName);
    const company_about = await getTextData(company_about_id);
    setCompany_about(company_about);
  };

  const checkIfWalletIsConnected = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Change the network to Mumbai");
      throw new Error("Change network to Mumbai");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };
  useEffect(() => {
    if (contract) {
      connect_contract();
    }
  }, [contract]);

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      console.log(currentAccount);
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div className="homemain">
      <div className="homeheader">
        <button className="homeheaderbutton">
          <Header />
        </button>
        <h1 className="companynameheader">{companyName}</h1>

        <button class="button-30" onClick={connectWallet}>
          {currentAccount
            ? currentAccount.slice(0, 4).concat("...", currentAccount.slice(38))
            : "Connect"}
        </button>
      </div>
      {/* <div className="companyname">{companyName}</div>
      <h1 className="companyname">{votecost}</h1> */}

      <div className="profile">
        <div className="profileabout2">
          <div className="profileabout">
            <h1 children="h1about">About </h1>
            <h3>{companyName}</h3>
            <p className="companyabout">{company_about}</p>
          </div>
        </div>

        <div className="profilevote">
          {allVotes.length > 0 ? (
            // If there are votes, map and render the Vote components
            allVotes.map((vote, index) => (
              <Vote
                key={index}
                headline={vote.headline}
                about={vote.about}
                image={vote.image}
              />
            ))
          ) : (
            // If no votes available, display "NO VOTES AVAILABLE"
            <p>NO VOTES AVAILABLE</p>
          )}
        </div>

        <div>
          <div className="createpost">
            <h2>Create vote</h2>

            <input
              onChange={handleHeadlineChange}
              type="text"
              placeholder="Enter Headline"
            />
            <p>Enter the vote description :</p>
            <input onChange={handleAboutChange} type="text" />
            {/* <input onChange={handleAmountChange} type="number" min="0" /> */}
            <p>Enter company's logo :</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
            />
            <button class="button-40" onClick={handleCreatePost}>
              Create
            </button>
          </div>
          <div className="gobackbutton">
            <button class="button-30" onClick={() => navigate(-1)}>
              go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
