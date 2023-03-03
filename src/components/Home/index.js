import Header from "../Header";

import "./index.css";

const Home = (props) => {
  const onClickJobs = () => {
    const { history } = props;
    history.replace("/jobs");
  };
  return (
    <div className="home-page-container">
      <Header />
      <div className="sm-home-page-bg-container">
        <div className="home-page-content-container">
          <h1 className="home-title">Find The Job That Fit For Your Life</h1>
          <p className="home-description">
            Millions of People Are Searching For Jobs, Salary
            Information,Company Reviews,Find The Job That Fit Your Abilities And
            Potential.
          </p>
          <button type="button" className="find-jobs-btn" onClick={onClickJobs}>
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
