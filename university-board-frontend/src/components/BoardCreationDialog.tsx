import React, { useState } from "react";
import {
  Dialog,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import BasicStep from "./BasicStep";

// import BoardTypeStep from "./BoardTypeStep"; // Component for the second step
// import MembersStep from "./MembersStep"; //

const steps = ["Basic Data", "Board Type", "Add Members"];

interface Props {
  open: boolean;
  onClose: () => void;
}

function BoardCreationDialog({ open, onClose }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Stepper activeStep={activeStep} style={{ padding: "20px" }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ padding: "20px" }}>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={onClose}>Close</Button>
          </div>
        ) : (
          <div>
            {activeStep === 0 && <BasicStep onNext={handleNext} />}
            {/* {activeStep === 1 && <BoardTypeStep onNext={handleNext} />}
            {activeStep === 2 && (
              <MembersStep onNext={handleNext} onBack={handleBack} /> */}
            {/* )} */}
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default BoardCreationDialog;
