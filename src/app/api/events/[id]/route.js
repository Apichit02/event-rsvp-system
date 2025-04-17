import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

/**
 * @param {Request}
 * @param {Object}
 * @returns {Promise<NextResponse>}
 */
export async function GET(request, context) {
  try {
    const { id } = await context.params;
    if (!id || id === 'undefined') {
      return NextResponse.json(
        { success: false, error: 'Event ID is required' },
        { status: 400 }
      );
    }
    const pool = await mysqlPool.promise();
    const [rows] = await pool.query(`
      SELECT
        e.*,
        IFNULL((SELECT COUNT(*) FROM registrations WHERE event_id = e.event_id), 0) AS member_count,
        IFNULL((SELECT COUNT(*) FROM guest_registrations WHERE event_id = e.event_id), 0) AS guest_count,
        IFNULL((SELECT COUNT(*) FROM registrations WHERE event_id = e.event_id), 0)
          + IFNULL((SELECT COUNT(*) FROM guest_registrations WHERE event_id = e.event_id), 0)
          AS total_count,
        IFNULL(
          (SELECT JSON_ARRAYAGG(image_url) FROM event_images WHERE event_id = e.event_id),
          JSON_ARRAY()
        ) AS images
      FROM events e
      WHERE e.event_id = ?
      LIMIT 1;
    `, [id]);

    if (!rows.length) {
      return NextResponse.json(
        { success: false, error: 'Event not found', message: 'ไม่พบกิจกรรมที่ต้องการ' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, event: rows[0] });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error', message: 'เกิดข้อผิดพลาดภายใน' },
      { status: 500 }
    );
  }
}
