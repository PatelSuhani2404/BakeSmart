import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";

export default function RecommendedStrip({ seedId, seedName, title = "Recommended for you" }) {
  const [items, setItems] = useState([]);
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const run = async () => {
      try {
        if (!seedId && !seedName) return;
        const params = seedId ? { id: seedId } : { name: seedName };
        console.log("Fetching recommendations with:", params);
        const res = await axios.get("http://127.0.0.1:8000/api/recommendations/similar/", { params });
        setItems(res.data || []);
      } catch (e) {
        console.error("Failed to load recommendations", e);
      }
    };
    run();
  }, [seedId, seedName]);

  if (!items.length) return null;

  return (
    <div
      style={{ padding:"20px", marginTop:"30px", backgroundColor:"#fafafa", borderRadius:"12px", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }} >
      <h3
        style={{ marginBottom: "20px", fontSize: "20px", fontWeight: "600", color: "#333", textAlign: "center" }} >
        {title}
      </h3>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((p) => (
          <div
            key={p.id}
            style={{ minWidth: "200px", maxWidth: "250px" }} >
            <ProductCard
              name={p.name}
              price={p.price}
              image={p.image}
              weight={p.weight}
              flavor={p.flavor}
              onAddToCart={() => addToCart(p)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}