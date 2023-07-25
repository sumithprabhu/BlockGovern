import Header from "../components/Header";
import Vote from "../components/Vote";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { Governance } from "../assets/Governance";
import { ethers, providers, Contract } from "ethers";
import Web3Modal from "web3modal";
import TransactionPopUp from "../components/TransactionPopUp";

export default function Profile() {
 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const companyName = searchParams.get("companyName") || "Default Company"; // Use a default value if companyName is not provided

  const [Headline, setHeadline] = useState("");
  const [cost, setCost] = useState();
  const [About, SetAbout] = useState("");
 
  const [walletConnected, setWalletConnected] = useState(false);
 
  const [currentAccount, setCurrentAccount] = useState("acc");
  const web3ModalRef = useRef();

  const [contract, setContract] = useState(null);
  const CONTRACT_ADDRESS = "0xb586a828Aa1fDFA6F2B5CcD1a4A66d15c254DA9f";
  const [company_about, setCompany_about] = useState("");
  const[postsid,setPostsid]=useState([]);

  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [transactionUpdates,setTransactionUpdates] =useState("");

  const getTextData = async (hash) => {
    try {
      const response = await axios.get(`http://localhost:3001/text/${hash}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleCostChange = (e) => {
    console.log(e.target.value);
    setCost(e.target.value);
  };

  const handleHeadlineChange = (e) => {
    console.log(e.target.value);
    setHeadline(e.target.value);
  };
  const handleAboutChange = (e) => {
    console.log(e.target.value);
    SetAbout(e.target.value);
  };
  const handleJsonSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3001/json', {
        body: About,
        title: Headline,
      });

      console.log(response.data);
      return response.data.hash;
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreatePost = async() => {
    if (Headline.trim() && About.trim() ) {
      const amount = await contract.retrieve_post_amount(companyName)
      alert(`A cost of ${parseInt(amount)/(10**18)} matic would be charged for the post`)
      setLoading(true);
      setTransactionUpdates("Publishing post")
      const result=await handleJsonSubmit();
      console.log("resultpost:",result)
      
      console.log(parseInt(amount))
      const createpost=await contract.post(companyName,result,cost*10**14,{value: (parseInt(amount).toString())});
      await createpost.wait();
      console.log(createpost.hash);
      setLoading(false);
      
      
      setHeadline("");
      SetAbout("");
      setCost();
      
    }
  };

  const connectWallet = async () => {
    await checkIfWalletIsConnected();
    setWalletConnected(true);
  
    const signer = await checkIfWalletIsConnected(true);
    setCurrentAccount(await signer.getAddress());
    const NContract = new Contract(CONTRACT_ADDRESS, Governance, signer);
    setContract(NContract);
    console.log("signer", signer);
  };
  
  const retrieve_about = async () => {
    const company_about_id = await contract.retrieve_about(companyName);
    const company_about = await getTextData(company_about_id);
    setCompany_about(company_about);
    
    retrieve_post();
  
  };
  const retrieve_post=async()=>{
    const postarr=await contract.retrieve_post(companyName);
    //console.log(postarr)
    setPostsid(postarr);
    console.log(postsid);
    await retrieve_post_intoarr();  
}


const retrieve_post_intoarr=async()=>
{
  for(let index=0;index<postsid.length;index++){
    const result= await getJsonData(postsid[index]);
    setPosts(previtems=>[...previtems,result]);
  }
}


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
      retrieve_about();
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


const getJsonData = async (hash) => {
    try {
      const response = await axios.get(`http://localhost:3001/json/${hash}`);
      console.log(response.data);
      const result=[]
      result.push(response.data.body);
      result.push(response.data.title);
      result.push(hash);
      console.log("result:",result)
      return result;
      
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div >
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

      <div className="profile">
        <div className="profileabout2">
          <div className="profileabout">
            <h1 children="h1about">{companyName} </h1>
            <h4>About</h4>
            <p className="companyabout">{company_about}</p>
          </div>
        </div>

        <div className="profilevote">
          {posts.length > 0 ? (
            
            posts.map((post, index) => (

              <Vote
                key={index}
                headline={post[0]}
                about={post[1]}
                contract={contract}
                post_cont_id={post[2]}
                companyName={companyName}
              />
            ))
          ) : (
            // If no votes available, display "NO VOTES AVAILABLE"
            <p>NO VOTES AVAILABLE</p>
          )}
        </div>

        <div>
          <div className="createpost">
            <h2>Create Post</h2>

            <input
              onChange={handleHeadlineChange}
              type="text"
              placeholder="Enter Title"
              value={Headline}
              className="homeforminput"
            />
            
            <textarea rows={4} className="homeforminput" onChange={handleAboutChange} type="text" placeholder="Enter the post body" value={About}/>
            <textarea rows={2}  className="homeforminput" onChange={handleCostChange} type="text" placeholder="Enter the Cost for each vote (10^14 ethers)"value={cost}/>
            <button class="button-40" onClick={handleCreatePost}>
              Create
            </button>
          </div>
          
        </div>
      </div>
      {loading ? (
        <TransactionPopUp
          setLoading={setLoading}
          transactionUpdates={transactionUpdates}
          setTransactionUpdates={setTransactionUpdates}
        />
      ) : null}
    </div>
  );
}
