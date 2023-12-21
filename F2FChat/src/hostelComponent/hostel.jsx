import hostel from "../uccHostelComponent/uccHostel";
import { useEffect, useState } from "react";

export default function Hostel() {
  const keyWords = [
    "UCC HOSTEL CONNECT",
    "UCC PLACES",
    "POPULAR HOSTELS",
    "loc:",
    "AYENSU",
    "APEOWOSIKA",
    "KWAPRO",
  ];

  console.log("new hostel", hostel);
  const [ayensuDatas, setAyensuDatas] = useState([]);
  const [apeowosikaDatas, setApeowosikaDatas] = useState([]);
  const [kwaproDatas, setKwaproDatas] = useState([]);

  useEffect(() => {
    const findAyensu = hostel.find(
      (hostel) => Object.keys(hostel)[0] === "AYENSU"
    );
    const ayensuData = findAyensu.AYENSU.map(
      (popular) => Object.values(popular)[0]
    );
    setAyensuDatas(ayensuData);

    const findApeowosika = hostel.find(
      (hostel) => Object.keys(hostel)[0] === "APEOWOSIKA"
    );

    const apeowosikaData = findApeowosika.APEOWOSIKA.map(
      (popular) => Object.values(popular)[0]
    );

    setApeowosikaDatas(apeowosikaData);

    const findKwapro = hostel.find(
      (hostel) => Object.keys(hostel)[0] === "KWAPROW"
    );

    const kwaproData = findKwapro.KWAPROW.map(
      (popular) => Object.values(popular)[0]
    );

    setKwaproDatas(kwaproData);
  }, [hostel]);

  const ayensu = ayensuDatas.map((data, index) => (
    <div className="ayensu-container" key={index}>
      <small>{data.location}</small>
      <small>{data.imageName}</small>
      <img src={data.url} className="ayensu-image" alt="no-image" />
    </div>
  ));

  const apeowosika = apeowosikaDatas.map((data, index) => (
    <div className="apeowosika-container" key={index}>
      <small>{data.location}</small>
      <small>{data.imageName}</small>
      <img src={data.url} className="apeowosika-image" alt="no-image" />
    </div>
  ));

  const kwapro = kwaproDatas.map((data, index) => (
    <div className="kwapro-container" key={index}>
      <small>{data.location}</small>
      <small>{data.imageName}</small>
      <img src={data.url} className="kwapro-image" alt="no-image" />
    </div>
  ));

  return (
    <>
      <div className="popular-hostels">
        <h4 className="ucc-places-header">{keyWords[2]}</h4>

        <div className="popular-hostels-ayensu">
          <h6 className="sub-header-ayensu">{keyWords[4]}</h6>
          {ayensu}
        </div>

        <div className="popular-hostels-apeowosika">
          <h6 className="sub-header-apeowosika">{keyWords[5]}</h6>
          {apeowosika}
        </div>

        <div className="popular-hostels-kwapro">
          <h6 className="sub-header-kwapro">{keyWords[6]}</h6>
          {kwapro}
        </div>
      </div>
    </>
  );
}
