import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function DELETE(request) {
  try {
    const data = await request.json();
    const { eventId, userId } = data;
    
    if (!eventId || !userId) {
      return NextResponse.json(
        { error: 'ข้อมูลไม่ครบถ้วน กรุณาระบุ eventId และ userId' },
        { status: 400 }
      );
    }
    
    const pool = mysqlPool.promise();
    
    const [eventRows] = await pool.query(
      'SELECT * FROM events WHERE event_id = ? AND event_date >= CURDATE()',
      [eventId]
    );
    
    if (eventRows.length === 0) {
      return NextResponse.json(
        { error: 'ไม่สามารถยกเลิกการลงทะเบียนได้ กิจกรรมอาจไม่มีอยู่หรือผ่านไปแล้ว' },
        { status: 400 }
      );
    }
    
    const [registrationRows] = await pool.query(
      'SELECT * FROM registrations WHERE event_id = ? AND user_id = ?',
      [eventId, userId]
    );
    
    if (registrationRows.length === 0) {
      return NextResponse.json(
        { error: 'ไม่พบข้อมูลการลงทะเบียนนี้' },
        { status: 404 }
      );
    }
    
    await pool.query('START TRANSACTION');
    
    try {
      await pool.query(
        'DELETE FROM registrations WHERE event_id = ? AND user_id = ?',
        [eventId, userId]
      );
      
      await pool.query(
        'UPDATE events SET attendees_count = attendees_count - 1 WHERE event_id = ?',
        [eventId]
      );
      
      await pool.query('COMMIT');
      
      return NextResponse.json({
        success: true,
        message: 'ยกเลิกการลงทะเบียนเรียบร้อยแล้ว'
      });
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error('Error canceling registration:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการยกเลิกการลงทะเบียน' },
      { status: 500 }
    );
  }
}
