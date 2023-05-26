import "./App.css";
import { LoginForm } from "./containers/loginPage/LoginForm";

function App() {
  const isLoggedIn = false;
  return isLoggedIn ? (
    <div className="App">
      <header className="App-header">
        <p>hello world.</p>
      </header>
    </div>
  ) : (
    <>
      <LoginForm />
    </>
  );
}

export default App;
