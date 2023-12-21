import homeImage from "../../public/images/happyChat.jpg";

export default function Home() {
  const keyWords = [
    "UCC HOSTEL CONNECT",
    "UCC PLACES",
    "POPULAR HOSTELS",
    "loc:",
    "AYENSU",
    "APEOWOSIKA",
    "KWAPRO",
  ];
  return (
    <>
      <div className="home-image-container">
        <div className="img-container">
          <img src={homeImage} className="home-image" alt="no-image" />
        </div>
        <h3 className="header">{keyWords[0]}</h3>
      </div>
    </>
  );
}
