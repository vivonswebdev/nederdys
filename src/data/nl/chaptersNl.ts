/** Titres et sous-titres néerlandais de chaque chapitre (clé = id du chapitre). */
export interface ChapterNl {
  name: string;
  description?: string;
}

export const CHAPTERS_NL: Record<string, ChapterNl> = {
  // --- Maths : bases et 3e primaire ---
  "bases-numeration": { name: "De basis van de getallen", description: "Tellen, herkennen, optellen met plaatjes" },
  "numeration-ce2": { name: "Getallenkennis" },
  "addition-ce2": { name: "Optellingen" },
  "soustraction-ce2": { name: "Aftrekkingen" },
  "multiplication-ce2": { name: "Vermenigvuldigingen" },
  "mesures-ce2": { name: "Meten" },
  "problemes-ce2": { name: "Vraagstukken" },
  "geometrie-ce2": { name: "Meetkunde" },
  "multiplication-avancee": { name: "Gevorderd vermenigvuldigen" },
  "division-ce2": { name: "Eenvoudig delen" },
  "problemes-avances": { name: "Vraagstukken in 2 stappen" },
  "nombres-0-100": { name: "Getallen van 0 tot 100" },
  "nombres-100-1000": { name: "Getallen van 100 tot 1000" },
  "nombres-decimaux": { name: "Kommagetallen" },
  "fractions-simples": { name: "Eenvoudige breuken" },
  "additions-retenue": { name: "Optellen met onthouden" },
  "soustractions-retenue": { name: "Aftrekken met lenen" },
  "multiplications-2chiffres": { name: "Vermenigvuldigen met 2 cijfers" },
  "calcul-mental": { name: "Hoofdrekenen" },
  "divisions-simples": { name: "Eenvoudige delingen" },
  perimetres: { name: "Omtrekken" },
  aires: { name: "Oppervlaktes" },
  longueurs: { name: "Lengtes" },
  masses: { name: "Gewichten" },
  durees: { name: "Tijdsduur" },
  "grands-nombres": { name: "Grote getallen" },
  symetrie: { name: "Symmetrie" },
  "angles-droits": { name: "Rechte hoeken" },
  "reperage-quadrillage": { name: "Plaatsbepaling op een rooster" },
  "monnaie-rendu": { name: "Geld teruggeven" },
  "problemes-esprit-critique": { name: "Slimme vraagstukken" },
  calendrier: { name: "Kalender" },
  "tableaux-double-entree": { name: "Tabellen met twee ingangen" },

  // --- Maths : 4e, 5e, 6e primaire ---
  "fractions-4eprimaire": { name: "Breuken (4e)" },
  "grands-nombres-4eprimaire": { name: "Grote getallen (4e)" },
  "aires-perimetres-4eprimaire": { name: "Oppervlakte en omtrek (4e)" },
  "problemes-4eprimaire": { name: "Vraagstukken (4e)" },
  "decimaux-5eprimaire": { name: "Kommagetallen (5e)" },
  "proportionnalite-5eprimaire": { name: "Evenredigheid (5e)" },
  "pourcentages-5eprimaire": { name: "Percentages (5e)" },
  "conversions-5eprimaire": { name: "Omzettingen (5e)" },
  "nombres-relatifs-6eprimaire": { name: "Negatieve getallen (6e)" },
  "fractions-6eprimaire": { name: "Gevorderde breuken (6e)" },
  "aires-formules-6eprimaire": { name: "Oppervlaktes en formules (6e)" },
  "proportionnalite-6eprimaire": { name: "Evenredigheid (6e)" },

  // --- Néerlandais ---
  "kleuren-nl": { name: "Kleuren en kleren", description: "De kleuren, de kledij" },
  "dieren-nl": { name: "De dieren", description: "De dieren, de/het" },
  "getallen-nl": { name: "Getallen 1-20", description: "Getallen lezen en schrijven" },
  "familie-nl": { name: "De familie", description: "Basiswoorden over de familie" },
  "zinnen-nl": { name: "Eenvoudige zinnen", description: "Onderwerp - werkwoord - rest" },
  "dagen-nl": { name: "Dagen en uur", description: "De dagen, hoe laat is het" },
  "de-of-het": { name: "De of het?", description: "Kies het juiste lidwoord" },
  "pluriel-noms": { name: "Het meervoud", description: "-en, -s, -eren" },
  "rimes-nl": { name: "Rijmwoorden", description: "Woorden zoeken die rijmen" },
  "chasse-fautes-nl": { name: "Foutenjacht", description: "Fouten vinden en verbeteren" },
  "vrai-faux-nl": { name: "Waar of niet waar", description: "Luister naar de zin en beslis" },
  "question-reponse-nl": { name: "Vraag en antwoord", description: "Vraag en antwoord verbinden" },
  "conjugaison-presente": { name: "Vervoegen in de tegenwoordige tijd", description: "ik / jij / hij + werkwoord" },
  "adjectifs-nl": { name: "De bijvoeglijke naamwoorden", description: "de grote man, het grote huis" },
  "dialogue-nl": { name: "Klein gesprek", description: "Een gesprek aanvullen" },
};

export const chapterNl = (id: string): ChapterNl | undefined => CHAPTERS_NL[id];
