import React from "react";
import moment from "moment/moment";
import PropTypes from "prop-types";

const DayCard = ({ data, degreeType, windSpeedUnit, updateWindSpeedUnit }) => {
  const { temp, dt, imgId, desc, feels, humidity, windSpeed } = data;

  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-5zx owf-${imgId}`;

  const fahrenheit = Math.round(temp);
  const celsius = Math.round((fahrenheit - 32) * (5 / 9));

  const windSpeedMph = windSpeed;
  const windSpeedKph = Math.round(windSpeedMph * 1.60934);
  const displayWindSpeed = windSpeedUnit === "mph" ? windSpeedMph : windSpeedKph;

  return (
    <div className="col-sm-2">
      <div className="card p-3">
        <h3 className="card-title">{moment(newDate).format("dddd")}</h3>
        <p className="text-muted">
          {moment(newDate).format("MMMM Do, h:mm a")}
        </p>
        <i className={icon} />
        <h2>
          {degreeType === "celsius" ? `${celsius} °C` : `${fahrenheit} °F`}
        </h2>
        <div className="card-body">
          <p className="card-text">{desc}</p>
          <p className="card-text">{humidity}: humidity</p>
          <p className="card-text">{feels}: feels like</p>
          <p className="card-text">{displayWindSpeed}: wind speed ({windSpeedUnit})</p>
          <select
            value={windSpeedUnit}
            onChange={updateWindSpeedUnit}
          >
            <option value="mph">Miles per hour</option>
            <option value="kph">Kilometers per hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

DayCard.propTypes = {
  data: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    dt: PropTypes.number.isRequired,
    imgId: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    feels: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired,
  }).isRequired,
  degreeType: PropTypes.string.isRequired,
  windSpeedUnit: PropTypes.string.isRequired,
  updateWindSpeedUnit: PropTypes.func.isRequired,

};

export default DayCard;
