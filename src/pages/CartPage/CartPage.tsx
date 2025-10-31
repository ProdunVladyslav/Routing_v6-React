import React from "react";
import { useCart } from "../../contexts/CartContext";
import { useGoods } from "../../contexts/GoodContext"; // Assuming you already have this context
import ProductItem from "../../components/Header/ProductList/ProductItem/ProductItem";
import "./CartPage.css"; // Import the CSS file for CartPage

function CartPage() {
  // Use CartContext
  const { state: cartState, dispatch: cartDispatch } = useCart();

  // Use GoodContext
  const { state: goodsState, dispatch: goodsDispatch } = useGoods();

  // Handle removing an item from the cart
  const handleRemoveItem = (id: string) => {
    cartDispatch({ type: "DELETE_GOOD_FROM_CART", id });
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    cartDispatch({ type: "CLEAR_CART" });
  };

  // Render the cart items
  return (
    <div className="cart-page-wrapper">
      <h1>Your Cart</h1>

      {cartState.goodIDsAddedToCart.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-items-wrapper">
          {cartState.goodIDsAddedToCart.map((id) => {
            // Find the product using the ID from goodsState
            const product = goodsState.goods.find((good) => good.id === id);

            return product ? (
              <div key={product.id} className="cart-item">
                <ProductItem
                  product={{
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    currency: product.currency,
                    image_url: product.image_url,
                  }}
                />
                <button
                  className="remove-item-button"
                  onClick={() => handleRemoveItem(product.id)}
                >
                  Remove
                </button>
              </div>
            ) : null;
          })}
        </div>
      )}

      <div className="cart-actions">
        <button
          className="clear-cart-button"
          onClick={handleClearCart}
          disabled={cartState.goodIDsAddedToCart.length === 0}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default CartPage;
