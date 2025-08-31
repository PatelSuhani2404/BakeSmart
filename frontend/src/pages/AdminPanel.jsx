import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const { currentUser } = useAuth();
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const manageLinks = [
    { path: "/admin/manage-cakes", label: "Manage Cakes" },
    { path: "/admin/manage-cheesecake", label: "Manage Cheesecake" },
    { path: "/admin/manage-cupcakes", label: "Manage Cupcakes" },
    { path: "/admin/manage-pastries", label: "Manage Pastries" },
    { path: "/admin/manage-other", label: "Manage Other Items" },
  ];

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ marginBottom: "10px" }}>Welcome Admin</h2>
        <p style={{ fontSize: "18px", marginBottom: "30px" }}>
          Manage your store's product below.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", }} >
          {manageLinks.map((item, index) => (
            <Link to={item.path} key={index} style={{ textDecoration: "none" }}>
              <button style={{ padding: "12px 24px", fontSize: "16px", border: "1px solid #333", borderRadius: "5px",
                  backgroundColor: "white", cursor: "pointer", transition: "0.3s",}}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0") }
                onMouseOut={(e) => (e.target.style.backgroundColor = "white")}>
                {item.label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;