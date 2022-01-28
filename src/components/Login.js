import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const emailRef = React.useRef();
  const passowrdRef = React.useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await login(emailRef.current.value, passowrdRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
      setLoading(false);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeigth: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="w-100 text-center mt-2">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passowrdRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
          </Card.Body>

          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/sigup">Sig up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
