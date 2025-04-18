import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function DELETE(request, context) {
  const { id } = await context.params;
  const pool = mysqlPool.promise();

  try {
    await pool.query(
      'DELETE FROM registrations WHERE event_id = ?',
      [id]
    );

    const [result] = await pool.query(
      'DELETE FROM events WHERE event_id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบกิจกรรมที่ระบุ' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการลบกิจกรรม' },
      { status: 500 }
    );
  }
}
