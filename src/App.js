import React, { useState, useEffect } from "react";
import "./Style/main.css"; // Importing main CSS file
import { GiShoppingBag } from "react-icons/gi"; // Importing a shopping bag icon
import RatingStars from "./components/RatingStars"; // Importing the RatingStars component
import ShoppingCart from "./components/shop"; // Importing the ShoppingCart component


// Array of product objects
const products = [
  {
    id: 1,
    name: "McBook Air",
    rating: 4.3,
    description: "2023 Mcbook Air with all new M2 chip  and up to 8GB RAM.",
    price: 1399,
    image: require("./images/1pro.jpg"),
  },
  {
	id: 2,
	name: "Apple Iphone13",
	rating: 4.2,
	description:
		"Iphone 13 now available in new colours.",
	price: 559,
	image: require("./images/2pro.jpg"),
},
{
	id: 3,
	name: "Samsung S21",
	rating: 2.9,
	description:
		"All new s21 with latest and greatest soc 888",
	price: 499,
	image: require("./images/3pro.jpg"),
},
{
	id: 4,
	name: "Samsung S24 Ultra",
	rating: 4.8,
	description:
		"The most powerful mobile phone now with Ai.",
	price: 1899,
	image: require("./images/4pro.jpg"),
},
{
	id: 5,
	name: "Apple Ipad Mini",
	rating: 4.5,
	description:
		"The smallest yet most powerfull tablet with our new M1 chip .",
	price: 851,
	image: require("./images/5pro.jpg"),
},
{
	id: 6,
	name: "Apple Ipad pro !@.9",
	rating: 4.8,
	description:
		" With our new M2chip onboard our new ipad",
	price: 149,
	image: require("./images/6pro.jpg"),
},// More product objects...
];

function App() {
  // State for managing cart visibility
  const [cartsVisibilty, setCartVisible] = useState(false);
  // State for managing products in the cart, initialized from localStorage or an empty array
  const [productsInCart, setProducts] = useState(JSON.parse(localStorage.getItem("shopping-cart")) || []);

  // useEffect to update localStorage whenever productsInCart changes
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  // Function to add a product to the cart
  const addProductToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setProducts([
      ...productsInCart,
      newProduct,
    ]);
  };

  // Function to handle quantity change for a product in the cart
  const onQuantityChange = (productId, count) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === productId);
      if (productsIndex !== -1) {
        oldState[productsIndex].count = count;
      }
      return [...oldState];
    });
  };

  // Function to remove a product from the cart
  const onProductRemove = (product) => {
    setProducts((oldState) => {
      const productsIndex = oldState.findIndex((item) => item.id === product.id);
      if (productsIndex !== -1) {
        oldState.splice(productsIndex, 1);
      }
      return [...oldState];
    });
  };

  return (
    <div className="App">
      {/* ShoppingCart component */}
      <ShoppingCart
        visibilty={cartsVisibilty}
        products={productsInCart}
        onClose={() => setCartVisible(false)}
        onQuantityChange={onQuantityChange}
        onProductRemove={onProductRemove}
      />
      {/* Navbar */}
      <div className="navbar">
        <h3 className="logo">Better than amazon</h3>
        {/* Button to toggle visibility of ShoppingCart */}
        <button className="btn shopping-cart-btn" onClick={() => setCartVisible(true)}>
          <GiShoppingBag size={24} />
          {/* Display number of products in cart if there are any */}
          {productsInCart.length > 0 && (
            <span className="product-count">{productsInCart.length}</span>
          )}
        </button>
      </div>
      {/* Main section displaying products */}
      <main>
        <h2 className="title">Products</h2>
        <div className="products">
          {/* Map through products array to display each product */}
          {products.map((product) => (
            <div className="product" key={product.id}>
              {/* Display product image */}
              <img className="product-image" src={product.image} alt={product.image} />
              <h4 className="product-name">{product.name}</h4>
              {/* Display product rating using RatingStars component */}
              <RatingStars rating={product.rating} />
              <p>{product.description}</p>
              <span className="product-price">{product.price}$</span>
              <div className="buttons">
                {/* Button to view product details */}
                <button className="btn">Detail</button>
                {/* Button to add product to cart */}
                <button className="btn" onClick={() => addProductToCart(product)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
