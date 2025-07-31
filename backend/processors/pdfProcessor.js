const pdfParse = require("pdf-parse");
const { fromBuffer } = require("pdf2pic");
const Tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function extractTextFromPDF(buffer) {
  // Try direct text extraction first
  const parsed = await pdfParse(buffer);
  if (parsed.text && parsed.text.trim().length > 100) {
    return parsed.text;
  }

  // Fallback to OCR if text is insufficient
  const tmpDir = path.join(os.tmpdir(), "ocr-pdf");
  const converter = fromBuffer(buffer, {
    density: 150,
    savePath: tmpDir,
    format: "png",
    width: 1024,
    height: 1024,
  });

  const page = await converter(1); // Just the first page for now
  const result = await Tesseract.recognize(page.path, "eng");

  // Clean up image after OCR
  try {
    fs.unlinkSync(page.path);
  } catch (err) {
    console.warn("Could not delete temp image:", err);
  }

  return result.data.text;
}

module.exports = { extractTextFromPDF };
