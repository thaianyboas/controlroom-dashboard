

import "./controlroom-strategy.js";
import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

interface HAEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

interface HomeAssistant {
  language?: string;
  states: Record<string, HAEntity>;
  user?: { name?: string };
  config?: {
    unit_system?: {
      temperature?: string;
    };
  };
}

interface DashboardConfig {
  type?: string;
  title?: string;
  weather_entity?: string;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}

type Language = "en" | "de" | "pt";
type Page =
  | "home"
  | "rooms"
  | "devices"
  | "energy"
  | "security"
  | "cameras"
  | "media"
  | "automation"
  | "calendar"
  | "settings";

const translations = {
  en: {
    home: "Home",
    rooms: "Rooms",
    devices: "Devices",
    energy: "Energy",
    security: "Security",
    cameras: "Cameras",
    media: "Media",
    automation: "Automation",
    calendar: "Calendar",
    settings: "Settings",
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    subtitle: "Your intelligent home, beautifully connected.",
    connected: "Home Assistant connected",
    waiting: "Waiting for Home Assistant",
    homeLabel: "Your home",
    people: "People",
    peopleEmpty: "No people registered yet",
    atHome: "Home",
    away: "Away",
    locationUnknown: "Location unknown",
    peopleCount: "people",
    lights: "Lights",
    climate: "Climate",
    comingSoon: "This section is being prepared.",
    brandSubtitle: "Home Assistant",
    online: "Connected",
    offline: "Waiting",
    navigation: "Navigation",
    menu: "Open menu",
    weatherUnavailable: "Weather unavailable",
    clearNight: "Clear night",
    cloudy: "Cloudy",
    exceptional: "Exceptional",
    fog: "Foggy",
    hail: "Hail",
    lightning: "Thunderstorm",
    lightningRainy: "Thunderstorm with rain",
    partlycloudy: "Partly cloudy",
    pouring: "Pouring rain",
    rainy: "Rainy",
    snowy: "Snowy",
    snowyRainy: "Snow and rain",
    sunny: "Sunny",
    windy: "Windy",
    windyVariant: "Windy and cloudy"
  },
  de: {
    home: "Startseite",
    rooms: "Räume",
    devices: "Geräte",
    energy: "Energie",
    security: "Sicherheit",
    cameras: "Kameras",
    media: "Medien",
    automation: "Automatisierung",
    calendar: "Kalender",
    settings: "Einstellungen",
    morning: "Guten Morgen",
    afternoon: "Guten Tag",
    evening: "Guten Abend",
    subtitle: "Dein intelligentes Zuhause. Alles verbunden.",
    connected: "Mit Home Assistant verbunden",
    waiting: "Warte auf Home Assistant",
    homeLabel: "Dein Zuhause",
    people: "Personen",
    peopleEmpty: "Noch keine Personen registriert",
    atHome: "Zuhause",
    away: "Abwesend",
    locationUnknown: "Standort unbekannt",
    peopleCount: "Personen",
    lights: "Lichter",
    climate: "Klima",
    comingSoon: "Dieser Bereich wird vorbereitet.",
    brandSubtitle: "Home Assistant",
    online: "Verbunden",
    offline: "Warten",
    navigation: "Navigation",
    menu: "Menü öffnen",
    weatherUnavailable: "Wetter nicht verfügbar",
    clearNight: "Klare Nacht",
    cloudy: "Bewölkt",
    exceptional: "Extremwetter",
    fog: "Nebelig",
    hail: "Hagel",
    lightning: "Gewitter",
    lightningRainy: "Gewitter mit Regen",
    partlycloudy: "Teilweise bewölkt",
    pouring: "Starkregen",
    rainy: "Regnerisch",
    snowy: "Schnee",
    snowyRainy: "Schneeregen",
    sunny: "Sonnig",
    windy: "Windig",
    windyVariant: "Windig und bewölkt"
  },
  pt: {
    home: "Início",
    rooms: "Ambientes",
    devices: "Dispositivos",
    energy: "Energia",
    security: "Segurança",
    cameras: "Câmeras",
    media: "Mídia",
    automation: "Automação",
    calendar: "Agenda",
    settings: "Configurações",
    morning: "Bom dia",
    afternoon: "Boa tarde",
    evening: "Boa noite",
    subtitle: "Sua casa inteligente, perfeitamente conectada.",
    connected: "Conectado ao Home Assistant",
    waiting: "Aguardando o Home Assistant",
    homeLabel: "Sua casa",
    people: "Pessoas",
    peopleEmpty: "Nenhuma pessoa cadastrada",
    atHome: "Em casa",
    away: "Ausente",
    locationUnknown: "Localização desconhecida",
    peopleCount: "pessoas",
    lights: "Luzes",
    climate: "Climatização",
    comingSoon: "Estamos preparando esta seção.",
    brandSubtitle: "Home Assistant",
    online: "Conectado",
    offline: "Aguardando",
    navigation: "Navegação",
    menu: "Abrir menu",
    weatherUnavailable: "Tempo indisponível",
    clearNight: "Noite limpa",
    cloudy: "Nublado",
    exceptional: "Tempo extremo",
    fog: "Neblina",
    hail: "Granizo",
    lightning: "Tempestade",
    lightningRainy: "Tempestade com chuva",
    partlycloudy: "Parcialmente nublado",
    pouring: "Chuva forte",
    rainy: "Chuvoso",
    snowy: "Nevando",
    snowyRainy: "Neve e chuva",
    sunny: "Ensolarado",
    windy: "Ventando",
    windyVariant: "Ventando e nublado"
  }
};

