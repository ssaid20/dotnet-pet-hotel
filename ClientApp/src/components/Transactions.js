import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function Transactions() {
  const transactions = useSelector((store) => store.transactions);
  console.log(transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("api/Transaction")
      .then((response) =>
        dispatch({ type: "SET_TRANSACTIONS", payload: response.data })
      )
      .catch((error) => console.log("Error in set transactions", error));
  },[dispatch]);

  return (
    <>
      <table>
        <thead>
          <strong>Transactions</strong>
        </thead>
        <thead>
          <tr>
            <th>Description</th>
            <th>Time </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
