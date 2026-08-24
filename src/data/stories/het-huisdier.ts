import type { Story } from "@/lib/stories";

export const hetHuisdierStory: Story = {
  id: "het-huisdier",
  title: "Het Huisdier",
  titleFr: "L'animal de compagnie",
  emoji: "🐶",
  subject: "nl",
  scenes: [
    {
      id: "1",
      text: "Lisa wil een huisdier.",
      textFr: "Lisa veut un animal de compagnie.",
      image: "🏠",
    },
    {
      id: "2",
      text: "Lisa gaat naar de dierenwinkel.",
      textFr: "Lisa va à l'animalerie.",
      image: "🐾",
      choice: {
        question: "Welk dier kiest Lisa?",
        questionFr: "Quel animal Lisa choisit-elle ?",
        options: [
          { id: "a", label: "Een hond", labelFr: "Un chien", isCorrect: true },
          { id: "b", label: "Een vis", labelFr: "Un poisson", isCorrect: false },
        ],
      },
    },
    {
      id: "3",
      text: "Lisa geeft de hond een naam: Max.",
      textFr: "Lisa donne un nom au chien : Max.",
      image: "🐶",
    },
    {
      id: "4",
      text: "Lisa en Max spelen samen in de tuin.",
      textFr: "Lisa et Max jouent ensemble dans le jardin.",
      image: "🎾",
      choice: {
        question: "Waar spelen Lisa en Max?",
        questionFr: "Où jouent Lisa et Max ?",
        options: [
          { id: "a", label: "In de tuin", labelFr: "Dans le jardin", isCorrect: true },
          { id: "b", label: "In de school", labelFr: "À l'école", isCorrect: false },
        ],
      },
    },
    {
      id: "5",
      text: "Max is nu de beste vriend van Lisa.",
      textFr: "Max est maintenant le meilleur ami de Lisa.",
      image: "❤️",
    },
  ],
};
