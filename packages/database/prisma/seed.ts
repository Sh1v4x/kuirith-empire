import { PrismaClient } from "../generated/prisma";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // Créer un utilisateur test avec mot de passe hashé
    const hashedPassword = await hash("password123", 10);

    const user = await prisma.user.upsert({
      where: { discord_username: "testuser#1234" },
      update: {},
      create: {
        discord_username: "testuser#1234",
        username: "Test User",
        password: hashedPassword,
        avatar: "https://via.placeholder.com/150",
        is_account_created: true,
        role: "user",
        gp: 1000,
        level: 1,
        xp: 0,
        last_daily: new Date(),
        consecutive_daily: 1,
        is_admin: false,
      },
    });

    console.log("Seed data created successfully:");
    console.log("User:", user);

    // Vous pouvez ajouter plus de données seed ici (posts, comments, etc.)
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
