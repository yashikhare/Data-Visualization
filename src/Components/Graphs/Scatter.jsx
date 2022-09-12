import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import data from "../../Wine-Data.json";

function Scatter() {
  const [scatterX_axisData, setScatterx_Data] = useState([]);
  const [scatterY_axisData, setScatterY_Data] = useState([]);

  useEffect(() => {
    let xAxisData = [];
    let yAxisData = [];
    for (let i = 0; i < data.length; i++) {
      xAxisData.push(data[i]["Color intensity"]);
      yAxisData.push(data[i]["Hue"]);
    }
    setScatterx_Data(xAxisData);
    setScatterY_Data(yAxisData);
  }, []);
  return (
    <ReactEcharts
      option={{
        xAxis: {
          data: scatterX_axisData,
          name: "Color intensity",
          nameLocation: "middle",
          nameGap: 50,
        },
        
        yAxis: {
          name: "Hue",
          nameLocation: "middle",
          nameGap: 50,
        },
        series: [
          {
            data: scatterY_axisData,
            type: "scatter",
          },
        ],
      }}
    />
  );
}
export default Scatter;
