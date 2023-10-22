import { FC } from "react";
import { Paper, Typography } from "@mui/material";
import { MemberNode } from "shared-types";
import { useMemberNode } from "../hooks/useMemberNode";

type Props = {
  node: MemberNode;
};

export const MemberNodeComponent: FC<Props> = ({ node }) => {
  const { id, name, parentId, type } = node;
  const { children, addNode } = useMemberNode(id);
  return (
    <Paper
      elevation={3}
      style={{
        padding: "2px 15px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6">Node Information</Typography>
      <Typography variant="body1">Node ID: {id}</Typography>
      <Typography variant="body1">Node Name: {name}</Typography>
      <Typography variant="body1">Parent Node: {parentId}</Typography>
      {type === "Manager" && (
        <Typography variant="body1">
          Department Managed: {node.departmentName}
        </Typography>
      )}
      {type === "Developer" && (
        <Typography variant="body1">
          Preferred Language: {node.programingLanguage}
        </Typography>
      )}
    </Paper>
  );
};