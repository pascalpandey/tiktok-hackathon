"use client"

import { useState, useEffect} from "react"
import Image from "next/image";
export default function Uploader(){
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showPreviewForm, setShowPreviewForm] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");


    useEffect(() => {
        if (showUploadForm || showPreviewForm) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, [showUploadForm || showPreviewForm]);

    useEffect(() => {
        // Load the selected file from localStorage when the component mounts.
        const storedFile = localStorage.getItem('productImage');
        if (storedFile) {
          setProductImage(storedFile);
        }
      }, []);
    
    const handleName = (e) =>{
        setProductName(e.target.value);
    }
    const handlePrice = (e) => {
        setProductPrice(e.target.value);
    }
    const handleDescription = (e) => {
        setProductDescription(e.target.value);
    }
    const handleImage = (e) => {
        console.log(e.target.value);
        setProductImage(URL.createObjectURL(e.target.files[0]));
        localStorage.setItem('productImage', productImage);
    }

    const resetForm = () => {
        setShowPreviewForm(false);
        setShowUploadForm(false);
        setProductName("");
        setProductPrice(0);
        setProductDescription("");
        setProductImage("");
    }
    const handleSubmit = (e) => {
        // Logic ke backend


        resetForm();
    }

    return(
        <>
            <button className="w-32 mx-1 border h-3/5 text-lg px-1 rounded hover:bg-gray-100" type="button"
                onClick={() => setShowUploadForm(true)}>
                + Upload
            </button>
            {
                (showUploadForm || showPreviewForm) && (
                    <div>
                        <div className="fixed flex w-screen h-screen top-16 left-0 bg-black opacity-20"
                            onClick={() => {resetForm()}}/>
                        
                        <div className="bg-white fixed bg-white w-1/2 h-2/3 right-1/4 top-[150px] rounded-md p-8 overflow-y-hidden">
                            {
                                showUploadForm? 
                                <div>
                                    <h1 className="text-black text-center text-3xl font-bold mb-4">
                                        Upload New Product
                                    </h1>
                                    <div className="flex flex-col">
                                        <label className="my-1">Product Name</label>
                                        <input className="border p-1 rounded mb-4 focus:outline-rose-600" type="text" placeholder="Enter product name"
                                            onInput={(e) => handleName(e)} value={productName}></input>

                                        <label className="my-1">Product Description</label>
                                        <textarea className="border p-1 rounded mb-4 resize-none focus:outline-rose-600" rows={3} placeholder="Enter product description"
                                            onInput={(e) => handleDescription(e)} value={productDescription}></textarea>

                                        <label className="my-1">Product Price</label>
                                        <input className="border p-1 rounded mb-4 focus:outline-rose-600" type="number" placeholder="Enter product price"
                                            onInput={(e) => handlePrice(e)} value={productPrice} min={0} step={0.01}></input>

                                        <label className="my-1">Product Image</label>
                                        <input className="mb-5 text-sm" type="file" 
                                            onChange={(e) => {handleImage(e)}}></input>
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="px-8 border rounded hover:bg-rose-500 hover:text-white py-1"
                                            onClick={() => {setShowPreviewForm(true); setShowUploadForm(false)}}>Next</button>
                                    </div>
                                </div>
                                :
                                <div>
                                    <h1 className="text-black text-center text-3xl font-bold mb-8">
                                        Product Preview
                                    </h1>
                                    <div className="h-[330px] w-full flex flex-col">
                                        <div className="w-full flex flex-row">
                                            <div className="w-32 h-32 border rounded flex justify-center items-center">
                                                <div className="w-28 h-28 absolute "><Image fill={true} src={productImage}/></div>
                                            </div>
                                            <div className="mx-8">
                                                <h2 className="text-md font-bold">Product Name: </h2>
                                                <div className="text-sm italic mb-4">{productName}</div>
                                                <h2 className="text-md font-bold">Price: </h2>
                                                <div className="text-sm italic mb-4">SGD ${Math.round((productPrice * 100))/100}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-md font-bold my-3 mb-2">Description: </h2>
                                            <div className="w-full text-sm italic">{productDescription}</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="border px-6 rounded hover:bg-rose-500 hover:text-white mx-4" type="button"
                                            onClick={() => {setShowPreviewForm(false); setShowUploadForm(true)}}>Back</button>
                                        <button className="border py-1 px-6 rounded hover:bg-rose-500 hover:text-white" type="submit"
                                            onClick={(e) => handleSubmit(e)}>Submit</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}