import { useRef, useState } from "react";
import "./hostelManagerForm.css";
import { useSelector } from "react-redux";
import { useHostelDetailsMutation } from "../services/chatApi";
import {
  selectAllContacts,
  filledForm,
  newFilledForm,
} from "../features/chatSlice";

// import { useSignupManagerMutation } from "../services/chatApi";
export default function HostelManagerForm() {
  const formDetailsFound = useSelector(filledForm);
  let checkForm;
  if (formDetailsFound && Object.keys(formDetailsFound)[0] === "hostelName") {
    console.log("details found");
    checkForm = "";
  } else {
    console.log("no details found");
    checkForm = " ";
  }

 const newForm = useSelector(newFilledForm)

 if(newForm && Object.keys(newForm)[0]==="hostelName"){
  console.log('new manager form found')
  checkForm = "";

 }else{
  console.log('manager form not found yet')
  checkForm = " ";

 }

  const hostelInfo = useSelector(selectAllContacts);
  const hostelId = hostelInfo._id;
  const [hostelDetails, { isLoading, error }] = useHostelDetailsMutation();

  const [hostelName, setHostelName] = useState("");
  const [totalRooms, setTotalRooms] = useState("");
  const [totalFloors, setTotalFloors] = useState("");

  const firstUpload = useRef();
  const secondUpload = useRef();
  const thirdUpload = useRef();
  const fourthUpload = useRef();
  const fifthUpload = useRef();

  const [isUploaded, setIsUploaded] = useState(false);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [fourthImage, setFourthImage] = useState(null);
  const [fifthImage, setFifthImage] = useState(null);

  async function handleFirstUpload(event, ref) {
    event.preventDefault();
    ref.current.click();
  }

  //creating the uploading store with cloudinary api

  async function uploadImage(imageFiles) {
    const urls = [];
    for (const imageFile of imageFiles) {
      const newFile = new FormData();
      newFile.append("file", imageFile);
      newFile.append("upload_preset", "uccChat");
      try {
        setIsUploaded(true);
        const options = {
          method: "POST",
          body: newFile,
        };

        let uploadedApi = await fetch(
          "https://api.cloudinary.com/v1_1/nayy-1999/image/upload",
          options
        );
        const dataJSON = await uploadedApi.json();
        setIsUploaded(false);
        console.log("the url data", dataJSON.url);
        urls.push(dataJSON.url);
      } catch (error) {
        setIsUploaded(false);
        console.log("image not uploaded api error" + error);
      }
    }
    return urls;
  }
  const [imageContainer, setImageContainer] = useState([]);
  async function firstOnchange(e, setImage, receiveContainer) {
    e.preventDefault();
    const firstFile = e.target.files[0];
    if (firstFile.size > 1048576) {
      alert("image size it to large");
    } else {
      const imageObject = URL.createObjectURL(firstFile);
      setImage(imageObject);
      receiveContainer((prevFiles) => [...prevFiles, firstFile]);
    }
  }
  async function onSubmitForms(e) {
    e.preventDefault();
    const url = await uploadImage(imageContainer);

    console.log("urls", url);
    const hostelData = {
      hostelName,
      totalRooms,
      totalFloors,
      roomsPictures: url,
    };
    await hostelDetails({
      hostelId,
      hostelData,
    }).then((data) => {
      if (data) {
        console.log("new hostel details", data);
      } else {
        console.log("error in update");
      }
    });
  }

  return (
    <>
    {checkForm  &&
      <div className="hostel-manager-form">
        <form className="form-container">
          <label>
            <small>hostel name</small>
            <input
              type="text"
              value={hostelName}
              onChange={(e) => setHostelName(e.target.value)}
            />
          </label>
         <label>
            <small>total number of rooms</small>
            <input
              type="text"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
            />
          </label>
          <label className="floors-container">
            <div className="number-of-floors">
              <small>total number of floors</small>
              {/* <input type="text" /> */}
              {/* <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select> */}
              <input
                type="text"
                value={totalFloors}
                onChange={(e) => setTotalFloors(e.target.value)}
              />
            </div>
          </label>
          <label>
            <h5>pictures rooms</h5>

            <div className="image-upload-container">
              <div className="first-upload-image">
                <button
                  className="add-room-image"
                  onClick={(e) => handleFirstUpload(e, firstUpload)}
                >
                  add picture {isUploaded ? "correct" : "wrong"}
                </button>
                <input
                  type="file"
                  ref={firstUpload}
                  onChange={(e) =>
                    firstOnchange(e, setFirstImage, setImageContainer)
                  }
                  className="file-disabled"
                  hidden
                  required
                />
                <img
                  src={firstImage}
                  className="room-image-upload"
                  alt="no-image"
                />
              </div>

              <div className="second-upload-image">
                <button
                  className="add-room-images"
                  onClick={(e) => handleFirstUpload(e, secondUpload)}
                >
                  add picture {isUploaded ? "correct" : "wrong"}
                </button>
                <input
                  type="file"
                  ref={secondUpload}
                  onChange={(e) =>
                    firstOnchange(e, setSecondImage, setImageContainer)
                  }
                  className="file-disabled"
                  hidden
                  required
                />
                <img
                  src={secondImage}
                  className="room-image-upload"
                  alt="no-image"
                />
              </div>

              <div className="third-upload-image">
                <button
                  className="add-room-images"
                  onClick={(e) => handleFirstUpload(e, thirdUpload)}
                >
                  add picture {isUploaded ? "correct" : "wrong"}
                </button>
                <input
                  type="file"
                  ref={thirdUpload}
                  onChange={(e) =>
                    firstOnchange(e, setThirdImage, setImageContainer)
                  }
                  className="file-disabled"
                  hidden
                  required
                />
                <img
                  src={thirdImage}
                  className="room-image-upload"
                  alt="no-image"
                />
              </div>

              <div className="fourth-upload-image">
                <button
                  className="add-room-images"
                  onClick={(e) => handleFirstUpload(e, fourthUpload)}
                >
                  add picture {isUploaded ? "correct" : "wrong"}
                </button>
                <input
                  type="file"
                  ref={fourthUpload}
                  onChange={(e) =>
                    firstOnchange(e, setFourthImage, setImageContainer)
                  }
                  className="file-disabled"
                  hidden
                  required
                />
                <img
                  src={fourthImage}
                  className="room-image-upload"
                  alt="no-image"
                />
              </div>

              <div className="fifth-upload-image">
                <button
                  className="add-room-images"
                  onClick={(e) => handleFirstUpload(e, fifthUpload)}
                >
                  add picture {isUploaded ? "correct" : "wrong"}
                </button>
                <input
                  type="file"
                  ref={fifthUpload}
                  onChange={(e) =>
                    firstOnchange(e, setFifthImage, setImageContainer)
                  }
                  className="file-disabled"
                  hidden
                  required
                />
                <img
                  src={fifthImage}
                  className="room-image-upload"
                  alt="no-image"
                />
              </div>
            </div>
          </label>
          <button
            className="manager-form-submit"
            type="submit"
            onClick={onSubmitForms}
          >
            submit
          </button>
        </form>
      </div>
}
    </>
  );
}
