import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';
import { ENTRIES } from './lib/data';

const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function migrate() {
  console.log(`Starting migration of ${ENTRIES.length} articles...`);
  let count = 0;
  for (const entry of ENTRIES) {
    try {
      const docRef = doc(db, 'articles', entry.id);
      
      // Convert content object to JSON string because Firestore doesn't like deeply nested arrays sometimes,
      // but wait, in AdminPanel it saves it as a string: `content: JSON.stringify(contentData)`
      // Let's check how AdminPanel saves it.
      
      const articleData = {
        ...entry,
        content: JSON.stringify(entry.content)
      };
      
      await setDoc(docRef, articleData);
      console.log(`Migrated: ${entry.title}`);
      count++;
    } catch (e) {
      console.error(`Error migrating ${entry.id}:`, e);
    }
  }
  console.log(`Migration complete. ${count}/${ENTRIES.length} articles migrated.`);
  process.exit(0);
}

migrate();
