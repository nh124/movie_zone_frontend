import DuoButtonDictionary from "../Rawfiles/DuoButtonDictionary";

const DualTab = ({
  setTab,
  currentValue,
  DuoTabType,
  setStatus,
  setDefault,
}) => {
  const tabDictionary = DuoButtonDictionary();

  const currentDuoTab =
    DuoTabType === "signUp" ? tabDictionary.signUp : tabDictionary.userChoices;

  const onClick = (e) => {
    setDefault("switch");
    setTab(e.target.name);
    setStatus({
      status: "",
      message: "",
    });
  };
  return (
    <div className="w-full h-auto flex flex-row relative overflow-hidden">
      {currentDuoTab.map((tab) => {
        return (
          <button
            key={tab.id}
            name={tab.name}
            onClick={(e) => onClick(e)}
            className={`w-full py-3 relative z-10 font-bold border-t border-b border-gray-700 ${
              currentValue === tab.name ? "text-[#1F2937]" : ""
            } `}
          >
            {tab.name}
          </button>
        );
      })}
      <div
        className={`absolute w-[50%] h-full bg-blue-400 duration-300 transform ease-in-out z-0 ${
          currentValue === currentDuoTab[0].name
            ? "translate-x-0"
            : "translate-x-[100%]"
        }`}
      ></div>
    </div>
  );
};

export default DualTab;
