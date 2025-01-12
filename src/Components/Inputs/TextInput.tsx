import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
const TextInput = ({
  form,
  formValues,
  onChange,
  password,
}: {
  form: any;
  formValues: any;
  onChange: any;
  password?: boolean;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { name, placeholder, type } = form;
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{name}</label>
      <div className="relative">
        <input
          onChange={onChange}
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={formValues[name.toLowerCase()]} // Use dynamic property access
          id={name}
          maxLength={form?.maxLength}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
          placeholder={placeholder}
          required
        />
        {password && (
          <button
            className="absolute top-1/2  transform -translate-y-1/2 pr-3 right-0"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInput;
