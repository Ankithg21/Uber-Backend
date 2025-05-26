const captainModel = require("../models/caption.models");

const createCaptain = async ({
  firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
  if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All Fields are required!");
  }

  const captain = await captainModel.create({
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

  return captain;
};

module.exports = {
  createCaptain,
};
