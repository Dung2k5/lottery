const fs = require('fs');
let t = fs.readFileSync('prisma/schema.prisma', 'utf8');
t = t.replace(/[^\x00-\x7F]/g, '');
fs.writeFileSync('prisma/schema.prisma', t);
