import React from "react";
import Routes from "routes/index";
import { StateProvider } from "context/StateContext";
const App = () => {
  return (
    <div>
      <StateProvider>
        <Routes />
      </StateProvider>
    </div>
  );
};

export default App;
