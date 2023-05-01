import React, { useEffect, useState } from 'react'
import Pagetitle from '../../components/Pagetitle'
import Busform from "../../components/Busform";
import moment from 'moment';
import {Modal} from 'antd';

import "../../resources/navigation.css"

import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { axiosInstance } from '../../helpers/axiosInstance';
import { message, Table } from 'antd';




function AdminBuses() {
  const dispatch = useDispatch();
  const [showBusForm, setShowBusForm] = React.useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  
  const getBuses = async () => {

    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);

    }
  };


  const deleteBus = async (id) => {
    Modal.confirm({
      title: 'Confirm',
      content: 'Are you sure you want to delete this bus?',
      onOk: async () => {
        try {
          dispatch(ShowLoading());
          const response = await axiosInstance.post("/api/buses/delete-bus", {
            _id: id
          });
          dispatch(HideLoading());
          if (response.data.success) {
            message.success(response.data.message)
            getBuses();
          } else {
            message.error(response.data.message);
          }
        } catch (error) {
          dispatch(HideLoading());
          message.error(error.message);
  
        }
      },
      onCancel: () => {},
    });
  };
  


  const columns = [
    {
      title: "Bus Name",
      dataIndex: "name"
    },
    {
      title: "Bus Number",
      dataIndex: "number"
    },
    {
      title: "From",
      dataIndex: "from"
    },
    {
      title: "To",
      dataIndex: "to"
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
      render: (journeyDate) => moment(journeyDate).format("DD-MM-YYYY")
      
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className='d-flex gap-3'>
          <i class="ri-delete-bin-line" onClick={() => {
            deleteBus(record._id);
          }}></i>
          <i class="ri-pencil-line" onClick={() => {
            setSelectedBus(record);
            setShowBusForm(true);
          }}></i>

        </div>
      )

    },


  ]



  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div >
      <div className='d-flex justify-content-between abc'>
        <Pagetitle title="Buses" />

        <button className='primary-btn' type="" onClick={() => {
          setShowBusForm(true);
        }}>Add bus</button>
      </div>


      <div className='d-flex justify-content-center tab'>
        <Table columns={columns} dataSource={buses} />
      </div>

      {showBusForm && <Busform showBusForm={showBusForm} setShowBusForm={setShowBusForm} type={selectedBus ? "edit" : "add"}
        selectedBus={selectedBus} setSelectedBus={setSelectedBus}
        getData={getBuses} />}
    </div>
  )
}


export default AdminBuses