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
  Fab,
} from "@mui/material";
import { Employee } from "../models/Employee";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import {
  clearStorage,
  getStoredToken,
  getStoredUUID,
} from "../utils/AuthUtils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/EmployeesStyles.css";
import { AcademicTitle } from "../models/AcademicTitleEnum";
import ErrorPopup from "../components/ErrorPopup";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteConfirmationDialog from "../components/DeleteConfirmationDialog";
import SuccessPopup from "../components/SuccessPopup";
import EmployeeSearchDialog from "../components/EmployeeSearchDialog";
import SearchIcon from "@mui/icons-material/Search";
import SortEmployeeComponent from "../components/SortEmployeeComponent";
import SortIcon from "@mui/icons-material/Sort";
import { useNavigate } from "react-router-dom";
import CreateEmployeeDialog from "../components/CreateEmployeeDialog";
import { Privilege, Role } from "../models/UserProfile";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

export interface SearchData {
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  academicTitle: string | null;
}

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
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [academicTitle, setAcademicTitle] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortPopoverAnchorEl, setSortPopoverAnchorEl] =
    useState<HTMLElement | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [privileges, setPrivileges] = useState<Privilege[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const generateApiUrl = () => {
      let apiUrl = `http://localhost:8080/api/v1/employees?size=10&page=${currentPage}&sort=${sortBy},${sortOrder}`;

      if (firstName) {
        apiUrl += `&firstNameLike=${firstName}`;
      }
      if (lastName) {
        apiUrl += `&lastNameLike=${lastName}`;
      }
      if (phoneNumber) {
        apiUrl += `&phoneNumberLike=${phoneNumber}`;
      }
      if (academicTitle) {
        apiUrl += `&academicTitle=${academicTitle}`;
      }

      return apiUrl;
    };

    const fetchEmployees = async () => {
      try {
        const apiUrl = generateApiUrl();
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        });
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
  }, [
    currentPage,
    firstName,
    lastName,
    phoneNumber,
    academicTitle,
    sortBy,
    sortOrder,
  ]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/roles`, {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        });
        setRoles(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching employees from server");
        }
        setErrorPopupOpen(true);
      }
    };

    const fetchPrivileges = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/privileges`,
          {
            headers: {
              Authorization: `Bearer ${getStoredToken()}`,
            },
          }
        );
        setPrivileges(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching privileges from server");
        }
        setErrorPopupOpen(true);
      }
    };
    fetchRoles();
    fetchPrivileges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            if (selectedEmployee.uuid === getStoredUUID()) {
              clearStorage();
              navigate("/login");
            }
          })
          .catch((error) => {
            setErrorMessage(error.response.data.detail);
            setErrorPopupOpen(true);
          })
          .finally(() => setDeleteDialogOpen(false));
    }
  };

  const handleOpenSearchDialog = () => {
    setShowSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setShowSearchDialog(false);
  };

  const handleSearch = (searchData: SearchData) => {
    setFirstName(searchData.firstName);
    setLastName(searchData.lastName);
    setPhoneNumber(searchData.phoneNumber);
    setAcademicTitle(searchData.academicTitle);
    setCurrentPage(0);
    setShowSearchDialog(false);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handleSortButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortPopoverAnchorEl(event.currentTarget);
  };

  const closeSortPopover = () => {
    setSortPopoverAnchorEl(null);
  };

  const handleCreateEmployee = (newEmployee: Employee): Promise<void> => {
    return axios
      .post(`http://localhost:8080/api/v1/employees`, newEmployee, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => {
        setSuccessMessage("Employee successfully saved");
        setSuccessPopupOpen(true);
        newEmployee.uuid = response.data.identifier;
        setCreateDialogOpen(false);
        refreshSearchFilters();
      })
      .catch((error) => {
        console.log(error.response);
        setErrorMessage(error.response.data.detail);
        setErrorPopupOpen(true);
        throw error;
      });
  };

  const refreshSearchFilters = (): void => {
    setFirstName("");
    setLastName(null);
    setAcademicTitle(null);
    setPhoneNumber(null);
  };

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <div>
        <div className="employee-table-container">
          <div className="employee-button-container">
            <div className="employee-buttons-left">
              <Button
                onClick={handleOpenSearchDialog}
                startIcon={<SearchIcon />}
                variant="contained"
              >
                Search
              </Button>
              <Button
                onClick={handleSortButtonClick}
                startIcon={<SortIcon />}
                variant="contained"
              >
                Sort
              </Button>
            </div>
            <div className="employee-buttons-right">
              <Fab
                size="medium"
                color="success"
                aria-label="add"
                variant="extended"
                onClick={() => setCreateDialogOpen(true)}
              >
                <PersonAddAltIcon sx={{ mr: 1 }} />
                New
              </Fab>
            </div>
          </div>
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
          <span>{`Page ${
            totalPages !== 0 ? currentPage + 1 : 0
          } of ${totalPages}`}</span>
          <Button
            className="pagination-button"
            disabled={currentPage === totalPages - 1}
            onClick={handleNextPage}
          >
            <NavigateNextIcon />
          </Button>
        </div>
      </div>
      <EmployeeSearchDialog
        open={showSearchDialog}
        onClose={handleCloseSearchDialog}
        onSearch={handleSearch}
      />
      <SortEmployeeComponent
        anchorEl={sortPopoverAnchorEl}
        open={Boolean(sortPopoverAnchorEl)}
        onClose={closeSortPopover}
        onSort={handleSort}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />
      <CreateEmployeeDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onAddEmployee={handleCreateEmployee}
        roles={roles}
        allPrivileges={privileges}
      />
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
