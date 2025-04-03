import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/FormButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/signup`, data);
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
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

        <Button type="submit">Register</Button>
      </form>
      <Link to="/login" className="text-blue-500 mt-4">
        Already have an account? Login here
      </Link>
    </div>
  );
};

export default Register;
