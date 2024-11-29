import React, { useEffect, useState } from "react";
import RoutesArray from "./routing/RoutingPaths";
import "../src/App.scss";
import { FormProvider } from "./context/FormContext";
import Notifications from "./components/CommonModules/Popup/Notifications";

function App() {
  const [token, setToken] = useState(true);
  useEffect(() => {
    setToken(localStorage.getItem("items"));
  }, [token]);
  return (
    <>
      <div className="App">
        <FormProvider>
          <RoutesArray />
          <Notifications />
        </FormProvider>
      </div>
    </>
  );
}

export default App;
