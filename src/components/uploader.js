"use client"

import { useState, useEffect} from "react"
import Image from "next/image";

const ProductForm = ({productName, productImage, productPrice, productDescription, setProductDescription, setProductImage, setProductName, setProductPrice
, setShowChoiceForm, setShowPreviewForm, setShowUploadForm}) => {
    return(
        <div>
            <h1 className="text-black text-center text-3xl font-bold mb-4">
                Upload New Product
            </h1>
            <div className="flex flex-col">
                <label className="my-1">Product Name</label>
                <input className="border p-1 rounded mb-4 focus:outline-rose-600" type="text" placeholder="Enter product name"
                    onInput={(e) => setProductName(e.target.value)} value={productName}></input>

                <label className="my-1">Product Description</label>
                <textarea className="border p-1 rounded mb-4 resize-none focus:outline-rose-500" rows={3} placeholder="Enter product description"
                    onInput={(e) => setProductDescription(e.target.value)} value={productDescription}></textarea>

                <label className="my-1">Product Price</label>
                <input className="border p-1 rounded mb-4 focus:outline-rose-500" type="number" placeholder="Enter product price"
                    onInput={(e) => setProductPrice(e.target.value)} value={productPrice} min={0} step={0.01}></input>

                <label className="my-1">Product Image</label>
                <input className="mb-5 text-sm" type="file" 
                    onChange={(e) => {setProductImage(URL.createObjectURL(e.target.files[0]))}}></input>
            </div>

            <div className="flex justify-end">
                <button className="border px-6 rounded hover:bg-rose-500 hover:text-white mx-4" type="button"
                    onClick={() => {setShowUploadForm(false); setShowChoiceForm(true)}}>Back</button>
                <button className="px-8 border rounded hover:bg-rose-500 hover:text-white py-1"
                    onClick={() => {setShowPreviewForm(true); setShowUploadForm(false)}}>Next</button>
            </div>
        </div>
    )
}

const ReviewForm = ({setShowChoiceForm, setShowPreviewForm, setShowUploadForm, 
    reviewTitle, reviewDescription, 
    setReviewTitle, setReviewDescription, setReviewVideo}) => {
    return(
        <div>
            <h1 className="text-black text-center text-3xl font-bold mb-4">
                Upload Product Review
            </h1>
            <div className="flex flex-col">
                <label className="my-1">Title</label>
                <input className="border p-1 rounded mb-4 focus:outline-rose-600" type="text" placeholder="Enter video title"
                    onInput={(e) => {setReviewTitle(e.target.value)}} value={reviewTitle}></input>

                <label className="my-1">Video Description</label>
                <textarea className="border p-1 rounded mb-4 resize-none focus:outline-rose-500" rows={3} placeholder="Enter video description"
                    onInput={(e) => {setReviewDescription(e.target.value)}} value={reviewDescription}></textarea>

                {/* <label className="my-1">Product Price</label>
                <input className="border p-1 rounded mb-4 focus:outline-rose-500" type="number" placeholder="Enter product price"
                    onInput={(e) => {}} value={""} min={0} step={0.01}></input> */}

                <label className="my-1">Review Video</label>
                <input className="mb-20 text-sm" type="file" 
                    onChange={(e) => {setReviewVideo(URL.createObjectURL(e.target.files[0]))}}></input>
            </div>

            <div className="flex justify-end">
                <button className="border px-6 rounded hover:bg-rose-500 hover:text-white mx-4" type="button"
                    onClick={() => {setShowUploadForm(false); setShowChoiceForm(true)}}>Back</button>
                <button className="px-8 border rounded hover:bg-rose-500 hover:text-white py-1"
                    onClick={() => {setShowPreviewForm(true); setShowUploadForm(false)}}>Next</button>
            </div>
        </div>
    )
}

