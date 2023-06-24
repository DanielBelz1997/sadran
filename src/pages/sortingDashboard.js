import React from "react";
import { MyResponsivePie } from "../components/piechart.js";

const data = [
  {
    id: "lisp",
    label: "lisp",
    value: 446,
    color: "hsl(93, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 57,
    color: "hsl(200, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 53,
    color: "hsl(49, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 186,
    color: "hsl(106, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 312,
    color: "hsl(235, 70%, 50%)",
  },
];

export const SortingDashboard = () => {
  return (
    <div>
      <MyResponsivePie data={data} />
    </div>
  );
};
