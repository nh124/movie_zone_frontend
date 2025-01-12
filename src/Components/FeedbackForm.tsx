const FormComponent = ({
  openFeedbackForm,
  setOpenFeedbackForm,
}: {
  openFeedbackForm: boolean;
  setOpenFeedbackForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setOpenFeedbackForm(false);
  return (
    <div
      className={`w-[60%] h-[50%] animate-slideUpAnimation ${
        openFeedbackForm ? "flex" : "hidden"
      }`}
    >
      hello
    </div>
  );
};

export default FormComponent;
