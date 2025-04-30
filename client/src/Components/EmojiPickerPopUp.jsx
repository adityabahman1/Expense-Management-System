import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopUp = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6 relative">
      {/* Trigger Button */}
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-8 h-8" />
          ) : (
            <LuImage />
          )}
        </div>
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex justify-center items-center">
          <div className="relative z-50 bg-white p-4 rounded-xl shadow-lg">
            <button
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <LuX size={16} />
            </button>
            <EmojiPicker
              onEmojiClick={(emojiData) => {
                onSelect(emojiData.imageUrl || emojiData.emoji);
                setIsOpen(false);
              }}
              autoFocusSearch={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopUp;
