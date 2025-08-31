import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function Other() {
  const { addToCart } = useContext(CartContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products", { params: { category: "otheritems" } })
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <h2 className="text-center mb-3">Other Items</h2>
      <div className="container my-3">
        <div className="row g-4">
          {items.map((p) => (
            <div className="col-md-4 col-lg-3" key={p._id}>
              <ProductCard
                id={p._id}
                name={p.name}
                price={p.price}
                image={p.image}
                onAddToCart={() =>
                  addToCart({
                    id: p._id,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Other;