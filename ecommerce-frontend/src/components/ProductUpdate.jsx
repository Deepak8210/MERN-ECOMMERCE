import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { productCategories } from "../helpers/productCategories";
import uploadImage from "../helpers/uploadImage";
import { toast } from "react-toastify";
import spinner from "../assets/spinner.svg";
import apiSummary from "../common";
import axios from "axios";
import { ERROR_MESSAGE } from "../constants/message";

const ProductUpdate = ({ onClose, productDetail, fetchProduct }) => {
  const initialProductData = {
    productName: productDetail?.productName,
    category: productDetail?.category,
    brand: productDetail?.brand,
    productImages: [...productDetail?.productImages],
    description: productDetail?.description,
    price: productDetail?.price,
    sellingPrice: productDetail?.sellingPrice,
  };
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [data, setData] = useState(initialProductData);

  const [isUploading, setIsUploading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const newFiles = Array.from(e.target.files);
    if (
      productDetail.productImages.length +
        selectedFiles.length +
        newFiles.length >
      5
    ) {
      toast.error(ERROR_MESSAGE.FILE_LIMIT);
      return;
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    e.target.value = null;
  };

  const handleRemoveFile = (indexToRemove, isExisting = false) => {
    if (isExisting) {
      setData((prev) => ({
        ...prev,
        productImages: prev.productImages.filter(
          (_, index) => index !== indexToRemove
        ),
      }));
    } else {
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Upload only new files (from selectedFiles)
      const uploadedImages = await Promise.all(
        selectedFiles.map((file) => uploadImage(file))
      );

      // Get the URLs of uploaded images
      const newImageUrls = uploadedImages.map((img) => img.secure_url);

      // Combine existing product images and new uploaded images
      const productDataToSubmit = {
        ...data,
        productImages: [...data.productImages, ...newImageUrls],
      };

      const response = await axios.put(
        apiSummary.updateProduct.url + `/${productDetail._id}`,
        productDataToSubmit,
        {
          withCredentials: true,
        }
      );

      // Reset the form state after successful update
      setData({
        productName: "",
        category: "",
        brand: "",
        productImages: [],
        description: "",
        price: "",
        sellingPrice: "",
      });
      fetchProduct();
      setSelectedFiles([]);
      toast.success(response.data.message);

      onClose(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || ERROR_MESSAGE.FAILED_TO_SUBMIT;
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={() => onClose(true)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <form
            onSubmit={submitHandler}
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-blue-950 px-4 pb-4 pt-5 text-left shadow-xl sm:my-8 sm:w-1/2 sm:p-6">
              <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start mb-2">
                <DialogTitle className="text-base font-semibold leading-7 text-white">
                  Update Product
                </DialogTitle>
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
                      placeholder="Enter product name"
                      autoComplete="productName"
                      onChange={handleOnChange}
                      required
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
                      placeholder="Enter prouduct description"
                      onChange={handleOnChange}
                      required
                      className="block px-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                        value={data.category}
                        autoComplete="category"
                        onChange={handleOnChange}
                        required
                        className="block w-full rounded-md border-0 bg-white/5 py-2 px-1 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
                      >
                        {productCategories.map((category) => (
                          <option value={category?.value} key={category?.id}>
                            {category?.label}
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
                        placeholder="Enter brand name"
                        autoComplete="brand"
                        onChange={handleOnChange}
                        required
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
                    Product Images
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
                          multiple
                          onChange={handleImageChange}
                        />
                        <p className="pl-1">Upload Product Images</p>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="mt-4">
                  <ul className="flex flex-wrap space-x-6">
                    {data?.productImages?.map((imageUrl, index) => (
                      <li
                        key={index}
                        className="flex flex-col items-center relative"
                      >
                        <img
                          src={imageUrl}
                          alt="Product"
                          className="w-20 h-20 object-cover rounded-md border border-slate-600"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(index, true); // Remove from existing
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-sm w-4 h-4 flex items-center justify-center"
                        >
                          <XMarkIcon />
                        </button>
                      </li>
                    ))}

                    {selectedFiles.map((file, index) => {
                      const url = URL.createObjectURL(file);
                      return (
                        <li
                          key={index + data.productImages.length} // Unique key
                          className="flex flex-col items-center relative"
                        >
                          <img
                            src={url}
                            alt={file.name}
                            className="w-20 h-20 object-cover rounded-md border border-slate-600"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFile(index, false); // Remove from new files
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-sm w-4 h-4 flex items-center justify-center"
                          >
                            <XMarkIcon />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        id="price"
                        name="price"
                        value={data.price}
                        type="number"
                        min={0}
                        placeholder="Enter price"
                        onChange={handleOnChange}
                        required
                        className="block px-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="sellingPrice"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Selling Price
                    </label>
                    <div className="mt-2">
                      <input
                        id="sellingPrice"
                        name="sellingPrice"
                        value={data.sellingPrice}
                        type="number"
                        min={0}
                        placeholder="Enter selling price"
                        onChange={handleOnChange}
                        required
                        className="block px-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => onClose(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogPanel>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default ProductUpdate;
