import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, ProductType, ShirtSize } from '@prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

async function main() {
  const category = await prisma.category.create({
    data: {
      name: 'Clothing',
    },
  });

  const product = await prisma.product.create({
    data: {
      name: 'Cool T-Shirt',
      description: 'Super udoban T-shirt za svakodnevno nošenje',
      brand: 'BrandX',
      price: 29.99,
      categoryId: category.id,
      type: ProductType.CLOTHING,
      images: {
        create: [{ url: 'https://example.com/images/cool-tshirt.jpg', color: 'blue' }],
      },
      variants: {
        create: [
          { size: ShirtSize.M, stock: 5 },
          { size: ShirtSize.L, stock: 5 },
        ],
      },
    },
  });

  console.log('Seeded product:', product);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
