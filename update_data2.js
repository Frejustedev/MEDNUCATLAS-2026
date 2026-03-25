const fs = require('fs');
let data = fs.readFileSync('lib/data.ts', 'utf8');

// 1. Update ArticleMode
data = data.replace(
  /export type ArticleMode = 'pro' \| 'patient';/,
  "export type ArticleMode = 'patient' | 'medecin_non_nuc' | 'medecin_nuc';"
);

// 2. Update ArticleContent interface
data = data.replace(
  /pro: ContentMode;/,
  "medecin_non_nuc: ContentMode;\n  medecin_nuc: ContentMode;"
);

// 3. Replace `pro:{` with `medecin_non_nuc:{...}, medecin_nuc:{`
// Since `pro:{` can span multiple lines, we can just find `pro:{` and replace it with `medecin_non_nuc: { sections: [] }, medecin_nuc: {`
// Wait, if I just do that, `medecin_non_nuc` will be empty. That's fine for now, the user can edit it.
data = data.replace(/pro:\{/g, "medecin_non_nuc: { sections: [{ title: 'Mode Médecin (Non MN)', text: 'Contenu en cours de rédaction...' }] },\n      medecin_nuc:{");

fs.writeFileSync('lib/data.ts', data);
console.log("Updated lib/data.ts");
