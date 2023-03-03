import { AiFillStar } from "react-icons/ai";

import { HiLocationMarker, HiOutlineExternalLink } from "react-icons/hi";

import { BsFillBriefcaseFill } from "react-icons/bs";

import Skills from "../Skills";

import SimilatJobs from "../SimilarJobs";

import "./index.css";

const EachJobDetails = (props) => {
  const { spJobData } = props;
  // console.log(spJobData);
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    jobDescription,
    lifeAtCompany,
    location,
    title,
    packagePerAnnum,
    rating,
    similarJobs,
    employmentType,
    skills,
  } = spJobData;
  return (
    <li className="sp-jobs-item-container">
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
      <hr className="hr-line" />
      <div className="flex-description-container">
        <h1 className="job-description-title">Description</h1>
        <div className="link-contaner">
          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="ancher-tag"
          >
            visit
          </a>
          <HiOutlineExternalLink className="link-icon" />
        </div>
      </div>
      <p className="job-description">{jobDescription}</p>
      <hr className="hr-line" />

      <h1 className="skill-title">Skills</h1>
      <ul className="skills-list-container">
        {skills.map((each) => (
          <Skills each={each} key={each.name} />
        ))}
      </ul>
      <hr className="hr-line" />

      <h1 className="life-comp-title">Life At Company</h1>
      <p className="life-comp-para">{lifeAtCompany.description}</p>
      <img
        src={lifeAtCompany.imageUrl}
        alt={lifeAtCompany.imageUrl}
        className="life-comp-img"
      />
      <hr className="hr-line" />
      <h1 className="smlr-title">Similar Jobs</h1>
      <ul className="smlr-jobs-list-container">
        {similarJobs.map((each) => (
          <SimilatJobs each={each} key={each.id} />
        ))}
      </ul>
    </li>
  );
};

export default EachJobDetails;
