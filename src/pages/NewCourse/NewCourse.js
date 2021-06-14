import React, { useContext, useState } from "react";
import { addCourse } from "../../stateHandling/utils/serverRequests";
import { AuthContext } from "../../stateHandling/contexts/AuthContext";
import "./NewCourse.scss";

export function NewCourse() {
  const { user } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    courseName: "",
    price: 0,
    description: "",
    category: "",
    discount: 0,
    course_duration: 0,
    level: "",
  });

  const imageType = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    const token = user.user.token;
    console.log(token);
    addCourse(formData, file, token);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && imageType.includes(selectedFile.type)) {
      setFile(selectedFile);
    }
    console.log(file);
  };

  return (
    <div className="newCourse">
      <div className="newCourse__header">
        <h3>Add New Course</h3>
      </div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Give a price..."
          />
        </div>
        <div>
          <div className="newCourse__label">Course Thumbnail</div>
          <input name="thumbnail" onChange={handleFileChange} type="file" />
        </div>
        <div>
          <div className="newCourse__label">Course description</div>
          <input
            className="newCourse__input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Give description..."
          />
        </div>
        <div>
          <div className="newCourse__label">Course Category</div>
          <input
            className="newCourse__input"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Give category..."
          />
        </div>
        <div>
          <div className="newCourse__label">Course duration</div>
          <input
            className="newCourse__input"
            type="number"
            name="course_duration"
            value={formData.course_duration}
            onChange={handleChange}
            placeholder="Give duration..."
          />
        </div>
        <div>
          <div className="newCourse__label">Course level</div>
          <input
            className="newCourse__input"
            type="text"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="Give level..."
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
