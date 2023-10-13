import React from "react";
import { TextField, Autocomplete, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./AddTaskForm.css";

function AddTaskForm({
  handleSubmit,
  taskName,
  setTaskname,
  value,
  setValue,
  inputValue,
  setInputValue,
  priorityOptions,
  dateValue,
  setDateValue,
}) {
  return (
    <div className="addtask-container">
      <form className="addtask-form" onSubmit={handleSubmit}>
        <TextField
          label="Task Name"
          variant="outlined"
          value={taskName}
          onChange={(e) => setTaskname(e.target.value)}
          required
        />
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          sx={{ width: "300px" }}
          options={priorityOptions}
          renderInput={(params) => (
            <TextField {...params} required label="Priority" />
          )}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Due Date"
            value={dateValue}
            onChange={(newValue) => setDateValue(newValue)}
          />
        </LocalizationProvider>
        <Button color="secondary" variant="contained" type="submit">
          Add Task
        </Button>
      </form>
    </div>
  );
}

export default AddTaskForm;
