import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Fab,
  Tooltip,
} from "@mui/material";
import { Membership, MembershipStatus } from "../models/Membership";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { getStoredPrivileges, getStoredUUID } from "../utils/AuthUtils";

interface Props {
  members: Membership[];
  onDeleteMember: (uuid: string) => void;
  onSaveEdit: (member: Membership) => Promise<void>;
  startDate: string;
  endDate: string;
  onAdd: () => void;
}

function MembersComponent({
  members,
  onDeleteMember,
  onSaveEdit,
  startDate,
  endDate,
  onAdd,
}: Props) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Membership | null>(null);
  const [editModeMembers, setEditModeMembers] = useState<
    Record<string, boolean>
  >({});
  const [editedMemberships, setEditedMemberships] =
    useState<Membership[]>(members);

  const handleDeleteConfirmationOpen = (member: Membership) => {
    setMemberToDelete(member);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setMemberToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleEdit = (uuid: string) => {
    setEditModeMembers((prevEditModeMembers) => ({
      ...prevEditModeMembers,
      [uuid]: true,
    }));
  };

  const handleSaveEdit = (uuid: string) => {
    setEditModeMembers((prevEditModeMembers) => ({
      ...prevEditModeMembers,
      [uuid]: false,
    }));
    onSaveEdit(editedMemberships.filter((em) => em.uuid === uuid).at(0)!);
  };

  const handleCancelEdit = (uuid: string) => {
    setEditModeMembers((prevEditModeMembers) => ({
      ...prevEditModeMembers,
      [uuid]: false,
    }));

    setEditedMemberships((prevEditedMemberships) => {
      const membershipIndex = prevEditedMemberships.findIndex(
        (m) => m.uuid === uuid
      );
      if (membershipIndex !== -1) {
        const updatedMemberships = [...prevEditedMemberships];
        updatedMemberships[membershipIndex] = members.find(
          (m) => m.uuid === uuid
        )!;
        return updatedMemberships;
      }
      return prevEditedMemberships;
    });
  };

  function handleFieldChange(uuid: string | null, value: any, field: string) {
    setEditedMemberships((prevEditedMemberships) => {
      const updatedMemberships = prevEditedMemberships.map((em) => {
        if (em.uuid === uuid) {
          return { ...em, [field]: value };
        }
        return em;
      });
      return updatedMemberships;
    });
  }

  return (
    <div className="member-table-container">
      <div style={{ position: "relative" }}>
        <Tooltip
          title="Add Member"
          aria-label="add"
          placement="top"
          arrow
          style={{
            position: "absolute",
            top: "-80px", // Adjust this value to your preference
            right: "-10px",
            zIndex: 1,
          }}
        >
          <Fab
            color="success"
            aria-label="add"
            onClick={() => onAdd()}
            disabled={
              !getStoredPrivileges()?.includes("BOARD_W") ||
              members?.filter((m) => m.employee?.uuid === getStoredUUID())
                .length === 0
            }
          >
            <AddIcon />
          </Fab>
        </Tooltip>
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table className="member-table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Commencement Date</TableCell>
                <TableCell>Membership Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.uuid}>
                  <TableCell>{member.employee!.firstName}</TableCell>
                  <TableCell>{member.employee!.lastName}</TableCell>
                  <TableCell>{member.employee!.userProfile!.email}</TableCell>
                  <TableCell>
                    {editModeMembers[member.uuid!] ? (
                      <TextField
                        type="date"
                        value={
                          editedMemberships
                            .filter((em) => em.uuid === member.uuid)
                            .at(0)?.commencementDate
                        }
                        onChange={(e) => {
                          handleFieldChange(
                            member.uuid,
                            e.target.value,
                            "commencementDate"
                          );
                        }}
                        inputProps={{
                          min:
                            new Date(startDate) < new Date()
                              ? new Date().toISOString().split("T")[0]
                              : startDate,
                          max: endDate,
                        }}
                      />
                    ) : (
                      member.commencementDate
                    )}
                  </TableCell>
                  <TableCell>
                    {editModeMembers[member.uuid!] ? (
                      <TextField
                        select
                        value={
                          editedMemberships
                            .filter((em) => em.uuid === member.uuid)
                            .at(0)?.status
                        }
                        onChange={(e) => {
                          handleFieldChange(
                            member.uuid,
                            e.target.value,
                            "status"
                          );
                        }}
                      >
                        {Object.keys(MembershipStatus).map(
                          (statusKey, index) => {
                            const statusValue =
                              Object.values(MembershipStatus)[index];
                            return (
                              <MenuItem key={statusKey} value={statusKey}>
                                {statusValue}
                              </MenuItem>
                            );
                          }
                        )}
                      </TextField>
                    ) : (
                      Object.values(MembershipStatus)[
                        Object.keys(MembershipStatus).indexOf(member.status!)
                      ]
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editModeMembers[member.uuid!] ? (
                      <>
                        <IconButton
                          onClick={() => handleSaveEdit(member.uuid!)}
                          aria-label="save"
                        >
                          <SaveIcon color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleCancelEdit(member.uuid!)}
                          aria-label="cancel"
                        >
                          <CancelIcon color="error" />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => handleEdit(member.uuid!)}
                          aria-label="edit"
                          disabled={
                            !getStoredPrivileges()?.includes("BOARD_W") ||
                            members?.filter(
                              (m) => m.employee?.uuid === getStoredUUID()
                            ).length === 0
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteConfirmationOpen(member)}
                          aria-label="delete"
                          disabled={
                            !getStoredPrivileges()?.includes("BOARD_W") ||
                            members?.filter(
                              (m) => m.employee?.uuid === getStoredUUID()
                            ).length === 0
                          }
                        >
                          <DeleteForeverIcon color="error" />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this member?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteConfirmationClose}
            color="primary"
            variant="outlined"
          >
            No
          </Button>
          <Button
            onClick={() => {
              onDeleteMember(memberToDelete?.uuid!);
              handleDeleteConfirmationClose();
            }}
            color="error"
            variant="outlined"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MembersComponent;
