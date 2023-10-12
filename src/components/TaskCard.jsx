import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { deleteTask, moveRight, moveLeft } from "../features/User/TodoSlice";
import { useDispatch } from "react-redux";
import "./TaskCard.css";

function TaskCard({ item, index }) {
  const dispatch = useDispatch();
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
              <p>{item.taskName}</p>
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
              </div>
            </div>
            <div className="task-dueDate">Due: {item.dueDate}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
