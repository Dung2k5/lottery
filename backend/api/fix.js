const fs = require('fs');
let t = fs.readFileSync('prisma/schema.prisma', 'utf8');
t = t.replace(/reason.*String.*/g, 'reason String?');
fs.writeFileSync('prisma/schema.prisma', t);
