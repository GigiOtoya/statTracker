import React from "react";
import "./App.css";
import { Field } from "./components/Field";
import { SquadBuilder } from "./components/SquadBuilder";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="dashboard">
        <div className="left">
          <SquadBuilder />
        </div>
        <div className="right">
          <Field />
        </div>
      </div>
    </div>
  );
}

export default App;
