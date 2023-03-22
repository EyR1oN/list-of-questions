import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import axios from "axios";

function Questionnaire() {
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState({});
  const [finished, setFinished] = useState(false);

  // Fetch questionnaire data from backend API
  useEffect(() => {
    async function fetchQuestionnaire() {
      const response = await axios.get(
        `https://localhost:44326/api/questionnaire/getbyid/${id}`
      );
      setQuestionnaire(response.data);
    }
    fetchQuestionnaire();
  }, [id]);

  // Handle user's answer choice selection
  function handleAnswerSelection(answerId) {
    setSelectedAnswerIds({
      ...selectedAnswerIds,
      [currentQuestionIndex]: answerId,
    });
  }

  // Handle moving to the next question
  function handleNextQuestion() {
    if (currentQuestionIndex + 1 < questionnaire?.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setFinished(true);
    }
  }

  // Handle finishing the questionnaire
  function handleFinish() {
    let score = 0;
    questionnaire?.questions.forEach((question, index) => {
      const selectedAnswerId = selectedAnswerIds[index];
      const correctAnswer = question?.answers.find(answer => answer.isCorrect);
  
      if (selectedAnswerId === correctAnswer.id) {
        score++;
      }
    });
  
    const percentage = (score / questionnaire.questions.length) * 100;
  
    alert(`Your total score: ${percentage}%`);
  }
  

  // Render the questionnaire page
  if (!questionnaire) {
    return <h1 className="mt-5 ms-5">Loading...</h1>;
  }

  const currentQuestion = questionnaire?.questions[currentQuestionIndex];

  return (
    <Container>
      <h1 className="mt-5 mb-3">{questionnaire?.title}</h1>
      <p className="mb-5">{questionnaire?.description}</p>
      <h3 className="mb-3">Question {currentQuestionIndex + 1}:</h3>
      <p className="mb-3">{currentQuestion?.text}</p>
      <Form>
        <ListGroup>
          {currentQuestion?.answers.map((answer) => (
            <ListGroup.Item key={answer.id} className="d-flex align-items-center">
              <Form.Check
                type="radio"
                name="answer"
                id={`answer-${answer.id}`}
                value={answer.id}
                checked={selectedAnswerIds[currentQuestionIndex] === answer.id}
                onChange={() => handleAnswerSelection(answer.id)}
                className="me-3"
              />
              <Form.Label className="mb-0">{answer.name}</Form.Label>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form>
      <Button
        className="mt-3"
        onClick={handleNextQuestion}
        disabled={!selectedAnswerIds[currentQuestionIndex]}
      >
        {currentQuestionIndex + 1 < questionnaire?.questions.length
          ? "Next Question"
          : "Finish"}
      </Button>
      {finished && (
        <Button
          className="mt-3 ms-3"
          variant="success"
          onClick={handleFinish}
        >
          Finish
        </Button>
      )}
    </Container>
  );
}

export default Questionnaire;
