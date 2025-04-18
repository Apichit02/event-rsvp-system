import { Suspense } from 'react';
import RegistrationsClient from './RegistrationsClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">กำลังโหลด...</div>}>
      <RegistrationsClient />
    </Suspense>
  );
}
