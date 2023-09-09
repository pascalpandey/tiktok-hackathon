"use client";

import { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useUploadThing } from "./uploadthingHelpers";
import { toast } from "react-hot-toast";
import axios from "axios";

import ReviewForm from "../components/reviewForm";
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import LoginSignupGeneric from "./loginSignupGeneric";
import { useQueryClient } from "@tanstack/react-query";

export default function ReviewUploader({ itemId }) {
  // state for showing form
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showPreviewForm, setShowPreviewForm] = useState(false);

  // state for review form
  const [reviewDescription, setReviewDescription] = useState("");
  const [reviewVideo, setReviewVideo] = useState("");
  const [reviewVideoUrl, setReviewVideoUrl] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // state for backend
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

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
    setReviewDescription("");
    setReviewVideo("");
    setReviewRating(0);
  };

  const { startUpload } = useUploadThing("videoUploader", {
    onUploadError: (err) => {
      toast.error(err.message);
    },
    onClientUploadComplete: () => {
      toast.success("Video upload successful! Uploading review data...", {
        duration: 4000,
      });
    },
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    const res = await startUpload([reviewVideo]);
    const url = res[0].url;
    await axios.post(
      "http://localhost:3000/api/review",
      {
        data: {
          videoUrl: url,
          description: reviewDescription,
          itemId: Number(itemId),
          rating: Number(reviewRating),
        },
      },
      {
        headers: {
          Authorization: localStorage?.getItem("JWT_TOKEN") ?? "",
        },
      }
    );
    toast.success("Successfully posted review!");
    setLoading(false);
    startTransition(() => {
      router.refresh();
    });
    queryClient.invalidateQueries([`getReviews${itemId}`])
    resetForm();
  };

  return (
    <>
      <LoginSignupGeneric>
        <button
          className="w-24 h-8 text-sm px-4 rounded bg-ttred text-white hover:bg-rose-600 font-normal"
          type="button"
          onClick={() => setShowUploadForm(true)}
        >
          + Review
        </button>
      </LoginSignupGeneric>
      <Transition appear show={showUploadForm || showPreviewForm} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => resetForm()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={() => resetForm()}
            />
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
                    height: showPreviewForm ? "500px" : "500px",
                    transform: showPreviewForm
                      ? "translate(0px, 0px)"
                      : "translate(0px, 0px)",
                  }}
                >
                  {showUploadForm ? (
                    <ReviewForm
                      setShowPreviewForm={setShowPreviewForm}
                      setShowUploadForm={setShowUploadForm}
                      reviewDescription={reviewDescription}
                      reviewVideo={reviewVideo}
                      setReviewDescription={setReviewDescription}
                      setReviewVideo={setReviewVideo}
                      setReviewVideoUrl={setReviewVideoUrl}
                      setReviewRating={setReviewRating}
                      reviewRating={reviewRating}
                    />
                  ) : (
                    <div>
                      <h1 className="text-black text-center text-3xl font-bold mb-8">
                        Product Review Preview
                      </h1>
                      <div className="h-[335px] w-full flex flex-col">
                        <div className="w-full h-full flex flex-row">
                          <div className="w-80 h-120 border rounded flex justify-center items-center">
                            <div className="w-full h-full relative ">
                              <video
                                autoPlay
                                controls
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              >
                                <source src={reviewVideoUrl} />
                              </video>
                            </div>
                          </div>
                          <div className="mx-8 w-72">
                            <h2 className="text-md font-bold">Rating: </h2>
                            <div className="flex items-center justify-center mb-4">
                              {Array(reviewRating)
                                .fill(0)
                                .map((_, i) => (
                                  <AiFillStar
                                    className="mt-1 mr-1"
                                    size={25}
                                    color="#FE2C55"
                                  />
                                ))}
                              {Array(5 - reviewRating)
                                .fill(0)
                                .map((_, i) => (
                                  <AiOutlineStar
                                    className="mt-1 mr-1"
                                    color="#FE2C55"
                                    size={25}
                                  />
                                ))}
                            </div>
                            <h2 className="text-md font-bold">Description: </h2>
                            <div className="text-sm italic mb-4">
                              {reviewDescription}
                            </div>
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
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
