export const seedData = {
  entries: [
    {
      description:
        "Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur molestias quod inventore?",
      status: "pending",
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        "En-Progreso: Et quis irure minim elit proident sit non consectetur velit eu laborum sit aliqua consectetur.",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description:
        "Terminada: Eiusmod laborum consequat aute magna ea consectetur officia mollit ex sit ex.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
