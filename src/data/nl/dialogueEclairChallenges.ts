/** Dialogue Éclair — complète un mini-dialogue à 2 répliques (30 défis). */
export interface DialogueEclairChallenge {
  id: number;
  /** Première réplique (celle qui est lue à voix haute). */
  line1: string;
  line1Fr: string;
  options: string[];
  correctAnswer: string;
  correctFr: string;
  difficulty: 1 | 2 | 3;
}

export const dialogueEclairChallenges: DialogueEclairChallenge[] = [
  // Niveau 1 — salutations et questions de base
  { id: 1, line1: "Hallo, hoe gaat het?", line1Fr: "Bonjour, comment ça va ?", options: ["Goed, dank je!", "Ik ben acht.", "Het is rood."], correctAnswer: "Goed, dank je!", correctFr: "Bien, merci !", difficulty: 1 },
  { id: 2, line1: "Hoe heet je?", line1Fr: "Comment t'appelles-tu ?", options: ["Ik heet Sam.", "Het is maandag.", "Ja, graag."], correctAnswer: "Ik heet Sam.", correctFr: "Je m'appelle Sam.", difficulty: 1 },
  { id: 3, line1: "Hoe oud ben je?", line1Fr: "Quel âge as-tu ?", options: ["Ik ben negen jaar.", "Ik woon in Meise.", "Tot morgen!"], correctAnswer: "Ik ben negen jaar.", correctFr: "J'ai neuf ans.", difficulty: 1 },
  { id: 4, line1: "Waar woon je?", line1Fr: "Où habites-tu ?", options: ["Ik woon in Meise.", "Ik heet Lisa.", "Het is groen."], correctAnswer: "Ik woon in Meise.", correctFr: "J'habite à Meise.", difficulty: 1 },
  { id: 5, line1: "Tot ziens!", line1Fr: "Au revoir !", options: ["Dag, tot morgen!", "Ik ben moe.", "Nee, dank je."], correctAnswer: "Dag, tot morgen!", correctFr: "Salut, à demain !", difficulty: 1 },
  { id: 6, line1: "Wil je een appel?", line1Fr: "Veux-tu une pomme ?", options: ["Ja, graag!", "Het regent.", "Ik heet Tom."], correctAnswer: "Ja, graag!", correctFr: "Oui, volontiers !", difficulty: 1 },
  { id: 7, line1: "Welke kleur is de zon?", line1Fr: "De quelle couleur est le soleil ?", options: ["Geel.", "Een hond.", "Op school."], correctAnswer: "Geel.", correctFr: "Jaune.", difficulty: 1 },
  { id: 8, line1: "Dank je wel!", line1Fr: "Merci beaucoup !", options: ["Graag gedaan!", "Ik ben zeven.", "Het is koud."], correctAnswer: "Graag gedaan!", correctFr: "De rien !", difficulty: 1 },
  { id: 9, line1: "Heb je een huisdier?", line1Fr: "As-tu un animal ?", options: ["Ja, een kat.", "Nee, het is blauw.", "Om acht uur."], correctAnswer: "Ja, een kat.", correctFr: "Oui, un chat.", difficulty: 1 },
  { id: 10, line1: "Goedemorgen!", line1Fr: "Bonjour (le matin) !", options: ["Goedemorgen!", "Welterusten.", "Ik ben ziek."], correctAnswer: "Goedemorgen!", correctFr: "Bonjour !", difficulty: 1 },

  // Niveau 2 — école et quotidien
  { id: 11, line1: "Wat doe je op school?", line1Fr: "Que fais-tu à l'école ?", options: ["Ik leer lezen.", "Ik eet een boot.", "Het is een kat."], correctAnswer: "Ik leer lezen.", correctFr: "J'apprends à lire.", difficulty: 2 },
  { id: 12, line1: "Hoe laat is het?", line1Fr: "Quelle heure est-il ?", options: ["Het is drie uur.", "Het is groen.", "Ik ben tien."], correctAnswer: "Het is drie uur.", correctFr: "Il est trois heures.", difficulty: 2 },
  { id: 13, line1: "Wat is jouw lievelingsvak?", line1Fr: "Quelle est ta matière préférée ?", options: ["Wiskunde!", "Op zondag.", "Met de fiets."], correctAnswer: "Wiskunde!", correctFr: "Les maths !", difficulty: 2 },
  { id: 14, line1: "Hoe kom je naar school?", line1Fr: "Comment viens-tu à l'école ?", options: ["Met de fiets.", "Een banaan.", "Ja, dank je."], correctAnswer: "Met de fiets.", correctFr: "À vélo.", difficulty: 2 },
  { id: 15, line1: "Wat eet je vanmiddag?", line1Fr: "Que manges-tu ce midi ?", options: ["Een boterham.", "In de tuin.", "Het is dinsdag."], correctAnswer: "Een boterham.", correctFr: "Une tartine.", difficulty: 2 },
  { id: 16, line1: "Mag ik je pen lenen?", line1Fr: "Puis-je emprunter ton stylo ?", options: ["Natuurlijk, hier!", "Ik ben negen.", "Het regent hard."], correctAnswer: "Natuurlijk, hier!", correctFr: "Bien sûr, tiens !", difficulty: 2 },
  { id: 17, line1: "Waar is de juf?", line1Fr: "Où est la maîtresse ?", options: ["In de klas.", "Een appel.", "Om zes uur."], correctAnswer: "In de klas.", correctFr: "Dans la classe.", difficulty: 2 },
  { id: 18, line1: "Wat is er?", line1Fr: "Qu'est-ce qu'il y a ?", options: ["Ik voel me niet goed.", "Het is geel.", "Tot ziens!"], correctAnswer: "Ik voel me niet goed.", correctFr: "Je ne me sens pas bien.", difficulty: 2 },
  { id: 19, line1: "Speel je mee?", line1Fr: "Tu joues avec nous ?", options: ["Ja, leuk!", "Het is een stoel.", "Ik woon hier."], correctAnswer: "Ja, leuk!", correctFr: "Oui, chouette !", difficulty: 2 },
  { id: 20, line1: "Welke dag is het vandaag?", line1Fr: "Quel jour sommes-nous ?", options: ["Het is woensdag.", "Het is warm.", "Ik ben klaar."], correctAnswer: "Het is woensdag.", correctFr: "C'est mercredi.", difficulty: 2 },

  // Niveau 3 — dialogues plus longs
  { id: 21, line1: "Zullen we morgen naar het park gaan?", line1Fr: "On va au parc demain ?", options: ["Goed idee, tot morgen!", "Ik heet Lotte.", "Het is rood en blauw."], correctAnswer: "Goed idee, tot morgen!", correctFr: "Bonne idée, à demain !", difficulty: 3 },
  { id: 22, line1: "Waarom ben je te laat?", line1Fr: "Pourquoi es-tu en retard ?", options: ["Mijn bus was te laat.", "Ik hou van kaas.", "Het is elf uur."], correctAnswer: "Mijn bus was te laat.", correctFr: "Mon bus avait du retard.", difficulty: 3 },
  { id: 23, line1: "Wat heb je in het weekend gedaan?", line1Fr: "Qu'as-tu fait le week-end ?", options: ["Ik heb gevoetbald.", "Ik ga slapen.", "Een groene fiets."], correctAnswer: "Ik heb gevoetbald.", correctFr: "J'ai joué au foot.", difficulty: 3 },
  { id: 24, line1: "Kun je me helpen met mijn huiswerk?", line1Fr: "Peux-tu m'aider pour mes devoirs ?", options: ["Ja, ik help je graag.", "Nee, het is dinsdag.", "In de keuken staat melk."], correctAnswer: "Ja, ik help je graag.", correctFr: "Oui, je t'aide volontiers.", difficulty: 3 },
  { id: 25, line1: "Hoe was je vakantie?", line1Fr: "Comment étaient tes vacances ?", options: ["Heel leuk, dank je!", "Ik ben acht jaar.", "Met de trein naar school."], correctAnswer: "Heel leuk, dank je!", correctFr: "Très chouettes, merci !", difficulty: 3 },
  { id: 26, line1: "Wat wil je later worden?", line1Fr: "Que veux-tu faire plus tard ?", options: ["Ik wil dokter worden.", "Ik eet een appel.", "Het waait hard."], correctAnswer: "Ik wil dokter worden.", correctFr: "Je veux devenir médecin.", difficulty: 3 },
  { id: 27, line1: "Mag ik naar buiten gaan?", line1Fr: "Puis-je sortir ?", options: ["Ja, maar neem je jas mee.", "Nee, het is geel.", "Ik hou van rekenen."], correctAnswer: "Ja, maar neem je jas mee.", correctFr: "Oui, mais prends ton manteau.", difficulty: 3 },
  { id: 28, line1: "Weet jij waar mijn boek ligt?", line1Fr: "Sais-tu où est mon livre ?", options: ["Het ligt op de bank.", "Het is zes uur.", "Ik ga fietsen."], correctAnswer: "Het ligt op de bank.", correctFr: "Il est sur le canapé.", difficulty: 3 },
  { id: 29, line1: "Vind je Nederlands moeilijk?", line1Fr: "Trouves-tu le néerlandais difficile ?", options: ["Soms, maar ik oefen elke dag.", "Ik woon in Brussel.", "Een blauwe trui."], correctAnswer: "Soms, maar ik oefen elke dag.", correctFr: "Parfois, mais je m'exerce chaque jour.", difficulty: 3 },
  { id: 30, line1: "Zullen we samen studeren?", line1Fr: "On étudie ensemble ?", options: ["Ja, bij mij thuis.", "Nee, het regent groen.", "Ik heet donderdag."], correctAnswer: "Ja, bij mij thuis.", correctFr: "Oui, chez moi.", difficulty: 3 },
];
