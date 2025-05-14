import Header from "components/Header";
import React from "react";
import ChatStyled from "./Chat.styled";

import chat from "../../assets/img/chat.svg";
import pic from "../../assets/img/person.png";
import enter from "../../assets/img/enter.svg";

const Chat = () => {
  const chatType = ["ACTIVE", "HISTORY"];
  const [chatLink, setChatLink] = React.useState("ACTIVE");

  const [activePerson, setActivePerson] = React.useState(-5);
  const [personInfo, setPersonInfo] = React.useState({});

  const persons = [
    {
      id: 1,
      name: "Karl Louis ",
      pic: pic,
      msg: "IPhone 14, 256 GB, Black xRay ay.. ",
    },
    {
      id: 2,
      name: "Karlosda Louisdsadsa  ",
      pic: pic,
      msg: "Toyota Camry 50, 2.5L, Docker.. ",
    },
    {
      id: 3,
      name: "Karlosda Louisdsadsa  ",
      pic: pic,
      msg: "A8 ",
    },
  ];

  return (
    <ChatStyled>
      <Header activePage="chat" />

      {true ? (
        <div className="empty">
          <img src={chat} alt="" />
          <p>You don't have dialogues with other people yet</p>
        </div>
      ) : (
        <div className="chat">
          <div className="chat-users">
            <div className="chat-type">
              <ul>
                {chatType.map((type) => (
                  <li
                    key={type}
                    className={`${chatLink == type ? "active" : ""}`}
                    onClick={() => {
                      setChatLink(type);
                    }}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            </div>
            <div className="persons">
              {persons.map((person, i) => (
                <div
                  key={person.id}
                  className={`person ${activePerson == i ? "active" : ""}`}
                  onClick={() => {
                    activePerson == i
                      ? setActivePerson(-1)
                      : setActivePerson(i);

                    setPersonInfo({
                      img: person.pic,
                      name: person.name,
                    });
                  }}
                >
                  <img src={person.pic} alt="persons pic" />
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="chat-info">
            <div className="companion">
              {Object.keys(personInfo).length == 0 ? (
                ""
              ) : (
                <div className="">
                  <img src={personInfo.img} alt="persons pic" />
                  <div>
                    <p>{personInfo.name}</p>
                    <p>{personInfo.name}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="correspondence">
              <div className="companion-message">
                <ul>
                  <li>
                    <div>Hello, how are you?</div>
                    <p>12:50</p>
                  </li>
                  <li>
                    <div>
                      OK. You can deliver to this address - Benedict 35/1, 9
                      floor
                    </div>
                    <p>12:50</p>
                  </li>
                </ul>
              </div>
              <div className="user-message">
                <ul>
                  <li>
                    <p>12:52</p>
                    <div>
                      OK. You can deliver to this address - Benedict 35/1, 9
                      floor
                    </div>
                  </li>
                </ul>
              </div>
              <div className="companion-message">
                <ul>
                  <li>
                    <div>Hello, how are you?</div>
                    <p>12:50</p>
                  </li>
                  <li>
                    <div>
                      OK. You can deliver to this address - Benedict 35/1, 9
                      floor
                    </div>
                    <p>12:50</p>
                  </li>
                </ul>
              </div>
              <div className="user-message">
                <ul>
                  <li>
                    <p>12:52</p>
                    <div>
                      OK. You can deliver to this address - Benedict 35/1, 9
                      floor
                    </div>
                  </li>
                </ul>
              </div>
              <div className="message-history">Today</div>

              <div className="user-message">
                <ul>
                  <li>
                    <p>12:35</p>
                    <div>Hello Karlosda</div>
                  </li>
                  <li>
                    <p>12:38</p>
                    <div>
                      I am writing to you about the exchange of goods, you
                      wanted to exchange your iPhone 13 for mine Apple Watch 2
                      series.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="companion-message">
                <ul>
                  <li>
                    <div>Hello, how are you?</div>
                    <p>12:50</p>
                  </li>
                  <li>
                    <div>
                      OK. You can deliver to this address - Benedict 35/1, 9
                      floor
                    </div>
                    <p>12:50</p>
                  </li>
                </ul>
              </div>
              <div className="user-message">
                <ul>
                  <li>
                    <p>12:52</p>
                    <div>
                      OK. You can deliver to this address - Benedict 35/1, 9
                      floor
                    </div>
                  </li>
                </ul>
              </div>

              <div className="correspondence-input">
                <input type="text" placeholder="Message"></input>
                <div>
                  <img src={enter} alt="Enter message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ChatStyled>
  );
};

export default Chat;
