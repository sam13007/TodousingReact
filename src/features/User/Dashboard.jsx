import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import SettingsPowerIcon from "@mui/icons-material/SettingsPower";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTaskForm from "../../components/AddTaskForm";
import { addTask, dragState, deleteTask } from "./TodoSlice";
import TaskCard from "../../components/TaskCard";
import "./Dashboard.css";
import dayjs from "dayjs";

const priorityOptions = ["high", "medium", "low"];

function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const loggedinUser = useSelector((data) => data?.users.regUsers?.[email]);
  const userRegTasks = useSelector((data) => data?.todos);

  const userTasks =
    userRegTasks &&
    userRegTasks.filter((task) => {
      return task.email === email;
    });

  const [value, setValue] = useState(priorityOptions[0]);
  const [inputValue, setInputValue] = useState("");
  const [taskName, setTaskname] = useState("");
  const [dateValue, setDateValue] = React.useState(dayjs());

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTask({
        taskName,
        priority: value,
        email: email,
        dueDate: dayjs(dateValue).format("DD/MM/YYYY"),
      })
    );
    setTaskname("");

    setDateValue(dayjs());
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId === "4") {
        dispatch(deleteTask(result.draggableId));
      } else {
        dispatch(
          dragState({
            dragId: result.draggableId,
            destination: parseInt(destination.droppableId),
          })
        );
      }
    }
  };

  const dropableColumns = [
    {
      id: 0,
      title: "Backlog",
      numberOfTask: userTasks.filter((task) => task.stage === 0).length,
    },
    {
      id: 1,
      title: "To Do",
      numberOfTask: userTasks.filter((task) => task.stage === 1).length,
    },
    {
      id: 2,
      title: "Ongoing",
      numberOfTask: userTasks.filter((task) => task.stage === 2).length,
    },
    {
      id: 3,
      title: "Done",
      numberOfTask: userTasks.filter((task) => task.stage === 3).length,
    },
  ];

  return (
    <div>
      <h2>Kanban Dashboard</h2>
      <p>Welcome, {loggedinUser.username}</p>
      <p>Tasks: {userTasks.length}</p>

      <AddTaskForm
        handleSubmit={handleSubmit}
        value={value}
        inputValue={inputValue}
        setValue={setValue}
        setInputValue={setInputValue}
        taskName={taskName}
        priorityOptions={priorityOptions}
        setTaskname={setTaskname}
        dateValue={dateValue}
        setDateValue={setDateValue}
      />
      <div style={{ position: "fixed", top: 10, right: 10 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            localStorage.removeItem("email");
            navigate("/login");
          }}
          startIcon={<SettingsPowerIcon />}
        >
          Logout
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="draggable-context">
          <div className="draggle-column">
            {dropableColumns.map((col) => {
              return (
                <Droppable key={col.id} droppableId={col.id.toString()}>
                  {(provided) => (
                    <Container
                      className="taskList"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      maxWidth="sm"
                    >
                      <span>
                        {col.title} : {col.numberOfTask}
                      </span>
                      {userTasks
                        .filter((task) => col.id === task.stage)
                        .map((item, index) => {
                          return (
                            <TaskCard key={index} item={item} index={index} />
                          );
                        })}
                      {provided.placeholder}
                    </Container>
                  )}
                </Droppable>
              );
            })}
          </div>
        </div>
        <div>
          <Droppable droppableId={"4"}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ position: "fixed", bottom: 10, right: 30 }}
              >
                <DeleteIcon
                  fontSize="medium"
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "50%",
                  }}
                />
                {/* {provided.placeholder} */}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
