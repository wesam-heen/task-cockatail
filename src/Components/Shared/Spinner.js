import React from "react";
import { Spinner } from "react-bootstrap";
const SpinnerAnm = () => {
  return (
    <div className="loader d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="secondary"> 
        <span className="sr-only"></span>
      </Spinner>
    </div>
  );
};

export default SpinnerAnm;
