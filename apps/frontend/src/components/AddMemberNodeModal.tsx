import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MemberNode } from "shared-types";
import { useForm } from "react-hook-form";

type Props = {
  onClose: () => void;
  onSave: (node: Omit<MemberNode, "id" | "parentId">) => void;
};

export const AddMemberNodeModal = ({ onClose, onSave }: Props) => {
  const { handleSubmit } = useForm<Omit<MemberNode, "id">>();

  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSubmit(onSave)}>
        <DialogTitle>Add a new member</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
