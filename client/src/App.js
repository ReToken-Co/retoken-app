import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import AssetContextProvider from "./context/AssetContext";

import Home from "./pages/Home/Home";
import AddAsset from "./pages/AddAsset";
import Marketplace from "./pages/Marketplace";
import Asset from "./pages/Asset";

function App() {
  return (
    <>
      <AssetContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/addasset" component={AddAsset} />
            <Route path="/marketplace" exact component={Marketplace} />
            <Route path="/asset" exact component={Asset} />
            <Route path="/asset/:id" component={Asset} />
          </Switch>
          <Footer />
        </Router>
      </AssetContextProvider>
    </>
  );
}

export default App;
