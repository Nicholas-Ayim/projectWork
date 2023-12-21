const hostel = [
  {
    AYENSU: createHostel(
      "AYENSU",
      [
        "../../public/images/boyGirlChat.jpeg",
        "../../public/images/boyGirlChat.jpeg",
        "../../public/images/boyGirlChat.jpeg",
      ],
      ["ayensu1", "ayensu2", "ayensu3"]
    ),
  },
  {
    APEOWOSIKA: createHostel(
      "APEOWOSIKA",
      [
        "../../public/images/boyGirlChat.jpeg",
        "../../public/images/boyGirlChat.jpeg",
        "../../public/images/boyGirlChat.jpeg",
      ],
      ["apeowosika1", "apeowosika2", "apeowosika3"]
    ),
  },
  {
    KWAPROW: createHostel(
      "KWAPRO",
      [
        "../../public/images/boyGirlChat.jpeg",
        "../../public/images/boyGirlChat.jpeg",
        "../../public/images/boyGirlChat.jpeg",
      ],
      ["kwapro1", "kwapro2", "kwapro3"]
    ),
  },
];

function createHostel(name, imagesUrl, imageNames) {
  const commonData = {
    location: "ucc-campus",

  };
  return imagesUrl.map((image, index) => ({
    [`popular${index + 1}`]: {
      id: index + 1,
      name,
      imageName : imageNames[index],
      url: image,
      ...commonData,
    },
  }));
}

export default hostel;
