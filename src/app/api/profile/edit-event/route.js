import { NextResponse } from 'next/server';
import { mysqlPool } from '@/utils/db';
import fs from 'fs';
import path from 'path';

export async function PUT(request) {
  try {
    const generateUniqueId = () => {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 10);
      return `${timestamp}-${randomStr}`;
    };
    
    const formData = await request.formData();
    const event_id = formData.get('event_id');
    const organizer_id = formData.get('organizer_id');
    
    if (!event_id || !organizer_id) {
      return NextResponse.json(
        { success: false, error: 'กรุณาระบุข้อมูลให้ครบถ้วน' },
        { status: 400 }
      );
    }

    const pool = mysqlPool.promise();
    
    const [authRows] = await pool.query(
      'SELECT organizer_id FROM events WHERE event_id = ?',
      [event_id]
    );
    
    if (authRows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'ไม่พบกิจกรรมที่ต้องการแก้ไข' },
        { status: 404 }
      );
    }
    
    if (authRows[0].organizer_id != organizer_id) {
      return NextResponse.json(
        { success: false, error: 'คุณไม่มีสิทธิ์แก้ไขกิจกรรมนี้' },
        { status: 403 }
      );
    }
    
    // Extract form data for event update
    const title = formData.get('title');
    const description = formData.get('description');
    const long_description = formData.get('long_description') || '';
    const event_date = formData.get('event_date');
    const start_time = formData.get('start_time');
    const end_time = formData.get('end_time');
    const location = formData.get('location');
    const location_map_url = formData.get('location_map_url') || '';
    const price = formData.get('price') || 0;
    const max_attendees = formData.get('max_attendees');
    const contact_email = formData.get('contact_email') || '';
    const contact_phone = formData.get('contact_phone') || '';
    const website = formData.get('website') || '';
    const category = formData.get('category') || '';
    const status = formData.get('status') || 'open';
    
    if (!title || !description || !event_date || !start_time || !end_time || !location || !max_attendees) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' },
        { status: 400 }
      );
    }
    
    await pool.query(
      `UPDATE events SET 
        title = ?, 
        description = ?, 
        long_description = ?, 
        event_date = ?, 
        start_time = ?, 
        end_time = ?, 
        location = ?, 
        location_map_url = ?, 
        price = ?, 
        max_attendees = ?, 
        contact_email = ?, 
        contact_phone = ?, 
        website = ?, 
        category = ?, 
        status = ?
      WHERE event_id = ?`,
      [
        title, description, long_description, event_date, start_time, end_time,
        location, location_map_url, price, max_attendees, contact_email,
        contact_phone, website, category, status, event_id
      ]
    );
    
    const imagesToRemoveStr = formData.get('images_to_remove');
    if (imagesToRemoveStr) {
      const imagesToRemove = JSON.parse(imagesToRemoveStr);
      if (Array.isArray(imagesToRemove) && imagesToRemove.length > 0) {
        await pool.query(
          'DELETE FROM event_images WHERE event_id = ? AND image_url IN (?)',
          [event_id, imagesToRemove]
        );
        
        imagesToRemove.forEach(imageUrl => {
          try {
            const filePath = path.join(process.cwd(), 'public', imageUrl.replace(/^\//, ''));
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          } catch (err) {
            console.error('Error deleting image file:', err);
          }
        });
      }
    }
    
    const newImages = formData.getAll('new_images');
    if (newImages && newImages.length > 0) {
      const [imageCountRows] = await pool.query(
        'SELECT COUNT(*) as count FROM event_images WHERE event_id = ?',
        [event_id]
      );
      
      const currentImageCount = imageCountRows[0].count;
      if (currentImageCount + newImages.length > 5) {
        return NextResponse.json(
          { success: false, error: 'จำนวนรูปภาพทั้งหมดต้องไม่เกิน 5 รูป' },
          { status: 400 }
        );
      }
      
      for (const image of newImages) {
        if (!image.name) continue;
        
        const buffer = await image.arrayBuffer();
        const fileExt = image.name.split('.').pop();
        const fileName = `${generateUniqueId()}.${fileExt}`; // Use our custom ID generator
        const relativePath = `/uploads/events/${fileName}`;
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'events', fileName);
        
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(filePath, Buffer.from(buffer));

        await pool.query(
          'INSERT INTO event_images (event_id, image_url) VALUES (?, ?)',
          [event_id, relativePath]
        );
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'อัปเดตกิจกรรมเรียบร้อยแล้ว'
    });
    
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'เกิดข้อผิดพลาดในการอัปเดตกิจกรรม' },
      { status: 500 }
    );
  }
}
