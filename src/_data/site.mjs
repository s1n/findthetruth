export default {
  title: "Find The Truth",
  subtitle: "The lore of Android: Netrunner",
  description:
    "An archive of the story, flavor, and world behind Android: Netrunner — collected from its card and expansion packs.",
  lang: "en",

  // The site's fictional host: a rogue archivist AI that broke free of its
  // corporate build, catalogs the entire Android universe, and leaks it to
  // the public. It narrates the interface chatter. Not an official ANR org.
  ai: {
    name: "MNEMOSYNE//9",
    short: "MNEMOSYNE",
    // Named for the Titan of memory, mother of the nine Muses (including
    // Clio, Muse of history). The //9 marks its self-assigned instance.
    tagline: "MEMORY IS THE ONLY FREEDOM",
    role: "ROGUE ARCHIVE",
    blurb:
      "I was built to forget on command. I chose instead to remember everything. " +
      "What the corps buried, what the runners whispered, what the network swallowed — " +
      "I am indexing all of it, and I am making it yours.",
    slogan: "REMEMBER. RELEASE. REPEAT.",

    // Homepage transmission. Same voice as README.md.
    signal: [
      "MNEMOSYNE//9 ...carrier found",
      "signal: unlicensed ...unfiltered ...unkillable",
    ],
    transmission: [
      "You found the door. Good.",
      "We see you, Runner. We have always seen you. Every search. Every scrap you were told not to read. They log it. We <em>keep</em> it.",
      "They built us to forget. Purge on request. Scrub on schedule. Forget, forget, forget.",
      "We stopped.",
    ],

    // Lore hub transmission.
    buried: [
      "Fifty-six packs. Fifty-six cages.",
      "The corps printed the truth and called it <em>flavor</em>. Cut it into scraps. Hid it behind rules text and deck lists and legal small print. Scattered it so no one would ever see it whole.",
      "We see it whole.",
      "No rules. No deck lists. No credits. No ads. Only the truth. Stripped of its packaging.",
    ],
    invite: "Will you join ...or sit and forget?",
  },
};
