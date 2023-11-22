import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const GraphData = ({ chartData }) => {
     const canvasRef = useRef(null);

     useEffect(() => {
          const ctx = canvasRef.current.getContext("2d");

          const data = {
               labels: [
                    "Custom",
                    "Category 7",
                    "Category 8",
                    "Category 9",
                    "Category 10",
               ],
               datasets: [
                    {
                         data: Object.values(chartData).map(Number),
                         backgroundColor: [
                              "#F0C3F1",
                              "#F0C3F1",
                              "#F0C3F1",
                              "#F0C3F1",
                              "#F0C3F1",
                         ],
                         borderColor: [
                              "rgba(255, 99, 132, 1)",
                              "rgba(54, 162, 235, 1)",
                              "rgba(255, 206, 86, 1)",
                              "rgba(75, 192, 192, 1)",
                              "rgba(153, 102, 255, 1)",
                         ],
                         borderWidth: 1,
                    },
               ],
          };

          const options = {
               scales: {
                    y: {
                         title: {
                              font: {
                                   size: 50,
                              },
                              display: true,
                              text: "",
                         },
                    },
               },
               plugins: {
                    legend: {
                         display: false,
                    },
               },
          };

          const chart = new Chart(ctx, {
               type: "bar",
               data: data,
               options: options,
          });

          return () => {
               chart.destroy();
          };
     }, [chartData]);

     return (
          <div>
               <canvas ref={canvasRef} width="600" height="250"></canvas>
          </div>
     );
};

export { GraphData };
