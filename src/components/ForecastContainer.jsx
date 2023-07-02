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
            imgId: item.weather[0].id,
            desc: item.weather[0].description,
          }));
        this.setState({ dailyData: data, loading: false });
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
      <div className="container mt-5">
        <div className="display-1 jumbotron bg-secondary py-5 mb-5">5-Day Forecast</div>
        <h5 className="text-muted">Fayetteville NC, US</h5>
        <DegreeToggle />
        <div className="row justify-content-center">
          {!loading ? (
            dailyData.map((item) => <DayCard key={item.dt} data={item} />)
          ) : (
            <div>Loading....</div>
          )}
        </div>
        {error && <h3 className="text-danger">Error loading data</h3>}
      </div>
    );
  }
}
