import { useEffect, useState } from "react";
import "../App.css";
import TransactionPopUp from "./TransactionPopUp";



export default function Vote({ headline, about,contract ,post_cont_id,companyName}) {
  const [voting, setVoting] = useState(true);
  const [voteChoice, setVoteChoice] = useState(0); // It will store "Yes" or "No" based on the checkbox selection
  const [percvote,setPercvote]=useState(0)
  const [loading,setLoading]=useState(false);
  const [transactionUpdates,setTransactionUpdates] =useState("");

  // const handleImageLoad = (e) => {
  //   setImageUrl(e.target.result);
  // };

  const handleVoteClick = async() => {
    const cost=await contract.retrieve_vote_amount(post_cont_id);
    alert(`A cost of ${parseInt(cost)/(10**18)} matic would be charged for the vote`)
    setLoading(true);
    setTransactionUpdates("Publishing vote");
    

    const vote_sub= await contract.vote(companyName,voteChoice,post_cont_id,{value: (parseInt(cost).toString())});
    await vote_sub.wait()
    console.log(vote_sub.hash)
    setLoading(false)
  };

  // if (image && image.length > 0) {
  //   const reader = new FileReader();
  //   reader.onload = handleImageLoad;
  //   reader.readAsDataURL(image[0]);
  // }
  const load_vote=async()=>{
    const yes=await contract.retrieve_vote_yes(post_cont_id)
    const no=await contract.retrieve_vote_no(post_cont_id)
    const perc=(parseInt(yes)/(parseInt(yes)+parseInt(no)))*100;
    setPercvote(perc)
  };

  useEffect(()=>{

    load_vote()
  },[])

  return (
    <div className="vote">
        <div className="votebutton">
          <div className="profilevotemain">
            <div className="profilevoteleft">
              <h2>{about}</h2>
              <p>{headline}</p>
              <div className="progress" style={{ height: 30 }}>
                
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${percvote}%` }}>{percvote}%</div>
      </div>
            </div>
            <div className="profilevoteright">
              {voting && (
                <>
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setVoteChoice(e.target.checked ? 1: 0)
                      }
                    />
                    <span class="slider"></span>
                  </label>
                  <button
                    onClick={handleVoteClick}
                    class="button-40"
                    role="button"
                  >
                    Vote
                  </button>
                </>
              )}
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
      
    </div>
  );
}
