import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
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

const SurgeryTable = ({ handleEditPatient, handleDetailView }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const _User = useSelector((state) => state.User);
  const _patient = useSelector((state) => state.patient);
  const [patients, setPatients] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "nrSala", label: "Nr sala", minWidth: 70 },
    { id: "data", label: "Data", minWidth: 70 },
    { id: "salaOcupata", label: "Sala ocupata (ore)", minWidth: 70 },
    { id: "numeDr", label: "Nume doctor", minWidth: 70 },
    { id: "numePac", label: "Nume pacient", minWidth: 70 },
    { id: "numeOp", label: "Denumire operatie", minWidth: 70 },
    {
      id: "actions",
      label: "Actiuni",
      minWidth: 70,
      align: "right",
    },
  ];


  useEffect(() => {
    if (_User.profile) {
      dispatch(getPatients(_User.profile._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.profile]);

  useEffect(() => {
    if (_User.selectedDoctor) {
      dispatch(getPatients(_User.selectedDoctor._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_User.selectedDoctor]);

  useEffect(() => {
    setPatients(_patient.patients);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_patient.patients]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeletePatient = (data) => {
    dispatch(deletePatient(data));
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
            {patients.length > 0 && patients
              ? patients
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => {
                    return (
                      <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                        <TableCell style={{ color: "#fff" }}>
                          {row.nrSala}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.data}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.salaOcupata}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.numeDr}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.numePac}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }}>
                          {row.numeOp}
                        </TableCell>
                        <TableCell align="right">
                          <VisibilityIcon
                            style={{ color: "#fff" }}
                            onClick={() => handleDetailView(row)}
                          />
                          {_User.profile.role !== "nurse" ? (
                            <>
                              &nbsp; &nbsp;
                              <EditIcon
                                style={{ color: "#fff" }}
                                onClick={() => handleEditPatient(row)}
                              />
                              &nbsp;
                              <DeleteIcon
                                style={{ color: "red" }}
                                onClick={() => handleDeletePatient(row)}
                              />
                            </>
                          ) : null}
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
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ backgroundColor: "#212B36", color: "#F9FAFB" }}
      />
    </Paper>
  );
};

export default SurgeryTable;
