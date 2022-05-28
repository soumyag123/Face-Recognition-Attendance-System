import React from "react";
import styled from "styled-components";

// setting up welcome screen for chat user when no chat is selected

const Welcome = ({ user, currentUser }) => {
  return (
    <Container>
      <h2>
        Welcome,
        <span>
          {user === "faculty"
            ? currentUser.firstname + " " + currentUser.lastname
            : currentUser.name}
          !
        </span>
      </h2>
      <h4>Please select a chat to start messaging</h4>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Welcome;
