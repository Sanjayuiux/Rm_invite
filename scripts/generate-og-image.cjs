const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generatePreviewImage() {
  const width = 1200;
  const height = 630;

  // Layout measurements
  const photoWidth = 360;
  const photoHeight = 470;
  const radius = photoWidth / 2; // 180
  const photoLeft = 105;
  const photoTop = 80;
  const bottomCornerRadius = 16;

  // 1. Prepare masked couple photo
  const couplePhotoPath = path.join(__dirname, '../public/images/couple-portrait.jpg');
  
  // Arch mask SVG with curved arch top and soft rounded bottom
  const archMaskSvg = `
    <svg width="${photoWidth}" height="${photoHeight}" viewBox="0 0 ${photoWidth} ${photoHeight}" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 0,${radius}
        A ${radius},${radius} 0 0,1 ${photoWidth},${radius}
        L ${photoWidth},${photoHeight - bottomCornerRadius}
        Q ${photoWidth},${photoHeight} ${photoWidth - bottomCornerRadius},${photoHeight}
        L ${bottomCornerRadius},${photoHeight}
        Q 0,${photoHeight} 0,${photoHeight - bottomCornerRadius}
        Z
      " fill="#FFFFFF" />
    </svg>
  `;

  const resizedPhoto = await sharp(couplePhotoPath)
    .resize(photoWidth, photoHeight, { fit: 'cover', position: 'top' })
    .toBuffer();

  const archedPhoto = await sharp(resizedPhoto)
    .composite([{
      input: Buffer.from(archMaskSvg),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  const rightCenter = 835;

  // 2. Base card SVG (background, borders, flourishes, typography)
  const baseCardSvg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .serif-title { font-family: 'Georgia', 'Times New Roman', serif; font-size: 62px; font-weight: normal; font-style: italic; fill: #541820; }
          .sans-sub { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 500; letter-spacing: 5px; text-transform: uppercase; fill: #B69A61; }
          .sans-date { font-family: 'Georgia', serif; font-size: 26px; font-weight: 400; fill: #541820; letter-spacing: 2px; }
          .sans-venue { font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 3.5px; text-transform: uppercase; fill: #95666A; }
          .ampersand { font-family: 'Georgia', serif; font-size: 34px; font-style: italic; fill: #B69A61; }
          .monogram-text { font-family: 'Georgia', serif; font-size: 18px; font-style: italic; fill: #541820; }
        </style>
      </defs>

      <!-- Outer Background Warm Ivory -->
      <rect width="${width}" height="${height}" fill="#F4EDE1" />

      <!-- Inner Stationery Card -->
      <rect x="36" y="32" width="${width - 72}" height="${height - 64}" rx="12" fill="#FAF6EE" stroke="#E2D4BE" stroke-width="1" />

      <!-- Ornate Gold Outer Border -->
      <rect x="52" y="48" width="${width - 104}" height="${height - 96}" rx="6" fill="none" stroke="#B69A61" stroke-width="1.5" stroke-opacity="0.8" />
      
      <!-- Ornate Gold Inner Fine Border -->
      <rect x="60" y="56" width="${width - 120}" height="${height - 112}" rx="3" fill="none" stroke="#B69A61" stroke-width="0.75" stroke-opacity="0.4" stroke-dasharray="6 3" />

      <!-- Corner Flourishes -->
      <!-- Top Left -->
      <path d="M 68 84 L 68 68 L 84 68" fill="none" stroke="#B69A61" stroke-width="2" />
      <circle cx="68" cy="68" r="3" fill="#B69A61" />
      <!-- Top Right -->
      <path d="M ${width - 84} 68 L ${width - 68} 68 L ${width - 68} 84" fill="none" stroke="#B69A61" stroke-width="2" />
      <circle cx="${width - 68}" cy="68" r="3" fill="#B69A61" />
      <!-- Bottom Left -->
      <path d="M 68 ${height - 84} L 68 ${height - 68} L 84 ${height - 68}" fill="none" stroke="#B69A61" stroke-width="2" />
      <circle cx="68" cy="${height - 68}" r="3" fill="#B69A61" />
      <!-- Bottom Right -->
      <path d="M ${width - 84} ${height - 68} L ${width - 68} ${height - 68} L ${width - 68} ${height - 84}" fill="none" stroke="#B69A61" stroke-width="2" />
      <circle cx="${width - 68}" cy="${height - 68}" r="3" fill="#B69A61" />

      <!-- Vertical Divider Between Photo and Text -->
      <line x1="515" y1="85" x2="515" y2="545" stroke="#B69A61" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="5 5" />
      <circle cx="515" cy="315" r="4" fill="#B69A61" opacity="0.6" />

      <!-- RIGHT SIDE: LUXURY INVITATION TYPOGRAPHY -->
      <!-- Monogram -->
      <circle cx="${rightCenter}" cy="115" r="26" fill="none" stroke="#B69A61" stroke-width="1.2" />
      <circle cx="${rightCenter}" cy="115" r="23" fill="none" stroke="#B69A61" stroke-width="0.5" stroke-dasharray="2 2" opacity="0.6" />
      <text x="${rightCenter}" y="122" text-anchor="middle" class="monogram-text">M &amp; R</text>

      <!-- Section Label -->
      <line x1="${rightCenter - 145}" y1="172" x2="${rightCenter - 100}" y2="172" stroke="#B69A61" stroke-width="0.8" opacity="0.5" />
      <text x="${rightCenter}" y="176" text-anchor="middle" class="sans-sub">Wedding Invitation</text>
      <line x1="${rightCenter + 100}" y1="172" x2="${rightCenter + 145}" y2="172" stroke="#B69A61" stroke-width="0.8" opacity="0.5" />

      <!-- Couple Names -->
      <text x="${rightCenter}" y="246" text-anchor="middle" class="serif-title">Manoj</text>
      <text x="${rightCenter}" y="286" text-anchor="middle" class="ampersand">&amp;</text>
      <text x="${rightCenter}" y="344" text-anchor="middle" class="serif-title">Ranjani</text>

      <!-- Decorative Divider -->
      <path d="M ${rightCenter - 100} 380 Q ${rightCenter} 370 ${rightCenter + 100} 380" fill="none" stroke="#B69A61" stroke-width="1" opacity="0.6" />
      <circle cx="${rightCenter}" cy="375" r="3" fill="#B69A61" />

      <!-- Date -->
      <text x="${rightCenter}" y="426" text-anchor="middle" class="sans-date">22 · November · 2026</text>
      <text x="${rightCenter}" y="454" text-anchor="middle" class="sans-venue" style="font-size: 12px; letter-spacing: 5px;">SUNDAY · MUHURTHAM 6:00 AM</text>

      <!-- Venue -->
      <line x1="${rightCenter - 65}" y1="482" x2="${rightCenter + 65}" y2="482" stroke="#B69A61" stroke-width="0.6" opacity="0.4" />
      <text x="${rightCenter}" y="510" text-anchor="middle" class="sans-venue" style="fill: #541820; font-weight: 600;">SRI LAKSHMI MAHAL</text>
      <text x="${rightCenter}" y="530" text-anchor="middle" class="sans-venue" style="font-size: 11px;">KOVILPALAYAM · COIMBATORE</text>
    </svg>
  `;

  // 3. Arch frame border SVG with matching path outline
  const pad = 6;
  const frameWidth = photoWidth + pad * 2;
  const frameHeight = photoHeight + pad * 2;
  const frameRadius = frameWidth / 2;
  const frameBottomRadius = bottomCornerRadius + pad;

  const archBorderSvg = `
    <svg width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer gold arch line -->
      <path d="
        M 0,${frameRadius}
        A ${frameRadius},${frameRadius} 0 0,1 ${frameWidth},${frameRadius}
        L ${frameWidth},${frameHeight - frameBottomRadius}
        Q ${frameWidth},${frameHeight} ${frameWidth - frameBottomRadius},${frameHeight}
        L ${frameBottomRadius},${frameHeight}
        Q 0,${frameHeight} 0,${frameHeight - frameBottomRadius}
        Z
      " fill="none" stroke="#B69A61" stroke-width="1.8" stroke-opacity="0.9" />

      <!-- Inner gold fine line -->
      <path d="
        M ${pad},${radius + pad}
        A ${radius},${radius} 0 0,1 ${photoWidth + pad},${radius + pad}
        L ${photoWidth + pad},${photoHeight + pad - bottomCornerRadius}
        Q ${photoWidth + pad},${photoHeight + pad} ${photoWidth + pad - bottomCornerRadius},${photoHeight + pad}
        L ${bottomCornerRadius + pad},${photoHeight + pad}
        Q ${pad},${photoHeight + pad} ${pad},${photoHeight + pad - bottomCornerRadius}
        Z
      " fill="none" stroke="#B69A61" stroke-width="0.8" stroke-opacity="0.5" stroke-dasharray="4 3" />
    </svg>
  `;

  const outputPath = path.join(__dirname, '../public/images/wedding-preview.jpg');

  // Generate base image from base SVG
  const baseBuffer = await sharp(Buffer.from(baseCardSvg)).png().toBuffer();

  // Composite photo and arch border onto base
  await sharp(baseBuffer)
    .composite([
      {
        input: archedPhoto,
        top: photoTop,
        left: photoLeft
      },
      {
        input: Buffer.from(archBorderSvg),
        top: photoTop - pad,
        left: photoLeft - pad
      }
    ])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath);

  console.log(`Generated wedding preview image at ${outputPath}`);
  
  // Also copy to og-preview.jpg
  const ogPreviewPath = path.join(__dirname, '../public/images/og-preview.jpg');
  fs.copyFileSync(outputPath, ogPreviewPath);
  console.log(`Copied to ${ogPreviewPath}`);
}

generatePreviewImage().catch(console.error);
