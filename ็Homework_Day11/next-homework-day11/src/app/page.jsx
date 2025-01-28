"use client";

import React, { useState } from "react";
import getDataCustomers from "./action";

export default function page() {
  const [data, setData] = useState([]);

  // async function getData() {
  //   try {
  //     const result = await getDataCustomers(); // ใช้ await เพื่อดึงข้อมูล
  //     setData(result); // ตั้งค่าข้อมูลใน state
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }

  return (
    <>
      <div>Data customer</div>
      <button onClick={getData}>getDataCustomers</button>
      {data &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <div>{item.id}</div>
              <div>{item.customer_name}</div>
              <div>{item.address}</div>
              <div>{item.phone}</div>
            </div>
          );
        })}
    </>
  );
}
