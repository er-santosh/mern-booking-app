import roomService from "../services/room.service.js";

export const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await roomService.findAll();
    res.fetched(rooms);
  } catch (err) {
    next(err);
  }
};

export const getOneRoom = async (req, res, next) => {
  try {
    const room = await roomService.findOne(req.params.id);
    res.fetched(room);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const product = await roomService.update(req.params.id, req.body);
    res.updated("Room", product);
  } catch (error) {
    next(error);
  }
};
