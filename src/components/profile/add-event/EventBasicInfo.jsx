import React from 'react';
import { motion } from 'framer-motion';

export default function EventBasicInfo({ form, handleChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-sm mb-6 border border-gray-100"
    >
      <h2 className="text-xl font-semibold mb-4 font-kanit text-gray-800 border-b pb-2">ข้อมูลพื้นฐาน</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            ชื่อกิจกรรม <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="ระบุชื่อกิจกรรม เช่น งานเทศกาลดนตรี, การอบรมเชิงปฏิบัติการ"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            คำอธิบายสั้น <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="อธิบายกิจกรรมของคุณในไม่เกิน 2-3 ประโยค"
            rows="2"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
            required
          />
        </div>
        
        <div>
          <label htmlFor="long_description" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            รายละเอียดเพิ่มเติม
          </label>
          <textarea
            id="long_description"
            name="long_description"
            value={form.long_description}
            onChange={handleChange}
            placeholder="รายละเอียดเพิ่มเติมของกิจกรรม เช่น กำหนดการ สิ่งที่ผู้เข้าร่วมจะได้รับ หรือข้อมูลสำคัญอื่นๆ"
            rows="5"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            หมวดหมู่
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            <option value="concert">คอนเสิร์ต / ดนตรี</option>
            <option value="conference">การประชุม / สัมมนา</option>
            <option value="workshop">อบรม / เวิร์คช็อป</option>
            <option value="sports">กีฬา / สันทนาการ</option>
            <option value="exhibition">นิทรรศการ</option>
            <option value="community">ชุมชน / การกุศล</option>
            <option value="party">ปาร์ตี้ / งานเลี้ยง</option>
            <option value="other">อื่นๆ</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 font-kanit">
            สถานะกิจกรรม
          </label>
          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-kanit"
          >
            <option value="open">เปิดรับลงทะเบียน</option>
            <option value="closed">ปิดรับลงทะเบียน</option>
            <option value="cancelled">ยกเลิกกิจกรรม</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
