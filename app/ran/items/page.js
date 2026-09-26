import ItemBrowser from "./item-browser";
import data from "./items.json";

export const metadata = {
  title: "RAN Item Codes",
  description: "Every RAN Odyssey item and its getitem code.",
  robots: { index: false, follow: false },
};

export default function RanItemsPage() {
  return <ItemBrowser categories={data.categories} sheets={data.sheets} />;
}
