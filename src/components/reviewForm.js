"use client";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewForm = ({
  setShowPreviewForm,
  setShowUploadForm,
  reviewDescription,
  reviewVideo,
  setReviewDescription,
  setReviewVideo,
  setReviewVideoUrl,
  setReviewRating,
  reviewRating,
}) => {
  return (
    <div>
      <h1 className="text-black text-center text-3xl font-bold mb-4">
        Upload Product Review
      </h1>
      <div className="flex flex-col">
        <label className="my-2 text-left font-semibold">Rating</label>
        <div className="flex flex-row mb-4">
          {Array(reviewRating)
            .fill(0)
            .map((_, i) => (
              <AiFillStar
                className="mt-1 mr-1"
                size={25}
                color="#FE2C55"
                onClick={() => setReviewRating(i + 1)}
              />
            ))}
          {Array(5 - reviewRating)
            .fill(0)
            .map((_, i) => (
              <AiOutlineStar
                className="mt-1 mr-1"
                color="#FE2C55"
                size={25}
                onClick={() => setReviewRating(reviewRating + i + 1)}
              />
            ))}
        </div>
        <label className="my-2 text-left font-semibold">
          Video Description
        </label>
        <textarea
          className="border p-1 rounded mb-4 resize-none focus:outline-rose-600"
          rows={3}
          placeholder="Enter video description"
          onInput={(e) => {
            setReviewDescription(e.target.value);
          }}
          value={reviewDescription}
        ></textarea>
        <label className="my-2 text-left font-semibold">Review Video</label>
        <input
          className="mb-5 text-sm"
          type="file"
          class="hidden"
          id="files"
          onChange={(e) => {
            setReviewVideo(e.target.files[0]);
            setReviewVideoUrl(URL.createObjectURL(e.target.files[0]));
          }}
        ></input>
        <label
          for="files"
          className="border-ttred border p-1 rounded-md w-28 hover:bg-red-50 text-ttred"
        >
          {reviewVideo ? "File selected" : "Select file"}
        </label>
      </div>

      <div className="flex justify-end mt-10">
        <button
          className="px-8 border rounded enabled:hover:bg-rose-500 enabled:hover:text-white py-1"
          onClick={() => {
            setShowPreviewForm(true);
            setShowUploadForm(false);
          }}
          disabled={!reviewDescription || !reviewVideo || reviewRating === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
