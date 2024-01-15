type FormItem = {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  maxLength?: number;
};

const Forms = () => {
  const formDictionary = {
    registration: [
      { id: 1, name: "Name", type: "text", placeholder: "John Smith" },
      { id: 2, name: "Email", type: "email", placeholder: "name@company.com" },
      { id: 3, name: "Phone", type: "phone", placeholder: "000-000-000" },
      { id: 4, name: "Password", type: "password", placeholder: "••••••••" },
    ] as FormItem[],
    login: [
      { id: 1, name: "Email", type: "email", placeholder: "name@company.com" },
      { id: 2, name: "Password", type: "password", placeholder: "••••••••" },
    ] as FormItem[],
    phoneVerify: [
      { id: 1, name: "email", type: "email", placeholder: "name@company.com" },
      { id: 1, name: "phone", type: "phone", placeholder: "000-000-000" },
    ] as FormItem[],
    verificationCode: [
      {
        id: 1,
        name: "Code",
        type: "number",
        placeholder: "000000",
        maxLength: 6,
      },
    ] as FormItem[],
    passwordRecovery: [
      { id: 1, name: "password", type: "password", placeholder: "••••••••" },
      {
        id: 2,
        name: "confirmPassword",
        type: "password",
        placeholder: "••••••••",
      },
    ] as FormItem[],
  };
  return formDictionary;
};

export default Forms;
