import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Membership, MembershipStatus } from "../models/Membership";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  members: Membership[];
  onDeleteMember: (uuid: string) => void;
}

function MembersComponent({ members, onDeleteMember }: Props) {
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
                    onClick={() => onDeleteMember(member.uuid!)}
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
    </div>
  );
}

export default MembersComponent;
