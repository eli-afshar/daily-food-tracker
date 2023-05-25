import "./App.css";
import Login from "./containers/loginPage/Login";

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
      <Login />
    </>
  );
}

export default App;
