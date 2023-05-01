import { message, Table, Popconfirm } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Busform from "../../components/Busform";
import Pagetitle from "../../components/Pagetitle";
import { axiosInstance } from "../../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";

function AdminUsers() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/get-all-users", {});
      dispatch(HideLoading());
      if (response.data.success) {
        const filteredUsers = response.data.data.filter(user => !user.isAdmin);
        setUsers(filteredUsers);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/delete-user", {
        _id: id
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getUsers();
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
      title: "Full Name",
      dataIndex: "name",
    },
    {
      title: "Email ID",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="d-flex gap-3">
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <p className="text-danger underline">Delete User</p>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-2">
        <Pagetitle title="Users" />
      </div>

      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default AdminUsers;
