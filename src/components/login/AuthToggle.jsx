import React from 'react';
import { useRouter } from 'next/navigation';

export default function AuthToggle({ mode }) {
  const router = useRouter();
  
  return (
    <div className="text-center mt-6 font-kanit">
      <p className="text-gray-600 mb-2">
        {mode === 'login' ? 'ยังไม่มีบัญชีกับเรา?' : 'มีบัญชีแล้ว?'}
      </p>
      <button
        onClick={() => router.push(`/login?mode=${mode === 'login' ? 'register' : 'login'}`)}
        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300 text-sm underline-offset-4 hover:underline"
      >
        {mode === 'login' ? 'สมัครสมาชิกใหม่' : 'เข้าสู่ระบบ'}
      </button>
    </div>
  );
}
