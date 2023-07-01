import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_URL } from "../constants";

export default class ForecastContainer extends React.Component {
  async componentDidMount() {
    try {
      const response = await fetch(WEATHER_URL);
      const json = await response.json();
      console.log(json);
    } catch (err) {
      console.error("There was an error", err);
    }
  }
  render() {
    return (
      <div>
        <div>Forecast Container</div>
        <DegreeToggle />
        <DayCard />
      </div>
    );
  }
}
