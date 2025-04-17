import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EventImagesUpload({ images, handleChange }) {
  const [previews, setPreviews] = useState([]);
  
  React.useEffect(() => {
    if (images && images.length > 0) {
      const newPreviews = [];
      Array.from(images).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target.result);
          if (newPreviews.length === images.length) {
            setPreviews([...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviews([]);
    }
  }, [images]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 font-kanit text-gray-800 border-b pb-2">รูปภาพกิจกรรม</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-kanit">
            อัพโหลดรูปภาพ <span className="text-sm text-gray-500">(สูงสุด 5 รูป)</span>
          </label>
          
          <div className="border-2 border-gray-300 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hidden"
              id="image-upload"
              max="5"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-1 text-sm text-gray-600 font-kanit">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">อัพโหลดรูปภาพ</span> หรือลากและวางที่นี่
              </p>
              <p className="mt-1 text-xs text-gray-500 font-kanit">PNG, JPG, GIF สูงสุด 10MB</p>
            </label>
          </div>
        </div>
        
        {/* Preview Images */}
        {previews.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2 font-kanit">ภาพที่เลือก ({previews.length}):</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden h-24 bg-gray-100">
                  <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
