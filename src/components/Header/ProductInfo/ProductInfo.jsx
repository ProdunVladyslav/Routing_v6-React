import './ProductInfo.css';
import { Link, useParams, NavLink} from "react-router-dom";
import { products } from "../ProductList/ProductList";

function ProductInfo() {
  const { id } = useParams();
  const product = products.find(x => x.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
        <div></div>
        <NavLink to="/"> fsdfsd</NavLink>
        <div className="product-page">
            <h1>{product.title}</h1>
            <p className="price">
                Price: {product.price}
                <span className="currency"> {product.currency}</span>
            </p>
            <p>Caption: {product.caption || "No caption provided."}</p>
        </div>
    </div>
  );
}

export default ProductInfo;
