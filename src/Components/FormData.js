import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "./form.css";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  filterByCategory,
  filterByTypeOfDrink,
  filterByTypeOfGlass,
} from "../Redux/Slices/cocktailSlice";
const Form = () => {
  const [categories, setCategories] = useState();
  const [glass, setGlass] = useState();
  const [Alcoholic, setAlcoholic] = useState();
  const dispatch = useDispatch();
  const fetchCategories = async () => {
    const fetchData = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    );
    const categories = await fetchData.json();
    categories && setCategories(categories.drinks);
  };
  const fetchGlass = async () => {
    const fetchData = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"
    );
    const glass = await fetchData.json();
    glass && setGlass(glass.drinks);
  };
  const fetchAlcoholic = async () => {
    const fetchData = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
    );
    const Alcoholic = await fetchData.json();
    Alcoholic && setAlcoholic(Alcoholic.drinks);
  };
  useEffect(() => {
    fetchCategories();
    fetchGlass();
    fetchAlcoholic();
  }, []);

  const { cocktails } = useSelector((state) => ({
    ...state.app,
  }));
  const [drinkStatus, setDrinkStatus] = useState(false);
  const [glassStatus, setGlassStatus] = useState(false);
  return (
    <>
      <Container>
        <form className="form-search">
          <div className="item">
            <label>Name of cocktail bar</label>
            <input type="text" placeholder="Name of cocktail bar" required />
          </div>
          <div className="item">
            <label>First name of owner</label>
            <input type="text" placeholder="First name of owner" required />
          </div>
          <div className="item">
            <label>Last name of owner</label>
            <input type="text" placeholder="Last name of owner" required />
          </div>
          <div className="item">
            <label>Phone number</label>
            <input type="text" placeholder="Phone number" required />
          </div>
          <div className="item">
            <label>Email address </label>
            <input type="email" placeholder="Email address " required />
          </div>
          <div className="item" id="Category">
            <label htmlFor="cocktails">Category </label>
            <select
              name="cocktails"
              onChange={(e) => {
                setDrinkStatus(true);
                dispatch(filterByCategory(e.target.value));
              }}
            >
              <option value="" disabled selected>
                Select Category
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
            </select>
          </div>
          {drinkStatus && (
            <div className="item" id="drink">
              <label htmlFor="drink">Type of drink </label>
              <select
                name="drink"
                onChange={(e) => {
                  setGlassStatus(true);
                  dispatch(filterByTypeOfDrink(e.target.value));
                }}
              >
                <option value="" disabled selected>
                  Type of drink
                </option>
                {Alcoholic &&
                  Alcoholic.map((Alcoholic) => (
                    <option key={Alcoholic.strAlcoholic}>
                      {Alcoholic.strAlcoholic}
                    </option>
                  ))}
              </select>
            </div>
          )}
          {glassStatus && (
            <div className="item" id="glass">
              <label htmlFor="glass ">Type of glass </label>
              <select
                name="glass "
                onChange={(e) => {
                  return dispatch(filterByTypeOfGlass(e.target.value));
                }}
              >
                <option value="" disabled selected>
                  Type of glass
                </option>
                {glass &&
                  glass.map((glass) => (
                    <option key={glass.strGlass}>{glass.strGlass}</option>
                  ))}
              </select>
            </div>
          )}
        </form>
      </Container>
    </>
  );
};

export default Form;
