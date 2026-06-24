// imports
import { Publican, tacs } from 'publican';
import { libInit } from 'publican.lib';

// create Publican object
const publican = new Publican();

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

// build site
await publican.build();
