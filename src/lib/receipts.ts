export type Receipt = {
  id: string;
  raw: string;
  date: string;
  vendor: string;
  category: Category;
  amount: number;
};

export type Category = "Meals" | "Supplies" | "Fuel" | "Software" | "Shipping";

export const categoryStyles: Record<Category, string> = {
  Meals: "bg-[#e3f0e7] text-[#2f6b4f]",
  Supplies: "bg-[#e7ecf6] text-[#3d5a96]",
  Fuel: "bg-[#f8ecd9] text-[#8a6420]",
  Software: "bg-[#ece7f6] text-[#5b4a96]",
  Shipping: "bg-[#f8e3e0] text-[#99493e]",
};

export const receipts: Receipt[] = [
  {
    id: "r1",
    raw: "SQ *BLUE DOOR CAFE 07/08 14.50",
    date: "Jul 8",
    vendor: "Blue Door Cafe",
    category: "Meals",
    amount: 14.5,
  },
  {
    id: "r2",
    raw: "amzn mktp US*2K4TT80 89.99 SUPPLIES",
    date: "Jul 9",
    vendor: "Amazon",
    category: "Supplies",
    amount: 89.99,
  },
  {
    id: "r3",
    raw: "SHELL OIL 5744221 52.10 fuel",
    date: "Jul 9",
    vendor: "Shell",
    category: "Fuel",
    amount: 52.1,
  },
  {
    id: "r4",
    raw: "PAYPAL *CANVA 12.99 recurring??",
    date: "Jul 10",
    vendor: "Canva",
    category: "Software",
    amount: 12.99,
  },
  {
    id: "r5",
    raw: "USPS PO 4048550241 27.60",
    date: "Jul 10",
    vendor: "USPS",
    category: "Shipping",
    amount: 27.6,
  },
  {
    id: "r6",
    raw: "TST* HIGHLAND TACO 07/11 38.72",
    date: "Jul 11",
    vendor: "Highland Taco",
    category: "Meals",
    amount: 38.72,
  },
  {
    id: "r7",
    raw: "COSTCO WHSE #0412 214.85",
    date: "Jul 12",
    vendor: "Costco",
    category: "Supplies",
    amount: 214.85,
  },
  {
    id: "r8",
    raw: "MARATHON PETRO072 44.02 07/12",
    date: "Jul 12",
    vendor: "Marathon",
    category: "Fuel",
    amount: 44.02,
  },
  {
    id: "r9",
    raw: "GOOGLE *GSUITE_louisv 14.40",
    date: "Jul 13",
    vendor: "Google Workspace",
    category: "Software",
    amount: 14.4,
  },
  {
    id: "r10",
    raw: "UPS*1Z884E930 19.35 ship label",
    date: "Jul 13",
    vendor: "UPS",
    category: "Shipping",
    amount: 19.35,
  },
];

export const receiptTotal = receipts.reduce((sum, r) => sum + r.amount, 0);
