import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import { Suspense } from "react";
import LandingPage from "./pages/landing/landing";

function App() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
