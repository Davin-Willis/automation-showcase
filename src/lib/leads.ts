export type LeadTag = "No website found" | "Facebook page only";

export type Lead = {
  id: string;
  name: string;
  kind: string;
  area: string;
  tag: LeadTag;
};

export const tagStyles: Record<LeadTag, string> = {
  "No website found": "bg-[#f8ecd9] text-[#8a6420]",
  "Facebook page only": "bg-[#e7ecf6] text-[#3d5a96]",
};

// The scan "finds" more than the ten it shows, like the real tool did.
export const foundCount = 47;

export const leads: Lead[] = [
  {
    id: "l1",
    name: "Bluegrass Barbershop",
    kind: "Barbershop",
    area: "Germantown",
    tag: "No website found",
  },
  {
    id: "l2",
    name: "Maria's Taqueria",
    kind: "Restaurant",
    area: "Shively",
    tag: "No website found",
  },
  {
    id: "l3",
    name: "Falls City Plumbing",
    kind: "Plumber",
    area: "Portland",
    tag: "No website found",
  },
  {
    id: "l4",
    name: "Cardinal Lawn Care",
    kind: "Landscaping",
    area: "Fern Creek",
    tag: "Facebook page only",
  },
  {
    id: "l5",
    name: "Derby City Detailing",
    kind: "Auto detailing",
    area: "Buechel",
    tag: "No website found",
  },
  {
    id: "l6",
    name: "Miss Dot's Diner",
    kind: "Diner",
    area: "Clifton",
    tag: "No website found",
  },
  {
    id: "l7",
    name: "Highland Paws Grooming",
    kind: "Pet grooming",
    area: "Highlands",
    tag: "Facebook page only",
  },
  {
    id: "l8",
    name: "Rivertown Auto Repair",
    kind: "Mechanic",
    area: "Butchertown",
    tag: "No website found",
  },
  {
    id: "l9",
    name: "Petal & Stem Florist",
    kind: "Florist",
    area: "St. Matthews",
    tag: "No website found",
  },
  {
    id: "l10",
    name: "Okolona Tire & Brake",
    kind: "Tire shop",
    area: "Okolona",
    tag: "No website found",
  },
];
