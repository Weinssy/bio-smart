const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    };
    
    const req = https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(dest);
      });
    });

    req.on('error', err => reject(err));
  });
};

const run = async () => {
  try {
    // 1. Membran Sel
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Cell_membrane_detailed_diagram_id.svg/800px-Cell_membrane_detailed_diagram_id.svg.png', 'd:/Project Wein/Bio Study/public/images/diagrams/sel/membran-sel.png');
    // 2. Anatomi Jantung
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Diagram_of_the_human_heart_%28cropped%29.svg/800px-Diagram_of_the_human_heart_%28cropped%29.svg.png', 'd:/Project Wein/Bio Study/public/images/diagrams/sistem-organ/anatomi-jantung.png');
    // 3. Sistem Pernapasan
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Respiratory_system_complete_en.svg/600px-Respiratory_system_complete_en.svg.png', 'd:/Project Wein/Bio Study/public/images/diagrams/sistem-organ/sistem-pernapasan.png');
    // 4. Mitosis
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mitosis_diagram.jpg/800px-Mitosis_diagram.jpg', 'd:/Project Wein/Bio Study/public/images/diagrams/sel/mitosis.jpg');
    // 5. Fertilisasi
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sperm-egg.jpg/800px-Sperm-egg.jpg', 'd:/Project Wein/Bio Study/public/images/diagrams/reproduksi/fertilisasi.jpg');
    // 6. Piramida Makanan
    await download('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Food_Pyramid.jpg/600px-Food_Pyramid.jpg', 'd:/Project Wein/Bio Study/public/images/diagrams/ekologi/piramida-makanan.jpg');
    console.log("All downloads successful!");
  } catch (e) {
    console.error(e);
  }
};

run();
