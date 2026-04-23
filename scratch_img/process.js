const { Jimp, intToRGBA } = require('jimp');

async function main() {
  const imagePath = "c:\\Users\\AMIT VIDHATE\\Downloads\\Gemini_Generated_Image_om00gmom00gmom00.png";
  const outputPath = "c:\\Users\\AMIT VIDHATE\\Downloads\\tempus\\public\\ai-support.png";
  
  const image = await Jimp.read(imagePath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  // Crop to top 52%
  const cropH = Math.floor(h * 0.52);
  image.crop({x: 0, y: 0, w: w, h: cropH});

  const visited = new Uint8Array(w * cropH);
  const queue = [];
  
  // Seed all edges as background
  for (let x = 0; x < w; x++) {
    queue.push({x, y: 0});
    queue.push({x, y: cropH - 1});
  }
  for (let y = 0; y < cropH; y++) {
    queue.push({x: 0, y});
    queue.push({x: w - 1, y});
  }
  
  const threshold = 100; // Allow a large threshold since we rely on the character outline to stop the flood fill!

  while (queue.length > 0) {
    const {x, y} = queue.pop();
    const idx = y * w + x;
    if (visited[idx]) continue;
    visited[idx] = 1;
    
    const color = image.getPixelColor(x, y);
    const rgba = intToRGBA(color);
    
    // Background is generally yellow/bright. The character has black hair and a yellow/black shirt.
    // We can assume background is yellowish.
    // If it's too dark, it's the character.
    if (rgba.r > 150 && rgba.g > 150 && rgba.b < 200) {
      image.setPixelColor(0x00000000, x, y);
      
      if (x > 0 && !visited[y * w + (x - 1)]) queue.push({x: x-1, y: y});
      if (x < w - 1 && !visited[y * w + (x + 1)]) queue.push({x: x+1, y: y});
      if (y > 0 && !visited[(y - 1) * w + x]) queue.push({x: x, y: y-1});
      if (y < cropH - 1 && !visited[(y + 1) * w + x]) queue.push({x: x, y: y+1});
    }
  }
  
  await image.write(outputPath);
  console.log("Flood fill completed");
}

main().catch(console.error);
