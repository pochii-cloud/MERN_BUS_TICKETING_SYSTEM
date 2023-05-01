import React from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";



function BusForm({
  showBusForm,
  setShowBusForm,
  type = "add",
  getData,
  selectedBus,
  setSelectedBus,
}) {
  const dispatch = useDispatch();


  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (type === "add") {
        response = await axiosInstance.post("/api/buses/add-bus", values);
      } else {
        response = await axiosInstance.post("/api/buses/update-bus", {
          ...values,
          _id: selectedBus._id,
        });
      }
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
      getData();
      setShowBusForm(false);
      setSelectedBus(null);

      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <Modal
      width={800}
      title={type === "add" ? "Add Bus" : "Update Bus"}
      visible={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name" required>
              <input type="text" required />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="number" required>
              <input type="text" required />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity" required>
              <input type="number" required />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from" required>
              <select name="" id="" >
                <option value="">Add Source</option>
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
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to" required>
              <select name="" id="">
                <option value="">Add Destination</option>
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
            </Form.Item>
          </Col>

          <Col lg={8} xs={24}>
            <Form.Item label="Journey Date" name="journeyDate" required>
              <input type="date" required />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure" required>
              <input type="time" required />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival" required>
              <input type="time" required />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Type" name="type" required>
              <select name="" id="">
                <option value="">Bus Type</option>
                <option value="AC Seater">AC Seater</option>
                <option value="AC Sleeper">AC Sleeper</option>
                <option value="Non-AC Seater">Non-AC Seater</option>
                <option value="Non-AC Sleeper">Non-AC Sleeper</option>
              </select>
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Fare" name="fare" required>
              <input type="number" required />
            </Form.Item>
          </Col>

          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status" required>
              <select name="" id="">
                <option value="Yet To Start">Yet To Start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;