import React from 'react';
import './MainEvent.css';

interface MainEventProps {
  title: string;
  duration?: string;
  numOfChildEvents?: number;
  gradient: string;
  onOptionsClick: () => void;
}

const MainEvent: React.FC<MainEventProps> = ({ title, duration, numOfChildEvents, gradient, onOptionsClick }) => {
  return (
    <div className="main-event-card" style={{ background: gradient }}>
      <div className="main-event-title">{title}</div>
      {duration && <div className="main-event-duration">{duration}</div>}
      {numOfChildEvents && <div className="main-event-count">{numOfChildEvents} Events</div>}
      <div className="main-event-options" onClick={onOptionsClick}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default MainEvent;
