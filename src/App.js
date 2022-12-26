import "./App.css";
import {Routes,Route} from 'react-router-dom'
import HomePage from "./Pages/HomePage";
import ProductDetails from "./Pages/ProductDetails";
import PageNotFound from "./Components/PageNotFound";

function App() {
  return (
    <>
    <Routes>
       <Route path='/' element={<HomePage/>}/>
       <Route path='/products/:id' element={<ProductDetails/>}/>
       <Route path='*' element={<PageNotFound/>}/>
    </Routes>

    </>
  );
}

export default App;
