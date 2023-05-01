import React from "react";
import { useNavigate } from "react-router-dom";
import "../resources/bus.css"
import moment from "moment";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="card p-2 homecard">
      <div className="cardtitle">
        <h1 className="text-lg primary-text">{bus.name}</h1>
      </div>

      <hr />
      <div className="d-flex justify-content-between">
        <div>
          <p className="text-sm">From</p>
          <p className="text-sm">{bus.from}</p>
        </div>

        <div>
          <p className="text-sm">To</p>
          <p className="text-sm">{bus.to}</p>
        </div>

        <div>
          <p className="text-sm">Fare</p>
          <p className="text-sm">₹{bus.fare} /-</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-end">
        <div>
          <p className="text-sm">Journey Date</p>
          <p className="text-sm">{moment(bus.journeyDate).format('DD-MM-YYYY')}</p>
        </div>
        <div>
          <p className="text-sm">Departure</p>
          <p className="text-sm">{bus.departure}</p>
        </div>
        <div>
          <p className="text-sm">Arrival</p>
          <p className="text-sm">{bus.arrival}</p>
        </div>
        <div>
          <p className="text-sm">Type</p>
          <p className="text-sm">{bus.type}</p>
        </div>

        <h1 className="text-lg secondary-text" onClick={() => {
          navigate(`/book-now/${bus._id}`)
        }}><button className="booknow">Book Now</button></h1>
      </div>
    </div>
  );
}

export default Bus;