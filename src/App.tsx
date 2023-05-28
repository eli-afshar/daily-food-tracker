import { useState } from "react";
import { LoginForm } from "./containers/loginPage/LoginForm";
import { MainForm } from "./containers/mainPage/MainForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
