// imports
import { Publican, tacs } from 'publican';
import { libInit } from 'publican.lib';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

// create Publican object
const publican = new Publican();

//cache-busting
const cssDir = path.join(process.cwd(), 'src', 'static', 'css');

//generate hash
function getFileHash(filePath) {
        try {
                const content = fs.readFileSync(filePath, 'utf8');
                return crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
        } catch (_) {
                return '0'; //fallback if file is missing
        }
}

//map css dir 
const cssHashes = {};
if (fs.existsSync(cssDir)) {
        const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
        for (const file of files) {
                const urlPath = `/css/${file}`;
                const fullPath = path.join(cssDir, file);
                cssHashes[urlPath] = getFileHash(fullPath);
        }
} else {
        console.warn('CSS directory not found, cache-busting disabled');
}


//copy static files to build
publican.config.passThrough.add({ from: './src/static/', to: './' });
// omit link from heading
publican.config.headingAnchor = false;
publican.config.watch = true;
tacs.config = {
  domain: 'https://example.com'
};
// initialize publican.lib
libInit(publican, tacs);
// optionally set the default language
tacs.lib.format.setLocale( 'en-CA' );

tacs.cssHashes = cssHashes;

// build site
await publican.build();
