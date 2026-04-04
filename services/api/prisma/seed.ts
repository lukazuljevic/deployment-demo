import { ProductColor } from '@cart-app/types';
import { AddressType, PrismaClient, ProductType, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('mama123#', 10);

  const user = await prisma.user.create({
    data: {
      email: 'mama@gmail.com',
      password: passwordHash,
      firstName: 'Vesna',
      lastName: 'Leci',
      role: Role.USER,
    },
  });

  await prisma.address.create({
    data: {
      userId: user.id,
      type: AddressType.SHIPPING,
      street: '123 Main St',
      city: 'Zagreb',
      country: 'Croatia',
      county: 'Splitsko-Dalmatinska',
      zipcode: '10000',
    },
  });

  await prisma.userCard.create({
    data: {
      userId: user.id,
      expiryMonth: 12,
      expiryYear: 2026,
      iban: 'HR1234567890123456789',
      cvc: '123',
    },
  });

  const categories = ['Streetwear', 'Formal', 'Casual', 'Sport'];
  const categoryMap: Record<string, string> = {};

  for (const categoryName of categories) {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    });

    categoryMap[category.name] = category.id;
  }

  await prisma.product.create({
    data: {
      name: 'Tiger Mexico 66',
      description: 'Niske tenisice',
      brand: 'Onitsuka',
      price: 89.9,
      categoryId: categoryMap['Streetwear'],
      type: ProductType.SHOES,
      images: {
        create: [
          {
            url: '/products/tiger/yellow.png',
            color: ProductColor.YELLOW,
          },
          { url: '/products/tiger/red.png', color: ProductColor.RED },
        ],
      },
      variants: {
        create: [
          { shoeSize: 44, stock: 50 },
          { shoeSize: 45, stock: 50 },
          { shoeSize: 46, stock: 50 },
          { shoeSize: 47, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Spezial',
      description: 'Low-Top sneakers',
      brand: 'Adidas',
      price: 79.9,
      categoryId: categoryMap['Streetwear'],
      type: ProductType.SHOES,
      images: {
        create: [
          {
            url: '/products/adidasSpezial/navy.png',
            color: ProductColor.BLUE,
          },
          { url: '/products/adidasSpezial/red.png', color: ProductColor.RED },
        ],
      },
      variants: {
        create: [
          { shoeSize: 44, stock: 50 },
          { shoeSize: 45, stock: 50 },
          { shoeSize: 46, stock: 50 },
          { shoeSize: 47, stock: 50 },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
