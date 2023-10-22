import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MemberNode } from "shared-types";
import { MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";

type Props = {
  onClose: () => void;
  onSave: (node: Omit<MemberNode, "id" | "parentId">) => void;
};

export const AddMemberNodeModal = ({ onClose, onSave }: Props) => {
  const { handleSubmit, register, watch } =
    useForm<Omit<MemberNode, "id" | "parentId">>();

  const type = watch("type");

  return (
    <Dialog open={true} onClose={onClose}>
      <form onSubmit={handleSubmit(onSave)}>
        <DialogTitle>Add a new member</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginTop: 1 }}
            autoFocus
            id="name"
            label="Name"
            {...register("name", { required: true })}
            type="text"
            fullWidth
            variant="outlined"
          />
          <Select
            sx={{ marginY: 2 }}
            fullWidth
            id="type"
            {...register("type", { required: true })}
            defaultValue={"Developer"}
            label="Type"
          >
            <MenuItem value={"Developer"}>Developer</MenuItem>
            <MenuItem value={"Manager"}>Manager</MenuItem>
          </Select>
          {type === "Manager" ? (
            <TextField
              id="departmentName"
              label="Department Name"
              name="departmentName"
              type="text"
              fullWidth
              variant="outlined"
            />
          ) : (
            <TextField
              id="programingLanguage"
              label="Prefered Programing Language"
              name="programingLanguage"
              type="text"
              fullWidth
              variant="outlined"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
