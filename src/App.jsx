import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Questionnaire from "./components/Questionnaire";
import QuestionnaireList from "./components/QuestionnaireList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/questionnairies" exact element={<QuestionnaireList />} />
        <Route path="/questionnaires/:id" element={<Questionnaire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
