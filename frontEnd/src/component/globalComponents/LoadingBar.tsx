import React from 'react';
import '../../styles/global/LoadingBar.sass';

const LoadingBar: React.FC = () => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar">
        <div className="loading-bar-progress"></div>
      </div>
    </div>
  );
};

export default LoadingBar; 