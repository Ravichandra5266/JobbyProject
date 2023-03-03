import { TailSpin } from "react-loader-spinner";

import { Component } from "react";

import Cookies from "js-cookie";

import Header from "../Header";

import EachJobDetails from "../EachJobDetails";

import "./index.css";

const apistatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class JobItemDetails extends Component {
  state = {
    spJobApiStatus: apistatusConstant.initial,
    spJobData: [],
  };

  componentDidMount() {
    this.getSpJobData();
  }

  getSpJobData = async () => {
    this.setState({ spJobApiStatus: apistatusConstant.inProgress });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const token = Cookies.get("jwt_token");
    const SpJobApi = `https://apis.ccbp.in/jobs/${id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(SpJobApi, options);
    // console.log(responseUrl);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();
      // console.log(responseData);
      const jobDetails = responseData.job_details;
      const updatedDatajobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        id: jobDetails.id,
        location: jobDetails.location,
        rating: jobDetails.rating,
        packagePerAnnum: jobDetails.package_per_annum,
        title: jobDetails.title,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        skills: jobDetails.skills.map((each) => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        similarJobs: responseData.similar_jobs.map((eachJob) => ({
          id: eachJob.id,
          companyLogoUrl: eachJob.company_logo_url,
          companyWebsiteUrl: eachJob.company_website_url,
          rating: eachJob.rating,
          location: eachJob.location,
          title: eachJob.title,
          jobDescription: eachJob.job_description,
        })),
      };
      // console.log(updatedDatajobDetails);
      this.setState({
        spJobApiStatus: apistatusConstant.success,
        spJobData: updatedDatajobDetails,
      });
    } else {
      this.setState({ spJobApiStatus: apistatusConstant.failure });
    }
  };

  renderSpJobsLoadingView = () => (
    <div className="sp-job-loading-container">
      <TailSpin color="blue" height={50} width={50} />
    </div>
  );

  renderSpJobsSuccessView = () => {
    const { spJobData } = this.state;
    return (
      <ul className="sp-job-item-data-details">
        <EachJobDetails spJobData={spJobData} />
      </ul>
    );
  };

  onClickSpJobs = () => {
    this.getSpJobData();
  };

  renderSpJobsFailureView = () => (
    <div className="sp-job-failure-conatiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="sp-job-failure-img"
      />
      <h1 className="job-failure-title">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page your looking for.
      </p>
      <button
        type="button"
        className="job-failure-btn"
        onClick={this.onClickSpJobs}
      >
        Retry
      </button>
    </div>
  );

  renderSpJobData = () => {
    const { spJobApiStatus } = this.state;
    switch (spJobApiStatus) {
      case apistatusConstant.success:
        return this.renderSpJobsSuccessView();
      case apistatusConstant.inProgress:
        return this.renderSpJobsLoadingView();
      case apistatusConstant.failure:
        return this.renderSpJobsFailureView();
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="sp-job-container">
        <Header />
        {this.renderSpJobData()}
      </div>
    );
  }
}

export default JobItemDetails;
