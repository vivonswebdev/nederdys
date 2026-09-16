import type { ShopCategory, ShopRarity } from "./pricing";

export interface ShopCatalogItem {
  id: string;
  name: { fr: string; nl: string };
  description: { fr: string; nl: string };
  category: ShopCategory;
  rarity: ShopRarity;
  price: number;
  preview: string;
  tags: string[];
}

type Row = [
  key: string,
  preview: string,
  fr: string,
  nl: string,
  rarity: ShopRarity,
  price: number,
  tags: string,
  dFr: string,
  dNl: string,
];

const build = (category: ShopCategory, rows: Row[]): ShopCatalogItem[] =>
  rows.map(([id, preview, fr, nl, rarity, price, tags, dFr, dNl]) => ({
    id,
    preview,
    name: { fr, nl },
    description: { fr: dFr, nl: dNl },
    category,
    rarity,
    price,
    tags: tags.split(","),
  }));

export const NEW_AVATARS = build("avatar", [
  ["avatar-ninja", "🥷", "Ninja", "Ninja", "common", 750, "cool,fun", "Un ninja trop cool !", "Een stoere ninja!"],
  ["avatar-pirate", "🏴‍☠️", "Pirate", "Piraat", "common", 800, "fun,aventure", "Arrr, un pirate !", "Arrr, een piraat!"],
  ["avatar-astronaute", "👨‍🚀", "Astronaute", "Astronaut", "common", 900, "espace,cool", "Vers la lune !", "Naar de maan!"],
  ["avatar-pompier", "🧑‍🚒", "Pompier", "Brandweer", "common", 600, "héros", "Toujours prêt !", "Altijd paraat!"],
  ["avatar-chef", "👨‍🍳", "Chef cuisinier", "Chef-kok", "common", 550, "fun", "Miam, à table !", "Smakelijk eten!"],
  ["avatar-docteur", "🧑‍⚕️", "Docteur", "Dokter", "common", 650, "école", "On soigne tout !", "Wij helpen iedereen!"],
  ["avatar-detective", "🕵️", "Détective", "Detective", "common", 700, "mystère", "Aucun indice ne m'échappe !", "Geen spoor ontgaat mij!"],
  ["avatar-footballeur", "⚽", "Footballeur", "Voetballer", "common", 850, "sport", "But !", "Doelpunt!"],
  ["avatar-clown", "🤡", "Clown", "Clown", "common", 500, "fun", "Rigolo garanti !", "Lachen verzekerd!"],
  ["avatar-explorateur", "🧭", "Explorateur", "Ontdekkingsreiziger", "common", 950, "aventure", "En route pour l'aventure !", "Op naar het avontuur!"],
  ["avatar-dragon", "🐉", "Dragon", "Draak", "rare", 1500, "épique,animal", "Un dragon puissant !", "Een machtige draak!"],
  ["avatar-robot", "🤖", "Robot", "Robot", "rare", 1200, "tech", "Bip bop !", "Biep boep!"],
  ["avatar-sorcier", "🧙", "Sorcier", "Tovenaar", "rare", 1800, "magie", "Abracadabra !", "Abracadabra!"],
  ["avatar-vampire", "🧛", "Vampire", "Vampier", "rare", 1600, "mystère", "Attention aux dents !", "Pas op voor de tanden!"],
  ["avatar-sirene", "🧜‍♀️", "Sirène", "Zeemeermin", "rare", 1400, "magie", "Plongeon magique !", "Magische duik!"],
  ["avatar-fantome", "👻", "Fantôme", "Spook", "rare", 1100, "fun", "Bouh !", "Boe!"],
  ["avatar-cowboy", "🤠", "Cowboy", "Cowboy", "rare", 1050, "aventure", "Yeehaa !", "Yeehaa!"],
  ["avatar-samourai", "🗡️", "Samouraï", "Samoerai", "rare", 2400, "cool", "Honneur et courage !", "Eer en moed!"],
  ["avatar-licorne", "🦄", "Licorne", "Eenhoorn", "epic", 3500, "magie,rare", "Magique et rare !", "Magisch en zeldzaam!"],
  ["avatar-alien", "👽", "Alien", "Alien", "epic", 2800, "espace", "Salut, Terriens !", "Hallo, aardbewoners!"],
  ["avatar-elfe", "🧝", "Elfe", "Elf", "epic", 3000, "magie", "Rapide et malin !", "Snel en slim!"],
  ["avatar-fee", "🧚", "Fée", "Fee", "epic", 2600, "magie", "Poussière d'étoiles !", "Sterrenstof!"],
  ["avatar-superheros", "🦸", "Super-héros", "Superheld", "epic", 4200, "héros", "Sauve la journée !", "Redt de dag!"],
  ["avatar-phenix", "🔥", "Phénix", "Feniks", "legendary", 7500, "légendaire,feu", "Renaît de ses cendres !", "Herboren uit as!"],
  ["avatar-roi", "🤴", "Roi", "Koning", "legendary", 6000, "royal", "Règne avec style !", "Regeer met stijl!"],
  ["avatar-reine", "👸", "Reine", "Koningin", "legendary", 6000, "royal", "La couronne te va bien !", "De kroon staat je goed!"],
  ["avatar-dieu-tonnerre", "⚡", "Maître du Tonnerre", "Donderheer", "legendary", 9000, "légendaire", "La foudre t'obéit !", "De bliksem gehoorzaamt!"],
]);

