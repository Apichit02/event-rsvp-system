import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';

export async function GET() {
  const pool = mysqlPool.promise();
  const [rows] = await pool.query(`
    SELECT
      e.event_id,
      e.title,
      e.description,
      e.event_date,
      e.start_time,
      e.end_time,
      e.location,
      e.price,
      e.max_attendees,
      -- นับจากตาราง registrations
      (
        SELECT COUNT(*) FROM registrations r
        WHERE r.event_id = e.event_id
      ) AS registered_count,
      (
        SELECT JSON_ARRAYAGG(image_url)
        FROM event_images i
        WHERE i.event_id = e.event_id
      ) AS images,
      COALESCE((SELECT COUNT(*) FROM registrations WHERE event_id=e.event_id), 0) AS attendees_count,
      COALESCE((SELECT COUNT(*) FROM guest_registrations WHERE event_id=e.event_id), 0) AS guest_count,
      ( COALESCE((SELECT COUNT(*) FROM registrations WHERE event_id=e.event_id), 0)
      + COALESCE((SELECT COUNT(*) FROM guest_registrations WHERE event_id=e.event_id), 0)
      ) AS total_count
    FROM events e
    WHERE e.status = 'open'
    ORDER BY e.event_date ASC;
  `);
  return NextResponse.json({ events: rows });
}
