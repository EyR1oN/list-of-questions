import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import StartQuestionnaireModal from "./Modal";

export default function QuestionnaireList() {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    async function fetchQuestionnaires() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(
        "https://localhost:44326/api/questionnaire/getall",
        { headers }
      );
      setQuestionnaires(response.data);
    }
    fetchQuestionnaires();
  }, []);
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="mb-4">Questionnaires</h1>
          <ul className="list-group">
            {questionnaires.map((questionnaire) => (
              <li className="list-group-item" key={questionnaire.id}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2>{questionnaire.title}</h2>
                    <p>{questionnaire.description}</p>
                  </div>
                  <StartQuestionnaireModal questionnaire={questionnaire}/>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
