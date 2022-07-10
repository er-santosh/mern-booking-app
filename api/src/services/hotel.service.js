import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import { generateError } from "../utils/generate-error.util.js";
import roomService from "./room.service.js";
const hotelService = {
  async create(hotelObj) {
    const hotel = new Hotel(hotelObj);
    try {
      return await hotel.save();
    } catch (error) {
      throw error;
    }
  },
  async findAll() {
    try {
      return await Hotel.find();
    } catch (error) {
      throw error;
    }
  },
  async findOne(hotelId) {
    try {
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) throw generateError(404, "Hotel not found");
      return hotel;
    } catch (error) {
      throw error;
    }
  },
  async update(hotelId, hotelObj) {
    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(
        hotelId,
        {
          $set: hotelObj,
        },
        {
          new: true,
        }
      );
      if (!updatedHotel) throw generateError(404, "Hotel not found");
      return updatedHotel;
    } catch (error) {
      throw error;
    }
  },
  async delete(hotelId) {
    try {
      const deletedHotel = await Hotel.findByIdAndRemove(hotelId);
      if (!deletedHotel) throw generateError(404, "Hotel not found");
    } catch (error) {
      throw error;
    }
  },

  async addRoom(hotelId, roomObj) {
    try {
      const room = await roomService.create(roomObj);
      try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
          hotelId,
          {
            $push: {
              rooms: room._id,
            },
          },
          {
            new: true,
          }
        );

        if (!updatedHotel) throw generateError(404, "Hotel not found");

        return updatedHotel;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
  async removeRoom(hotelId, roomId) {
    try {
      const deletedRoom = await roomService.delete(roomId);
      try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
          hotelId,
          {
            $pull: {
              rooms: deletedRoom._id,
            },
          },
          {
            new: true,
          }
        );

        if (!updatedHotel) throw generateError(404, "Hotel not found");

        return updatedHotel;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
  },
};

export default hotelService;
