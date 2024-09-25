import React, { useState } from "react";
import ProductCreation from "../components/ProductCreation";
import { PlusIcon } from "@heroicons/react/24/outline";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const onClose = (currentState) => {
    setShowModal(currentState);
  };
  return (
    <div className="bg-gray-900 w-full h-[calc(100vh-79px)] m-0 border-l-2 border-gray-600">
      <div className="flex items justify-between p-2 border-b-2 border-gray-600">
        <h1 className="font-semibold text-xl text-white">All products</h1>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-md flex space-x-1 items-center bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          <PlusIcon className="w-6 h-6" />
          <span>Product</span>
        </button>
      </div>
      {showModal && <ProductCreation onClose={onClose} />}
    </div>
  );
};

export default Products;
