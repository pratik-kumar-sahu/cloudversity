import React, { useState } from "react";
import { addCourse } from "../../stateHandling/utils/serverRequests";
import "./NewCourse.scss";

export function NewCourse() {
  const [formData, setFormData] = useState({
    courseName: "",
    price: "",
    thumbnail: "",
    description: "",
    category: "",
    discount: "",
    course_duration: "",
    level: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    addCourse(formData);
  };

  return (
    <div className="newCourse">
      <div className="newCourse__header">
        <h3>Add New Course</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="newCourse__label">Course Title</div>
          <input
            className="newCourse__input"
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Give a title..."
          />
        </div>
        <div>
          <div className="newCourse__label">Course Price</div>
          <input
            className="newCourse__input"
            type="text"
            name="description"
            value={formData.price}
            onChange={handleChange}
            placeholder="Give a description..."
          />
        </div>
        <div>
          <div className="newCourse__label">Course Thumbnail</div>
          <input
            value={formData.thumbnail}
            onChange={handleChange}
            type="file"
          />
        </div>
        <div>
          <div className="newCourse__label">Course Title</div>
          <input value="thumbnail" onChange={handleChange} type="file" />
        </div>
      </form>
    </div>
  );
}
