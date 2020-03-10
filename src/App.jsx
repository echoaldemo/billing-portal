import React from "react";
import Routes from "routes/index";
import { StateProvider } from "context/StateContext";
const App = () => {
  return (
    <StateProvider>
      <Routes />
    </StateProvider>
  );
};

export default App;
