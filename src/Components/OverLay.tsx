import React, { ReactNode } from "react";
type OverlayProps = {
  children: ReactNode;
};

const OverLay: React.FC<OverlayProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-black/50 flex justify-center items-center animate-fadeAnimation">
      {children}
    </div>
  );
};

export default OverLay;
