import { useState } from "react";
import "../App.css";
import img from "../images/st.png";

export default function Vote({ headline, about, image }) {
  const [voting, setVoting] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [voted, setVoted] = useState(false);
  const [voteChoice, setVoteChoice] = useState(""); // It will store "Yes" or "No" based on the checkbox selection

  const handleImageLoad = (e) => {
    setImageUrl(e.target.result);
  };

  const handleVoteClick = () => {
    if (voting) {
      if (voteChoice === "") {
        // If the user hasn't selected any vote choice, do not proceed
        return;
      }

      setVoting(false);
      setVoted(true); // Marking that the user has voted
      // Send the vote data to the server or perform any other necessary actions
    }
  };

  if (image && image.length > 0) {
    const reader = new FileReader();
    reader.onload = handleImageLoad;
    reader.readAsDataURL(image[0]);
  }

  return (
    <div className="vote">
      {voted ? ( // If the user has voted, display "Voted Successfully" and the vote choice (Yes/No)
        <div className="votebutton">
          <div className="profilevotemain">
            <div className="profilevoteleft">
              <h2>{headline}</h2>
              <p>{about}</p>
              <div class="progress">vote %</div>
            </div>
            <div className="profilevoteright">
              {imageUrl && (
                <img className="voteimage" src={imageUrl} alt="Profile" />
              )}
              <p>Voted Successfully</p>
              <p>You voted {voteChoice}</p>
            </div>
          </div>
        </div>
      ) : (
        // If the user has not voted, display the voting UI (checkbox and vote button)
        <div className="votebutton">
          <div className="profilevotemain">
            <div className="profilevoteleft">
              <h2>{headline}</h2>
              <p>{about}</p>
              <div class="progress">vote %</div>
            </div>
            <div className="profilevoteright">
              {imageUrl && (
                <img className="voteimage" src={imageUrl} alt="Profile" />
              )}
              {voting && (
                <>
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setVoteChoice(e.target.checked ? "Yes" : "No")
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
        </div>
      )}
    </div>
  );
}
