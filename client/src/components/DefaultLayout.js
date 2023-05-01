import React from 'react'
import "../resources/navigation.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {Modal} from 'antd';


import Footer from './footer';


function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.users);
    const userMenu = [
      {
        name: "Home",
        path: "/",
        icon: "ri-home-line",
      },
      {
        name: "Bookings",
        path: "/bookings",
        icon: "ri-file-list-3-line",
      },
      {
        name: "About",
        path: "/about",
        icon: "ri-information-fill",
      },
      {
        name: "Logout",
        path: "/logout",
        icon: "ri-logout-box-r-line",
      },
    ];
    const adminMenu = [
      {
        name: "Home",
        path: "/admin",
        icon: "ri-home-line",
      },
      {
        name: "Buses",
        path: "/admin/buses",
        icon: "ri-bus-fill",
      },
      {
        name: "Users",
        path: "/admin/users",
        icon: "ri-user-3-line",
      },
      {
        name: "Bookings",
        path: "/admin/bookings",
        icon: "ri-file-list-3-line",
      },
      {
        name: "Logout",
        path: "/logout",
        icon: "ri-logout-box-r-line",
      },
    ];
    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
    const activeRoute = window.location.pathname;
  
    const handleLogout = () => {
      Modal.confirm({
        title: "Are you sure you want to log out?",
        onOk: () => {
          localStorage.removeItem("token");
          window.location.reload();
        },
      });
    };
  
    return (
      <div className="layout-parent">
        <div className="body">
          <div className="header">
            <div className="subheader">
              <img src={require("../images/BUSLOGO.png")} alt="logo" onClick={() => navigate('/')}/>
              {user && (
              <div className="user-name">{`Welcome, ${
                user.isAdmin ? "Admin" : user.name
              }`}</div>
            )}
            </div>
  
            <div className="d-flex flex-row gap-3 justify-content-end menu nav">
              {menuToBeRendered.map((item, index) => {
                return (
                  <div
                    className={`${activeRoute === item.path && "active-menu-item"
                      } menu-item navitem`}
                  >
                    <i className={item.icon}></i>
                    {item.name === "Logout" ? (
                      <span onClick={handleLogout}>{item.name}</span>
                    ) : (
                      <span
                        onClick={() => {
                          navigate(item.path);
                        }}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="content">{children} </div>
          {!user?.isAdmin && <Footer />}
        </div>
      </div>
    );
  }
  
  export default DefaultLayout;
  
