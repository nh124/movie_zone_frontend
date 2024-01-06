import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStart, setEnd } from "../Redux/GridSizeIndexReducer";
import { setLength } from "../Redux/GridSizeReducer";
const GridResize = () => {
  const dispatch = useDispatch();
  const { end } = useSelector((state) => state.GridSizeIndex);
  const { currentTab } = useSelector((state) => state.MovieStatusTab);
  const { length } = useSelector((state) => state.GridSize);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) dispatch(setLength(6));
      if (window.innerWidth < 1000 && window.innerWidth > 500)
        dispatch(setLength(6));
      if (window.innerWidth > 1000) dispatch(setLength(12));
      if (end === 0) dispatch(setEnd(length));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, currentTab, dispatch, end, length]);

  useEffect(() => {
    dispatch(setStart(0));
    dispatch(setEnd(length));
  }, [window.innerWidth, dispatch, length]);
  return null;
};

export default GridResize;
