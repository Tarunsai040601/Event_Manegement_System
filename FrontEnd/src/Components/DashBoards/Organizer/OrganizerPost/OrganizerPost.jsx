import React, { useEffect, useState } from "react";
import "./OrganizerPost.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";

const OrganizerPost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.event;

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    venu: "",
    seatlimit: "",
    date: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  //  LOAD DATA FOR EDIT
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData.title || "",
        desc: editData.desc || "",
        category: editData.category || "",
        venu: editData.venu || "",
        seatlimit: editData.seatlimit || "",
        date: editData.date || "",
        price: editData.price || "",
      });

      setPreview(editData.image || "");
    }
  }, [editData]);

  //  TEXT INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  IMAGE HANDLER
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  //  SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const data = new FormData();

      data.append("title", formData.title);
      data.append("desc", formData.desc);
      data.append("category", formData.category);
      data.append("venu", formData.venu);
      data.append("seatlimit", formData.seatlimit);
      data.append("date", formData.date);
      data.append("price", formData.price);

      //  image optional (update lo only if new image selected)
      if (image) {
        data.append("image", image);
      }

      //  UPDATE API
      if (editData) {
        await axios.patch(
          `https://event-manegement-system-1.onrender.com/organizerPost/update/${editData._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Updated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      //  CREATE API
      else {
        await axios.post(
          "https://event-manegement-system-1.onrender.com/organizerPost/post",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        Swal.fire({
          icon: "success",
          title: "Event Uploaded Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      navigate("/organizer/showevents");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
      });
    }
  };

  return (
    <div className="post-container">
      <form className="post-form" onSubmit={handleSubmit}>
        <h1>{editData ? "Update Event" : "Upload Event"}</h1>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="venu"
          placeholder="Venue"
          value={formData.venu}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="seatlimit"
          placeholder="Seat Limit"
          value={formData.seatlimit}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/*  IMAGE UPLOAD */}
        <input type="file" accept="image/*" onChange={handleImage} />

        {/*  PREVIEW */}
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button type="submit">
          {editData ? "Update Event" : "Submit Event"}
        </button>
      </form>
    </div>
  );
};

export default OrganizerPost;