import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { FormInputText } from "../../components/FormInput/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, clearState } from "../../features/User/UserSlice";
import toast, { Toaster } from "react-hot-toast";
import "./Registration.css";

function Signup() {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((data) => data.users);

  const onSubmitHandle = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    if (isError) {
      toast.error("user already registered");
    }

    if (isSuccess) {
      dispatch(clearState());
      navigate("/login");
    }
  }, [isError, isSuccess, dispatch, navigate]);

  return (
    <div className="box-container">
      <Box className="card-container">
        <h2>Register </h2>

        <form onSubmit={handleSubmit(onSubmitHandle)} method="POST">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <FormInputText
              name={"name"}
              control={control}
              label={"Name"}
              type="text"
              rules={{
                required: { value: true, message: "This field can't be empty" },
              }}
            />
            <FormInputText
              name={"username"}
              control={control}
              label={"Username"}
              type="text"
              rules={{
                required: { value: true, message: "This field can't be empty" },
              }}
            />
            <FormInputText
              name={"email"}
              control={control}
              label={"Email"}
              type="text"
              rules={{
                required: { value: true, message: "This field can't be empty" },
                pattern: {
                  value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                  message: "Enter a valid email ID",
                },
              }}
            />
            <FormInputText
              name={"contact"}
              control={control}
              label={"Contact number"}
              rules={{
                validate: (value) => {
                  if (value && value?.length !== 10) {
                    return "Enter a valid contact number";
                  }
                },
              }}
            />
            <FormInputText
              name={"password"}
              control={control}
              label={"Password"}
              type="password"
              rules={{
                required: { value: true, message: "This field can't be empty" },
                minLength: { value: 8, message: "Enter a valid password" },
              }}
            />

            <Button type="submit" variant="contained">
              Register
            </Button>
          </div>
        </form>
        <Toaster position="bottom-center" />
        <div style={{ marginTop: "10px" }}>
          <span>
            or <Link to="/login">Log in</Link>
          </span>
        </div>
      </Box>
    </div>
  );
}

export default Signup;
