/* Wort-Bild-Marke: zwei Satzklammern über einer Welle (Hafen) */
import { APP } from "../config.js";
import { h } from "./ui.js";

export function zeichenSvg(size = 34) {
  const s = `<svg class="marke-zeichen" viewBox="0 0 40 40" width="${size}" height="${size}" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="#0b6b70"/>
    <path d="M14 9h-4v15h4M26 9h4v15h-4" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.5 13.5h5M17.5 18.5h5" stroke="#9fd3d1" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M7 31c3 0 3-2.2 6.5-2.2S17 31 20 31s3.5-2.2 6.5-2.2S30 31 33 31" fill="none" stroke="#9fd3d1" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;
  return s;
}

export function marke(href = "#/", sub = "") {
  return h("a.marke", { href, html: zeichenSvg() + `<span><span class="marke-name">${APP.name}</span>${sub ? `<span class="marke-sub">${sub}</span>` : ""}</span>` });
}

export const autorZeile = () => h("div.autor", `Konzept & Inhalte: ${APP.autor}`);
