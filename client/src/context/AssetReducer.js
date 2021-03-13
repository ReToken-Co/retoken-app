import axios from "axios";

const AssetReducer = (state, action) => {
  switch (action.type) {

    case "GET_ASSETS":
      const assets = [];
      axios
        .get("/properties")
        .then((res) => {
          res.data.forEach((data) => {
            assets.push(data);
          });
//          console.log(`data ${JSON.stringify(assets)}`);
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return assets;

    case "GET_ASSET":
      console.log(`get assetid ${action.payload}`);
      axios
        .get(`/properties/${action.payload}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return {};

    case "ADD_ASSET":
      console.log(`b4 add ${JSON.stringify(action.payload)}`);
            axios
        .post(`/properties/add`, action.payload)
        .then((res) => {
          console.log(`add ${JSON.stringify(res.data)}`);
          return res.data;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
        return {};

    case "UPDATE_ASSET":
      axios
        .put(`/properties/update/${action.payload.id}`, action.payload)
        .then((res) => {
          console.log(`update ${JSON.stringify(res.data)}`);
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

export default AssetReducer