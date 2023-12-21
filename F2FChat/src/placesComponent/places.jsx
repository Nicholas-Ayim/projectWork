import places from "../uccPlacesComponent/uccPlacesImages";
import "./places.css";
export default function Places() {
  const keyWords = [
    "UCC HOSTEL CONNECT",
    "UCC PLACES",
    "POPULAR HOSTELS",
    "loc:",
    "AYENSU",
    "APEOWOSIKA",
    "KWAPRO",
  ];
  const placesImages = Object.values(places);

  const placeImage = placesImages.map((place) => (
    <div key={place.id} className="image-container">
      <img
        src={place.url}
        className="place-image"
        alt={`image ${place.id} not found `}
      />
      <div className={place.url ? "place-details" : "place-not-found"}>
        <h5 className="place-name">{place.name}</h5>
        <small className="place-location">
          {keyWords[3]} {place.location}
        </small>
      </div>
    </div>
  ));

  return (
    <>
      <div className="ucc-places">
        <h4 className="ucc-places-header">{keyWords[1]}</h4>
        <div className="place-image-container">{placeImage}</div>
        <div className="places"></div>
      </div>
    </>
  );
}
