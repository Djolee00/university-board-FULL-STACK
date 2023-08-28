import React, { useState, useEffect } from "react";
import {
  Dialog,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import BasicStep, { BasicData } from "./BasicStep";
import BoardStatus, { Board, BoardType } from "../models/Board";

import BoardTypeStep from "./BoardTypeStep";
import { Employee } from "../models/Employee";
import MembersStep from "./MemberStep";
import { Membership } from "../models/Membership";
import "../styles/EmployeesStyles.css";

const steps = ["Basic Data", "Board Type", "Add Members"];

interface Props {
  open: boolean;
  onClose: () => void;
  boardTypes: BoardType[];
  employees: Employee[];
  onCreate: (board: Board) => Promise<void>;
}

function BoardCreationDialog({
  open,
  onClose,
  boardTypes,
  employees,
  onCreate,
}: Props) {
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
    comments: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newBoard.memberships?.length !== 0) {
      handleOnCreate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      comments: [],
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

  async function handleOnCreate() {
    setLoading(true);
    await onCreate(newBoard);
    setLoading(false);
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
            <Button
              onClick={onClose}
              variant="contained"
              style={{ marginTop: "20px" }}
            >
              Close
            </Button>
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
                onCreate={handleOnCreate}
              />
            )}
          </div>
        )}
      </div>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
    </Dialog>
  );
}

export default BoardCreationDialog;
