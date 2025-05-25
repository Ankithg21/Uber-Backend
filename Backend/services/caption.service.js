const captionModel = require("../models/caption.models");

const createCaption = async ({
  firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
  if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All Fields are required!");
  }

  const caption = await captionModel.create({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
    vehicle: {
      color,
      plate,
      capacity,
      vehicleType,
    }
  });

  return caption;
};

module.exports = {
  createCaption,
};
