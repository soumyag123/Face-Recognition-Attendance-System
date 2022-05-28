import React, { useEffect, useRef, useState } from "react";
import * as FaIcons from "react-icons/fa";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ user, currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMsg, setArrivalMsg] = useState(null);
  const scrollRef = useRef();

  // fetching messages from backend
  useEffect(() => {
    if (currentChat) {
      const getMessage = async () => {
        if (user === "faculty") {
          const resp = await fetch("/getFacultyMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: currentUser._id,
              to: currentChat._id,
            }),
          });
          const data = await resp.json();
          setMessages(data);
        } else {
          const resp = await fetch("/getStudentMessage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: currentUser._id,
              to: currentChat._id,
            }),
          });
          const data = await resp.json();
          setMessages(data);
        }
      };
      getMessage();
    }
  }, [currentChat]); // eslint-disable-line react-hooks/exhaustive-deps

  // handling send chat from one user to another
  const handleSendMsg = async (msg) => {
    if (user === "faculty") {
      await fetch("/addFacultyMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        }),
      });
    } else {
      await fetch("/addStudentMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: currentUser._id,
          to: currentChat._id,
          message: msg,
        }),
      });
    }

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMsg({ fromSelf: false, message: msg });
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    arrivalMsg && setMessages((prev) => [...prev, arrivalMsg]);
  }, [arrivalMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat !== undefined && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="img">
                <FaIcons.FaUserAlt />
              </div>
              <div className="username">
                <h4>
                  {user === "faculty"
                    ? currentChat.name
                    : currentChat.firstname + " " + currentChat.lastname}
                </h4>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                    ref={scrollRef}
                    key={uuidv4()}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  overflow: hidden;

  .chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .img {
        height: 2rem;
      }
      h4 {
        font-weight: 600;
      }
    }
  }

  .chat-messages {
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #123b3d;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;

      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
        padding-bottom: 0rem;
      }
    }
    .sended {
      justify-content: flex-end;

      .content {
        background-color: #123b3d;
      }
    }
    .received {
      justify-content: flex-start;

      .content {
        background-color: #123b3d;
      }
    }
  }
`;

export default ChatContainer;
