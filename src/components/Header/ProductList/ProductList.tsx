import React, { useEffect, useState } from "react";
import "./ProductList.css";
import ProductItem from "./ProductItem/ProductItem";
import { useGoods } from "../../../contexts/GoodContext";
import { v4 as uuid } from "uuid";

function ProductList() {
  const { state } = useGoods();
  const [search, setSearch] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("ALL");

  // derive filtered goods
  const filteredGoods = state.goods.filter((good) => {
    const matchesSearch =
      good.name.toLowerCase().includes(search.toLowerCase()) ||
      good.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCurrency =
      currencyFilter === "ALL" || good.currency === currencyFilter;
    return matchesSearch && matchesCurrency;
  });

  return (
    <section className="wrapperWrapper">
      <h1>Available Goods</h1>

      {/* Filter controls */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search goods..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />

        <select
          value={currencyFilter}
          onChange={(e) => setCurrencyFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All currencies</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </div>

      <div className="productListWrapper">
        <div className="productListContainer">
          {filteredGoods.length > 0 ? (
            filteredGoods.map((good) => (
              <ProductItem
                key={good.id}
                product={{
                  id: good.id,
                  title: good.name,
                  price: String(good.price),
                  currency: good.currency,
                  caption: good.description ?? "",
                  image_url: good.image_url,
                }}
              />
            ))
          ) : (
            <p className="no-results">No goods match your filters.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductList;
