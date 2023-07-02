import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_URL } from "../constants";

export default class ForecastContainer extends React.Component {
  async componentDidMount() {
    try {
      const response = await fetch(WEATHER_URL);
      if(response.ok) {
        const json = await response.json();
        const data = json.list
          .filter(day => day.dt_txt.includes("00:00:00"))
          .map(item => ({
            temp: item.main.temp,
            dt: item.dt,
            date: item.dt_txt,
            imgId: item.weather[0].icon, 
            desc: item.weather[0].description,
          }));
          console.log(data);
      } else {
        // do something
      }
      
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
