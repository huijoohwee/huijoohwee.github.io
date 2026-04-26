# GrabMaps — library and API reference

Reference for the **`grab-maps` JavaScript/TypeScript library** (MapLibre-based), **HTTP endpoints** the gateway exposes for maps/places/routing (typically behind `Authorization: Bearer <API_KEY>`), optional **MCP tools**, and how to load the **map style** for MapLibre.

**Map style:** use **`GET https://maps.grab.com/api/style.json`** with **`Authorization: Bearer <API_KEY>`**, parse JSON, and set MapLibre’s `style` to that object (§2.8, §5). The GrabMaps library does this automatically when you set `baseUrl` + `apiKey` and omit a custom `style`. Do **not** rely on `?key=` query parameters on `https://maps.grab.com/api/style.json`—use the Bearer header (or `transformRequest` if you must pass a style URL string).

API keys often look like `bm_…`.

---

## 1. Authentication

- **Protected map and Places calls:** `Authorization: Bearer <API_KEY>`.
- **Map style for MapLibre:** `GET https://maps.grab.com/api/style.json` requires **`Authorization: Bearer <API_KEY>`**. Fetch the JSON and pass it to MapLibre as `style` (§2.8). Same pattern as the hosted docs and demos.
- **MCP (HTTP):** `Authorization: Bearer YOUR_API_KEY` on the MCP transport if your deployment exposes MCP (section 4).

---

## 2. `grab-maps` library

Package name: `grab-maps`. Architecture and upgrade notes: `DOCS.md`, `README.md`, `MAPLIBRE.md` in the package.

### 2.1 Including the library (script tag)

For a plain HTML page or a quick prototype without npm, include the hosted ES module bundle from the Grab developer CDN:

```html
<script type="module" src="https://maps.grab.com/developer/assets/js/grabmaps.es.js"></script>
```

Use `type="module"` so the browser loads `grabmaps.es.js` as an ES module. You still need MapLibre (`maplibre-gl`) and its CSS on the page when you instantiate a map; see `MAPLIBRE.md` in the package. For bundled apps, prefer installing `grab-maps` from npm and importing it in your build.

### 2.2 Integration levels

| Level | Entry | Use case |
|--------|--------|----------|
| Composable API | `GrabMapsBuilder` → `GrabMapsClient` → builders (`MapBuilder`, …) | Custom UIs |
| All-in-one widget | `GrabMapsLib` + options (`library.ts`) | Search, routing, layers, etc. |
| Minimal embed | `embed.ts` | Map-only embed; `McpStateAdapter` vs `MemoryStateAdapter` |
| Plain MapLibre | `maplibregl` + **`GET https://maps.grab.com/api/style.json`** with Bearer, then `style: json` (§2.8) | Full tiles/style via authenticated style |

### 2.3 `GrabMapsClient` services

After `new GrabMapsBuilder(…).build()`:

| Service | Role |
|---------|------|
| `client.api` | Low-level GET/POST/DELETE with auth |
| `client.search` | POI search, nearby, reverse geocode |
| `client.routing` | Directions / waypoints |

### 2.4 Builders

`MapBuilder`, `SearchBuilder`, `RouteBuilder` / `RoutingIntegrationBuilder`, `PolygonBuilder`, `CircleBuilder`, `WaypointBuilder`, `PinBuilder`, `StyleBuilder`, `GeocodingBuilder`, `ControlsBuilder`, `NearbyBuilder`.

### 2.5 `GrabMapsLib`

Constructor: `new GrabMapsLib(options)`. Notable methods (non-exhaustive): `getMap()`, `getClient()`, `onReady()`, `flyTo()`, `openPOI()`, `searchPlaces()`, `setLayerVisibility()`, `calculateWaypointRoute()`, `clearRoute()`, `clearWaypoints()`, `destroy()`, `instance.api`.

Core options include `container`, `apiKey`, `baseUrl`, viewport (`lat`, `lng`, `zoom`), `style` (omit to fetch from `https://maps.grab.com/api/style.json` when `baseUrl` is `https://maps.grab.com`), feature toggles (`navigation`, `attribution`, `buildings`, `labels`), UI (`showSearchBar`, `showWaypointsModal`, `showLayersMenu`, …), `routing`, `layers`, polygon/circle drawing, `search`, pins/polygons/circles/waypoints, and `errorHandler`.

