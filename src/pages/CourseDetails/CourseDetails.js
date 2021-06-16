import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import {
  getCourseById,
  uploadVideo,
} from "../../stateHandling/utils/serverRequests";
import "./CourseDetails.scss";

export function CourseDetails({ match }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [publicid, setPublicid] = useState(null);
  const [file, setFile] = useState(null);
  const [videoTitle, setVideoTitle] = useState("");
  const id = match.params.id;

  const { user } = useContext(AuthContext);

  useEffect(() => {
    // fetch(`http://localhost:5233/tut/course/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCourseDetails(data.data);
    //   })
    //   .catch((err) => console.log(err.message));
    getCourseById(id).then((data) => setCourseDetails(data));
  }, [id]);

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    const data = { videoTitle: videoTitle, file: file };
    uploadVideo(id, user?.user.token, data);
  };

  return (
    <div className="details">
      <div className="details__title">
        <div>
          <h2>{courseDetails?.courseName}</h2>
          <small>{`${courseDetails?.authorName.firstName} ${courseDetails?.authorName.lastName}`}</small>
        </div>
      </div>
      <div className="details__content">
        <div className="details__content-left">
          <div className="details__content-left--video">
            <iframe
              className="iframe"
              style={{
                width: "100%",
                height: "100%",
              }}
              title="demo"
              src={
                publicid
                  ? `https://player.cloudinary.com/embed/?cloud_name=cloudversity&public_id=tutor%20resources/${publicid}&fluid=true&controls=true&source_types%5B0%5D=mp4`
                  : null
              }
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
          <div className="details__content-left--info">
            <h4
              style={{
                margin: ".5rem",
                paddingBottom: ".5rem",
                borderBottom: "1px solid #000",
              }}
            >
              About
            </h4>
            <p style={{ margin: ".5rem", fontSize: "1.4rem" }}>
              {courseDetails?.description}
            </p>
          </div>
        </div>
        <div className="details__content-right">
          <form onSubmit={handleVideoSubmit}>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Enter title"
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <input type="submit" />
          </form>
          <div className="details__content-right--videos">
            <h4>Contents</h4>
            {courseDetails &&
              courseDetails.videos.map((video) => (
                <div
                  key={video._id}
                  className="video"
                  onClick={() => setPublicid(video.publicId)}
                >
                  <small>{video.title}</small>
                  <small>05:10</small>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
