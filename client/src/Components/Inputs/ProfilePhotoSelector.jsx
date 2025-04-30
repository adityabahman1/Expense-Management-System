import React, { useRef, useState } from "react";
import { LuUser, LuTrash, LuUpload } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setimage }) => {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setimage(file); // ✅ Fix: Save the selected file
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview); // ✅ Fix: Set preview URL
        }
    };

    const handleRemoveImage = () => {
        setimage(null);
        setPreviewURL(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />
            {!previewURL ? ( // ✅ Fix: Use previewURL to check if an image is selected
                <div className="flex w-20 h-20 items-center justify-center bg-purple-100 rounded-full relative">
                    <LuUser className="text-4xl text-primary" />
                    <button
                        type="button"
                        className="flex w-8 h-8 items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1"
                        onClick={onChooseFile}
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewURL} // ✅ Fix: Use previewURL as the image source
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full absolute -bottom-1 -right-1"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
