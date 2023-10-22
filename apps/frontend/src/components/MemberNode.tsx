import { FC } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { MemberNode } from "shared-types";
import { useMemberNode } from "../hooks/useMemberNode";

type Props = {
  node: MemberNode & { height: number };
};

export const MemberNodeComponent: FC<Props> = ({ node }) => {
  const { id, name, parentId, type } = node;
  const { children, addNode } = useMemberNode(id);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {children.map((childNode) => (
          <Box>
            <MemberNodeComponent
              node={{ ...childNode, height: node.height + 1 }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
