import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";
import { Suspense } from "react";
import LandingPage from "./pages/landing/landing";
import MainLoader from "./components/ui/loader";
import { useRecoilValueLoadable } from "recoil";
import userAtom from "./store/atoms/userAtom";
import Dashboard from "./pages/app/dashboard";
import guestAtom from "./store/atoms/guestAtom";

function App() {
  const user = useRecoilValueLoadable(userAtom);
  const guest = useRecoilValueLoadable(guestAtom);
  console.log(user.valueMaybe());
  console.log(guest.valueMaybe());

  return (
    <Suspense fallback={<MainLoader />}>
      <Routes>
        <Route path="/auth/signin" element={<SigninPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            user.valueMaybe() || guest.valueMaybe() ?
              <Dashboard />
            : <LandingPage />
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;
