const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run(query) {
  try {
    const result = await query();
    await prisma.$disconnect();
    return result;
  } catch (e) {
    await prisma.$disconnect();
    throw e;
  }
}

exports.findUserByName = async (name) =>
  run(async () =>
    prisma.user.findUnique({
      where: {
        name,
      },
    })
  );

exports.findUserById = async (id) =>
  run(async () =>
    prisma.user.findUnique({
      where: {
        id,
      },
    })
  );

exports.createUser = async (name, password, email) =>
  run(async () =>
    prisma.user.create({
      data: {
        name,
        password,
        email,
      },
    })
  );

exports.createFolder = async (name, userId) =>
  run(async () =>
    prisma.folder.create({
      data: {
        name,
        userId,
      },
    })
  );

exports.getAllUsers = async () => run(async () => prisma.user.findMany());

exports.getAllFolders = async (userId) =>
  run(async () =>
    prisma.folder.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    })
  );
