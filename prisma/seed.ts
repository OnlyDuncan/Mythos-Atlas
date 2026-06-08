import { PrismaClient, AgeRange, Gender } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// ── Content pools ───────────────────────────────────────────────────────────

const EMOTION_NAMES = [
  "fear", "wonder", "sorrow", "rage", "love",
  "awe", "dread", "hope", "grief", "mystery",
];

const SYMBOL_NAMES = [
  "water", "snake", "mirror", "forest", "wolf", "fire",
  "shadow", "void", "moon", "death", "rebirth", "eye",
  "door", "crown", "spiral", "tower", "labyrinth", "river", "clock", "bird",
];

const BIOS = [
  "Collector of myths, lucid dreamer, amateur folklorist.",
  "I write down every dream. Every single one.",
  "Trying to map the geography of sleep.",
  "Mythology student. Chronic over-thinker. Occasional prophet.",
  "Dream researcher and symbol hunter.",
  "The night is where I do my real thinking.",
  "Sleep is just archaeology with your eyes closed.",
  "I've been dreaming the same dream for years, with variations.",
  "Drawn to liminal spaces, both waking and sleeping.",
  "If you dream of me, please let me know.",
];

const DREAM_ENTRIES = [
  {
    title: "The Mirrored Forest",
    content:
      "I walked through a forest where every tree bore my own reflection. The bark was glass, the leaves silver. I reached out to touch one and my fingers passed straight through — into nothing, into cold air that smelled of rain and old libraries.",
  },
  {
    title: "Serpent Beneath the City",
    content:
      "Deep under the streets, I found a serpent coiled around the foundations of the world. It wasn't threatening — it was sleeping. Its scales were carved with languages I almost recognised. Someone beside me whispered: don't wake it. We never do.",
  },
  {
    title: "The Door at the End of the Field",
    content:
      "A plain wooden door standing alone in an empty field, no frame, no wall. I walked around it. The other side was identical. When I opened it and stepped through, I was still in the field. But the door was gone.",
  },
  {
    title: "Ceremony of Ash",
    content:
      "An enormous gathering in an amphitheatre carved from black stone. Everyone wore white and held a lit candle. The ceremony was for me but I didn't know what I had done. The fire spread upward through the air and the smoke became wolves.",
  },
  {
    title: "Clockwork Ocean",
    content:
      "The sea was made of interlocking gears. When I reached down, they were warm like living skin. Beneath the mechanism I could see something enormous moving — patient, slow, and very old. The gears above it kept perfect time.",
  },
  {
    title: "The Tower That Was Always There",
    content:
      "A tower I had walked past every day of my life. I had never noticed it before. Inside, each floor contained a version of a room from my childhood. At the top was a room I'd never seen but recognised immediately.",
  },
  {
    title: "Wolf Moon",
    content:
      "The moon came down. Not fell — descended deliberately, slowly, landing in a field and becoming a white wolf the size of a house. It looked at me for a long time before speaking. I can't remember what it said, only that I wept.",
  },
  {
    title: "River of Hands",
    content:
      "Swimming upstream through a river of outstretched hands. Not grasping — just open, offering. I couldn't tell if they were begging or giving. The current was warm. Eventually the hands became reeds and I reached a shore I knew.",
  },
  {
    title: "Archive of Forgotten Names",
    content:
      "A vast library where every book contained a single name. When you spoke a name aloud, the book would open and show you that person's entire life in a series of images. I found a book with my name. I couldn't bring myself to open it.",
  },
  {
    title: "The Descending Staircase",
    content:
      "Descended a spiral staircase for what seemed like hours. The architecture became stranger the further I went — medieval, then Roman, then something with no human reference. At the bottom was a door with light under it.",
  },
  {
    title: "The Cartographer's Dream",
    content:
      "I was drawing a map of a place I'd never been. The pen moved on its own. Cities appeared with names in a language I couldn't read. I folded the map when I was done and it became a bird that flew out the window.",
  },
  {
    title: "Crown of Thorns and Gold",
    content:
      "Someone placed a crown on my head in a dark hall. Half was pure gold, half was bone and black thorn. The assembled crowd bowed. I didn't know the kingdom, the language, or why I had been chosen. The crown felt like it had always been mine.",
  },
  {
    title: "The Shadow Convention",
    content:
      "A conference where everyone's shadow was detached and seated separately at its own desk. The shadows voted independently. Mine kept looking back at me. When the meeting ended, no one's shadow returned to them.",
  },
  {
    title: "Burning Compass",
    content:
      "I was navigating by a compass that pointed toward fire instead of north. The fire moved — sometimes closer, sometimes further. I followed it across a landscape of white salt. It led me to a city that had burned and regrown simultaneously.",
  },
  {
    title: "The Submerged Cathedral",
    content:
      "Diving through dark water into a cathedral still fully intact. Candles burning underwater. Choir music rising as bubbles. I sat in a pew and the sermon began. The priest spoke in a language I understood perfectly but can't now recall.",
  },
  {
    title: "Eye in the Mountain",
    content:
      "A mountain opened a single enormous eye and looked at me. Not with malice — with exhaustion, the way you look at something you've watched for a very long time. It blinked once, slowly, then sealed itself back into stone.",
  },
  {
    title: "The Grief Market",
    content:
      "A marketplace where emotion was currency. The stalls sold memories but the price was always a feeling. I spent all my fear on a small jar of light. I spent my grief on a coat that kept me warm long after I woke.",
  },
  {
    title: "Moth Parliament",
    content:
      "Moths the size of ravens assembled in a theatre. They were debating something enormous — the fate of something I cared about but couldn't name. I sat in the gallery. They didn't acknowledge me. The vote was split.",
  },
  {
    title: "The Oracle at the Crossroads",
    content:
      "Four roads meeting, a stone figure at the centre. It spoke when I stepped into the intersection and asked me which direction I feared most. I pointed. It said: then that is where you must go. The road shimmered and I woke up.",
  },
  {
    title: "Glass River",
    content:
      "Walking along a river where the water had turned to glass during the night. Perfect, clear, suspended in mid-flow. Fish still visible inside, still moving slowly. By morning it would melt back and everything it had caught would be released.",
  },
  {
    title: "The Second Moon",
    content:
      "Two moons in the sky — one white, one red. They orbited each other. Every twelve minutes they aligned and for a moment everything on earth cast two shadows in different directions. The red moon was still rising.",
  },
  {
    title: "Voice in the Static",
    content:
      "An old radio in an empty house. I tuned it and found a frequency broadcasting nothing — just static. But in the static, underneath, someone was whispering my name. I turned the dial further and the voice became music I'd never heard.",
  },
  {
    title: "The Garden After",
    content:
      "A garden that existed after something enormous had happened. I didn't know what. But the plants grew from ash and the fruit tasted like memory. Other people were there, quiet. We didn't speak but understood each other completely.",
  },
  {
    title: "The Ferryman's Request",
    content:
      "A ferryman at the edge of a dark river, but he wasn't taking the dead across — he was bringing something back. He asked me to help row. We pulled something massive up from the depths, wrapped in chains and breathing slowly.",
  },
  {
    title: "Void Between Stars",
    content:
      "I was falling through space but slowly, gently, as if the void itself had caught me. The stars were not distant — they were enormous and close and warm. One of them spoke: not in words, but in a feeling of being completely known.",
  },
];

