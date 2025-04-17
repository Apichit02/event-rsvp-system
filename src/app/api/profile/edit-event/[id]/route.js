import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request, { params }) {
  const { id } = params;
  const [rows] = await mysqlPool.promise().query('SELECT * FROM events WHERE event_id = ?', [id]);
  if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ event: rows[0] });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const form = await request.formData();
  const data = {};
  for (const [k,v] of form.entries()) if (k !== 'images') data[k] = v;

  const fields = [
    'title','description','long_description','event_date','start_time','end_time',
    'location','location_map_url','price','max_attendees','contact_email',
    'contact_phone','website','category','status'
  ];
  const values = fields.map(f => data[f] ?? null);
  values.push(id);
  const sql = `UPDATE events SET ${fields.map(f=>f+'=?').join(', ')} WHERE event_id=?`;
  await mysqlPool.promise().query(sql, values);

  const files = form.getAll('images');
  for (const file of files) {
    if (!file.size) continue;
    const buf = Buffer.from(await file.arrayBuffer());
    const dir = path.join(process.cwd(), 'public', 'uploads', 'events', id);
    await fs.mkdir(dir, { recursive: true });
    const name = `${Date.now()}_${file.name}`;
    await fs.writeFile(path.join(dir, name), buf);
    const url = `/uploads/events/${id}/${name}`;
    await mysqlPool.promise().query(
      'INSERT INTO event_images (event_id, image_url, caption) VALUES (?,?,?)',
      [id, url, null]
    );
  }

  return NextResponse.json({ message: 'อัปเดตกิจกรรมสำเร็จ' });
}

export async function DELETE(request, { params }) {
  const { id } = params;
  await mysqlPool.promise().query('DELETE FROM events WHERE event_id = ?', [id]);
  return NextResponse.json({ message: 'ลบกิจกรรมสำเร็จ' });
}
