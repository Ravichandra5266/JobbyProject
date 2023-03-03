import { Component } from "react";

import Cookies from "js-cookie";

import { Redirect } from "react-router-dom";

import "./index.css";

class Login extends Component {
  state = {
    showPassword: false,
    userName: "",
    userPassword: "",
    errorMsg: "",
    isFormsubmitted: false,
  };

  onChangeUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

  onChangeUserPassword = (event) => {
    this.setState({ userPassword: event.target.value });
  };

  onChangeCheckBox = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  onSubmitForm = async (event) => {
    event.preventDefault();
    const { userName, userPassword } = this.state;
    const LoginApi = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify({ username: userName, password: userPassword }),
    };
    // console.log(options);
    const responseUrl = await fetch(LoginApi, options);
    // console.log(responseUrl);
    const responseData = await responseUrl.json();
    // console.log(responseData);
    if (responseUrl.ok) {
      const { history } = this.props;
      Cookies.set("jwt_token", responseData.jwt_token, { expires: 30 });
      history.replace("/");
    } else {
      this.setState({
        isFormsubmitted: true,
        errorMsg: responseData.error_msg,
      });
    }
  };

  render() {
    const { showPassword, userName, userPassword, errorMsg, isFormsubmitted } =
      this.state;
    const token = Cookies.get("jwt_token");
    if (token !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-page-container">
        <div className="login-page-content-container">
          <div className="login-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="login-logo"
            />
          </div>
          <form className="login-form-details" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="form-labels">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-inputs"
              value={userName}
              onChange={this.onChangeUserName}
            />
            <label htmlFor="password" className="form-labels">
              PASSWORD
            </label>
            <div className="password-conatiner">
              {showPassword ? (
                <input
                  type="text"
                  id="password"
                  value={userPassword}
                  className="userpassword-inputs"
                  onChange={this.onChangeUserPassword}
                />
              ) : (
                <input
                  type="password"
                  id="password"
                  value={userPassword}
                  className="userpassword-inputs"
                  onChange={this.onChangeUserPassword}
                />
              )}
              <input
                type="checkbox"
                value={showPassword}
                className="checkbox-input"
                onChange={this.onChangeCheckBox}
              />
            </div>
            {isFormsubmitted && <p className="login-error">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
