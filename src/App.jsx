import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Garage from "./components/Garage";
import CarDetails from "./components/CarDetails"; 
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Garage} />
        <Route path="/car/:registrationNumber" component={CarDetails} />
      </Switch>
      <Analytics />
      <SpeedInsights />
    </Router>
  );
}

export default App;
