import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  allNurses,
  handleNurseAssignment,
} from "../../../redux/actions/userActions";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
    backgroundColor: "#161C24",
  },
});

const UserTable = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const _User = useSelector((state) => state.User);
  const [users, setUsers] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "name", label: "Nume", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "role", label: "Rol", minWidth: 170 },
    {
      id: "assign",
      label: "Alocare",
      minWidth: 170,
      align: "right",
    },
  ];

  useEffect(() => {
    dispatch(allNurses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setUsers(_User.allNurses);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.allNurses]);

  const handleAssignNurse = (nurse) => {
    // code
    let doctorId = _User.selectedDoctor._id;
    let nurseId = nurse._id;
    let doctors = [...nurse.doctors, { _id: _User.selectedDoctor._id }];
    let nurses = [..._User.selectedDoctor.nurses, { _id: nurse._id }];
    console.log("req.body", {
      doctorId,
      nurseId,
      doctors,
      nurses,
    });
    dispatch(
      handleNurseAssignment({
        doctorId,
        nurseId,
        doctors,
        nurses,
      })
    );
  };
  const handleUnAssignNurse = (nurse) => {
    // code
    let doctorId = _User.selectedDoctor._id;
    let nurseId = nurse._id;
    // let doctors = [...nurse.doctors, { _id: _User.selectedDoctor._id }];
    let doctors = nurse.doctors.filter(
      (item, i) => item._id !== _User.selectedDoctor._id
    );
    // let nurses = [..._User.selectedDoctor.nurses, { _id: nurse._id }];
    let nurses = _User.selectedDoctor.nurses.filter(
      (item, i) => item._id !== nurse._id
    );
    console.log("req.body", {
      doctorId,
      nurseId,
      doctors,
      nurses,
    });
    dispatch(
      handleNurseAssignment({
        doctorId,
        nurseId,
        doctors,
        nurses,
      })
    );
  };

  const isNurseAssigned = (_id) => {
    for (let i = 0; i < _User.selectedDoctor.nurses.length; i++) {
      if (_id === _User.selectedDoctor.nurses[i]._id) {
        return true;
      }
    }
    return false;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => (
                <TableCell
                  key={i}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "#212B36",
                    color: "#F9FAFB",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {_User.selectedDoctor
              ? users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                        <TableCell style={{ color: "#fff" }}>
                          {row.name}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.email}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.role}
                        </TableCell>
                        <TableCell align="right">
                          {/* {row.approve} */}
                          {isNurseAssigned(row._id) ? (
                            <button
                              className="unapprove-btn"
                              onClick={() => handleUnAssignNurse(row)}
                            >
                              Alocare
                            </button>
                          ) : (
                            <button
                              className="approve-btn"
                              onClick={() => handleAssignNurse(row)}
                            >
                              Dezalocare
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
              : null}
          </TableBody>
        </Table>
        {_User.allUsersLoading ? (
          <div style={{ textAlign: "center", margin: "20px" }}>
            <CircularProgress style={{ color: "#1CCAFF" }} />
          </div>
        ) : null}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ backgroundColor: "#212B36", color: "#F9FAFB" }}
      />
    </Paper>
  );
};

export default UserTable;
