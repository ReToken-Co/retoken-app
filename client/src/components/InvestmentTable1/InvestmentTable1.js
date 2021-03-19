import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";

const columns = [
  {
    field: "transactionDate",
    headerName: "Transaction Date",
    type: "date",
    width: 190,
  },
  { field: "investor", headerName: "Investor", width: 330 },
  {
    field: "noOfToken",
    headerName: "No of Token",
    type: "number",
    width: 130,
  },
  {
    field: "transactionHash",
    headerName: "Transaction Hash",
    width: 330,
    sortable: false,
    renderCell: (params) => (
      <a target='_blank' 
        href={`https://rinkeby.etherscan.io//tx/${params.getValue("transactionHash")}`} 
      >
        {params.getValue("transactionHash")}
      </a>
    ),
  },
];

export default function InvestmentTable1 (props) {

  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    const getTransaction = async () => {
      if (props.id) {
        axios
          .get(`/transactions/findTxByAsset`, {
            params: { propertyId: props.id },
          })
          .then((res) => {
            let i = 1
            res.data.map((_data) => {
              _data.id = i
              i++
            })
            setTransaction(res.data);
          })
          .catch((err) => {
            console.log(`Error retrieving data ${err}`);
          });
      }
    };
    getTransaction();
  }, [props.id]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
