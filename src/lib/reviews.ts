export type Review = {
  id: string;
  author: string;
  stars: number;
  ago: string;
  text: string;
  reply: string;
};

export const reviews: Review[] = [
  {
    id: "rv1",
    author: "Jamal T.",
    stars: 5,
    ago: "posted 2 days ago",
    text: "Best haircut I've had in years, Marcus is the man.",
    reply:
      "Thank you, Jamal! Marcus is going to love hearing this. See you in the chair next time.",
  },
  {
    id: "rv2",
    author: "Renee S.",
    stars: 3,
    ago: "posted 6 days ago",
    text: "Good food but the wait was long on Saturday.",
    reply:
      "Thanks for the honest feedback, Renee. Saturday got away from us, and we've added another pair of hands to weekend shifts. We'd love the chance to get it right next time.",
  },
];
