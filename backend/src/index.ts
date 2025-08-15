import express from 'express';
import multer from 'multer';
import cors from 'cors';
import axios from 'axios';
import XLSX from 'xlsx';
import { checkDiscrepancies } from './utils/discrepancyChecker';

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('invoice'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = (req.file as Express.Multer.File).path;
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const invoiceRecords = XLSX.utils.sheet_to_json(sheet, { header: 1 });

   
    const { data: refDrugs } = await axios.get('https://685daed17b57aebd2af6da54.mockapi.io/api/v1/drugs');

   
    const discrepancies = checkDiscrepancies(invoiceRecords, refDrugs);

 
    res.json({ discrepancies });
  } catch (err) {
    res.status(500).json({ error: 'Processing failed', details: err });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
