import './ProductInfo.css';
import { Link, useParams, NavLink} from "react-router-dom";
import { useGoods } from '../../../contexts/GoodContext';

function ProductInfo() {
  const { id } = useParams();
  const {state} = useGoods()

  const product = state.goods.find(x => x.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className='wrapper'>
        <div className='goBackButton'>
          <NavLink to="/"> Go back</NavLink>
        </div>
        <div className="product-page">
            <h1>{product.title}</h1>
            <p className="price">
                Price: {product.price}
                <span className="currency"> {product.currency}</span>
            </p>
            <p>Caption: {product.description || "No caption provided."}</p>
        </div>
    </div>
  );
}

export default ProductInfo;
