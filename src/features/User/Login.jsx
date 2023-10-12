import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { FormInputText } from "../../components/FormInput";
import "./Registration.css";

function Login() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const recaptcha = useRef();
  const users = useSelector((data) => data.users.regUsers);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmitHandler = (data) => {
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify the reCAPTCHA!");
    } else {
      const loginUser = users?.[data.email];

      if (loginUser && loginUser.password === data.password) {
        localStorage.setItem("email", data.email);

        navigate("/");
      } else {
        toast.error("login failed");
      }
    }
  };

  return (
    <div className="box-container">
      <Box className="card-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmitHandler)} method="GET">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <FormInputText
              name={"email"}
              control={control}
              label={"Email"}
              type="text"
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
              }}
              required
            />
            <FormInputText
              name={"password"}
              control={control}
              label={"Password"}
              type="password"
              required
              rules={{
                required: true,
                minLength: { value: 8, message: "Enter a valid password" },
              }}
            />
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.REACT_APP_SITE_KEY}
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </div>
          <Toaster position="bottom-center" />
        </form>

        <div style={{ marginTop: "10px" }}>
          <span>
            or <Link to="/signup">Sign up</Link>
          </span>
        </div>
      </Box>
    </div>
  );
}

export default Login;
