import Jimp from 'jimp';

async function generate() {
  const source = await Jimp.read('docs/pictures/aman_monogram_xl.png');
  
  // 1. Generate Standard Transparent Icons (purpose: "any")
  const transparent192 = source.clone().resize(192, 192, Jimp.RESIZE_BICUBIC);
  await transparent192.writeAsync('public/icon-192.png');

  const transparent512 = source.clone().resize(512, 512, Jimp.RESIZE_BICUBIC);
  await transparent512.writeAsync('public/icon-512.png');

  // 2. Generate Maskable Icons (purpose: "maskable" with black background and padding)
  const canvas192 = new Jimp(192, 192, 0x050505ff); // Black background (#050505)
  const logo192 = source.clone().resize(120, 120, Jimp.RESIZE_BICUBIC); // Logo within safe zone
  canvas192.composite(logo192, 36, 36);
  await canvas192.writeAsync('public/icon-192-maskable.png');
  
  const canvas512 = new Jimp(512, 512, 0x050505ff); // Black background (#050505)
  const logo512 = source.clone().resize(320, 320, Jimp.RESIZE_BICUBIC); // Logo within safe zone
  canvas512.composite(logo512, 96, 96);
  await canvas512.writeAsync('public/icon-512-maskable.png');

  console.log('PWA standard and maskable icons created successfully.');
}

generate().catch(console.error);
