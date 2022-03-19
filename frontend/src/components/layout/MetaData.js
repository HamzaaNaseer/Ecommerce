import React from "react";
import Helmet from "react-helmet";



//whatever the title is passed will be used as title on that page 
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaData;
