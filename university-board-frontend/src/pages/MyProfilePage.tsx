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
import {
  getStoredPrivileges,
  getStoredToken,
  getStoredUUID,
} from "../utils/AuthUtils";
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { apiBaseUrl } from "../utils/ConfigUtils";

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
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handleOpenChangePassword = () => {
    setChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setChangePasswordOpen(false);
  };

  const handleChangePasswordSubmit = (
    oldPassword: string,
    newPassword: string
  ) => {
    axios
      .patch(
        `${apiBaseUrl}/user-profiles/${employee.userProfile?.uuid}`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Password successfully changed");
        setSuccessPopupOpen(true);
      })
      .catch((error: AxiosError) => {
        setErrorMessage(
          error.response?.data.errors
            ? error.response?.data.errors[0].message
            : error.response?.data.detail
        );
        setErrorPopupOpen(true);
      });
    handleCloseChangePassword();
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
      .patch(`${apiBaseUrl}/employees/${employee.uuid}`, employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccessMessage("Employee's information successfully updated");
        setSuccessPopupOpen(true);
      })
      .catch((error: AxiosError) => {
        setErrorMessage(
          error.response?.data.errors
            ? error.response?.data.errors[0].message
            : error.response?.data.detail
        );
        setErrorPopupOpen(true);
      });
  };

  useEffect(() => {
    const uuid = getStoredUUID();
    const storedToken = getStoredToken();
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
      .get(`${apiBaseUrl}/employees/${uuid}`, {
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
                  disabled={!getStoredPrivileges()?.includes("ACCOUNT_W")}
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
                  disabled={!getStoredPrivileges()?.includes("ACCOUNT_W")}
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
                  disabled={!getStoredPrivileges()?.includes("ACCOUNT_W")}
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="academici-title-id">
                    Academic Title
                  </InputLabel>
                  <Select
                    labelId="academic-title-id"
                    label="Academic Title"
                    value={employee.academicTitle || ""}
                    onChange={(e) =>
                      handleFieldChange(
                        "academicTitle",
                        e.target.value as string
                      )
                    }
                    disabled={!getStoredPrivileges()?.includes("ACCOUNT_W")}
                  >
                    {Object.keys(AcademicTitle).map((titleKey, index) => {
                      const titleValue = Object.values(AcademicTitle)[index];
                      return (
                        <MenuItem key={titleKey} value={titleKey}>
                          {titleValue}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div className="button-container">
              <Button
                variant="contained"
                className="save-button"
                type="submit"
                disabled={!getStoredPrivileges()?.includes("ACCOUNT_W")}
              >
                Save
              </Button>
            </div>
          </form>

          <Typography variant="h4" style={{ marginTop: "35px" }}>
            User Profile
          </Typography>
          <form className="form-container">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  value={employee.userProfile?.email || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Role"
                  value={employee.userProfile?.role?.name || ""}
                  fullWidth
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  value="********"
                  fullWidth
                  margin="normal"
                  disabled
                />
                <TextField
                  label="Additional Privileges"
                  value={
                    employee.userProfile?.privileges
                      ? employee.userProfile.privileges
                          .map((privilege) => privilege.name)
                          .join(", ")
                      : ""
                  }
                  disabled
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </form>
          <div className="button-container">
            <Button
              variant="contained"
              className="save-button"
              onClick={handleOpenChangePassword}
              disabled={!getStoredPrivileges()?.includes("ACCOUNT_W")}
            >
              Change Password
            </Button>
          </div>
          <ChangePasswordDialog
            open={changePasswordOpen}
            onClose={handleCloseChangePassword}
            onSubmit={handleChangePasswordSubmit}
          />

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
