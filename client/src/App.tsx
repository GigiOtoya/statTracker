import React from "react";
import "./App.css";
import { Field } from "./components/Field";
import { SquadBuilder } from "./components/SquadBuilder";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <SquadBuilder />
    </div>
  );
}

export default App;
