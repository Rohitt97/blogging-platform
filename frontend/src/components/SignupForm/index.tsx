import React from "react";
import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { signupUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import { useForm } from "react-hook-form";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function SignupForm() {
  // const [name, setName] = React.useState<string | undefined>();
  // const [email, setEmail] = React.useState<string | undefined>();
  // const [password, setPassword] = React.useState<string | undefined>();
  const navigate = useNavigate();
  // const { setAuthUser } = useAuth();
  const { setAuthUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function handleSignup(data: FormValues) {
    const userData = await signupUser(data);
    if (userData.accessToken) {
      setAuthUser(userData);
      navigate("/");
    }
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            type="text"
            placeholder="Enter your Name"
            {...register("name", { required: "name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "email is required" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            type="password"
            placeholder="Enter password"
            {...register("password", { required: "password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            onClick={handleSubmit(handleSignup)}
            sx={{
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#000",
              },
              color: "#fff",
            }}
          >
            Signin
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
