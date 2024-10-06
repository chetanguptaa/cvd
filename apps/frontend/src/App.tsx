import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import { Suspense } from "react";
import LandingPage from "./pages/landing/landing";
import MainLoader from "./components/ui/loader";
import RacePage from "./pages/app/race/race";
import RoomRacePage from "./pages/app/race/room-race/room-race";

function App() {
  return (
    <Suspense fallback={<MainLoader />}>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/race/room" element={<RoomRacePage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/race" element={<RacePage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
