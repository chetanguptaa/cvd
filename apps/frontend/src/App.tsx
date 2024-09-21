import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import { Suspense } from "react";
import LandingPage from "./pages/landing/landing";
import MainLoader from "./components/ui/loader";
import RacePage from "./pages/app/race/race";
import Header from "./components/header";

function App() {
  return (
    <Suspense fallback={<MainLoader />}>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Routes>
      <div className="container py-2 h-fit md:py-18 grow">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/race" element={<RacePage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
