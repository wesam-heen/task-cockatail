import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux/es/exports";
import FormData from "../Components/FormData";
import {
  fetchCocktail,
  fetchSingleCocktail,
} from "../Redux/Slices/cocktailSlice";
import Spinner from "../Components/Shared/Spinner";
import { Container, Row, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { loading, cocktails, error } = useSelector((state) => ({
    ...state.app,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCocktail());
  }, []);

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <Layout>
      <FormData />
      <Container>
        <Row>
          {cocktails &&
            cocktails.map((cocktail) => {
              return (
                <div className="col-md-3 my-2" key={cocktail.idDrink}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={cocktail.strDrinkThumb} />
                    <Card.Body>
                      <Card.Text>{cocktail.strDrink}</Card.Text>
                      <Card.Text>Category: {cocktail.strCategory}</Card.Text>
                      <Card.Text>Glass: {cocktail.strGlass}</Card.Text>
                      <Card.Text>
                        Type of Drink : {cocktail.strAlcoholic}
                      </Card.Text>
                      <Link
                        to={`/products/${cocktail.idDrink}`}
                        className="btn btn-warning text-light"
                      >
                        More Details
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          <div
            className="btn btn-success"
            onClick={() => {
              dispatch(fetchCocktail());
            }}
          >
            Get All Cocktails
          </div>
        </Row>
      </Container>
    </Layout>
  );
};

export default HomePage;
