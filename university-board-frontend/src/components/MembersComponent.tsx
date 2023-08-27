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
} from "@mui/material";
import { Membership, MembershipStatus } from "../models/Membership";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
  members: Membership[];
  onDeleteMember: (uuid: string) => void;
}

function MembersComponent({ members, onDeleteMember }: Props) {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Membership | null>(null);

  const handleDeleteConfirmationOpen = (member: Membership) => {
    setMemberToDelete(member);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setMemberToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  return (
    <div className="member-table-container">
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
                <TableCell>{member.commencementDate}</TableCell>
                <TableCell>
                  {
                    Object.values(MembershipStatus)[
                      Object.keys(MembershipStatus).indexOf(member.status!)
                    ]
                  }
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    // onClick={() => onEdit(member.uuid!)}
                    aria-label="edit"
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteConfirmationOpen(member)}
                    aria-label="delete"
                  >
                    <DeleteForeverIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
