"use client";

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";

const uData = [
  4000, 3000, 2000, 2780, 1890, 2390, 3490, 2000, 2780, 1890, 2390, 3490,
];
const pData = [
  2400, 1398, 9800, 3908, 4800, 3800, 4300, 2000, 2780, 1890, 2390, 3490,
];
// const uData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// const pData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const xLabels = [
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
];

export function SimpleLineChart() {
  return (
    <LineChart
      sx={{ width: "100%", strokeWidth: "0.2", stroke: "#5D5B5C" }}
      height={265}
      series={[
        { data: pData, color: "#72B01D" },
        { data: uData, color: "#D3E7B9" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      yAxis={[{ disableLine: true }]}
    />
  );
}

export function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 31, label: "Male" },
            { id: 1, value: 69, label: "Female" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
