// FeatureItem.jsx
import React from 'react';

const FeatureItem = ({ iconSrc, title, description }) => {
  const divStyle = {
    backgroundImage: `url(${iconSrc})`,
  };

  return (
    
    <div className="feature-item" >
        <div className="icone_home" style={divStyle}> </div>
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureItem;
