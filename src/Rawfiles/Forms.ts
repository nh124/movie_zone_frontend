const Forms = () => {
  const formDictionary = {
    registration: [
      { id: 1, name: "Name", type: "text", placeholder: "John Smith" },
      { id: 2, name: "Email", type: "email", placeholder: "name@company.com" },
      { id: 3, name: "Phone", type: "phone", placeholder: "000-000-000" },
      { id: 4, name: "Password", type: "password", placeholder: "••••••••" },
    ],
    login: [
      { id: 1, name: "Email", type: "email", placeholder: "name@company.com" },
      { id: 2, name: "Password", type: "password", placeholder: "••••••••" },
    ],
    phoneVerify: [
      { id: 1, name: "email", type: "email", placeholder: "name@company.com" },
      { id: 1, name: "phone", type: "phone", placeholder: "000-000-000" },
    ],
    verificationCode: [
      {
        id: 1,
        name: "Code",
        type: "text",
        placeholder: "000000",
        maxLength: 6,
      },
    ],
    passwordRecovery: [
      { id: 1, name: "password", type: "password", placeholder: "••••••••" },
      {
        id: 2,
        name: "confirmPassword",
        type: "password",
        placeholder: "••••••••",
      },
    ],
  };
  return formDictionary;
};

export default Forms;
