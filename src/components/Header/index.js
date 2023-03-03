import { AiFillHome } from "react-icons/ai";

import { BsFillBriefcaseFill } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";

import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };
  return (
    <nav className="nav-page-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="sm-nav-items-container">
        <Link to="/" className="route-link">
          <li className="home-icon">
            <AiFillHome />
          </li>
        </Link>
        <Link to="/jobs" className="route-link">
          <li className="job-icon">
            <BsFillBriefcaseFill />
          </li>
        </Link>

        <li>
          <button
            type="button"
            className="sm-logout-btn"
            onClick={onClickLogout}
          >
            <FiLogOut className="logout-icon" />
          </button>
        </li>
      </ul>
      <ul className="lg-nav-items-container">
        <Link to="/" className="route-link">
          <li className="nav-item-text">Home</li>
        </Link>
        <Link to="/jobs" className="route-link">
          <li className="nav-item-text">Jobs</li>
        </Link>
        <li className="nav-item-text">
          <button
            type="button"
            className="lg-logout-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default withRouter(Header);
