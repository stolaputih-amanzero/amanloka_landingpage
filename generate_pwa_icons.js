import Jimp from 'jimp';

async function generate() {
  const source = await Jimp.read('docs/pictures/aman_monogram_xl.png');
  
  // Generate 192x192 PWA Icon
  const canvas192 = new Jimp(192, 192, 0x050505ff); // Black background (#050505)
  const logo192 = source.clone().resize(120, 120); // Logo resized to 120px (padded)
  canvas192.composite(logo192, 36, 36); // Center the logo
  await canvas192.writeAsync('public/icon-192.png');
  
  // Generate 512x512 PWA Icon
  const canvas512 = new Jimp(512, 512, 0x050505ff); // Black background (#050505)
  const logo512 = source.clone().resize(320, 320); // Logo resized to 320px (padded)
  canvas512.composite(logo512, 96, 96); // Center the logo
  await canvas512.writeAsync('public/icon-512.png');

  console.log('PWA icons created successfully with black background and padding.');
}

generate().catch(console.error);
