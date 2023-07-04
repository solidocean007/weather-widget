import React from "react";
import DayCard from "./DayCard";
import DegreeToggle from "./DegreeToggle";
import { WEATHER_URL } from "../constants";
import WeatherService from "../services";

const weather = new WeatherService();

export default class ForecastContainer extends React.Component {
  state = {
    dailyData: [],
    loading: false,
    error: false,
    degreeType: "fahrenheit",
    windSpeedUnit: 'mph',
  };

  componentDidMount() {
    this.setState({ loading: true });

    weather.fetchFiveDayForecast()
      .then((res)=>{
        if(res && res.response.ok) {
          this.setState({ 
            dailyData: res.data, 
            loading: false,
          });
        } else {
          this.setState({loading: false});
        }
      },(error)=>{
        console.log(error);
        this.setState({ loading: false, error: true });
      })
    }

  updateWindSpeedUnit = event => this.setState({ windSpeedUnit: event.target.value});

  updateForecastDegree = ({ target: { value } }) =>
    this.setState({ degreeType: value });

  render() {
    const { loading, error, dailyData, degreeType } = this.state;
    return (
      <div className="container mt-1">
        <div className="display-1 jumbotron bg-secondary py-5 mb-5">
          5-Day Forecast
        </div>
        <h5 className="text-muted">Fayetteville NC, US</h5>
        <DegreeToggle updateForecastDegree={this.updateForecastDegree} degreeType={degreeType} />
        <div className="row justify-content-center">
          {!loading ? (
            dailyData.map((item) => (
              <DayCard key={item.dt} data={item} degreeType={degreeType} windSpeedUnit={this.state.windSpeedUnit} updateWindSpeedUnit={this.updateWindSpeedUnit}/>
            ))
          ) : (
            <div>Loading....</div>
          )}
        </div>
        {error && <h3 className="text-danger">Error loading data</h3>}
      </div>
    );
  }
}