export const NEW_CLOTHING = build("clothing", [
  ["shirt-superhero", "🦸", "T-shirt Superhéros", "Superheld T-shirt", "common", 300, "cool,fun", "Sens-toi super !", "Voel je super!"],
  ["shirt-foot", "👕", "Maillot de foot", "Voetbalshirt", "common", 250, "sport", "Prêt pour le match !", "Klaar voor de match!"],
  ["shirt-rainbow", "🌈", "T-shirt Arc-en-ciel", "Regenboog T-shirt", "common", 280, "fun", "Toutes les couleurs !", "Alle kleuren!"],
  ["shirt-dino", "🦕", "T-shirt Dino", "Dino T-shirt", "common", 260, "animal", "Rrrooaar !", "Rrrooaar!"],
  ["shirt-space", "🌌", "T-shirt Galaxie", "Melkweg T-shirt", "common", 320, "espace", "Plein d'étoiles !", "Vol met sterren!"],
  ["hoodie-cool", "🧥", "Sweat à capuche", "Hoodie", "common", 400, "cool", "Bien au chaud !", "Lekker warm!"],
  ["jacket-jeans", "🧵", "Veste en jean", "Jeansjas", "common", 380, "cool", "Style classique !", "Klassieke stijl!"],
  ["pyjama-etoiles", "🌙", "Pyjama Étoiles", "Sterrenpyjama", "common", 220, "fun", "Bonne nuit !", "Welterusten!"],
  ["tenue-sport", "🩳", "Tenue de sport", "Sportkleding", "common", 240, "sport", "On bouge !", "Bewegen maar!"],
  ["robe-fleurs", "🌸", "Robe à fleurs", "Bloemenjurk", "common", 340, "fun", "Fleurie et douce !", "Bloemig en zacht!"],
  ["salopette", "👖", "Salopette", "Tuinbroek", "common", 210, "fun", "Pratique pour jouer !", "Handig om te spelen!"],
  ["tshirt-nl", "🇳🇱", "T-shirt Nederlands", "Nederlands T-shirt", "common", 300, "école", "Ik leer Nederlands !", "Ik leer Nederlands!"],
  ["tshirt-fr", "🇫🇷", "T-shirt Français", "Frans T-shirt", "common", 300, "école", "J'apprends le français !", "Ik leer Frans!"],
  ["maillot-bain", "🩱", "Maillot de bain", "Zwempak", "common", 230, "été", "À l'eau !", "Het water in!"],
  ["combi-astronaute", "🧑‍🚀", "Combinaison spatiale", "Ruimtepak", "common", 480, "espace", "Décollage !", "Lancering!"],
  ["robe-wizard", "🧙", "Robe de Sorcier", "Tovenaarsmantel", "rare", 1200, "magie,cool", "Pouvoirs magiques !", "Magische krachten!"],
  ["tenue-ninja", "🥷", "Tenue de Ninja", "Ninjapak", "rare", 900, "cool", "Silencieux comme l'ombre !", "Stil als een schaduw!"],
  ["tenue-pirate", "🏴‍☠️", "Habit de Pirate", "Piratenpak", "rare", 850, "aventure", "En route, moussaillon !", "Op pad, matroos!"],
  ["tenue-danseur", "💃", "Tenue de danse", "Danspak", "rare", 700, "fun", "En rythme !", "Op het ritme!"],
  ["tenue-explorateur", "🎒", "Tenue d'Explorateur", "Ontdekkerspak", "rare", 1000, "aventure", "Sac sur le dos !", "Rugzak mee!"],
  ["tenue-scientifique", "🥼", "Blouse de Savant", "Laboratoriumjas", "rare", 1100, "école", "Place aux expériences !", "Tijd voor proefjes!"],
  ["tenue-hiver", "🧣", "Tenue d'hiver", "Winterkleding", "rare", 800, "hiver", "Bien emmitouflé !", "Lekker ingepakt!"],
  ["tenue-rockstar", "🎸", "Tenue de Rockstar", "Rockstar-outfit", "rare", 1400, "fun", "On monte le son !", "Zet het geluid hoger!"],
  ["tenue-sirene", "🧜", "Tenue de Sirène", "Zeemeerminpak", "rare", 1300, "magie", "Sous les vagues !", "Onder de golven!"],
  ["armor-knight", "🛡️", "Armure de Chevalier", "Ridderharnas", "epic", 2500, "épique,guerrier", "Invincible !", "Onoverwinnelijk!"],
  ["armor-dragon", "🐲", "Armure de Dragon", "Drakenharnas", "epic", 2900, "épique", "Écailles brûlantes !", "Hete schubben!"],
  ["tenue-superheros", "🦹", "Costume de Super-héros", "Superheldenpak", "epic", 2200, "héros", "Prêt à sauver le monde !", "Klaar om de wereld te redden!"],
  ["robe-etoilee", "✨", "Robe Étoilée", "Sterrenjurk", "epic", 1800, "magie", "Elle scintille !", "Ze schittert!"],
  ["tenue-glacier", "❄️", "Tenue de Glace", "IJspak", "epic", 2600, "hiver,magie", "Glacé mais stylé !", "IJzig maar stijlvol!"],
  ["cloak-king", "👑", "Manteau de Roi", "Koningsmantel", "legendary", 6000, "légendaire,royal", "Règne avec style !", "Regeer met stijl!"],
  ["cloak-phenix", "🔥", "Cape du Phénix", "Feniksmantel", "legendary", 7000, "légendaire,feu", "Elle brûle de mille feux !", "Ze brandt fel!"],
  ["cloak-galaxie", "🌠", "Cape Galactique", "Melkwegmantel", "legendary", 7500, "légendaire,espace", "L'univers sur les épaules !", "Het heelal op je schouders!"],
]);

