/* eslint-disable no-undef */
import dotenv from 'dotenv';
import { TextEncoder, TextDecoder } from 'util';

dotenv.config({ path: '.env.test' });

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
