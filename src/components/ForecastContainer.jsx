import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_URL } from "../constants";

export default class ForecastContainer extends React.Component {
  state = {
    dailyData: [],
    loading: false,
    error: false,
  };
  async componentDidMount() {
    this.setState({ loading: true });
    try {
      const response = await fetch(WEATHER_URL);
      if (response.ok) {
        const json = await response.json();
        const data = json.list
          .filter((day) => day.dt_txt.includes("00:00:00"))
          .map((item) => ({
            temp: item.main.temp,
            dt: item.dt,
            date: item.dt_txt,
            imgId: item.weather[0].icon,
            desc: item.weather[0].description,
          }));
        this.setState({ dailyData:data, loading: false });
      } else {
        this.setState({ loading: false, error: true });
      }
    } catch (err) {
      console.error("There was an error", err);
    }
  }
  render() {
    const { loading, error, dailyData } = this.state;
    return (
      <div>
        <div>Forecast Container</div>
        <DegreeToggle />
        {!loading? dailyData.map((item) => (
          <DayCard key={item.dt} data={item}/>
        )): <div>Loading....</div>}
      </div>
    )
  }
}
