import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function POST(req) {
  try {
    const { event_id, user_id } = await req.json();
    if (!event_id || !user_id) {
      return NextResponse.json(
        { error: 'event_id และ user_id ต้องระบุ' },
        { status: 400 }
      );
    }

    const pool = mysqlPool.promise();

    const [exists] = await pool.query(
      'SELECT 1 FROM registrations WHERE user_id = ? AND event_id = ?',
      [user_id, event_id]
    );
    if (exists.length) {
      return NextResponse.json(
        { error: 'คุณได้ลงทะเบียนกิจกรรมนี้แล้ว' },
        { status: 400 }
      );
    }

    await pool.query(
      'INSERT INTO registrations (user_id, event_id) VALUES (?, ?)',
      [user_id, event_id]
    );

    return NextResponse.json({ message: 'ลงทะเบียนสำเร็จ (สมาชิก)' });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่' },
      { status: 500 }
    );
  }
}
