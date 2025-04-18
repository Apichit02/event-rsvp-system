import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function EventDetailLocation({ location, location_map_url }) {
  const [mapError, setMapError] = useState(false);

  const googleMapsUrl = location_map_url || 
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
  
  const handleImageError = () => {
    setMapError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-kanit flex items-center">
        <span className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </span>
        สถานที่จัดงาน
      </h2>
      
      <div className="bg-indigo-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700 font-kanit font-medium">{location}</p>
      </div>
      
      <div className="space-y-4">
        {/* Location preview */}
        <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          {/* If we have a goo.gl link or the map image had an error, show the placeholder */}
          {(location_map_url?.includes('goo.gl') || mapError) ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-4">
              <div className="bg-indigo-100 p-4 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-700 font-kanit text-center mb-4">คุณสามารถดูตำแหน่งและเส้นทางได้ใน Google Maps</p>
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-kanit flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                เปิดแผนที่ใน Google Maps
              </a>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Try to display static map without API key (may not work) */}
              <img 
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(location)}&zoom=15&size=600x300&scale=2&maptype=roadmap&markers=color:red%7C${encodeURIComponent(location)}`}
                alt={`แผนที่ ${location}`}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              
              {/* Overlay with semi-transparent button to open full map */}
              <div className="absolute bottom-3 right-3">
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-indigo-700 rounded-lg hover:bg-white transition-colors font-kanit flex items-center shadow-md text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  ขยายแผนที่
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation links with better icons */}
        <div className="flex flex-wrap justify-center gap-3">
          <a 
            href={googleMapsUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-kanit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            ดูเส้นทางและนำทาง
          </a>
          
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors font-kanit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            นำทางด้วย Google Maps
          </a>
        </div>
      </div>
    </motion.div>
  );
}
