import { FC, useState } from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MemberNode } from "shared-types";
import { useMemberNode } from "../hooks/useMemberNode";
import { AddMemberNodeModal } from "./AddMemberNodeModal";

type Props = {
  node: MemberNode & { height: number };
};

export const MemberNodeComponent: FC<Props> = ({ node }) => {
  const { id, name, parentId, type } = node;
  const { children, addNode } = useMemberNode(id);

  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Paper
        elevation={3}
        style={{
          padding: "2px 15px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography variant="h6">Member Information</Typography>
          <Typography variant="body1">Member ID: {id}</Typography>
          <Typography variant="body1">Member Name: {name}</Typography>
          <Typography variant="body1">Parent Member ID: {parentId}</Typography>
          <Typography variant="body1">Level (Height): {node.height}</Typography>
          {type === "Manager" && node.departmentName && (
            <Typography variant="body1">
              Department Managed: {node.departmentName}
            </Typography>
          )}
          {type === "Developer" && node.programingLanguage && (
            <Typography variant="body1">
              Preferred Language: {node.programingLanguage}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <IconButton
            color="primary"
            aria-label="add node"
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 1 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {children.map((childNode) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginX: 1,
            }}
          >
            <Box sx={{ width: 4, height: 20, backgroundColor: "black" }} />
            <MemberNodeComponent
              node={{ ...childNode, height: node.height + 1 }}
            />
          </Box>
        ))}
      </Box>
      {open && (
        <AddMemberNodeModal
          onClose={() => setOpen(false)}
          onSave={async (node: Omit<MemberNode, "id" | "parentId">) => {
            await addNode({ ...node, parentId: id });
            setOpen(false);
          }}
        />
      )}
    </Box>
  );
};
