/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
 This feature is not a part of assignment 3. It is built for the project.
========================================================= */
import React, { useEffect, useState } from "react";
import { CourseUpsertModel } from "../Models/AdminCourseUpsertModel";
import { DeleteModal } from "../Models/AdminDeleteModel";
import HttpClient from "../services/AdminHttpClient";
import "../assets/css/AdminCourse.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    state: false,
    data: {},
  });
  const [editModal, setEditModal] = useState({
    state: false,
    action: "view",
    data: {
      courseName: "",
      authorName: "",
      courseDescription: "",
      coursePrice: 0,
      courseImageUri: "",
    },
  });

  useEffect(() => {
    async function fetchCourses() {
      const res = await HttpClient.get("course");
      setCourses(res.data);
    }
    fetchCourses();
  }, []);

  const handleCardAction = (action, id) => {
    const courseUnderAction = courses.find((_) => _.id === id);
    switch (action) {
      case "delete":
        setDeleteModal({
          state: true,
          data: {
            id: id,
          },
        });
        break;
      case "view":
        setEditModal({ action: "view", state: true, data: courseUnderAction });
        break;
      case "edit":
        setEditModal({ action: "edit", state: true, data: courseUnderAction });
        break;
      default:
        break;
    }
  };

  const handleDeleteModalClose = async (isConfirmed) => {
    if (isConfirmed) {
      const response = await HttpClient.remove(`course/${deleteModal.data.id}`);
      if (response.status === 200) {
        setCourses(courses.filter((item) => item.id !== deleteModal.data.id));
      }
    }
    setDeleteModal({
      state: false,
      data: {},
    });
  };

  const handleEditModalClose = async (data) => {
    if (data) {
      if (editModal.action === "create") {
        const addedCourseResponse = await HttpClient.post("course", data);
        if (addedCourseResponse.status === "200") {
          const updatedCourses = { ...courses };
          updatedCourses.push(addedCourseResponse.data);
          setCourses(updatedCourses);
        }
      } else if (editModal.action === "edit") {
      }
    }

    setEditModal({
      state: false,
      action: "view",
      data: {
        courseName: "",
        authorName: "",
        courseDescription: "",
        coursePrice: 0,
        courseImageUri: "",
      },
    });
  };

  const courseCards = courses.map((item) => {
    return (
      <CourseCard data={item} key={item.id} actionHandler={handleCardAction} />
    );
  });

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal.state}
        handleClose={handleDeleteModalClose}
      />
      <CourseUpsertModel
        action={editModal.action}
        show={editModal.state}
        handleClose={(data) => handleEditModalClose(data)}
        data={editModal.data}
      />
      <section className="courses">
        <section className="course-header">
          <h3>Existing courses</h3>
          <input
            type="text"
            placeholder="Search by course name"
            className="search-course"
          />
          <button
            className="add-course"
            onClick={() =>
              setEditModal({ action: "create", state: true, data: {} })
            }
          >
            <span className="material-icons">add_circle_outline</span>
            Add course
          </button>
        </section>
        <section className="course-cards">{courseCards}</section>
      </section>
    </React.Fragment>
  );
}

export default Course;

function CourseCard({ data, actionHandler }) {
  return (
    <section className="admin-card">
      <section className="card-image">
        <img src={data.imageUri} alt={data.courseName} />
      </section>
      <section className="card-name">{data.courseName}</section>
      <section className="card-author-name">{data.authorName}</section>
      <section className="card-footer">
        <section className="card-price">$ {data.coursePrice}</section>
        <section className="card-actions">
          <span
            className="material-icons icon"
            onClick={() => actionHandler("view", data.id)}
          >
            visibility
          </span>
          <span
            className="material-icons icon"
            onClick={() => actionHandler("edit", data.id)}
          >
            edit
          </span>
          <span
            className="material-icons icon"
            onClick={() => actionHandler("delete", data.id)}
          >
            delete
          </span>
        </section>
      </section>
    </section>
  );
}
