import { useEffect, useState } from "react";
import { LoginForm } from "./containers/loginPage/LoginForm";
import { MainForm } from "./containers/mainPage/MainForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn ? (
    <>
      <MainForm />
    </>
  ) : (
    <>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </>
  );
}

export default App;
