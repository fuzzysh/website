//create a date
function cDate(d) {
        d = new Date(d);
        return +d && !isNaN(d) && d instanceof Date ? d : new Date();
}

// UTC date format, e.g. "Wed, 1 Jan 2025 07:30:00 GMT"
export function dateUTC( d ) {
        return cDate(d).toUTCString();
}

import { tacs } from 'publican';

// RSS feed
export function rss( str, domain ) {
        domain = domain || tacs?.config?.domain || '';

        const
                absRegEx = new RegExp(`(\\s(action|cite|data|href|ping|poster|src|srcset)="{0,1})${ tacs.root }`, 'gi'),
                replace = `$1${ domain }${ tacs.root }`;
        
        return str.trim()
                .replaceAll(/\s*tabindex="*.*?"*>/gi, '>')              // remove tabindexes
                .replaceAll(/\s*<a.*?class="*headlink"*>#<\/a>/gi, '')  // remove headlinks
                .replaceAll(absRegEx, replace);                         // use absolute URLs
}
