import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { CSVLink } from "react-csv";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  getSurgeries,
  deleteSurgery,
} from "../../../redux/actions/surgeryActions";
import { useParams } from "react-router-dom";
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

const SurgeryTable = ({ handleEditSurgery, handleDetailView }) => {
  let { doctor, patient } = useParams();
  const dispatch = useDispatch();
  const [csvArray, setCsvArray] = useState([]);
  const classes = useStyles();
  const _User = useSelector((state) => state.User);
  const _surgery = useSelector((state) => state.surgery);
  const [surgeries, setSurgeries] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [
    { id: "nameOfSurgery", label: "Denumire operatie", minWidth: 70 },
    { id: "dificulty", label: "Dificultate", minWidth: 70 },
    { id: "noOfSteps", label: "Nr. Pasi", minWidth: 70 },
    {
      id: "actions",
      label: "Actiuni",
      minWidth: 70,
      align: "right",
    },
  ];

  useEffect(() => {
    dispatch(getSurgeries(doctor, patient));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setSurgeries(_surgery.surgeries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_surgery.surgeries]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeletePatient = (data) => {
    dispatch(deleteSurgery(data));
  };

  const headers = [
    { label: "Denumire operatie", key: "nameOfSurgery" },
    { label: "Dificultate", key: "dificulty" },
    { label: "Nr. pasi", key: "noOfSteps" },
    { label: "Informatii", key: "infoBesidesSteps" },
  ];

  const getCsvArray = () => {
    let tempcsvArray = [];
    for (let i = 0; i < surgeries.length; i++) {
      tempcsvArray.push({
        nameOfSurgery: surgeries[i].nameOfSurgery,
        dificulty: surgeries[i].dificulty,
        noOfSteps: surgeries[i].noOfSteps,
        infoBesidesSteps: surgeries[i].infoBesidesSteps,
      });
    }
    setCsvArray(tempcsvArray);
  };

  useEffect(() => {
    getCsvArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surgeries]);

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <CSVLink data={csvArray} headers={headers} separator={";"}>
          Descarca raport
        </CSVLink>
      </div>
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
              {surgeries.length > 0 && surgeries
                ? surgeries
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                          <TableCell style={{ color: "#fff" }}>
                            {row.nameOfSurgery}
                          </TableCell>
                          <TableCell style={{ color: "#fff" }}>
                            {row.dificulty}
                          </TableCell>
                          <TableCell style={{ color: "#fff" }}>
                            {row.noOfSteps}
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
                                  onClick={() => handleEditSurgery(row)}
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
          count={surgeries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ backgroundColor: "#212B36", color: "#F9FAFB" }}
        />
      </Paper>
    </>
  );
};

export default SurgeryTable;
