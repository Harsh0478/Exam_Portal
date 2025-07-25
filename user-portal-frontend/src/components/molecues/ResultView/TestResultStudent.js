import { withStyles } from "@material-ui/styles";
import React from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { getCompletedTestsStudentAction } from "../../../redux/actions/studentTestAction";
import {
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
} from "@material-ui/core";
import TestResultViewQuestions from "./TestResultViewQuestions";
import { setAlert } from "../../../redux/actions/alertAction";

// ✅ Styling
const useStyles = () => ({
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    marginTop: "20px",
  },
  tableBorder: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  table: {
    minWidth: 650,
  },
  tableCell: {
    fontSize: "16px",
    padding: "12px 16px",
  },
  button: {
    backgroundColor: "#3f51b5",
    color: "white",
    margin: "5px",
    padding: "6px 16px",
    '&:hover': {
      backgroundColor: "#303f9f",
    },
  },
});

class TestResultStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleViewQue: false,
    };
  }

  onViewQuestions(event, result) {
    if (result.status !== "RESULT_DECLARED") {
      this.props.setAlert({
        type: "info",
        title: "No Result",
        message: "Test result is not declared",
      });
      return;
    }
    this.setState({
      toggleViewQue: !this.state.toggleViewQue,
    });
  }

  goBack() {
    this.props.getCompletedTestsStudentAction();
  }

  render() {
    const { test, user, classes } = this.props;

    return (
      <div className={classes.container}>
        <TableContainer component={Paper} className={classes.tableBorder}>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell className={classes.tableCell}>Title</TableCell>
                <TableCell className={classes.tableCell}>{test.title}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>Student Name</TableCell>
                <TableCell className={classes.tableCell}>{user.username}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>Status</TableCell>
                <TableCell className={classes.tableCell} style={{ textTransform: 'lowercase' }}>
                  {test.status}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>Subjects</TableCell>
                <TableCell className={classes.tableCell}>{test.subjects}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>Total Marks</TableCell>
                <TableCell className={classes.tableCell}>{test.maxmarks}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>Obtained Marks</TableCell>
                <TableCell className={classes.tableCell}>
                  {test.status === "RESULT_DECLARED"
                    ? test.score
                    : "Result not declared"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}>Questions</TableCell>
                <TableCell className={classes.tableCell}>
                  <Button
                    className={classes.button}
                    onClick={(event) => this.onViewQuestions(event, test)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableCell}></TableCell>
                <TableCell className={classes.tableCell}>
                  <Button
                    className={classes.button}
                    onClick={() => this.goBack()}
                  >
                    Back
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {this.state.toggleViewQue && <TestResultViewQuestions />}
      </div>
    );
  }
}

// ✅ Redux mapping
const mapStatetoProps = (state) => ({
  test: state.testDetails.test,
  user: state.user.userDetails,
});

// ✅ Export with styles and Redux
export default withStyles(useStyles)(
  connect(mapStatetoProps, {
    getCompletedTestsStudentAction,
    setAlert,
  })(TestResultStudent)
);
