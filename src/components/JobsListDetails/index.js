import { AiFillStar } from "react-icons/ai";

import { HiLocationMarker } from "react-icons/hi";

import { BsFillBriefcaseFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import "./index.css";

const JobsListDetails = (props) => {
  const { each } = props;
  // console.log(each);
  const {
    companyLogoUrl,
    employmentType,
    // jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = each;
  return (
    <Link to={`/jobs/${id}`} className="job-details-route-link">
      <li className="jobs-item-container">
        <div className="job-flex-container1">
          <img src={companyLogoUrl} alt={title} className="company-logo" />
          <div>
            <h1 className="job-name">{title}</h1>
            <div className="star-container">
              <AiFillStar className="icon" />
              <p className="text">{rating}</p>
            </div>
            <div className="job-flex-container2">
              <div className="location-container">
                <HiLocationMarker className="icon" />
                <p className="text">{location}</p>
              </div>
              <div className="job-container">
                <BsFillBriefcaseFill className="icon" />
                <p className="text">{employmentType}</p>
              </div>
              <p className="job-package">{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        {/* <hr className="hr-line" /> */}
        {/* <h1 className="job-description-title">Description</h1>
      <p className="job-description">{jobDescription}</p> */}
      </li>
    </Link>
  );
};

export default JobsListDetails;
