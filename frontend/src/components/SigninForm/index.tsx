import { Card, CardContent, Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthProvider/AuthContext";
import { signinUser } from "../../services/authService";

interface FormValues {
  email: string;
  password: string;
}

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { setAuthUser } = useAuth();

  const handleSignin = async (data: FormValues) => {
    try {
      const userData = await signinUser(data);
      if (userData) {
        setAuthUser(userData);
      }
    } catch (error) {
      alert("User Not Found with the deatails you provided:");
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
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
            sx={{
              backgroundColor: "#000",
              "&:hover": {
                backgroundColor: "#000",
              },
              color: "#fff",
            }}
            onClick={handleSubmit(handleSignin)}
          >
            Signin
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
