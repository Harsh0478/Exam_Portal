import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddTeacher.css";
import axios from "axios";
import apis from "../../../services/Apis";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      loading: false,
    };
  }

  handleChange = (field) => (event) => {
    this.setState({ [field]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, confirmpassword } = this.state;

    if (password !== confirmpassword) {
      Alert("error", "Invalid Input", "Confirm Password does not match");
      return;
    }

    try {
      this.setState({ loading: true });
      const response = await axios.post(
        apis.BASE + apis.ADD_TEACHER,
        { username: name, email, password },
        {
          headers: {
            Authorization: `Bearer ${Auth.retriveToken()}`,
          },
        }
      );

      if (response.data.success) {
        Alert("info", "Success", response.data.message);
        // Optionally clear form after success
        this.setState({
          name: "",
          email: "",
          password: "",
          confirmpassword: "",
        });
      } else {
        Alert("error", "Failed", response.data.message);
      }
    } catch (error) {
      Alert("error", "Error", error.message || "Something went wrong");
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
    }
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    }

    if (!this.props.user.isLoggedIn) {
      // You can show a loader here if you want
      return <div>Loading...</div>;
    }

    const { name, email, password, confirmpassword, loading } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form-class">
        <h2>Add Teacher</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={this.handleChange("name")}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={this.handleChange("email")}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={this.handleChange("password")}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            id="confirmpassword"
            type="password"
            value={confirmpassword}
            onChange={this.handleChange("confirmpassword")}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Adding..." : "Add Teacher"}
        </button>

        <Link className="back-link" to="/home">
          ← Back to Home
        </Link>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  getAdminDetails,
})(AddTeacher);
