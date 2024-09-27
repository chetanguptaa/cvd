import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import { Suspense } from "react";
import LandingPage from "./pages/landing/landing";
import MainLoader from "./components/ui/loader";
import RacePage from "./pages/app/race/race";
import Header from "./components/header";
import RacePractice from "./pages/app/race/practice/practice";

function App() {
  return (
    <Suspense fallback={<MainLoader />}>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
      <div className="container h-fit">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/race" element={<RacePage />} />
          <Route path="/race/practice" element={<RacePractice />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
