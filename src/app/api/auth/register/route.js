import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { username, email, password, full_name } = await req.json();
    const promisePool = mysqlPool.promise();

    const [existing] = await promisePool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email หรือ Username มีอยู่แล้ว' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    await promisePool.query(
      'INSERT INTO users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)',
      [username, email, hash, full_name]
    );

    return NextResponse.json({ message: 'สมัครสมาชิกสำเร็จ!' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาด' }, { status: 500 });
  }
}