export const NEW_ACCESSORIES = build("accessory", [
  ["glasses-sun", "🕶️", "Lunettes de Soleil", "Zonnebril", "common", 200, "cool,été", "Aie l'air cool !", "Zie er cool uit!"],
  ["glasses-nerd", "🤓", "Lunettes d'Étude", "Studiebril", "common", 150, "école", "Hyper concentré !", "Super geconcentreerd!"],
  ["cap-sport", "🧢", "Casquette Sport", "Sportpet", "common", 180, "sport", "Vise le soleil !", "Tegen de zon!"],
  ["hat-party", "🥳", "Chapeau de Fête", "Feesthoed", "common", 160, "fête", "On fête ça !", "Feesten maar!"],
  ["scarf-warm", "🧣", "Écharpe douillette", "Warme sjaal", "common", 140, "hiver", "Au chaud !", "Lekker warm!"],
  ["gloves", "🧤", "Gants", "Handschoenen", "common", 130, "hiver", "Mains au chaud !", "Warme handen!"],
  ["backpack", "🎒", "Sac à dos", "Rugzak", "common", 220, "école", "Tout ranger dedans !", "Alles erin!"],
  ["watch", "⌚", "Montre", "Horloge", "common", 250, "cool", "Toujours à l'heure !", "Altijd op tijd!"],
  ["headphones", "🎧", "Casque audio", "Koptelefoon", "common", 280, "musique", "Écoute le néerlandais !", "Luister naar Nederlands!"],
  ["umbrella", "☂️", "Parapluie", "Paraplu", "common", 120, "pluie", "Pluie belge, pas de souci !", "Belgische regen, geen probleem!"],
  ["medal-bronze", "🥉", "Médaille de bronze", "Bronzen medaille", "common", 190, "sport", "Déjà sur le podium !", "Al op het podium!"],
  ["bow-ribbon", "🎀", "Nœud rose", "Roze strik", "common", 110, "fun", "Tout mignon !", "Superschattig!"],
  ["mask-carnaval", "🎭", "Masque de carnaval", "Carnavalsmasker", "common", 290, "fête", "Qui suis-je ?", "Wie ben ik?"],
  ["crown-prince", "👑", "Couronne de Prince", "Prinsenkroon", "rare", 800, "royal,cool", "Un vrai prince !", "Een echte prins!"],
  ["sword-ninja", "🗡️", "Sabre de Ninja", "Ninjazwaard", "rare", 700, "cool", "Rapide comme l'éclair !", "Bliksemsnel!"],
  ["staff-wizard", "🪄", "Baguette magique", "Toverstaf", "rare", 950, "magie", "Un tour de magie ?", "Een goocheltruc?"],
  ["shield-knight", "🛡️", "Bouclier", "Schild", "rare", 650, "guerrier", "Rien ne passe !", "Niets komt erdoor!"],
  ["medal-gold", "🥇", "Médaille d'or", "Gouden medaille", "rare", 900, "sport", "Champion !", "Kampioen!"],
  ["pet-cat", "🐱", "Chaton compagnon", "Kattenmaatje", "rare", 750, "animal", "Miaou !", "Miauw!"],
  ["pet-dog", "🐶", "Chiot compagnon", "Hondenmaatje", "rare", 750, "animal", "Ouaf !", "Woef!"],
  ["helmet-space", "🪐", "Casque spatial", "Ruimtehelm", "rare", 1000, "espace", "Respire dans l'espace !", "Adem in de ruimte!"],
  ["wings-angel", "👼", "Ailes d'Ange", "Engelvleugels", "epic", 2000, "épique,magie", "Vole haut !", "Vlieg hoog!"],
  ["wings-dragon", "🐉", "Ailes de Dragon", "Drakenvleugels", "epic", 2400, "épique", "Un souffle de feu !", "Een vuuradem!"],
  ["book-spells", "📖", "Grimoire", "Toverboek", "epic", 1500, "magie,école", "Plein de sorts !", "Vol spreuken!"],
  ["scepter-king", "🔱", "Sceptre Royal", "Koningsscepter", "epic", 2200, "royal", "Le pouvoir en main !", "De macht in je hand!"],
  ["halo-golden", "✨", "Halo Doré", "Gouden Halo", "legendary", 5000, "légendaire", "Radieux et rare !", "Stralend en zeldzaam!"],
  ["ring-king", "💍", "Anneau du Roi", "Koningsring", "legendary", 3500, "royal,légendaire", "Un trésor unique !", "Een unieke schat!"],
  ["crown-dragon", "🐲", "Couronne du Dragon", "Drakenkroon", "legendary", 4500, "légendaire", "Maître des dragons !", "Meester der draken!"],
]);

