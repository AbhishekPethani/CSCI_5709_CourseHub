/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
 This feature is not a part of assignment 3. It is built for the project.
========================================================= */
import { useEffect, useState } from "react";
import { Modal } from "../components/Admin/AdminModel";
import { Validation } from "../components/Admin/AdminValidation";
import "../assets/css/AdminCourseUpsertModel.css";

export const CourseUpsertModel = ({ handleClose, show, data, action }) => {
  const [errorMessages, setErrorMessage] = useState({
    courseName: [],
  });
  const [course, setCourse] = useState(data);

  useEffect(() => {
    setCourse(data);
    setErrorMessage({
      courseName: [],
    });
  }, [data, show]);

  const validateCourseName = (value) => {
    const state = { ...errorMessages };
    state.courseName = [];
    let isValid = true;

    if (!value.trim()) {
      state.courseName.push("Course name cannot be empty");
      isValid = false;
    }

    setErrorMessage(state);
    return isValid;
  };

  const onCourseNameChange = (value) => {
    validateCourseName(value);
    onInputChange(value, "courseName");
  };

  const onInputChange = (value, property) => {
    const modifiedCourse = { ...course };
    modifiedCourse[property] = value;
    setCourse(modifiedCourse);
  };

  const getHeaderTitle = () => {
    let title = "";
    switch (action) {
      case "view":
        title = "View";
        break;
      case "create":
        title = "Add";
        break;
      case "edit":
        title = "Edit";
        break;
      default:
        title = "View";
    }

    return `${title} course`;
  };

  const handleFormClose = () => {
    if (validateCourseName(course.courseName)) {
      handleClose(course);
    }
  };

  const footer = action !== "view" && (
    <div>
      <button
        value="false"
        className="secondary-button button"
        onClick={() => handleClose(false)}
      >
        Cancel
      </button>
      <button
        value="true"
        className="primary-button button"
        onClick={() => handleFormClose()}
      >
        {getHeaderTitle()}
      </button>
    </div>
  );

  const body = (
    <section className="editCourseModalBody">
      <div className="group">
        <label>Image</label>
        <input type="file" name="image" />
      </div>
      <div className="group">
        <label>Course name</label>
        <input
          type="text"
          name="courseName"
          value={course.courseName || ""}
          onChange={($event) => onCourseNameChange($event.target.value)}
        />
        <Validation messages={errorMessages.courseName}></Validation>
      </div>
      <div className="group">
        <label>Author name</label>
        <input
          type="text"
          name="authorName"
          value={course.authorName || ""}
          onChange={($event) =>
            onInputChange($event.target.value, "authorName")
          }
        />
      </div>
      <div className="group">
        <label>Price</label>
        <input
          type="number"
          min="0"
          name="coursePrice"
          value={course.coursePrice || 0}
          onChange={($event) =>
            onInputChange($event.target.value, "coursePrice")
          }
        />
      </div>
      <div className="group">
        <label>Description</label>
        <textarea
          name="courseDescription"
          value={course.courseDescription || ""}
          onChange={($event) =>
            onInputChange($event.target.value, "courseDescription")
          }
        />
      </div>
    </section>
  );

  const content = {
    headerContent: getHeaderTitle(),
    bodyContent: body,
    footerContent: footer,
    modalType: "edit",
  };

  return <Modal content={content} show={show} handleClose={handleClose} />;
};
