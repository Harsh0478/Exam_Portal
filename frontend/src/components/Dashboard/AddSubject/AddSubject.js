import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
import "./AddSubject.css";
import axios from "axios";
import apis from "../../../services/Apis";

class AddSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      this.setState({ loading: true });
      const response = await axios.post(
        apis.BASE + apis.ADD_SUBJECT,
        { name: this.state.name },
        {
          headers: {
            Authorization: `Bearer ${Auth.retriveToken()}`,
          },
        }
      );

      if (response.data.success) {
        Alert("info", "Success", response.data.message);
        this.setState({ name: "" });
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
      return <div>Loading...</div>;
    }

    return (
      <form onSubmit={this.handleSubmit} className="form-class">
        <h2>Add Subject</h2>
        <div className="form-group">
          <label htmlFor="subjectName">Name</label>
          <input
            id="subjectName"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            required
            disabled={this.state.loading}
          />
        </div>
        <button type="submit" disabled={this.state.loading} className="submit-btn">
          {this.state.loading ? "Adding..." : "Add Subject"}
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
})(AddSubject);
