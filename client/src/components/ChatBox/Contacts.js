import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";

const Contacts = ({ user, contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    let name = "";
    if (user === "student") {
      name = currentUser.name;
    } else {
      name = currentUser.firstname + " " + currentUser.lastname;
    }
    setCurrentUserName(name);
    
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName !== "" && (
        <Container>
          <div className="heading">
            {user === "faculty" ? <h3>Students </h3> : <h3>Faculties</h3> }
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="username">
                    <p>
                      {user === "student"
                        ? contact.firstname + " " + contact.lastname
                        : contact.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="user-img">
              <FaIcons.FaUserAlt />
            </div>
            <div className="username">{currentUserName}</div>
          </div>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  background-color: #3b888b;

  .heading {
    background-color: #123b3d;
    display: flex;
    justify-content: center;
    align-items: center;

    h3 {
      color: white;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    overflow: auto;
    align-items: center;
    gap: 0.9rem;
    margin-top: 0.7rem;
    margin-bottom: 0.7rem;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #123b3d;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #123b3d;
      color: white;
      min-height: 3.5rem;
      border-radius: 0.7rem;
      cursor: pointer;
      padding: 0.4rem;
      gap: 1rem;
      width: 95%;
      display: flex;
      margin-bottom: 0.5rem;
      justify-content: center;
      align-items: center;
      transition: 0.3s ease-in-out;

      .username {
        font-size: 1.3rem;
      }
    }

    .selected {
      background-color: #156060;
    }
  }

  .current-user {
    background-color: #123b3d;
    display: flex;
    justify-content: center;
    align-items: center;

    .user-img {
      color: white;
      margin-right: 1rem;
    }
    .username {
      color: white;
      font-size: large;
      font-weight: 700;
    }
  }
`;

export default Contacts;
