import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const form = await request.formData();
    const data = {};
    for (const [k, v] of form.entries()) {
      if (k !== 'images') data[k] = v;
    }
    const required = ['title','event_date','start_time','end_time','organizer_id'];
    for (const f of required) {
      if (!data[f]) {
        return NextResponse.json(
          { error: `กรุณาระบุ ${f}` }, { status: 400 }
        );
      }
    }

    const pool = mysqlPool.promise();
    const [res] = await pool.query(
      `INSERT INTO events
         (title, description, long_description, event_date,
          start_time, end_time, location, location_map_url,
          price, max_attendees, contact_email, contact_phone,
          website, category, status, organizer_id)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        data.title,
        data.description || null,
        data.long_description || null,
        data.event_date,
        data.start_time,
        data.end_time,
        data.location || null,
        data.location_map_url || null,
        parseFloat(data.price) || 0.0,
        parseInt(data.max_attendees) || 0,
        data.contact_email || null,
        data.contact_phone || null,
        data.website || null,
        data.category || null,
        data.status || 'open',
        parseInt(data.organizer_id)
      ]
    );
    const eventId = res.insertId;

    const files = form.getAll('images');
    for (const file of files) {
      if (!file.size) continue;
      const buf = Buffer.from(await file.arrayBuffer());
      const dir = path.join(process.cwd(), 'public', 'uploads', 'events', String(eventId));
      await fs.mkdir(dir, { recursive: true });
      const name = `${Date.now()}_${file.name}`;
      await fs.writeFile(path.join(dir, name), buf);
      const url = `/uploads/events/${eventId}/${name}`;
      await pool.query(
        'INSERT INTO event_images (event_id, image_url, caption) VALUES (?,?,?)',
        [eventId, url, null]
      );
    }

    return NextResponse.json({ message: 'สร้างกิจกรรมสำเร็จ' });
  } catch (err) {
    console.error('Add-event API error:', err);
    return NextResponse.json(
      { error: 'ไม่สามารถสร้างกิจกรรมได้' },
      { status: 500 }
    );
  }
}
