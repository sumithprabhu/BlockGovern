import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useState ,useRef,useEffect} from "react";
import "../App.css";
import Web3Modal from "web3modal";
import { ethers, providers, Contract } from "ethers";
import { Governance } from "../assets/Governance";
import axios from 'axios';

export default function Home() {
  const CONTRACT_ADDRESS="0xE677c862F37fD376C31Fb3BCe5C8D375a7b4D0C8";
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [CompanyAbout, setCompanyAbout] = useState("");
  const [amount, setAmount] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [currentAccount, setCurrentAccount] = useState("acc");
  const web3ModalRef = useRef();
  const [sig, setSig] = useState("");
  const [contract, setContract] = useState(null);
  


  const connectWallet = async () => {
    
    await checkIfWalletIsConnected();
    setWalletConnected(true);
    setWallet("Wallet connected");

    const signer = await checkIfWalletIsConnected(true);
    setCurrentAccount(await signer.getAddress());
      const NContract = new Contract(
        CONTRACT_ADDRESS,
        Governance,
        signer
      );
      setContract(NContract)
    console.log("signer", signer);
    
  };

  const checkIfWalletIsConnected = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
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

  const handleTextSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/text', {
        text: CompanyAbout,
      });

      console.log(response.data);
      return response.data.hash;
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleAmountChange = (e) => {
    console.log(e.target.value);
    setAmount(e.target.value);
  };
  const handleCompanyAbout = (e) => {
    console.log(e.target.value);
    setCompanyAbout(e.target.value);
  };
  const handleCompanyNameChange = (e) => {
    console.log(e.target.value);
    setCompanyName(e.target.value);
  };

  const handleCreateButtonClick = async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("companyName", companyName);
    
    const result=  await handleTextSubmit();
    console.log("result",result)
//const result="abc"

    let createAccount = await contract.create_account(
      companyName,
      amount*10**15,
      result
    );
    await createAccount.wait();
    console.log(createAccount.hash);


    ;
    navigate(`/Profile?${queryParams.toString()}`);
  };

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
    <div>
      <div className="homeheader">
        <button className="homeheaderbutton" onClick={() => navigate(-1)}>
          <Header />
        </button>
        <button class="button-30" onClick={connectWallet}>{currentAccount?(currentAccount.slice(0,4)).concat("...",(currentAccount.slice(38))):"Connect"}</button>
      </div>
      <div className="Home">
        <p> Create your governance mechanism in minutes</p>
        <div className="homeform">
          <input
            type="text"
            onChange={handleCompanyNameChange}
            placeholder="Company's Name"
          />
          <input
            type="text"
            onChange={handleCompanyAbout}
            placeholder="About Company "
          />
          <input
            onChange={handleAmountChange}
            type="number"
            min="0"
            placeholder="Enter the cost of vote (10^15 ethers)"
          />

          <button class="button-30" onClick={handleCreateButtonClick}>
            Create
          </button>
        </div>
      </div>

      {/* <button onClick={() => navigate("/Profile")}>Create</button> */}
    </div>
  );
}
