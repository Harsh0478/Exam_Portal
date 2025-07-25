import React from "react";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import {
  TableBody, TableCell, TableRow,
  Table, TableHead, TableContainer,
  Paper, Button
} from "@material-ui/core";
import { getTestResultStudent } from "../../../redux/actions/studentTestAction";

const styles = {
  tableWrapper: {
    backgroundColor: '#f4f6f8',
    padding: '24px',
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
  lowercase: {
    textTransform: 'lowercase',
  },
  viewBtn: {
    backgroundColor: '#6366f1',
    color: '#fff',
    padding: '6px 14px',
    fontWeight: 500,
    borderRadius: '6px',
    fontSize: '0.85rem',
    textTransform: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#4f46e5',
    },
  },
};

class CompletedTestTableStudent extends React.Component {
  onTestClick = (event, id) => {
    console.log("view result for test " + id);
    this.props.getTestResultStudent({ testid: id });
  };

  render() {
    const { classes, testlist } = this.props;

    return (
      <div className={classes.tableWrapper}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell className={classes.headerCell}>Test</TableCell>
                <TableCell className={classes.headerCell}>Status</TableCell>
                <TableCell className={classes.headerCell}>Total Marks</TableCell>
                <TableCell className={classes.headerCell}>View</TableCell>
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
                  <TableCell className={classes.tableCell}>
                    <Button
                      className={classes.viewBtn}
                      onClick={(e) => this.onTestClick(e, test._id)}
                    >
                      View
                    </Button>
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
  getTestResultStudent,
})(withStyles(styles)(CompletedTestTableStudent));
