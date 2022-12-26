import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCocktail = createAsyncThunk(
  "cocktail/fetchCocktail",
  async () => {
    return fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s"
    ).then((response) => response.json());
  }
);
export const fetchSingleCocktail = createAsyncThunk(
  "cocktail/fetchSingleCocktail",
  async ({ id }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then((response) => response.json());
  }
);
const cocktailSlice = createSlice({
  name: "cocktail",
  initialState: {
    loading: false,
    cocktails: [],
    error: null,
    cocktail: [],
  },
  reducers: {
    filterByCategory: (state, action) => {
      let filterByCategory = state.cocktails.filter((cocktail) => {
        return cocktail.strCategory === action.payload;
      });
      state.cocktails = filterByCategory;
    },
    filterByTypeOfDrink: (state, action) => {
      let filterByTypeOfDrink = state.cocktails.filter((cocktail) => {
        return cocktail.strAlcoholic === action.payload;
      });
      state.cocktails = filterByTypeOfDrink;
    },
    filterByTypeOfGlass: (state, action) => {
      let filterByTypeOfGlass = state.cocktails.filter((cocktail) => {
        return cocktail.strGlass === action.payload;
      });
      state.cocktails = filterByTypeOfGlass;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCocktail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCocktail.fulfilled, (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
    });
    builder.addCase(fetchCocktail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchSingleCocktail.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSingleCocktail.fulfilled, (state, action) => {
      state.loading = false;
      state.cocktail = action.payload.drinks;
    });
    builder.addCase(fetchSingleCocktail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { filterByCategory, filterByTypeOfDrink, filterByTypeOfGlass } =
  cocktailSlice.actions;
export default cocktailSlice.reducer;
