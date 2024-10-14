import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ProductUpdate from "./ProductUpdate";

const prod = {
  title: "airpod 111",
  img: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1697624125/Croma%20Assets/Entertainment/Wireless%20Earbuds/Images/256351_klwf70.png?tr=w-600",
};

const Card = ({ data, fetchProduct }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const onClose = () => {
    setShowUpdateModal(false);
  };
  return (
    <div className=" rounded-xl  w-fit p-2 text-center relative border-2 border-gray-500">
      <div className="flex w-48 h-48 object-contain">
        <img src={data.productImages[0]} alt="" className="" />
      </div>
      <p className="text-white">{data?.productName}</p>
      <div className="flex flex-col items-center absolute top-1/2 space-y-2 p-0 right-1 -translate-y-1/2">
        <PencilIcon
          onClick={() => setShowUpdateModal(true)}
          className="w-6 h-6 text-white border border-gray-500 rounded-md p-1 hover:bg-gray-400 duration-200"
        />
        <TrashIcon className="w-6 h-6 text-white mx-2 border border-gray-500 rounded-md p-1 hover:bg-gray-400 duration-200" />
      </div>
      {showUpdateModal && (
        <ProductUpdate
          onClose={onClose}
          productDetail={data}
          fetchProduct={fetchProduct}
        />
      )}
    </div>
  );
};

export default Card;
