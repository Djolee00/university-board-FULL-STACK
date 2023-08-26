import React, { useState, useEffect } from "react";
import {
  Dialog,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
} from "@mui/material";
import BasicStep, { BasicData } from "./BasicStep";
import BoardStatus, { Board, BoardType } from "../models/Board";

import BoardTypeStep from "./BoardTypeStep";
import { Employee } from "../models/Employee";
import MembersStep from "./MemberStep";
import { Membership } from "../models/Membership";
// import MembersStep from "./MembersStep"; //

const steps = ["Basic Data", "Board Type", "Add Members"];

interface Props {
  open: boolean;
  onClose: () => void;
  boardTypes: BoardType[];
  employees: Employee[];
}

function BoardCreationDialog({ open, onClose, boardTypes, employees }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [newBoard, setNewBoard] = useState<Board>({
    name: null,
    description: null,
    startDate: null,
    endDate: null,
    status: null,
    boardType: null,
    memberships: [],
    uuid: null,
  });

  useEffect(() => {
    console.log(newBoard); // This will log the updated value of newBoard
  }, [newBoard]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  function handleBasicDataChange(basicData: BasicData) {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      name: basicData.name,
      description: basicData.description,
      startDate: basicData.startDate,
      endDate: basicData.endDate,
      status: basicData.status as BoardStatus,
    }));
  }

  useEffect(() => {
    setActiveStep(0);
    setNewBoard({
      name: null,
      description: null,
      startDate: null,
      endDate: null,
      status: null,
      boardType: null,
      memberships: [],
      uuid: null,
    });
  }, [open]);

  function handleBoardTypeChange(boardType: BoardType) {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      boardType: boardType,
    }));
  }

  function handleMembershipsChange(memberships: Membership[]) {
    setNewBoard((prevBoard) => ({
      ...prevBoard,
      memberships: memberships,
    }));
  }

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
            {activeStep === 0 && (
              <BasicStep
                onNext={handleNext}
                onBasicDataChange={handleBasicDataChange}
              />
            )}
            {activeStep === 1 && (
              <BoardTypeStep
                boardTypes={boardTypes}
                onNext={handleNext}
                handleBoardType={handleBoardTypeChange}
              />
            )}
            {activeStep === 2 && (
              <MembersStep
                employees={employees}
                onNext={handleNext}
                startDate={newBoard.startDate!}
                endDate={newBoard.endDate!}
                handleMemberships={handleMembershipsChange}
              />
            )}
          </div>
        )}
      </div>
    </Dialog>
  );
}

export default BoardCreationDialog;
