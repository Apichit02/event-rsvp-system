import React from 'react';
import { motion } from 'framer-motion';

export default function EventDetailLocation({ location, location_map_url }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 font-kanit">สถานที่จัดงาน</h2>
      
      <p className="text-gray-700 mb-4 font-kanit">{location}</p>
      
      {location_map_url && (
        <div className="space-y-4">
          {/* Display map using iframe */}
          <div className="aspect-video rounded-lg overflow-hidden border border-gray-200">
            {/* For short URLs (goo.gl) - create direct link rather than embedding */}
            {location_map_url.includes('goo.gl') ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <a 
                  href={location_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-kanit flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  เปิดแผนที่ใน Google Maps
                </a>
              </div>
            ) : (
              <img 
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(location)}&zoom=15&size=800x400&scale=2&maptype=roadmap&markers=color:red%7C${encodeURIComponent(location)}`}
                alt={`แผนที่ ${location}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          
          {/* Always provide direct link to Google Maps */}
          <div className="flex justify-center">
            <a 
              href={location_map_url || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-kanit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              ดูเส้นทางและนำทาง
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
