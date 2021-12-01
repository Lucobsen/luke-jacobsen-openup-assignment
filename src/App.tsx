import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { ClientPage } from "./pages/client/client";
import { PsychologistPage } from "./pages/psychologist/psychologist";

/**
 * App routing is configured here.
 * @returns the app
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/client/:id" element={<ClientPage id="1" />}></Route>
        <Route path="/psychologist/:id" element={<PsychologistPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
