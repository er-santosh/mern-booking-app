import hotelService from "../services/hotel.service.js";

export const getAllHotel = async (req, res, next) => {
  try {
    const hotels = await hotelService.findAll();
    res.fetched(hotels);
  } catch (err) {
    next(err);
  }
};

export const getOneHotel = async (req, res, next) => {
  try {
    const hotel = await hotelService.findOne(req.params.id);
    res.fetched(hotel);
  } catch (err) {
    next(err);
  }
};
export const createHotel = async (req, res, next) => {
  try {
    const product = await hotelService.create(req.body);
    res.created("Hotel", product);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const product = await hotelService.update(req.params.id, req.body);
    res.updated("Hotel", product);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await hotelService.delete(req.params.id);
    res.deleted("Hotel", deletedHotel);
  } catch (error) {
    next(error);
  }
};

export const addRoom = async (req, res, next) => {
  try {
    const hotelUpdated = await hotelService.addRoom(
      req.params.hotelId,
      req.body
    );
    res.updated("Hotel", hotelUpdated);
  } catch (error) {
    next(error);
  }
};
export const removeRoom = async (req, res, next) => {
  try {
    const hotelUpdated = await hotelService.removeRoom(
      req.params.hotelId,
      req.params.roomId
    );
    res.updated("Hotel", hotelUpdated);
  } catch (error) {
    next(error);
  }
};
