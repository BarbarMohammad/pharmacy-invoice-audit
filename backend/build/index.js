"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const xlsx_1 = __importDefault(require("xlsx"));
const discrepancyChecker_1 = require("./utils/discrepancyChecker");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.post('/api/upload', upload.single('invoice'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;
        const workbook = xlsx_1.default.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const invoiceRecords = xlsx_1.default.utils.sheet_to_json(sheet, { header: 1 });

        const { data: refDrugs } = await axios_1.default.get('https://685daed17b57aebd2af6da54.mockapi.io/api/v1/drugs');

        const discrepancies = (0, discrepancyChecker_1.checkDiscrepancies)(invoiceRecords, refDrugs);

        res.json({ discrepancies });
    }
    catch (err) {
        res.status(500).json({ error: 'Processing failed', details: err });
    }
});