// ── Seed ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱  Seeding database...\n");

  // 1. Emotions
  console.log("  → Emotions");
  for (const name of EMOTION_NAMES) {
    await prisma.emotion.upsert({ where: { name }, update: {}, create: { name } });
  }

  // 2. Symbols
  console.log("  → Symbols");
  for (const name of SYMBOL_NAMES) {
    await prisma.symbol.upsert({ where: { name }, update: {}, create: { name } });
  }

  // 3. Users
  console.log("  → Users");
  const users: { id: string }[] = [];
  for (let i = 0; i < 10; i++) {
    const base = faker.internet.username().toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 15);
    const user = await prisma.user.create({
      data: {
        email: `user${i}_${faker.internet.email()}`,
        name: faker.person.fullName(),
        username: `${base}_${i}`,
        description: BIOS[i],
        city: faker.location.city(),
        country: faker.location.country(),
        ageRange: faker.helpers.arrayElement(Object.values(AgeRange)),
        gender: faker.helpers.arrayElement(Object.values(Gender)),
      },
    });
    users.push(user);
    console.log(`     ✓ @${base}_${i}`);
  }

  // 4. Dreams
  console.log("\n  → Dreams");
  for (const entry of DREAM_ENTRIES) {
    const owner = faker.helpers.arrayElement(users);
    const emotions = faker.helpers.arrayElements(EMOTION_NAMES, { min: 1, max: 3 });
    const symbols = faker.helpers.arrayElements(SYMBOL_NAMES, { min: 1, max: 3 });

    await prisma.dream.create({
      data: {
        title: entry.title,
        content: entry.content,
        userId: owner.id,
        dreamCity: faker.location.city(),
        dreamCountry: faker.location.country(),
        dreamLat: faker.location.latitude(),
        dreamLng: faker.location.longitude(),
        private: faker.datatype.boolean({ probability: 0.3 }),
        createdAt: faker.date.recent({ days: 180 }),
        emotions: { connect: emotions.map((name) => ({ name })) },
        symbols: { connect: symbols.map((name) => ({ name })) },
      },
    });
    console.log(`     ✓ "${entry.title}"`);
  }

  // 5. Friendships
  console.log("\n  → Friendships");
  for (let i = 0; i < users.length; i++) {
    const others = users.filter((_, j) => j !== i);
    const friends = faker.helpers.arrayElements(others, { min: 1, max: 3 });
    for (const friend of friends) {
      await prisma.friend.upsert({
        where: { userId_friendId: { userId: users[i].id, friendId: friend.id } },
        update: {},
        create: { userId: users[i].id, friendId: friend.id },
      });
    }
  }

  console.log("\n✅  Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
