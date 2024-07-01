import { getAllUsers } from "../api/api-user";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import CanvasHeatMap from "../components/reports/CanvasHeatMap";
import { canvasHeatMapConst } from "../utils/constants";
import MyProfile from "../components/profile/MyProfile";

const Report = () => {
  return (
    <div>
      {<MyProfile />}
      <div style={{ overflow: "auto" }}>
        <CanvasHeatMap {...canvasHeatMapConst} />
      </div>
    </div>
  );
};
export default Report;
