import { useState } from "react";
import { BoardType } from "../models/Board";
import { Autocomplete, TextField, Button } from "@mui/material";

interface BoardTypeStepProps {
  boardTypes: BoardType[];
  onNext: () => void;
  handleBoardType: (boardType: BoardType) => void;
}

function BoardTypeStep({
  boardTypes,
  onNext,
  handleBoardType,
}: BoardTypeStepProps) {
  const [boardType, setBoardType] = useState<BoardType | null>(boardTypes[0]);
  const [newBoardTypeName, setNewBoardTypeName] = useState<string | null>("");
  const [isTexFieldEmpty, setIsTextFieldEmpty] = useState<boolean>(true);

  const handleNextClick = () => {
    let newBoardType: BoardType = {
      uuid: null,
      name: null,
    };
    if (!isTexFieldEmpty) {
      newBoardType.name = newBoardTypeName;
    } else {
      newBoardType = boardType!;
    }
    handleBoardType(newBoardType);
    onNext();
  };

  const handleNewBoardTypeTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value.trim().length === 0) {
      setIsTextFieldEmpty(true);
      setNewBoardTypeName(value);
    } else {
      setIsTextFieldEmpty(false);
      setNewBoardTypeName(value);
    }
  };

  return (
    <div>
      <Autocomplete
        options={boardTypes}
        key={boardType?.uuid}
        getOptionLabel={(option) => option.name!}
        value={boardType}
        onChange={(event, newValue) => {
          setBoardType(newValue);
        }}
        disabled={!isTexFieldEmpty}
        renderInput={(params) => (
          <TextField {...params} label="Existing Board Type" />
        )}
      />
      <TextField
        style={{ marginTop: "20px" }}
        label="New Board Type"
        value={newBoardTypeName}
        onChange={handleNewBoardTypeTextFieldChange}
        fullWidth
      />
      <Button
        style={{ marginTop: "20px" }}
        variant="contained"
        color="primary"
        onClick={() => handleNextClick()}
      >
        Next
      </Button>
    </div>
  );
}

export default BoardTypeStep;
