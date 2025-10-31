import './ProductItem.css';
import { useNavigate } from 'react-router-dom';

function ProductItem({ product }) {
  const navigate = useNavigate();

  function goToProductPage() {
    navigate(`/product/${product.id}`);
  }

  const imageSrc =
    product.image_url && product.image_url.trim() !== ""
      ? product.image_url
      : "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909962/fallback_image_header/fallback_image_header-png?_i=AA";

  return (
    <div className="card-container" onClick={goToProductPage}>
      <div className="image-wrapper">
        <img
          src={imageSrc}
          alt={product.title || product.name}
          className="product-image"
        />
      </div>
      <div className="card-content">
        <h3>{product.title || product.name}</h3>
        <div className="price-container">
          <p className="price-num-container">{product.price}</p>
          <p className="currency-container" data-currency={product.currency}>
            {product.currency}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
