"use client"

import React from 'react'
import { useForm } from "react-hook-form";
import Image from 'next/image';
import axios from 'axios';
import { useMutation, useQuery } from "@tanstack/react-query";
import { MdPhotoCamera } from 'react-icons/md';
import { Switch } from '@mui/material';
import { toast } from "react-hot-toast";
import { pink } from '@mui/material/colors';
import { alpha, styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useUploadThing } from '../../../../components/uploadthingHelpers';

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: pink[600],
    '&:hover': {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: pink[600],
  },
}));

const EditProfile = () => {
  const path = usePathname().split('/');
  const handleEditProfile = async (data) => {
    data.sender = path[2];
    mutate(data);
  }

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadError: (err) => {
      toast.error(err.message);
    },
    onClientUploadComplete: () => {
      toast.success("Image upload successful! Updating profile...", { duration: 4000 })
    }
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      const res = await startUpload([data.imgUrl]);
      const url = res[0].url;
      return await axios.patch("http://localhost:3000/api/user/", {
        data: { ...data, imgUrl: url },
      });
    },
    onSuccess: (res) => {
      toast.success("Successfully updated profile!")
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });

  const { data } = useQuery({
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:3000/api/user/login?token=${localStorage?.getItem("JWT_TOKEN") ?? ""
        }`
      );
      return data;
    },
    queryKey: ["checkLogIn"],
  });

  const { register, handleSubmit, setValue, getValues } = useForm();
  const label = { inputProps: { "isPublic": true } };

  return (
    <div className='w-full pr-[220px]'>
      <div className=' mx-auto relative w-fit'>
        <form onSubmit={handleSubmit(handleEditProfile)} className='w-[500px]'>
          <h1 className='text-3xl font-bold mb-12 mt-8'>Edit Profile</h1>
          <div className=' w-full flex flex-row my-4'>
            <div className='mb-8 w-fit'>
              <div className='relative '>

                <input className="mb-5 text-sm hidden" type="file" id="file"
                  onChange={(e) => {
                    setValue("imgUrl", e.target.files[0]);
                    setValue("frontImgUrl", URL.createObjectURL(e.target.files[0]));
                  }}></input>
                <label for="file" className='text-sm'>Profile Photo
                  <div className='w-28 h-28 rounded-full mt-1 relative'>
                    <Image
                      className='w-28 h-28 rounded-full mt-1 relative'
                      src={getValues("frontImgUrl") ?? data?.data?.imgUrl}
                      layout={'fill'}
                      objectFit={'contain'} />
                  </div>
                  <MdPhotoCamera className='absolute right-0 top-[110px] bg-gray-100 rounded-full p-1' size={30} />
                </label>
              </div>
            </div>
            <div className='ml-10 flex flex-col w-full'>
              <div className='my-1 flex flex-row gap-4 w-full'>
                <div className='flex flex-col w-full'>
                  <label className='text-sm'>Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    defaultValue={data?.data?.name ?? ""}
                    className="p-2 bg-gray-50 text-black mb-4 rounded"
                    {...register("name")}
                  />
                </div>
              </div>
              <div className='mt-2 mb-1 '>
              </div>
              <div className='mt-2 mb-1 '>
                <div className='flex flex-col'>
                  <label className='text-sm'>Bio</label>
                  <textarea
                    type="text"
                    placeholder="Tell us something about yourself..."
                    defaultValue={data?.data?.bio ?? ""}
                    className="p-2 bg-gray-50 h-32 text-black mb-4 rounded resize-0"
                    {...register("bio")}
                  />
                </div>

              </div>
              <div className='flex flex-row items-center'>
                <PinkSwitch {...label} defaultChecked />
                <p className='ml-1'>Set </p>
                <p className='font-semibold mx-1'>Wishlist </p>
                <p>to public</p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className='mt-12 absolute right-0 hover:bg-red-50 transition border-ttred text-ttred border p-2 rounded'
          >
            {isLoading ? `Loading...` : `Save Changes`}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProfile

// userId Int @id @default(autoincrement())
// username String @unique
// name String?
// password String
// bio String?
// following User[] @relation("following")
// followers User[] @relation("following")
// comments Comment[]
// reviews Review[]
// likes Int @default(0)
// shop Shop?