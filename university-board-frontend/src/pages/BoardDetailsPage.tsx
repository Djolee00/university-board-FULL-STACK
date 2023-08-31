import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import axios, { AxiosResponse } from "axios";
import BoardStatus, {
  Board,
  BoardFile,
  BoardType,
  Comment,
} from "../models/Board";
import ErrorPopup from "../components/ErrorPopup";
import { getStoredToken, getStoredUUID } from "../utils/AuthUtils";
import Navbar from "../components/NavBar";
import SideMenu from "../components/SideMenu";
import SuccessPopup from "../components/SuccessPopup";
import "../styles/EmployeesStyles.css";
import MembersComponent from "../components/MembersComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Membership } from "../models/Membership";
import MembersStep from "../components/MemberStep";
import { Employee } from "../models/Employee";
import CommentsComponent from "../components/CommentsComponent";
import FilesComponent from "../components/FilesComponent";

function BoardDetailsPage() {
  const { uuid } = useParams<{ uuid: string }>();
  const [board, setBoard] = useState<Board | null>(null);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorPopupOpen, setErrorPopupOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [successPopupOpen, setSuccessPopupOpen] = useState<boolean>(false);
  const [displayAddMember, setDisplayAddMember] = useState<boolean>(false);

  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [boardTypes, setBoardTypes] = useState<BoardType[]>([]);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [newBoardTypeName, setNewBoardTypeName] = useState<string | null>("");
  const [isTexFieldEmpty, setIsTextFieldEmpty] = useState<boolean>(true);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);

  const [employees, setEmployees] = useState<Employee[]>([]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: false,
    description: false,
  });
  const [selectedSection, setSelectedSection] = useState("members");

  const navigate = useNavigate();

  const employeeUUIDsInMemberships = board?.memberships!.map(
    (member) => member.employee?.uuid
  );

  const employeesWithoutMembership = employees.filter(
    (employee) => !employeeUUIDsInMemberships?.includes(employee.uuid)
  );

  useEffect(() => {
    axios
      .get<Board>(`http://localhost:8080/api/v1/boards/${uuid}`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => {
        setBoard(response.data);
        setEditingBoard(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching board types from server");
        }
        setErrorPopupOpen(true);
      });

    fetchBoardTypes();
    fetchEmployees();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const closeErrorPopup = () => {
    setErrorPopupOpen(false);
  };

  const toggleSideMenu = () => {
    setSideMenuOpen(!sideMenuOpen);
  };

  const handleEditModeToggle = () => {
    if (isEditMode) {
      setEditingBoard(board);
    }
    setNewBoardTypeName("");
    setIsTextFieldEmpty(true);
    setIsEditMode(!isEditMode);
  };

  async function fetchBoardTypes() {
    await axios
      .get<BoardType[]>(`http://localhost:8080/api/v1/board-types`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => setBoardTypes(response.data))
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching board types from server");
        }
        setErrorPopupOpen(true);
      });
  }

  async function fetchEmployees() {
    await axios
      .get<BoardType[]>(`http://localhost:8080/api/v1/employees`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response: AxiosResponse) => setEmployees(response.data.content))
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.detail);
        } else {
          setErrorMessage("Error fetching board types from server");
        }
        setErrorPopupOpen(true);
      });
  }

  async function handleSaveChanges() {
    let updatedBoard = { ...editingBoard };
    if (validateForm()) {
      setLoading(true);
      if (!isTexFieldEmpty) {
        const newBoardType = { uuid: null, name: newBoardTypeName };
        updatedBoard = { ...updatedBoard, boardType: newBoardType };
      }
      await updateBoard(updatedBoard);
      setIsEditMode(false);
      setLoading(false);
    }
  }

  async function updateBoard(newBoard: any) {
    await axios
      .patch<Board>(
        `http://localhost:8080/api/v1/boards/${board!.uuid}`,
        newBoard,
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        }
      )
      .then((response) => {
        setBoard(response.data);
        setEditingBoard(response.data);
        setSuccessMessage("Board successfully updated");
        setSuccessPopupOpen(true);
        fetchBoardTypes();
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.detail);
        } else {
          setErrorMessage("Error fetching board information from server");
        }
        setErrorPopupOpen(true);
      });
  }

  const handleFieldChange = (fieldName: keyof Board, value: any) => {
    setEditingBoard((board) => ({
      ...board!,
      [fieldName]: value,
    }));
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

  const validateForm = () => {
    const newErrors = {
      name: editingBoard!.name === "",
      description: editingBoard!.description === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  function handleDeleteBoard() {
    setConfirmDeleteDialogOpen(true);
  }

  async function deleteBoard() {
    await axios
      .delete(`http://localhost:8080/api/v1/boards/${board!.uuid}`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => {
        setSuccessMessage("Board successfully deleted");
        setSuccessPopupOpen(true);

        setTimeout(() => {
          setSuccessPopupOpen(false);
          navigate("/boards");
        }, 1000);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.detail);
        } else {
          setErrorMessage("Error occured while deleting board.");
        }
        setErrorPopupOpen(true);
      })
      .finally(() => setConfirmDeleteDialogOpen(false));
  }

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const handleSectionChange = (
    event: React.MouseEvent<HTMLElement>,
    newSection: string
  ) => {
    setSelectedSection(newSection);
  };

  async function handleMemberDeletion(uuid: string) {
    if (board!.memberships!.length < 2) {
      setErrorMessage("Board must have at least 1 member");
      setErrorPopupOpen(true);
    } else {
      await deleteMember(uuid);
    }
  }

  async function deleteMember(uuid: string) {
    await axios
      .delete(
        `http://localhost:8080/api/v1/boards/${
          board!.uuid
        }/memberships/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Membership successfully deleted");
        setSuccessPopupOpen(true);
        setBoard((prevBoard) => ({
          ...prevBoard!,
          memberships: prevBoard!.memberships!.filter(
            (member) => member.uuid !== uuid
          )!,
        }));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.detail);
        } else {
          setErrorMessage("Error occured while deleting membership.");
        }
        setErrorPopupOpen(true);
      });
  }

  async function handleSaveEdit(member: Membership): Promise<void> {
    await axios
      .patch(
        `http://localhost:8080/api/v1/boards/${board!.uuid}/memberships/${
          member.uuid
        }`,
        { commencementDate: member.commencementDate, status: member.status },
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Membership successfully updated");
        setSuccessPopupOpen(true);
        setBoard((prevBoard) => {
          const updatedMemberships = prevBoard!.memberships!.map((m) =>
            m.uuid === member.uuid ? member : m
          );
          return {
            ...prevBoard!,
            memberships: updatedMemberships,
          };
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.detail);
        } else {
          setErrorMessage("Error occured while deleting membership.");
        }
        setErrorPopupOpen(true);
      });
  }

  async function addNewMembership(member: Membership): Promise<void> {
    await axios
      .post(
        `http://localhost:8080/api/v1/boards/${board!.uuid}/memberships`,
        member,
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Memberships successfully saved");
        setSuccessPopupOpen(true);
        member.uuid = response.data.identifier;
        setBoard((prevBoard) => {
          return {
            ...prevBoard!,
            memberships: [...prevBoard!.memberships!, member],
          };
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data.errors);
        } else {
          setErrorMessage("Error occured while adding new membership.");
        }
        setErrorPopupOpen(true);
      });
  }

  function handleMembershipsChange(memberships: Membership[]) {
    setLoading(true);
    addMembershipsInBulk(memberships).finally(() => setLoading(false));
  }

  async function addMembershipsInBulk(
    memberships: Membership[]
  ): Promise<void> {
    await Promise.all(
      memberships.map(async (m) => {
        await addNewMembership(m);
      })
    );
  }

  const handleDisplayAddMember = () => {
    setDisplayAddMember(!displayAddMember);
  };

  function handleNewComment(comment: Comment) {
    setLoading(true);
    addNewComment({ description: comment.description }).finally(() =>
      setLoading(false)
    );
  }

  async function addNewComment(comment: any): Promise<void> {
    await axios
      .post<Comment>(
        `http://localhost:8080/api/v1/boards/${board!.uuid}/comments`,
        comment,
        {
          headers: {
            Authorization: `Bearer ${getStoredToken()}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Comment successfully saved");
        setSuccessPopupOpen(true);
        setBoard((prevBoard) => {
          return {
            ...prevBoard!,
            comments: [...prevBoard!.comments!, response.data],
          };
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
        } else {
          setErrorMessage("Error occured while adding new comment.");
        }
        setErrorPopupOpen(true);
      });
  }

  function handleDeleteComment(comment: Comment) {
    deleteComment(comment);
  }

  async function deleteComment(comment: Comment): Promise<void> {
    await axios
      .delete(`http://localhost:8080/api/v1/comments/${comment.uuid!}`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => {
        setSuccessMessage("Comment successfully deleted");
        setSuccessPopupOpen(true);
        setBoard((prevBoard) => {
          const updatedComments = prevBoard!.comments!.filter(
            (c) => c.uuid !== comment.uuid
          );
          return {
            ...prevBoard!,
            comments: updatedComments,
          };
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
        } else {
          setErrorMessage("Error occured while deleting comment.");
        }
        setErrorPopupOpen(true);
      });
  }

  async function downloadFile(file: BoardFile) {
    axios({
      method: "get",
      url: `http://localhost:8080/api/v1/files/${file.uuid!}`,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${getStoredToken()}`,
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${file.originalName}`); // You can set the desired file name here
        document.body.appendChild(link);
        link.click();

        setSuccessMessage("File successfully downloaded");
        setSuccessPopupOpen(true);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
        } else {
          setErrorMessage("Error occured while downloading file.");
        }
        setErrorPopupOpen(true);
      });
  }

  function handleUploadedFile(file: BoardFile) {
    board?.boardFiles?.push(file);
  }

  function handleDeleteFile(file: BoardFile) {
    setLoading(true);
    deleteFile(file).finally(() => setLoading(false));
  }

  async function deleteFile(file: BoardFile) {
    await axios
      .delete(`http://localhost:8080/api/v1/files/${file.uuid!}`, {
        headers: {
          Authorization: `Bearer ${getStoredToken()}`,
        },
      })
      .then((response) => {
        setSuccessMessage("File successfully deleted");
        setSuccessPopupOpen(true);
        setBoard((prevBoard) => {
          const updatedBoardFile = prevBoard!.boardFiles!.filter(
            (bf) => bf.uuid !== file.uuid
          );
          return {
            ...prevBoard!,
            boardFiles: updatedBoardFile,
          };
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data);
        } else {
          setErrorMessage("Error occured while deleting file");
        }
        setErrorPopupOpen(true);
      });
  }

  return (
    <>
      <Navbar onMenuToggle={toggleSideMenu} />
      <SideMenu open={sideMenuOpen} onClose={toggleSideMenu} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={7}>
          <Paper variant="outlined" style={{ padding: "20px", margin: "20px" }}>
            <Typography variant="h4" gutterBottom>
              {isEditMode ? (
                <TextField
                  label="Board Name"
                  value={editingBoard?.name || ""}
                  fullWidth
                  onChange={(e) =>
                    handleFieldChange("name", e.target.value as string)
                  }
                  error={errors.name}
                />
              ) : (
                editingBoard?.name
              )}
            </Typography>
            <TextField
              style={{ marginTop: "10px" }}
              label="Description"
              value={editingBoard?.description || ""}
              disabled={!isEditMode}
              fullWidth
              variant="outlined"
              onChange={(e) =>
                handleFieldChange("description", e.target.value as string)
              }
              error={errors.description}
            />
            <Grid container spacing={2} marginTop="25px">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={editingBoard?.startDate || ""}
                  disabled={true}
                  fullWidth
                  variant="outlined"
                />
                <FormControl
                  fullWidth
                  margin="normal"
                  required
                  disabled={!isEditMode}
                >
                  <InputLabel id="board-status-id">Board Status</InputLabel>
                  <Select
                    labelId="board-status-id"
                    label="Board Status"
                    value={editingBoard?.status || ""}
                    onChange={(e) =>
                      handleFieldChange("status", e.target.value as string)
                    }
                  >
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  type="date"
                  value={editingBoard?.endDate || ""}
                  disabled={true}
                  fullWidth
                  variant="outlined"
                />
                <Autocomplete
                  style={{ marginTop: "16px" }}
                  options={boardTypes}
                  key={editingBoard?.boardType?.uuid}
                  getOptionLabel={(option) => option.name!}
                  value={editingBoard?.boardType!}
                  onChange={(event, newValue) => {
                    handleFieldChange("boardType", newValue);
                  }}
                  disabled={!isEditMode || !isTexFieldEmpty}
                  renderInput={(params) => (
                    <TextField {...params} label="Existing Board Type" />
                  )}
                  isOptionEqualToValue={(v1, v2) => {
                    return v1.uuid === v2.uuid;
                  }}
                />
                <>
                  {isEditMode ? (
                    <TextField
                      style={{ marginTop: "20px" }}
                      label="New Board Type"
                      value={newBoardTypeName}
                      onChange={handleNewBoardTypeTextFieldChange}
                      fullWidth
                    />
                  ) : (
                    <></>
                  )}
                </>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "20px",
              marginTop: "20px",
              marginRight: "100px",
              maxWidth: "150px",
            }}
          >
            {isEditMode ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  style={{ marginTop: "10px" }}
                  onClick={handleEditModeToggle}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditModeToggle}
                >
                  <EditIcon fontSize="small" />
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    marginTop: "10px",
                    borderColor: "#f44336",
                  }}
                  color="error"
                  onClick={handleDeleteBoard}
                >
                  <DeleteIcon fontSize="small" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <ToggleButtonGroup
        value={selectedSection}
        exclusive
        onChange={handleSectionChange}
        style={{
          marginBottom: "20px",
          display: "flex",
          marginLeft: "25px",
        }}
        color="primary"
      >
        <ToggleButton value="members">Members</ToggleButton>
        <ToggleButton value="comments">Comments</ToggleButton>
        <ToggleButton value="files">Files</ToggleButton>
      </ToggleButtonGroup>
      {selectedSection === "members" && board?.memberships && (
        <MembersComponent
          members={board?.memberships}
          onDeleteMember={handleMemberDeletion}
          startDate={board?.startDate!}
          endDate={board?.endDate!}
          onSaveEdit={handleSaveEdit}
          onAdd={handleDisplayAddMember}
        />
      )}
      {selectedSection === "comments" && (
        <CommentsComponent
          comments={board?.comments!}
          onAddComment={handleNewComment}
          loggedUserEmail={
            employees.find((e) => e.uuid === getStoredUUID())?.userProfile
              ?.email!
          }
          onDeleteComment={handleDeleteComment}
        />
      )}
      {selectedSection === "files" && (
        <FilesComponent
          boardFiles={board?.boardFiles!}
          handleDownload={downloadFile}
          board={board!}
          onUpload={handleUploadedFile}
          onDelete={handleDeleteFile}
        />
      )}

      <ErrorPopup
        open={errorPopupOpen}
        message={errorMessage}
        onClose={closeErrorPopup}
      />
      <SuccessPopup
        open={successPopupOpen}
        message={successMessage}
        onClose={() => setSuccessPopupOpen(false)}
      />
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
      <Dialog open={confirmDeleteDialogOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this board? All comments and files
          will be deleted.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirmDelete}
            color="primary"
            variant="outlined"
          >
            No
          </Button>
          <Button onClick={deleteBoard} color="error" variant="outlined">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={displayAddMember}
        fullWidth
        style={{ padding: "20px" }}
        onClose={handleDisplayAddMember}
      >
        <div style={{ padding: "20px" }}>
          <MembersStep
            employees={employeesWithoutMembership}
            onNext={handleDisplayAddMember}
            startDate={board?.startDate!}
            endDate={board?.endDate!}
            handleMemberships={handleMembershipsChange}
            onCreate={() => {}}
          />
        </div>
      </Dialog>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default BoardDetailsPage;
