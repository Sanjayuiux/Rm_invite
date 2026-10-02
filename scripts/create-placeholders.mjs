import fs from 'node:fs';
import path from 'node:path';

// Minimal valid 1x1 warm ivory/beige JPEG file binary
// FF D8 (SOI) + APP0 (JFIF) + DQT + SOF0 + DHT + SOS + Data + FF D9 (EOI)
const minimalJpegBase64 = 
  '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';

const buffer = Buffer.from(minimalJpegBase64, 'base64');

const files = [
  'hero-placeholder.jpg',
  'couple-placeholder.jpg',
  'venue-placeholder.jpg',
  'gallery-01.jpg',
  'gallery-02.jpg',
  'gallery-03.jpg',
  'gallery-04.jpg',
  'gallery-05.jpg',
  'gallery-06.jpg',
  'final-placeholder.jpg',
  'og-preview.jpg',
];

const targetDir = path.resolve('public/images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const f of files) {
  const p = path.join(targetDir, f);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, buffer);
    console.log(`Created: ${f}`);
  }
}
