import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu seed dữ liệu...');

  // 1. Seed Regions
  const mb = await prisma.region.upsert({
    where: { code: 'MB' },
    update: {},
    create: {
      code: 'MB',
      slug: 'mien-bac',
      name: 'Miền Bắc',
      order: 1,
    },
  });

  const mt = await prisma.region.upsert({
    where: { code: 'MT' },
    update: {},
    create: {
      code: 'MT',
      slug: 'mien-trung',
      name: 'Miền Trung',
      order: 2,
    },
  });

  const mn = await prisma.region.upsert({
    where: { code: 'MN' },
    update: {},
    create: {
      code: 'MN',
      slug: 'mien-nam',
      name: 'Miền Nam',
      order: 3,
    },
  });

  console.log('Seed Regions thành công:', mb.name, mt.name, mn.name);

  // 2. Seed Provinces
  const hn = await prisma.province.upsert({
    where: { code: 'HN' },
    update: {},
    create: {
      code: 'HN',
      slug: 'ha-noi',
      name: 'Hà Nội',
      order: 1,
    },
  });

  const dn = await prisma.province.upsert({
    where: { code: 'DN' },
    update: {},
    create: {
      code: 'DN',
      slug: 'da-nang',
      name: 'Đà Nẵng',
      order: 2,
    },
  });

  const hcm = await prisma.province.upsert({
    where: { code: 'HCM' },
    update: {},
    create: {
      code: 'HCM',
      slug: 'ho-chi-minh',
      name: 'TP. Hồ Chí Minh',
      order: 3,
    },
  });

  console.log('Seed Provinces thành công:', hn.name, dn.name, hcm.name);

  // 3. Seed Stations
  const stationHN = await prisma.station.upsert({
    where: { code: 'XSHN' },
    update: {},
    create: {
      code: 'XSHN',
      slug: 'xshn',
      name: 'Đài Hà Nội',
      regionId: mb.id,
      provinceId: hn.id,
      order: 1,
    },
  });

  const stationDN = await prisma.station.upsert({
    where: { code: 'XSDN' },
    update: {},
    create: {
      code: 'XSDN',
      slug: 'xsdn',
      name: 'Đài Đà Nẵng',
      regionId: mt.id,
      provinceId: dn.id,
      order: 2,
    },
  });

  const stationHCM = await prisma.station.upsert({
    where: { code: 'XSHCM' },
    update: {},
    create: {
      code: 'XSHCM',
      slug: 'xshcm',
      name: 'Đài TP.HCM',
      regionId: mn.id,
      provinceId: hcm.id,
      order: 3,
    },
  });

  console.log('Seed Stations thành công:', stationHN.name, stationDN.name, stationHCM.name);
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed hoàn tất!');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
