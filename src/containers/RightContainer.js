import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "../assets/images";
import { AuthContext } from "../stateHandling/contexts/AuthContext";
import { StateContext } from "../stateHandling/contexts/StateContext";
import { fetchLastViewedCourse } from "../stateHandling/utils/serverRequests";
import { ChatRoom, ReceivedMessage, SentMessage } from "../components";
import { callFirestore, timestamp } from "../firebase";

export function RightContainer() {
  const { user } = useContext(AuthContext);
  console.log(user);

  const [lastViewedCourse, setLastViewedCourse] = useState(null);
  const [activeProfile, setActiveProfile] = useState(true);
  const [activeDiscussion, setActiveDiscussion] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [messageArray, setMessageArray] = useState([]);
  const [message, setMessage] = useState("");
  const [activeRoomsBox, setActiveRoomsBox] = useState(true);
  const [activeMessageBox, setActiveMessageBox] = useState(false);
  const [chatRoomName, setChatRoomName] = useState(null);

  const { dispatch } = useContext(StateContext);
  const { back, add } = images;

  useEffect(() => {
    if (user?.user.role === "student") {
      fetchLastViewedCourse(user, dispatch, setLastViewedCourse);
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (chatRoomId) {
      callFirestore
        .collection("rooms")
        .doc(chatRoomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessageArray(
            snapshot.docs.map((doc) => ({
              messageId: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatRoomId]);

  const handleProfile = () => {
    setActiveProfile(true);
    setActiveDiscussion(false);
  };

  const handleDiscussion = () => {
    setActiveDiscussion(true);
    setActiveProfile(false);
  };

  const createRoom = () => {
    let newRoom = window.prompt("Give Room Name: ");
    newRoom = newRoom && newRoom.trim();
    if (newRoom) {
      callFirestore.collection("rooms").add({
        roomName: newRoom,
        roomAdmin: user.user.email,
      });
    }
  };

  const submitMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      callFirestore
        .collection("rooms")
        .doc(chatRoomId)
        .collection("messages")
        .add({
          message: message,
          author: user.user.firstName,
          authorEmail: user.user.email,
          timestamp: timestamp(),
        });
    }
    setMessage("");
  };

  const goBack = () => {
    setActiveRoomsBox(true);
    setActiveMessageBox(false);
    setChatRoomId(null);
  };

  return (
    <div className="rightContainer">
      <div className="rightContainer__container">
        <div className="rightContainer__container-btns">
          <button onClick={handleProfile}>Profile</button>
          <button onClick={handleDiscussion}>Discussion</button>
        </div>
      </div>

      {/* ----------------- Profile Section --------------------- */}

      <div
        style={{ display: `${activeProfile ? "block" : "none"}` }}
        className="rightContainer__profile"
      >
        <div>
          <span style={{ fontWeight: "600" }}>About Me: </span>
          {user?.user.profileInfo.aboutMe}
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>Contact No.: </span>
          {user?.user.profileInfo.contactNo}
        </div>
        <div>
          <span style={{ fontWeight: "600" }}>Occupation: </span>
          {user?.user.profileInfo.occupation}
        </div>
      </div>

      {lastViewedCourse ? (
        <div
          style={{ display: `${activeProfile ? "block" : "none"}` }}
          className="rightContainer__lastViewed"
        >
          <div className="rightContainer__lastViewed-heading">Last Viewed</div>
          <Link
            to={`/details/${lastViewedCourse?._id}`}
            className="rightContainer__lastViewed-course"
          >
            <img
              className="rightContainer__lastViewed-course--img"
              src={`${lastViewedCourse?.thumbnail}`}
              alt="course-pic"
            />
            <div className="rightContainer__lastViewed-course--name">
              {lastViewedCourse?.courseName}
            </div>
          </Link>
        </div>
      ) : null}

      {/* --------------- Discussion Section ---------------- */}

      <div
        style={{ display: `${activeDiscussion ? "block" : "none"}` }}
        className="rightContainer__discussion"
      >
        <div className="rightContainer__discussion-header">
          <img
            style={{ display: `${activeRoomsBox ? "block" : "none"}` }}
            className="rightContainer__discussion-header--img"
            src={add.src}
            alt={add.alt}
            onClick={createRoom}
          />
          <div style={{ display: `${activeRoomsBox ? "block" : "none"}` }}>
            Create Room
          </div>
          <img
            style={{ display: `${activeMessageBox ? "block" : "none"}` }}
            className="rightContainer__discussion-header--img"
            src={back.src}
            alt={back.alt}
            onClick={goBack}
          />
          <div style={{ display: `${activeMessageBox ? "block" : "none"}` }}>
            {chatRoomName ? chatRoomName : "Room Name"}
          </div>
        </div>

        <div
          style={{ display: `${activeMessageBox ? "block" : "none"}` }}
          className="rightContainer__discussion-messageBox"
        >
          {messageArray.map((message) =>
            message.data.authorEmail === user?.user.email ? (
              <SentMessage key={message.id} messageData={message.data} />
            ) : (
              <ReceivedMessage key={message.id} messageData={message.data} />
            )
          )}
        </div>

        <div
          style={{ display: `${activeRoomsBox ? "block" : "none"}` }}
          className="rightContainer__discussion-chatsRoomBox"
        >
          <ChatRoom
            setChatRoomId={setChatRoomId}
            setChatRoomName={setChatRoomName}
            setActiveRoomsBox={setActiveRoomsBox}
            setActiveMessageBox={setActiveMessageBox}
          />
        </div>

        <div
          style={{ display: `${activeMessageBox ? "block" : "none"}` }}
          className="rightContainer__discussion-footer"
        >
          <form
            className="rightContainer__discussion-footer--form"
            onSubmit={submitMessage}
          >
            <input
              className="rightContainer__discussion-footer--input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type Message..."
            />
            <input style={{ display: "none" }} type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
