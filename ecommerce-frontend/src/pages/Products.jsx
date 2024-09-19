import React, { useState } from "react";
import ProductCreation from "../components/ProductCreation";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      All Products
      <button
        className="border px-4 py-1 bg-red-400 text-white"
        onClick={() => setShowModal(true)}
      >
        Add item
      </button>
      {showModal && <ProductCreation />}
    </div>
  );
};

export default Products;
