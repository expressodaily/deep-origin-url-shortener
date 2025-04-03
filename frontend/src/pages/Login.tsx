import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/FormButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    try {
      const { data: response } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        data
      );

      const { email, token } = response.data;
      localStorage.setItem("email", email);
      localStorage.setItem("token", token);

      setSuccessMessage("Login successful");
      setTimeout(() => {
        setSuccessMessage(null);
        navigate("/main");
      }, 1000);
    } catch (error: any) {
      alert(error.response.data.error || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Login</h2>

      {successMessage && <Alert message={successMessage} type="success" />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <InputField
          id="email"
          label="Email"
          type="text"
          register={register}
          rules={{ required: "Email is required" }}
          error={errors.email}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          register={register}
          rules={{ required: "Password is required" }}
          error={errors.password}
        />
        <Button type="submit">Login</Button>
      </form>

      <Link to="/register" className="text-blue-500 mt-4 hover:underline">
        Don't have an account? Register here
      </Link>
    </div>
  );
};

const Alert: React.FC<{ message: string; type: "success" | "error" }> = ({
  message,
  type,
}) => {
  const alertStyles =
    type === "success"
      ? "bg-green-100 border border-green-400 text-green-700"
      : "bg-red-100 border border-red-400 text-red-700";

  return (
    <div className={`${alertStyles} mb-4 px-4 py-3 rounded`}>{message}</div>
  );
};

export default Login;
