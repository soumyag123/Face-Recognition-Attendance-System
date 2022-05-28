import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");

  // handling typing and sending of messages
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  align-items: center;
  padding: 0rem 0.6rem;
  padding-bottom: 0.2rem;

  .input-container {
    width: 100%;
    height: 3rem;
    border-radius: 2rem;
    display: flex;
    background-color: #123b3d;
    align-items: center;
    gap: 1rem;

    input {
      width: 90%;
      height: 3rem;
      background-color: transparent;
      border: none;
      color: white;
      padding-left: 1rem;

      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 1rem;
      border: none;
      background: #123b3d;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 1.8rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;
