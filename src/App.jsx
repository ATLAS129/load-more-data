import { useState, useEffect } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const disabledButton = products && products.length >= 214;

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prev) => [...prev, ...result.products]);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [count]);

  return (
    <div className="products-container">
      <div className="products">
        {products &&
          products.map((item) => (
            <div className="product-container" key={item.id}>
              <img
                className="product-img"
                src={item.thumbnail}
                alt={item.title}
              />
              <p>{item.title}</p>
            </div>
          ))}
      </div>
      <div>
        {disabledButton ? (
          <p>That's it. 214 products</p>
        ) : (
          <button
            className="products-btn"
            disabled={disabledButton}
            onClick={() => setCount((c) => c + 1)}
          >
            Load more buttons
          </button>
        )}
      </div>
    </div>
  );
}
