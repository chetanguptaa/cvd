import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/auth/signin";
import SignupPage from "./pages/auth/signup";

function App() {
  return (
    <Routes>
      <Route path="/auth/signin" element={<SigninPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
