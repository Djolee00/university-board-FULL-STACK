import React, { useState } from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Paper,
  Button,
} from "@mui/material";
import { Employee } from "../models/Employee";
import { Membership, MembershipStatus } from "../models/Membership";
import ErrorPopup from "./ErrorPopup";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface MembersStepProps {
  employees: Employee[];
  startDate: string;
  endDate: string;
  onNext: () => void;
  handleMemberships: (memberships: Membership[]) => void;
  onCreate: () => void;
}

function MembersStep({
  employees,
  startDate,
  endDate,
  onNext,
  handleMemberships,
  onCreate,
}: MembersStepProps) {
  const [selectedMemberships, setSelectedMemberships] = useState<Membership[]>(
    []
  );
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredEmployees = employees.filter((employee) =>
    employee.firstName!.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCheckboxChange =
    (employee: Employee) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setShowErrors(false);
      const employeeUuid = employee.uuid;
      if (event.target.checked) {
        setSelectedMemberships((prevMemberships) => [
          ...prevMemberships,
          {
            employeeUuid: employeeUuid,
            employee: employee,
            commencementDate: startDate,
            status: null,
          },
        ]);
      } else {
        setSelectedMemberships((prevMemberships) =>
          prevMemberships.filter(
            (membership) => membership.employeeUuid !== employeeUuid
          )
        );
      }
    };

  const handleDateChange =
    (employeeUuid: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setSelectedMemberships((prevMemberships) =>
        prevMemberships.map((membership) =>
          membership.employeeUuid === employeeUuid
            ? { ...membership, commencementDate: value }
            : membership
        )
      );
    };

  const handleStatusChange = (
    employeeUuid: string,
    status: MembershipStatus
  ) => {
    setSelectedMemberships((prevMemberships) =>
      prevMemberships.map((membership) =>
        membership.employeeUuid === employeeUuid
          ? { ...membership, status: status }
          : membership
      )
    );
  };

  const handleStatusChangeWrapper = (
    employeeUuid: string,
    status: MembershipStatus
  ) => {
    handleStatusChange(employeeUuid, status);
  };

  const handleNextClick = () => {
    if (validateForm()) {
      handleMemberships(selectedMemberships);
      onNext();
    }
  };

  const validateForm = () => {
    if (selectedMemberships.length === 0) {
      setErrorMessage("At least one employee must be selected.");
      setErrorPopupOpen(true);
      return false;
    }
    if (selectedMemberships.some((m) => m.status === null)) {
      setShowErrors(true);
      return false;
    }
    return true;
  };

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  return (
    <>
      <div>
        <TextField
          label="Search by First Name"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <Paper style={{ maxHeight: "500px", overflow: "auto" }}>
        <div>
          {filteredEmployees.map((employee) => (
            <div key={employee.uuid}>
              <Checkbox
                onChange={handleCheckboxChange(employee)}
                color="primary"
              />
              <span>{`${employee.firstName} ${employee.lastName}`}</span>
              {selectedMemberships.some(
                (membership) => membership.employeeUuid === employee.uuid
              ) && (
                <div
                  style={{
                    marginLeft: "40px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    style={{ marginRight: "10px" }}
                    type="date"
                    label="Commencement Date"
                    value={
                      selectedMemberships.find(
                        (membership) =>
                          membership.employeeUuid === employee.uuid
                      )?.commencementDate || ""
                    }
                    onChange={handleDateChange(employee.uuid!)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: startDate,
                      max: endDate,
                    }}
                  />
                  <FormControl style={{ width: "200px" }} required>
                    <InputLabel id={`status-id-${employee.uuid}`}>
                      Membership Status
                    </InputLabel>
                    <Select
                      labelId={`status-id-${employee.uuid}`}
                      label="Membership Status"
                      value={
                        selectedMemberships.find(
                          (membership) =>
                            membership.employeeUuid === employee.uuid
                        )?.status === null
                          ? ""
                          : selectedMemberships.find(
                              (membership) =>
                                membership.employeeUuid === employee.uuid
                            )?.status!
                      }
                      onChange={(event: SelectChangeEvent<MembershipStatus>) =>
                        handleStatusChangeWrapper(
                          employee.uuid!,
                          event.target.value as MembershipStatus
                        )
                      }
                      error={
                        showErrors &&
                        !selectedMemberships.find(
                          (membership) =>
                            membership.employeeUuid === employee.uuid
                        )?.status
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      {Object.keys(MembershipStatus).map((statusKey, index) => {
                        const statusValue =
                          Object.values(MembershipStatus)[index];
                        return (
                          <MenuItem key={statusKey} value={statusKey}>
                            {statusValue}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              )}
            </div>
          ))}
        </div>
      </Paper>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={() => handleNextClick()}
      >
        Finish
      </Button>
      <ErrorPopup
        open={errorPopupOpen}
        message={errorMessage}
        onClose={closeErrorPopup}
      />
    </>
  );
}

export default MembersStep;
