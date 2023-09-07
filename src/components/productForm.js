const ProductForm = ({productName, productImage, productPrice, productDescription, setProductDescription, setProductImage, setProductName, setProductPrice, setProductImageUrl
    , setShowPreviewForm, setShowUploadForm}) => {
    return(
        <div>
            <h1 className="text-black text-center text-3xl font-bold mb-4">
                Upload New Product
            </h1>
            <div className="flex flex-col">
                <label className="my-2 text-left font-semibold">Product Name</label>
                <input className="border p-2 rounded mb-3 focus:outline-rose-600" type="text" placeholder="Enter product name"
                    onInput={(e) => setProductName(e.target.value)} value={productName}></input>

                <label className="my-2 text-left font-semibold">Product Description</label>
                <textarea className="border p-2 rounded mb-3 resize-none focus:outline-rose-600" rows={3} placeholder="Enter product description"
                    onInput={(e) => setProductDescription(e.target.value)} value={productDescription}></textarea>

                <label className="my-2 text-left font-semibold">Product Price</label>
                <input className="border p-2 rounded mb-3 focus:outline-rose-600" type="number" placeholder="Enter product price"
                    onInput={(e) => setProductPrice(e.target.value)} value={productPrice} min={0} step={0.01}></input>

                <label className="my-2 text-left font-semibold">Product Image</label>
                <input className="mb-5 text-sm" type="file" class="hidden" id="files"
                    onChange={(e) => {
                        setProductImage(e.target.files[0]);
                        setProductImageUrl(URL.createObjectURL(e.target.files[0]));
                    }}>
                </input>
                <label for="files" className="border-ttred border p-1 rounded-md w-28 hover:bg-red-50 text-ttred">
                    {productImage ? "File selected" : "Select file"}
                </label>
            </div>

            <div className="flex justify-end mt-5">
                <button className="px-8 border rounded enabled:hover:bg-rose-500 enabled:hover:text-white py-1"
                    onClick={() => {
                        setShowPreviewForm(true);
                        setShowUploadForm(false);
                     }}
                    disabled={
                    !productImage ||
                    !productDescription ||
                    !productName ||
                    !productPrice
                    }
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ProductForm;