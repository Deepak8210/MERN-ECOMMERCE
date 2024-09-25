import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { productCategories } from "../helpers/productCategories";
import uploadImage from "../helpers/uploadImage";

const ProductCreation = ({ onClose }) => {
  const initialProductData = {
    productName: "",
    category: "",
    brand: "",
    productImages: [],
    description: "",
    price: "",
    sellingPrice: "",
  };
  const [uploadInput, setUploadInput] = useState("");
  const [data, setData] = useState({ productImages: [] });
  const handleOnChange = () => {};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const uploadedImage = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImages: [...prev.productImages, uploadedImage.url],
      };
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <Dialog open={true} onClose={() => onClose(true)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <form
          onSubmit={submitHandler}
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-blue-950 px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-1/2 sm:p-6"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  <span className="text-base font-semibold leading-7 text-white">
                    Add New Product
                  </span>
                </DialogTitle>
              </div>
            </div>
            <div>
              <div className="col-span-full">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Product name
                </label>
                <div className="mt-2">
                  <input
                    id="productName"
                    name="productName"
                    value={data.productName}
                    type="text"
                    autoComplete="productName"
                    className="block px-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full mt-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    value={data.description}
                    rows={3}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      value={data?.category}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 bg-white/5 py-2 px-1 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                    >
                      {productCategories.map((category) => (
                        <option value={category.value} key={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Brand
                  </label>
                  <div className="mt-2">
                    <input
                      id="brand"
                      name="brand"
                      value={data.brand}
                      type="text"
                      autoComplete="brand"
                      className="block px-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full mt-2">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Product Image
                </label>
                <label
                  htmlFor="file-upload"
                  className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-1"
                >
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-500"
                    />
                    <div className="mt-2 flex text-sm leading-6 text-gray-400">
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />

                      <p className="pl-1">Upload Product Image</p>
                    </div>
                  </div>
                </label>
              </div>

              <div className="w-full mt-2 flex space-x-4 h-20">
                {data?.productImages && data.productImages.length > 0
                  ? data.productImages.map((url, index) => (
                      <img
                        src={url}
                        alt={`Product image ${index + 1}`} // Descriptive alt text
                        key={index} // Use index for unique key in this case
                        className="w-20 h-20 rounded-md"
                      />
                    ))
                  : "No images available"}
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                // onClick={(() => onClose(false), submit)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                <PlusIcon className="w-5 h-5" />
                Add
              </button>
              <button
                type="button"
                onClick={() => onClose(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </form>
      </div>
    </Dialog>
  );
};

export default ProductCreation;
