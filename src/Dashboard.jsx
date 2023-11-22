import React, { useState, useEffect } from "react";
import axios from "axios";
import { GraphData } from "./Graph";

const Dashboard = () => {
     const [screen2Data, setScreen2Data] = useState(null);
     const [charge, setCharge] = useState(null);

     const [categoryValues, setCategoryValues] = useState({
          category_6: "",
          category_7: "",
          category_8: "",
          category_9: "",
          category_10: "",
     });
     console.log("screen2Data", screen2Data);
     const fetchData = async (id) => {
          try {
               const response = await axios.get(
                    `https://stg.dhunjam.in/account/admin/${id}`
               );
               if (response.status === 200) {
                    setScreen2Data(response.data.data);
                    setCharge(response.data.data?.charge_customers);
                    setCategoryValues(response.data?.data?.amount);
               } else {
                    throw new Error("Failed to fetch data");
               }
          } catch (error) {
               console.error("Error fetching data:", error);
          }
     };
     useEffect(() => {
          const user = localStorage.getItem("user");
          const parsedData = JSON.parse(user);
          if (parsedData) {
               fetchData(parsedData?.id);
          }
     }, []);

     const handleInputChange = (event) => {
          const { name, value } = event.target;
          setCategoryValues({ ...categoryValues, [name]: value });
     };
     const handleCharge = (isChecked) => {
          setCharge(isChecked);
     };

     const handleUpdatePrices = async () => {
          const user = localStorage.getItem("user");
          const parsedData = JSON.parse(user);
          console.log("parsedData", parsedData);
          try {
               const response = await axios.put(
                    `https://stg.dhunjam.in/account/admin/${parsedData?.id}`,
                    {
                         amount: categoryValues,
                    }
               );
               if (response.status === 200) {
                    setScreen2Data(response.data.data);
                    setCategoryValues(response.data.data.amount);
                    await fetchData(parsedData?.id);
               } else {
                    throw new Error("Failed to update prices");
               }
          } catch (error) {
               console.error("Error updating prices:", error);
          }
     };

     const isEnabled = () => {
          if (charge) {
               if (
                    categoryValues.category_6 <= 99 &&
                    categoryValues.category_7 <= 79 &&
                    categoryValues.category_8 <= 59 &&
                    categoryValues.category_9 <= 39 &&
                    categoryValues.category_10 <= 19
               ) {
                    return false;
               } else {
                    return true;
               }
          }

          return false;
     };
     return (
          <div className="Dash">
               {screen2Data && (
                    <>
                         <span>
                              <h1>
                                   {screen2Data.name}, {screen2Data.location} On
                                   Dhunjam
                              </h1>
                         </span>
                         <span style={{ padding: 20 }}>
                              Do you want to charge your customers for
                              requesting songs?
                         </span>

                         <label>
                              <input
                                   type="radio"
                                   value="yes"
                                   checked={charge === true}
                                   onChange={() => handleCharge(true)}
                                   disabled={!screen2Data.charge_customers}
                              />
                              Yes
                         </label>
                         <label>
                              <input
                                   type="radio"
                                   value="no"
                                   checked={charge === false}
                                   onChange={() => handleCharge(false)}
                                   disabled={!screen2Data.charge_customers}
                              />
                              No
                         </label>
                    </>
               )}

               <div>
                    <span>Custom song request amount-</span>
                    <input
                         style={{ width: 200 }}
                         className="inp"
                         type="number"
                         name="category_6"
                         value={categoryValues.category_6}
                         onChange={handleInputChange}
                         disabled={!charge}
                    />
                    <br />
                    <span>Regular song request amount from high to low-</span>
                    <input
                         style={{ width: 60 }}
                         className="inp"
                         type="number"
                         name="category_7"
                         value={categoryValues.category_7}
                         onChange={handleInputChange}
                         disabled={!charge}
                    />
                    <input
                         style={{ width: 60 }}
                         className="inp"
                         type="number"
                         name="category_8"
                         value={categoryValues.category_8}
                         onChange={handleInputChange}
                         disabled={!charge}
                    />
                    <input
                         style={{ width: 60 }}
                         className="inp"
                         type="number"
                         name="category_9"
                         value={categoryValues.category_9}
                         onChange={handleInputChange}
                         disabled={!charge}
                    />
                    <input
                         style={{ width: 60 }}
                         className="inp"
                         type="number"
                         name="category_10"
                         value={categoryValues.category_10}
                         onChange={handleInputChange}
                         disabled={!charge}
                    />
               </div>

               <br />
               <br />
               {charge ? <GraphData chartData={categoryValues} /> : null}

               <button
                    onClick={handleUpdatePrices}
                    disabled={!isEnabled()}
                    style={{
                         width: 300,
                         background: isEnabled() ? "#6741d9" : "#a991fa",
                    }}
                    className="btn"
               >
                    Save
               </button>
          </div>
     );
};

export default Dashboard;
