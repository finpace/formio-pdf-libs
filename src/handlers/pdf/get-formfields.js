import { extractFormfields } from '../../services/pdf/formfields';

const getFormfields = async (req, res, next) => {
  try {
    const jsonOutput = await extractFormfields(req.filePath);
    res.json(jsonOutput);
  }
  catch (err) {
    return next(err);
  }
};

export default {getFormfields};
