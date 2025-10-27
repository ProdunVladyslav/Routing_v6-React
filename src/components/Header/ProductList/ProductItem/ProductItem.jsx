import './ProductItem.css';
import { useNavigate } from 'react-router-dom';

function ProductItem({product}) {
    const navigate = useNavigate();

    function goToProductPage() {
        navigate(`/product/${product.id}`);
    }

    return (
        <>
            <div className="card-container" onClick={goToProductPage}>
                <h3>{product.title || product.name}</h3>
                <div className="price-container">
                    <p className="price-num-container">{product.price}</p>
                    <p className="currency-container" data-currency={product.currency}>{product.currency}</p>
                </div>
            </div>
        </>
    );
}

export default ProductItem;