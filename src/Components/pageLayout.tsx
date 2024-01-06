import { PropsWithChildren } from "react";
import Navbar from "./Navbar";

export const PageLayout = (
  props: PropsWithChildren<{ showLogin: boolean; setShowLoading }>
) => {
  const { showLogin, setShowLoading } = props;
  return (
    <div
      className={`w-full ${
        showLogin ? "h-screen sm:h-screen" : "h-auto sm:h-auto"
      }  bg-[#283747] flex flex-col justify-center items-center overflow-hidden`}
    >
      <Navbar setShowLoading={setShowLoading} />
      <div
        className={`bg-[#283747] w-full ${
          showLogin ? "h-[95%]" : "h-full"
        } max-w-[1920px]`}
      >
        <div className="w-full h-full flex flex-col gap-3 px-2 py-2 bg-[#283747]">
          {props.children}
        </div>
      </div>
    </div>
  );
};
