import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
function Dashboard() {
  const user = useSelector((state) => state.user);
  if (!user.token) {
    return <Redirect to="/login" />;
  }

  return <div>{user.token}</div>;
}

export default Dashboard;
