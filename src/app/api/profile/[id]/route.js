import { mysqlPool } from '@/utils/db';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  try {
    const { id } = await context.params;
    const pool = mysqlPool.promise();

    const [organizedRows] = await pool.query(`
      SELECT
        e.*,
        e.attendees_count AS member_count,
        COALESCE((SELECT COUNT(*) FROM guest_registrations WHERE event_id=e.event_id),0) AS guest_count,
        (e.attendees_count +
         COALESCE((SELECT COUNT(*) FROM guest_registrations WHERE event_id=e.event_id),0)
        ) AS total_count,
        (SELECT JSON_ARRAYAGG(image_url) FROM event_images WHERE event_id=e.event_id) AS images,

        -- member registrant details (no phone field in users)
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', u.full_name,
              'email', u.email
            )
          )
          FROM registrations r
          JOIN users u ON r.user_id = u.user_id
          WHERE r.event_id = e.event_id
        ) AS member_registrants,

        -- guest registrant details (includes phone)
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', g.full_name,
              'email', g.email,
              'phone', g.phone
            )
          )
          FROM guest_registrations g
          WHERE g.event_id = e.event_id
        ) AS guest_registrants
      FROM events e
      WHERE e.organizer_id = ?
      ORDER BY e.event_date DESC
    `, [id]);

    const [registeredRows] = await pool.query(`
      SELECT
        e.event_id, e.title, e.description, e.long_description,
        e.event_date, e.start_time, e.end_time,
        e.location, e.location_map_url,
        e.price, e.max_attendees,
        e.attendees_count AS member_count,
        COALESCE((SELECT COUNT(*) FROM guest_registrations WHERE event_id=e.event_id), 0) AS guest_count,
        (e.attendees_count
          + COALESCE((SELECT COUNT(*) FROM guest_registrations WHERE event_id=e.event_id),0)
        ) AS total_count,
        (SELECT JSON_ARRAYAGG(image_url) FROM event_images WHERE event_id=e.event_id) AS images,
        r.registration_date,
        e.contact_email, e.contact_phone, e.website,
        e.category, e.status,
        e.organizer_id, e.created_at, e.updated_at
      FROM events e
      JOIN registrations r ON e.event_id = r.event_id
      WHERE r.user_id = ?
      ORDER BY r.registration_date DESC
    `, [id]);

    const [userRows] = await pool.query(
      'SELECT user_id, username, email, full_name, created_at FROM users WHERE user_id = ?',
      [id]
    );
    const user = userRows[0] || null;

    return NextResponse.json({
      user,
      organizedEvents: organizedRows,
      registeredEvents: registeredRows
    });
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile data' },
      { status: 500 }
    );
  }
}