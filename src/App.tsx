import { useEffect, useState } from "react";
import { LoginForm } from "./containers/loginPage/LoginForm";
import { MainForm } from "./containers/mainPage/MainForm";
import { NavigationPanel } from "./components/NavigationPanel";
import { RecordForm } from "./containers/recordPage/RecordForm";

enum ActivePage {
  Main,
  Record,
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState(ActivePage.Main);

  const handleGoToRecords = () => {
    setActivePage(ActivePage.Record);
  };

  const handleGoToMain = () => {
    setActivePage(ActivePage.Main);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div>
          <div id="container" style={{ height: "100vh" }}>
            {activePage === ActivePage.Record ? (
              <div id="contentR" style={{ height: `calc(100vh - 80px)` }}>
                <RecordForm />
              </div>
            ) : (
              <div id="contentM" style={{ height: `calc(100vh - 60px)` }}>
                <MainForm />
              </div>
            )}
            <div>
              <NavigationPanel
                handleGoToRecords={handleGoToRecords}
                handleGoToMain={handleGoToMain}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        </>
      )}
    </>
  );
}

export default App;
