import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../App.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="introheader1">
        <Header />
        <div className="introbuttondiv">
          <button
            class="button-30"
            onClick={() => navigate("/Home")}
            role="button"
          >
            Launch Dapp
          </button>
        </div>
      </div>

      <div className="Intro">
        <div className="introabout">
          <h2 className="introheader">About BlockGovern</h2>
          <br></br>
          <h4>
            BlockGovern is a groundbreaking decentralized application (DApp)
            revolutionizing small organization's governance systems. This
            innovative platform empowers organizations to create their
            governance structure without the complexities of launching a token.
            With just a few clicks, organizations can register and receive a
            personalized URL, leading to a dedicated page.
            <br></br> 
            <br></br>
            BlockGovern's user-friendly interface and fee distribution mechanism make it an
            ideal platform for small organizations seeking efficient and
            transparent governance solutions. Embracing blockchain's security
            and decentralization, BlockGovern fosters a sense of community,
            transparency, and collective decision-making like never before."
          </h4>
        </div>
      </div>

      {/* <button onClick={() => navigate("/Home")}>Project</button> */}
    </div>
  );
}
