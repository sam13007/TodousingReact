import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { IconButton, TextField, Autocomplete } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  deleteTask,
  moveRight,
  moveLeft,
  editTaskName,
} from "../features/User/TodoSlice";
import { useDispatch } from "react-redux";
import "./TaskCard.css";
import dayjs from "dayjs";

const priorityOptions = ["high", "medium", "low"];

function TaskCard({ item, index }) {
  const [edit, setEdit] = useState(false);
  const [editTask, setEditTask] = useState(item.taskName);
  const [editDateVal, setEditDateVal] = useState(dayjs());
  const dispatch = useDispatch();

  const [priorityValue, setPriorityValue] = useState(item.priority);
  const [inputValue, setInputValue] = useState("");

  const onEditTaskHandler = () => {
    dispatch(
      editTaskName({
        taskName: editTask,
        id: item.id,
        dueDate: dayjs(editDateVal).format("DD/MM/YYYY"),
        priority: priorityValue,
      })
    );
    setEdit(false);
  };

  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={`task-info priority-${item.priority}`}>
            <div className="task-title">
              {edit ? (
                <TextField
                  variant="standard"
                  label="Task name"
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
              ) : (
                <p style={{ fontSize: "1.5em" }}>{item.taskName}</p>
              )}

              {edit ? (
                <div className="task-icons">
                  <IconButton
                    aria-label="save"
                    size="small"
                    onClick={onEditTaskHandler}
                  >
                    <DoneIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="cancel"
                    size="small"
                    onClick={() => {
                      setEditTask(item.taskName);
                      setEdit(false);
                    }}
                  >
                    <ClearIcon fontSize="inherit" />
                  </IconButton>
                </div>
              ) : (
                <div className="task-icons">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => dispatch(deleteTask(item.id))}
                  >
                    <DeleteOutlineIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="left"
                    size="small"
                    onClick={() => dispatch(moveLeft(item.id))}
                    disabled={item.stage === 0}
                  >
                    <ArrowBackIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="right"
                    size="small"
                    disabled={item.stage === 3}
                    onClick={() => dispatch(moveRight(item.id))}
                  >
                    <ArrowForwardIcon fontSize="inherit" />
                  </IconButton>

                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </div>
              )}
            </div>
            {edit ? (
              <div className="task-editForm">
                <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
                  <DatePicker
                    label="Due Date"
                    value={editDateVal}
                    onChange={(newValue) => setEditDateVal(newValue)}
                  />
                </LocalizationProvider>

                <Autocomplete
                  value={priorityValue}
                  onChange={(event, newValue) => {
                    setPriorityValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  options={priorityOptions}
                  renderInput={(params) => (
                    <TextField {...params} required label="Priority" />
                  )}
                />
              </div>
            ) : (
              <div className="task-dueDate">Due: {item.dueDate}</div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
