import React from "react";
import Login from "./login";
import { getServerSession } from "next-auth";
import { Box } from "@mui/material";

const page = async () => {
  const session = await getServerSession();
  console.log("there is see", session);

  return (
    <>
      <Login />
    </>
  );
};

export default page;
