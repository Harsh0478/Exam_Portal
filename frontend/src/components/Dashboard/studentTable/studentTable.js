import React from "react";
import { connect } from "react-redux";
import { getStudentDetails, StudentToggleStatus } from "../../../redux/actions/studentDetails";
import './studentTable.css';

class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      togglingId: null, // for disabling button while toggling status
    };
  }

  handleStatusChange = async (currentStatus, id) => {
    this.setState({ togglingId: id });
    await this.props.StudentToggleStatus(currentStatus, id, this.props.getStudentDetails);
    this.setState({ togglingId: null });
  };

  buttonTextBasedOnStatus = (status) => {
    // If true = active, show 'Block' button; if false = blocked, show 'Unblock'
    return status ? "Block" : "Unblock";
  };

  render() {
    const { students } = this.props;

    if (!students.retrived) {
      this.props.getStudentDetails();
      return <div>Collecting data...</div>;
    }

    return (
      <div className="main">
        <h2 className="title">Students</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.list.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.status ? "Active" : "Blocked"}</td>
                <td>
                  <button
                    onClick={() => this.handleStatusChange(student.status, student.id)}
                    disabled={this.state.togglingId === student.id}
                    style={{ cursor: this.state.togglingId === student.id ? "not-allowed" : "pointer" }}
                  >
                    {this.buttonTextBasedOnStatus(student.status)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps, {
  getStudentDetails,
  StudentToggleStatus,
})(StudentTable);
