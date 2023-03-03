import { AiFillStar } from "react-icons/ai";

import "./index.css";

const SimilarJobs = (props) => {
  const { each } = props;
  const { companyLogoUrl, title, rating, jobDescription } = each;
  return (
    <li className="smlr-container">
      <div className="job-flex-container1">
        <img src={companyLogoUrl} alt={title} className="company-logo" />
        <div>
          <h1 className="job-name">{title}</h1>
          <div className="star-container">
            <AiFillStar className="icon" />
            <p className="text">{rating}</p>
          </div>
        </div>
      </div>
      <hr className="hr-line" />
      <h1 className="job-description-title">Description</h1>
      <p className="smlr-job-description">{jobDescription}</p>
    </li>
  );
};

export default SimilarJobs;
