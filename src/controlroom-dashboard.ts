

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
  callWS?: (message: {type: string}) => Promise<unknown>;
  callService?: (domain: string, service: string, data?: Record<string, unknown>) => Promise<unknown>;
  user?: { id?: string; name?: string };
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
  | "settings"
  | "lights";

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
    allLights: "All lights",
    allOn: "All on",
    allOff: "All off",
    brightness: "Brightness",
    lighting: "Lighting",
    allRooms: "All rooms",
    unassigned: "Unassigned",
    groups: "Groups",
    groupsLater: "Group creation in Home Assistant is coming next.",
    lightDetails: "Select a light to adjust it",

    lightsOn: "on",
    lightsOff: "off",
    noLights: "No lights found",
    lightUnavailable: "Unavailable",
    toggleLight: "Toggle light",
    lightActionError: "Could not control the light",

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
    allLights: "Alle Lichter",
    allOn: "Alle an",
    allOff: "Alle aus",
    brightness: "Helligkeit",
    lighting: "Beleuchtung",
    allRooms: "Alle Räume",
    unassigned: "Ohne Raum",
    groups: "Gruppen",
    groupsLater: "Gruppen im Home Assistant erstellen: nächster Schritt.",
    lightDetails: "Licht auswählen und einstellen",

    lightsOn: "an",
    lightsOff: "aus",
    noLights: "Keine Lichter gefunden",
    lightUnavailable: "Nicht verfügbar",
    toggleLight: "Licht schalten",
    lightActionError: "Licht konnte nicht geschaltet werden",

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
    allLights: "Todas as luzes",
    allOn: "Ligar todas",
    allOff: "Desligar todas",
    brightness: "Brilho",
    lighting: "Iluminação",
    allRooms: "Todos os ambientes",
    unassigned: "Sem ambiente",
    groups: "Grupos",
    groupsLater: "Criação de grupos no Home Assistant: próxima etapa.",
    lightDetails: "Selecione uma luz para ajustar",

    lightsOn: "acesas",
    lightsOff: "apagadas",
    noLights: "Nenhuma luz encontrada",
    lightUnavailable: "Indisponível",
    toggleLight: "Alternar luz",
    lightActionError: "Não foi possível controlar a luz",

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

  @state() private openLightColorId = "";
  @state() private showInlineBrightness = true;

  @state()
  private selectedRoom = "";

  @state()
  private lightsTab: "lights" | "groups" = "lights";

  @state()
  private areaNames: Record<string, string> = {};

  @state()
  private lightAreas: Record<string, string> = {};

  @state() private labelOptions: Array<{label_id:string;name:string}> = [];
  @state() private entityLabels: Record<string,string[]> = {};
  @state() private groupMembers: Record<string,string[]> = {};
  @state() private visibilitySettingsOpen = false;
  @state() private groupMode: "auto" | "all" | "manual" = "auto";
  @state() private hiddenEntities: string[] = [];
  @state() private shownEntities: string[] = [];
  @state() private excludedLabels: string[] = ["no_dboard"];
  @state() private onlyUnlabeled = false;
  @state() private showTypeDescriptions = false;
  @state() private showStatusDescriptions = false;
  private settingsInitialized = false;
  private registryLoaded = false;
  private registryLoading = false;


  @state() private welcomeMode: "automatic" | "shared" = "automatic";
  @state() private welcomeShowEyebrow = true;
  @state() private welcomeShowSubtitle = true;
  @state() private welcomeShowPeople = true;
  @state() private welcomeShowGreeting = true;
  @state() private welcomeEyebrow = "";
  @state() private welcomeSubtitle = "";
  private clockInterval?: ReturnType<typeof setInterval>;

  private restoreWelcome(): void {
    try {
      const data = JSON.parse(localStorage.getItem("controlroom-welcome-v1") || "{}");
      if (data.mode === "automatic" || data.mode === "shared") this.welcomeMode = data.mode;
      for (const [key, field] of [["eyebrow", "welcomeEyebrow"], ["subtitle", "welcomeSubtitle"]] as const) {
        if (typeof data[key] === "string") (this as any)[field] = data[key];
      }
      for (const [key, field] of [["showEyebrow", "welcomeShowEyebrow"], ["showSubtitle", "welcomeShowSubtitle"], ["showPeople", "welcomeShowPeople"], ["showGreeting", "welcomeShowGreeting"]] as const) {
        if (typeof data[key] === "boolean") (this as any)[field] = data[key];
      }
    } catch (error) { console.warn("ControlRoom: welcome preferences unavailable", error); }
  }
  private saveWelcome(): void {
    try { localStorage.setItem("controlroom-welcome-v1", JSON.stringify({
      mode: this.welcomeMode, eyebrow: this.welcomeEyebrow, subtitle: this.welcomeSubtitle,
      showEyebrow: this.welcomeShowEyebrow, showSubtitle: this.welcomeShowSubtitle,
      showPeople: this.welcomeShowPeople, showGreeting: this.welcomeShowGreeting
    })); } catch (error) { console.warn("ControlRoom: welcome preferences could not be saved", error); }
  }


  private restorePreferences(): void {
    if (this.settingsInitialized) return;
    this.settingsInitialized = true;
    try {
      const raw = localStorage.getItem("controlroom-lighting-v1");
      if (!raw) return;
      const v = JSON.parse(raw) as Record<string,unknown>;
      if (v.groupMode === "auto" || v.groupMode === "all" || v.groupMode === "manual") this.groupMode = v.groupMode;
      if (Array.isArray(v.hiddenEntities)) this.hiddenEntities = v.hiddenEntities.filter((x):x is string=>typeof x==="string");
      if (Array.isArray(v.shownEntities)) this.shownEntities = v.shownEntities.filter((x):x is string=>typeof x==="string");
      if (Array.isArray(v.excludedLabels)) this.excludedLabels = v.excludedLabels.filter((x):x is string=>typeof x==="string");
      if (typeof v.onlyUnlabeled === "boolean") this.onlyUnlabeled = v.onlyUnlabeled;
      if (typeof v.showInlineBrightness === "boolean") this.showInlineBrightness = v.showInlineBrightness;
      if (typeof v.showTypeDescriptions === "boolean") this.showTypeDescriptions = v.showTypeDescriptions;
      if (typeof v.showStatusDescriptions === "boolean") this.showStatusDescriptions = v.showStatusDescriptions;
    } catch (error) { console.warn("ControlRoom: lighting preferences unavailable",error); }
  }

  private savePreferences(): void {
    try { localStorage.setItem("controlroom-lighting-v1",JSON.stringify({
      groupMode:this.groupMode,hiddenEntities:this.hiddenEntities,shownEntities:this.shownEntities,
      excludedLabels:this.excludedLabels,onlyUnlabeled:this.onlyUnlabeled,showInlineBrightness:this.showInlineBrightness,
      showTypeDescriptions:this.showTypeDescriptions,showStatusDescriptions:this.showStatusDescriptions
    })); } catch(error) { console.warn("ControlRoom: preferences could not be saved",error); }
  }

  private toggleEntry(list: string[], id: string): string[] {
    return list.includes(id) ? list.filter(x=>x!==id) : [...list,id];
  }

  public setConfig(config: DashboardConfig): void {
    this.config = config;
  }

  public getCardSize(): number {
    return 12;
  }

  protected updated(): void {
    if (this.hass?.callWS && !this.registryLoaded && !this.registryLoading) {
      void this.loadAreaRegistry();
    }
  }

  private async loadAreaRegistry(): Promise<void> {
    if (!this.hass?.callWS) return;
    this.registryLoading = true;
    try {
      const [areasRaw, entitiesRaw, devicesRaw] = await Promise.all([
        this.hass.callWS({type:"config/area_registry/list"}),
        this.hass.callWS({type:"config/entity_registry/list"}),
        this.hass.callWS({type:"config/device_registry/list"})
      ]);
      const areas = areasRaw as Array<{area_id:string;name:string}>;
      const entities = entitiesRaw as Array<{entity_id:string;area_id?:string|null;device_id?:string|null;labels?:string[]}>;
      const devices = devicesRaw as Array<{id:string;area_id?:string|null;labels?:string[]}>;
      const deviceArea = new Map(devices.map(d=>[d.id,d.area_id || ""]));
      this.areaNames = Object.fromEntries(areas.map(a=>[a.area_id,a.name]));
      this.lightAreas = Object.fromEntries(entities.filter(e=>e.entity_id.startsWith("light.")).map(e=>[
        e.entity_id,e.area_id || (e.device_id ? deviceArea.get(e.device_id) : "") || ""
      ]));
      // Labels live in HA registries, not in hass.states. A failure to read labels
      // must not prevent the rest of the lighting dashboard from loading.
      const deviceLabels = new Map(devices.map(d=>[d.id,d.labels || []]));
      this.entityLabels = Object.fromEntries(entities.map(e=>[
        e.entity_id,[...new Set([...(e.labels || []),...(e.device_id ? deviceLabels.get(e.device_id) || [] : [])])]
      ]));
      try {
        const labels = await this.hass!.callWS!({type:"config/label_registry/list"}) as Array<{label_id:string;name:string}>;
        this.labelOptions = labels.sort((a,b)=>a.name.localeCompare(b.name));
      } catch(error) { console.warn("ControlRoom: label registry unavailable",error); }
      this.registryLoaded = true;
    } catch (error) {
      console.warn("ControlRoom: area registry not available",error);
      this.registryLoaded = true;
    } finally {
      this.registryLoading = false;
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.restorePreferences();
    this.restoreWelcome();
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

  private getCurrentPerson(): HAEntity | undefined {
    const people = this.getPeople();
    const userId = this.hass?.user?.id;
    if (userId) {
      const match = people.find(p => p.attributes.user_id === userId);
      if (match) return match;
    }
    const username = this.hass?.user?.name?.trim().toLocaleLowerCase();
    return username ? people.find(p => this.getPersonName(p).trim().toLocaleLowerCase() === username) : undefined;
  }

  private renderPersonAvatar(person: HAEntity, large = false) {
    const picture = person.attributes.entity_picture;
    const name = this.getPersonName(person);
    const hasPicture = typeof picture === "string" && /^(\/|https?:\/\/)/.test(picture);
    return html`<span class="pill-avatar ${large ? "avatar-large" : ""}">
      ${hasPicture ? html`<img src=${picture} alt=${name} loading="lazy" />` : html`<span>${name.charAt(0).toUpperCase()}</span>`}
    </span>`;
  }

  private renderPeoplePills(people: HAEntity[]) {
    if (!people.length || !this.welcomeShowPeople) return nothing;
    return html`<div class="people-pills" aria-label=${this.t("people")}>
      ${people.map(person => html`<div class="person-pill" title=${`${this.getPersonName(person)} · ${this.getPersonLocation(person)}`}>
        ${this.renderPersonAvatar(person)}
        <div class="pill-details"><span class="pill-name">${this.getPersonName(person)}</span>
          <span class="pill-location ${person.state === "home" ? "at-home" : ""}">${this.getPersonLocation(person)}</span>
        </div>
      </div>`)}
    </div>`;
  }

  private renderWelcomeSettings() {
    return html`<section class="welcome-settings">
      <div class="eyebrow">Startseite</div><h2>Begrüßung & Personen</h2>
      <p>Personalisierung dieses Browsers / Displays</p>
      <label class="welcome-setting-row"><span>Begrüßungsmodus</span>
        <select .value=${this.welcomeMode} @change=${(e: Event) => {this.welcomeMode = (e.target as HTMLSelectElement).value as "automatic" | "shared"; this.saveWelcome();}}>
          <option value="automatic">Automatisch · angemeldete Person</option>
          <option value="shared">Gemeinsam · iSG Display</option>
        </select></label>
      ${([
        ["welcomeShowGreeting", "Begrüßung anzeigen"],
        ["welcomeShowEyebrow", "Bereichstitel anzeigen"],
        ["welcomeShowSubtitle", "Untertitel anzeigen"],
        ["welcomeShowPeople", "Personen und Standorte anzeigen"]
      ] as const).map(([key, label]) => html`<label class="welcome-setting-row"><span>${label}</span>
        <input type="checkbox" .checked=${this[key]} @change=${(e: Event) => {(this as any)[key] = (e.target as HTMLInputElement).checked; this.saveWelcome();}} /></label>`)}
      <label class="welcome-setting-text">Bereichstitel
        <input type="text" .value=${this.welcomeEyebrow || this.t("homeLabel")} @change=${(e: Event) => {this.welcomeEyebrow = (e.target as HTMLInputElement).value; this.saveWelcome();}} /></label>
      <label class="welcome-setting-text">Untertitel
        <input type="text" .value=${this.welcomeSubtitle || this.t("subtitle")} @change=${(e: Event) => {this.welcomeSubtitle = (e.target as HTMLInputElement).value; this.saveWelcome();}} /></label>
    </section>`;
  }

  private renderSmartBar() {
    const calendar = this.hass?.states["calendar.controlroom_mull_stadtreinigung_hamburg"];
    const eventName = typeof calendar?.attributes.message === "string" ? calendar.attributes.message : "—";
    const eventDate = calendar?.attributes.start_time;
    let eventWhen = "Nächste Abholung";
    if (typeof eventDate === "string") {
      const date = new Date(eventDate);
      if (!Number.isNaN(date.getTime())) {
        const today = new Date(this.currentTime.getFullYear(), this.currentTime.getMonth(), this.currentTime.getDate()).getTime();
        const eventDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const days = Math.round((eventDay - today) / 86400000);
        eventWhen = days === 0 ? "Heute" : days === 1 ? "Morgen" : new Intl.DateTimeFormat("de", {day:"2-digit",month:"short"}).format(date);
      }
    }
    return html`<div class="smart-bar">
      ${this.renderWeather()}
      <div class="smart-divider"></div>
      <div class="smart-segment">${this.renderIcon("mdi:clock-outline")}
        <div><strong>${this.getTime()}</strong><small>${this.getDate()}</small></div></div>
      <div class="smart-divider"></div>
      <div class="smart-segment smart-waste">${this.renderIcon("mdi:trash-can-outline")}
        <div><strong>${eventName}</strong><small>${eventWhen}</small></div></div>
    </div>`;
  }

  private getAllLightEntities(): HAEntity[] {
    return Object.values(this.hass?.states ?? {}).filter(e=>e.entity_id.startsWith("light."))
      .sort((a,b)=>this.getLightName(a).localeCompare(this.getLightName(b),this.getLanguage()));
  }

  private getGroupMembers(light: HAEntity): string[] {
    const ids = light.attributes.entity_id;
    return Array.isArray(ids) ? ids.filter((id):id is string=>typeof id==="string" && id.startsWith("light.")) : [];
  }

  private getLights(): HAEntity[] {
    const all = this.getAllLightEntities();
    const stateIds = new Set(all.map(l=>l.entity_id));
    const groups = all.filter(l=>this.getGroupMembers(l).some(id=>stateIds.has(id)));
    const groupedMembers = new Set(groups.flatMap(g=>this.getGroupMembers(g)));
    return all.filter(light=>{
      const id=light.entity_id;
      const labels=this.entityLabels[id] || [];
      if (this.hiddenEntities.includes(id)) return false;
      if (this.shownEntities.includes(id)) return true;
      if (labels.some(label=>this.excludedLabels.includes(label))) return false;
      if (this.onlyUnlabeled && labels.length) return false;
      if (this.groupMode === "manual") return true;
      if (this.groupMode === "auto" && groupedMembers.has(id)) {
        // Only suppress a member if at least one containing group is itself visible.
        return !groups.some(g=>this.getGroupMembers(g).includes(id) &&
          !this.hiddenEntities.includes(g.entity_id) &&
          !((this.entityLabels[g.entity_id] || []).some(label=>this.excludedLabels.includes(label))) &&
          (!this.onlyUnlabeled || !(this.entityLabels[g.entity_id] || []).length));
      }
      return true;
    });
  }

  private renderLightingPreferences() {
    const all = this.getAllLightEntities();
    return html`<section class="lighting-preferences">
      <div class="preferences-header"><strong>${this.getLanguage()==="de"?"Sichtbarkeit & Darstellung":this.getLanguage()==="pt"?"Visibilidade e aparência":"Visibility & appearance"}</strong>
        <button @click=${()=>this.visibilitySettingsOpen=false} aria-label="Close">${this.renderIcon("mdi:close")}</button></div>
      <div class="pref-title">${this.getLanguage()==="de"?"Gruppenanzeige":"Exibição dos grupos"}</div>
      <div class="pref-modes">
        ${([ ["auto","Gruppen bevorzugen"],["all","Alle anzeigen"],["manual","Manuell"] ] as const).map(([id,label])=>html`
          <button class=${this.groupMode===id?"active":""} @click=${()=>{this.groupMode=id;this.savePreferences();}}>${label}</button>`)}
      </div>
      <div class="pref-title">Home Assistant Labels · ${this.labelOptions.length}</div>
      <div class="pref-list">
        ${this.labelOptions.map(label=>html`<label class="pref-check"><input type="checkbox"
          .checked=${this.excludedLabels.includes(label.label_id)}
          @change=${()=>{this.excludedLabels=this.toggleEntry(this.excludedLabels,label.label_id);this.savePreferences();}} />
          <span class="pref-label-name" title=${label.name}>${label.name}</span><span class="pref-hint">${this.getLanguage()==="de"?"Ausblenden":this.getLanguage()==="pt"?"Ocultar":"Hide"}</span></label>`)}
        ${!this.labelOptions.length?html`<small>${this.registryLoading?"Labels werden geladen…":"Keine Labels verfügbar (Registry prüfen)"}</small>`:nothing}
        <label class="pref-check"><input type="checkbox" .checked=${this.onlyUnlabeled}
          @change=${()=>{this.onlyUnlabeled=!this.onlyUnlabeled;this.savePreferences();}}/><span>${this.getLanguage()==="de"?"Nur ohne Label":this.getLanguage()==="pt"?"Somente sem label":"Only without label"}</span></label>
      </div>
      <div class="pref-title">${this.getLanguage()==="de"?"Darstellung":"Aparência"}</div>
      <div class="pref-list"><label class="pref-check"><input type="checkbox" .checked=${this.showInlineBrightness}
        @change=${()=>{this.showInlineBrightness=!this.showInlineBrightness;this.savePreferences();}}/><span>${this.getLanguage()==="de"?"Helligkeit direkt in Lichtkarten":this.getLanguage()==="pt"?"Brilho direto nos cartões":"Brightness inside light cards"}</span></label></div>
      <div class="pref-list">
        <label class="pref-check"><input type="checkbox" .checked=${this.showTypeDescriptions}
          @change=${()=>{this.showTypeDescriptions=!this.showTypeDescriptions;this.savePreferences();}}/><span>Gerätetyp anzeigen</span></label>
        <label class="pref-check"><input type="checkbox" .checked=${this.showStatusDescriptions}
          @change=${()=>{this.showStatusDescriptions=!this.showStatusDescriptions;this.savePreferences();}}/><span>Status anzeigen</span></label>
      </div>
      <div class="pref-title">${this.getLanguage()==="de"?"Einzelne Lichter":"Luzes individuais"} · ${all.length}</div>
      <div class="pref-entities">${all.map(light=>{
        const id=light.entity_id;
        const override=this.hiddenEntities.includes(id)?"hide":this.shownEntities.includes(id)?"show":"auto";
        const isGroup=this.getGroupMembers(light).length>0;
        return html`<div class="pref-entity"><span class="pref-entity-name">${this.renderIcon(isGroup?"mdi:lightbulb-group-outline":"mdi:lightbulb-outline")}${this.getLightName(light)}<small>${isGroup?"Gruppe":""}</small></span>
          <select .value=${override} aria-label=${this.getLightName(light)} @change=${(ev:Event)=>{
            const next=(ev.target as HTMLSelectElement).value;
            this.hiddenEntities=this.hiddenEntities.filter(x=>x!==id);
            this.shownEntities=this.shownEntities.filter(x=>x!==id);
            if(next==="hide")this.hiddenEntities=[...this.hiddenEntities,id];
            if(next==="show")this.shownEntities=[...this.shownEntities,id];
            this.savePreferences();
          }}><option value="auto">Auto</option><option value="show">Anzeigen</option><option value="hide">Ausblenden</option></select></div>`;
      })}</div>
    </section>`;
  }

  private getLightName(light: HAEntity): string {
    const name = light.attributes.friendly_name;
    return typeof name === "string" && name.trim()
      ? name
      : light.entity_id.slice("light.".length).replace(/_/g, " ");
  }

  private async toggleLight(light: HAEntity): Promise<void> {
    if (!this.hass?.callService ||
        (light.state !== "on" && light.state !== "off")) return;
    try {
      await this.hass.callService(
        "light", light.state === "on" ? "turn_off" : "turn_on",
        { entity_id: light.entity_id }
      );
    } catch (error) {
      console.error(this.t("lightActionError"), error);
    }
  }

  private getLightRoom(light: HAEntity): string {
    const areaId = this.lightAreas[light.entity_id];
    return areaId && this.areaNames[areaId] ? this.areaNames[areaId] : this.t("unassigned");
  }

  private getBrightness(light: HAEntity): number {
    const raw = light.attributes.brightness;
    return typeof raw === "number" && Number.isFinite(raw)
      ? Math.round(raw / 255 * 100) : 100;
  }

  private supportsBrightness(light: HAEntity): boolean {
    const modes = light.attributes.supported_color_modes;
    return Array.isArray(modes) && modes.some(m=>m !== "onoff" && m !== "unknown")
      || (typeof light.attributes.supported_features === "number"
        && (light.attributes.supported_features & 1) !== 0);
  }

  private async setLightBrightness(light: HAEntity, value: number): Promise<void> {
    if (!this.hass?.callService) return;
    try {
      await this.hass.callService("light","turn_on",{
        entity_id:light.entity_id,brightness_pct:value
      });
    } catch(error) { console.error(this.t("lightActionError"),error); }
  }

  private supportsColor(light: HAEntity): boolean {
    const modes = light.attributes.supported_color_modes;
    return Array.isArray(modes) && modes.some(m => ["hs", "rgb", "rgbw", "rgbww", "xy"].includes(String(m)));
  }

  private supportsColorTemperature(light: HAEntity): boolean {
    const modes = light.attributes.supported_color_modes;
    return Array.isArray(modes) && modes.includes("color_temp");
  }

  private getColorHex(light: HAEntity): string {
    const rgb = light.attributes.rgb_color;
    if (Array.isArray(rgb) && rgb.length >= 3 && rgb.slice(0,3).every(x => typeof x === "number")) {
      return `#${rgb.slice(0,3).map(x => Math.max(0,Math.min(255,Math.round(x as number))).toString(16).padStart(2,"0")).join("")}`;
    }
    return "#b38be0";
  }

  private async setLightColor(light: HAEntity, hex: string): Promise<void> {
    if (!this.hass?.callService || !/^#[0-9a-f]{6}$/i.test(hex)) return;
    const rgb = [1,3,5].map(i => parseInt(hex.slice(i,i+2),16));
    try { await this.hass.callService("light","turn_on",{entity_id:light.entity_id,rgb_color:rgb}); }
    catch(error) { console.error(this.t("lightActionError"),error); }
  }

  private async setLightTemperature(light: HAEntity, kelvin: number): Promise<void> {
    if (!this.hass?.callService) return;
    try { await this.hass.callService("light","turn_on",{entity_id:light.entity_id,color_temp_kelvin:kelvin}); }
    catch(error) { console.error(this.t("lightActionError"),error); }
  }

  private async setAllLights(on: boolean, lights: HAEntity[]): Promise<void> {
    if (!this.hass?.callService) return;
    const ids = lights.filter(l=>l.state==="on" || l.state==="off").map(l=>l.entity_id);
    if (!ids.length) return;
    try {
      await this.hass.callService("light",on?"turn_on":"turn_off",{entity_id:ids});
    } catch(error) { console.error(this.t("lightActionError"),error); }
  }

  private renderPendant(on: boolean, brightness: number = 75) {
    return html`<svg class="pendant" viewBox="0 0 150 180" aria-hidden="true">
      <defs>
        <radialGradient id="cr-ambient-glow">
          <stop offset="0" stop-color="#ffcd82" stop-opacity=${on ? brightness / 115 : 0}/>
          <stop offset="1" stop-color="#ffcd82" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cr-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#62535c"/>
          <stop offset=".5" stop-color="#1b1920"/>
          <stop offset="1" stop-color="#49414b"/>
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="127" rx="74" ry="52" fill="url(#cr-ambient-glow)"/>
      <path d="M75 0V54" stroke="#716777" stroke-width="2"/>
      <rect x="69" y="51" width="12" height="12" rx="3" fill="#302a32"/>
      <path d="M69 60Q45 69 31 111Q75 127 119 111Q105 69 81 60Z"
        fill="url(#cr-metal)" stroke="#6c5a68"/>
      <ellipse cx="75" cy="111" rx="44" ry="8" fill=${on?"#ffd18b":"#403842"}/>
      <ellipse cx="75" cy="112" rx="26" ry="4" fill=${on?"#fff1ca":"#514650"}/>
    </svg>`;
  }

  private renderLightsCard() {
    const lights = this.getLights();
    const on = lights.filter(l=>l.state==="on").length;
    const available = lights.filter(l=>l.state==="on" || l.state==="off").length;
    const lit = lights.filter(l=>l.state==="on");
    const avg = lit.length ? lit.reduce((n,l)=>n+this.getBrightness(l),0)/lit.length : 0;
    const language = this.getLanguage();
    const mood = on === 0
      ? (language === "de" ? "Alles ruhig" : language === "pt" ? "Tudo tranquilo" : "Peaceful")
      : on === available
        ? (language === "de" ? "Alles erstrahlt" : language === "pt" ? "Tudo iluminado" : "All illuminated")
        : (language === "de" ? "Gemütlich" : language === "pt" ? "Aconchegante" : "Cozy ambience");
    const countLabel = language === "de"
      ? `${on} von ${available} Lichtern an`
      : language === "pt"
        ? `${on} de ${available} luzes acesas`
        : `${on} of ${available} lights on`;

    return html`
      <article class="overview-card lights-card premium-lights ${on?"has-light":""}">
        <div class="pendant-corner">${this.renderPendant(on>0,avg)}</div>
        <div class="premium-lights-content">
          <div class="card-icon">${this.renderIcon("mdi:lightbulb-on-outline")}</div>
          <div class="card-title">${this.t("lights")}</div>
          <div class="premium-mood">${mood}</div>
          <div class="premium-light-status">
            <span class="premium-status-dot ${on ? "lit" : ""}"></span>
            <span>${countLabel}</span>
          </div>
          <div class="premium-actions">
            <button type="button" class="glass-action" ?disabled=${!on || !this.hass?.callService}
              @click=${()=>this.setAllLights(false,lights)}>
              ${this.renderIcon("mdi:power")} ${this.t("allOff")}
            </button>
            <button type="button" class="glass-action" @click=${()=>this.navigate("lights")}>
              ${this.t("lighting")} ${this.renderIcon("mdi:arrow-right")}
            </button>
          </div>

        </div>
      </article>
    `;
  }

  private renderLightsPage() {
    const lights = this.getLights();
    const on = lights.filter(l=>l.state==="on").length;
    const available = lights.filter(l=>l.state==="on"||l.state==="off");
    const rooms = [...new Set(lights.map(l=>this.getLightRoom(l)))].sort((a,b)=>a.localeCompare(b,this.getLanguage()));
    const filtered = this.selectedRoom ? lights.filter(l=>this.getLightRoom(l)===this.selectedRoom) : lights;
    const avg = on ? lights.filter(l=>l.state==="on").reduce((n,l)=>n+this.getBrightness(l),0)/on : 0;
    return html`
      <section class="lighting-studio">
        <div class="studio-heading">
          <div class="studio-heading-left"><button class="studio-back" @click=${()=>this.navigate("home")} aria-label=${this.t("home")}>${this.renderIcon("mdi:arrow-left")}</button><div><div class="eyebrow">CONTROLROOM / SMART HOME</div>
            <h1>${this.t("lighting")}</h1></div></div>
          <button class="studio-settings" @click=${()=>this.visibilitySettingsOpen=!this.visibilitySettingsOpen} aria-label="Sichtbarkeit & Darstellung">${this.renderIcon("mdi:tune-variant")}</button>
          <span class="studio-total">${on} ${this.t("lightsOn")} · ${available.length-on} ${this.t("lightsOff")}</span>
        </div>
        ${this.visibilitySettingsOpen?this.renderLightingPreferences():nothing}
        <div class="studio-hero ${on?"lit":""}">
          <div class="studio-hero-info">
            <div class="studio-kicker">${this.getLanguage()==="de"?"LICHTSTIMMUNG":this.getLanguage()==="pt"?"ATMOSFERA DE LUZ":"LIGHT AMBIENCE"}</div>
            <div class="studio-mood">${on===0
              ? (this.getLanguage()==="de"?"Alles in Ruhe":this.getLanguage()==="pt"?"Tudo tranquilo":"Peaceful ambience")
              : on===available.length
                ? (this.getLanguage()==="de"?"Alles erstrahlt":this.getLanguage()==="pt"?"Tudo iluminado":"Beautifully illuminated")
                : (this.getLanguage()==="de"?"Gemütlich beleuchtet":this.getLanguage()==="pt"?"Iluminação aconchegante":"Warm and inviting")}</div>
            <div class="studio-mood-subtitle">${on===0
              ? (this.getLanguage()==="de"?"Dein Zuhause genießt eine kleine Lichtpause.":this.getLanguage()==="pt"?"Sua casa descansa em uma atmosfera tranquila.":"Your home is enjoying a peaceful moment.")
              : (this.getLanguage()==="de"?"Dein Zuhause leuchtet in deiner Stimmung.":this.getLanguage()==="pt"?"Sua casa iluminada do seu jeito.":"Your home, illuminated your way.")}</div>
            <div class="studio-progress" role="progressbar" aria-label=${this.getLanguage()==="de"?"Anteil eingeschalteter Lichter":this.getLanguage()==="pt"?"Proporção de luzes acesas":"Proportion of lights on"}
              aria-valuemin="0" aria-valuemax="100" aria-valuenow=${String(available.length?Math.round(on/available.length*100):0)}
              title=${`${on} / ${available.length} ${this.t("lightsOn")}`}>
              <span style=${`width:${available.length?on/available.length*100:0}%`}></span>
            </div>
            <div class="studio-actions">
              <button ?disabled=${!this.hass?.callService} @click=${()=>this.setAllLights(true,lights)}>${this.renderIcon("mdi:weather-sunny")}${this.t("allOn")}</button>
              <button ?disabled=${!this.hass?.callService} @click=${()=>this.setAllLights(false,lights)}>${this.renderIcon("mdi:weather-night")}${this.t("allOff")}</button>
            </div>
          </div>
          <div class="studio-pendant">${this.renderPendant(on>0,avg)}</div>
        </div>
        <div class="ambient-rooms">
          ${rooms.map(room=>{
            const roomLights=lights.filter(l=>this.getLightRoom(l)===room);
            const roomOn=roomLights.filter(l=>l.state==="on").length;
            return html`<button type="button" class="ambient-room ${roomOn?"illuminated":""}"
              @click=${()=>{this.selectedRoom=room;this.openLightColorId="";this.lightsTab="lights";}}>
              <span class="ambient-room-glow"></span>
              <span class="ambient-room-icon">${this.renderIcon("mdi:home-lightbulb-outline")}</span>
              <span class="ambient-room-name">${room}</span>
              <span class="ambient-room-count">${roomOn} / ${roomLights.length}</span>
            </button>`;
          })}
        </div>
        <div class="studio-tabs">
          <button class=${this.lightsTab==="lights"?"active":""} @click=${()=>this.lightsTab="lights"}>${this.t("lights")}</button>
          <button class=${this.lightsTab==="groups"?"active":""} @click=${()=>this.lightsTab="groups"}>${this.t("groups")}</button>
        </div>
        ${this.lightsTab==="groups" ? html`
          <div class="studio-empty">${this.renderIcon("mdi:lightbulb-group-outline")} ${this.t("groupsLater")}</div>
        ` : html`
          <div class="room-filters">
            <button class=${!this.selectedRoom?"active":""} @click=${()=>this.selectedRoom=""}>${this.t("allRooms")}</button>
            ${rooms.map(room=>html`<button class=${this.selectedRoom===room?"active":""}
              @click=${()=>{this.selectedRoom=room;this.openLightColorId="";}}>${room}</button>`)}
          </div>
          <div class="studio-grid">
            ${filtered.map(light=>{
              const active=light.state==="on";
              const available=active||light.state==="off";
              const brightnessEnabled=active && this.supportsBrightness(light) && this.showInlineBrightness;
              const hasColor=this.supportsColor(light)||this.supportsColorTemperature(light);
              const colorOpen=active && this.openLightColorId===light.entity_id;
              const minK=typeof light.attributes.min_color_temp_kelvin==="number"?light.attributes.min_color_temp_kelvin:2000;
              const maxK=typeof light.attributes.max_color_temp_kelvin==="number"?light.attributes.max_color_temp_kelvin:6500;
              return html`<article class="studio-light ${active?"active":""} ${brightnessEnabled?"with-brightness":""}">
                <div class="studio-light-top">
                  <span class="studio-light-icon">${this.renderIcon(active?"mdi:lightbulb-on":"mdi:lightbulb-outline")}</span>
                  <span class="studio-light-name" title=${this.getLightName(light)}>${this.getLightName(light)}</span>
                  <button type="button" class="studio-toggle ${active?"on":""}"
                    ?disabled=${!available||!this.hass?.callService}
                    aria-label=${`${this.t("toggleLight")}: ${this.getLightName(light)}`}
                    aria-pressed=${active?"true":"false"} @click=${()=>{if(active && this.openLightColorId===light.entity_id)this.openLightColorId="";void this.toggleLight(light);}}>
                    ${this.renderIcon(active?"mdi:check-circle":"mdi:circle-outline")}
                  </button>
                </div>
                ${this.showStatusDescriptions?html`<span class="studio-light-state-inline">${available?this.t(active?"lightsOn":"lightsOff"):this.t("lightUnavailable")}</span>`:nothing}
                ${this.showTypeDescriptions?html`<span class="studio-light-room">${this.getGroupMembers(light).length?`Gruppe · ${this.getGroupMembers(light).length} Lampen`:"Einzellicht"}</span>`:nothing}
                ${brightnessEnabled?html`
                  <div class="studio-inline-brightness">
                    <input class="studio-inline-slider" type="range" min="1" max="100"
                      .value=${String(this.getBrightness(light))}
                      style=${`--light-level:${this.getBrightness(light)}%`}
                      aria-label=${`${this.t("brightness")}: ${this.getLightName(light)}`}
                      ?disabled=${!this.hass?.callService}
                      @change=${(e:Event)=>this.setLightBrightness(light,Number((e.target as HTMLInputElement).value))}/>
                    <span class="studio-inline-value">${this.getBrightness(light)}%</span>
                    ${hasColor?html`<button type="button" class="studio-color-trigger ${colorOpen?"open":""}"
                      title=${this.getLanguage()==="de"?"Lichtfarbe":"Cor da luz"}
                      aria-label=${this.getLanguage()==="de"?"Lichtfarbe":"Cor da luz"}
                      aria-expanded=${colorOpen?"true":"false"}
                      @click=${()=>this.openLightColorId=colorOpen?"":light.entity_id}>
                      ${this.renderIcon("mdi:palette-outline")}</button>`:nothing}
                  </div>
                `:active && hasColor?html`<button class="studio-color-trigger studio-color-alone" @click=${()=>this.openLightColorId=colorOpen?"":light.entity_id}>${this.renderIcon("mdi:palette-outline")}</button>`:nothing}
                ${colorOpen?html`<div class="studio-inline-colors">
                  ${this.supportsColor(light)?html`<div class="studio-inline-color-line">
                    <span>${this.getLanguage()==="de"?"Farbe":"Cor"}</span>
                    <input type="color" class="studio-color-picker" .value=${this.getColorHex(light)}
                      aria-label=${this.getLanguage()==="de"?"Lichtfarbe":"Cor da luz"}
                      @change=${(e:Event)=>this.setLightColor(light,(e.target as HTMLInputElement).value)}/>
                  </div>`:nothing}
                  ${this.supportsColorTemperature(light)?html`<div class="studio-inline-color-line">
                    <span>${this.getLanguage()==="de"?"Weißtemperatur":"Temperatura"}</span>
                    <input type="range" class="studio-inline-slider" min=${String(minK)} max=${String(maxK)}
                      .value=${String(typeof light.attributes.color_temp_kelvin==="number"?light.attributes.color_temp_kelvin:4000)}
                      aria-label=${this.getLanguage()==="de"?"Weißtemperatur":"Temperatura"}
                      @change=${(e:Event)=>this.setLightTemperature(light,Number((e.target as HTMLInputElement).value))}/>
                  </div>`:nothing}
                </div>`:nothing}
              </article>`;
            })}
          </div>
          ${!filtered.length?html`<div class="studio-empty">${this.t("noLights")}</div>`:nothing}
        `}
      </section>
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
      { key: "climate", icon: "mdi:thermostat" },
      { key: "security", icon: "mdi:shield-check-outline" }
    ];

    const currentPerson = this.welcomeMode === "shared" ? undefined : this.getCurrentPerson();
    const otherPeople = this.getPeople().filter(person => !currentPerson || person.entity_id !== currentPerson.entity_id);
    const greetingName = currentPerson ? this.getPersonName(currentPerson) : this.hass?.user?.name || "";
    return html`
      <section class="hero">
        ${this.welcomeShowEyebrow ? html`<div class="eyebrow">${this.welcomeEyebrow || this.t("homeLabel")}</div>` : nothing}
        <div class="hero-content">
          <div class="hero-message">
            ${this.welcomeShowGreeting ? html`<div class="welcome-title">
              ${currentPerson ? this.renderPersonAvatar(currentPerson, true) : nothing}
              <h1>${this.getGreeting()}${this.welcomeMode === "shared" ? "." : greetingName ? `, ${greetingName}` : "."}</h1>
            </div>` : nothing}
            ${this.welcomeShowSubtitle ? html`<p>${this.welcomeSubtitle || this.t("subtitle")}</p>` : nothing}
          </div>
          ${this.renderPeoplePills(otherPeople)}
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
        ${this.renderLightsCard()}
      </section>
    `;
  }

  private renderPage() {
    if (this.activePage === "home") return this.renderHome();
    if (this.activePage === "lights") return this.renderLightsPage();
    if (this.activePage === "settings") return this.renderWelcomeSettings();

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


    .lights-card { gap: 13px; order: 3; }
    .premium-lights { position: relative; min-height: 190px; overflow: hidden; }
    .premium-lights.has-light { border-color: rgba(215,165,104,.32); }
    .premium-lights-content { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; height:100%; }
    .premium-lights .card-icon { color:#f1bf77; }
    .pendant-corner { position:absolute; right:-6px; top:-20px; width:135px; pointer-events:none; }
    .pendant { display:block; width:100%; height:auto; }
    .premium-count { font-size:13px; color:#c9bed1; }
    .premium-count strong { font-size:28px; color:#fff; }
    .premium-count span { color:#a99caf; }
    /* Home overview: atmosphere first, subtle live light count below. */
    .premium-mood { font-size:clamp(17px,1.6vw,21px);font-weight:750;letter-spacing:-.045em;line-height:1.12;color:#fff3f8;max-width:calc(100% - 48px);text-shadow:0 1px 16px rgba(0,0,0,.18); }
    .premium-light-status { display:flex;align-items:center;gap:7px;min-width:0;font-size:10px;line-height:1.3;color:#b9adc5;white-space:nowrap; }
    .premium-status-dot { flex:none;width:6px;height:6px;border-radius:50%;background:#81748b; }
    .premium-status-dot.lit { background:#f3c384;box-shadow:0 0 10px rgba(245,193,118,.55); }
    .premium-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; }
    .glass-action { display:flex; align-items:center; justify-content:center; gap:6px; padding:9px 11px; color:#eee2f5; background:rgba(145,109,174,.25); border:1px solid rgba(211,173,239,.2); border-radius:999px; cursor:pointer; font-size:11px; }
    .glass-action:disabled { opacity:.45; cursor:not-allowed; }
    .glass-action ha-icon { --mdc-icon-size:16px; }
    .premium-rooms { display:flex; flex-wrap:wrap; gap:5px; }
    .room-chip { display:flex; align-items:center; gap:4px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.05); padding:5px 8px; border-radius:999px; font-size:10px; color:#d5c9dd; }
    .room-chip ha-icon { --mdc-icon-size:13px; color:#e6b877; }
    .lighting-studio { max-width:1100px; margin:auto; }
    .studio-heading { display:flex; justify-content:space-between; align-items:center; gap:15px; margin-bottom:20px; }
    .studio-heading-left {display:flex;align-items:center;gap:12px;min-width:0;flex:1}
    .studio-back,.studio-settings {display:grid;place-items:center;width:38px;height:38px;flex:none;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.05);color:#eee2f5;cursor:pointer}
    .studio-back:hover,.studio-settings:hover {background:rgba(169,127,204,.2)}
    .lighting-preferences {margin:0 0 17px;padding:18px;border:1px solid rgba(198,160,224,.22);border-radius:20px;background:linear-gradient(130deg,#292137,#1d1b28)}
    .preferences-header {display:flex;justify-content:space-between;align-items:center;gap:10px}
    .preferences-header button {border:0;background:transparent;color:#cfc0dd;cursor:pointer}
    .pref-title {margin:18px 0 9px;color:#bba9cc;font-size:12px;font-weight:650}
    .pref-modes {display:flex;gap:7px;flex-wrap:wrap}
    .pref-modes button {padding:8px 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.04);color:#d7cbe0;cursor:pointer;font-size:12px}
    .pref-modes button.active {background:rgba(171,128,207,.3);border-color:rgba(211,174,237,.45);color:#fff}
    .pref-list {display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:7px}
    .pref-check {display:flex;align-items:center;gap:9px;min-width:0;padding:9px 11px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025);font-size:12px;color:#e7deee;cursor:pointer}
    .pref-check input {accent-color:#ad83cb}
    .pref-label-name {min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .pref-check input {flex:none} .pref-check .pref-hint {flex:none;white-space:nowrap;margin-left:auto}
    .pref-hint {color:#a899b5;font-size:10px}
    .pref-entities {display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:7px;max-height:270px;overflow-y:auto}
    .pref-entity {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 10px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025)}
    .pref-entity-name {display:flex;align-items:center;gap:8px;min-width:0;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .pref-entity-name ha-icon {--mdc-icon-size:17px;color:#c5a7da;flex:none}
    .pref-entity-name small {color:#92849e;font-size:10px}
    .pref-entity select {max-width:105px;padding:6px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:#30283c;color:#f5eef9;font-size:11px}
    
    .studio-heading h1 { margin:7px 0 0; }
    .studio-total { font-size:12px; color:#b5a8c1; }
    .studio-hero { position:relative; display:flex; min-height:220px; overflow:hidden; padding:26px 28px; border:1px solid rgba(199,164,225,.2); border-radius:22px; background:linear-gradient(110deg,#30223d,#1b1928); }
    .studio-hero.lit { background:radial-gradient(ellipse at 88% 85%,rgba(223,158,78,.22),transparent 48%),linear-gradient(110deg,#30223d,#1b1928); }
    .studio-hero-info { position:relative; z-index:1; width:min(70%,540px); }
    .studio-kicker { font-size:11px; font-weight:700; letter-spacing:.15em; color:#c4b1d0; }
    .studio-mood { margin:13px 0 4px; font-size:clamp(23px,2.6vw,34px); font-weight:750; letter-spacing:-.045em; color:#fff5fa; line-height:1.15; }
    .studio-mood-subtitle { color:#c5b5cc; font-size:12px; line-height:1.5; }
    .studio-hero.lit .studio-mood { text-shadow:0 0 28px rgba(247,194,120,.15); }
    .studio-number { margin:9px 0 13px; font-size:14px; }
    .studio-number strong { font-size:28px; }
    .studio-progress { height:7px; margin-top:20px; background:rgba(205,177,221,.2); border:1px solid rgba(255,255,255,.07); border-radius:999px; overflow:hidden; cursor:help; }
    .studio-progress span { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,#b58bd7,#e4b6f1); box-shadow:0 0 15px rgba(210,163,237,.3); transition:width .55s ease; }
    .studio-actions { display:flex; gap:10px; margin-top:19px; }
    .studio-actions button { display:flex; align-items:center; justify-content:center; gap:9px; flex:1; padding:12px; border:1px solid rgba(255,255,255,.17); border-radius:999px; background:rgba(255,255,255,.035); color:#f1eaf6; cursor:pointer; }
    .studio-actions button:disabled { opacity:.4; }
    .studio-actions ha-icon { --mdc-icon-size:16px; }
    .studio-pendant { position:absolute; right:30px; top:-21px; width:195px; pointer-events:none; }
    .ambient-rooms { display:grid; grid-template-columns:repeat(auto-fit,minmax(135px,1fr)); gap:10px; margin-top:14px; }
    .ambient-room { position:relative; display:flex; flex-direction:column; align-items:flex-start; gap:7px; min-height:105px; padding:14px; overflow:hidden; border-radius:16px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.035); color:#c9bfd3; text-align:left; cursor:pointer; }
    .ambient-room.illuminated { border-color:rgba(231,178,109,.35); }
    .ambient-room-glow { position:absolute; inset:0; pointer-events:none; opacity:0; background:radial-gradient(ellipse at 80% 90%,rgba(247,184,96,.35),transparent 72%); transition:opacity 450ms ease; }
    .ambient-room.illuminated .ambient-room-glow { opacity:1; }
    .ambient-room-icon,.ambient-room-name,.ambient-room-count { position:relative; z-index:1; }
    .ambient-room-icon { color:#9c8bac; }
    .ambient-room.illuminated .ambient-room-icon { color:#f4c786; }
    .ambient-room-name { font-size:12px; font-weight:650; }
    .ambient-room-count { color:#aa9cb6; font-size:11px; }
    @media (prefers-reduced-motion:reduce) { .ambient-room-glow { transition:none; } }
    .studio-tabs { display:grid; grid-template-columns:1fr 1fr; margin:18px 0 12px; padding:4px; border-radius:999px; background:rgba(255,255,255,.035); }
    .studio-tabs button { border:0; padding:9px; border-radius:999px; color:#c7bacf; background:transparent; cursor:pointer; }
    .studio-tabs button.active { background:rgba(194,159,221,.2); color:#fff; }
    .room-filters { display:flex; gap:7px; overflow-x:auto; padding-bottom:12px; }
    .room-filters button { white-space:nowrap; padding:7px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.16); background:transparent; color:#c6b9d1; cursor:pointer; }
    .room-filters button.active { background:#e6dbe9; color:#251e2c; }
    .studio-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .studio-light { position:relative; min-height:100px; padding:12px; border-radius:18px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.045); }
    .studio-light.selected { border-color:rgba(203,156,236,.65); background:rgba(158,112,189,.14); }
    .studio-light.active { box-shadow:inset 0 0 32px rgba(244,190,105,.045); }
    .studio-light-select { display:flex; flex-direction:column; align-items:flex-start; width:100%; height:100%; border:0; background:transparent; color:inherit; cursor:pointer; text-align:left; }
    .studio-light-icon { display:grid; place-items:center; width:30px; height:30px; border-radius:11px; color:#a89db5; background:rgba(255,255,255,.06); }
    .studio-light.active .studio-light-icon { color:#f2c887; background:rgba(232,179,96,.16); }
    .studio-light-state { position:absolute; right:14px; top:16px; color:#a99db5; font-size:10px; }
    .studio-light.active .studio-light-state { color:#87d5ad; }
    .studio-light-name { margin-top:8px; font-size:14px; font-weight:650; }
    .studio-light-room { margin-top:4px; color:#a99eb6; font-size:11px; }
    .studio-light-level { margin-top:5px; color:#bca8ca; font-size:11px; }
    .studio-toggle { position:absolute; right:12px; bottom:12px; padding:4px; border:0; background:transparent; color:#756b80; cursor:pointer; }
    .studio-toggle.on { color:#d6b3ed; }
    .studio-toggle ha-icon { --mdc-icon-size:23px; }
    .studio-detail { position:relative; margin-top:15px; padding:22px; border-radius:20px; border:1px solid rgba(191,149,220,.25); background:rgba(146,108,178,.1); }
    .studio-detail-head h2 { margin:6px 0; font-size:20px; }
    .studio-detail-head span { font-size:12px; color:#b7a8c5; }
    .studio-detail .studio-toggle { top:20px; bottom:auto; }
    .studio-color-row {display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.035)}
    .studio-color-row strong {display:block;font-size:12px;font-weight:600}
    .studio-color-row small {display:block;margin-top:4px;color:#a99eb6;font-size:11px}
    .studio-color-picker {width:45px;height:37px;padding:3px;border:1px solid rgba(255,255,255,.2);border-radius:11px;background:rgba(255,255,255,.06);cursor:pointer}
    .studio-temp-range {display:flex;align-items:center;gap:12px;color:#d5b3e9}
    .studio-temp-range ha-icon {--mdc-icon-size:18px}
    .studio-temp-range input {flex:1;min-width:0}
    .brightness-label { display:flex; justify-content:space-between; margin-top:22px; margin-bottom:12px; font-size:13px; }
    .brightness-slider { width:100%; accent-color:#c7a2e4; cursor:pointer; }
    .studio-empty { display:flex; align-items:center; gap:12px; padding:25px; color:#b7a8c5; border:1px solid rgba(255,255,255,.08); border-radius:18px; }
    @media (max-width:600px) {
      .studio-grid { grid-template-columns:1fr; }
      .studio-hero-info { width:80%; }
      .studio-pendant { right:-40px; opacity:.6; }
      .studio-heading { align-items:start; flex-direction:column; }
    }

    .overview-card:nth-child(3) { order: 4; }
    .overview-card:nth-child(4) { order: 5; }
    .lights-card-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .lights-summary { display: flex; align-items: baseline; gap: 5px; color: #bdb4cb; font-size: 11px; white-space: nowrap; }
    .lights-count { font-size: 20px; color: #f4e5ff; font-weight: 750; }
    .lights-summary-separator { color: #766780; }
    .light-list { display: flex; flex-direction: column; gap: 7px; max-height: 245px; overflow-y: auto; padding-right: 2px; }
    .light-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 10px; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; background: rgba(255,255,255,.035); color: #c6bfce; text-align: left; cursor: pointer; transition: background 160ms, border-color 160ms; }
    .light-row:hover:not(:disabled) { background: rgba(174,129,207,.12); border-color: rgba(190,150,220,.3); }
    .light-row:focus-visible { outline: 2px solid #d3b3f1; outline-offset: 2px; }
    .light-row:disabled { opacity: .48; cursor: not-allowed; }
    .light-row.is-on { background: rgba(161,117,193,.12); border-color: rgba(194,153,222,.18); }
    .light-row-icon { display: flex; color: #9c8cab; }
    .light-row.is-on .light-row-icon { color: #e2b8ff; }
    .light-row-icon ha-icon { --mdc-icon-size: 20px; }
    .light-row-name { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
    .light-row-status { font-size: 10px; color: #aaa1b6; }
    .light-row-switch { display: flex; align-items: center; flex: 0 0 31px; height: 18px; padding: 2px; border-radius: 999px; background: #494253; }
    .light-row-switch span { width: 14px; height: 14px; border-radius: 50%; background: #d6d0dd; transition: transform 160ms; }
    .light-row-switch.on { background: #9872b6; }
    .light-row-switch.on span { transform: translateX(13px); background: #fff; }

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

    /* Premium Compact V3: inline light controls, no duplicated detail panel */
    .studio-grid { gap:12px; align-items:start; }
    .studio-light { min-height:66px; padding:15px 16px; border-radius:17px; transition:border-color 180ms,background 180ms; }
    .studio-light.active { border-color:rgba(205,163,235,.28); background:rgba(159,112,192,.09); }
    .studio-light-top { display:flex;align-items:center;gap:12px;min-height:36px; }
    .studio-light-icon { width:36px;height:36px;flex:none; }
    .studio-light-name { margin:0;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px; }
    .studio-light .studio-toggle { position:static;flex:none;display:grid;place-items:center;padding:3px; }
    .studio-light-state-inline,.studio-light-room { display:block;margin:5px 0 0 48px;color:#a99eb6;font-size:11px; }
    .studio-inline-brightness { display:flex;align-items:center;gap:11px;margin:12px 0 0 48px;min-width:0; }
    .studio-inline-slider { flex:1;min-width:0;width:100%;height:4px;margin:0;accent-color:#c8a0e6;cursor:pointer; }
    .studio-inline-value { min-width:38px;text-align:right;font-size:12px;color:#c8b6d7;font-variant-numeric:tabular-nums; }
    .studio-color-trigger { display:grid;place-items:center;flex:none;width:26px;height:26px;padding:2px;border:1px solid rgba(215,175,239,.2);border-radius:9px;background:rgba(255,255,255,.045);color:#bda0d2;cursor:pointer; }
    .studio-color-trigger ha-icon { --mdc-icon-size:17px; }
    .studio-color-trigger.open { background:rgba(171,122,206,.25);border-color:rgba(215,175,239,.45); }
    .studio-color-alone { margin:9px 0 0 48px; }
    .studio-inline-colors { margin:12px 0 0 48px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08);display:grid;gap:9px; }
    .studio-inline-color-line { display:flex;align-items:center;justify-content:space-between;gap:12px;color:#bfaed0;font-size:11px; }
    .studio-inline-color-line .studio-inline-slider { max-width:65%; }
    .studio-inline-color-line .studio-color-picker { width:35px;height:29px; }
    @media (max-width:600px) { .studio-grid { grid-template-columns:1fr; } .studio-hero { padding:22px 18px; } .studio-hero-info { width:80%; } .studio-mood { font-size:23px; } .studio-mood-subtitle { max-width:220px; } .studio-pendant { right:-38px; opacity:.65; } }

    @media (prefers-reduced-motion: reduce) {
      .weather-icon { animation: none; }
    }
    /* Compact information bar and personalized greeting */
    .smart-bar {display:flex;align-items:center;gap:14px;min-height:62px;padding:8px 15px;border:1px solid rgba(215,175,239,.13);border-radius:18px;background:rgba(152,113,193,.095);backdrop-filter:blur(18px)}
    .smart-bar .weather {min-width:0;min-height:0;padding:0;border:0;background:none;gap:8px;backdrop-filter:none}
    .smart-bar .weather-icon ha-icon {--mdc-icon-size:27px}
    .smart-bar .weather-temp,.smart-segment strong {font-size:15px;font-weight:700;white-space:nowrap}
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:10px;color:#aaa0b9;white-space:nowrap;margin-top:2px}
    .smart-divider {width:1px;height:32px;flex:none;background:rgba(213,178,236,.19)}
    .smart-segment {display:flex;align-items:center;gap:9px;min-width:0}
    .smart-segment>ha-icon {--mdc-icon-size:21px;color:#c6a5dd;flex:none}
    .smart-segment>div {min-width:0}
    .smart-waste strong {display:block;max-width:125px;overflow:hidden;text-overflow:ellipsis}
    .welcome-title {display:flex;align-items:center;gap:14px}
    .welcome-title h1 {margin:12px 0 10px}
    .pill-avatar.avatar-large {flex:0 0 49px;width:49px;height:49px;border:1px solid rgba(223,190,245,.4)}
    .welcome-settings {max-width:680px;padding:25px;border:1px solid rgba(213,174,239,.17);border-radius:22px;background:rgba(255,255,255,.035)}
    .welcome-settings h2 {margin:12px 0;font-size:24px}
    .welcome-settings p {color:#aaa0b9;font-size:12px;margin-bottom:24px}
    .welcome-setting-row {display:flex;justify-content:space-between;align-items:center;gap:20px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13px}
    .welcome-setting-row select,.welcome-setting-text input {padding:10px;border:1px solid rgba(211,174,239,.2);border-radius:10px;background:#30263c;color:#fff;max-width:100%}
    .welcome-setting-row input {accent-color:#b58bd7}
    .welcome-setting-text {display:flex;flex-direction:column;gap:8px;margin-top:17px;color:#c8b7d6;font-size:12px}
    @media(max-width:1100px){.topbar{align-items:flex-start;flex-wrap:wrap}.topbar-right{margin-left:auto}.smart-bar{gap:10px}}
    @media(max-width:650px){.smart-bar{gap:8px;padding:8px}.smart-waste{display:none}.smart-bar .smart-divider:last-of-type{display:none}.smart-bar .weather-condition{display:none}.hero-content{align-items:flex-start}.welcome-title h1{font-size:clamp(24px,6vw,36px)}}

  `;

  protected render() {
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

            <div class="topbar-right">${this.renderSmartBar()}
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
