import React, { useEffect, useState } from "react";
import { getCourseById } from "../../stateHandling/utils/serverRequests";
import "./CourseDetails.scss";

export function CourseDetails({ match }) {
  const [courseDetails, setCourseDetails] = useState(null);
  const [publicid, setPublicid] = useState(null);
  const id = match.params.id;

  useEffect(() => {
    // fetch(`http://localhost:5233/tut/course/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCourseDetails(data.data);
    //   })
    //   .catch((err) => console.log(err.message));
    getCourseById(id).then((data) => setCourseDetails(data));
  }, [id]);

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
              src={`https://player.cloudinary.com/embed/?cloud_name=cloudversity&public_id=nrow1mqjw9ezkhhim7nb&fluid=true&controls=true&source_types%5B0%5D=mp4`}
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
