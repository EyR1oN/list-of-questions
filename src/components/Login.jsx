import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:44326/api/login/login", {
        username,
        password
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        navigate('/questionnairies', { replace: true });
      } else {
        alert(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-md-center">
      <h1 className="text-uppercase mb-5">Login to continue</h1>
          <Form onSubmit={handleSubmit} style={{width: '100%'}}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={handlePasswordChange} placeholder="Enter password" />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
            <Form.Group>
              <Form.Label className='mt-5' style={{color: 'red'}}>
                If seeding in your database is complete use next data:
                username: Username1;
                password: Password1;
              </Form.Label>
              <Form.Label style={{color: 'red'}}>
                If you didn`t seed the data, add user with Administrator role to DB
              </Form.Label>
            </Form.Group>
          </Form>
      </Row>
    </Container>
  );
}

export default Login;
