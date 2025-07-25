import React from "react";
import { Navigate } from "react-router-dom";
import './login.css';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/loginAction';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  usernameInputHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  passwordInputHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser({ username, password });
  };

  render() {
    if (this.props.user.isLoggedIn) {
      return <Navigate to="/home" />;
    }

    return (
      <div className="login-box">
        <h2 className="login-box-title">Admin Login</h2>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="user-box">
            <input
              autoComplete="off"
              className="input-field"
              type="text"
              value={this.state.username}
              onChange={this.usernameInputHandler}
              required
              id="username"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="user-box">
            <input
              autoComplete="off"
              className="input-field"
              type="password"
              value={this.state.password}
              onChange={this.passwordInputHandler}
              required
              id="password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="button" type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            LOGIN
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
