import { join } from 'path';
import { tmpdir } from 'os';
import { v4 as uuid } from 'uuid';

import { hideFormfieldsPath } from '../../../config';
import { exec } from '../../utils';

const hideFormfields = async (req, __res, next) => {
  const outputPath = join(tmpdir(), `${uuid()}.pdf`);
  req.cleanup.push(outputPath);

  await exec(`${hideFormfieldsPath} ${req.filePath} ${outputPath}`);
  req.filePath = outputPath;
  next();
};

export default {hideFormfields};