### 2.6 Minimal builder usage

```javascript
const client = new GrabMapsBuilder()
  .setBaseUrl('https://maps.grab.com')
  .setApiKey('<API_KEY>')
  .build();

const map = new MapBuilder(client)
  .setContainer('map')
  .setCenter([103.8198, 1.3521])
  .setZoom(12)
  .enableNavigation()
  .enableAttribution()
  .build();
```

Reuse one **client** for multiple builders to avoid redundant auth handshakes.

### 2.7 Get routes (library)

Use the same `GrabMapsClient` from `GrabMapsBuilder` (section 2.6).

**Routes** — `client.routing.getRoute(start, end, options?)` returns a `Route`; coordinates are `[latitude, longitude]` pairs.

```javascript
const client = new GrabMapsBuilder()
  .setBaseUrl('https://maps.grab.com')
  .setApiKey('<API_KEY>')
  .build();

const route = await client.routing.getRoute(
  [1.3521, 103.8198],
  [1.2921, 103.7767],
  { mode: 'car' }
);
// Use route geometry / legs for map line or turn-by-turn UI
```

### 2.8 MapLibre + authenticated style

Preferred: fetch the style document, then pass the object to MapLibre (avoids auth on tile requests being conflated with the style URL).

```javascript
fetch('https://maps.grab.com/api/style.json', {
  headers: { Authorization: 'Bearer <API_KEY>' },
})
  .then((r) => r.json())
  .then((style) => {
    new maplibregl.Map({ container: 'map', style, center: [103.8198, 1.3521], zoom: 12 });
  });
```

If you must use a **string** `style` URL instead, set `transformRequest` on the `Map` options so `Request`s to `https://maps.grab.com/api/style.json` include `Authorization: Bearer <API_KEY>` (MapLibre will merge your transform with its own tile requests).

---

## 3. HTTP API paths (gateway)

Paths are relative to the configured API base (commonly `https://maps.grab.com/api/v1/`). Build the full URL as **`https://maps.grab.com` + `/api/v1` + suffix** from the tables (for example `https://maps.grab.com/api/v1/maps/poi/v1/search`). The `/v1` or `/v2` inside a suffix such as `/maps/poi/v1/...` or `/maps/place/v2/...` is part of the resource path, not a duplicate of the gateway prefix.

### Places and search (POI)

| Method | Path (suffix) | Notes |
|--------|-----------------|--------|
| GET | `/maps/poi/v1/search` | `keyword`, `country`, optional `location` bias, `limit`. |
| GET | `/maps/place/v2/nearby` | **Find Nearby Places:** `location` (`lat,lng`), `radius` in **kilometres** (default 1), `limit`, `rankBy`, `language`. |
| GET | `/maps/poi/v1/reverse-geo` | Reverse: `location` as `lat,lng` |

### Routing and ETA

| Method | Path (suffix) | Notes |
|--------|----------------|--------|
| GET | `/maps/eta/v1/direction` | Repeated `coordinates` as `lng,lat`; `profile`, avoid options, etc. |

`GET /api/v1/maps/eta/v1/navigation` is for turn-by-turn / voice apps. For map geometry use **`direction`** only.

### Style and coverage

| Method | Path | Notes |
|--------|------|--------|
| GET | `https://maps.grab.com/api/style.json` | **Bearer required.** Map style JSON for MapLibre. Theme query params may include `basic`, `dark`, `satellite`. Returns the style document—use as `style` in `maplibregl.Map` after `fetch` + `json()` (§2.8). |
| GET | `/api/v1/coverage-tiles/{x}/{y}/{z}.png` | Coverage tiles (`CoverageLayer`) |

### Map issues

| Method | Path | Notes |
|--------|------|--------|
| POST | `/api/v1/map-issues/report` | When configured |

### Sessions (waypoint and route sharing)

