import React, { useEffect, useMemo, useState } from "react";
import { getProducts, createProduct, updateProduct, deleteProductApi } from "../api/products";
import "./ManageProduct.css";

function ManageProduct({ title, category, fields }) {
  const emptyForm = useMemo(
    () => Object.fromEntries(fields.map((f) => [f, ""])),
    [fields]
  );

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const { data } = await getProducts(category);
      setProducts(data);
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const f of fields) {
      const val = String(form[f] ?? "").trim();
      if (!val) {
        alert(`Please fill in ${f}`);
        return;
      }
    }
    const payload = {
      ...form,
      category,
      ...(form.price ? { price: Number(form.price) } : {}),
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || "Save failed");
    }
  };

  const startEdit = (p) => {
    const f = {};
    fields.forEach((k) => (f[k] = p[k] ?? ""));
    setForm(f);
    setEditingId(p._id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProductApi(id);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="manage-container">
      <h2 className="t">{title}</h2>

      <form className="form" onSubmit={handleSubmit}>
        {fields.map((f) => (
          <input
            key={f}
            type={f === "price" ? "number" : "text"}
            step={f === "price" ? "0.01" : undefined}
            placeholder={`Enter ${f.charAt(0).toUpperCase() + f.slice(1)}`}
            name={f}
            value={form[f]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading…</p>
      ) : err ? (
        <p className="error">{err}</p>
      ) : (
        <ul className="product-list">
          {products.map((p) => (
            <li key={p._id}>
              <div className="product-info">
                {fields.map((f) => (
                  <span key={f}>{p[f]} | </span>
                ))}
                <span>({p.category})</span>
              </div>
              <div className="actions">
                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </li>
          ))}
          {products.length === 0 && <p>No products yet.</p>}
        </ul>
      )}
    </div>
  );
}

export default ManageProduct;