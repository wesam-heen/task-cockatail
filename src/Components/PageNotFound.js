import React from "react";
import Layout from "./Layout";
import NotFound from "../assests/NotFound.png";
import { Container } from "react-bootstrap";
const PageNotFound = () => {
  return (
    <Layout>
      <Container className="d-flex justify-content-center">
        <img
          src={NotFound}
          alt="Not Found"
          style={{ maxHeight: "75vh", maxWidth: "100%" }}
        />
      </Container>
    </Layout>
  );
};

export default PageNotFound;
