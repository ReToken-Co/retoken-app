import axios from "axios";

const TransactionReducer = (state, action) => {
  switch (action.type) {
    case "GET_TRANSACTIONS":
      const transactions = [];
      axios
        .get("/transactions")
        .then((res) => {
          res.data.forEach((data) => {
            transactions.push(data);
          });
          //          console.log(`data ${JSON.stringify(transactions)}`);
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return transactions;

    case "GET_TRANSACTION":
      console.log(`get TxbyId ${action.payload}`);
      axios
        .get(`/transactions/${action.payload}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return {};

    case "GET_TX_BY_USER":
      console.log(`get TxbyUser ${action.payload}`);
      axios
        .get(`/transactions/findTxByUser`,
                { params: { investor: action.payload } })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return {};

    case "GET_TX_BY_PROPERTY":
      console.log(`get TxbyPpty ${action.payload}`);
      axios
        .get(`/transactions/findTxByAsset`,
                  { params: { propertyId: action.payload } })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return {};

    case "ADD_TRANSACTION":
      console.log(`b4 add ${JSON.stringify(action.payload)}`);
      axios
        .post(`/transactions/add`, action.payload)
        .then((res) => {
          console.log(`add ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return {};

    case "UPDATE_TRANSACTION":
      axios
        .put(`/transactions/update/${action.payload.id}`, action.payload)
        .then((res) => {
          console.log(`Updated ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return {};

    default:
      return state;
  }
};

export default TransactionReducer;
