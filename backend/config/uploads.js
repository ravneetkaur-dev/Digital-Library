import path from 'path';
import fs from 'fs';

const uploadDir = path.join('/tmp', 'uploads'); // Render-safe writable folder

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export default uploadDir;
