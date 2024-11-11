import { tmpdir } from 'os';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { psToPdf } from '../../services/pdf/convert-to-html/ps-to-pdf.js';

export const optimizePdf = (req, __res, next) => {
  req.debug('Optimizing PDF');
  const outputPath = join(tmpdir(), `${uuid()}.pdf`);
  psToPdf(req.filePath, outputPath, (err, filePath) => {
    if (err) {
      return next(err);
    }
    if (!filePath) {
      return next(new Error('Optimized PDF not found'));
    }
    req.filePath = filePath;
    req.optimizedPdf = true;
    next();
  });
};
