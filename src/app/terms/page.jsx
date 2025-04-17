'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TermsHeader from '@/components/terms/TermsHeader';
import TermsSection from '@/components/terms/TermsSection';
import TableOfContents from '@/components/terms/TableOfContents';
import TermsFooter from '@/components/terms/TermsFooter';
import BackToTopButton from '@/components/terms/BackToTopButton';
import { motion } from 'framer-motion';

export default function TermsPage() {
  const sections = [
    {
      number: 1,
      title: 'การยอมรับเงื่อนไข',
      content: 'กรุณาอ่านข้อกำหนดและเงื่อนไขเหล่านี้อย่างละเอียด ก่อนการใช้งานเว็บไซต์และบริการใดๆ ที่มีอยู่ภายใต้โดเมนของเรา เมื่อคุณใช้งานเว็บไซต์หรือบริการต่อไป ผู่ใช้ถือว่าท่านยอมรับข้อกำหนดทั้งหมดโดยไม่มีข้อโต้แย้ง'
    },
    {
      number: 2,
      title: 'สิทธิ์ในการเข้าถึงและการใช้งาน',
      listItems: [
        'ผู้ใช้ต้องมีอายุ 18 ปีบริบูรณ์หรือมีผู้ปกครองหรือผู้แทนทางกฎหมายอนุญาตให้ใช้งาน',
        'ผู้ใช้ต้องไม่ละเมิดกฎหมายลิขสิทธิ์หรือทรัพย์สินทางปัญญาอื่นๆ',
        'ห้ามใช้บริการเพื่อการกระจายสแปมหรือมัลแวร์'
      ]
    },
    {
      number: 3,
      title: 'การลงทะเบียนและบัญชีผู้ใช้',
      content: 'ผู้ใช้ต้องรับผิดชอบข้อมูลบัญชีผู้ใช้ทั้งหมดและรักษาความลับของรหัสผ่าน หากพบการใช้งานบัญชีโดยไม่ได้รับอนุญาต กรุณาแจ้งเราทันที'
    },
    {
      number: 4,
      title: 'ข้อจำกัดความรับผิดชอบ',
      content: 'เว็บไซต์และบริการให้ใช้งาน "ตามสภาพ" (AS IS) และเราไม่รับประกันความถูกต้อง ครบถ้วน หรือความเหมาะสมสำหรับวัตถุประสงค์ใดๆ'
    },
    {
      number: 5,
      title: 'การแก้ไขข้อกำหนด',
      content: 'เราสงวนสิทธิ์ในการปรับปรุงหรือแก้ไขข้อกำหนดและเงื่อนไขได้ตลอดเวลา โดยจะแจ้งให้ผู้ใช้ทราบหากมีการเปลี่ยนแปลงที่สำคัญ'
    },
    {
      number: 6,
      title: 'นโยบายความเป็นส่วนตัว',
      content: 'การใช้งานเว็บไซต์และบริการของเราอยู่ภายใต้นโยบายความเป็นส่วนตัวของเรา ซึ่งอธิบายวิธีการที่เราเก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของคุณ'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-kanit bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />

      <BackToTopButton />

      <main className="flex-grow px-4 py-8 sm:px-6 sm:py-12">
        <TermsHeader />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <TableOfContents sections={sections} />
            
            <motion.div 
              className="flex-grow space-y-6 max-w-4xl mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {sections.map((section, index) => (
                <TermsSection
                  key={section.number}
                  number={section.number}
                  title={section.title}
                  content={section.content}
                  listItems={section.listItems}
                  delay={index}
                />
              ))}
              
              <div className="print:hidden mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-center"
                >
                  <h3 className="text-lg font-semibold mb-2 font-kanit text-indigo-800">ต้องการพิมพ์ข้อกำหนดนี้?</h3>
                  <p className="text-indigo-700 text-sm mb-4">คุณสามารถบันทึกหรือพิมพ์ข้อกำหนดและเงื่อนไขเหล่านี้เพื่อเก็บไว้อ้างอิงได้</p>
                  <button 
                    onClick={() => window.print()}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-kanit"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    พิมพ์ข้อกำหนด
                  </button>
                </motion.div>
              </div>
              
              <TermsFooter />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Print-specific styles - only applied when printing */}
      <style jsx global>{`
        @media print {
          nav, footer, button, .print\\:hidden {
            display: none !important;
          }
          body, html {
            background: white !important;
          }
          main {
            padding: 0 !important;
          }
          * {
            color: black !important;
            background: transparent !important;
            box-shadow: none !important;
            border-color: #ddd !important;
          }
        }
      `}</style>
    </div>
  );
}