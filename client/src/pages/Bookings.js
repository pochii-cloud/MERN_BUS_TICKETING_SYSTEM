import { message, Modal, Table } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../components/Pagetitle";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useReactToPrint } from "react-to-print";

function Bookings() {
    const [showPrintModal, setShowPrintModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const dispatch = useDispatch();
    const getBookings = async () => {
        try {
            dispatch(ShowLoading());
            
            const response = await axiosInstance.post(
                "/api/bookings/get-bookings-by-user-id",{});
            dispatch(HideLoading());
            if (response.data.success) 
            {
                const mappedData = response.data.data.map((booking) => {
                    return {
                        ...booking,
                        ...booking.bus,
                        key: booking._id,
                    };
                });

                setBookings(mappedData);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Bus Name",
            dataIndex: "name",
            key: "bus",
        },
        {
            title: "Bus Number",
            dataIndex: "number",
            key: "bus",
        },
        {
            title: "Journey Date",
            dataIndex: "journeyDate",
            render: (journeyDate) => {
                return moment(journeyDate).format("DD-MM-YYYY");
            },
        },
        {
            title: "From",
            dataIndex: "from",
        },
        {
            title: "To",
            dataIndex: "to",
        },
        {
            title: "Departure",
            dataIndex: "departure",
        },
        {
            title: "Arrival",
            dataIndex: "arrival",
        },
        {
            title: "Seat Number(s):",
            dataIndex: "seats",
            render: (seats) => {
                return seats.join(", ");
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => (
                <div>
                    <p
                        className="text-md underline"
                        onClick={() => {
                            setSelectedBooking(record);
                            setShowPrintModal(true);
                        }}
                    >
                        Print Ticket
                    </p>
                </div>
            ),
        },
    ];

    useEffect(() => {
        getBookings();
        
    }, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <div>
            <PageTitle title="Bookings" />
            <div className="mt-2">
                <Table dataSource={bookings} columns={columns} />
            </div>

            {showPrintModal && (
                <Modal
                    title="Print Ticket"
                    onCancel={() => {
                        setShowPrintModal(false);
                        setSelectedBooking(null);
                    }}
                    visible={showPrintModal}
                    okText="Print"
                    onOk={handlePrint}
                >
                    <div className="d-flex flex-column p-5" ref={componentRef}>
                        <img src={require("../images/BUSLOGO.png")} alt="logo" />
                        <hr />
                        <p>Bus Name : {selectedBooking.name}</p>
                        <p>
                            From : {selectedBooking.from} <br />
                            To : {selectedBooking.to}
                        </p>

                        <hr />
                        <p>
                            <span>Journey Date :</span>{" "}
                            {moment(selectedBooking.journeyDate).format("DD-MM-YYYY")}
                        </p>
                        <p>
                            <span>Departure : </span> {selectedBooking.departure}
                        </p>
                        <p>
                            <span>Arrival : </span> {selectedBooking.arrival}
                        </p>
                        <hr />
                        <p>
                            <span>Seat Number(s) : </span> <br />
                            {selectedBooking.seats.join(", ")}
                        </p>
                        <hr />
                        <p>
                            <span>Total Amount : </span>{" "}
                            {selectedBooking.fare * selectedBooking.seats.length} /-
                        </p>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Bookings;