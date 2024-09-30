"use client";
import React, { useState } from "react";

interface CarMedia {
  id: number;
  name: string;
  url: string;
  type: string;
}

interface CarDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  carMedia: CarMedia[];
  carName: string;
  carImage: string;
}

const CarDetailModal: React.FC<CarDetailModalProps> = ({
  isOpen,
  onClose,
  carMedia,
  carName,
  carImage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4 text-black">{carName}</h3>
        <img
          src={carImage}
          alt={carName}
          className="w-full h-auto rounded mb-4"
        />
        <div className="grid grid-cols-1 gap-4">
          {carMedia.map((media) => (
            <div key={media.id} className="relative">
              {media.type.startsWith("image") ? (
                <img
                  src={media.url}
                  alt={media.name}
                  className="w-full h-auto rounded"
                />
              ) : (
                <div>
                  <video
                    controls
                    className="w-full h-auto rounded"
                    onError={() => {}}
                  >
                    <source src={media.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="mt-2">{media.name}</p>

                  <p className="mt-2 text-red-500">Video not found.</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CarDetailModal;
