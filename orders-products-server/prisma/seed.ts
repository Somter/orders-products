import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Очистка старых данных...");
  await prisma.price.deleteMany();
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();

  console.log("Создаем приходы (Orders)...");
  await prisma.order.createMany({
    data: [
      {
        id: 1,
        title: "Приход офис Киев",
        date: new Date("2025-10-10T10:00:00Z"),
        description: "Закупка оборудования для нового отдела разработки",
      },
      {
        id: 2,
        title: "Складской приход №2",
        date: new Date("2026-01-15T14:30:00Z"),
        description: "Плановое обновление периферии и мониторов",
      },
      {
        id: 3,
        title: "Поставка комплектующих",
        date: new Date("2026-04-20T09:15:00Z"),
        description: "Запчасти и компоненты для сборки рабочих станций",
      },
      {
        id: 4,
        title: "Розничный приход Юг",
        date: new Date("2026-08-05T16:45:00Z"),
        description: "Поставка ноутбуков и аксессуаров",
      },
    ],
  });

  console.log("Создаем продукты (Products) и цены...");
  const productsData = [
    {
      id: 1,
      serialNumber: 1001,
      isNew: 1,
      photo: "pathToFile.jpg",
      title: "Dell UltraSharp 27",
      type: "Monitors",
      specification: "IPS 4K UHD, 60Hz, USB-C",
      guaranteeStart: new Date("2025-10-10T00:00:00Z"),
      guaranteeEnd: new Date("2027-10-10T00:00:00Z"),
      date: new Date("2025-10-10T10:00:00Z"),
      orderId: 1,
      prices: [
        { value: 450, symbol: "USD", isDefault: 0 },
        { value: 18450, symbol: "UAH", isDefault: 1 },
      ],
    },
    {
      id: 2,
      serialNumber: 1002,
      isNew: 1,
      photo: "pathToFile.jpg",
      title: "MacBook Pro 16 M3",
      type: "Laptops",
      specification: "Apple M3 Pro, 18GB RAM, 512GB SSD",
      guaranteeStart: new Date("2026-01-15T00:00:00Z"),
      guaranteeEnd: new Date("2027-01-15T00:00:00Z"),
      date: new Date("2026-01-15T14:30:00Z"),
      orderId: 2,
      prices: [
        { value: 2400, symbol: "USD", isDefault: 0 },
        { value: 98400, symbol: "UAH", isDefault: 1 },
      ],
    },
    {
      id: 3,
      serialNumber: 1003,
      isNew: 0,
      photo: "pathToFile.jpg",
      title: "Keychron K2 Mechanical",
      type: "Keyboards",
      specification: "Wireless, Gateron Brown Switches, RGB",
      guaranteeStart: new Date("2026-01-15T00:00:00Z"),
      guaranteeEnd: new Date("2026-07-15T00:00:00Z"),
      date: new Date("2026-01-15T14:30:00Z"),
      orderId: 2,
      prices: [
        { value: 90, symbol: "USD", isDefault: 0 },
        { value: 3690, symbol: "UAH", isDefault: 1 },
      ],
    },
    {
      id: 4,
      serialNumber: 1004,
      isNew: 1,
      photo: "pathToFile.jpg",
      title: "Samsung Odyssey G7",
      type: "Monitors",
      specification: "27 Curved QHD 240Hz 1ms",
      guaranteeStart: new Date("2026-04-20T00:00:00Z"),
      guaranteeEnd: new Date("2028-04-20T00:00:00Z"),
      date: new Date("2026-04-20T09:15:00Z"),
      orderId: 3,
      prices: [
        { value: 600, symbol: "USD", isDefault: 0 },
        { value: 24600, symbol: "UAH", isDefault: 1 },
      ],
    },
    {
      id: 5,
      serialNumber: 1005,
      isNew: 1,
      photo: "pathToFile.jpg",
      title: "Kingston Fury 32GB",
      type: "Components",
      specification: "DDR5 5600MHz CL36",
      guaranteeStart: new Date("2026-04-20T00:00:00Z"),
      guaranteeEnd: new Date("2029-04-20T00:00:00Z"),
      date: new Date("2026-04-20T09:15:00Z"),
      orderId: 3,
      prices: [
        { value: 120, symbol: "USD", isDefault: 0 },
        { value: 4920, symbol: "UAH", isDefault: 1 },
      ],
    },
    {
      id: 6,
      serialNumber: 1006,
      isNew: 1,
      photo: "pathToFile.jpg",
      title: "Logitech MX Master 3S",
      type: "Accessories",
      specification: "Wireless Mouse, 8000 DPI, Darkfield",
      guaranteeStart: new Date("2026-08-05T00:00:00Z"),
      guaranteeEnd: new Date("2027-08-05T00:00:00Z"),
      date: new Date("2026-08-05T16:45:00Z"),
      orderId: 4,
      prices: [
        { value: 110, symbol: "USD", isDefault: 0 },
        { value: 4510, symbol: "UAH", isDefault: 1 },
      ],
    },
  ];

  for (const prod of productsData) {
    const { prices, ...prodData } = prod;
    await prisma.product.create({
      data: {
        ...prodData,
        prices: {
          create: prices,
        },
      },
    });
  }

  console.log("База данных успешно заполнена разнообразными тестовыми данными!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });