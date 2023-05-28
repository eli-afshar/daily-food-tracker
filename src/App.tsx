import "./App.css";
import { LoginForm } from "./containers/loginPage/LoginForm";
import { MainForm } from "./containers/mainPage/MainForm";

function App() {
  const isLoggedIn = false;
  return isLoggedIn ? (
    <>
      <LoginForm />
    </>
  ) : (
    <>
      <MainForm />
    </>
  );
}

export default App;
