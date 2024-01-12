import "./managerSignup.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../../public/images/avatar.jpeg";
import { useSignupManagerMutation } from "../../services/chatApi";
export default function ManagerPage() {
  const imageRef = useRef();
  const navigate = useNavigate();

  const [signupManager, { isLoading, error }] = useSignupManagerMutation();
  const [name, setHostelName] = useState("");
  const [hostelManaged, setHostelManaged] = useState("");
  const [contact, setContact] = useState("");
  const [hostelRegistrationNumber, setHostelNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleButtonClicked = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  async function cloudFetch() {
    const newFile = new FormData();
    newFile.append("file", image);
    newFile.append("upload_preset", "hostelManagerImage");
    try {
      setUploaded(true);
      const options = {
        body: newFile,
        method: "post"
      };
      let uploadFile = await fetch(
        "https://api.cloudinary.com/v1_1/nayy-1999/image/upload",
        options
      );

      let response = await uploadFile.json();
      setUploaded(false);
      console.log("the file", response.url);
      return response.url;
    } catch (error) {
      console.log("image not uploaded");
      setUploaded(false);
    }
  }
  const handleFileChanged = (event) => {
    event.preventDefault();
    const selectedImage = event.target.files[0];
    if (selectedImage.size >= 1048576) {
      alert("image is greater than 1mb");
    } else {
      const imageObject = URL.createObjectURL(selectedImage);
      setPreviewImage(imageObject);
      setImage(selectedImage);
    }
  };

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("please select an image");
    const url = await cloudFetch(image);
    console.log("image upload", url);
    signupManager({
      picture: url,
      name,
      hostelManaged,
      contact,
      hostelRegistrationNumber,
      password
    }).then((data) => {
      if (data) {
        console.log("sign up manager", data);
        navigate("/login/manager");
      }
    });
  }

  // const navigateManagerPage = (e) => {
  //   e.preventDefault();
  //   navigate("/signup/student");
  // };
  return (
    <>
      <div className="hostel-manager-container">
        <form className="form-container">
          <div className="profile-container">
            <img
              src={previewImage || avatar}
              className="default-img"
              alt="no-image"
            />
            <button
              htmlFor="image-upload"
              className="add-profile"
              onClick={handleButtonClicked}
            >
              +
            </button>
          </div>
          <input
            id="image-upload"
            type="file"
            hidden
            accept="image/png, image/jpeg, image/jpg"
            className="plus"
            ref={imageRef}
            onChange={handleFileChanged}
          />
          <label>
            <small>Hostel Manager Name</small>
            <input
              type="text"
              value={name}
              onChange={(e) => setHostelName(e.target.value)}
            />
          </label>

          <label>
            <small>Hostel Managed</small>
            <input
              type="text"
              value={hostelManaged}
              onChange={(e) => setHostelManaged(e.target.value)}
            />
          </label>

          <label>
            <small>Contact</small>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>

          <label>
            <small>Hostel Registration Number</small>
            <input
              type="text"
              value={hostelRegistrationNumber}
              onChange={(e) => setHostelNumber(e.target.value)}
            />
          </label>

          <label>
            <small>Password</small>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="submit" onClick={handleSignup}>
            Sign up
          </button>

          <div className="user-changes">
            <h4>change user</h4>
            {/* <select>
              <option></option>
              <option onClick={navigateManagerPage}>Student</option>
            </select> */}
            <Link to="/signup/student">Student</Link>
          </div>
        </form>
      </div>
    </>
  );
}