export const NEW_EMOTES = build("emote", [
  ["emote-dance", "💃", "Danse de Fête", "Feestdans", "common", 150, "fun,fête", "C'est la fête !", "Tijd om te feesten!"],
  ["emote-clap", "👏", "Applaudissements", "Applaus", "common", 160, "fun", "Bravo !", "Bravo!"],
  ["emote-wave", "👋", "Coucou", "Zwaaien", "common", 150, "fun", "Salut !", "Hallo!"],
  ["emote-thumbsup", "👍", "Pouce en l'air", "Duim omhoog", "common", 170, "fun", "Super !", "Super!"],
  ["emote-laugh", "😂", "Fou rire", "Lachbui", "common", 200, "fun", "Trop drôle !", "Te grappig!"],
  ["emote-think", "🤔", "Réflexion", "Nadenken", "common", 180, "école", "Je réfléchis...", "Ik denk na..."],
  ["emote-sleep", "😴", "Dodo", "Slaapje", "common", 190, "fun", "Une petite sieste !", "Een dutje!"],
  ["emote-heart", "💖", "Cœur", "Hartje", "common", 220, "fun", "Plein d'amour !", "Vol liefde!"],
  ["emote-facepalm", "🤦", "Oups", "Oeps", "common", 240, "fun", "Presque !", "Bijna!"],
  ["emote-flex", "💪", "Costaud", "Sterk", "rare", 450, "sport", "Trop fort !", "Superstrong!"],
  ["emote-magic", "🪄", "Tour de magie", "Goocheltruc", "rare", 600, "magie", "Abracadabra !", "Abracadabra!"],
  ["emote-rocket", "🚀", "Décollage", "Lancering", "rare", 800, "espace", "On décolle !", "We vertrekken!"],
  ["emote-ninja", "🥷", "Disparition", "Verdwijntruc", "rare", 950, "cool", "Pouf, disparu !", "Poef, weg!"],
  ["emote-crown", "👑", "Salut royal", "Koninklijke groet", "epic", 1500, "royal", "Sa Majesté salue !", "Zijne Majesteit groet!"],
  ["emote-fire", "🔥", "En feu", "In vuur en vlam", "epic", 1800, "feu", "Tu es en feu !", "Je staat in vuur!"],
  ["emote-rainbow", "🌈", "Arc-en-ciel", "Regenboog", "legendary", 2800, "légendaire", "Le ciel te répond !", "De hemel antwoordt!"],
]);

