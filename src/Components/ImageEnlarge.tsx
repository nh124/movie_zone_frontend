import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
const ImageEnlarge = ({
  SelectedImageArray,
  showImages,
  setShowImages,
  setSelectedImageArray,
}: {
  SelectedImageArray: any;
  showImages: boolean;
  setShowImages: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImageArray: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(500);
  // console.log(width);
  const onClick = (type: string) => {
    if (index <= 0 && type === "backward") return;
    if (index >= SelectedImageArray.length - 1 && type === "forward") return;
    if (type === "forward") setIndex(index + 1);
    if (type === "backward") setIndex(index - 1);
  };

  const close = () => {
    setSelectedImageArray([]);
    setShowImages(false);
    setIndex(0);
  };

  useEffect(() => {
    const handleResize = () => {
      if (
        SelectedImageArray[index]?.width > SelectedImageArray[index]?.height
      ) {
        setWidth(window.innerWidth * 0.65);
      } else {
        if (window.innerWidth <= 980) setWidth(window.innerWidth);
        if (window.innerWidth > 980 && window.innerWidth <= 1280)
          setWidth(window.innerWidth * 0.7);
        if (window.innerWidth > 1280 && window.innerWidth <= 1700)
          setWidth(window.innerWidth * 0.5);
        if (window.innerWidth > 1780 && window.innerWidth <= 2100)
          setWidth(window.innerWidth * 0.4);
        if (window.innerWidth > 2180 && window.innerWidth <= 3000)
          setWidth(window.innerWidth * 0.3);
        if (window.innerWidth > 3080) setWidth(window.innerWidth * 0.25);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [SelectedImageArray, index]);

  return (
    <div
      className={`w-full h-[100vh] bg-[#283747]  top-0 left-0 animate-fadeAnimation z-30 flex justify-center items-center ${
        showImages ? "absolute" : "hidden"
      }`}
    >
      <button
        className="absolute right-2 top-2 p-2 bg-gray-700 hover:scale-105 duration-300 z-10"
        onClick={() => close()}
      >
        <IoMdClose size="20" color="white" />
      </button>
      <div className="w-full aspect-video flex justify-center items-center gap-3">
        <button className="px-1 relative" onClick={() => onClick("backward")}>
          <MdOutlineArrowBackIos color="white" size={40} />
        </button>

        <div
          className="overflow-hidden animate-slideAnimation"
          style={{
            width: `${width}px`,
            height: `${width / SelectedImageArray[index]?.aspect_ratio}`,
          }}
        >
          <img
            src={SelectedImageArray[index]?.file_path}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <button className="px-1" onClick={() => onClick("forward")}>
          <MdOutlineArrowForwardIos color="white" size={40} />
        </button>
      </div>
      {/*  */}
    </div>
  );
};

export default ImageEnlarge;
