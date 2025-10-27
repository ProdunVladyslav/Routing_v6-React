import React, { useEffect } from "react";
import "./ProductList.css";
import ProductItem from "./ProductItem/ProductItem";
import { useGoods } from "../../../contexts/GoodContext";
import { v4 as uuid } from "uuid";

// mock products (shape from API / demo)
const seedProducts = [
  {
    id: uuid(),
    title: "Good 1 Example",
    price: "10",
    currency: "EUR",
    caption:
      "fjghdshfghdsfghbdfgdhbfgjhdjgjdsfgdshfgdsfhg dsg dsfgdfgdfgdgdfgd",
  },
  {
    id: uuid(),
    title: "Good 2 Example",
    price: "100",
    currency: "USD",
    caption: "sample good the best seller and so on",
  },
  {
    id: uuid(),
    title: "Good 123456 Example",
    price: "780",
    currency: "UAH",
    caption:
      "sample good the best sellersdfsdfsdfsdfsdf and so on",
  },
];

function ProductList() {
  const { state, dispatch } = useGoods();

  return (
    <div className="productListWrapper">
        <h1>Available Goods</h1>
      <div className="productListContainer">
        {state.goods.map((good) => (
          <ProductItem
            key={good.id}
            product={{
              id: good.id,
              title: good.name,
              price: String(good.price),
              currency: good.currency,
              caption: good.description ?? "",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
