import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from "../../basic/Homepage/main.jpg";
import { MainCard } from "../Card/card";
import TeacherImg from "../teacher.png";
import StudentImg from "../student.jfif";
import SubjectImg from "../subject.jfif";
import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";
import "./dashboardMain.css";

class DashboardMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedTable: null,
    };
  }

  componentDidMount() {
    if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
    }
    if (!this.props.dashboardDetails.retrived) {
      this.props.getDashboardCount();
    }
  }

  logout = () => {
    this.props.logoutUser();
  };

  toggleTableExpand = (type) => {
    this.setState((prevState) => ({
      expandedTable: prevState.expandedTable === type ? null : type,
    }));
  };

  renderTable() {
    const { expandedTable } = this.state;
    switch (expandedTable) {
      case "Teacher":
        return <TeacherTable />;
      case "Student":
        return <StudentTable />;
      case "Subject":
        return <SubjectTable />;
      default:
        return null;
    }
  }

  render() {
    const { user, dashboardDetails } = this.props;

    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    }

    if (!user.isLoggedIn) {
      return <div>Loading...</div>;
    }

    return (
      <div className="dashboard-container">
        <HomepageHeader title="Exam Portal" img={logoImg} />
        <button className="logout-btn" onClick={this.logout}>
          Logout
        </button>

        <MainCard
          title="Teacher"
          value={dashboardDetails.teacherActive}
          total={dashboardDetails.teacherActive + dashboardDetails.teacherBlocked}
          image={TeacherImg}
        />
        <div className="inline-block">
          <Link to="/addTeacher" className="link-btn">
            <button className="dashboard-button">Add Teacher</button>
          </Link>
          <br />
          <button
            className="dashboard-button"
            onClick={() => this.toggleTableExpand("Teacher")}
          >
            {this.state.expandedTable === "Teacher" ? "Hide" : "Show"}
          </button>
        </div>

        <MainCard
          title="Student"
          value={dashboardDetails.studentActive}
          total={dashboardDetails.studentActive + dashboardDetails.studentBlocked}
          image={StudentImg}
        />
        <div className="inline-block">
          <button
            className="dashboard-button"
            onClick={() => this.toggleTableExpand("Student")}
          >
            {this.state.expandedTable === "Student" ? "Hide" : "Show"}
          </button>
        </div>

        <MainCard
          title="Subject"
          value={dashboardDetails.subjectActive}
          total={dashboardDetails.subjectActive + dashboardDetails.subjectBlocked}
          image={SubjectImg}
        />
        <div className="inline-block">
          <Link to="/addSubject" className="link-btn">
            <button className="dashboard-button">Add Subject</button>
          </Link>
          <br />
          <button
            className="dashboard-button"
            onClick={() => this.toggleTableExpand("Subject")}
          >
            {this.state.expandedTable === "Subject" ? "Hide" : "Show"}
          </button>
        </div>

        <br />
        {this.renderTable()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  dashboardDetails: state.dashboardDetails,
});

export default connect(mapStateToProps, {
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain);
