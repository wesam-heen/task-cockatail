import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useParams, Link } from "react-router-dom";
import { fetchSingleCocktail } from "../Redux/Slices/cocktailSlice";
import Spinner from "../Components/Shared/Spinner";
import { Container, Row } from "react-bootstrap";

const ProductDetails = () => {
  const { loading, cocktail } = useSelector((state) => ({ ...state.app }));
  const [modifedCoktails, setModifiedCoktails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleCocktail({ id }));
  }, [dispatch, id]);
  useEffect(() => {
    if (cocktail.length > 0) {
      const {
        idDrink: id,
        strDrink: name,
        strDrinkThumb: img,
        strAlcoholic: Alcoholic,
        strGlass: glass,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      } = cocktail[0];
      const ingredients = [
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
      ];
      const newCoktail = [id, name, img, Alcoholic, glass];
      setIngredients(ingredients);
      setModifiedCoktails(newCoktail);
    } else {
      setModifiedCoktails(null);
    }
  }, [id, cocktail]);
  if (!modifedCoktails) {
    return <Spinner />;
  } else {
    const [id, name, img, Alcoholic, glass] = modifedCoktails;
    const [ingredient1, ingredient2, ingredient3, ingredient4] = ingredients;
    return (
      <Layout>
        <Container>
          <Link to="/" className="btn btn-warning text-light my-3">
            Go Back
          </Link>
          <Row>
            <div className="col-md-5">
              <img
                src={img}
                alt="single-coktail"
                className="mw-100 rounded-5"
              />
            </div>
            <div className="col-md-2"></div>
            <div className="col-md-5 my-2">
              <p>Name: {name}</p>
              <p>Alcoholic : {Alcoholic}</p>
              <p>Glass : {glass}</p>
              <p> ingredients :</p>
              <div className="images-ingredients d-flex justify-content-center text-center flex-wrap">
                <div className="ingredient mw-25">
                  <p>{ingredient1}</p>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient1}-Medium.png`}
                    alt=""
                    width={150}
                  />
                </div>
                <div className="ingredient  mw-25">
                  <p> {ingredient2}</p>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient2}-Medium.png`}
                    alt=""
                    width={150}
                  />
                </div>
                <div className="ingredient  mw-25">
                  <p>{ingredient3}</p>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient3}-Medium.png`}
                    alt=""
                    width={150}
                  />
                </div>
                <div className="ingredient  mw-25">
                  <p>{ingredient4}</p>
                  <img
                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient4}-Medium.png`}
                    alt=""
                    width={150}
                  />
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </Layout>
    );
  }
};

export default ProductDetails;
