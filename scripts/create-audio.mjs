import fs from 'node:fs';
import path from 'node:path';

// Generate a valid minimal audio file for placeholder
// 2 seconds of a very soft 432Hz ambient chime tone as uncompressed WAV
const sampleRate = 22050;
const durationSeconds = 2;
const numSamples = sampleRate * durationSeconds;
const buffer = Buffer.alloc(44 + numSamples * 2);

// RIFF chunk descriptor
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + numSamples * 2, 4);
buffer.write('WAVE', 8);

// fmt sub-chunk
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
buffer.writeUInt16LE(1, 22); // NumChannels (1 = Mono)
buffer.writeUInt32LE(sampleRate, 24); // SampleRate
buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
buffer.writeUInt16LE(2, 32); // BlockAlign
buffer.writeUInt16LE(16, 34); // BitsPerSample

// data sub-chunk
buffer.write('data', 36);
buffer.writeUInt32LE(numSamples * 2, 40);

// Generate gentle fading tone
for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate;
  const envelope = Math.sin((Math.PI * i) / numSamples); // smooth rise and fall
  const freq = 432; // Calming frequency
  const sample = Math.sin(2 * Math.PI * freq * t) * envelope * 0.15; // Low gentle volume
  const intSample = Math.max(-32768, Math.min(32767, Math.floor(sample * 32767)));
  buffer.writeInt16LE(intSample, 44 + i * 2);
}

const targetPath = path.resolve('public/assets/wedding-music.mp3');
fs.writeFileSync(targetPath, buffer);
console.log('Created audio placeholder: public/assets/wedding-music.mp3');
