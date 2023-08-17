import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Employee } from "../models/Employee";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../styles/MyProfileStyles.css";
import ErrorPopup from "../components/ErrorPopup";
import SuccessPopup from "../components/SuccessPopup";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import { AcademicTitle } from "../models/AcademicTitleEnum";

function MyProfilePage() {
  const [employee, setEmployee] = useState<Employee>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    academicTitle: null,
    uuid: "",
    userProfile: {
      email: "",
      role: { uuid: "", name: "", privileges: [] },
      privileges: [],
      uuid: "",
    },
  });
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handleFieldChange = (fieldName: keyof Employee, value: string) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [fieldName]: value,
    }));
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .patch(
        `http://localhost:8080/api/v1/employees/${employee.uuid}`,
        employee,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Employee's information successfully updated");
        setSuccessPopupOpen(true);
      })
      .catch((error: AxiosError) => {
        setErrorMessage(error.response?.data.detail);
        setErrorPopupOpen(true);
      });
  };

  useEffect(() => {
    const uuid = localStorage.getItem("uuid");
    const storedToken = localStorage.getItem("token");
    if (!uuid) {
      navigate("/login");
      return;
    }

    if (storedToken) {
      setToken(storedToken); // Set the token state
    } else {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/api/v1/employees/${uuid}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        setErrorMessage("Error fetching employee data");
        setErrorPopupOpen(true);
      });
  }, [navigate, token]);

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <div className="main-content">
        <Container>
          <Typography variant="h4">Employee</Typography>
          <form className="form-container" onSubmit={handleSave}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name"
                  value={employee.firstName}
                  fullWidth
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  margin="normal"
                  required
                />
                <TextField
                  label="Phone Number"
                  value={employee.phoneNumber}
                  fullWidth
                  onChange={(e) =>
                    handleFieldChange("phoneNumber", e.target.value)
                  }
                  margin="normal"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name"
                  value={employee.lastName}
                  fullWidth
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="academici-title-id">
                    Academic Title
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Academic Title"
                    value={employee.academicTitle || ""}
                    onChange={(e) =>
                      handleFieldChange("academicTitle", e.target.value)
                    }
                  >
                    {Object.keys(AcademicTitle).map((title) => (
                      <MenuItem key={title} value={title}>
                        {title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="button-container">
              <Button variant="contained" className="save-button" type="submit">
                Save
              </Button>
            </div>
          </form>
          <ErrorPopup
            open={errorPopupOpen}
            message={errorMessage}
            onClose={() => setErrorPopupOpen(false)}
          />
          <SuccessPopup
            open={successPopupOpen}
            message={successMessage}
            onClose={() => setSuccessPopupOpen(false)}
          />
        </Container>
      </div>
    </>
  );
}

export default MyProfilePage;