export const NEW_EFFECTS = build("effect", [
  ["effect-sparkles", "✨", "Étincelles", "Schittering", "rare", 1000, "magie,cool", "Brille partout !", "Schitter overal!"],
  ["effect-confetti", "🎉", "Confettis", "Confetti", "common", 500, "fête", "Ça explose de joie !", "Vol vreugde!"],
  ["effect-bubbles", "🫧", "Bulles", "Bellen", "common", 400, "fun", "Pop pop pop !", "Plop plop plop!"],
  ["effect-snow", "❄️", "Flocons", "Sneeuwvlokken", "common", 600, "hiver", "Il neige sur toi !", "Het sneeuwt op jou!"],
  ["effect-leaves", "🍂", "Feuilles d'automne", "Herfstbladeren", "common", 450, "nature", "Le vent souffle !", "De wind waait!"],
  ["effect-lightning", "⚡", "Éclairs", "Bliksem", "rare", 1400, "épique", "Boum !", "Boem!"],
  ["effect-stars", "🌟", "Pluie d'étoiles", "Sterrenregen", "rare", 1200, "espace", "Fais un vœu !", "Doe een wens!"],
  ["effect-fire", "🔥", "Aura de feu", "Vuuraura", "epic", 2500, "feu,épique", "Trop chaud !", "Te heet!"],
  ["effect-aurora", "🌌", "Aurore boréale", "Noorderlicht", "epic", 3000, "magie", "Le ciel danse !", "De hemel danst!"],
  ["effect-rainbow-trail", "🌈", "Traînée arc-en-ciel", "Regenboogspoor", "epic", 3500, "magie", "Laisse ta trace !", "Laat je spoor na!"],
  ["effect-phoenix", "🕊️", "Aura du Phénix", "Feniksaura", "legendary", 6000, "légendaire,feu", "Renais plus fort !", "Herrijs sterker!"],
  ["effect-galaxy", "🪐", "Aura Galactique", "Melkwegaura", "legendary", 7000, "légendaire,espace", "L'univers t'entoure !", "Het heelal omringt je!"],
]);

export const SHOP_CATALOG: ShopCatalogItem[] = [
  ...NEW_AVATARS,
  ...NEW_CLOTHING,
  ...NEW_ACCESSORIES,
  ...NEW_EMOTES,
  ...NEW_EFFECTS,
];
