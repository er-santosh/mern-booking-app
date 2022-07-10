import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

const Hotel = () => {
  const storedDate = useSelector((state) => state.search.date);
  let storedOptions = useSelector((state) => state.search.options);

  const location = useLocation();

  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/${id}`);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const findDateDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };

  let nightOfStayCount = findDateDifference(
    new Date(storedDate[0]?.endDate),
    new Date(storedDate[0]?.startDate)
  );

  if (!nightOfStayCount) {
    nightOfStayCount = 1;
    storedOptions = {
      room: 1,
    };
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                src={data.photos[slideNumber]}
                alt=""
                className="sliderImg"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}

        {loading ? (
          "Please wait"
        ) : !error ? (
          <div className="hotelWrapper">
            <button className="bookNow">Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              Excellent location – {data.distance} from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of City</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {nightOfStayCount}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of {data.rating}!
                </span>
                <h2>
                  <b>
                    $
                    {nightOfStayCount * data.cheapestPrice * storedOptions.room}
                  </b>{" "}
                  ({nightOfStayCount} nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        ) : (
          `Unidentified hotel`
        )}
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
