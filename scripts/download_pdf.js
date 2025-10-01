const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://api.t31k.cloud/home/pdfs';
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'pdf.json');

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            resolve(json);
          } catch (error) {
            reject(new Error('Failed to parse JSON: ' + error.message));
          }
        });
      })
      .on('error', (error) => {
        reject(new Error('Request failed: ' + error.message));
      });
  });
}

async function downloadPDFData() {
  try {
    console.log('Fetching PDF data from:', API_URL);
    const data = await fetchData(API_URL);

    console.log(`Received ${data.total} PDFs`);

    // Ensure public directory exists
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write JSON data to file (NOT the PDF files themselves, just the metadata)
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');

    console.log('✓ PDF metadata saved to:', OUTPUT_FILE);
    console.log(`✓ Successfully saved ${data.total} PDF records`);
  } catch (error) {
    console.error('✗ Error downloading PDF data:', error.message);

    // Create empty file if fetch fails so build doesn't break
    const fallbackData = { total: 0, pdfs: [] };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fallbackData, null, 2), 'utf8');
    console.log('✓ Created fallback pdf.json with empty data');

    process.exit(0); // Don't fail the build
  }
}

downloadPDFData();
