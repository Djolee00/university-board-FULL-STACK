import { useState } from "react";
import { Employee } from "../models/Employee";
import { Privilege, Role } from "../models/UserProfile";
import { AcademicTitle } from "../models/AcademicTitleEnum";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import "../styles/EmployeesStyles.css";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddEmployee: (newEmployee: Employee) => Promise<void>;
  roles: Role[];
  allPrivileges: Privilege[];
}

function CreateEmployeeDialog({
  open,
  onClose,
  onAddEmployee,
  roles,
  allPrivileges,
}: Props) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [academicTitle, setAcademicTitle] = useState<AcademicTitle>(
    AcademicTitle.PROFESSOR
  );
  const [email, setEmail] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPrivileges, setSelectedPrivileges] = useState<Privilege[]>([]);

  const privilegesInColumns = Math.ceil(allPrivileges.length / 2); // Number of privileges in each column
  const firstColumnPrivileges = allPrivileges.slice(0, privilegesInColumns);
  const secondColumnPrivileges = allPrivileges.slice(privilegesInColumns);
  const [availablePrivileges, setAvailablePrivileges] = useState<Privilege[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    const roleUuid = event.target.value;
    const selectedRole = roles.find((role) => role.uuid === roleUuid);
    setSelectedRole(selectedRole || null);
    const selectedPrivilegeCodes =
      selectedRole?.privileges?.map((privilege) => privilege.code) || [];
    const privilegesNotInRole = allPrivileges.filter(
      (privilege) => !selectedPrivilegeCodes.includes(privilege.code)
    );
    setAvailablePrivileges(privilegesNotInRole);
  };

  const handlePrivilegeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const privilegeCode = event.target.value;
    const updatedPrivileges = togglePrivilege(
      selectedPrivileges,
      privilegeCode
    );
    setSelectedPrivileges(updatedPrivileges);
  };

  const togglePrivilege = (
    currentPrivileges: Privilege[],
    privilegeCode: string
  ): Privilege[] => {
    if (
      currentPrivileges.some((privilege) => privilege.code === privilegeCode)
    ) {
      return currentPrivileges.filter(
        (privilege) => privilege.code !== privilegeCode
      );
    } else {
      const selectedPrivilege = allPrivileges.find(
        (privilege) => privilege.code === privilegeCode
      );
      if (selectedPrivilege) {
        return [...currentPrivileges, selectedPrivilege];
      } else {
        return currentPrivileges;
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newEmployee: Employee = {
      uuid: null,
      firstName,
      lastName,
      phoneNumber,
      academicTitle,
      userProfile: {
        role: selectedRole,
        email: email,
        privileges: selectedPrivileges,
        uuid: null,
      },
    };
    setLoading(true);

    onAddEmployee(newEmployee)
      .then(() => {
        setFirstName("");
        setLastName("");
        setAcademicTitle(AcademicTitle.PROFESSOR);
        setPhoneNumber("");
        setEmail("");
        setSelectedRole(null);
        setSelectedPrivileges([]);
        setAvailablePrivileges([]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                fullWidth
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                fullWidth
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                fullWidth
                required
                value={phoneNumber}
                type="number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required>
                <InputLabel id="academici-title-id">Academic Title</InputLabel>
                <Select
                  labelId="academic-title-id"
                  label="Academic Title"
                  value={academicTitle.toUpperCase()}
                  onChange={(e) =>
                    setAcademicTitle(e.target.value as AcademicTitle)
                  }
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
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel id="role-id">Role</InputLabel>
                <Select
                  labelId="role-id"
                  label="Role"
                  value={selectedRole?.uuid || ""}
                  onChange={handleRoleChange}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.uuid} value={role.uuid!}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} margin={"10px"}>
              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel>Privileges</FormLabel>
                  {firstColumnPrivileges.map((privilege) => (
                    <FormControlLabel
                      key={privilege.code}
                      control={
                        <Checkbox
                          checked={
                            selectedRole !== null &&
                            (selectedPrivileges.some(
                              (selected) => selected.code === privilege.code
                            ) ||
                              !availablePrivileges.includes(privilege))
                          }
                          onChange={handlePrivilegeChange}
                          value={privilege.code}
                          disabled={
                            !selectedRole ||
                            !availablePrivileges.includes(privilege)
                          }
                        />
                      }
                      label={privilege.name}
                    />
                  ))}
                </FormGroup>
              </Grid>
              <Grid item xs={6}>
                <FormGroup>
                  <FormLabel>&nbsp;</FormLabel>
                  {secondColumnPrivileges.map((privilege) => (
                    <FormControlLabel
                      key={privilege.code}
                      control={
                        <Checkbox
                          checked={
                            selectedRole !== null &&
                            (selectedPrivileges.some(
                              (selected) => selected.code === privilege.code
                            ) ||
                              !availablePrivileges.includes(privilege))
                          }
                          onChange={handlePrivilegeChange}
                          value={privilege.code}
                          disabled={
                            !selectedRole ||
                            !availablePrivileges.includes(privilege)
                          }
                        />
                      }
                      label={privilege.name}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={onClose} color="error" variant="contained">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
    </Dialog>
  );
}

export default CreateEmployeeDialog;
