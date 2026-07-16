export type StockStatus = "OK" | "Low" | "Reorder now";

export type StockItem = {
  id: string;
  name: string;
  count: number;
  unit: string;
  status: StockStatus;
};

export const statusStyles: Record<StockStatus, string> = {
  OK: "bg-[#e3f0e7] text-[#2f6b4f]",
  Low: "bg-[#f8ecd9] text-[#8a6420]",
  "Reorder now": "bg-[#f8e3e0] text-[#99493e]",
};

export const countStyles: Record<StockStatus, string> = {
  OK: "text-muted",
  Low: "text-[#8a6420]",
  "Reorder now": "text-[#99493e]",
};

export const inventory: StockItem[] = [
  {
    id: "s1",
    name: "House blend beans",
    count: 12,
    unit: "bags",
    status: "OK",
  },
  {
    id: "s2",
    name: "Oat milk",
    count: 3,
    unit: "cartons",
    status: "Low",
  },
  {
    id: "s3",
    name: "To-go cups",
    count: 0,
    unit: "sleeves",
    status: "Reorder now",
  },
  {
    id: "s4",
    name: "Whole milk",
    count: 9,
    unit: "cartons",
    status: "OK",
  },
  {
    id: "s5",
    name: "Vanilla syrup",
    count: 1,
    unit: "bottle",
    status: "Reorder now",
  },
  {
    id: "s6",
    name: "Cup lids",
    count: 14,
    unit: "sleeves",
    status: "OK",
  },
  {
    id: "s7",
    name: "Napkins",
    count: 4,
    unit: "packs",
    status: "Low",
  },
];

export const reorderCount = inventory.filter(
  (i) => i.status === "Reorder now",
).length;

export const reorderNames = inventory
  .filter((i) => i.status === "Reorder now")
  .map((i) => i.name.toLowerCase());
