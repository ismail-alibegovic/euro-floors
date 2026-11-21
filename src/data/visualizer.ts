import type { CategorySlug } from "./catalog";

/**
 * Illustrative presets for the floor visualizer. They are NOT catalog products:
 * each is a rendering of a real wood photograph, perspective-mapped onto the floor of
 * one reference room (see tools/visualizer). Names describe the look, not stock.
 */
export type FloorPreset = {
  id: string;
  name: string;
  note: string;
  tone: "Svijetli" | "Srednji" | "Tamni";
  pattern: "Brodovi" | "Riblja kost" | "Uske lamele";
  related: CategorySlug[];
  room: string;
  swatch: string;
};

const V = "/images/visualizer";

export const presets: FloorPreset[] = [
  { id: "svijetli-hrast", name: "Svijetli hrast", note: "Blijed, gotovo bijeli ton; široki brodovi", tone: "Svijetli", pattern: "Brodovi", related: ["gotovi-troslojni-parket", "masivni-parket"], room: `${V}/room-svijetli-hrast.jpg`, swatch: `${V}/swatch-svijetli-hrast.jpg` },
  { id: "prirodni-hrast", name: "Prirodni hrast", note: "Topao, uravnotežen ton s vidljivim godovima", tone: "Srednji", pattern: "Brodovi", related: ["masivni-parket", "gotovi-troslojni-parket"], room: `${V}/room-prirodni-hrast.jpg`, swatch: `${V}/swatch-prirodni-hrast.jpg` },
  { id: "tamni-orah", name: "Tamni orah", note: "Dubok čokoladni ton, mirna tekstura", tone: "Tamni", pattern: "Brodovi", related: ["gotovi-troslojni-parket"], room: `${V}/room-tamni-orah.jpg`, swatch: `${V}/swatch-tamni-orah.jpg` },
  { id: "riblja-kost", name: "Riblja kost", note: "Hrastove lamele u klasičnom uzorku", tone: "Srednji", pattern: "Riblja kost", related: ["masivni-parket"], room: `${V}/room-riblja-kost.jpg`, swatch: `${V}/swatch-riblja-kost.jpg` },
  { id: "rustikalni-hrast", name: "Rustikalni hrast", note: "Široki brodovi, čvorovi i izražena žica", tone: "Srednji", pattern: "Brodovi", related: ["masivni-parket"], room: `${V}/room-rustikalni-hrast.jpg`, swatch: `${V}/swatch-rustikalni-hrast.jpg` },
  { id: "bambus", name: "Bambus", note: "Uske lamele s karakterističnim čvorovima", tone: "Svijetli", pattern: "Uske lamele", related: ["egzoticni-parket"], room: `${V}/room-bambus.jpg`, swatch: `${V}/swatch-bambus.jpg` },
];

export const DEFAULT_PRESET = "prirodni-hrast";
export const ORIGINAL_ROOM = `${V}/room-original.jpg`;
export const ROOM_SIZE = { width: 2400, height: 1300 };
export const getPreset = (id?: string | null) => presets.find((p) => p.id === id);
