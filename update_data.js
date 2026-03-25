const fs = require('fs');
let data = fs.readFileSync('lib/data.ts', 'utf8');

data = data.replace(/export type ArticleMode = 'pro' \| 'patient';/, "export type ArticleMode = 'patient' | 'medecin_non_nuc' | 'medecin_nuc';");
data = data.replace(/pro: ContentMode;/, "medecin_non_nuc: ContentMode;\n  medecin_nuc: ContentMode;");

// Now replace `pro: {` with `medecin_non_nuc: { ... }, medecin_nuc: { ... }`
// Since `pro: {` spans multiple lines, it's easier to just do a regex replace that duplicates the `pro` block.
// Actually, it's easier to just replace `pro:` with `medecin_nuc:` and then we can just say `medecin_non_nuc` is the same as `medecin_nuc` for the mock data, but wait, the mock data is hardcoded.
// Let's just replace `pro:` with `medecin_nuc:` and `medecin_non_nuc:`.

// A simpler way:
data = data.replace(/pro: \{/g, "medecin_non_nuc: { sections: [] },\n      medecin_nuc: {");

fs.writeFileSync('lib/data.ts', data);
console.log("Done");
