import hotelService from "../services/hotel.service.js";

export const getAllHotel = async (req, res, next) => {
  try {
    const hotels = await hotelService.findAll(req.query);
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

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotelService.countDocuments({ city });
      })
    );
    res.fetched(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await hotelService.countDocuments({ type: "hotel" });
    const apartmentCount = await hotelService.countDocuments({
      type: "apartment",
    });
    const resortCount = await hotelService.countDocuments({ type: "resort" });
    const villaCount = await hotelService.countDocuments({ type: "villa" });
    const cabinCount = await hotelService.countDocuments({ type: "cabin" });

    res.fetched([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