type TranslationKey = keyof typeof translations.en;

const pages: Array<{ id: Page; icon: string }> = [
  { id: "home", icon: "mdi:home-variant" },
  { id: "rooms", icon: "mdi:floor-plan" },
  { id: "devices", icon: "mdi:devices" },
  { id: "energy", icon: "mdi:lightning-bolt-outline" },
  { id: "security", icon: "mdi:shield-check-outline" },
  { id: "cameras", icon: "mdi:cctv" },
  { id: "media", icon: "mdi:play-box-outline" },
  { id: "automation", icon: "mdi:creation" },
  { id: "calendar", icon: "mdi:calendar-month-outline" },
  { id: "settings", icon: "mdi:cog-outline" }
];

const weatherIcons: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant"
};

const weatherKeys: Record<string, TranslationKey> = {
  "clear-night": "clearNight",
  cloudy: "cloudy",
  exceptional: "exceptional",
  fog: "fog",
  hail: "hail",
  lightning: "lightning",
  "lightning-rainy": "lightningRainy",
  partlycloudy: "partlycloudy",
  pouring: "pouring",
  rainy: "rainy",
  snowy: "snowy",
  "snowy-rainy": "snowyRainy",
  sunny: "sunny",
  windy: "windy",
  "windy-variant": "windyVariant"
};

