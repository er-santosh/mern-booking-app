import Room from "../models/room.model.js";
import { generateError } from "../utils/generate-error.util.js";
const roomService = {
  async create(roomObj) {
    const room = new Room(roomObj);
    try {
      return await room.save();
    } catch (error) {
      throw error;
    }
  },
  async findAll() {
    try {
      return await Room.find();
    } catch (error) {
      throw error;
    }
  },
  async findOne(roomId) {
    try {
      const room = await Room.findById(roomId);
      if (!room) throw generateError(404, "Room not found");
      return room;
    } catch (error) {
      throw error;
    }
  },
  async update(roomId, roomObj) {
    try {
      const updatedRoom = await Room.findByIdAndUpdate(
        roomId,
        {
          $set: roomObj,
        },
        {
          new: true,
        }
      );
      if (!updatedRoom) throw generateError(404, "Room not found");
      return updatedRoom;
    } catch (error) {
      throw error;
    }
  },
  async delete(roomId) {
    try {
      const deletedRoom = await Room.findByIdAndRemove(roomId);
      if (!deletedRoom) throw generateError(404, "Room not found");
      return deletedRoom;
    } catch (error) {
      throw error;
    }
  },
};

export default roomService;
