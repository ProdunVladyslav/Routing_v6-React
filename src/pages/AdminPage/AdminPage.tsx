import { ChangeEvent, useEffect, useState } from "react";
import { useGoods } from "../../contexts/GoodContext";
import ProductItem from "../../components/Header/ProductList/ProductItem/ProductItem";
import "./AdminPage.css"; // <-- make sure this file exists

type GoodFormState = {
  id: string;
  name: string;
  price: string;
  description: string;
  currency: string;
  image_url: string;
};

function AdminPage() {
  const { state, dispatch } = useGoods();

  const [good, setGood] = useState<GoodFormState>({
    id: "",
    name: "",
    price: "",
    description: "",
    currency: "USD", // default instead of empty
    image_url: ""
  });

  // Derived validation: are required fields filled in?
  const isValid =
    good.name.trim() !== "" &&
    good.price.trim() !== "" &&
    !Number.isNaN(Number(good.price)) &&
    good.currency.trim() !== "";

  useEffect(() => {
    if (state.editingGoodIndex !== null) {
      const editing = state.goods.find((x) => x.id === state.editingGoodIndex);

      if (editing) {
        setGood({
          id: editing.id ?? "",
          name: editing.name ?? "",
          price:
            editing.price !== undefined && editing.price !== null
              ? String(editing.price)
              : "",
          description: editing.description ?? "",
          currency: editing.currency ?? "USD",
          image_url: editing.image_url ?? ""
        });
      }
    } else {
      // reset form when not editing
      setGood({
        id: "",
        name: "",
        price: "",
        description: "",
        currency: "USD",
        image_url: ""
      });
    }
  }, [state.editingGoodIndex, state.goods]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!isValid) return; // basic guard

    if (state.editingGoodIndex !== null) {
      // update existing good
      dispatch({
        type: "UPDATE_GOOD",
        updatedGood: {
          id: good.id,
          name: good.name,
          price: Number(good.price) || 0,
          currency: good.currency,
          description: good.description,
          image_url: good.image_url
        },
      });
    } else {
      // add new good
      dispatch({
        type: "ADD_GOOD",
        good: {
          id: crypto.randomUUID(),
          name: good.name,
          price: Number(good.price) || 0,
          currency: good.currency,
          description: good.description,
          image_url: good.image_url
        },
      });
    }

    // clear form after save
    setGood({
      id: "",
      name: "",
      price: "",
      description: "",
      currency: "USD",
      image_url: ""
    });
  };

  return (
    <>
      <div className="admin-form-card">
        <h2 className="admin-form-title">
          {state.editingGoodIndex !== null
            ? "Редагувати товар"
            : "Додати новий товар"}
        </h2>

        <div className="admin-form-grid">
          <div className="form-field">
            <label className="form-label">Name *</label>
            <input
              className="form-input "
              name="name"
              placeholder="Name"
              value={good.name}
              onChange={handleChange}
            />
            {good.name.trim() === "" && (
              <div className="form-error">Name is required</div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Price *</label>
            <input
              className="form-input"
              name="price"
              placeholder="0.00"
              value={good.price}
              onChange={handleChange}
              inputMode="decimal"
            />
            {(good.price.trim() === "" ||
              Number.isNaN(Number(good.price))) && (
              <div className="form-error">Enter a valid number</div>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Currency *</label>
            <select
              className="form-input"
              name="currency"
              value={good.currency}
              onChange={handleChange}
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="UAH">UAH ₴</option>
            </select>
            {good.currency.trim() === "" && (
              <div className="form-error">Currency is required</div>
            )}
          </div>

          <div className="form-field form-field-full">
            <label className="form-label">Description</label>
            <textarea
              className="form-input form-textarea"
              name="description"
              placeholder="Short description"
              value={good.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-field form-field-full">
            <label className="form-label">Image Url *</label>
            <input
              className="form-input"
              name="image_url"
              placeholder="Image Url"
              value={good.image_url}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!isValid}
        >
          {state.editingGoodIndex !== null ? "Оновити" : "Додати"}
        </button>
      </div>

      <div className="goods-list">
        {state.goods.map((x) => (
          <div className="good-row" key={x.id}>
            <div className="good-main">
              <ProductItem product={x} />
            </div>

            <div className="good-actions">
              <button
                className="action-btn edit-btn"
                onClick={() =>
                  dispatch({ type: "EDIT_GOOD", index: x.id })
                }
              >
                Редагувати
              </button>

              <button
                className="action-btn delete-btn"
                onClick={() =>
                  dispatch({ type: "DELETE_GOOD", index: x.id })
                }
              >
                Видалити
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default AdminPage;
