import React from "react";
import { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
// import Login from "./Login";

const Sigup = () => {
  const emailRef = React.useRef(null);
  const passowrdRef = React.useRef(null);
  const passwordConfirmRef = React.useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passowrdRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);

      await signup(emailRef.current.value, passowrdRef.current.value);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to create an account");
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="w-100 text-center mt-2">Sign up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have you account ? <Link to="/login">Log In</Link>
      </div>
    </>
  );
};

export default Sigup;
