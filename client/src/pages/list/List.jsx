import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addSearchData } from "../../store/searchReducer";

const List = () => {
  const location = useLocation();
  let state = location.state;
  if (!state) {
    state = {
      destination: "",
      date: [
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ],
      options: {
        adult: 1,
        children: 0,
        room: 1,
      },
    };
  }

  const [destination, setDestination] = useState(state.destination);
  const [date, setDate] = useState(state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(state.options);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(9999);
  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min}&max=${max}`
  );

  const dispatch = useDispatch();

  const handleAvailabiltyClick = () => {
    dispatch(
      addSearchData({
        destination,
        date,
        options,
      })
    );
  };

  const searchHotel = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsOptionInput"
                    min={0}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        adult: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        children: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                    onChange={(e) =>
                      setOptions({
                        ...options,
                        room: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <button onClick={searchHotel}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem
                    key={item._id}
                    item={item}
                    onAvailabilityClick={handleAvailabiltyClick}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
