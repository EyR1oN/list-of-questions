import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function StartQuestionnaireModal({ questionnaire }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [agree, setAgree] = useState(false);

  const handleAgreeChange = (event) => {
    setAgree(event.target.checked);
  };

  const handleStart = () => {
    if (agree) {
      handleClose();
      navigate(`/questionnaires/${questionnaire.id}`, { replace: true });
    }
  };

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Start Questionnaire
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{questionnaire.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{questionnaire.description}</p>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agree-checkbox"
              checked={agree}
              onChange={handleAgreeChange}
            />
            <label className="form-check-label" htmlFor="agree-checkbox">
              I agree to start this questionnaire
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleStart} disabled={!agree}>
            Start
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
