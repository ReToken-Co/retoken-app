import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContractContextProvider from "./context/ContractContext";
import AssetContextProvider from "./context/AssetContext";
import UserContextProvider from "./context/UserContext";

import Home from "./pages/Home/Home";
import AddAsset from "./pages/AddAsset";
import Marketplace from "./pages/Marketplace";
import Asset from "./pages/Asset";
import Admin from "./pages/Admin";
import EditAsset from "./pages/EditAsset";
import MyPortfolio from "./pages/MyPortfolio/MyPortfolio";
import Investments from "./pages/Investments/Investments";
import Account from "./pages/Account/Account";
import Settings from "./pages/Settings/Settings";

function App() {
  return (
    <>
      <UserContextProvider>
        <AssetContextProvider>
          <ContractContextProvider>
            <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/addasset" component={AddAsset} />
                <Route path="/admin" component={Admin} />
                <Route path="/marketplace" exact component={Marketplace} />
                <Route path="/asset" exact component={Asset} />
                <Route path="/asset/:id" component={Asset} />
                <Route path="/editasset" component={EditAsset} />
                <Route path="/myPortfolio" component={MyPortfolio} />
                <Route path="/investments" component={Investments} />
                <Route path="/account" component={Account} />
                <Route path="/settings" component={Settings} />
              </Switch>
            </Router>
          </ContractContextProvider>
        </AssetContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
