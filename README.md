# Manoj & Ranjani — Luxury Interactive Wedding Invitation

A digital wedding invitation web application crafted for:
**R.S. Manoj, MIB. & K. Ranjani, M.Sc.**

---

## Visual & Interaction Flow
1. **Share Link / WhatsApp First Impression** — Warm ivory invitation card preview with title and couple names.
2. **Physical Invitation Envelope (Opening Experience)** — Custom 3D paper envelope with emerald lining, antique gold motifs, and central M&R seal.
3. **Interactive Opening** — Tap envelope / button triggers physical 3D flap opening, card slide-out, smooth camera zoom, and cinematic reveal of the hero section.
4. **Music Controller** — Background classical instrumental music begins automatically only upon invitation opening, with discrete play/pause/mute toggle and synthesized ambient tanpura fallback.
5. **Cinematic Hero** — Asymmetrical editorial layout with couple names, date, and portrait framing.
6. **Formal Invitation Intro & Family Blessings** — Blessings from parents (Mr. R. Sivasamy & Mrs. S. Devi and Mr. P. Kathirvel & Mrs. K. Kavithamani).
7. **The Couple** — Minimal editorial profile highlighting both individuals.
8. **The Wedding Ceremony (Muhurtham)** — Dramatic date section (22 November 2026), live countdown timer, and 1-click Google Calendar / .ics event download.
9. **The Reception** — Evening celebration details (21 November 2026, 06:00 PM – 09:00 PM).
10. **Two Days Timeline** — Editorial vertical timeline tracking both days of celebration.
11. **The Venue** — Sri Lakshmi Mahal, Kovilpalayam, Coimbatore with direct Google Maps route navigation and transit travel notes.
12. **The Families** — Respectful blessing cards for both families.
13. **Editorial Photo Gallery & Lightbox** — Asymmetric masonry grid with full-screen lightbox, swipe gesture support on mobile, and keyboard navigation.
14. **Stationery RSVP** — Authentic letterpress-style form with guest count selection, validation, local storage persistence, and pluggable submission handler.
15. **WhatsApp & Social Share** — Dedicated WhatsApp share integration and clipboard fallback.
16. **Final Emotional Closure & Footer** — "Forever starts here." full-viewport closure with couple monogram.

---

## Color Palette
- **Ivory / Cream (70%)**: `#F7F1E3`, `#EEE5D2`, `#D8CBB5`
- **Deep Forest / Dark Brown (20%)**: `#183B2C`, `#2A2119`
- **Antique Gold / Muted Sage (10%)**: `#B69A61`, `#788D78`

---

## Typography
- **Display**: Cormorant Garamond
- **Body**: Manrope
- **Accent**: Alex Brush (restrained script flourishes)

---

## How to Customize

### 1. Photo Replacement
All image placeholders are located in [`public/images/`](file:///c:/Users/SANJAY/OneDrive/Desktop/RS_invite/public/images/):
- `hero-placeholder.jpg`
- `couple-placeholder.jpg`
- `venue-placeholder.jpg`
- `gallery-01.jpg` through `gallery-06.jpg`
- `final-placeholder.jpg`
- `og-preview.jpg`

Simply replace these files with the couple's high-resolution photographs. The [`WeddingImagePlaceholder`](file:///c:/Users/SANJAY/OneDrive/Desktop/RS_invite/src/components/WeddingImagePlaceholder.tsx) component automatically displays the real images with smooth object-cover styling and lightbox previews.

### 2. Audio Replacement
Place your preferred instrumental or traditional music file at [`public/assets/wedding-music.mp3`](file:///c:/Users/SANJAY/OneDrive/Desktop/RS_invite/public/assets/wedding-music.mp3).
If no custom file is supplied, an ambient classical Indian harmonic drone synthesized via the Web Audio API plays automatically.

### 3. Modifying Dates, Venue or Family Info
All data is centralized in [`src/data/weddingData.ts`](file:///c:/Users/SANJAY/OneDrive/Desktop/RS_invite/src/data/weddingData.ts).

---

## Development & Deployment

### Run locally
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

The output in `dist/` is ready for deployment on Vercel, Netlify, Cloudflare Pages, AWS, or any static hosting platform.
