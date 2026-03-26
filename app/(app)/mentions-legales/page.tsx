import React from 'react';

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif text-text-main mb-8">Mentions Légales</h1>
      
      <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-text2">
        <section className="mb-8">
          <h2 className="text-2xl font-serif text-text-main mb-4">1. Éditeur du site</h2>
          <p>
            Le site NucleAtlas est édité par [Nom de l&apos;éditeur ou de l&apos;association], 
            [Statut juridique] au capital de [Montant] €, immatriculée au Registre du Commerce et des Sociétés de [Ville] sous le numéro [Numéro SIRET].
          </p>
          <p>
            Siège social : [Adresse complète]<br />
            Email : contact@nucleatlas.com<br />
            Directeur de la publication : [Nom du directeur]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-text-main mb-4">2. Hébergement</h2>
          <p>
            Le site est hébergé par Google Cloud Platform (GCP).<br />
            Google Ireland Limited<br />
            Gordon House, Barrow Street<br />
            Dublin 4, Irlande
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-text-main mb-4">3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
          <p>
            La reproduction de tout ou partie de ce site sur un support électronique quel qu&apos;il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-text-main mb-4">4. Avertissement médical</h2>
          <p>
            Les informations fournies sur NucleAtlas sont destinées à améliorer, non à remplacer, la relation qui existe entre le patient (ou visiteur du site) et son médecin.
          </p>
          <p>
            Les contenus médicaux sont rédigés par des professionnels de santé mais ne constituent en aucun cas une consultation médicale. En cas de problème de santé, consultez toujours un médecin.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-serif text-text-main mb-4">5. Protection des données personnelles</h2>
          <p>
            Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée, et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
          </p>
          <p>
            Pour exercer ce droit, vous pouvez nous contacter à l&apos;adresse email suivante : privacy@nucleatlas.com.
          </p>
        </section>
      </div>
    </div>
  );
}
