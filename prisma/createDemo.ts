/**
 * Creates (or refreshes) the demo account used by the "Continue as Demo"
 * button on the sign-in page. Safe to run multiple times — it upserts the
 * user and skips dream creation if the account already has dreams.
 *
 *   npx tsx prisma/createDemo.ts
 */
import { PrismaClient, AgeRange, Gender } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_EMAIL = "demo@mythosatlas.app";

const DEMO_DREAMS = [
  {
    title: "The Mirrored Forest",
    content:
      "I walked through a forest where every tree bore my own reflection. The bark was glass, the leaves silver. I reached out to touch one and my fingers passed straight through — into nothing, into cold air that smelled of rain and old libraries. When I turned back, my footprints had already filled with water.",
    emotions: ["awe", "dread"],
    symbols: ["mirror", "forest"],
    city: "Edinburgh",
    country: "Scotland",
    lat: 55.9533,
    lng: -3.1883,
    private: false,
  },
  {
    title: "Wolf Moon",
    content:
      "The moon came down. Not fell — descended deliberately, slowly, landing in the field behind my childhood home and becoming a white wolf the size of a house. It looked at me for a long time before speaking. I can't remember the words, only that I wept and that the weeping felt like relief.",
    emotions: ["wonder", "grief"],
    symbols: ["moon", "wolf"],
    city: "Inverness",
    country: "Scotland",
    lat: 57.4778,
    lng: -4.2247,
    private: false,
  },
  {
    title: "Archive of Forgotten Names",
    content:
      "A vast library where every book contained a single name. When you spoke a name aloud the book would open and show you that person's entire life in images, fast and silent like old film. I found a book with my name. I held it for a long time. I put it back without opening it.",
    emotions: ["mystery", "fear"],
    symbols: ["eye", "shadow"],
    city: "Oxford",
    country: "England",
    lat: 51.752,
    lng: -1.2577,
    private: false,
  },
  {
    title: "Ceremony of Ash",
    content:
      "An enormous gathering in an amphitheatre carved from black stone. Everyone wore white and held a lit candle. The ceremony was for me but I didn't know what I had done to deserve it. The fire spread upward through the air and the smoke became wolves running in slow circles above us.",
    emotions: ["awe", "dread"],
    symbols: ["fire", "death"],
    city: "Athens",
    country: "Greece",
    lat: 37.9838,
    lng: 23.7275,
    private: false,
  },
  {
    title: "The Ferryman's Request",
    content:
      "A ferryman at the edge of a dark river — but he wasn't taking the dead across, he was bringing something back. He asked me to help row. We pulled something massive up from the water, wrapped in chains, breathing slowly. I don't know what it was. He seemed grateful. He wouldn't tell me its name.",
    emotions: ["mystery", "dread"],
    symbols: ["river", "death"],
    city: "Cairo",
    country: "Egypt",
    lat: 30.0444,
    lng: 31.2357,
    private: true,
  },
  {
    title: "The Grief Market",
    content:
      "A marketplace where emotion was the only currency. The stalls sold memories but the price was always a feeling — not negotiated, simply known when you touched an item. I spent all my fear on a small jar of pale light. I spent my grief on a coat that kept me warm long after I woke.",
    emotions: ["grief", "hope"],
    symbols: ["shadow", "rebirth"],
    city: "Marrakech",
    country: "Morocco",
    lat: 31.6295,
    lng: -7.9811,
    private: false,
  },
  {
    title: "Void Between Stars",
    content:
      "Falling through space but slowly, gently — as if the void itself had caught me and decided not to let me drop. The stars were not distant. They were enormous and close and warm. One of them spoke, not in words, but in the feeling of being completely and finally understood.",
    emotions: ["awe", "hope"],
    symbols: ["void", "rebirth"],
    city: "Reykjavik",
    country: "Iceland",
    lat: 64.1265,
    lng: -21.8174,
    private: false,
  },
];

async function main() {
  console.log("🎭  Creating demo account...\n");

  // Ensure emotions and symbols exist
  const allEmotions = [...new Set(DEMO_DREAMS.flatMap((d) => d.emotions))];
  const allSymbols = [...new Set(DEMO_DREAMS.flatMap((d) => d.symbols))];

  for (const name of allEmotions) {
    await prisma.emotion.upsert({ where: { name }, update: {}, create: { name } });
  }
  for (const name of allSymbols) {
    await prisma.symbol.upsert({ where: { name }, update: {}, create: { name } });
  }

  // Upsert the demo user
  const demo = await prisma.user.upsert({
    where: { email: DEMO_EMAIL },
    update: {},
    create: {
      email: DEMO_EMAIL,
      name: "The Mythkeeper",
      username: "mythkeeper",
      description:
        "Collector of myths, lucid dreamer, amateur folklorist. I've been recording my dreams for three years. The patterns keep repeating.",
      city: "Edinburgh",
      country: "Scotland",
      ageRange: AgeRange.AGE_25_34,
      gender: Gender.PREFER_NOT_TO_SAY,
    },
  });

  console.log(`  ✓ Demo user: @${demo.username} (${demo.email})`);

  // Skip dream creation if this user already has dreams
  const existing = await prisma.dream.count({ where: { userId: demo.id } });
  if (existing > 0) {
    console.log(`  ℹ  Demo user already has ${existing} dreams — skipping dream creation.`);
  } else {
    console.log("\n  → Dreams");
    for (const d of DEMO_DREAMS) {
      await prisma.dream.create({
        data: {
          title: d.title,
          content: d.content,
          userId: demo.id,
          dreamCity: d.city,
          dreamCountry: d.country,
          dreamLat: d.lat,
          dreamLng: d.lng,
          private: d.private,
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
          emotions: { connect: d.emotions.map((name) => ({ name })) },
          symbols: { connect: d.symbols.map((name) => ({ name })) },
        },
      });
      console.log(`     ✓ "${d.title}"`);
    }
  }

  console.log("\n✅  Demo account ready.");
  console.log(`    Email:    ${DEMO_EMAIL}`);
  console.log(`    Username: @${demo.username}`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