@customElement("controlroom-dashboard")
export class ControlRoomDashboard extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @property({ attribute: false })
  public config: DashboardConfig = {};

  @state()
  private activePage: Page = "home";

  @state()
  private mobileMenuOpen = false;

  @state()
  private currentTime = new Date();

  private clockInterval?: ReturnType<typeof setInterval>;

  public setConfig(config: DashboardConfig): void {
    this.config = config;
  }

  public getCardSize(): number {
    return 12;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.currentTime = new Date();
    this.clockInterval = setInterval(() => {
      this.currentTime = new Date();
    }, 30000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.clockInterval !== undefined) {
      clearInterval(this.clockInterval);
      this.clockInterval = undefined;
    }
  }

  private getLanguage(): Language {
    const language = (this.hass?.language || "en")
      .toLowerCase()
      .split(/[-_]/)[0];
    return language === "de" || language === "pt"
      ? language
      : "en";
  }

  private t(key: TranslationKey): string {
    return translations[this.getLanguage()][key];
  }

  private getGreeting(): string {
    const hour = this.currentTime.getHours();
    if (hour < 12) return this.t("morning");
    if (hour < 18) return this.t("afternoon");
    return this.t("evening");
  }

  private getTime(): string {
    return new Intl.DateTimeFormat(this.getLanguage(), {
      hour: "2-digit",
      minute: "2-digit"
    }).format(this.currentTime);
  }

  private getDate(): string {
    return new Intl.DateTimeFormat(this.getLanguage(), {
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(this.currentTime);
  }

  private getWeather(): HAEntity | undefined {
    const states = this.hass?.states;
    if (!states) return undefined;

    const configured = this.config.weather_entity;
    if (configured) return states[configured];

    const candidates = Object.values(states).filter(
      (entity) =>
        entity.entity_id.startsWith("weather.") &&
        entity.state !== "unknown" &&
        entity.state !== "unavailable"
    );

    return candidates[0];
  }

  private getWeatherTemperature(weather: HAEntity): string {
    const raw = weather.attributes.temperature;
    if (typeof raw !== "number" || !Number.isFinite(raw)) {
      return "—";
    }

    const unit = weather.attributes.temperature_unit;
    const displayUnit = typeof unit === "string"
      ? unit
      : this.hass?.config?.unit_system?.temperature || "°C";

    return `${Math.round(raw)} ${displayUnit}`;
  }

  private getWeatherDescription(condition: string): string {
    const key = weatherKeys[condition];
    return key ? this.t(key) : condition.replace(/-/g, " ");
  }

  private navigate(page: Page): void {
    this.activePage = page;
    this.mobileMenuOpen = false;
  }

  private renderIcon(icon: string) {
    return html`<ha-icon .icon=${icon}></ha-icon>`;
  }

  private renderWeather() {
    const weather = this.getWeather();

    if (!weather) {
      return html`
        <div class="weather weather-empty">
          ${this.renderIcon("mdi:weather-cloudy-alert")}
          <span>${this.t("weatherUnavailable")}</span>
        </div>
      `;
    }

    const icon = weatherIcons[weather.state] ||
      "mdi:weather-cloudy";

    return html`
      <div class="weather" title=${weather.entity_id}>
        <div class="weather-icon">
          ${this.renderIcon(icon)}
        </div>
        <div class="weather-details">
          <div class="weather-temp">
            ${this.getWeatherTemperature(weather)}
          </div>
          <div class="weather-condition">
            ${this.getWeatherDescription(weather.state)}
          </div>
        </div>
      </div>
    `;
  }

  private getPeople(): HAEntity[] {
    return Object.values(this.hass?.states ?? {})
      .filter((entity) => entity.entity_id.startsWith("person."))
      .sort((a, b) => this.getPersonName(a).localeCompare(
        this.getPersonName(b), this.getLanguage()
      ));
  }

  private getPersonName(person: HAEntity): string {
    const name = person.attributes.friendly_name;
    return typeof name === "string" && name.trim()
      ? name
      : person.entity_id.substring("person.".length).replace(/_/g, " ");
  }

  private getPersonLocation(person: HAEntity): string {
    switch (person.state) {
      case "home": return this.t("atHome");
      case "not_home": return this.t("away");
      case "unknown":
      case "unavailable": return this.t("locationUnknown");
      default: return person.state || this.t("locationUnknown");
    }
  }

  private renderPeoplePills() {
    const people = this.getPeople();
    if (!people.length) return nothing;

    return html`
      <div class="people-pills" aria-label=${this.t("people")}>
        ${people.map((person) => {
          const picture = person.attributes.entity_picture;
          const hasPicture = typeof picture === "string" &&
            (picture.startsWith("/") || picture.startsWith("https://") ||
             picture.startsWith("http://"));
          const isHome = person.state === "home";
          const name = this.getPersonName(person);
          return html`
            <div class="person-pill" title=${`${name} · ${this.getPersonLocation(person)}`}>
              <div class="pill-avatar">
                ${hasPicture
                  ? html`<img src=${picture} alt=${name} loading="lazy" />`
                  : html`<span>${name.charAt(0).toUpperCase()}</span>`}
              </div>
              <div class="pill-details">
                <span class="pill-name">${name}</span>
                <span class="pill-location ${isHome ? "at-home" : ""}">
                  ${this.getPersonLocation(person)}
                </span>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  private renderSidebar() {
    return html`
      <aside class="sidebar ${this.mobileMenuOpen ? "open" : ""}">
        <div class="brand">
          <div class="brand-symbol">C</div>
          <div>
            <div class="brand-name">ControlRoom</div>
            <div class="brand-subtitle">
              ${this.t("brandSubtitle")}
            </div>
          </div>
        </div>

        <div class="navigation-label">
          ${this.t("navigation")}
        </div>

        <nav class="navigation">
          ${pages.map(
            (page) => html`
              <button
                class="nav-item ${this.activePage === page.id
                  ? "active"
                  : ""}"
                type="button"
                @click=${() => this.navigate(page.id)}
              >
                ${this.renderIcon(page.icon)}
                <span>${this.t(page.id)}</span>
              </button>
            `
          )}
        </nav>

        <div class="sidebar-bottom">
          <div class="user-avatar">
            ${(this.hass?.user?.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>
          <div class="user-details">
            <div class="user-name">
              ${this.hass?.user?.name || "Home Assistant"}
            </div>
            <div class="user-status">
              <span class="small-dot"></span>
              ${this.hass ? this.t("online") : this.t("offline")}
            </div>
          </div>
        </div>
      </aside>
    `;
  }

  private renderHome() {
    const cards: Array<{ key: TranslationKey; icon: string }> = [
      { key: "energy", icon: "mdi:lightning-bolt" },
      { key: "rooms", icon: "mdi:floor-plan" },
      { key: "lights", icon: "mdi:lightbulb-outline" },
      { key: "climate", icon: "mdi:thermostat" },
      { key: "security", icon: "mdi:shield-check-outline" }
    ];

    return html`
      <section class="hero">
        <div class="eyebrow">${this.t("homeLabel")}</div>
        <div class="hero-content">
          <div class="hero-message">
            <h1>
              ${this.getGreeting()},
              ${this.hass?.user?.name || "ControlRoom"}
              <span class="wave">👋</span>
            </h1>
            <p>${this.t("subtitle")}</p>
          </div>
          ${this.renderPeoplePills()}
        </div>
      </section>

      <section class="overview-grid">
        ${cards.map(
          (card) => html`
            <article class="overview-card">
              <div class="card-icon">
                ${this.renderIcon(card.icon)}
              </div>
              <div>
                <div class="card-title">${this.t(card.key)}</div>
                <div class="card-subtitle">
                  ${this.t("comingSoon")}
                </div>
              </div>
            </article>
          `
        )}
      </section>
    `;
  }

  private renderPage() {
    if (this.activePage === "home") return this.renderHome();

    const page = pages.find(
      (item) => item.id === this.activePage
    );

    return html`
      <section class="placeholder-page">
        <div class="placeholder-icon">
          ${page ? this.renderIcon(page.icon) : nothing}
        </div>
        <h1>${this.t(this.activePage)}</h1>
        <p>${this.t("comingSoon")}</p>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100dvh - 56px);
      font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif;
    }

    * { box-sizing: border-box; }
    button { font: inherit; }

    .dashboard {
      display: flex;
      min-height: calc(100dvh - 56px);
      overflow: hidden;
      color: #f6f3fb;
      background:
        radial-gradient(
          ellipse at 65% 0%,
          rgba(114, 74, 143, 0.22),
          transparent 48%
        ),
        #111019;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 22px;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      width: 250px;
      min-width: 250px;
      padding: 27px 17px 20px;
      background: linear-gradient(
        180deg,
        rgba(112, 82, 139, 0.13),
        rgba(255,255,255,0.015)
      );
      border-right: 1px solid rgba(255,255,255,0.08);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 4px 10px 30px;
    }

    .brand-symbol {
      display: grid;
      place-items: center;
      width: 43px;
      height: 43px;
      border-radius: 14px;
      background: linear-gradient(135deg, #a37cc5, #684c84);
      font-size: 25px;
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(140,96,181,0.2);
    }

    .brand-name {
      font-size: 19px;
      font-weight: 750;
      letter-spacing: -0.05em;
    }

    .brand-subtitle {
      margin-top: 3px;
      color: #aaa3bb;
      font-size: 11px;
    }

    .navigation-label {
      margin: 0 13px 12px;
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #777184;
    }

    .navigation {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 15px;
      width: 100%;
      padding: 13px 15px;
      border: 1px solid transparent;
      border-radius: 14px;
      background: transparent;
      color: #bdb7c9;
      text-align: left;
      cursor: pointer;
      transition: background 180ms, color 180ms;
    }

    .nav-item ha-icon { --mdc-icon-size: 22px; }

    .nav-item:hover {
      background: rgba(255,255,255,0.06);
      color: white;
    }

    .nav-item.active {
      color: white;
      background: linear-gradient(
        110deg,
        rgba(168,125,197,0.4),
        rgba(115,79,149,0.23)
      );
      border-color: rgba(213,174,239,0.35);
      box-shadow:
        inset 0 1px rgba(255,255,255,0.13),
        0 5px 18px rgba(0,0,0,0.12);
    }

    .sidebar-bottom {
      display: flex;
      align-items: center;
      gap: 11px;
      margin-top: auto;
      padding: 14px 10px 4px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }

    .user-avatar {
      display: grid;
      place-items: center;
      width: 39px;
      height: 39px;
      border-radius: 50%;
      background: #67527d;
      font-size: 17px;
      font-weight: 700;
    }

    .user-details { min-width: 0; }

    .user-name {
      font-size: 13px;
      font-weight: 650;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .user-status {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      color: #b9b5c3;
      font-size: 11px;
    }

    .small-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #48d9a4;
    }

    .main {
      flex: 1;
      min-width: 0;
      padding: 27px 31px 45px;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 44px;
    }

    .topbar-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .page-heading {
      font-size: 14px;
      font-weight: 650;
      color: #c8c2d2;
    }

    .topbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .clock, .weather {
      min-height: 72px;
      padding: 12px 17px;
      border-radius: 17px;
      background: rgba(255,255,255,0.055);
      border: 1px solid rgba(255,255,255,0.075);
      backdrop-filter: blur(16px);
    }

    .clock {
      min-width: 94px;
      text-align: right;
    }

    .clock-time {
      font-size: 20px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    .clock-date {
      margin-top: 4px;
      font-size: 11px;
      color: #a9a3b5;
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 13px;
      min-width: 165px;
      background: linear-gradient(
        130deg,
        rgba(152,113,193,0.15),
        rgba(255,255,255,0.04)
      );
    }

    .weather-icon {
      color: #d2b6f2;
      animation: weatherFloat 4s ease-in-out infinite;
    }

    .weather-icon ha-icon {
      --mdc-icon-size: 38px;
    }

    .weather-temp {
      font-size: 20px;
      font-weight: 700;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }

    .weather-condition {
      margin-top: 4px;
      color: #bdb5ca;
      font-size: 11px;
      white-space: nowrap;
    }

    .weather-empty {
      color: #bdb5ca;
      font-size: 12px;
    }

    @keyframes weatherFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    .connection {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 13px;
      border-radius: 15px;
      background: rgba(255,255,255,0.055);
      border: 1px solid rgba(255,255,255,0.075);
      font-size: 12px;
      color: #c5c0d0;
    }

    .eyebrow {
      color: #b5a1cf;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      font-size: 11px;
      font-weight: 700;
    }

    h1 {
      margin: 14px 0 10px;
      font-size: clamp(29px, 3.2vw, 44px);
      letter-spacing: -0.05em;
      font-weight: 750;
    }

    .hero p, .placeholder-page p {
      color: #aaa4b8;
      font-size: 15px;
      line-height: 1.6;
    }

    .wave {
      display: inline-block;
      margin-left: 5px;
    }

    .overview-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 38px;
    }

    .overview-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 175px;
      padding: 22px;
      border-radius: 22px;
      background: linear-gradient(
        145deg,
        rgba(255,255,255,0.065),
        rgba(255,255,255,0.022)
      );
      border: 1px solid rgba(255,255,255,0.085);
      transition: transform 180ms, border-color 180ms;
    }

    .overview-card:hover {
      transform: translateY(-2px);
      border-color: rgba(186,150,213,0.3);
    }

    .card-icon { color: #c2a5e1; }
    .card-icon ha-icon { --mdc-icon-size: 27px; }

    .card-title {
      font-size: 17px;
      font-weight: 650;
    }

    .card-subtitle {
      margin-top: 6px;
      font-size: 12px;
      color: #9993a7;
    }


    .hero-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px 30px;
    }
    .hero-message { min-width: 0; }
    .hero-message h1 { margin-bottom: 10px; }
    .hero-message p { margin: 0; }
    .people-pills {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 9px;
      min-width: 0;
    }
    .person-pill {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      max-width: 220px;
      padding: 5px 13px 5px 5px;
      border: 1px solid rgba(203, 169, 228, 0.17);
      border-radius: 999px;
      background: linear-gradient(120deg, rgba(139, 103, 171, 0.17), rgba(255,255,255,0.035));
      box-shadow: inset 0 1px rgba(255,255,255,0.04);
    }
    .pill-avatar {
      display: grid;
      place-items: center;
      flex: 0 0 35px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      background: #6d557e;
      color: #fff;
      font-weight: 700;
    }
    .pill-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .pill-details { display: flex; flex-direction: column; min-width: 0; }
    .pill-name, .pill-location {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pill-name { font-size: 12px; font-weight: 650; }
    .pill-location { color: #bcaed0; font-size: 11px; font-weight: 600; }
    .pill-location.at-home { color: #67dfb2; }

    .placeholder-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 55vh;
      text-align: center;
    }

    .placeholder-icon {
      display: grid;
      place-items: center;
      width: 82px;
      height: 82px;
      border-radius: 25px;
      color: #d4b7ee;
      background: rgba(153,108,189,0.14);
    }

    .placeholder-icon ha-icon { --mdc-icon-size: 39px; }

    .menu-button {
      display: none;
      padding: 8px;
      border: 0;
      background: transparent;
      color: white;
      cursor: pointer;
    }

    @media (max-width: 1100px) {
      .sidebar {
        width: 210px;
        min-width: 210px;
      }

      .main { padding: 25px 22px; }

      .overview-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .connection { display: none; }
    }

    @media (max-width: 750px) {
      .dashboard { border-radius: 0; }

      .sidebar {
        position: fixed;
        z-index: 100;
        top: 0;
        bottom: 0;
        left: 0;
        width: 270px;
        transform: translateX(-100%);
        transition: transform 220ms;
        background: #211b2c;
        box-shadow: 12px 0 40px rgba(0,0,0,0.3);
      }

      .sidebar.open { transform: translateX(0); }
      .menu-button { display: block; }
      .main { padding: 20px 16px 35px; }
      .topbar { margin-bottom: 30px; }
      .overview-grid { grid-template-columns: 1fr; }
      .overview-card { min-height: 135px; }

      .weather {
        min-width: 0;
        padding: 10px;
      }

      .weather-icon ha-icon { --mdc-icon-size: 29px; }
      .weather-temp { font-size: 16px; }
      .weather-condition { font-size: 10px; }
      .clock { padding: 10px; }
      .clock-time { font-size: 17px; }
    }

    @media (max-width: 450px) {
      .topbar {
        align-items: flex-start;
      }

      .topbar-right { gap: 6px; }

      .weather-condition { display: none; }
      .weather-icon ha-icon { --mdc-icon-size: 25px; }
      .weather { gap: 6px; }
      .clock-date { font-size: 9px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .weather-icon { animation: none; }
    }
  `;

  protected render() {
    const connected = Boolean(this.hass);

    return html`
      <div class="dashboard">
        ${this.renderSidebar()}

        <main class="main">
          <header class="topbar">
            <div class="topbar-left">
              <button
                class="menu-button"
                type="button"
                aria-label=${this.t("menu")}
                @click=${() => {
                  this.mobileMenuOpen = !this.mobileMenuOpen;
                }}
              >
                ${this.renderIcon("mdi:menu")}
              </button>
              <div class="page-heading">
                ${this.t(this.activePage)}
              </div>
            </div>

            <div class="topbar-right">
              ${this.renderWeather()}

              <div class="clock">
                <div class="clock-time">${this.getTime()}</div>
                <div class="clock-date">${this.getDate()}</div>
              </div>

              <div class="connection">
                <span class="small-dot"></span>
                ${connected
                  ? this.t("connected")
                  : this.t("waiting")}
              </div>
            </div>
          </header>

          ${this.renderPage()}
        </main>
      </div>
    `;
  }
}

window.customCards = window.customCards || [];

if (
  !window.customCards.some(
    (card) => card.type === "controlroom-dashboard"
  )
) {
  window.customCards.push({
    type: "controlroom-dashboard",
    name: "ControlRoom Dashboard",
    description:
      "Premium intelligent dashboard for Home Assistant",
    preview: true
  });
}
