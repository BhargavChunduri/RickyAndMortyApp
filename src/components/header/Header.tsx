import "./header.css";
import ReactIcon from "../../assets/react.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="headerContainer">
        <Link to="./">
          <img src={ReactIcon} alt="" />
        </Link>
        <ol className="headerRight">
          <li className="headerRightTheme ">
            <a href="https://rickandmortyapi.com/documentation" target="_blank">
              Docs
            </a>
          </li>
          <li className="headerRightTheme ">
            <a href="https://rickandmortyapi.com/about" target="_blank">
              About us
            </a>
          </li>
          <li className="headerRightTheme border-solid border-2 border-orange-400 rounded-md ">
            <a href="https://rickandmortyapi.com/support-us" target="_blank">
              Support Us
            </a>
          </li>
        </ol>
      </div>
    </>
  );
}
export default Header;
