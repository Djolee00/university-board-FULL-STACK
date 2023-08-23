import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { Employee } from "../models/Employee";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import { getStoredToken } from "../utils/AuthUtils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "../styles/EmployeesStyles.css";
import { AcademicTitle } from "../models/AcademicTitleEnum";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

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
        console.error("Error fetching employee data:", error);
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

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <div>
        <div className="employee-table-container">
          <Table className="employee-table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Academic Title</TableCell>
                <TableCell>E-Mail</TableCell>
                <TableCell>Role</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
    </>
  );
};

export default EmployeesPage;
