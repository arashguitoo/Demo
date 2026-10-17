/* Platzhalter für Bereiche, die gerade gebaut werden */
import { h, icon } from "../core/ui.js";

export default async function (ctx) {
  ctx.render(
    h("header.seitenkopf", h("div", h("h1", "Live-Spiel starten"), h("p", "Sie starten ein Spiel am Beamer, alle spielen am Handy mit."))),
    h("div.flaeche.leer", icon("play", 36), h("p", "Die Live-Spiele werden gerade eingebaut."), h("a.btn", { href: "#/inhalte" }, "Zu den Inhalten")));
}