export default function Uploader(){
    const [isProduct, setIsProduct] = useState(true);
    const [showChoiceForm, setShowChoiceForm] = useState(false);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showPreviewForm, setShowPreviewForm] = useState(false);
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0.0);
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");

    const [reviewTitle, setReviewTitle] = useState("");
    const [reviewDescription, setReviewDescription] = useState("");
    const [reviewVideo, setReviewVideo] = useState("");

    useEffect(() => {
        if (showChoiceForm || showUploadForm || showPreviewForm) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
      }, [showChoiceForm || showUploadForm || showPreviewForm]);

    // PUNYANYA 2 2 NYA
    const resetForm = () => {
        setShowChoiceForm(false);
        setShowPreviewForm(false);
        setShowUploadForm(false);
        setProductName("");
        setProductPrice(0);
        setProductDescription("");
        setProductImage("");
        setReviewDescription("");
        setReviewTitle("");
        setReviewVideo("");
    }
    const handleSubmit = (e) => {
        // Logic ke backend

        resetForm();
    }

    
    return(
        <>
            <button className="w-32 mx-1 border h-3/5 text-lg px-1 rounded hover:bg-gray-100" type="button"
                onClick={() => setShowChoiceForm(true)}>
                + Upload
            </button>
            {
                (showChoiceForm || showUploadForm || showPreviewForm) && (
                    <div>
                        <div className="fixed flex w-screen h-screen top-16 left-0 bg-black opacity-20"
                            onClick={() => {resetForm()}}/>
                        
                        <div className="bg-white fixed bg-white w-1/2 h-2/3 right-1/4 top-[150px] rounded-md p-8 overflow-y-hidden">
                            {
                                showChoiceForm?
                                <div className="flex flex-col justify-center items-center h-full">
                                    <h1 className="text-black text-center text-3xl font-bold mb-4">What do You Want to Upload?</h1>
                                    <div>
                                        <button className="border rounded py-2 px-8 my-4 w-[300px] hover:bg-rose-600 hover:text-white"
                                            onClick={()=>{setShowChoiceForm(false); setShowUploadForm(true); setIsProduct(true)}}>Upload a new product</button>
                                    </div>
                                    <div>
                                        <button className="border rounded py-2 px-8 my-4 w-[300px] hover:bg-rose-600 hover:text-white hover:border-rose-600"
                                            onClick={()=>{setShowChoiceForm(false); setShowUploadForm(true); setIsProduct(false)}}>Upload a product review</button>
                                    </div>
                                </div>
                                :
                                showUploadForm?
                                    isProduct?
                                    <ProductForm productName={productName} productDescription={productDescription} productImage={productImage} productPrice={productPrice}
                                        setProductDescription={setProductDescription} setProductName={setProductName} setProductImage={setProductImage} setProductPrice={setProductPrice}
                                        setShowChoiceForm={setShowChoiceForm} setShowUploadForm={setShowUploadForm} setShowPreviewForm={setShowPreviewForm}/>
                                    :
                                    <ReviewForm setShowChoiceForm={setShowChoiceForm} setShowPreviewForm={setShowPreviewForm} setShowUploadForm={setShowUploadForm}
                                        reviewTitle={reviewTitle} reviewDescription={reviewDescription} setReviewTitle={setReviewTitle} setReviewDescription={setReviewDescription} setReviewVideo={setReviewVideo}/>
                                :
                                    isProduct?
                                    <div>
                                        <h1 className="text-black text-center text-3xl font-bold mb-8">
                                            Product Preview
                                        </h1>
                                        <div className="h-[335px] w-full flex flex-col">
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
                                    :
                                    <div>
                                        <h1 className="text-black text-center text-3xl font-bold mb-8">
                                            Product Review Preview
                                        </h1>
                                        <div className="h-[335px] w-full flex flex-col">
                                            <div className="w-full h-full flex flex-row">
                                                <div className="w-80 h-120 border rounded flex justify-center items-center">
                                                    <div className="w-48 h-72 absolute "><Image fill={true} src={reviewVideo}/></div>
                                                </div>
                                                <div className="mx-8 w-72">
                                                    <h2 className="text-md font-bold">Title: </h2>
                                                    <div className="text-sm italic mb-4">{reviewTitle}</div>
                                                    <h2 className="text-md font-bold">Description: </h2>
                                                    <div className="text-sm italic mb-4">{reviewDescription}</div>
                                                </div>
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


