# Lantern Descent: 2-player co-op (2PvE)

## How to run (internet play)
1. Install Node 18+ on the computer that will host the server (it can be the host player's PC or any cheap server such as Render, Railway, Fly.io).
2. In the `server/` folder: `npm install` then `npm start` (port: `PORT` env var, default 8080).
3. The server also serves the game. Both players open the same address, e.g. `http://YOUR-ADDRESS:8080/` (use https/wss behind a hosting service).
   - Over the internet from your own PC: forward port 8080 on the router, or use a tunnel (`cloudflared tunnel --url http://localhost:8080`, ngrok) and give the friend the tunnel address.
4. Main menu, bottom-right panel: host presses **Create lobby** and shares the 5-letter code, the friend types it and presses **Join lobby**.
   If a player opens `index.html` straight from disk (file://), press the gear in the panel and type the server address.
5. Host presses **Start co-op**, both pick a hero, the host runs the map and the shop.

## How it works
- The HOST's browser runs the whole game for both heroes. The guest's browser draws what the host sends and sends back its clicks. The relay only forwards messages.
- Each player has their own run (deck, hp, gold, totems, passives), own unlock progress and embers (kept on their own computer), and in fights their own hand, piles, energy, block, pets and powers.
- Turn order: player 1 (+ pets/Bat), player 2 (+ pets), enemies. Each enemy aims at one living hero per round (tag above its head). You lose only when both are down; a fallen hero wakes with 35% HP after a won fight.
- Host chooses map nodes, leaves the shop, descends. Rewards, rest sites and events are per player and the game waits for both. Both can buy in the shop (shared stock).
- Gift card (bottom-left in a fight): costs you the card's energy, the teammate plays it for free. Click the teammate's model to see their deck and energy.
- Both mouse cursors are visible to each other.

## Files
`server/` relay; `js/net/` connection and lobby; `js/coop/` rules (coop, combatSeats, flow, session, guest, gift, cursors, render); `js/ui/coop/` screens; `js/data/coopData.js` numbers; `css/coop.css`.

## Known limits (v1)
- Guest plays cards without the card-flight animation; viewport positions of cursors are scaled by window size.
- Saving/Continue is not available in co-op runs.

## Balance proposal for 2 players (already set in `data/coopData.js`, `scaling`)
Two decks deal about 2x damage and have two HP pools, but each enemy hits only one hero.
- Normal/elite enemy HP x1.75, boss HP x1.9, enemy damage x1.1.
- Keep gold/XP per player unchanged (each gets full rewards). If fights are still too easy, raise hpMult to 2.0; if wipes are common, drop dmgMult to 1.0.
