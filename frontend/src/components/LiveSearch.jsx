import { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { CartContext } from "../context/CartContext";

export default function LiveSearch() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("name");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:5000/api/products/search", {
          params: { query: q, type },
        });
        setResults(res.data || []);
      } catch (e) {
        console.error("Live search failed:", e);
        setResults([]);
      } finally {
        setLoading(false);
      }}, 300);

    return () => clearTimeout(t);
  }, [q, type]);

  return (
    <div style={{maxWidth:1000,margin:"10px auto",padding:16,borderRadius:12,boxShadow:"0 2px 10px rgba(0,0,0,0.06)"}} >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input type="text" value={q} onChange={(e) => setQ(e.target.value)} 
        placeholder={type === "name" ? "Search by product name..." : "Search by flavor..."}
          style={{ flex: 1, padding: "10px 12px", border: "1px solid #d0d5dd", borderRadius: 8, outline: "none" }} />
        <div style={{ display: "inline-flex", border: "1px solid #d0d5dd", borderRadius: 8, overflow: "hidden" }} >
          <button onClick={() => setType("name")}
            style={{ padding: "10px 12px", border: "none", background: type === "name" ? "#198754" : "#fff",
              color: type === "name" ? "#fff" : "#111827", cursor: "pointer" }}>
            Name
          </button>
          <button onClick={() => setType("flavor")}
            style={{ padding: "10px 12px", borderLeft: "1px solid #d0d5dd", background: type === "flavor" ? "#198754" : "#fff",
              color: type === "flavor" ? "#fff" : "#111827", cursor: "pointer" }}>
            Flavor
          </button>
        </div>
      </div>

      <div style={{ marginTop: 10, minHeight: 24, color: "#6b7280" }}>
        {loading && <span>Searching…</span>}
        {!loading && q.trim() && results.length === 0 && <span>No results</span>}
      </div>

      {results.length > 0 && (
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }} >
          {results.map((p) => (
            <ProductCard
              key={p._id || p.id}
              name={p.name}
              price={p.price}
              image={p.image}  
              weight={p.weight}
              flavor={p.flavor}
              onAddToCart={() => addToCart(p)}
            />
          ))}
        </div>
      )}
    </div>
  );
}