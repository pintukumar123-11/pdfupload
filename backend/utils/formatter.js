function cleanLLMOutput(rawText) {
  return rawText
    .replace(/<[^>]*>/g, '')      // remove HTML
    .replace(/\*\*/g, '')         // remove markdown bold
    .replace(/^\s*[QA]:.*$/gm, '') // remove Q: / A: lines
    .replace(/\n{2,}/g, '\n')     // collapse newlines
    .trim();
}

module.exports = { cleanLLMOutput };
