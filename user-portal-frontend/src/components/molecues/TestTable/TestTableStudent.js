import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  TableBody, TableCell, TableRow,
  Table, TableHead, TableContainer,
  Paper, Button
} from "@material-ui/core";
import { studentTestRegister } from "../../../redux/actions/studentTestAction";
import { getDatePretty, getTimePretty } from "../../../helper/common";

const styles = {
  tableWrapper: {
    padding: '24px',
    backgroundColor: '#f5f7fa',
    borderRadius: '12px',
  },
  tableContainer: {
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  tableHeader: {
    backgroundColor: '#1e293b',
  },
  headerCell: {
    color: '#ffffff',
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
  },
  tableRow: {
    backgroundColor: '#ffffff',
    '&:nth-of-type(even)': {
      backgroundColor: '#f1f5f9',
    },
    '&:hover': {
      backgroundColor: '#e2e8f0',
    },
  },
  tableCell: {
    padding: '12px',
    fontSize: '0.92rem',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb',
  },
  registerBtn: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    padding: '6px 14px',
    fontWeight: 500,
    borderRadius: '6px',
    fontSize: '0.85rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#2563eb',
    },
  },
  statusText: {
    color: '#64748b',
    fontWeight: 500,
    fontSize: '0.85rem',
  },
  lowercase: {
    textTransform: 'lowercase',
  }
};

class TestTableStudent extends React.Component {
  onTestRegister = (event, id) => {
    this.props.studentTestRegister({ testid: id });
  };

  render() {
    const { classes, testlist } = this.props;

    return (
      <div className={classes.tableWrapper}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                {[
                  "Test", "Status", "Total Marks", "Duration (hrs)", "Reg. Start",
                  "Reg. End", "Test Start", "Test End", "Result", "Register"
                ].map((title, idx) => (
                  <TableCell key={idx} className={classes.headerCell}>
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {testlist.map((test, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell className={classes.tableCell}>{test.title}</TableCell>
                  <TableCell className={`${classes.tableCell} ${classes.lowercase}`}>
                    {test.status}
                  </TableCell>
                  <TableCell className={classes.tableCell}>{test.maxmarks}</TableCell>
                  <TableCell className={classes.tableCell}>{getTimePretty(test.duration)}</TableCell>
                  <TableCell className={classes.tableCell}>{getDatePretty(test.regStartTime)}</TableCell>
                  <TableCell className={classes.tableCell}>{getDatePretty(test.regEndTime)}</TableCell>
                  <TableCell className={classes.tableCell}>{getDatePretty(test.startTime)}</TableCell>
                  <TableCell className={classes.tableCell}>{getDatePretty(test.endTime)}</TableCell>
                  <TableCell className={classes.tableCell}>{getDatePretty(test.resultTime)}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {test.isRegistered === false ? (
                      test.status === 'REGISTRATION_STARTED' ? (
                        <Button
                          className={classes.registerBtn}
                          onClick={(e) => this.onTestRegister(e, test._id)}
                        >
                          Register
                        </Button>
                      ) : (
                        <span className={classes.statusText}>Not Registered</span>
                      )
                    ) : (
                      <span className={classes.statusText}>Registered</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStatetoProps = (state) => ({
  testlist: state.testDetails.list,
});

export default connect(mapStatetoProps, {
  studentTestRegister,
})(withStyles(styles)(TestTableStudent));
