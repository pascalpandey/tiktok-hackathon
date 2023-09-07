"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useUploadThing } from "./uploadthingHelpers";
import { toast } from "react-hot-toast";
import axios from "axios";

import ProductForm from '../components/productForm';

export default function ProductUploader(){
    // state for showing form
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showPreviewForm, setShowPreviewForm] = useState(false);

    // state for product form
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productImageUrl, setProductImageUrl] = useState("");

    // state for backend
    const [loading, setLoading] = useState(false);


    // unable scroll while form is open
    useEffect(() => {
        if (showUploadForm || showPreviewForm) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, [showUploadForm || showPreviewForm]);

    const resetForm = () => {
        setShowPreviewForm(false);
        setShowUploadForm(false);
        setProductName("");
        setProductPrice(0);
        setProductDescription("");
        setProductImage("");
    }

    const { startUpload } = useUploadThing("imageUploader", {
        onUploadError: (err) => {
            toast.error(err.message);
        },
    });

    const handleSubmit = async (e) => {
        setLoading(true);
        const res = await startUpload([productImage]);
        const url = res[0].url;
        await axios.post(
          "http://localhost:3000/api/item",
          {
            data: {
              imageUrl: url,
              description: productDescription,
              price: Number(productPrice),
              name: productName,
            },
          },
          {
            headers: {
              Authorization: localStorage?.getItem("JWT_TOKEN") ?? "",
            },
          }
        );
        toast.success("Successfully created item!");
        setLoading(false);
        resetForm();
    };
    
    return(
        <>
        <button
          className="w-32 mx-1 border h-3/5 text-lg p-1 rounded hover:bg-gray-100"
          type="button"
          onClick={() => setShowUploadForm(true)}
        >
          + Upload
        </button>
        <Transition appear show={showUploadForm || showPreviewForm} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => resetForm()}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={()=> resetForm()}/>
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel
                    className="bg-white fixed w-1/2 h-[580px] right-1/4 top-[150px] rounded-md p-8 overflow-y-hidden -translate-y-8"
                    style={{
                      height: showPreviewForm ? "500px" : "580px",
                      transform: showPreviewForm
                        ? "translate(0px, 0px)"
                        : "translate(0px, -32px)",
                    }}
                  >
                    {showUploadForm ? 
                        (
                            <ProductForm productName={productName} productDescription={productDescription} productImage={productImage} productPrice={productPrice} productImageUrl={productImageUrl}
                                setProductDescription={setProductDescription} setProductName={setProductName} setProductImage={setProductImage} setProductPrice={setProductPrice} setProductImageUrl={setProductImageUrl}
                                setShowUploadForm={setShowUploadForm} setShowPreviewForm={setShowPreviewForm}/>
                        ) 
                        : 
                        (
                            <div>
                                <h1 className="text-black text-center text-3xl font-bold mb-8">
                                Product Preview
                                </h1>
                                <div className="h-[330px] w-full flex flex-col">
                                <div className="w-full flex flex-row">
                                    <div className="w-32 h-32 border rounded flex justify-center items-center">
                                    <div className="w-28 h-28 absolute ">
                                        <Image fill={true} src={productImageUrl} />
                                    </div>
                                    </div>
                                    <div className="mx-8">
                                    <h2 className="text-md font-bold text-left">
                                        Product Name:{" "}
                                    </h2>
                                    <div className="text-sm italic mb-4 text-left">
                                        {productName}
                                    </div>
                                    <h2 className="text-md font-bold text-left">Price: </h2>
                                    <div className="text-sm italic mb-4 text-left">
                                        SGD ${Math.round(productPrice * 100) / 100}
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-left font-bold my-3 mb-2">
                                    Description:{" "}
                                    </h2>
                                    <div className="w-full text-sm italic text-left">
                                    {productDescription}
                                    </div>
                                </div>
                                </div>
                                <div className="flex justify-end">
                                <button
                                    className="border px-6 rounded hover:bg-rose-500 hover:text-white mx-4"
                                    type="button"
                                    onClick={() => {
                                    setShowPreviewForm(false);
                                    setShowUploadForm(true);
                                    }}
                                >
                                    Back
                                </button>
                                <button
                                    className="border py-1 px-6 rounded hover:bg-rose-500 hover:text-white"
                                    type="submit"
                                    disabled={loading}
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    {loading ? "Loading..." : "Submit"}
                                </button>
                                </div>
                            </div>
                        )
                    }
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
}
