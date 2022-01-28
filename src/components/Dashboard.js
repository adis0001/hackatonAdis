import React, { useContext, useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";

import { Link, navaigate, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Dashborad = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navaigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navaigate("/");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="w-100 text-center mt-2">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Link
            to="/update-profile"
            className="btn btn-primary w-100 
          mt-3"
          >
            Update Profile
          </Link>
          <strong>Email:</strong>
          {currentUser.email}
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashborad;
