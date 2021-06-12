import React from "react";
import "./NewCourse.scss";

export function NewCourse() {
  return (
    <div className="newCourse">
      <div className="newCourse__header">
        <h3>Add New Course</h3>
      </div>
      <div>
        <div className="newCourse__label">Course Title</div>
        <input
          className="newCourse__input"
          type="text"
          placeholder="Give a title..."
        />
      </div>
      <div>
        <div className="newCourse__label">Course Description</div>
        <input
          className="newCourse__input"
          type="text"
          placeholder="Give a description..."
        />
      </div>
      <div>
        <div className="newCourse__label">Course Title</div>
        <textarea
          className="newCourse__input"
          type="text"
          placeholder="Give a title..."
        />
      </div>
    </div>
  );
}
