import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function POST(req) {
  try {
    const form = await req.formData();
    const event_id = form.get('event_id');
    const full_name = form.get('full_name');
    const email = form.get('email');
    const phone = form.get('phone') || null;

    if (!event_id || !full_name || !email) {
      return NextResponse.json(
        { error: 'กรุณากรอกกิจกรรม ชื่อ และอีเมล' },
        { status: 400 }
      );
    }

    const pool = mysqlPool.promise();

    const [evRows] = await pool.query(
      'SELECT 1 FROM events WHERE event_id = ?',
      [event_id]
    );
    if (!evRows.length) {
      return NextResponse.json(
        { error: 'กิจกรรมไม่ถูกต้อง' },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO guest_registrations
         (event_id, full_name, email, phone)
       VALUES (?, ?, ?, ?)`,
      [event_id, full_name, email, phone]
    );

    return NextResponse.json({ message: 'ลงทะเบียนสำเร็จ!' });
  } catch (err) {
    console.error('Registration Error:', err);
    return NextResponse.json(
      { error: 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่' },
      { status: 500 }
    );
  }
}
