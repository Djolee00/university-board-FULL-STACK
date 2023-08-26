import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from "@mui/material";
import BoardStatus from "../models/Board";

interface Props {
  onNext: () => void;
}

const BasicStep = ({ onNext }: Props) => {
  const [basicData, setBasicData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    description: false,
    startDate: false,
    endDate: false,
    status: false,
  });

  const handleChange = (field: string, value: string) => {
    setBasicData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: basicData.name === "",
      description: basicData.description === "",
      startDate: basicData.startDate === "",
      endDate: basicData.endDate === "",
      status: basicData.status === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  return (
    <div>
      <TextField
        label="Name"
        value={basicData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        fullWidth
        margin="normal"
        required
        error={errors.name}
      />
      <TextField
        label="Description"
        value={basicData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        fullWidth
        margin="normal"
        error={errors.description}
      />
      <Box display="flex" gap={2} style={{ marginTop: "5px" }}>
        <TextField
          label="Start Date"
          type="date"
          value={basicData.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.startDate}
        />
        <TextField
          label="End Date"
          type="date"
          value={basicData.endDate}
          onChange={(e) => handleChange("endDate", e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          error={errors.endDate}
        />
      </Box>
      <FormControl
        fullWidth
        required
        error={errors.status}
        style={{ marginTop: "20px" }}
      >
        <InputLabel id="board-status-id">Board Status</InputLabel>
        <Select
          labelId="board-status-id"
          label="Board Status"
          value={basicData.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {Object.keys(BoardStatus).map((statusKey, index) => {
            const statusValue = Object.values(BoardStatus)[index];
            return (
              <MenuItem key={statusKey} value={statusKey}>
                {statusValue}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={() => {
          if (validateForm()) {
            onNext();
          }
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default BasicStep;
