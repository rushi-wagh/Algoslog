import React from 'react'
import {useForm} from "react-hook-form";
import {X} from "lucide-react";
const CreatePlaylistModal = ({isOpen , onClose , onSubmit}) => {
    const {register , handleSubmit , formState:{errors} , reset} = useForm();

    const handleFormSubmit = async (data)=>{
        await onSubmit(data);
        reset()
        onClose()
    }

    if(!isOpen) return null;

  return (
   <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-green-50 text-gray-600rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-500">
          <h3 className="text-xl text-gray-500 font-bold">Create New Playlist</h3>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-4">
          <div className="form-control">
            <label className="label text-gray-500 mb-1">
              <span className="label-text font-medium">Playlist Name</span>
            </label>
            <input
              type="text"
              className="input bg-gray-200 text-gray-700 input-bordered w-full "
              placeholder="Enter playlist name"
              {...register('name', { required: 'Playlist name is required' })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.name.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label text-gray-500 mb-1">
              <span className="label-text font-medium">Description</span>
            </label>
            <textarea
              className="textarea  bg-gray-200 text-gray-700 textarea-bordered h-24"
              placeholder="Enter playlist description"
              {...register('description')}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn bg-[#239BA7] border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="btn bg-[#239BA7] border rounded-lg">
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePlaylistModal