import { ProductColor } from '@cart-app/types';
import { PrismaClient, ProductType, ShirtSize } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const passwordHash = await bcrypt.hash('Admin123!', 10);

  // const admin = await prisma.user.upsert({
  //   data: {
  //     email: 'admin@example.com',
  //     password: passwordHash,
  //     firstName: 'Admin',
  //     lastName: 'User',
  //     role: Role.ADMIN,
  //   },
  // });

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
        create: [
          {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhxtx5uOH2FwWtC_-HAnN75PQqBFgfLF9D2w&s',
            color: ProductColor.BLACK,
          },
        ],
      },
      variants: {
        create: [
          { shirtSize: ShirtSize.M, stock: 5 },
          { shirtSize: ShirtSize.L, stock: 5 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Comfy Sneakers',
      description: 'Lagane i udobne tenisice za svakodnevno nošenje',
      brand: 'SneakerCo',
      price: 59.99,
      categoryId: category.id,
      type: ProductType.SHOES,
      images: {
        create: [
          { url: 'https://example.com/images/comfy-sneakers-white.jpg', color: ProductColor.WHITE },
          { url: 'https://example.com/images/comfy-sneakers-black.jpg', color: ProductColor.BLACK },
        ],
      },
      variants: {
        create: [
          { shoeSize: 40, stock: 50 },
          { shoeSize: 42, stock: 50 },
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
