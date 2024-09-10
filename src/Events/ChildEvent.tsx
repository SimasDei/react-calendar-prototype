import React from 'react';
import './ChildEvent.css';

interface ChildEventProps {
  title: string;
  duration?: string;
  gradient: string;
}

const ChildEvent: React.FC<ChildEventProps> = ({ title, duration, gradient }) => {
  return (
    <div className="child-event-card" style={{ background: gradient }}>
      <div className="child-event-content">
        <div className="child-event-title">{title}</div>
        {duration && (
          <div className="child-event-duration">
            {duration} <span className="flag-icon">🚩</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChildEvent;
