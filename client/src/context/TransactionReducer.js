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
          transactions.sort(function (a, b) {
            return parseInt(a.transactionDate) - parseInt(b.transactionDate);
            //          console.log(`data ${JSON.stringify(transactions)}`);
          });
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return transactions;
    /*
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
*/
    case "GET_TX_BY_USER":
      console.log(`get TxbyUser ${action.payload}`);
      axios
        .get(`/transactions/findTxByUser`, {
          params: { investor: action.payload },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return state;

    case "GET_TX_BY_PROPERTY":
      console.log(`get TxbyPpty ${action.payload}`);
      axios
        .get(`/transactions/findTxByAsset`, {
          params: { propertyId: action.payload },
        })
        .then((res) => {
          let i = 1
          res.data.map((_data) => {
            _data.id = i
            i++
          })
        console.log(`Get TxbyPpty result ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return state;

    case "ADD_TRANSACTION":
      axios
        .post(`/transactions/add`, action.payload)
        .then((res) => {
          console.log(`Transaction added ${JSON.stringify(res.data)}`);

          // update state
          const newTransactions = [...state, res.data];
          console.log(`new assets ${newTransactions}`);
          return newTransactions;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return state;

    case "UPDATE_TRANSACTION":
      axios
        .put(`/transactions/update/${action.payload.id}`, action.payload)
        .then((res) => {
          console.log(`Transaction updated ${JSON.stringify(res.data)}`);

          // update state
          const updateTransactions = state.map((transaction) => {
            if (transaction._id === res.data._id) return res.data;
            return transaction;
          });
          console.log(`UpdatedTxs ${updateTransactions.length}`);
          return updateTransactions;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return state;

    default:
      return state;
  }
};

export default TransactionReducer;
