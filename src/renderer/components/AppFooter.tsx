import React from 'react';
import { CFooter } from '@coreui/react';
import { getSoftwareDetails } from 'renderer/utils/api.utils';

const AppFooter = () => {
  const [softwareDetails, setSoftwareDetails] = React.useState({ a: 10 });

  React.useEffect(() => {
    getSoftwareDetails().then((resp) => {
      console.log(resp);
      setSoftwareDetails(resp);
      Object.keys(resp).forEach((key, index) => {
        console.log(key);
      });
    });
  }, []);
  return (
    <CFooter>
      <div>
        <a href={softwareDetails?.website} target="_blank" rel="noopener noreferrer">
          {softwareDetails?.name}
        </a>
        <span className="ms-1">&copy; { (new Date()).getFullYear()} {softwareDetails?.company}</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href={softwareDetails?.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {softwareDetails?.author}
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
