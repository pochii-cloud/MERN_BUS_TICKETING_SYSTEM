import { Col, message, Row, Carousel, Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Bus from "../components/Bus";

import { HideLoading, ShowLoading } from "../redux/alertsSlice";

import '../resources/home.css';




function Home() {
  const [filters = {}, setFilters] = useState({});
  const dispatch = useDispatch();
  const [buses, setBuses] = useState([]);

  
  const getBuses = async () => {
    if (!filters.from || !filters.to) {
      return;
    }


    const tempFilters = {}; //removing values
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        tempFilters[key] = filters[key];
      }
    });

    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/buses/get-all-buses",
        tempFilters,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const filteredBuses = response.data.data.filter(
          (bus) => bus.status === "Yet To Start"
        );
        setBuses(filteredBuses);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBuses();
  }, []);


  return (

    <><div>
      <Carousel autoplay effect="fade" className="Carousel">
        <div>
          <img src={require("../images/car1.png")} alt="" />
        </div>
        <div>
          <img src={require("../images/car2.png")} alt="" />
        </div>
        <div>
          <img src={require("../images/car3.png")} alt="" />
        </div>
      </Carousel>
      <div className="tkt">
        <div className="my-3 py-1 ticketbox">
          <Row gutter={[10, 10]} align="center">
            <Col lg={24}>
              <h1>Book Your Ticket</h1>
            </Col>
            <Col lg={7} sm={24}>
              <label htmlFor="fromInput"><i class="ri-map-pin-2-fill"></i>From</label>
              <select
                id="fromSelect"
                value={filters.from}
                onChange={(e) => setFilters({ ...filters, from: e.target.value })}
              >
                <option value="">Choose your source</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Ongole">Ongole</option>
                <option value="Vijayawada">Vijayawada</option>
                <option value="Kochi">Kochi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Vishakapatnam">Vishakapatnam</option>
              </select>
            </Col>
            <Col lg={7} sm={24}>
              <label htmlFor="toInput"><i class="ri-map-pin-2-fill"></i>To</label>
              <select
                id="toSelect"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              >
                <option value="">Choose your Destination</option>
                <option value="Bangalore" disabled={filters.from === "Bangalore"}>
                  Bangalore
                </option>
                <option value="Hyderabad" disabled={filters.from === "Hyderabad"}>
                  Hyderabad
                </option>
                <option value="Chennai" disabled={filters.from === "Chennai"}>
                  Chennai
                </option>
                <option value="Ongole" disabled={filters.from === "Ongole"}>
                  Ongole
                </option>
                <option value="Vijayawada" disabled={filters.from === "Vijayawada"}>
                  Vijayawada
                </option>
                <option value="Kochi" disabled={filters.from === "Kochi"}>
                  Kochi
                </option>
                <option value="Mumbai" disabled={filters.from === "Mumbai"}>
                  Mumbai
                </option>
                <option value="Coimbatore" disabled={filters.from === "Coimbatore"}>
                  Coimbatore
                </option>
                <option value="Vishakapatnam" disabled={filters.from === "Vishakapatnam"}>
                  Vishakapatnam
                </option>
              </select>
            </Col>
            <Col lg={7} sm={24}>
              <label htmlFor="dateInput"><i class="ri-calendar-line"></i>Date</label>
              <input
                type="date"
                placeholder="Date"
                value={filters.journeyDate}
                onChange={(e) => setFilters({ ...filters, journeyDate: e.target.value })} />
            </Col>
            <Col lg={3} sm={24}>
              <div className="d-flex gap-2 searchbtn">
                <button className="primary-btn" onClick={() => getBuses()}>
                  Search
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div>

        {/* <Row gutter={[15, 15]} className="businfo">



          <Col lg={3} sm={24} className="filterin">
            <input
              type="text"
              placeholder="Type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })} />
          </Col>
        </Row>
        <Row>
          <Col lg={3} sm={24} className="filterin">
            <div className="d-flex gap-2">
              <button className="primary-btn" onClick={() => getBuses()}>
                Filter
              </button>
            </div>
          </Col>
        </Row> */}
        {buses
          .filter((bus) => bus.status === "Yet To Start")
          .map((bus) => (
            <Col lg={16} xs={24} sm={24} className="businformation">
              <Bus bus={bus} />
            </Col>
          ))}



      </div>



      <div className="travelcard">
        <div>
          <h1> A Journey of a thousand miles begins with a <span><h1>Single step</h1></span> </h1>
          <p class="text">Enjoy the following exclusive features:
            Last Minute Booking - In a hurry to book a bus at the last minute? Choose the bus passing from your
            nearest boarding point and book in a few easy steps.
            Boarding Point Navigation - Never lose your way while travelling to your boarding point!
            Comprehensive Ticket Details- Everything that you need to make the travel hassle free - rest stop
            details, boarding point images, chat with co-passengers, wake-up alarm and much more!</p>
        </div>


        <Card className="card1"
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={require("../images/Blue Animated Travel to Dubai Instagram Post (260 × 400 px).gif")} />}
        >
        </Card>
        <Card className="card2"
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={require("../images/travelcard2.gif")} />}
        >
        </Card>
        <Card className="card3"
          hoverable
          style={{
            width: 240,
          }}
          cover={<img alt="example" src={require("../images/travelcard3.gif")} />}
        >
        </Card>

      </div>


    </div><div className="partners">
        <div className="partnersh1">
          <h1>Partners</h1>
        </div>
        <div className="partnershimg">
          <img style={{ width: "300px", padding: "10px" }} src={require("../images/Karnataka-Tourism-694x235-1-1-1.png")} alt="" />
          <img style={{ width: "100px", padding: "10px" }} src={require("../images/KSRTC_Logo.png")} alt="" />
        </div>

      </div></>

  );
}

export default Home;