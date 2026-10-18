export default function (eleventyConfig) {
  // Copy static assets straight through to the output.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Watch CSS so the dev server reloads on style changes.
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Slugify a label for use in a URL (shared by templates and collections).
  const slugify = (str) =>
    String(str)
      .toLowerCase()
      .replace(/["'\u2019]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  eleventyConfig.addFilter("slug", slugify);

  // Extract the short ADN code from a pack/source label, e.g.
  // "ADN01 — Core Set" -> "ADN01". Falls back to the whole string.
  eleventyConfig.addFilter("adnid", (str) => {
    const m = String(str).match(/ADN\s*\d+/i);
    return m ? m[0].replace(/\s+/g, "").toUpperCase() : String(str);
  });

  // ---- Baudot (ITA2) encoder -------------------------------------------
  // The 5-bit telegraph code the Apex cards (Harbinger et al.) use as a
  // visual motif. We render each character as a column of 5 bits, which the
  // CSS paints as filled/empty dots — authentic Netrunner texture that is
  // also real: it actually spells the input. Letters-shift only (A-Z,
  // space); unknown characters become a blank column.
  const BAUDOT = {
    A: "11000", B: "10011", C: "01110", D: "10010", E: "10000",
    F: "10110", G: "01011", H: "00101", I: "01100", J: "11010",
    K: "11110", L: "01001", M: "00111", N: "00110", O: "00011",
    P: "01101", Q: "11101", R: "01010", S: "10100", T: "00001",
    U: "11100", V: "01111", W: "11001", X: "10111", Y: "10101",
    Z: "10001", " ": "00100",
  };
  // Returns an array of 5-bit strings, one per character — consumed by a
  // template loop that draws the dot columns.
  eleventyConfig.addFilter("baudot", (str) =>
    String(str)
      .toUpperCase()
      .split("")
      .map((ch) => BAUDOT[ch] || "00000")
  );

  // A short pseudo-hex ID derived from a string, for panel "system chatter"
  // annotations (e.g. SEC.ID 3F9A). Deterministic so the build is stable.
  eleventyConfig.addFilter("sysid", (str) => {
    let h = 0x811c9dc5;
    for (const c of String(str)) {
      h ^= c.charCodeAt(0);
      h = Math.imul(h, 0x01000193);
    }
    return (h >>> 0).toString(16).toUpperCase().slice(0, 4);
  });

  // ---- Deterministic PRNG --------------------------------------------
  // All the "digital noise" generators below are seeded from a string so a
  // given page always renders the same noise — stable diffs, no churn.
  const seeded = (seedStr) => {
    let h = 0x811c9dc5;
    for (const c of String(seedStr)) {
      h ^= c.charCodeAt(0);
      h = Math.imul(h, 0x01000193);
    }
    return () => {
      h ^= h << 13; h ^= h >>> 17; h ^= h << 5;
      return ((h >>> 0) % 100000) / 100000;
    };
  };
  const pick = (rnd, arr) => arr[Math.floor(rnd() * arr.length)];

  // Faux terminal / cyberspace chatter: a few short all-caps lines of
  // near-illegible document noise, like the CP2077 breach screen corners.
  eleventyConfig.addFilter("noiselines", (seed, count = 3) => {
    const rnd = seeded("noise:" + seed);
    const heads = ["DOCUMENT", "PROTOCOL", "TRACE", "DAEMON", "SUBNET", "CIPHER", "NODE", "SECTOR"];
    const tails = ["TYPE: CYBERSPACE", "ACCESS: GRANTED", "STATUS: NOMINAL", "CLASS: ICE", "LAYER: 7", "STATE: REZZED"];
    const hex = (n) => Array.from({ length: n }, () => "0123456789ABCDEF"[Math.floor(rnd() * 16)]).join("");
    const lines = [];
    lines.push(`${pick(rnd, heads)}/${hex(6)}${hex(6)}${hex(4)}`);
    for (let i = 1; i < count - 1; i++) lines.push(`${hex(4)}:${hex(4)}:${hex(4)} ${pick(rnd, heads)}`);
    lines.push(pick(rnd, tails));
    return lines;
  });

  // Numeric telemetry rows: columns of small floats/ints like a readout.
  eleventyConfig.addFilter("telemetry", (seed, rows = 3) => {
    const rnd = seeded("tele:" + seed);
    const out = [];
    for (let r = 0; r < rows; r++) {
      const a = (rnd() * 9).toFixed(5);
      const cols = Array.from({ length: 4 }, () => Math.floor(rnd() * 10));
      out.push(`${a}  ${cols.join("  ")}`);
    }
    return out;
  });

  // Barcode: a REAL Code 39 encoding of `text`, so the bars decode back to
  // the string — every barcode on the site carries a hidden message.
  // Code 39: each char -> 9 elements (bars/spaces) alternating bar,space,...
  // starting and ending with a bar; '1' = wide, '0' = narrow. Framed by the
  // '*' start/stop guard. Returns [{w:unit, bar:bool}] for the CSS strip.
  const CODE39 = {
    "0":"000110100","1":"100100001","2":"001100001","3":"101100000",
    "4":"000110001","5":"100110000","6":"001110000","7":"000100101",
    "8":"100100100","9":"001100100","A":"100001001","B":"001001001",
    "C":"101001000","D":"000011001","E":"100011000","F":"001011000",
    "G":"000001101","H":"100001100","I":"001001100","J":"000011100",
    "K":"100000011","L":"001000011","M":"101000010","N":"000010011",
    "O":"100010010","P":"001010010","Q":"000000111","R":"100000110",
    "S":"001000110","T":"000010110","U":"110000001","V":"011000001",
    "W":"111000000","X":"010010001","Y":"110010000","Z":"011010000",
    "-":"010000101",".":"110000100"," ":"011000100","*":"010010100",
  };
  eleventyConfig.addFilter("barcode", (text) => {
    const s = "*" + String(text).toUpperCase().replace(/[^0-9A-Z. -]/g, "") + "*";
    const bars = [];
    for (const ch of s) {
      const pat = CODE39[ch] || CODE39["-"];
      for (let i = 0; i < pat.length; i++) {
        bars.push({ w: pat[i] === "1" ? 3 : 1, bar: i % 2 === 0 });
      }
      bars.push({ w: 1, bar: false }); // inter-character gap
    }
    return bars;
  });

  // Grouped code string, e.g. 6ZUZ-FFLH-9YLT-E327.
  eleventyConfig.addFilter("codegroups", (seed, groups = 4, len = 4) => {
    const rnd = seeded("code:" + seed);
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    return Array.from({ length: groups }, () =>
      Array.from({ length: len }, () => chars[Math.floor(rnd() * chars.length)]).join("")
    ).join("-");
  });

  // Every distinct topic across lore pages, each with the pages carrying it.
  // Shape: [{ name, slug, pages: [...] }], sorted by name.
  eleventyConfig.addCollection("topics", (api) => {
    const map = new Map();
    for (const item of api.getFilteredByTag("lore")) {
      for (const topic of item.data.topics || []) {
        if (!map.has(topic)) map.set(topic, []);
        map.get(topic).push(item);
      }
    }
    return [...map.entries()]
      .map(([name, pages]) => ({ name, slug: slugify(name), pages }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  // Every distinct source (pack/book), each with its pages.
  eleventyConfig.addCollection("sources", (api) => {
    const map = new Map();
    for (const item of api.getFilteredByTag("lore")) {
      const src = item.data.source;
      if (!src) continue;
      if (!map.has(src)) map.set(src, []);
      map.get(src).push(item);
    }
    return [...map.entries()]
      .map(([name, pages]) => ({ name, slug: slugify(name), pages }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
}
