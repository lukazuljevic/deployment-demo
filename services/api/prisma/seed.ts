import { ProductColor } from '@cart-app/types';
import { AddressType, ClothingSize, PrismaClient, ProductType, Role } from '@prisma/client';
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

  await prisma.address.create({
    data: {
      userId: user.id,
      type: AddressType.BILLING,
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

  const adminPasswordHash = await bcrypt.hash('admin123#', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: adminPasswordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
    },
  });

  await prisma.address.create({
    data: {
      userId: admin.id,
      type: AddressType.BILLING,
      street: '123 Main St',
      city: 'Zagreb',
      country: 'Croatia',
      county: 'Splitsko-Dalmatinska',
      zipcode: '10000',
    },
  });

  await prisma.address.create({
    data: {
      userId: admin.id,
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
      userId: admin.id,
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
            url: '/products/tiger/yellow.svg',
            color: ProductColor.YELLOW,
          },
          { url: '/products/tiger/red.svg', color: ProductColor.RED },
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
            url: '/products/adidasSpezial/navy.svg',
            color: ProductColor.BLUE,
          },
          { url: '/products/adidasSpezial/red.svg', color: ProductColor.RED },
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
      name: 'Black Pants',
      description: 'Cool Formal Pants',
      brand: 'Sinsay',
      price: 29.9,
      categoryId: categoryMap['Formal'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/sinsayBlackPants/black.svg',
            color: ProductColor.BLACK,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Yoyogoi 2021F Jeans',
      description: 'Blue Jeans',
      brand: 'Acne Studios',
      price: 299.9,
      categoryId: categoryMap['Streetwear'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/acneStudios/blue.svg',
            color: ProductColor.BLUE,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Spider-Man Long Sleeve',
      description: 'Affordable long sleeve shirt',
      brand: 'Berhska',
      price: 29.9,
      categoryId: categoryMap['Streetwear'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/spiderman/gray.svg',
            color: ProductColor.GRAY,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Blue Shirt',
      description: 'Affordable blue shirt',
      brand: 'Berhska',
      price: 29.9,
      categoryId: categoryMap['Formal'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/bershkaBlueShirt/blue.svg',
            color: ProductColor.BLUE,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Sweat Shirt',
      description: 'Affordable sweat shirt',
      brand: 'Zara',
      price: 29.9,
      categoryId: categoryMap['Casual'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/zaraSweatShirt/black.svg',
            color: ProductColor.BLACK,
          },
          {
            url: '/products/zaraSweatShirt/green.svg',
            color: ProductColor.GREEN,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Hoodie',
      description: 'Affordable hoodie',
      brand: 'Pull&Bear',
      price: 29.9,
      categoryId: categoryMap['Casual'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/pullBearHoodie/black.svg',
            color: ProductColor.BLACK,
          },
          {
            url: '/products/pullBearHoodie/gray.svg',
            color: ProductColor.GRAY,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Performance Dres',
      description: 'Sports shirt',
      brand: 'Adidas',
      price: 59.9,
      categoryId: categoryMap['Sport'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/adidasPerformance/black.svg',
            color: ProductColor.BLACK,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Regular Sportske Hlače',
      description: 'Sports shorts',
      brand: 'Nike',
      price: 20,
      categoryId: categoryMap['Sport'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/nikeRegular/green.svg',
            color: ProductColor.GREEN,
          },
          {
            url: '/products/nikeRegular/red.svg',
            color: ProductColor.RED,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Sportske Hlače',
      description: 'Sports leggings',
      brand: 'Puma',
      price: 39.9,
      categoryId: categoryMap['Sport'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/pumaLeggings/gray.svg',
            color: ProductColor.GRAY,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Sportska Jakna',
      description: 'Sports Jacket ',
      brand: 'Nike',
      price: 104.95,
      categoryId: categoryMap['Sport'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/nikeSportsJacket/white.svg',
            color: ProductColor.WHITE,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Black Shirt',
      description: 'Formal Black Shirt',
      brand: 'Zara',
      price: 19.9,
      categoryId: categoryMap['Formal'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/zaraBlackShirt/black.svg',
            color: ProductColor.BLACK,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      name: 'Dres Shoes',
      description: 'Formal Black Dress Shoes',
      brand: 'Zara',
      price: 49.9,
      categoryId: categoryMap['Formal'],
      type: ProductType.SHOES,
      images: {
        create: [
          {
            url: '/products/zaraDressShoes/black.svg',
            color: ProductColor.BLACK,
          },
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
      name: 'Sweatpants',
      description: 'Casual sweatpants',
      brand: 'Bershka',
      price: 49.9,
      categoryId: categoryMap['Casual'],
      type: ProductType.CLOTHING,
      images: {
        create: [
          {
            url: '/products/bershkaSweatPants/gray.svg',
            color: ProductColor.GRAY,
          },
        ],
      },
      variants: {
        create: [
          { clothingSize: ClothingSize.S, stock: 50 },
          { clothingSize: ClothingSize.M, stock: 50 },
          { clothingSize: ClothingSize.L, stock: 50 },
          { clothingSize: ClothingSize.XL, stock: 50 },
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
