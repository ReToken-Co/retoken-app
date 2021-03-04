import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import AssetContextProvider from "./context/AssetContext";

import Home from "./pages/Home/Home";
import AddAsset from './pages/AddAsset';

function App() {
  return (
    <>
      <AssetContextProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/add-asset' component={AddAsset} />
          </Switch>
          <Footer />
        </Router>
      </AssetContextProvider>
    </>
  );
}

export default App;
