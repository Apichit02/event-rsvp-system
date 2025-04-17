import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const pool = mysqlPool.promise();

    // หา user ตาม email
    const [users] = await pool.query(
      'SELECT user_id, username, email, full_name, password_hash FROM users WHERE email = ?',
      [email]
    );
    if (users.length === 0) {
      return NextResponse.json({ error: 'ไม่พบอีเมลนี้' }, { status: 400 });
    }

    const user = users[0];

    // ตรวจรหัสผ่าน
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return NextResponse.json({ error: 'รหัสผ่านไม่ถูกต้อง' }, { status: 401 });
    }

    // สร้าง token
    const token = 'dummy-token-' + Date.now();

    // ส่งกลับ message, token และข้อมูล user
    return NextResponse.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email,
        full_name: user.full_name
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดภายในระบบ' }, { status: 500 });
  }
}
