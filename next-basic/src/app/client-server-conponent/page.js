"use client";

import React, { useState, useEffect } from "react";
import { submitForm } from "./action";

export default function Page() {
  const [userState, setUserState] = useState([]);

  useEffect(() => {
    const initUsers = async () => {
      try {
        const users = await getUsers();
        setUserState(users);
      } catch (error) {
        console.error(error);
      }
    };

    initUsers();
  }, []);

  return (
    <div>
      <ul>
        {userState.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <form action={submitForm}>
        id: <input type="text" name="id" />
        customer_name: <input type="text" name="customer_name" />
        address: <input type="text" name="address" />
        phone: <input type="text" name="phone" />
        <button>Submit</button>
      </form>
    </div>
  );
}
