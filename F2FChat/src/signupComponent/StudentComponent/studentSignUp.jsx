import "./studentSignUp.css";
import avatar from "../../../public/images/avatar.jpeg";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupStudentMutation } from "../../services/chatApi";
import { useDispatch, useSelector } from "react-redux";
import { selectAllContacts } from "../../features/chatSlice";
export default function studentSignup() {
  const navigate = useNavigate();
  const [signupUser] = useSignupStudentMutation();
  const [name, setName] = useState("");
  const [index, setIndex] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const imageRef = useRef();

  const handleButtonClicked = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function cloudUploadImage() {
    const newFile = new FormData();
    newFile.append("file", image);
    newFile.append("upload_preset", "studentImage");
    try {
      setUploading(true);
      const options = {
        method: "post",
        body: newFile
      };

      let uploadedFile = await fetch(
        "https://api.cloudinary.com/v1_1/nayy-1999/image/upload",
        options
      );
      let imageResponse = await uploadedFile.json();
      setUploading(false);
      console.log("file uploaded", imageResponse.url);
      return imageResponse.url;
    } catch (error) {
      setUploading(false);
      console.log("image not uploaded");
    }
  }
  const handleFileChanged = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage.size >= 1048576) {
      alert("image is greater than 1mb");
    } else {
      const imageObject = URL.createObjectURL(selectedImage);
      setImagePreview(imageObject);
      setImage(selectedImage);
    }
  };

  async function onSubmit(e) {
    e.preventDefault();

    // if (!image) return alert("please select an image");
    const url = await cloudUploadImage(image);
    console.log("image uploaded", url);

    console.log("the name", name);
    await signupUser({
      name,
      picture: url,
      index,
      email,
      contact,
      password
    }).then((data) => {
      if (data) {
        console.log("sign up successfully", data);
        navigate("/login/student");
      }
    });
  }

  // const navigateManagerPage = (e) => {
  //   e.preventDefault();
  //   navigate("/signup/manager");
  // };
  return (
    <>
      <div className="hostel-manager-container">
        <form className="form-container">
          <input
            type="file"
            hidden
            accept="image/png, image/jpeg, image/jpg"
            className="plus"
            ref={imageRef}
            onChange={(e) => handleFileChanged(e)}
          />
          <div className="profile-container">
            <img
              src={imagePreview || avatar}
              className="default-img"
              alt="no-image"
            />
            <button className="add-profile" onClick={handleButtonClicked}>
              +
            </button>
          </div>

          <label>
            <small>student name</small>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            <small>student contact</small>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>

          <label>
            <small>student email</small>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <small>index</small>
            <input
              type="text"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            />
          </label>

          <label>
            <small>student password</small>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="submit" onClick={onSubmit}>
            Sign up
          </button>

          <div className="user-changes">
            <h4>change user</h4>
            {/* <select>
              <option></option>
              <option onClick={navigateManagerPage}>Manager</option>
            </select> */}
            <Link to="/signup/manager">Manager</Link>
          </div>
        </form>
      </div>
    </>
  );
}
