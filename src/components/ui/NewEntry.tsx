import { useState, ChangeEvent, useContext } from "react";
import { Box, Button, TextField } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { EntriesContext } from "@/Context/entries";
import { UIContext } from "@/Context/ui";

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext);
  const { setIsAddingEntry, isAddingEntry } = useContext(UIContext);
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const handleIsAdding = () => {
    setIsAddingEntry(!isAddingEntry);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.length === 0) return;

    addNewEntry(inputValue);

    setInputValue("");
    setIsAddingEntry(false);
    setTouched(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            value={inputValue}
            onChange={handleTextChange}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
            fullWidth
            placeholder="New entry"
            autoFocus
            multiline
            label="New entry"
            helperText="Enter a value"
            sx={{ marginTop: 2, marginBottom: 1 }}
          ></TextField>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={handleIsAdding} endIcon={<SaveOutlinedIcon />}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="outlined"
              endIcon={<SaveOutlinedIcon />}
              color="success"
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          onClick={handleIsAdding}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth
          variant="outlined"
        >
          Add task
        </Button>
      )}
    </Box>
  );
};
