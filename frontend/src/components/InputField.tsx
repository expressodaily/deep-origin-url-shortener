import React from "react";

const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  register: any;
  rules?: object;
  error?: any;
}> = ({ id, label, type, register, rules, error }) => (
  <div>
    <label htmlFor={id} className="block text-gray-700 mb-1">
      {label}
    </label>
    <input
      id={id}
      type={type}
      {...register(id, rules)}
      className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-blue-200"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

export default InputField;
