import React from 'react';
import { motion } from 'framer-motion';

export default function ExistingImagesPreview({ images, onRemoveImage }) {
  if (!images || images.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2 font-kanit">รูปภาพปัจจุบัน ({images.length}):</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((imageUrl, index) => (
          <motion.div 
            key={index} 
            className="relative rounded-lg overflow-hidden h-24 bg-gray-100 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={imageUrl} alt={`Event image ${index + 1}`} className="w-full h-full object-cover" />
            
            {onRemoveImage && (
              <button
                type="button"
                onClick={() => onRemoveImage(imageUrl, index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                title="ลบรูปภาพนี้"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
