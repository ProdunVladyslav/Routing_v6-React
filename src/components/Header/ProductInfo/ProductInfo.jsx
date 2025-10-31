import './ProductInfo.css';
import { NavLink, useParams } from "react-router-dom";
import { useGoods } from '../../../contexts/GoodContext';
import { useCart } from '../../../contexts/CartContext';

function ProductInfo() {
  const { id } = useParams();
  const { state } = useGoods();
  const { state: cartState, dispatch: cartDispatch } = useCart();

  const product = state.goods.find((x) => x.id === id);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <NavLink to="/" className="back-link">Go Home</NavLink>
      </div>
    );
  }

  const imageSrc =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909962/fallback_image_header/fallback_image_header-png?_i=AA";

  // --- Add to Cart function
  const addToCart = () => {
    cartDispatch({ type: "ADD_GOOD_TO_CART", id: product.id });
  };

  const isProductInCart = cartState.goodIDsAddedToCart.includes(product.id);

  return (
    <div className="wrapper">
      <div className="goBackButton">
        <NavLink to="/">← Go Back</NavLink>
      </div>

      <div className="product-page">
        <div className="product-image-wrapper">
          <img
            src={imageSrc}
            alt={product.title || product.name}
            className="product-image"
          />
        </div>

        <div className="product-details">
          <h1>{product.title || product.name}</h1>
          <p className="price">
            {product.price}
            <span className="currency">{product.currency}</span>
          </p>
          <p className="description">
            {product.description || "No description provided."}
          </p>

          {/* Add to Cart Button */}
          <button 
            onClick={addToCart} 
            disabled={isProductInCart} 
            className="add-to-cart-btn"
          >
            {isProductInCart ? "Already in Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
