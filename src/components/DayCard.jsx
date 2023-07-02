import React from "react";
import moment from "moment/moment";

import PropTypes from 'prop-types';

// Rest of your component...




 const DayCard = ({ data }) => {
  const { temp, dt, imgId, desc } = data;
  console.log(imgId, ' : imgId')

  DayCard.propTypes = {
    data: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      dt: PropTypes.number.isRequired,
      imgId: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    }).isRequired,
  };

  const newDate = new Date();
  newDate.setTime(dt * 1000);

  const icon = `owf owf-5zx owf-${imgId} `

  return (
    <div className="col-sm-2">
      <div className="card">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={icon}/>
        <h2>{Math.round(temp)}F</h2>
        <div className="card-body">
          <p className="card-text">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default DayCard;