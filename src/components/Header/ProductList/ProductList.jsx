import { v4 as uuid } from 'uuid';
import './ProductList.css';
import ProductItem from './ProductItem/ProductItem';

export const products = [
  { id: uuid(), title: "Good 1 Example", price: "10", currency: "EUR", caption: "fjghdshfghdsfghbdfgdhbfgjhdjgjdsfgdshfgdsfhg dsg dsfgdfgdfgdgdfgd" },
  { id: uuid(), title: "Good 2 Example", price: "100", currency: "USD", caption: "sample goood the best seller and so on"},
  { id: uuid(), title: "Good 123456 Example", price: "780", currency: "UAH", caption: "sample goood the best sellersdfsdfsdfsdfsdf and so on"},
];

function ProductList() {
  return (
    <div className="productListWrapper">
      <div className="productListContainer">
        {products.map(x => (
          <ProductItem key={x.id} product={x} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
