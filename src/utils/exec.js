import util from 'util';
import { exec as execCallback } from 'child_process';

export const exec = util.promisify(execCallback);
