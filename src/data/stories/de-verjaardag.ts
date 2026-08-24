import type { Story } from "@/lib/stories";

export const deVerjaardagStory: Story = {
  id: "de-verjaardag",
  title: "De Verjaardag",
  titleFr: "L'anniversaire",
  emoji: "🎂",
  subject: "nl",
  scenes: [
    {
      id: "1",
      text: "Vandaag is het de verjaardag van Sam.",
      textFr: "Aujourd'hui, c'est l'anniversaire de Sam.",
      image: "🎈",
    },
    {
      id: "2",
      text: "Sam wil een taart bakken.",
      textFr: "Sam veut faire un gâteau.",
      image: "🎂",
      choice: {
        question: "Wat heeft Sam nodig?",
        questionFr: "De quoi Sam a-t-il besoin ?",
        options: [
          { id: "a", label: "Bloem en eieren", labelFr: "De la farine et des œufs", isCorrect: true },
          { id: "b", label: "Een voetbal", labelFr: "Un ballon de foot", isCorrect: false },
        ],
      },
    },
    {
      id: "3",
      text: "Sam mengt de ingrediënten.",
      textFr: "Sam mélange les ingrédients.",
      image: "🥣",
    },
    {
      id: "4",
      text: "De taart gaat in de oven.",
      textFr: "Le gâteau va au four.",
      image: "🔥",
      choice: {
        question: "Waar bakt de taart?",
        questionFr: "Où cuit le gâteau ?",
        options: [
          { id: "a", label: "In de oven", labelFr: "Dans le four", isCorrect: true },
          { id: "b", label: "In de koelkast", labelFr: "Dans le frigo", isCorrect: false },
        ],
      },
    },
    {
      id: "5",
      text: "Iedereen zingt voor Sam!",
      textFr: "Tout le monde chante pour Sam !",
      image: "🎉",
    },
  ],
};
