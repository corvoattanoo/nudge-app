import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main(){
    const result = await prisma.event.createMany({
        data: [
          {
        title: 'Open Air Cinema - La La Land',
        description: 'Classic movie under the stars in the heart of Warsaw',
        location_name: 'Pole Mokotowskie, Warsaw',
        lat: 52.2099,
        lng: 21.0122,
        starts_at: new Date('2026-08-01T20:00:00Z'),
        price: 25.00,
        currency: 'PLN',
        category: 'cinema',
        imageUrl: 'https://placehold.co/600x400',
        sourceUrl: 'https://example.com'
      },
      {
        title: 'Jazz Night at Nowy Świat',
        description: 'Live jazz performance in Warsaw city center',
        location_name: 'Nowy Świat, Warsaw',
        lat: 52.2319,
        lng: 21.0166,
        starts_at: new Date('2026-08-05T19:00:00Z'),
        price: 0,
        currency: 'PLN',
        category: 'music',
        imageUrl: 'https://placehold.co/600x400',
        sourceUrl: 'https://example.com'
      },
      {
        title: 'Warsaw Street Food Festival',
        description: 'Best street food from around the world',
        location_name: 'Plac Defilad, Warsaw',
        lat: 52.2319,
        lng: 21.0066,
        starts_at: new Date('2026-08-10T12:00:00Z'),
        price: 0,
        currency: 'PLN',
        category: 'food',
        imageUrl: 'https://placehold.co/600x400',
        sourceUrl: 'https://example.com'
      }  
    ]
    })
    console.log('Seed successful')

    console.log(result)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())

