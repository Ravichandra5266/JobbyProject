import { Component } from "react";

import { TailSpin } from "react-loader-spinner";

import { AiFillCaretRight } from "react-icons/ai";

import { AiFillCaretLeft } from "react-icons/ai";

import Cookies from "js-cookie";

import Header from "../Header";

import MyProfile from "../MyProfile";

import Search from "../Search";

import JobsListDetails from "../JobsListDetails";

import "./index.css";

const employmentTypesList = [
  {
    label: "Full Time",
    employmentTypeId: "FULLTIME",
  },
  {
    label: "Part Time",
    employmentTypeId: "PARTTIME",
  },
  {
    label: "Freelance",
    employmentTypeId: "FREELANCE",
  },
  {
    label: "Internship",
    employmentTypeId: "INTERNSHIP",
  },
];

const salaryRangesList = [
  {
    salaryRangeId: "1000000",
    label: "10 LPA and above",
  },
  {
    salaryRangeId: "2000000",
    label: "20 LPA and above",
  },
  {
    salaryRangeId: "3000000",
    label: "30 LPA and above",
  },
  {
    salaryRangeId: "4000000",
    label: "40 LPA and above",
  },
];

const apistatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

const Limit = 6;

class Jobs extends Component {
  state = {
    empTypes: [],
    empSalary: [],
    searchValue: "",
    jobsApiStatus: apistatusConstant.initial,
    jobsListData: [],
    activePage: 1,
    noOfPages: 0,
  };

  componentDidMount() {
    this.getJobsData();
  }

  getJobsData = async () => {
    this.setState({ jobsApiStatus: apistatusConstant.inProgress });
    const token = Cookies.get("jwt_token");
    const { searchValue, empSalary, empTypes, activePage } = this.state;
    const offset = (activePage - 1) * Limit;
    const JobsApi = `https://apis.ccbp.in/jobs?offset=${offset}&limit=${Limit}&employment_type=${empTypes}&minimum_package=${empSalary}&search=${searchValue}`;
    // console.log(JobsApi);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(JobsApi, options);
    // console.log(responseUrl);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();
      const jobsListlength = responseData.total;
      const totalNoOfPages = Math.ceil(jobsListlength / Limit);
      // console.log(responseUrl);

      const updatedData = responseData.jobs.map((each) => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }));
      // console.log(updatedData);
      this.setState({
        jobsApiStatus: apistatusConstant.success,
        jobsListData: updatedData,
        noOfPages: totalNoOfPages,
      });
    } else {
      this.setState({ jobsApiStatus: apistatusConstant.failure });
    }
  };

  renderJobsLoadingView = () => (
    <div className="jobs-loading-container">
      <TailSpin color="blue" height={50} width={50} />
    </div>
  );

  renderJobsSuccessView = () => {
    const { noOfPages, activePage, jobsListData } = this.state;

    return (
      <>
        {jobsListData.length > 0 ? (
          <>
            <ul className="jobs-items-list-container">
              {jobsListData.map((each) => (
                <JobsListDetails each={each} key={each.id} />
              ))}
            </ul>
            <div className="pagination-btn">
              <button
                type="button"
                className="pg-btn"
                onClick={this.onClickDecPage}
              >
                <AiFillCaretLeft />
              </button>
              <p className="page-text">{`${activePage} of ${noOfPages}`}</p>
              <button
                type="button"
                className="pg-btn"
                onClick={this.onClickIncPage}
              >
                <AiFillCaretRight />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-jobs-list-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-job-img"
            />
            <h1 className="no-job-title">No Job Found</h1>
            <p className="no-job-description">
              We could not find anu job.Try others filters
            </p>
          </div>
        )}
      </>
    );
  };

  onClickJobs = () => {
    this.getJobsData();
  };

  renderJobsFailureView = () => (
    <div className="job-failure-conatiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="job-failure-title">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page your looking for.
      </p>
      <button
        type="button"
        className="job-failure-btn"
        onClick={this.onClickJobs}
      >
        Retry
      </button>
    </div>
  );

  renderJobsData = () => {
    const { jobsApiStatus } = this.state;
    switch (jobsApiStatus) {
      case apistatusConstant.success:
        return this.renderJobsSuccessView();
      case apistatusConstant.inProgress:
        return this.renderJobsLoadingView();
      case apistatusConstant.failure:
        return this.renderJobsFailureView();
      default:
        return null;
    }
  };

  onChangeEmpTypeOption = (event) => {
    if (event.target.checked) {
      this.setState(
        (prevState) => ({
          empTypes: [...prevState.empTypes, event.target.value],
        }),
        this.getJobsData
      );
    } else {
      this.setState(
        (prevState) => ({
          empTypes: prevState.empTypes.filter(
            (each) => each !== event.target.value
          ),
        }),
        this.getJobsData
      );
    }
  };

  onChangeEmpSalaryOption = (event) => {
    if (event.target.checked) {
      this.setState({ empSalary: event.target.value }, this.getJobsData);
    }
  };

  onClickIncPage = () => {
    const { activePage, noOfPages } = this.state;
    if (activePage < noOfPages) {
      this.setState(
        (prevState) => ({
          activePage: prevState.activePage + 1,
        }),
        this.getJobsData
      );
    }
  };

  onClickDecPage = () => {
    const { activePage } = this.state;
    if (activePage > 1) {
      this.setState(
        (prevState) => ({
          activePage: prevState.activePage - 1,
        }),
        this.getJobsData
      );
    }
  };

  onChangeSearchInputValue = (value) => {
    this.setState({ searchValue: value }, this.getJobsData);
  };

  render() {
    const { searchValue } = this.state;
    // console.log(empTypes);
    return (
      <div className="jobs-page-container">
        <Header />
        <div className="jobs-page-flex-container">
          <div className="job-left-side-container">
            <MyProfile />
            <div className="emp-type-container">
              <h1 className="emp-title">Employment Type</h1>
              <ul className="emp-type-list-container">
                {employmentTypesList.map((each) => (
                  <li key={each.employmentTypeId}>
                    <input
                      id={each.employmentTypeId}
                      type="checkbox"
                      value={each.employmentTypeId}
                      onChange={this.onChangeEmpTypeOption}
                      className="filters-input"
                    />
                    <label
                      htmlFor={each.employmentTypeId}
                      className="filters-labels"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="hr-line" />
            </div>
            <div className="emp-salary-container">
              <h1 className="emp-salary-title">Salary Range</h1>

              <ul className="emp-salary-list-container">
                {salaryRangesList.map((each) => (
                  <li key={each.salaryRangeId}>
                    <input
                      id={each.salaryRangeId}
                      type="radio"
                      name="salary"
                      value={each.salaryRangeId}
                      onChange={this.onChangeEmpSalaryOption}
                      className="filters-input"
                    />
                    <label
                      htmlFor={each.salaryRangeId}
                      className="filters-labels"
                    >
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="hr-line" />
            </div>
          </div>
          <div className="jobs-right-side-container">
            <Search
              onChangeSearchInputValue={this.onChangeSearchInputValue}
              searchValue={searchValue}
            />
            {this.renderJobsData()}
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;
