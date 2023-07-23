import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import "../App.css";
// import Button from "react-bootstrap/Button";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <div className="Intro">
        <div className="introabout">
          <h2 className="introheader">About BlockGovernance</h2>
          <h4>
            A tool or a platform which makes decentralized governance easy.
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h4>
        </div>

        <div className="introbuttondiv">
          <p>Proceed to project :</p>
          <button
            class="button-30"
            onClick={() => navigate("/Home")}
            role="button"
          >
            BlockGovernance
          </button>
        </div>
      </div>

      {/* <button onClick={() => navigate("/Home")}>Project</button> */}
    </div>
  );
}
