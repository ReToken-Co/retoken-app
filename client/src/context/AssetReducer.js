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
          console.log(`getAssets ${assets}`);
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return assets;
/*
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
      return state;
*/
    case "ADD_ASSET":
//      console.log(`b4 add ${JSON.stringify(action.payload)}`);
      axios
        .post(`/properties/add`, action.payload)
        .then((res) => {
          console.log(`new property added ${JSON.stringify(res.data)}`);

          // update state
          const newAssets = [...state, res.data];
          console.log(`new assets ${newAssets}`);
          return newAssets;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return state;

    case "UPDATE_ASSET":
      axios
        .put(`/properties/update/${action.payload.id}`, action.payload)
        .then((res) => {
          console.log(`Property Updated ${JSON.stringify(res.data)}`);

          // update state
          const updateAssets = state.map(asset => {
            if (asset._id === res.data._id)
              return res.data;
            return asset;
          })
          console.log(`UpdatedAssets ${updateAssets.length}`);
          return updateAssets;
        })
        .catch((err) => {
          console.log(`Error retrieving data ${err}`);
        });
      return state;

    default:
      return state;
  }
};

export default AssetReducer;
