import React, { useState, useRef, useEffect, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function UnitDashboard() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "id",
      headerName: "#",
      filter: true,
      width: 60,
      cellStyle: { textAlign: "left" },
      pinned: "left",
      flex: 1,
      resizable: true,
    },
    {
      field: "FinalGrade",
      headerName: "ציון",
      filter: true,
      width: 60,
      cellStyle: { textAlign: "left" },
      flex: 0.3,
      resizable: true,
    },

    {
      field: "armyNumber",
      headerName: "מ.א",
      filter: true,
      width: 150,
      cellStyle: { textAlign: "left" },
      flex: 0.3,
      resizable: true,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "שם מלא",
      filter: true,
      valueGetter: ({ data }) => `${data.firstName} ${data.LastName}`,
      width: 150,
      cellStyle: { textAlign: "left" },
      flex: 0.3,
      resizable: true,
      editable: true,
    },
  ]);

  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
  }, []);

  useEffect(() => {
    fetchSoldierData();
  }, []);

  const fetchSoldierData = () => {
    fetch("http://localhost:3001/soldiers") // Replace with your backend API endpoint for fetching soldier data
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  };

  const handleCellValueChanged = (event) => {
    const { data, colDef, newValue } = event;
    const id = data.id;

    fetch(`http://localhost:3001/soldiers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ field: colDef.field, value: newValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Optional: Update the rowData state or fetch updated data from the server
        // and update the rowData state accordingly
        fetchSoldierData();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        // Handle any error that occurred during the update process
      });
  };

  useEffect(() => {
    fetch("http://localhost:3001/unitDashboard/unitDashboard")
      .then((response) => response.json())
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error("Error retrieving data:", error);
      });
  }, []);

  const buttonListenerDelete = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/unitDashboard/deleteData",
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        console.log("All data deleted successfully.");
      } else {
        console.error("Error deleting data:", res.status);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }, []);

  const buttonListenerCalculatingGrade = useCallback(async () => {
    try {
      const res = await fetch(
        "http://localhost:3001/unitDashboard/calculatingGrades",
        {
          method: "PUT",
        }
      );
      if (res.ok) {
        console.log("All Grades calculated successfully.");
      } else {
        console.error("Error calculating grade:", res.status);
      }
    } catch (error) {
      console.error("Error calculating grade:", error);
    }
  }, []);

  const CustomHeader = ({ displayName }) => (
    <div style={{ textAlign: "center", fontWeight: "bold" }}>{displayName}</div>
  );

  return (
    <div style={{ width: "100%", height: "605px" }}>
      <button className="tableBotton" onClick={buttonListenerDelete}>
        אפס טבלה
      </button>
      <button className="tableBotton" onClick={buttonListenerCalculatingGrade}>
        חשב ציונים
      </button>
      <div
        className="ag-theme-alpine ag-rtl"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="multiple"
          editType="fullRow"
          onCellValueChanged={handleCellValueChanged}
          onCellClicked={cellClickedListener}
          suppressSizeToFit={true}
          pagination={true}
          paginationPageSize={12}
          frameworkComponents={{
            customHeader: CustomHeader,
          }}
          headerHeight={40}
        />
      </div>
    </div>
  );
}
