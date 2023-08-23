import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  TableContainer,
  Paper,
} from "@mui/material";
import { Employee } from "../models/Employee";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import { getStoredToken } from "../utils/AuthUtils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/EmployeesStyles.css";
import { AcademicTitle } from "../models/AcademicTitleEnum";
import ErrorPopup from "../components/ErrorPopup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import SuccessPopup from "../components/SuccessPopup";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/employees?size=10&page=${currentPage}&sort=firstName`,
          {
            headers: {
              Authorization: `Bearer ${getStoredToken()}`,
            },
          }
        );
        setEmployees(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching data from server");
        }
        setErrorPopupOpen(true);
      }
    };

    fetchEmployees();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  const handleOpenDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedEmployee(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      if (selectedEmployee)
        axios
          .delete(
            `http://localhost:8080/api/v1/employees/${selectedEmployee.uuid}`,
            {
              headers: {
                Authorization: `Bearer ${getStoredToken()}`,
              },
            }
          )
          .then(() => {
            setSuccessMessage("Employee successfully deleted");
            setSuccessPopupOpen(true);
            setEmployees(
              employees.filter(
                (employee) => employee.uuid !== selectedEmployee.uuid
              )
            );
          })
          .catch((error) => {
            setErrorMessage(error.response.data.detail);
            setErrorPopupOpen(true);
          })
          .finally(() => setDeleteDialogOpen(false));
    }
  };

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <div>
        <div className="employee-table-container">
          {employees.length === 0 ? (
            <p className="center-text">No employees found</p>
          ) : (
            <TableContainer component={Paper}>
              <Table className="employee-table">
                <TableHead>
                  <TableRow>
                    <TableCell>First Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Academic Title</TableCell>
                    <TableCell>E-Mail</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.uuid}>
                      <TableCell>{employee.firstName}</TableCell>
                      <TableCell>{employee.lastName}</TableCell>
                      <TableCell>{employee.phoneNumber}</TableCell>
                      <TableCell>
                        {
                          Object.values(AcademicTitle)[
                            Object.keys(AcademicTitle).indexOf(
                              employee.academicTitle as string
                            )
                          ]
                        }
                      </TableCell>
                      <TableCell>{employee.userProfile?.email}</TableCell>
                      <TableCell>{employee.userProfile?.role?.name}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleOpenDeleteDialog(employee)}
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        <div className="pagination-container">
          <Button
            className="pagination-button"
            disabled={currentPage === 0}
            onClick={handlePreviousPage}
          >
            <NavigateBeforeIcon />
          </Button>
          <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
          <Button
            className="pagination-button"
            disabled={currentPage === totalPages - 1}
            onClick={handleNextPage}
          >
            <NavigateNextIcon />
          </Button>
        </div>
      </div>
      <ErrorPopup
        open={errorPopupOpen}
        message={errorMessage}
        onClose={closeErrorPopup}
      />
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
      />
      <SuccessPopup
        open={successPopupOpen}
        message={successMessage}
        onClose={() => setSuccessPopupOpen(false)}
      />
    </>
  );
};

export default EmployeesPage;
