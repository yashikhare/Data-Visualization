import React, { useState, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import data from "../../Wine-Data.json";

function Bar() {
  const [barX_axisData, setbarX_axisData] = useState([]);
  const [barY_axisData, setbarY_axisData] = useState([]);

  function getGroupedData(data, whitelist) {
    // Calculate the sums and group data (while tracking count)
    const reduced = data.reduce(function (m, d) {
      if (!m[d.Alcohol]) {
        m[d.Alcohol] = { ...d, count: 1 };
        return m;
      }
      whitelist.forEach(function (key) {
        m[d.Alcohol][key] += d[key];
      });
      m[d.Alcohol].count += 1;
      return m;
    }, {});

    // Create new array from grouped data and compute the average
    return Object.keys(reduced).map(function (k) {
      const item = reduced[k];
      const itemAverage = whitelist.reduce(function (m, key) {
        m[key] = item[key] / item.count;
        return m;
      }, {});
      return {
        ...item, // Preserve any non white-listed keys
        ...itemAverage, // Add computed averege for whitelisted keys
      };
    });
  }

  useEffect(() => {
    let xAxisData = [];
    let yAxisData = [];
    let res = getGroupedData(data, ["Malic Acid"]);
    for (let i = 0; i < res.length; i++) {
      xAxisData.push("Alcohol" + res[i]["Alcohol"]);
      yAxisData.push(res[i]["Malic Acid"]);
    }
    setbarX_axisData(xAxisData);
    setbarY_axisData(yAxisData);
    console.log("res", res);
  }, []);

  return (
    <ReactEcharts
      option={{
        xAxis: {
          data: barX_axisData,
          name: "Alcohol",
          nameLocation: "middle",
          nameGap: 50,
        },
        yAxis: {
          name: "Average of malic acid",
          nameLocation: "middle",
          nameGap: 50,
        },

        series: [
          {
            data: barY_axisData,
            type: "bar",
          },
        ],
      }}
    />
  );
}
export default Bar;
