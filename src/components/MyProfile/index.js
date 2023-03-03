import { Component } from "react";

import Cookies from "js-cookie";

import { TailSpin } from "react-loader-spinner";

import "./index.css";

const apistatusConstant = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "INPROGRESS",
};

class MyProfile extends Component {
  state = {
    myprofileApiStatus: apistatusConstant.initial,
    profileData: {},
  };

  componentDidMount() {
    this.getMtProfileData();
  }

  getMtProfileData = async () => {
    this.setState({ myprofileApiStatus: apistatusConstant.inProgress });
    const MyProfileApi = "https://apis.ccbp.in/profile";
    const token = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const responseUrl = await fetch(MyProfileApi, options);
    // console.log(responseUrl);
    if (responseUrl.ok) {
      const responseData = await responseUrl.json();
      // console.log(responseData);
      const updatedData = {
        name: responseData.profile_details.name,
        profileImg: responseData.profile_details.profile_image_url,
        shortBio: responseData.profile_details.short_bio,
      };
      this.setState({
        myprofileApiStatus: apistatusConstant.success,
        profileData: updatedData,
      });
    } else {
      this.setState({ myprofileApiStatus: apistatusConstant.failure });
    }
  };

  renderMyprofileLoadingView = () => (
    <div className="myProfile-loading-container">
      <TailSpin color="blue" height={50} width={50} />
    </div>
  );

  renderMyprofileSuccessView = () => {
    const { profileData } = this.state;
    return (
      <div className="myprofile-content-container">
        <img
          src={profileData.profileImg}
          alt={profileData.name}
          className="myprofile-img"
        />
        <h1 className="myprofile-title">{profileData.name}</h1>
        <p className="myprofile-description">{profileData.shortBio}</p>
      </div>
    );
  };

  onClickRetry = () => {
    this.getMtProfileData();
  };

  renderMyprofileFailureView = () => (
    <div className="myprofile-failure-container">
      <button
        type="button"
        className="myprofile-failure-btn"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  );

  renderMyProfileDetails = () => {
    const { myprofileApiStatus } = this.state;
    switch (myprofileApiStatus) {
      case apistatusConstant.success:
        return this.renderMyprofileSuccessView();
      case apistatusConstant.failure:
        return this.renderMyprofileFailureView();
      case apistatusConstant.inProgress:
        return this.renderMyprofileLoadingView();
      default:
        return null;
    }
  };
  render() {
    return (
      <div className="myprofile-conatainer">
        {this.renderMyProfileDetails()}
        <hr className="hr-line" />
      </div>
    );
  }
}

export default MyProfile;