| Method | Path |
|--------|------|
| POST | `/api/v1/sessions/waypoints` |
| POST | `/api/v1/sessions/routes` |
| GET | `/api/v1/sessions/waypoints/{sessionId}` |
| GET | `/api/v1/sessions/routes/{sessionId}` |

### Example `fetch` calls (routes and places)

Same host: `https://maps.grab.com`. Send `Authorization: Bearer <API_KEY>` on protected routes—including **`GET https://maps.grab.com/api/style.json`** before initializing the map.

#### Routes (`GET .../maps/eta/v1/direction`)

Repeated `coordinates` as **`lng,lat`** per point. Use `overview=full` for route geometry on the map. Response includes `routes[]` with geometry, distance (m), duration (s), legs, steps.

```javascript
const p = new URLSearchParams();
p.append('coordinates', '103.8198,1.3521');
p.append('coordinates', '103.7767,1.2921');
p.set('profile', 'driving');
p.set('overview', 'full');

const data = await fetch('https://maps.grab.com/api/v1/maps/eta/v1/direction?' + p, {
  headers: { Authorization: 'Bearer <API_KEY>' },
}).then((r) => r.json());

const first = data.routes?.[0];
// first.geometry, first.legs, first.distance, first.duration
```

#### Places — keyword search

```javascript
const q = new URLSearchParams({
  keyword: 'Marina Bay Sands',
  country: 'SGP',
  location: '1.3521,103.8198',
  limit: '10',
});
const data = await fetch('https://maps.grab.com/api/v1/maps/poi/v1/search?' + q, {
  headers: { Authorization: 'Bearer <API_KEY>' },
}).then((r) => r.json());
```

#### Places — nearby (radius in km)

```javascript
const q = new URLSearchParams({
  location: '1.3521,103.8198',
  radius: '1',
  limit: '10',
  rankBy: 'distance',
});
const data = await fetch('https://maps.grab.com/api/v1/maps/place/v2/nearby?' + q, {
  headers: { Authorization: 'Bearer <API_KEY>' },
}).then((r) => r.json());
```

---

## 4. MCP tools

The GrabMaps MCP server exposes **three** HTTP tools for assistants. Send **`Authorization: Bearer YOUR_API_KEY`** on the MCP transport. **Read each tool’s JSON schema** in your deployment before calling (parameters and outputs are authoritative).

| Tool | Purpose |
|------|---------|
| `search_places` | Keyword / place search |
| `nearby_search` | Nearby POIs |
| `get_directions` | Routes between locations |

---

## 5. Map styles in MapLibre

**GrabMaps Playground (with API key):** load the style with a Bearer token, then pass the JSON to MapLibre:

1. `GET https://maps.grab.com/api/style.json` with header `Authorization: Bearer <API_KEY>`.
2. `const style = await response.json()`.
3. `new maplibregl.Map({ container, style, center, zoom, … })`.

See §2.8 for a minimal snippet. This matches the **developer documentation** quick starts and the **`grab-maps`** library when `baseUrl` is `https://maps.grab.com`, `apiKey` is set, and `style` is omitted (the library fetches `https://maps.grab.com/api/style.json`).

**Markers / user location / route lines:** use standard MapLibre `Marker`, `Geolocation`, and GeoJSON `line` layers on the same map instance. On teardown, call `map.remove()`.

---

## 6. Constraints (quick reference)

- **Map style:** use **`GET https://maps.grab.com/api/style.json` + Bearer** and the returned JSON as MapLibre `style`; avoid undocumented `?key=` query patterns on `https://maps.grab.com/api/style.json`.
- **POI search:** adding a reference `location` improves relevance; optional `keyword` / category hints may be composed client-side.
- **Nearby V2:** `radius` in **kilometres**; supports sorting options such as distance vs popularity; library helpers may convert metres → km.
- **Directions:** default coordinate order **lng,lat**; use `lat_first=true` if you pass lat,lng pairs; use `overview=full` when you need geometry for map rendering.
- **Attribution:** keep MapLibre attribution enabled; for Grab data follow **© Grab | © OpenStreetMap contributors** where required.

---



*For authoritative OpenAPI or upstream behavior for your deployment, consult your API documentation or deployment operators.*
