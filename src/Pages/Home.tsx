import { PageLayout } from "../Components/pageLayout";
import SplashImage from "../Components/SplashImage";
import GridResize from "../Hooks/gridResize";
import { useSelector } from "react-redux";
import MovieTab from "../Components/MovieTab";
import UpdatePage from "../Components/UpdatePage";
import GridLayout from "../Components/GridLayout";
import UserLogin from "../Components/UserLogin";
import { useState } from "react";
import Footer from "../Components/Footer";
const Home = () => {
  const { currentTab } = useSelector((state: any) => state.MovieStatusTab);
  const { start, end } = useSelector((state: any) => state.GridSizeIndex);
  const [showLogin, setShowLoading] = useState(false);

  return (
    <PageLayout showLogin={showLogin}>
      <UserLogin showLogin={showLogin} setShowLoading={setShowLoading} />
      <SplashImage />
      <GridResize />
      <div className="w-full md:w-[70%] h-fit flex sm:flex-row justify-between px-1 sm:px-4 text-white sm:py-5 py-1 flex-col gap-3">
        <span className="text-base sm:text-lg">Recently Updated</span>
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <MovieTab />
          <UpdatePage currentPage="Home" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full h-auto">
        <div className="w-full h-[1000px] sm:h-[1200px]">
          <GridLayout MovieList={currentTab} start={start} end={end} />
        </div>
        {/* <SidePanelHome /> */}
      </div>
      <Footer />
    </PageLayout>
  );
};

export default Home;
