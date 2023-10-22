import { Box } from "@mui/material";
import { MemberNodeComponent } from "./components/MemberNode";
import { useMemberNode } from "./hooks/useMemberNode";

const App = () => {
  const { children } = useMemberNode(0);
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {children.map((node) => (
        <MemberNodeComponent node={node} />
      ))}
    </Box>
  );
};

export default App;
