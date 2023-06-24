import React, { useState } from "react";

export const ParameterPage = () => {
  const [parameters, setParameters] = useState(Array(8).fill(""));
  const [clickedIndices, setClickedIndices] = useState([]);

  const handleClick = (index) => {
    const newParameters = [...parameters];
    const newClickedIndices = [...clickedIndices];

    if (newClickedIndices.includes(index)) {
      newClickedIndices.splice(0, newClickedIndices.length);
      newParameters.fill("");
    } else {
      const newIndex = newClickedIndices.length + 1;
      newClickedIndices.push(index);
      newParameters[index] = `${getParameterName(index)} - ${newIndex}`;
    }

    setParameters(newParameters);
    setClickedIndices(newClickedIndices);
  };

  const handleSubmit = () => {
    const data = {
      parameters: parameters.filter((parameter) => parameter !== ""), // Exclude empty parameters
    };

    fetch("your-backend-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Parameters sent successfully");
          setParameters(Array(8).fill(""));
          setClickedIndices([]);
        } else {
          console.log("Failed to send parameters");
        }
      })
      .catch((error) => {
        console.log("Error sending parameters:", error);
      });
  };

  const getParameterName = (index) => {
    switch (index) {
      case 0:
        return "איכות";
      case 1:
        return 'קב"א';
      case 2:
        return "דפר";
      case 3:
        return "מתאם";
      case 4:
        return "סימול עברית";
      case 5:
        return 'ציון ת"ש';
      case 6:
        return "מדד סוציו אקונומי";
      case 7:
        return 'ית"ש';
      default:
        return `Parameter ${index + 1}`;
    }
  };

  return (
    <div>
      <h2 className="parameter">:סדר חשיבויות</h2>
      <h3 className="parameter1">
        לחץ על הקריטוריונים החשובים ביותר לפי הסדר{" "}
      </h3>
      <div className="parameter-container">
        {parameters.map((parameter, index) => (
          <button
            key={index}
            className="parameter-button"
            onClick={() => handleClick(index)}
          >
            {parameter ? parameter : getParameterName(index)}
          </button>
        ))}
      </div>
      <div className="submit-container">
        {parameters.every((parameter) => parameter !== "") && (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
