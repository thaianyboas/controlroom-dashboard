

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
  callWS?: (message: {type: string; [key: string]: unknown}) => Promise<unknown>;
  callService?: (domain: string, service: string, data?: Record<string, unknown>, target?: Record<string, unknown>, returnResponse?: boolean) => Promise<unknown>;
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
    navigation: "Bereiche",
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

  @state() private settingsSection: "overview" | "welcome" | "smartbar" | "appearance" | "devices" | "system" | "rooms" | "themes" = "overview";
  @state() private settingsSearch = "";

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
  @state() private allEntityAreas: Record<string, string> = {};
  @state() private roomDetail = "";
  @state() private roomImages: Record<string,string> = {};
  @state() private roomImageEditor = false;
  @state() private roomStyle: "3d" | "photos" | "custom" = "photos";
  @state() private roomAutoSwitch = false;
  @state() private roomStyleByArea: Record<string,string> = {};
  @state() private roomPhotoUrls: Record<string,string> = {};
  @state() private roomStyleEditor = false;
  private roomStyleSnapshot = "";
  @state() private roomImageDraft = "";
  @state() private crTheme = "purple";
  @state() private crThemeStyle: "glass" | "solid" | "minimal" = "glass";
  @state() private crThemeSource: "controlroom" | "ha" = "controlroom";
  @state() private crHATheme = "";
  @state() private crThemeSearch = "";
  @state() private crThemeFilter = "all";
  @state() private crThemePage = 0;
  @state() private crHAMode: "auto" | "light" | "dark" = "auto";
  private crThemeSnapshot = "";

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
  @state() private smartShowWeather = true;
  @state() private smartShowClock = true;
  @state() private smartShowWaste = true;
  @state() private weatherSource: "auto" | "weather" | "sensor" = "auto";
  @state() private weatherEntity = "";
  @state() private weatherTempEntity = "";
  @state() private weatherConditionEntity = "";
  @state() private clockSource: "local" | "sensor" = "local";
  @state() private clockEntity = "";
  @state() private clockTimezone = "";
  @state() private smartExpanded: "weather" | "clock" | "waste" = "weather";
  @state() private wasteSource: "auto" | "calendar" | "sensor" = "auto";
  @state() private wasteEntity = "";
  @state() private wasteLabel = "";
  @state() private wasteIcon = "mdi:trash-can-outline";
  @state() private wasteDateMode: "relative" | "date" | "both" = "relative";
  @state() private wasteSwitchTime = "12:00";
  @state() private wasteCalendarEvents: Array<{summary:string; date:string}> = [];
  private wasteLoadedCalendar = "";
  private wasteLastFetch = 0;
  private wasteFetching = false;
  private clockInterval?: ReturnType<typeof setInterval>;

  // Changes in the settings editor are drafts until explicitly saved.
  @state() private settingsDirty = false;
  @state() private settingsSavedNotice = false;
  private smartDraftSnapshot = "";
  private welcomeDraftSnapshot = "";

  private smartSettingsData() {
    return {
      weather: this.smartShowWeather, clock: this.smartShowClock, waste: this.smartShowWaste,
      weatherSource:this.weatherSource,weatherEntity:this.weatherEntity,weatherTempEntity:this.weatherTempEntity,
      weatherConditionEntity:this.weatherConditionEntity,clockSource:this.clockSource,clockEntity:this.clockEntity,clockTimezone:this.clockTimezone,
      source:this.wasteSource,entity:this.wasteEntity,label:this.wasteLabel,
      icon:this.wasteIcon,dateMode:this.wasteDateMode,switchTime:this.wasteSwitchTime
    };
  }

  private welcomeSettingsData() {
    return {mode:this.welcomeMode,eyebrow:this.welcomeEyebrow,subtitle:this.welcomeSubtitle,
      showEyebrow:this.welcomeShowEyebrow,showSubtitle:this.welcomeShowSubtitle,
      showPeople:this.welcomeShowPeople,showGreeting:this.welcomeShowGreeting};
  }

  private beginSettingsEdit(section: "welcome" | "smartbar"): void {
    this.settingsSection = section;
    this.smartDraftSnapshot = JSON.stringify(this.smartSettingsData());
    this.welcomeDraftSnapshot = JSON.stringify(this.welcomeSettingsData());
    this.settingsDirty = false;
    this.settingsSavedNotice = false;
  }

  private markSettingsDirty(): void {
    this.settingsDirty = this.settingsSection === "smartbar"
      ? JSON.stringify(this.smartSettingsData()) !== this.smartDraftSnapshot
      : JSON.stringify(this.welcomeSettingsData()) !== this.welcomeDraftSnapshot;
    this.settingsSavedNotice = false;
  }

  private cancelSettingsEdit(): void {
    const section = this.settingsSection;
    if (section === "smartbar" && this.smartDraftSnapshot) {
      const d = JSON.parse(this.smartDraftSnapshot);
      this.smartShowWeather=d.weather; this.smartShowClock=d.clock; this.smartShowWaste=d.waste;
      this.weatherSource=d.weatherSource; this.weatherEntity=d.weatherEntity;
      this.weatherTempEntity=d.weatherTempEntity; this.weatherConditionEntity=d.weatherConditionEntity;
      this.clockSource=d.clockSource; this.clockEntity=d.clockEntity; this.clockTimezone=d.clockTimezone;
      this.wasteSource=d.source; this.wasteEntity=d.entity; this.wasteLabel=d.label;
      this.wasteIcon=d.icon; this.wasteDateMode=d.dateMode; this.wasteSwitchTime=d.switchTime;
    }
    if (section === "welcome" && this.welcomeDraftSnapshot) {
      const d = JSON.parse(this.welcomeDraftSnapshot);
      this.welcomeMode=d.mode; this.welcomeEyebrow=d.eyebrow; this.welcomeSubtitle=d.subtitle;
      this.welcomeShowEyebrow=d.showEyebrow; this.welcomeShowSubtitle=d.showSubtitle;
      this.welcomeShowPeople=d.showPeople; this.welcomeShowGreeting=d.showGreeting;
    }
    this.settingsDirty = false;
    this.settingsSavedNotice = false;
    this.settingsSection = "overview";
  }

  private commitSettingsEdit(): void {
    if (this.settingsSection === "smartbar") {
      this.saveSmartSettings();
      this.smartDraftSnapshot = JSON.stringify(this.smartSettingsData());
    } else if (this.settingsSection === "welcome") {
      this.saveWelcome();
      this.welcomeDraftSnapshot = JSON.stringify(this.welcomeSettingsData());
    }
    this.settingsDirty = false;
    this.settingsSavedNotice = true;
  }

  private restoreSmartSettings(): void {
    try {
      const data = JSON.parse(localStorage.getItem("controlroom-smartbar-v1") || "{}");
      if (["auto", "weather", "sensor"].includes(data.weatherSource)) this.weatherSource = data.weatherSource;
      if (typeof data.weatherEntity === "string") this.weatherEntity = data.weatherEntity;
      if (typeof data.weatherTempEntity === "string") this.weatherTempEntity = data.weatherTempEntity;
      if (typeof data.weatherConditionEntity === "string") this.weatherConditionEntity = data.weatherConditionEntity;
      if (["local", "sensor"].includes(data.clockSource)) this.clockSource = data.clockSource;
      if (typeof data.clockEntity === "string") this.clockEntity = data.clockEntity;
      if (typeof data.clockTimezone === "string") this.clockTimezone = data.clockTimezone;
      if (typeof data.weather === "boolean") this.smartShowWeather = data.weather;
      if (typeof data.clock === "boolean") this.smartShowClock = data.clock;
      if (typeof data.waste === "boolean") this.smartShowWaste = data.waste;
      if (["auto", "calendar", "sensor"].includes(data.source)) this.wasteSource = data.source;
      if (typeof data.entity === "string") this.wasteEntity = data.entity;
      if (typeof data.label === "string") this.wasteLabel = data.label;
      if (typeof data.icon === "string") this.wasteIcon = data.icon;
      if (["relative", "date", "both"].includes(data.dateMode)) this.wasteDateMode = data.dateMode;
      if (typeof data.switchTime === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(data.switchTime)) this.wasteSwitchTime = data.switchTime;
    } catch (error) { console.warn("ControlRoom: smart bar preferences unavailable", error); }
  }

  private saveSmartSettings(): void {
    try { localStorage.setItem("controlroom-smartbar-v1", JSON.stringify({
      weather: this.smartShowWeather, clock: this.smartShowClock, waste: this.smartShowWaste,
      weatherSource:this.weatherSource,weatherEntity:this.weatherEntity,weatherTempEntity:this.weatherTempEntity,
      weatherConditionEntity:this.weatherConditionEntity,clockSource:this.clockSource,clockEntity:this.clockEntity,clockTimezone:this.clockTimezone,
      source: this.wasteSource, entity: this.wasteEntity, label: this.wasteLabel,
      icon: this.wasteIcon, dateMode: this.wasteDateMode, switchTime:this.wasteSwitchTime
    })); } catch (error) { console.warn("ControlRoom: smart bar preferences could not be saved", error); }
  }

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
    void this.refreshWasteEvents();
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
      this.allEntityAreas = Object.fromEntries(entities.map(e=>[e.entity_id,e.area_id || (e.device_id ? deviceArea.get(e.device_id) : "") || ""]));
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
    try {const v=JSON.parse(localStorage.getItem("controlroom-theme-v1")||"{}");this.crTheme=v.theme||"purple";this.crThemeStyle=v.style||"glass";this.crThemeSource="controlroom";this.crHATheme=v.haTheme||"";this.crHAMode=v.haMode||"auto";}catch(error){console.warn(error);}
    try { this.roomImages = JSON.parse(localStorage.getItem("controlroom-room-images-v1") || "{}"); } catch { this.roomImages = {}; }
    try {const v=JSON.parse(localStorage.getItem("controlroom-room-style-v1")||"{}");if(["3d","photos","custom"].includes(v.style))this.roomStyle=v.style;if(typeof v.auto==="boolean")this.roomAutoSwitch=v.auto;if(v.byArea&&typeof v.byArea==="object")this.roomStyleByArea=v.byArea;if(v.photos&&typeof v.photos==="object")this.roomPhotoUrls=v.photos;if(v.images&&typeof v.images==="object")this.roomImages={...this.roomImages,...v.images};}catch(error){console.warn(error);}
    this.restoreWelcome();
    this.restoreSmartSettings();
    this.currentTime = new Date();
    this.clockInterval = setInterval(() => {
      this.currentTime = new Date();
      void this.refreshWasteEvents();
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
    const states = this.hass?.states ?? {};
    if (this.weatherSource === "sensor") return undefined;
    if (this.weatherEntity) return states[this.weatherEntity];
    if (this.config.weather_entity && states[this.config.weather_entity]) return states[this.config.weather_entity];
    return Object.values(states).find(e => e.entity_id.startsWith("weather.") && !["unknown","unavailable"].includes(e.state));
  }

  private getWeatherTemperature(weather?: HAEntity): string {
    const sensor = this.weatherSource === "sensor" ? this.hass?.states[this.weatherTempEntity] : undefined;
    const raw = sensor ? Number(sensor.state) : weather?.attributes.temperature;
    if (typeof raw !== "number" || !Number.isFinite(raw)) return "—";
    const unit = sensor?.attributes.unit_of_measurement ?? weather?.attributes.temperature_unit;
    const displayUnit = typeof unit === "string" ? unit : this.hass?.config?.unit_system?.temperature || "°C";
    return `${Math.round(raw)} ${displayUnit}`;
  }

  private getWeatherCondition(): string {
    const sensor = this.weatherSource === "sensor" ? this.hass?.states[this.weatherConditionEntity] : undefined;
    return sensor?.state || this.getWeather()?.state || "";
  }

  private getClockParts(): {time:string;date:string} {
    const sensor = this.clockSource === "sensor" ? this.hass?.states[this.clockEntity] : undefined;
    const parsed = sensor && !["unknown","unavailable"].includes(sensor.state) ? new Date(sensor.state) : undefined;
    const date = parsed && !Number.isNaN(parsed.getTime()) ? parsed : this.currentTime;
    const opts = this.clockTimezone.trim() ? {timeZone:this.clockTimezone.trim()} : {};
    try {
      return {
        time:new Intl.DateTimeFormat(this.getLanguage(), {...opts,hour:"2-digit",minute:"2-digit"}).format(date),
        date:new Intl.DateTimeFormat(this.getLanguage(), {...opts,weekday:"short",day:"numeric",month:"short"}).format(date)
      };
    } catch { return {time:this.getTime(),date:this.getDate()}; }
  }

  private getWeatherDescription(condition: string): string {
    const key = weatherKeys[condition];
    return key ? this.t(key) : condition.replace(/-/g, " ");
  }

  private navigate(page: Page): void {
    if (this.settingsDirty && (this.settingsSection === "smartbar" || this.settingsSection === "welcome")) this.cancelSettingsEdit();
    this.activePage = page;
    this.mobileMenuOpen = false;
  }

  private renderIcon(icon: string) {
    return html`<ha-icon .icon=${icon}></ha-icon>`;
  }

  private renderWeather() {
    const weather = this.getWeather();
    const condition = this.getWeatherCondition();
    if (!weather && this.weatherSource !== "sensor") return nothing;
    if (this.weatherSource === "sensor" && !this.hass?.states[this.weatherTempEntity]) return nothing;
    const icon = weatherIcons[condition] || "mdi:weather-cloudy";
    return html`<div class="weather" title=${weather?.entity_id || this.weatherTempEntity}>
      <div class="weather-icon">${this.renderIcon(icon)}</div>
      <div class="weather-details"><div class="weather-temp">${this.getWeatherTemperature(weather)}</div>
      <div class="weather-condition">${condition ? this.getWeatherDescription(condition) : ""}</div></div>
    </div>`;
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

  private getWasteCandidates(): HAEntity[] {
    const states = Object.values(this.hass?.states ?? {});
    const calendars = states.filter(e => e.entity_id.startsWith("calendar.") &&
      /müll|mull|abfall|waste|trash|garbage|recycl|tonne|pickup|collection|entsorg|stadtreinigung/i.test(
        `${e.entity_id} ${String(e.attributes.friendly_name || "")}`));
    const sensors = states.filter(e => e.entity_id.startsWith("sensor.") &&
      /müll|mull|abfall|waste|trash|garbage|recycl|tonne|pickup|collection|entsorg|stadtreinigung|biomüll|restmüll|papier/i.test(
        `${e.entity_id} ${String(e.attributes.friendly_name || "")}`));
    return [...calendars, ...sensors].sort((a,b) => a.entity_id.localeCompare(b.entity_id));
  }

  private getWasteEntity(): HAEntity | undefined {
    const states = this.hass?.states ?? {};
    if (this.wasteEntity) {
      const chosen = states[this.wasteEntity];
      if (chosen && (this.wasteSource === "auto" || chosen.entity_id.startsWith(`${this.wasteSource}.`))) return chosen;
      return undefined; // Never silently replace a manually selected entity.
    }
    const candidates = this.getWasteCandidates().filter(e =>
      this.wasteSource === "auto" || e.entity_id.startsWith(`${this.wasteSource}.`));
    // Prefer a calendar with a next event; otherwise a sensor with a usable state.
    return candidates.find(e => e.entity_id.startsWith("calendar.") && typeof e.attributes.start_time === "string") ||
      candidates.find(e => e.entity_id.startsWith("sensor.") && !["unknown", "unavailable", ""].includes(e.state)) ||
      candidates[0];
  }

  private wasteDay(raw: unknown): string {
    if (typeof raw === "object" && raw !== null && "date" in raw) raw = (raw as {date:unknown}).date;
    if (typeof raw !== "string") return "";
    const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : "";
  }

  private wasteDayOffset(day: string): number {
    const today = this.currentTime;
    const parts = day.split("-").map(Number);
    return Math.round((Date.UTC(parts[0],parts[1]-1,parts[2]) -
      Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())) / 86400000);
  }

  private wasteIsPast(day: string): boolean {
    const days = this.wasteDayOffset(day);
    const [h,m] = this.wasteSwitchTime.split(":").map(Number);
    return days < 0 || (days === 0 && (this.currentTime.getHours()*60+this.currentTime.getMinutes()) >= h*60+m);
  }

  private wasteName(raw: string): string {
    const value = raw.replace(/^\s*(abfuhr|leerung|entsorgung|abholung)\s*[:–-]?\s*/i, "").trim();
    if (/restm[uü]ll|schwarze[rns]?\s+tonne|hausm[uü]ll/i.test(value)) return "Restmüll";
    if (/bio(m[uü]ll)?|braune[rns]?\s+tonne/i.test(value)) return "Biomüll";
    if (/papier|pappe|blaue[rns]?\s+tonne/i.test(value)) return "Papier";
    if (/gelbe[rns]?\s+(tonne|sack)|wertstoff|leichtverpackung/i.test(value)) return "Gelbe Tonne";
    return value || raw;
  }

  private async refreshWasteEvents(): Promise<void> {
    if (!this.smartShowWaste || !this.hass?.callWS) return;
    const entity = this.getWasteEntity();
    const id = entity?.entity_id.startsWith("calendar.") ? entity.entity_id : "";
    if (!id) { this.wasteLoadedCalendar = ""; this.wasteCalendarEvents = []; return; }
    if (this.wasteFetching || (id === this.wasteLoadedCalendar && Date.now()-this.wasteLastFetch < 300000)) return;
    this.wasteFetching = true;
    this.wasteLoadedCalendar = id;
    this.wasteLastFetch = Date.now();
    try {
      const start = new Date(this.currentTime);
      start.setDate(start.getDate()-1);
      const end = new Date(this.currentTime);
      end.setDate(end.getDate()+60);
      const response = await this.hass.callWS({
        type: "call_service", domain: "calendar", service: "get_events",
        service_data: {entity_id:id, start_date_time:start.toISOString(), end_date_time:end.toISOString()},
        return_response: true
      }) as Record<string,unknown> | undefined;
      // HA returns a calendar-keyed response; some versions wrap it in "response".
      const payload = (response?.response && typeof response.response === "object"
        ? response.response : response) as Record<string,unknown> | undefined;
      const container = payload?.[id] as {events?:Array<{summary?:string;start?:unknown}>} | undefined;
      const events = Array.isArray(container?.events) ? container.events : [];
      if (this.wasteLoadedCalendar === id) this.wasteCalendarEvents = events
        .map(event => ({summary:String(event.summary || ""),date:this.wasteDay(event.start)}))
        .filter(event => event.date && event.summary);
    } catch(error) {
      console.warn("ControlRoom: calendar.get_events unavailable; using entity fallback",error);
      if (this.wasteLoadedCalendar === id) this.wasteCalendarEvents = [];
    } finally { this.wasteFetching = false; }
  }

  private getWasteInfo(): {title:string;when:string} | undefined {
    const entity = this.getWasteEntity();
    if (!entity || ["unknown","unavailable"].includes(entity.state)) return undefined;
    const attrs = entity.attributes;
    const name = String(attrs.friendly_name || entity.entity_id.split(".")[1].replace(/_/g," "));
    const message = attrs.message || attrs.next_collection_type || attrs.waste_type || attrs.type;
    const dateRaw = attrs.start_time || attrs.next_date || attrs.next_collection || attrs.date ||
      attrs.collection_date || attrs.next_pickup || attrs.next_collection_date;
    const date = this.wasteDay(dateRaw || entity.state);
    const events = entity.entity_id.startsWith("calendar.") && this.wasteLoadedCalendar === entity.entity_id
      ? [...this.wasteCalendarEvents] : [];
    if (date && typeof message === "string") events.push({summary:message,date});
    else if (date) events.push({summary:name,date});
    const upcoming = events.filter(e=>!this.wasteIsPast(e.date)).sort((a,b)=>a.date.localeCompare(b.date));
    if (upcoming.length) {
      const firstDay = upcoming[0].date;
      const sameDay = upcoming.filter(e=>e.date===firstDay);
      const names = [...new Set(sameDay.map(e=>this.wasteName(e.summary)))];
      const title = this.wasteLabel.trim() || names.join(" + ");
      return {title,when:this.formatWasteWhen(firstDay)};
    }
    // Sensors that expose only a countdown cannot reveal the following pickup.
    // Never keep showing today's collection after the configured cutoff.
    const daysRaw = attrs.days_until_collection ?? attrs.days_until ?? attrs.days_remaining;
    const days = typeof daysRaw === "number" ? daysRaw :
      typeof daysRaw === "string" && /^\d+$/.test(daysRaw) ? Number(daysRaw) :
      entity.entity_id.startsWith("sensor.") && /^\d+$/.test(entity.state) ? Number(entity.state) : undefined;
    if (days !== undefined && Number.isFinite(days) && days >= 0) {
      const future = new Date(this.currentTime);
      future.setDate(future.getDate()+days);
      const day = `${future.getFullYear()}-${String(future.getMonth()+1).padStart(2,"0")}-${String(future.getDate()).padStart(2,"0")}`;
      if (!this.wasteIsPast(day)) return {title:this.wasteLabel.trim() || this.wasteName(String(message || name)),when:this.formatWasteWhen(day)};
    }
    return undefined;
  }

  private formatWasteWhen(day:string):string {
    const days = this.wasteDayOffset(day);
    const lang = this.getLanguage();
    const relative = days===0 ? (lang==="de"?"Heute":lang==="pt"?"Hoje":"Today") :
      days===1 ? (lang==="de"?"Morgen":lang==="pt"?"Amanhã":"Tomorrow") :
      lang==="de"?`In ${days} Tagen`:lang==="pt"?`Em ${days} dias`:`In ${days} days`;
    const [y,m,d] = day.split("-").map(Number);
    const absolute = new Intl.DateTimeFormat(lang,{day:"2-digit",month:"short"}).format(new Date(y,m-1,d));
    return this.wasteDateMode==="date"?absolute:this.wasteDateMode==="both"?`${relative} · ${absolute}`:relative;
  }

  private renderWelcomeSettings() {
    const section = this.settingsSection;
    const categories = [
      {id:"welcome", title:"Begrüßung & Personen", description:"Anrede, Profilbilder und Standorte", icon:"mdi:account-heart-outline", group:"Startseite"},
      {id:"smartbar", title:"Smart Glass Bar", description:"Wetter, Uhr & Datum und Müllabfuhr", icon:"mdi:weather-partly-cloudy", group:"Startseite"},
      {id:"rooms", title:"Räume", description:"Bildstil, Raumfotos und automatische Darstellung", icon:"mdi:home-edit-outline", group:"Darstellung"},
      {id:"themes", title:"Themes", description:"Farben, Designstile und Home Assistant / HACS", icon:"mdi:palette-outline", group:"Darstellung"},
      {id:"devices", title:"Geräte & Bereiche", description:"Bereiche und Entitäten · in Vorbereitung", icon:"mdi:devices", group:"Geräte & Bereiche"},
      {id:"system", title:"System", description:"Informationen und Verwaltung · in Vorbereitung", icon:"mdi:cog-outline", group:"System"}
    ] as const;
    const matches = categories.filter(c => `${c.title} ${c.description} ${c.group}`.toLocaleLowerCase().includes(this.settingsSearch.toLocaleLowerCase().trim()));
    if (section === "overview") return html`<div class="settings-center">
      <div class="settings-intro"><div class="eyebrow">CONTROLROOM</div><h1>Einstellungen</h1><p>Gestalte dein Zuhause, ganz nach deinen Wünschen.</p></div>
      <label class="settings-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Einstellungen durchsuchen…" .value=${this.settingsSearch} @input=${(e:Event) => {this.settingsSearch = (e.target as HTMLInputElement).value;}} aria-label="Einstellungen durchsuchen" /></label>
      ${matches.length ? [...new Set(matches.map(c => c.group))].map(group => html`<section class="settings-category"><h2>${group}</h2><div class="settings-options">${matches.filter(c=>c.group===group).map(c=>html`<button class="settings-option" @click=${()=>{if(c.id==="welcome" || c.id==="smartbar") this.beginSettingsEdit(c.id); else {this.settingsSection=c.id;if(c.id==="rooms") this.roomStyleSnapshot=JSON.stringify({style:this.roomStyle,auto:this.roomAutoSwitch,byArea:this.roomStyleByArea,photos:this.roomPhotoUrls,images:this.roomImages});if(c.id==="themes")this.crThemeSnapshot=JSON.stringify(this.crThemeData());}}}><span class="settings-option-icon">${this.renderIcon(c.icon)}</span><span class="settings-option-copy"><strong>${c.title}</strong><small>${c.description}</small></span>${this.renderIcon("mdi:chevron-right")}</button>`)}</div></section>`) : html`<p class="settings-empty">Keine passenden Einstellungen gefunden.</p>`}
      <p class="settings-local-note">Änderungen werden auf diesem Browser / Display gespeichert.</p>
    </div>`;
    if (section === "themes") return this.renderThemeSettings();
    if (section === "rooms") return html`<div class="settings-center"><button class="settings-back" @click=${()=>{this.cancelRoomVisualSettings();this.settingsSection="overview";}}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button>${this.renderRoomStyleEditor(Object.entries(this.areaNames).sort((a,b)=>a[1].localeCompare(b[1])))}</div>`;
    if (section === "appearance" || section === "devices" || section === "system") return html`<div class="settings-center"><button class="settings-back" @click=${()=>{this.settingsSection="overview";}}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button><section class="welcome-settings"><div class="eyebrow">CONTROLROOM</div><h2>${categories.find(c=>c.id===section)?.title}</h2><p>Dieser Bereich wird in einer späteren Etappe eingerichtet. Bestehende Einstellungen bleiben unverändert.</p></section></div>`;
    const candidates = this.getWasteCandidates().filter(e =>
      this.wasteSource === "auto" || e.entity_id.startsWith(`${this.wasteSource}.`));
    const wasteInfo = this.getWasteInfo();
    return html`<div class="settings-stack"><button class="settings-back" @click=${()=>{this.cancelSettingsEdit();}}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button>
      ${section === "welcome" ? html`<section class="welcome-settings">
        <div class="eyebrow">Startseite</div><h2>Begrüßung & Personen</h2>
        <p>Personalisierung dieses Browsers / Displays</p>
        <label class="welcome-setting-row"><span>Begrüßungsmodus</span>
          <select .value=${this.welcomeMode} @change=${(e: Event) => {this.welcomeMode = (e.target as HTMLSelectElement).value as "automatic" | "shared"; this.markSettingsDirty();}}>
            <option value="automatic">Automatisch · angemeldete Person</option>
            <option value="shared">Gemeinsam · iSG Display</option>
          </select></label>
        ${([
          ["welcomeShowGreeting", "Begrüßung anzeigen"],
          ["welcomeShowEyebrow", "Bereichstitel anzeigen"],
          ["welcomeShowSubtitle", "Untertitel anzeigen"],
          ["welcomeShowPeople", "Personen und Standorte anzeigen"]
        ] as const).map(([key, label]) => html`<label class="welcome-setting-row"><span>${label}</span>
          <input type="checkbox" .checked=${this[key]} @change=${(e: Event) => {(this as any)[key] = (e.target as HTMLInputElement).checked; this.markSettingsDirty();}} /></label>`)}
        <label class="welcome-setting-text">Bereichstitel
          <input type="text" .value=${this.welcomeEyebrow || this.t("homeLabel")} @change=${(e: Event) => {this.welcomeEyebrow = (e.target as HTMLInputElement).value; this.markSettingsDirty();}} /></label>
        <label class="welcome-setting-text">Untertitel
          <input type="text" .value=${this.welcomeSubtitle || this.t("subtitle")} @change=${(e: Event) => {this.welcomeSubtitle = (e.target as HTMLInputElement).value; this.markSettingsDirty();}} /></label>
      </section>` : nothing}
      ${section === "smartbar" ? html`<section class="welcome-settings">
        <div class="eyebrow">Startseite</div><h2>Smart Glass Bar</h2>
        <p>Module und Datenquellen · auf diesem Display gespeichert</p>
        ${([ ["weather","Wetter","smartShowWeather","mdi:weather-partly-cloudy"], ["clock","Uhr & Datum","smartShowClock","mdi:clock-outline"], ["waste","Müllabfuhr","smartShowWaste","mdi:trash-can-outline"] ] as const).map(([id,label,showKey,icon])=>html`
          <div class="smart-settings-module">
            <div class="smart-settings-head">
              <button type="button" class="smart-settings-open" @click=${()=>{this.smartExpanded=this.smartExpanded===id ? "weather" : id;}}>${this.renderIcon(icon)}<strong>${label}</strong>${this.renderIcon(this.smartExpanded===id?"mdi:chevron-up":"mdi:chevron-down")}</button>
              <label class="smart-settings-toggle"><input type="checkbox" .checked=${this[showKey]} @change=${(e:Event)=>{(this as any)[showKey]=(e.target as HTMLInputElement).checked;this.markSettingsDirty();}} aria-label=${`${label} anzeigen`}/></label>
            </div>
            ${this.smartExpanded===id ? html`<div class="smart-settings-body">
              ${id==="weather" ? html`
                <label class="welcome-setting-text">Quelle<select .value=${this.weatherSource} @change=${(e:Event)=>{this.weatherSource=(e.target as HTMLSelectElement).value as typeof this.weatherSource;this.weatherEntity="";this.markSettingsDirty();}}><option value="auto">Automatisch · Wetterintegration</option><option value="weather">Wetter (weather.*)</option><option value="sensor">Sensoren / HACS (sensor.*)</option></select></label>
                ${this.weatherSource!=="sensor" ? html`<label class="welcome-setting-text">Wetter-Entität<select .value=${this.weatherEntity} @change=${(e:Event)=>{this.weatherEntity=(e.target as HTMLSelectElement).value;this.markSettingsDirty();}}><option value="">Automatisch auswählen</option>${Object.values(this.hass?.states??{}).filter(e=>e.entity_id.startsWith("weather.")).map(e=>html`<option value=${e.entity_id}>${String(e.attributes.friendly_name||e.entity_id)} · ${e.entity_id}</option>`)}</select></label>` : html`
                  <label class="welcome-setting-text">Temperatursensor<select .value=${this.weatherTempEntity} @change=${(e:Event)=>{this.weatherTempEntity=(e.target as HTMLSelectElement).value;this.markSettingsDirty();}}><option value="">Bitte auswählen</option>${Object.values(this.hass?.states??{}).filter(e=>e.entity_id.startsWith("sensor.")).map(e=>html`<option value=${e.entity_id}>${String(e.attributes.friendly_name||e.entity_id)} · ${e.entity_id}</option>`)}</select></label>
                  <label class="welcome-setting-text">Wettersituation (optional)<select .value=${this.weatherConditionEntity} @change=${(e:Event)=>{this.weatherConditionEntity=(e.target as HTMLSelectElement).value;this.markSettingsDirty();}}><option value="">Ohne Beschreibung</option>${Object.values(this.hass?.states??{}).filter(e=>e.entity_id.startsWith("sensor.")).map(e=>html`<option value=${e.entity_id}>${String(e.attributes.friendly_name||e.entity_id)} · ${e.entity_id}</option>`)}</select></label>`}
              ` : nothing}
              ${id==="clock" ? html`
                <label class="welcome-setting-text">Quelle<select .value=${this.clockSource} @change=${(e:Event)=>{this.clockSource=(e.target as HTMLSelectElement).value as typeof this.clockSource;this.markSettingsDirty();}}><option value="local">Gerätezeit · ohne Integration</option><option value="sensor">Datum-/Zeit-Sensor (sensor.*)</option></select></label>
                ${this.clockSource==="sensor" ? html`<label class="welcome-setting-text">Zeit-Entität<select .value=${this.clockEntity} @change=${(e:Event)=>{this.clockEntity=(e.target as HTMLSelectElement).value;this.markSettingsDirty();}}><option value="">Bitte auswählen</option>${Object.values(this.hass?.states??{}).filter(e=>e.entity_id.startsWith("sensor.")).map(e=>html`<option value=${e.entity_id}>${String(e.attributes.friendly_name||e.entity_id)} · ${e.entity_id}</option>`)}</select></label><p class="settings-note">Der Sensor muss ein gültiges ISO-Datum mit Uhrzeit liefern; sonst wird die Gerätezeit verwendet.</p>` : nothing}
                <label class="welcome-setting-text">Zeitzone (optional)<input type="text" placeholder="z. B. Europe/Berlin" .value=${this.clockTimezone} @change=${(e:Event)=>{this.clockTimezone=(e.target as HTMLInputElement).value;this.markSettingsDirty();}} /></label>
              ` : nothing}
              ${id==="waste" ? html`
                <label class="welcome-setting-text">Quelle<select .value=${this.wasteSource} @change=${(e:Event)=>{this.wasteSource=(e.target as HTMLSelectElement).value as typeof this.wasteSource;this.wasteEntity="";this.markSettingsDirty();}}><option value="auto">Automatisch erkennen</option><option value="calendar">Kalender (calendar.*)</option><option value="sensor">Sensor / HACS (sensor.*)</option></select></label>
                <label class="welcome-setting-text">Entität<select .value=${this.wasteEntity} @change=${(e:Event)=>{this.wasteEntity=(e.target as HTMLSelectElement).value;this.markSettingsDirty();}}><option value="">Automatisch auswählen</option>${candidates.map(e=>html`<option value=${e.entity_id}>${String(e.attributes.friendly_name||e.entity_id)} · ${e.entity_id}</option>`)}</select></label>
                <label class="welcome-setting-text">Eigener Name (optional)<input type="text" placeholder="z. B. Biomüll" .value=${this.wasteLabel} @input=${(e:Event)=>{this.wasteLabel=(e.target as HTMLInputElement).value;this.markSettingsDirty();}} /></label>
                <label class="welcome-setting-text">Symbol (MDI)<input type="text" placeholder="mdi:trash-can-outline" .value=${this.wasteIcon} @change=${(e:Event)=>{this.wasteIcon=(e.target as HTMLInputElement).value||"mdi:trash-can-outline";this.markSettingsDirty();}} /></label>
                <label class="welcome-setting-text">Automatischer Tageswechsel (Umschaltzeit)<input type="time" .value=${this.wasteSwitchTime} @change=${(e:Event)=>{this.wasteSwitchTime=(e.target as HTMLInputElement).value || "12:00";this.markSettingsDirty();}} /></label>
                <p class="settings-note">Ab 12:00 Uhr (Standard) wird die heutige Abholung übersprungen. Die nächste verfügbare Abholung erscheint automatisch.</p>
                <label class="welcome-setting-text">Datumsanzeige<select .value=${this.wasteDateMode} @change=${(e:Event)=>{this.wasteDateMode=(e.target as HTMLSelectElement).value as typeof this.wasteDateMode;this.markSettingsDirty();}}><option value="relative">Heute / Morgen / in X Tagen</option><option value="date">Datum</option><option value="both">Beides</option></select></label>
                <p class="settings-note">${wasteInfo?`Vorschau: ${wasteInfo.title} · ${wasteInfo.when}`:"Noch keine gültigen Abholdaten."}</p>
              ` : nothing}
            </div>` : nothing}
          </div>`)}
      </section>` : nothing}
      ${(section === "welcome" || section === "smartbar") ? html`
        <div class="settings-save-bar">
          <div class="settings-save-copy">
            <strong>${this.settingsDirty ? "Ungespeicherte Änderungen" : this.settingsSavedNotice ? "Änderungen gespeichert" : "Alle Änderungen gespeichert"}</strong>
            <small>${this.settingsDirty ? "Erst mit Speichern werden deine Einstellungen dauerhaft übernommen." : "Gespeichert auf diesem Browser / Display."}</small>
          </div>
          <button type="button" class="settings-cancel" @click=${()=>this.cancelSettingsEdit()}>${this.renderIcon("mdi:close")} Abbrechen</button>
          <button type="button" class="settings-save" ?disabled=${!this.settingsDirty} @click=${()=>this.commitSettingsEdit()}>${this.renderIcon("mdi:content-save-outline")} Speichern</button>
        </div>` : nothing}
    </div>`;
  }

  private renderSmartBar() {
    const weather = this.smartShowWeather && (this.getWeather() || (this.weatherSource === "sensor" && this.hass?.states[this.weatherTempEntity]));
    const clockParts = this.getClockParts();
    const waste = this.smartShowWaste ? this.getWasteInfo() : undefined;
    const parts = [
      weather ? html`<div class="smart-part">${this.renderWeather()}</div>` : nothing,
      this.smartShowClock ? html`<div class="smart-part"><div class="smart-segment">${this.renderIcon("mdi:clock-outline")}
        <div><strong>${clockParts.time}</strong><small>${clockParts.date}</small></div></div></div>` : nothing,
      waste ? html`<div class="smart-part"><div class="smart-segment smart-waste">${this.renderIcon(this.wasteIcon.startsWith("mdi:") ? this.wasteIcon : "mdi:trash-can-outline")}
        <div><strong title=${waste.title}>${waste.title}</strong><small>${waste.when}</small></div></div></div>` : nothing
    ].filter(part => part !== nothing);
    return parts.length ? html`<div class="smart-bar">${parts.map((part,i) => html`${i ? html`<div class="smart-divider"></div>` : nothing}${part}`)}</div>` : nothing;
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
          <div class="premium-actions premium-actions-three">
            <button type="button" class="glass-action" ?disabled=${!available || on===available || !this.hass?.callService}
              @click=${()=>this.setAllLights(true,lights)}>
              ${this.renderIcon("mdi:weather-sunny")} ${this.t("allOn")}
            </button>
            <button type="button" class="glass-action" ?disabled=${!on || !this.hass?.callService}
              @click=${()=>this.setAllLights(false,lights)}>
              ${this.renderIcon("mdi:weather-night")} ${this.t("allOff")}
            </button>
            <button type="button" class="glass-action premium-light-link" @click=${()=>this.navigate("lights")}>
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

  private crThemeData(){return {theme:this.crTheme,style:this.crThemeStyle,source:"controlroom",haTheme:"",haMode:"auto"};}
  private crPalettes(){return [

    {id:"purple",name:"Royal Purple",accent:"#a477f5",bg:"#111019",surface:"#282037",text:"#f6f3fb"},
    {id:"blue",name:"Midnight Blue",accent:"#559cff",bg:"#0c1628",surface:"#1c304b",text:"#f5f8ff"},
    {id:"emerald",name:"Emerald",accent:"#43c6a0",bg:"#0c1b19",surface:"#1c3530",text:"#f2fff9"},
    {id:"burgundy",name:"Burgundy",accent:"#ce6c90",bg:"#221219",surface:"#3a222d",text:"#fff4f7"},
    {id:"rose-noir",name:"Rose Noir",accent:"#e3a04b",bg:"#190d17",surface:"#301823",text:"#fff1f4"},
    {id:"gold",name:"Champagne Gold",accent:"#b8ab92",bg:"#1b1b1a",surface:"#2c2b29",text:"#fff9ed"},
    {id:"pearl",name:"Pearl White",accent:"#7664a9",bg:"#f5f3f8",surface:"#ffffff",text:"#30283a"},
    {id:"obsidian",name:"Obsidian",accent:"#b6b9c2",bg:"#101114",surface:"#25272c",text:"#f6f6f8"},
    {id:"sapphire",name:"Sapphire Night",accent:"#70a9ed",bg:"#081425",surface:"#162b43",text:"#f1f7ff"},
    {id:"forest",name:"Forest Luxe",accent:"#b2c79a",bg:"#101c18",surface:"#24382d",text:"#f5f7ef"},
    {id:"terracotta",name:"Terracotta Atelier",accent:"#b85e48",bg:"#faf1e8",surface:"#fffaf5",text:"#322820"},
    {id:"sand",name:"Desert Sand",accent:"#96734b",bg:"#f4e9d7",surface:"#fff9ed",text:"#312b22"},
    {id:"ocean",name:"Ocean Mist",accent:"#277c8c",bg:"#e8f4f4",surface:"#f9ffff",text:"#18323b"},
    {id:"amethyst",name:"Amethyst Velvet",accent:"#c2a1eb",bg:"#1b1429",surface:"#322440",text:"#faf3ff"},
    {id:"copper",name:"Copper Noir",accent:"#d59a72",bg:"#171513",surface:"#30251f",text:"#fff4e9"},
    {id:"sage",name:"Sage Residence",accent:"#657b57",bg:"#f0f2e9",surface:"#fcfdf8",text:"#283229"},
    {id:"arctic",name:"Arctic Silver",accent:"#53778e",bg:"#edf2f6",surface:"#ffffff",text:"#1b2a36"},
    {id:"ruby",name:"Ruby Eclipse",accent:"#ed8794",bg:"#200e18",surface:"#3a202d",text:"#fff4f7"},
    {id:"lavender",name:"Lavender Cloud",accent:"#8068b0",bg:"#f3effa",surface:"#ffffff",text:"#2b2341"},
    {id:"graphite",name:"Graphite Studio",accent:"#c6d0d9",bg:"#171b20",surface:"#2b3038",text:"#f6f8fb"},
    {id:"atelier-original-0001",name:"Aurora Nocturne 0001",accent:"#e27e65",bg:"#1a1812",surface:"#3d2e24",text:"#f3f6f7"},
    {id:"atelier-original-0002",name:"Flamingo Nocturne 0002",accent:"#1e9f5d",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222f"},
    {id:"atelier-original-0003",name:"Ice Nocturne 0003",accent:"#d690ea",bg:"#261820",surface:"#462a46",text:"#f4f7f3"},
    {id:"atelier-original-0004",name:"Violet Nocturne 0004",accent:"#c1ce27",bg:"#f6f9f3",surface:"#fdfdfc",text:"#222435"},
    {id:"atelier-original-0005",name:"Moss Nocturne 0005",accent:"#4ba7dd",bg:"#0c0d15",surface:"#1f2733",text:"#f7f4f3"},
    {id:"atelier-original-0006",name:"Ruby Nocturne 0006",accent:"#891a40",bg:"#eee6e4",surface:"#fdfcfc",text:"#22352b"},
    {id:"atelier-original-0007",name:"Coral Nocturne 0007",accent:"#73d86e",bg:"#111a16",surface:"#243d28",text:"#f6f3f7"},
    {id:"atelier-original-0008",name:"Ultramarine Nocturne 0008",accent:"#422895",bg:"#f3edf5",surface:"#fcfcfd",text:"#333522"},
    {id:"atelier-original-0009",name:"Lilac Nocturne 0009",accent:"#e3bf96",bg:"#242617",surface:"#463f2a",text:"#f3f5f7"},
    {id:"atelier-original-0010",name:"Denim Nocturne 0010",accent:"#33c1a9",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352228"},
    {id:"atelier-original-0011",name:"Peach Nocturne 0011",accent:"#d256c3",bg:"#140d0f",surface:"#331f2d",text:"#f3f7f3"},
    {id:"atelier-original-0012",name:"Tangerine Nocturne 0012",accent:"#5a8122",bg:"#e5f0e3",surface:"#fcfdfc",text:"#262235"},
    {id:"atelier-original-0013",name:"Chartreuse Nocturne 0013",accent:"#5c86eb",bg:"#14111b",surface:"#24273d",text:"#f7f5f3"},
    {id:"atelier-original-0014",name:"Petrol Nocturne 0014",accent:"#a81516",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223532"},
    {id:"atelier-original-0015",name:"Olive Nocturne 0015",accent:"#89f0a6",bg:"#162725",surface:"#2a4638",text:"#f7f3f6"},
    {id:"atelier-original-0016",name:"Rosewood Nocturne 0016",accent:"#891bda",bg:"#f9f3f9",surface:"#fdfcfd",text:"#2d3522"},
    {id:"atelier-original-0017",name:"Lime Nocturne 0017",accent:"#e7d240",bg:"#11140d",surface:"#32331f",text:"#f3f4f7"},
    {id:"atelier-original-0018",name:"Fuchsia Nocturne 0018",accent:"#127d91",bg:"#e4e8ee",surface:"#fcfdfd",text:"#352222"},
    {id:"atelier-original-0019",name:"Periwinkle Nocturne 0019",accent:"#cb7ca7",bg:"#1b1110",surface:"#3d242d",text:"#f3f7f5"},
    {id:"atelier-original-0020",name:"Cherry Nocturne 0020",accent:"#4b8736",bg:"#edf5ee",surface:"#fcfdfc",text:"#2d2235"},
    {id:"atelier-original-0021",name:"Cerulean Nocturne 0021",accent:"#a2a0d9",bg:"#201924",surface:"#312a46",text:"#f6f7f3"},
    {id:"atelier-original-0022",name:"Pistachio Nocturne 0022",accent:"#af6846",bg:"#f8f7f4",surface:"#fdfdfc",text:"#223235"},
    {id:"atelier-original-0023",name:"Lagoon Nocturne 0023",accent:"#66c29f",bg:"#0d1314",surface:"#1f332f",text:"#f7f3f4"},
    {id:"atelier-original-0024",name:"Bronze Nocturne 0024",accent:"#6e2f75",bg:"#f0e3eb",surface:"#fdfcfd",text:"#273522"},
    {id:"atelier-original-0025",name:"Vermilion Nocturne 0025",accent:"#d0ee58",bg:"#121c10",surface:"#333d24",text:"#f4f3f7"},
    {id:"atelier-original-0026",name:"Saffron Nocturne 0026",accent:"#115fac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352822"},
    {id:"atelier-original-0027",name:"Mint Nocturne 0027",accent:"#f3869e",bg:"#251d18",surface:"#462a2a",text:"#f3f7f6"},
    {id:"atelier-original-0028",name:"Cyan Nocturne 0028",accent:"#16df26",bg:"#f3f9f6",surface:"#fcfdfc",text:"#332235"},
    {id:"atelier-original-0029",name:"Orchid Nocturne 0029",accent:"#7d3cec",bg:"#140c15",surface:"#2a1f33",text:"#f5f7f3"},
    {id:"atelier-original-0030",name:"Garnet Nocturne 0030",accent:"#95670f",bg:"#edeee4",surface:"#fdfdfc",text:"#222b35"},
    {id:"atelier-original-0031",name:"Copper Nocturne 0031",accent:"#73d3cf",bg:"#12151a",surface:"#24393d",text:"#f7f3f3"},
    {id:"atelier-original-0032",name:"Jade Nocturne 0032",accent:"#8f2d77",bg:"#f5edef",surface:"#fdfcfc",text:"#223523"},
    {id:"atelier-original-0033",name:"Aqua Nocturne 0033",accent:"#badf9a",bg:"#182619",surface:"#31462a",text:"#f5f3f7"},
    {id:"atelier-original-0034",name:"Mulberry Nocturne 0034",accent:"#3b50ba",bg:"#f5f4f8",surface:"#fcfcfd",text:"#352e22"},
    {id:"atelier-original-0035",name:"Papaya Nocturne 0035",accent:"#cc6a5c",bg:"#15120c",surface:"#33251f",text:"#f3f6f7"},
    {id:"atelier-original-0036",name:"Iris Nocturne 0036",accent:"#277c4a",bg:"#e3f0ee",surface:"#fcfdfd",text:"#352230"},
    {id:"atelier-original-0037",name:"Teal Nocturne 0037",accent:"#bd65e2",bg:"#1a1118",surface:"#3a243d",text:"#f4f7f3"},
    {id:"atelier-original-0038",name:"Cobalt Nocturne 0038",accent:"#9f9e1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222535"},
    {id:"atelier-original-0039",name:"Amber Nocturne 0039",accent:"#90d0ea",bg:"#171926",surface:"#2a3846",text:"#f7f4f3"},
    {id:"atelier-original-0040",name:"Mustard Nocturne 0040",accent:"#ce276d",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352a"},
    {id:"atelier-original-0041",name:"Cobalt Porcelain 0041",accent:"#5edd4b",bg:"#0d1410",surface:"#1f3320",text:"#f6f3f7"},
    {id:"atelier-original-0042",name:"Amber Porcelain 0042",accent:"#2c1a89",bg:"#eae4ee",surface:"#fcfcfd",text:"#353522"},
    {id:"atelier-original-0043",name:"Mustard Porcelain 0043",accent:"#d89e6e",bg:"#1a1b11",surface:"#3d3424",text:"#f3f5f7"},
    {id:"atelier-original-0044",name:"Aurora Porcelain 0044",accent:"#289579",bg:"#edf3f5",surface:"#fcfdfd",text:"#35222a"},
    {id:"atelier-original-0045",name:"Flamingo Porcelain 0045",accent:"#e396e0",bg:"#27161d",surface:"#462a3f",text:"#f3f7f3"},
    {id:"atelier-original-0046",name:"Ice Porcelain 0046",accent:"#92c133",bg:"#f5f8f4",surface:"#fcfdfc",text:"#252235"},
    {id:"atelier-original-0047",name:"Violet Porcelain 0047",accent:"#5685d2",bg:"#0f0d14",surface:"#1f2233",text:"#f7f5f3"},
    {id:"atelier-original-0048",name:"Moss Porcelain 0048",accent:"#81222a",bg:"#f0e8e3",surface:"#fdfcfc",text:"#223530"},
    {id:"atelier-original-0049",name:"Ruby Porcelain 0049",accent:"#5ceb79",bg:"#101b19",surface:"#243d2e",text:"#f7f3f6"},
    {id:"atelier-original-0050",name:"Coral Porcelain 0050",accent:"#5e15a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2f3522"},
    {id:"atelier-original-0051",name:"Ultramarine Porcelain 0051",accent:"#f0db89",bg:"#202419",surface:"#46462a",text:"#f3f4f7"},
    {id:"atelier-original-0052",name:"Lilac Porcelain 0052",accent:"#1bcada",bg:"#f3f6f9",surface:"#fcfdfd",text:"#352223"},
    {id:"atelier-original-0053",name:"Denim Porcelain 0053",accent:"#e740a9",bg:"#140d0d",surface:"#331f27",text:"#f3f7f4"},
    {id:"atelier-original-0054",name:"Peach Porcelain 0054",accent:"#3d9112",bg:"#e4eee6",surface:"#fcfdfc",text:"#2b2235"},
    {id:"atelier-original-0055",name:"Tangerine Porcelain 0055",accent:"#7c7fcb",bg:"#16101c",surface:"#28243d",text:"#f7f6f3"},
    {id:"atelier-original-0056",name:"Chartreuse Porcelain 0056",accent:"#874a36",bg:"#f5f3ed",surface:"#fdfcfc",text:"#223335"},
    {id:"atelier-original-0057",name:"Petrol Porcelain 0057",accent:"#a0d9bf",bg:"#182325",surface:"#2a463f",text:"#f7f3f5"},
    {id:"atelier-original-0058",name:"Olive Porcelain 0058",accent:"#9d46af",bg:"#f8f4f7",surface:"#fdfcfd",text:"#283522"},
    {id:"atelier-original-0059",name:"Rosewood Porcelain 0059",accent:"#b6c266",bg:"#0f150c",surface:"#2c331f",text:"#f3f3f7"},
    {id:"atelier-original-0060",name:"Lime Porcelain 0060",accent:"#2f5775",bg:"#e3e5f0",surface:"#fcfcfd",text:"#352722"},
    {id:"atelier-original-0061",name:"Fuchsia Porcelain 0061",accent:"#ee5884",bg:"#1a1412",surface:"#3d2427",text:"#f3f7f6"},
    {id:"atelier-original-0062",name:"Periwinkle Porcelain 0062",accent:"#11ac11",bg:"#eef4f1",surface:"#fcfdfc",text:"#322235"},
    {id:"atelier-original-0063",name:"Cherry Porcelain 0063",accent:"#a686f3",bg:"#241826",surface:"#382a46",text:"#f6f7f3"},
    {id:"atelier-original-0064",name:"Cerulean Porcelain 0064",accent:"#df8b16",bg:"#f9f9f3",surface:"#fdfdfc",text:"#222d35"},
    {id:"atelier-original-0065",name:"Pistachio Porcelain 0065",accent:"#3cecd6",bg:"#0c1115",surface:"#1f3133",text:"#f7f3f3"},
    {id:"atelier-original-0066",name:"Lagoon Porcelain 0066",accent:"#950f7e",bg:"#eee4e8",surface:"#fdfcfd",text:"#223522"},
    {id:"atelier-original-0067",name:"Bronze Porcelain 0067",accent:"#a7d373",bg:"#111a12",surface:"#2d3d24",text:"#f5f3f7"},
    {id:"atelier-original-0068",name:"Vermilion Porcelain 0068",accent:"#2d468f",bg:"#eeedf5",surface:"#fcfcfd",text:"#352d22"},
    {id:"atelier-original-0069",name:"Saffron Porcelain 0069",accent:"#df9d9a",bg:"#262117",surface:"#46312a",text:"#f3f6f7"},
    {id:"atelier-original-0070",name:"Mint Porcelain 0070",accent:"#3bba65",bg:"#f4f8f7",surface:"#fcfdfd",text:"#352232"},
    {id:"atelier-original-0071",name:"Cyan Porcelain 0071",accent:"#a25ccc",bg:"#140d12",surface:"#2f1f33",text:"#f4f7f3"},
    {id:"atelier-original-0072",name:"Orchid Porcelain 0072",accent:"#7c7527",bg:"#ebf0e3",surface:"#fdfdfc",text:"#222735"},
    {id:"atelier-original-0073",name:"Garnet Porcelain 0073",accent:"#65c7e2",bg:"#11131b",surface:"#24333d",text:"#f7f4f3"},
    {id:"atelier-original-0074",name:"Copper Porcelain 0074",accent:"#9f1e5e",bg:"#f4eeee",surface:"#fdfcfc",text:"#223528"},
    {id:"atelier-original-0075",name:"Jade Porcelain 0075",accent:"#a2ea90",bg:"#16271d",surface:"#2a462a",text:"#f6f3f7"},
    {id:"atelier-original-0076",name:"Aqua Porcelain 0076",accent:"#3527ce",bg:"#f6f3f9",surface:"#fcfcfd",text:"#353322"},
    {id:"atelier-original-0077",name:"Mulberry Porcelain 0077",accent:"#dd824b",bg:"#14140d",surface:"#332a1f",text:"#f3f5f7"},
    {id:"atelier-original-0078",name:"Papaya Porcelain 0078",accent:"#1a8964",bg:"#e4edee",surface:"#fcfdfd",text:"#35222b"},
    {id:"atelier-original-0079",name:"Iris Porcelain 0079",accent:"#d46ed8",bg:"#1b1015",surface:"#3d2439",text:"#f3f7f3"},
    {id:"atelier-original-0080",name:"Teal Porcelain 0080",accent:"#799528",bg:"#eff5ed",surface:"#fcfdfc",text:"#232235"},
    {id:"atelier-original-0081",name:"Papaya Velvet 0081",accent:"#96b9e3",bg:"#1a1924",surface:"#2a3146",text:"#f7f5f3"},
    {id:"atelier-original-0082",name:"Iris Velvet 0082",accent:"#c1334b",bg:"#f8f5f4",surface:"#fdfcfc",text:"#22352f"},
    {id:"atelier-original-0083",name:"Teal Velvet 0083",accent:"#56d266",bg:"#0d1412",surface:"#1f3325",text:"#f7f3f6"},
    {id:"atelier-original-0084",name:"Cobalt Velvet 0084",accent:"#4a2281",bg:"#eee3f0",surface:"#fdfcfd",text:"#303522"},
    {id:"atelier-original-0085",name:"Amber Velvet 0085",accent:"#ebc15c",bg:"#181c10",surface:"#3d3a24",text:"#f3f4f7"},
    {id:"atelier-original-0086",name:"Mustard Velvet 0086",accent:"#15a8a8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352225"},
    {id:"atelier-original-0087",name:"Aurora Velvet 0087",accent:"#f089d2",bg:"#25181a",surface:"#462a38",text:"#f3f7f4"},
    {id:"atelier-original-0088",name:"Flamingo Velvet 0088",accent:"#6ada1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2a2235"},
    {id:"atelier-original-0089",name:"Ice Velvet 0089",accent:"#4055e7",bg:"#100c15",surface:"#201f33",text:"#f7f6f3"},
    {id:"atelier-original-0090",name:"Violet Velvet 0090",accent:"#912812",bg:"#eeeae4",surface:"#fdfcfc",text:"#223535"},
    {id:"atelier-original-0091",name:"Moss Velvet 0091",accent:"#7ccba0",bg:"#12191a",surface:"#243d34",text:"#f7f3f5"},
    {id:"atelier-original-0092",name:"Ruby Velvet 0092",accent:"#733687",bg:"#f5edf3",surface:"#fdfcfd",text:"#2a3522"},
    {id:"atelier-original-0093",name:"Coral Velvet 0093",accent:"#d7d9a0",bg:"#1d2618",surface:"#3f462a",text:"#f3f3f7"},
    {id:"atelier-original-0094",name:"Ultramarine Velvet 0094",accent:"#468caf",bg:"#f4f5f8",surface:"#fcfcfd",text:"#352522"},
    {id:"atelier-original-0095",name:"Lilac Velvet 0095",accent:"#c26688",bg:"#150e0c",surface:"#331f22",text:"#f3f7f5"},
    {id:"atelier-original-0096",name:"Denim Velvet 0096",accent:"#34752f",bg:"#e3f0e8",surface:"#fcfdfc",text:"#302235"},
    {id:"atelier-original-0097",name:"Peach Velvet 0097",accent:"#7858ee",bg:"#18111a",surface:"#2e243d",text:"#f6f7f3"},
    {id:"atelier-original-0098",name:"Tangerine Velvet 0098",accent:"#ac5f11",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222e35"},
    {id:"atelier-original-0099",name:"Chartreuse Velvet 0099",accent:"#86f3dd",bg:"#172026",surface:"#2a4646",text:"#f7f3f4"},
    {id:"atelier-original-0100",name:"Petrol Velvet 0100",accent:"#df16cd",bg:"#f9f3f6",surface:"#fdfcfd",text:"#233522"},
    {id:"atelier-original-0101",name:"Olive Velvet 0101",accent:"#a9ec3c",bg:"#0e140d",surface:"#27331f",text:"#f4f3f7"},
    {id:"atelier-original-0102",name:"Rosewood Velvet 0102",accent:"#0f3b95",bg:"#e6e4ee",surface:"#fcfcfd",text:"#352b22"},
    {id:"atelier-original-0103",name:"Lime Velvet 0103",accent:"#d37377",bg:"#1b1611",surface:"#3d2824",text:"#f3f7f6"},
    {id:"atelier-original-0104",name:"Fuchsia Velvet 0104",accent:"#2d8f46",bg:"#edf5f3",surface:"#fcfdfc",text:"#352233"},
    {id:"atelier-original-0105",name:"Periwinkle Velvet 0105",accent:"#c09adf",bg:"#271625",surface:"#3f2a46",text:"#f5f7f3"},
    {id:"atelier-original-0106",name:"Cherry Velvet 0106",accent:"#baa63b",bg:"#f7f8f4",surface:"#fdfdfc",text:"#222835"},
    {id:"atelier-original-0107",name:"Cerulean Velvet 0107",accent:"#5cbdcc",bg:"#0d0f14",surface:"#1f2c33",text:"#f7f4f3"},
    {id:"atelier-original-0108",name:"Pistachio Velvet 0108",accent:"#7c2758",bg:"#f0e3e5",surface:"#fdfcfc",text:"#223527"},
    {id:"atelier-original-0109",name:"Lagoon Velvet 0109",accent:"#88e265",bg:"#101b13",surface:"#263d24",text:"#f6f3f7"},
    {id:"atelier-original-0110",name:"Bronze Velvet 0110",accent:"#1f1e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353222"},
    {id:"atelier-original-0111",name:"Vermilion Velvet 0111",accent:"#eaaa90",bg:"#242319",surface:"#46382a",text:"#f3f6f7"},
    {id:"atelier-original-0112",name:"Saffron Velvet 0112",accent:"#27ce89",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222d"},
    {id:"atelier-original-0113",name:"Mint Velvet 0113",accent:"#cb4bdd",bg:"#140d11",surface:"#331f31",text:"#f3f7f3"},
    {id:"atelier-original-0114",name:"Cyan Velvet 0114",accent:"#76891a",bg:"#e8eee4",surface:"#fcfdfc",text:"#222235"},
    {id:"atelier-original-0115",name:"Orchid Velvet 0115",accent:"#6ea7d8",bg:"#10101c",surface:"#242c3d",text:"#f7f5f3"},
    {id:"atelier-original-0116",name:"Garnet Velvet 0116",accent:"#952842",bg:"#f5efed",surface:"#fdfcfc",text:"#22352d"},
    {id:"atelier-original-0117",name:"Copper Velvet 0117",accent:"#96e39a",bg:"#182520",surface:"#2a4631",text:"#f7f3f6"},
    {id:"atelier-original-0118",name:"Jade Velvet 0118",accent:"#6433c1",bg:"#f7f4f8",surface:"#fdfcfd",text:"#323522"},
    {id:"atelier-original-0119",name:"Aqua Velvet 0119",accent:"#d2a456",bg:"#13150c",surface:"#33301f",text:"#f3f4f7"},
    {id:"atelier-original-0120",name:"Mulberry Velvet 0120",accent:"#22817a",bg:"#e3ebf0",surface:"#fcfdfd",text:"#352226"},
    {id:"atelier-original-0121",name:"Jade Atelier 0121",accent:"#eb5ccc",bg:"#1a1213",surface:"#3d2432",text:"#f3f7f4"},
    {id:"atelier-original-0122",name:"Aqua Atelier 0122",accent:"#5da815",bg:"#eef4ee",surface:"#fcfdfc",text:"#282235"},
    {id:"atelier-original-0123",name:"Mulberry Atelier 0123",accent:"#899ef0",bg:"#1d1826",surface:"#2a2a46",text:"#f7f6f3"},
    {id:"atelier-original-0124",name:"Papaya Atelier 0124",accent:"#da2c1b",bg:"#f9f6f3",surface:"#fdfcfc",text:"#223533"},
    {id:"atelier-original-0125",name:"Iris Atelier 0125",accent:"#40e780",bg:"#0c1515",surface:"#1f332a",text:"#f7f3f5"},
    {id:"atelier-original-0126",name:"Teal Atelier 0126",accent:"#681291",bg:"#eee4ed",surface:"#fdfcfd",text:"#2b3522"},
    {id:"atelier-original-0127",name:"Cobalt Atelier 0127",accent:"#cbc87c",bg:"#151a11",surface:"#393d24",text:"#f3f3f7"},
    {id:"atelier-original-0128",name:"Amber Atelier 0128",accent:"#367287",bg:"#edeff5",surface:"#fcfcfd",text:"#352422"},
    {id:"atelier-original-0129",name:"Mustard Atelier 0129",accent:"#d9a0ba",bg:"#261917",surface:"#462a31",text:"#f3f7f5"},
    {id:"atelier-original-0130",name:"Aurora Atelier 0130",accent:"#56af46",bg:"#f4f8f5",surface:"#fcfdfc",text:"#2f2235"},
    {id:"atelier-original-0131",name:"Flamingo Atelier 0131",accent:"#7266c2",bg:"#120d14",surface:"#251f33",text:"#f6f7f3"},
    {id:"atelier-original-0132",name:"Ice Atelier 0132",accent:"#754c2f",bg:"#f0eee3",surface:"#fdfdfc",text:"#223035"},
    {id:"atelier-original-0133",name:"Violet Atelier 0133",accent:"#58eec4",bg:"#11181b",surface:"#243d3b",text:"#f7f3f4"},
    {id:"atelier-original-0134",name:"Moss Atelier 0134",accent:"#ac11aa",bg:"#f4eef1",surface:"#fdfcfd",text:"#253522"},
    {id:"atelier-original-0135",name:"Ruby Atelier 0135",accent:"#d2f386",bg:"#182716",surface:"#38462a",text:"#f4f3f7"},
    {id:"atelier-original-0136",name:"Coral Atelier 0136",accent:"#1668df",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352a22"},
    {id:"atelier-original-0137",name:"Ultramarine Atelier 0137",accent:"#ec3c50",bg:"#14100d",surface:"#33201f",text:"#f3f7f6"},
    {id:"atelier-original-0138",name:"Lilac Atelier 0138",accent:"#0f9526",bg:"#e4eeeb",surface:"#fcfdfc",text:"#352235"},
    {id:"atelier-original-0139",name:"Denim Atelier 0139",accent:"#a073d3",bg:"#1b101b",surface:"#35243d",text:"#f5f7f3"},
    {id:"atelier-original-0140",name:"Peach Atelier 0140",accent:"#8f782d",bg:"#f3f5ed",surface:"#fdfdfc",text:"#222a35"},
    {id:"atelier-original-0141",name:"Tangerine Atelier 0141",accent:"#9adcdf",bg:"#191d24",surface:"#2a3f46",text:"#f7f3f3"},
    {id:"atelier-original-0142",name:"Chartreuse Atelier 0142",accent:"#ba3b8e",bg:"#f8f4f5",surface:"#fdfcfc",text:"#223525"},
    {id:"atelier-original-0143",name:"Petrol Atelier 0143",accent:"#85cc5c",bg:"#0d140e",surface:"#22331f",text:"#f5f3f7"},
    {id:"atelier-original-0144",name:"Olive Atelier 0144",accent:"#272d7c",bg:"#e8e3f0",surface:"#fcfcfd",text:"#353022"},
    {id:"atelier-original-0145",name:"Rosewood Atelier 0145",accent:"#e28065",bg:"#1c1910",surface:"#3d2e24",text:"#f3f6f7"},
    {id:"atelier-original-0146",name:"Lime Atelier 0146",accent:"#1e9f60",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222e"},
    {id:"atelier-original-0147",name:"Fuchsia Atelier 0147",accent:"#d890ea",bg:"#251820",surface:"#462a46",text:"#f4f7f3"},
    {id:"atelier-original-0148",name:"Periwinkle Atelier 0148",accent:"#bece27",bg:"#f6f9f3",surface:"#fdfdfc",text:"#222335"},
    {id:"atelier-original-0149",name:"Cherry Atelier 0149",accent:"#4ba4dd",bg:"#0c0d15",surface:"#1f2733",text:"#f7f4f3"},
    {id:"atelier-original-0150",name:"Cerulean Atelier 0150",accent:"#891a3e",bg:"#eee6e4",surface:"#fdfcfc",text:"#22352c"},
    {id:"atelier-original-0151",name:"Pistachio Atelier 0151",accent:"#71d86e",bg:"#121a16",surface:"#243d28",text:"#f6f3f7"},
    {id:"atelier-original-0152",name:"Lagoon Atelier 0152",accent:"#442895",bg:"#f3edf5",surface:"#fcfcfd",text:"#333522"},
    {id:"atelier-original-0153",name:"Bronze Atelier 0153",accent:"#e3c196",bg:"#242618",surface:"#463f2a",text:"#f3f5f7"},
    {id:"atelier-original-0154",name:"Vermilion Atelier 0154",accent:"#33c1ab",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352228"},
    {id:"atelier-original-0155",name:"Saffron Atelier 0155",accent:"#d256c1",bg:"#150c0f",surface:"#331f2c",text:"#f3f7f4"},
    {id:"atelier-original-0156",name:"Mint Atelier 0156",accent:"#588122",bg:"#e4f0e3",surface:"#fcfdfc",text:"#272235"},
    {id:"atelier-original-0157",name:"Cyan Atelier 0157",accent:"#5c84eb",bg:"#14111a",surface:"#24263d",text:"#f7f6f3"},
    {id:"atelier-original-0158",name:"Orchid Atelier 0158",accent:"#a81715",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223532"},
    {id:"atelier-original-0159",name:"Garnet Atelier 0159",accent:"#89f0a8",bg:"#172625",surface:"#2a4638",text:"#f7f3f5"},
    {id:"atelier-original-0160",name:"Copper Atelier 0160",accent:"#8d1bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2d3522"},
    {id:"atelier-original-0161",name:"Orchid Dusk 0161",accent:"#e7d540",bg:"#11140d",surface:"#31331f",text:"#f3f3f7"},
    {id:"atelier-original-0162",name:"Garnet Dusk 0162",accent:"#127a91",bg:"#e4e8ee",surface:"#fcfcfd",text:"#352222"},
    {id:"atelier-original-0163",name:"Copper Dusk 0163",accent:"#cb7ca5",bg:"#1b1111",surface:"#3d242c",text:"#f3f7f5"},
    {id:"atelier-original-0164",name:"Jade Dusk 0164",accent:"#498736",bg:"#edf5ef",surface:"#fcfdfc",text:"#2d2235"},
    {id:"atelier-original-0165",name:"Aqua Dusk 0165",accent:"#a3a0d9",bg:"#211627",surface:"#312a46",text:"#f6f7f3"},
    {id:"atelier-original-0166",name:"Mulberry Dusk 0166",accent:"#af6a46",bg:"#f8f7f4",surface:"#fdfdfc",text:"#223135"},
    {id:"atelier-original-0167",name:"Papaya Dusk 0167",accent:"#66c2a1",bg:"#0d1314",surface:"#1f3330",text:"#f7f3f4"},
    {id:"atelier-original-0168",name:"Iris Dusk 0168",accent:"#702f75",bg:"#f0e3eb",surface:"#fdfcfd",text:"#263522"},
    {id:"atelier-original-0169",name:"Teal Dusk 0169",accent:"#cdee58",bg:"#121b10",surface:"#323d24",text:"#f4f3f7"},
    {id:"atelier-original-0170",name:"Cobalt Dusk 0170",accent:"#115cac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352822"},
    {id:"atelier-original-0171",name:"Amber Dusk 0171",accent:"#f3869b",bg:"#241d19",surface:"#462a2a",text:"#f3f7f6"},
    {id:"atelier-original-0172",name:"Mustard Dusk 0172",accent:"#16df2a",bg:"#f3f9f6",surface:"#fcfdfc",text:"#342235"},
    {id:"atelier-original-0173",name:"Aurora Dusk 0173",accent:"#813cec",bg:"#140d14",surface:"#2b1f33",text:"#f5f7f3"},
    {id:"atelier-original-0174",name:"Flamingo Dusk 0174",accent:"#956a0f",bg:"#edeee4",surface:"#fdfdfc",text:"#222b35"},
    {id:"atelier-original-0175",name:"Ice Dusk 0175",accent:"#73d3d0",bg:"#10151c",surface:"#24383d",text:"#f7f3f3"},
    {id:"atelier-original-0176",name:"Violet Dusk 0176",accent:"#8f2d75",bg:"#f5edef",surface:"#fdfcfc",text:"#223524"},
    {id:"atelier-original-0177",name:"Moss Dusk 0177",accent:"#b9df9a",bg:"#18251a",surface:"#31462a",text:"#f5f3f7"},
    {id:"atelier-original-0178",name:"Ruby Dusk 0178",accent:"#3b4eba",bg:"#f5f4f8",surface:"#fcfcfd",text:"#352f22"},
    {id:"atelier-original-0179",name:"Coral Dusk 0179",accent:"#cc6c5c",bg:"#15120c",surface:"#33261f",text:"#f3f6f7"},
    {id:"atelier-original-0180",name:"Ultramarine Dusk 0180",accent:"#277c4c",bg:"#e3f0ee",surface:"#fcfdfd",text:"#352230"},
    {id:"atelier-original-0181",name:"Lilac Dusk 0181",accent:"#bf65e2",bg:"#1a1217",surface:"#3b243d",text:"#f4f7f3"},
    {id:"atelier-original-0182",name:"Denim Dusk 0182",accent:"#9c9f1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222535"},
    {id:"atelier-original-0183",name:"Peach Dusk 0183",accent:"#90ceea",bg:"#181926",surface:"#2a3846",text:"#f7f4f3"},
    {id:"atelier-original-0184",name:"Tangerine Dusk 0184",accent:"#ce276a",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352a"},
    {id:"atelier-original-0185",name:"Chartreuse Dusk 0185",accent:"#5bdd4b",bg:"#0c1510",surface:"#1f3320",text:"#f6f3f7"},
    {id:"atelier-original-0186",name:"Petrol Dusk 0186",accent:"#2e1a89",bg:"#ebe4ee",surface:"#fcfcfd",text:"#353522"},
    {id:"atelier-original-0187",name:"Olive Dusk 0187",accent:"#d8a16e",bg:"#1a1a11",surface:"#3d3524",text:"#f3f5f7"},
    {id:"atelier-original-0188",name:"Rosewood Dusk 0188",accent:"#28957c",bg:"#edf3f5",surface:"#fcfdfd",text:"#352229"},
    {id:"atelier-original-0189",name:"Lime Dusk 0189",accent:"#e396df",bg:"#26171c",surface:"#462a3f",text:"#f3f7f3"},
    {id:"atelier-original-0190",name:"Fuchsia Dusk 0190",accent:"#90c133",bg:"#f5f8f4",surface:"#fcfdfc",text:"#252235"},
    {id:"atelier-original-0191",name:"Periwinkle Dusk 0191",accent:"#5682d2",bg:"#0f0d14",surface:"#1f2233",text:"#f7f5f3"},
    {id:"atelier-original-0192",name:"Cherry Dusk 0192",accent:"#812229",bg:"#f0e8e3",surface:"#fdfcfc",text:"#223530"},
    {id:"atelier-original-0193",name:"Cerulean Dusk 0193",accent:"#5ceb7c",bg:"#111b19",surface:"#243d2f",text:"#f7f3f6"},
    {id:"atelier-original-0194",name:"Pistachio Dusk 0194",accent:"#6115a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2e3522"},
    {id:"atelier-original-0195",name:"Lagoon Dusk 0195",accent:"#f0dd89",bg:"#202716",surface:"#46462a",text:"#f3f4f7"},
    {id:"atelier-original-0196",name:"Bronze Dusk 0196",accent:"#1bc7da",bg:"#f3f6f9",surface:"#fcfdfd",text:"#352223"},
    {id:"atelier-original-0197",name:"Vermilion Dusk 0197",accent:"#e740a6",bg:"#140d0d",surface:"#331f27",text:"#f3f7f4"},
    {id:"atelier-original-0198",name:"Saffron Dusk 0198",accent:"#3a9112",bg:"#e4eee6",surface:"#fcfdfc",text:"#2c2235"},
    {id:"atelier-original-0199",name:"Mint Dusk 0199",accent:"#7c7ecb",bg:"#16101b",surface:"#29243d",text:"#f7f6f3"},
    {id:"atelier-original-0200",name:"Cyan Dusk 0200",accent:"#874c36",bg:"#f5f3ed",surface:"#fdfcfc",text:"#223335"},
    {id:"atelier-original-0201",name:"Saffron Daylight 0201",accent:"#a0d9c0",bg:"#192324",surface:"#2a463f",text:"#f7f3f5"},
    {id:"atelier-original-0202",name:"Mint Daylight 0202",accent:"#9f46af",bg:"#f8f4f7",surface:"#fdfcfd",text:"#283522"},
    {id:"atelier-original-0203",name:"Cyan Daylight 0203",accent:"#b5c266",bg:"#0f140d",surface:"#2c331f",text:"#f4f3f7"},
    {id:"atelier-original-0204",name:"Orchid Daylight 0204",accent:"#2f5675",bg:"#e3e4f0",surface:"#fcfcfd",text:"#352722"},
    {id:"atelier-original-0205",name:"Garnet Daylight 0205",accent:"#ee5881",bg:"#1c1310",surface:"#3d2426",text:"#f3f7f6"},
    {id:"atelier-original-0206",name:"Copper Daylight 0206",accent:"#11ac14",bg:"#eef4f1",surface:"#fcfdfc",text:"#322235"},
    {id:"atelier-original-0207",name:"Jade Daylight 0207",accent:"#a886f3",bg:"#241825",surface:"#382a46",text:"#f5f7f3"},
    {id:"atelier-original-0208",name:"Aqua Daylight 0208",accent:"#df8f16",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222d35"},
    {id:"atelier-original-0209",name:"Mulberry Daylight 0209",accent:"#3cecd9",bg:"#0c1115",surface:"#1f3133",text:"#f7f3f3"},
    {id:"atelier-original-0210",name:"Papaya Daylight 0210",accent:"#950f7c",bg:"#eee4e8",surface:"#fdfcfc",text:"#223522"},
    {id:"atelier-original-0211",name:"Iris Daylight 0211",accent:"#a5d373",bg:"#121a12",surface:"#2c3d24",text:"#f5f3f7"},
    {id:"atelier-original-0212",name:"Teal Daylight 0212",accent:"#2d448f",bg:"#efedf5",surface:"#fcfcfd",text:"#352d22"},
    {id:"atelier-original-0213",name:"Cobalt Daylight 0213",accent:"#df9e9a",bg:"#262118",surface:"#46312a",text:"#f3f6f7"},
    {id:"atelier-original-0214",name:"Amber Daylight 0214",accent:"#3bba68",bg:"#f4f8f7",surface:"#fcfdfd",text:"#352231"},
    {id:"atelier-original-0215",name:"Mustard Daylight 0215",accent:"#a45ccc",bg:"#150c13",surface:"#301f33",text:"#f4f7f3"},
    {id:"atelier-original-0216",name:"Aurora Daylight 0216",accent:"#7c7727",bg:"#ebf0e3",surface:"#fdfdfc",text:"#222635"},
    {id:"atelier-original-0217",name:"Flamingo Daylight 0217",accent:"#65c5e2",bg:"#11131a",surface:"#24323d",text:"#f7f4f3"},
    {id:"atelier-original-0218",name:"Ice Daylight 0218",accent:"#9f1e5c",bg:"#f4eeee",surface:"#fdfcfc",text:"#223529"},
    {id:"atelier-original-0219",name:"Violet Daylight 0219",accent:"#a1ea90",bg:"#17261d",surface:"#2a462a",text:"#f6f3f7"},
    {id:"atelier-original-0220",name:"Moss Daylight 0220",accent:"#3927ce",bg:"#f6f3f9",surface:"#fcfcfd",text:"#353422"},
    {id:"atelier-original-0221",name:"Ruby Daylight 0221",accent:"#dd854b",bg:"#14140d",surface:"#332b1f",text:"#f3f5f7"},
    {id:"atelier-original-0222",name:"Coral Daylight 0222",accent:"#1a8966",bg:"#e4edee",surface:"#fcfdfd",text:"#35222b"},
    {id:"atelier-original-0223",name:"Ultramarine Daylight 0223",accent:"#d66ed8",bg:"#1b1115",surface:"#3d2438",text:"#f3f7f3"},
    {id:"atelier-original-0224",name:"Lilac Daylight 0224",accent:"#779528",bg:"#eff5ed",surface:"#fcfdfc",text:"#242235"},
    {id:"atelier-original-0225",name:"Denim Daylight 0225",accent:"#96b8e3",bg:"#191627",surface:"#2a3146",text:"#f7f5f3"},
    {id:"atelier-original-0226",name:"Peach Daylight 0226",accent:"#c13348",bg:"#f8f5f4",surface:"#fdfcfc",text:"#22352f"},
    {id:"atelier-original-0227",name:"Tangerine Daylight 0227",accent:"#56d268",bg:"#0d1412",surface:"#1f3326",text:"#f7f3f6"},
    {id:"atelier-original-0228",name:"Chartreuse Daylight 0228",accent:"#4c2281",bg:"#eee3f0",surface:"#fdfcfd",text:"#303522"},
    {id:"atelier-original-0229",name:"Petrol Daylight 0229",accent:"#ebc45c",bg:"#181b10",surface:"#3d3b24",text:"#f3f4f7"},
    {id:"atelier-original-0230",name:"Olive Daylight 0230",accent:"#15a5a8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352225"},
    {id:"atelier-original-0231",name:"Rosewood Daylight 0231",accent:"#f089d0",bg:"#24191a",surface:"#462a38",text:"#f3f7f4"},
    {id:"atelier-original-0232",name:"Lime Daylight 0232",accent:"#66da1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2a2235"},
    {id:"atelier-original-0233",name:"Fuchsia Daylight 0233",accent:"#4051e7",bg:"#100d14",surface:"#211f33",text:"#f7f6f3"},
    {id:"atelier-original-0234",name:"Periwinkle Daylight 0234",accent:"#912a12",bg:"#eeebe4",surface:"#fdfcfc",text:"#223435"},
    {id:"atelier-original-0235",name:"Cherry Daylight 0235",accent:"#7ccba2",bg:"#101b1c",surface:"#243d35",text:"#f7f3f5"},
    {id:"atelier-original-0236",name:"Cerulean Daylight 0236",accent:"#753687",bg:"#f5edf3",surface:"#fdfcfd",text:"#293522"},
    {id:"atelier-original-0237",name:"Pistachio Daylight 0237",accent:"#d6d9a0",bg:"#1d2518",surface:"#3f462a",text:"#f3f3f7"},
    {id:"atelier-original-0238",name:"Lagoon Daylight 0238",accent:"#4689af",bg:"#f4f5f8",surface:"#fcfcfd",text:"#352522"},
    {id:"atelier-original-0239",name:"Bronze Daylight 0239",accent:"#c26686",bg:"#150e0c",surface:"#331f22",text:"#f3f7f5"},
    {id:"atelier-original-0240",name:"Vermilion Daylight 0240",accent:"#33752f",bg:"#e3f0e8",surface:"#fcfdfc",text:"#312235"},
    {id:"atelier-original-0241",name:"Lagoon Midnight 0241",accent:"#7b58ee",bg:"#18121a",surface:"#2f243d",text:"#f6f7f3"},
    {id:"atelier-original-0242",name:"Bronze Midnight 0242",accent:"#ac6211",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222e35"},
    {id:"atelier-original-0243",name:"Vermilion Midnight 0243",accent:"#86f3df",bg:"#182026",surface:"#2a4646",text:"#f7f3f4"},
    {id:"atelier-original-0244",name:"Saffron Midnight 0244",accent:"#df16c9",bg:"#f9f3f6",surface:"#fdfcfd",text:"#233522"},
    {id:"atelier-original-0245",name:"Mint Midnight 0245",accent:"#a6ec3c",bg:"#0c150c",surface:"#27331f",text:"#f4f3f7"},
    {id:"atelier-original-0246",name:"Cyan Midnight 0246",accent:"#0f3895",bg:"#e6e4ee",surface:"#fcfcfd",text:"#352c22"},
    {id:"atelier-original-0247",name:"Orchid Midnight 0247",accent:"#d37375",bg:"#1a1611",surface:"#3d2924",text:"#f3f7f6"},
    {id:"atelier-original-0248",name:"Garnet Midnight 0248",accent:"#2d8f48",bg:"#edf5f3",surface:"#fcfdfc",text:"#352233"},
    {id:"atelier-original-0249",name:"Copper Midnight 0249",accent:"#c19adf",bg:"#261724",surface:"#402a46",text:"#f5f7f3"},
    {id:"atelier-original-0250",name:"Jade Midnight 0250",accent:"#baa83b",bg:"#f7f8f4",surface:"#fdfdfc",text:"#222835"},
    {id:"atelier-original-0251",name:"Aqua Midnight 0251",accent:"#5cbbcc",bg:"#0d0f14",surface:"#1f2c33",text:"#f7f4f3"},
    {id:"atelier-original-0252",name:"Mulberry Midnight 0252",accent:"#7c2757",bg:"#f0e3e4",surface:"#fdfcfc",text:"#223527"},
    {id:"atelier-original-0253",name:"Papaya Midnight 0253",accent:"#86e265",bg:"#111b14",surface:"#263d24",text:"#f6f3f7"},
    {id:"atelier-original-0254",name:"Iris Midnight 0254",accent:"#211e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353222"},
    {id:"atelier-original-0255",name:"Teal Midnight 0255",accent:"#eaac90",bg:"#272516",surface:"#46392a",text:"#f3f5f7"},
    {id:"atelier-original-0256",name:"Cobalt Midnight 0256",accent:"#27ce8d",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222c"},
    {id:"atelier-original-0257",name:"Amber Midnight 0257",accent:"#ce4bdd",bg:"#140d11",surface:"#331f31",text:"#f3f7f3"},
    {id:"atelier-original-0258",name:"Mustard Midnight 0258",accent:"#74891a",bg:"#e8eee4",surface:"#fcfdfc",text:"#222235"},
    {id:"atelier-original-0259",name:"Aurora Midnight 0259",accent:"#6ea5d8",bg:"#11101b",surface:"#242c3d",text:"#f7f5f3"},
    {id:"atelier-original-0260",name:"Flamingo Midnight 0260",accent:"#952840",bg:"#f5efed",surface:"#fdfcfc",text:"#22352d"},
    {id:"atelier-original-0261",name:"Ice Midnight 0261",accent:"#96e39b",bg:"#192420",surface:"#2a4632",text:"#f7f3f6"},
    {id:"atelier-original-0262",name:"Violet Midnight 0262",accent:"#6633c1",bg:"#f7f4f8",surface:"#fdfcfd",text:"#313522"},
    {id:"atelier-original-0263",name:"Moss Midnight 0263",accent:"#d2a756",bg:"#13140d",surface:"#33301f",text:"#f3f4f7"},
    {id:"atelier-original-0264",name:"Ruby Midnight 0264",accent:"#22817c",bg:"#e3ebf0",surface:"#fcfdfd",text:"#352226"},
    {id:"atelier-original-0265",name:"Coral Midnight 0265",accent:"#eb5cc9",bg:"#1c1012",surface:"#3d2432",text:"#f3f7f4"},
    {id:"atelier-original-0266",name:"Ultramarine Midnight 0266",accent:"#5aa815",bg:"#eef4ee",surface:"#fcfdfc",text:"#292235"},
    {id:"atelier-original-0267",name:"Lilac Midnight 0267",accent:"#899cf0",bg:"#1d1825",surface:"#2b2a46",text:"#f7f6f3"},
    {id:"atelier-original-0268",name:"Denim Midnight 0268",accent:"#da301b",bg:"#f9f6f3",surface:"#fdfcfc",text:"#223534"},
    {id:"atelier-original-0269",name:"Peach Midnight 0269",accent:"#40e784",bg:"#0c1515",surface:"#1f332b",text:"#f7f3f5"},
    {id:"atelier-original-0270",name:"Tangerine Midnight 0270",accent:"#6a1291",bg:"#eee4ed",surface:"#fdfcfd",text:"#2b3522"},
    {id:"atelier-original-0271",name:"Chartreuse Midnight 0271",accent:"#cbca7c",bg:"#151a12",surface:"#383d24",text:"#f3f3f7"},
    {id:"atelier-original-0272",name:"Petrol Midnight 0272",accent:"#367087",bg:"#edeff5",surface:"#fcfcfd",text:"#352422"},
    {id:"atelier-original-0273",name:"Olive Midnight 0273",accent:"#d9a0b9",bg:"#261a18",surface:"#462a31",text:"#f3f7f5"},
    {id:"atelier-original-0274",name:"Rosewood Midnight 0274",accent:"#54af46",bg:"#f4f8f5",surface:"#fcfdfc",text:"#2f2235"},
    {id:"atelier-original-0275",name:"Lime Midnight 0275",accent:"#7466c2",bg:"#130c15",surface:"#261f33",text:"#f6f7f3"},
    {id:"atelier-original-0276",name:"Fuchsia Midnight 0276",accent:"#754e2f",bg:"#f0eee3",surface:"#fdfdfc",text:"#223035"},
    {id:"atelier-original-0277",name:"Periwinkle Midnight 0277",accent:"#58eec7",bg:"#11171a",surface:"#243d3b",text:"#f7f3f4"},
    {id:"atelier-original-0278",name:"Cherry Midnight 0278",accent:"#ac11a7",bg:"#f4eef1",surface:"#fdfcfd",text:"#243522"},
    {id:"atelier-original-0279",name:"Cerulean Midnight 0279",accent:"#d0f386",bg:"#182617",surface:"#38462a",text:"#f4f3f7"},
    {id:"atelier-original-0280",name:"Pistachio Midnight 0280",accent:"#1664df",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352a22"},
    {id:"atelier-original-0281",name:"Cherry Silk 0281",accent:"#ec3c4d",bg:"#14100d",surface:"#33211f",text:"#f3f7f6"},
    {id:"atelier-original-0282",name:"Cerulean Silk 0282",accent:"#0f9529",bg:"#e4eeeb",surface:"#fcfdfc",text:"#352234"},
    {id:"atelier-original-0283",name:"Pistachio Silk 0283",accent:"#a273d3",bg:"#1b111a",surface:"#35243d",text:"#f5f7f3"},
    {id:"atelier-original-0284",name:"Lagoon Silk 0284",accent:"#8f7a2d",bg:"#f3f5ed",surface:"#fdfdfc",text:"#222935"},
    {id:"atelier-original-0285",name:"Bronze Silk 0285",accent:"#9adadf",bg:"#161c27",surface:"#2a3f46",text:"#f7f3f3"},
    {id:"atelier-original-0286",name:"Vermilion Silk 0286",accent:"#ba3b8c",bg:"#f8f4f5",surface:"#fdfcfc",text:"#223526"},
    {id:"atelier-original-0287",name:"Saffron Silk 0287",accent:"#83cc5c",bg:"#0d140f",surface:"#22331f",text:"#f5f3f7"},
    {id:"atelier-original-0288",name:"Mint Silk 0288",accent:"#272c7c",bg:"#e8e3f0",surface:"#fcfcfd",text:"#353122"},
    {id:"atelier-original-0289",name:"Cyan Silk 0289",accent:"#e28365",bg:"#1b1910",surface:"#3d2f24",text:"#f3f6f7"},
    {id:"atelier-original-0290",name:"Orchid Silk 0290",accent:"#1e9f62",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222e"},
    {id:"atelier-original-0291",name:"Garnet Silk 0291",accent:"#da90ea",bg:"#241920",surface:"#462a46",text:"#f4f7f3"},
    {id:"atelier-original-0292",name:"Copper Silk 0292",accent:"#bbce27",bg:"#f6f9f3",surface:"#fdfdfc",text:"#222335"},
    {id:"atelier-original-0293",name:"Jade Silk 0293",accent:"#4ba2dd",bg:"#0d0d14",surface:"#1f2733",text:"#f7f4f3"},
    {id:"atelier-original-0294",name:"Aqua Silk 0294",accent:"#891a3c",bg:"#eee6e4",surface:"#fdfcfc",text:"#22352c"},
    {id:"atelier-original-0295",name:"Mulberry Silk 0295",accent:"#6fd86e",bg:"#101c17",surface:"#243d29",text:"#f6f3f7"},
    {id:"atelier-original-0296",name:"Papaya Silk 0296",accent:"#462895",bg:"#f3edf5",surface:"#fcfcfd",text:"#333522"},
    {id:"atelier-original-0297",name:"Iris Silk 0297",accent:"#e3c296",bg:"#232518",surface:"#46402a",text:"#f3f5f7"},
    {id:"atelier-original-0298",name:"Teal Silk 0298",accent:"#33c1ae",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352228"},
    {id:"atelier-original-0299",name:"Cobalt Silk 0299",accent:"#d256bf",bg:"#150c0f",surface:"#331f2c",text:"#f3f7f4"},
    {id:"atelier-original-0300",name:"Amber Silk 0300",accent:"#578122",bg:"#e4f0e3",surface:"#fcfdfc",text:"#272235"},
    {id:"atelier-original-0301",name:"Mustard Silk 0301",accent:"#5c81eb",bg:"#14121a",surface:"#24263d",text:"#f7f6f3"},
    {id:"atelier-original-0302",name:"Aurora Silk 0302",accent:"#a81915",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223532"},
    {id:"atelier-original-0303",name:"Flamingo Silk 0303",accent:"#89f0aa",bg:"#182624",surface:"#2a4639",text:"#f7f3f5"},
    {id:"atelier-original-0304",name:"Ice Silk 0304",accent:"#901bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2c3522"},
    {id:"atelier-original-0305",name:"Violet Silk 0305",accent:"#e7d840",bg:"#11150c",surface:"#31331f",text:"#f3f3f7"},
    {id:"atelier-original-0306",name:"Moss Silk 0306",accent:"#127891",bg:"#e4e8ee",surface:"#fcfcfd",text:"#352222"},
    {id:"atelier-original-0307",name:"Ruby Silk 0307",accent:"#cb7ca4",bg:"#1a1211",surface:"#3d242c",text:"#f3f7f5"},
    {id:"atelier-original-0308",name:"Coral Silk 0308",accent:"#478736",bg:"#edf5ef",surface:"#fcfdfc",text:"#2e2235"},
    {id:"atelier-original-0309",name:"Ultramarine Silk 0309",accent:"#a4a0d9",bg:"#211726",surface:"#322a46",text:"#f6f7f3"},
    {id:"atelier-original-0310",name:"Lilac Silk 0310",accent:"#af6c46",bg:"#f8f7f4",surface:"#fdfdfc",text:"#223135"},
    {id:"atelier-original-0311",name:"Denim Silk 0311",accent:"#66c2a2",bg:"#0d1214",surface:"#1f3330",text:"#f7f3f4"},
    {id:"atelier-original-0312",name:"Peach Silk 0312",accent:"#712f75",bg:"#f0e3eb",surface:"#fdfcfd",text:"#263522"},
    {id:"atelier-original-0313",name:"Tangerine Silk 0313",accent:"#caee58",bg:"#121b11",surface:"#323d24",text:"#f4f3f7"},
    {id:"atelier-original-0314",name:"Chartreuse Silk 0314",accent:"#1159ac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352922"},
    {id:"atelier-original-0315",name:"Petrol Silk 0315",accent:"#f38699",bg:"#271d16",surface:"#462b2a",text:"#f3f7f6"},
    {id:"atelier-original-0316",name:"Olive Silk 0316",accent:"#16df2e",bg:"#f3f9f6",surface:"#fcfdfc",text:"#342235"},
    {id:"atelier-original-0317",name:"Rosewood Silk 0317",accent:"#843cec",bg:"#140d14",surface:"#2b1f33",text:"#f5f7f3"},
    {id:"atelier-original-0318",name:"Lime Silk 0318",accent:"#956c0f",bg:"#edeee4",surface:"#fdfdfc",text:"#222b35"},
    {id:"atelier-original-0319",name:"Fuchsia Silk 0319",accent:"#73d3d2",bg:"#10151b",surface:"#24383d",text:"#f7f3f3"},
    {id:"atelier-original-0320",name:"Periwinkle Silk 0320",accent:"#8f2d74",bg:"#f5edef",surface:"#fdfcfc",text:"#223524"},
    {id:"atelier-original-0321",name:"Lime Eclipse 0321",accent:"#b7df9a",bg:"#19241b",surface:"#30462a",text:"#f5f3f7"},
    {id:"atelier-original-0322",name:"Fuchsia Eclipse 0322",accent:"#3b4cba",bg:"#f5f4f8",surface:"#fcfcfd",text:"#352f22"},
    {id:"atelier-original-0323",name:"Periwinkle Eclipse 0323",accent:"#cc6e5c",bg:"#14120d",surface:"#33261f",text:"#f3f6f7"},
    {id:"atelier-original-0324",name:"Cherry Eclipse 0324",accent:"#277c4d",bg:"#e3f0ee",surface:"#fcfdfd",text:"#35222f"},
    {id:"atelier-original-0325",name:"Cerulean Eclipse 0325",accent:"#c265e2",bg:"#1c1018",surface:"#3b243d",text:"#f4f7f3"},
    {id:"atelier-original-0326",name:"Pistachio Eclipse 0326",accent:"#9a9f1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222435"},
    {id:"atelier-original-0327",name:"Lagoon Eclipse 0327",accent:"#90ccea",bg:"#181925",surface:"#2a3746",text:"#f7f4f3"},
    {id:"atelier-original-0328",name:"Bronze Eclipse 0328",accent:"#ce2767",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352a"},
    {id:"atelier-original-0329",name:"Vermilion Eclipse 0329",accent:"#58dd4b",bg:"#0c1511",surface:"#1f3321",text:"#f6f3f7"},
    {id:"atelier-original-0330",name:"Saffron Eclipse 0330",accent:"#311a89",bg:"#ebe4ee",surface:"#fcfcfd",text:"#343522"},
    {id:"atelier-original-0331",name:"Mint Eclipse 0331",accent:"#d8a36e",bg:"#191a12",surface:"#3d3524",text:"#f3f5f7"},
    {id:"atelier-original-0332",name:"Cyan Eclipse 0332",accent:"#28957e",bg:"#edf3f5",surface:"#fcfdfd",text:"#352229"},
    {id:"atelier-original-0333",name:"Orchid Eclipse 0333",accent:"#e396dd",bg:"#26181c",surface:"#462a3e",text:"#f3f7f3"},
    {id:"atelier-original-0334",name:"Garnet Eclipse 0334",accent:"#8dc133",bg:"#f5f8f4",surface:"#fcfdfc",text:"#262235"},
    {id:"atelier-original-0335",name:"Copper Eclipse 0335",accent:"#5680d2",bg:"#0e0c15",surface:"#1f2133",text:"#f7f5f3"},
    {id:"atelier-original-0336",name:"Jade Eclipse 0336",accent:"#812227",bg:"#f0e8e3",surface:"#fdfcfc",text:"#223531"},
    {id:"atelier-original-0337",name:"Aqua Eclipse 0337",accent:"#5ceb7f",bg:"#111a19",surface:"#243d2f",text:"#f7f3f6"},
    {id:"atelier-original-0338",name:"Mulberry Eclipse 0338",accent:"#6415a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2e3522"},
    {id:"atelier-original-0339",name:"Papaya Eclipse 0339",accent:"#f0df89",bg:"#202617",surface:"#45462a",text:"#f3f4f7"},
    {id:"atelier-original-0340",name:"Iris Eclipse 0340",accent:"#1bc3da",bg:"#f3f6f9",surface:"#fcfdfd",text:"#352223"},
    {id:"atelier-original-0341",name:"Teal Eclipse 0341",accent:"#e740a3",bg:"#140d0d",surface:"#331f27",text:"#f3f7f4"},
    {id:"atelier-original-0342",name:"Cobalt Eclipse 0342",accent:"#389112",bg:"#e4eee6",surface:"#fcfdfc",text:"#2c2235"},
    {id:"atelier-original-0343",name:"Amber Eclipse 0343",accent:"#7c7ccb",bg:"#16111b",surface:"#29243d",text:"#f7f7f3"},
    {id:"atelier-original-0344",name:"Mustard Eclipse 0344",accent:"#874d36",bg:"#f5f3ed",surface:"#fdfcfc",text:"#223335"},
    {id:"atelier-original-0345",name:"Aurora Eclipse 0345",accent:"#a0d9c1",bg:"#162427",surface:"#2a4640",text:"#f7f3f5"},
    {id:"atelier-original-0346",name:"Flamingo Eclipse 0346",accent:"#a146af",bg:"#f8f4f7",surface:"#fdfcfd",text:"#273522"},
    {id:"atelier-original-0347",name:"Ice Eclipse 0347",accent:"#b3c266",bg:"#0f140d",surface:"#2c331f",text:"#f4f3f7"},
    {id:"atelier-original-0348",name:"Violet Eclipse 0348",accent:"#2f5575",bg:"#e3e4f0",surface:"#fcfcfd",text:"#352722"},
    {id:"atelier-original-0349",name:"Moss Eclipse 0349",accent:"#ee587e",bg:"#1b1410",surface:"#3d2426",text:"#f3f7f6"},
    {id:"atelier-original-0350",name:"Ruby Eclipse 0350",accent:"#11ac17",bg:"#eef4f1",surface:"#fcfdfc",text:"#322235"},
    {id:"atelier-original-0351",name:"Coral Eclipse 0351",accent:"#aa86f3",bg:"#231924",surface:"#392a46",text:"#f5f7f3"},
    {id:"atelier-original-0352",name:"Ultramarine Eclipse 0352",accent:"#df9316",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222c35"},
    {id:"atelier-original-0353",name:"Lilac Eclipse 0353",accent:"#3cecdd",bg:"#0d1114",surface:"#1f3133",text:"#f7f3f3"},
    {id:"atelier-original-0354",name:"Denim Eclipse 0354",accent:"#950f79",bg:"#eee4e8",surface:"#fdfcfc",text:"#223523"},
    {id:"atelier-original-0355",name:"Peach Eclipse 0355",accent:"#a3d373",bg:"#101c11",surface:"#2c3d24",text:"#f5f3f7"},
    {id:"atelier-original-0356",name:"Tangerine Eclipse 0356",accent:"#2d428f",bg:"#efedf5",surface:"#fcfcfd",text:"#352e22"},
    {id:"atelier-original-0357",name:"Chartreuse Eclipse 0357",accent:"#dfa09a",bg:"#252118",surface:"#46322a",text:"#f3f6f7"},
    {id:"atelier-original-0358",name:"Petrol Eclipse 0358",accent:"#3bba6a",bg:"#f4f8f7",surface:"#fcfdfd",text:"#352231"},
    {id:"atelier-original-0359",name:"Olive Eclipse 0359",accent:"#a65ccc",bg:"#150c13",surface:"#301f33",text:"#f4f7f3"},
    {id:"atelier-original-0360",name:"Rosewood Eclipse 0360",accent:"#7c7827",bg:"#ebf0e3",surface:"#fdfdfc",text:"#222635"},
    {id:"atelier-original-0361",name:"Petrol Mist 0361",accent:"#65c3e2",bg:"#12131a",surface:"#24323d",text:"#f7f4f3"},
    {id:"atelier-original-0362",name:"Olive Mist 0362",accent:"#9f1e59",bg:"#f4eeee",surface:"#fdfcfc",text:"#223529"},
    {id:"atelier-original-0363",name:"Rosewood Mist 0363",accent:"#9fea90",bg:"#18261d",surface:"#2a462b",text:"#f6f3f7"},
    {id:"atelier-original-0364",name:"Lime Mist 0364",accent:"#3c27ce",bg:"#f6f3f9",surface:"#fcfcfd",text:"#353422"},
    {id:"atelier-original-0365",name:"Fuchsia Mist 0365",accent:"#dd884b",bg:"#15150c",surface:"#332b1f",text:"#f3f5f7"},
    {id:"atelier-original-0366",name:"Periwinkle Mist 0366",accent:"#1a8969",bg:"#e4edee",surface:"#fcfdfd",text:"#35222b"},
    {id:"atelier-original-0367",name:"Cherry Mist 0367",accent:"#d86ed8",bg:"#1a1115",surface:"#3d2438",text:"#f3f7f3"},
    {id:"atelier-original-0368",name:"Cerulean Mist 0368",accent:"#759528",bg:"#eff5ed",surface:"#fcfdfc",text:"#242235"},
    {id:"atelier-original-0369",name:"Pistachio Mist 0369",accent:"#96b6e3",bg:"#191726",surface:"#2a3046",text:"#f7f5f3"},
    {id:"atelier-original-0370",name:"Lagoon Mist 0370",accent:"#c13345",bg:"#f8f5f4",surface:"#fdfcfc",text:"#22352f"},
    {id:"atelier-original-0371",name:"Bronze Mist 0371",accent:"#56d26a",bg:"#0d1412",surface:"#1f3326",text:"#f7f3f6"},
    {id:"atelier-original-0372",name:"Vermilion Mist 0372",accent:"#4e2281",bg:"#efe3f0",surface:"#fdfcfd",text:"#2f3522"},
    {id:"atelier-original-0373",name:"Saffron Mist 0373",accent:"#ebc75c",bg:"#171b11",surface:"#3d3b24",text:"#f3f4f7"},
    {id:"atelier-original-0374",name:"Mint Mist 0374",accent:"#15a2a8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352224"},
    {id:"atelier-original-0375",name:"Cyan Mist 0375",accent:"#f089ce",bg:"#271618",surface:"#462a37",text:"#f3f7f4"},
    {id:"atelier-original-0376",name:"Orchid Mist 0376",accent:"#63da1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2b2235"},
    {id:"atelier-original-0377",name:"Garnet Mist 0377",accent:"#404ee7",bg:"#110d14",surface:"#211f33",text:"#f7f6f3"},
    {id:"atelier-original-0378",name:"Copper Mist 0378",accent:"#912d12",bg:"#eeebe4",surface:"#fdfcfc",text:"#223435"},
    {id:"atelier-original-0379",name:"Jade Mist 0379",accent:"#7ccba3",bg:"#101a1b",surface:"#243d35",text:"#f7f3f5"},
    {id:"atelier-original-0380",name:"Aqua Mist 0380",accent:"#763687",bg:"#f5edf3",surface:"#fdfcfd",text:"#293522"},
    {id:"atelier-original-0381",name:"Mulberry Mist 0381",accent:"#d4d9a0",bg:"#1d2419",surface:"#3e462a",text:"#f3f3f7"},
    {id:"atelier-original-0382",name:"Papaya Mist 0382",accent:"#4687af",bg:"#f4f5f8",surface:"#fcfcfd",text:"#352622"},
    {id:"atelier-original-0383",name:"Iris Mist 0383",accent:"#c26684",bg:"#140f0d",surface:"#331f21",text:"#f3f7f5"},
    {id:"atelier-original-0384",name:"Teal Mist 0384",accent:"#31752f",bg:"#e3f0e8",surface:"#fcfdfc",text:"#312235"},
    {id:"atelier-original-0385",name:"Cobalt Mist 0385",accent:"#7e58ee",bg:"#1a101c",surface:"#2f243d",text:"#f6f7f3"},
    {id:"atelier-original-0386",name:"Amber Mist 0386",accent:"#ac6511",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222e35"},
    {id:"atelier-original-0387",name:"Mustard Mist 0387",accent:"#86f3e1",bg:"#182025",surface:"#2a4546",text:"#f7f3f4"},
    {id:"atelier-original-0388",name:"Aurora Mist 0388",accent:"#df16c5",bg:"#f9f3f6",surface:"#fdfcfd",text:"#233522"},
    {id:"atelier-original-0389",name:"Flamingo Mist 0389",accent:"#a2ec3c",bg:"#0c150c",surface:"#26331f",text:"#f5f3f7"},
    {id:"atelier-original-0390",name:"Ice Mist 0390",accent:"#0f3595",bg:"#e6e4ee",surface:"#fcfcfd",text:"#352c22"},
    {id:"atelier-original-0391",name:"Violet Mist 0391",accent:"#d37473",bg:"#1a1612",surface:"#3d2924",text:"#f3f7f7"},
    {id:"atelier-original-0392",name:"Moss Mist 0392",accent:"#2d8f4a",bg:"#edf5f3",surface:"#fcfdfc",text:"#352232"},
    {id:"atelier-original-0393",name:"Ruby Mist 0393",accent:"#c39adf",bg:"#261823",surface:"#402a46",text:"#f5f7f3"},
    {id:"atelier-original-0394",name:"Coral Mist 0394",accent:"#baaa3b",bg:"#f7f8f4",surface:"#fdfdfc",text:"#222735"},
    {id:"atelier-original-0395",name:"Ultramarine Mist 0395",accent:"#5cb9cc",bg:"#0c0e15",surface:"#1f2b33",text:"#f7f4f3"},
    {id:"atelier-original-0396",name:"Lilac Mist 0396",accent:"#7c2755",bg:"#f0e3e4",surface:"#fdfcfc",text:"#223527"},
    {id:"atelier-original-0397",name:"Denim Mist 0397",accent:"#84e265",bg:"#111a14",surface:"#253d24",text:"#f6f3f7"},
    {id:"atelier-original-0398",name:"Peach Mist 0398",accent:"#241e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353322"},
    {id:"atelier-original-0399",name:"Tangerine Mist 0399",accent:"#eaae90",bg:"#262517",surface:"#46392a",text:"#f3f5f7"},
    {id:"atelier-original-0400",name:"Chartreuse Mist 0400",accent:"#27ce90",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222c"},
    {id:"atelier-original-0401",name:"Peach Ink 0401",accent:"#d14bdd",bg:"#140d11",surface:"#331f31",text:"#f3f7f3"},
    {id:"atelier-original-0402",name:"Tangerine Ink 0402",accent:"#72891a",bg:"#e8eee4",surface:"#fcfdfc",text:"#232235"},
    {id:"atelier-original-0403",name:"Chartreuse Ink 0403",accent:"#6ea3d8",bg:"#12111b",surface:"#242c3d",text:"#f7f5f3"},
    {id:"atelier-original-0404",name:"Petrol Ink 0404",accent:"#95283e",bg:"#f5efed",surface:"#fdfcfc",text:"#22352e"},
    {id:"atelier-original-0405",name:"Olive Ink 0405",accent:"#96e39d",bg:"#162721",surface:"#2a4632",text:"#f7f3f6"},
    {id:"atelier-original-0406",name:"Rosewood Ink 0406",accent:"#6933c1",bg:"#f7f4f8",surface:"#fdfcfd",text:"#313522"},
    {id:"atelier-original-0407",name:"Lime Ink 0407",accent:"#d2a956",bg:"#12140d",surface:"#33301f",text:"#f3f4f7"},
    {id:"atelier-original-0408",name:"Fuchsia Ink 0408",accent:"#22817d",bg:"#e3eaf0",surface:"#fcfdfd",text:"#352226"},
    {id:"atelier-original-0409",name:"Periwinkle Ink 0409",accent:"#eb5cc6",bg:"#1b1012",surface:"#3d2432",text:"#f3f7f4"},
    {id:"atelier-original-0410",name:"Cherry Ink 0410",accent:"#58a815",bg:"#eef4ee",surface:"#fcfdfc",text:"#292235"},
    {id:"atelier-original-0411",name:"Cerulean Ink 0411",accent:"#899af0",bg:"#1e1924",surface:"#2b2a46",text:"#f7f6f3"},
    {id:"atelier-original-0412",name:"Pistachio Ink 0412",accent:"#da341b",bg:"#f9f6f3",surface:"#fdfcfc",text:"#223534"},
    {id:"atelier-original-0413",name:"Lagoon Ink 0413",accent:"#40e787",bg:"#0d1414",surface:"#1f332b",text:"#f7f3f5"},
    {id:"atelier-original-0414",name:"Bronze Ink 0414",accent:"#6d1291",bg:"#eee4ed",surface:"#fdfcfd",text:"#2a3522"},
    {id:"atelier-original-0415",name:"Vermilion Ink 0415",accent:"#cacb7c",bg:"#151c10",surface:"#383d24",text:"#f3f3f7"},
    {id:"atelier-original-0416",name:"Saffron Ink 0416",accent:"#366f87",bg:"#edeff5",surface:"#fcfcfd",text:"#352422"},
    {id:"atelier-original-0417",name:"Mint Ink 0417",accent:"#d9a0b8",bg:"#251a18",surface:"#462a30",text:"#f3f7f5"},
    {id:"atelier-original-0418",name:"Cyan Ink 0418",accent:"#52af46",bg:"#f4f8f5",surface:"#fcfdfc",text:"#2f2235"},
    {id:"atelier-original-0419",name:"Orchid Ink 0419",accent:"#7666c2",bg:"#130c15",surface:"#261f33",text:"#f6f7f3"},
    {id:"atelier-original-0420",name:"Garnet Ink 0420",accent:"#754f2f",bg:"#f0efe3",surface:"#fdfdfc",text:"#222f35"},
    {id:"atelier-original-0421",name:"Copper Ink 0421",accent:"#58eeca",bg:"#12171a",surface:"#243d3b",text:"#f7f3f4"},
    {id:"atelier-original-0422",name:"Jade Ink 0422",accent:"#ac11a4",bg:"#f4eef1",surface:"#fdfcfd",text:"#243522"},
    {id:"atelier-original-0423",name:"Aqua Ink 0423",accent:"#cef386",bg:"#192618",surface:"#37462a",text:"#f4f3f7"},
    {id:"atelier-original-0424",name:"Mulberry Ink 0424",accent:"#1660df",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352b22"},
    {id:"atelier-original-0425",name:"Papaya Ink 0425",accent:"#ec3c4a",bg:"#15110c",surface:"#33211f",text:"#f3f7f6"},
    {id:"atelier-original-0426",name:"Iris Ink 0426",accent:"#0f952b",bg:"#e4eeeb",surface:"#fcfdfc",text:"#352234"},
    {id:"atelier-original-0427",name:"Teal Ink 0427",accent:"#a473d3",bg:"#1a1119",surface:"#35243d",text:"#f5f7f3"},
    {id:"atelier-original-0428",name:"Cobalt Ink 0428",accent:"#8f7c2d",bg:"#f3f5ed",surface:"#fdfdfc",text:"#222935"},
    {id:"atelier-original-0429",name:"Amber Ink 0429",accent:"#9ad9df",bg:"#171c26",surface:"#2a3e46",text:"#f7f3f3"},
    {id:"atelier-original-0430",name:"Mustard Ink 0430",accent:"#ba3b89",bg:"#f8f4f5",surface:"#fdfcfc",text:"#223526"},
    {id:"atelier-original-0431",name:"Aurora Ink 0431",accent:"#81cc5c",bg:"#0d140f",surface:"#21331f",text:"#f5f3f7"},
    {id:"atelier-original-0432",name:"Flamingo Ink 0432",accent:"#272a7c",bg:"#e8e3f0",surface:"#fcfcfd",text:"#353122"},
    {id:"atelier-original-0433",name:"Ice Ink 0433",accent:"#e28565",bg:"#1b1911",surface:"#3d2f24",text:"#f3f6f7"},
    {id:"atelier-original-0434",name:"Violet Ink 0434",accent:"#1e9f65",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222e"},
    {id:"atelier-original-0435",name:"Moss Ink 0435",accent:"#db90ea",bg:"#271620",surface:"#462a45",text:"#f4f7f3"},
    {id:"atelier-original-0436",name:"Ruby Ink 0436",accent:"#b7ce27",bg:"#f6f9f3",surface:"#fdfdfc",text:"#222235"},
    {id:"atelier-original-0437",name:"Coral Ink 0437",accent:"#4b9fdd",bg:"#0d0d14",surface:"#1f2633",text:"#f7f5f3"},
    {id:"atelier-original-0438",name:"Ultramarine Ink 0438",accent:"#891a3a",bg:"#eee6e4",surface:"#fdfcfc",text:"#22352c"},
    {id:"atelier-original-0439",name:"Lilac Ink 0439",accent:"#6ed86f",bg:"#101b17",surface:"#243d29",text:"#f7f3f7"},
    {id:"atelier-original-0440",name:"Denim Ink 0440",accent:"#482895",bg:"#f3edf5",surface:"#fdfcfd",text:"#323522"},
    {id:"atelier-original-0441",name:"Ultramarine Luminous 0441",accent:"#e3c496",bg:"#222419",surface:"#46402a",text:"#f3f4f7"},
    {id:"atelier-original-0442",name:"Lilac Luminous 0442",accent:"#33c1b1",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352227"},
    {id:"atelier-original-0443",name:"Denim Luminous 0443",accent:"#d256bc",bg:"#140d0f",surface:"#331f2b",text:"#f3f7f4"},
    {id:"atelier-original-0444",name:"Peach Luminous 0444",accent:"#558122",bg:"#e4f0e3",surface:"#fcfdfc",text:"#282235"},
    {id:"atelier-original-0445",name:"Tangerine Luminous 0445",accent:"#5c7eeb",bg:"#14101c",surface:"#24253d",text:"#f7f6f3"},
    {id:"atelier-original-0446",name:"Chartreuse Luminous 0446",accent:"#a81c15",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223533"},
    {id:"atelier-original-0447",name:"Petrol Luminous 0447",accent:"#89f0ac",bg:"#182524",surface:"#2a4639",text:"#f7f3f5"},
    {id:"atelier-original-0448",name:"Olive Luminous 0448",accent:"#941bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2c3522"},
    {id:"atelier-original-0449",name:"Rosewood Luminous 0449",accent:"#e7db40",bg:"#10150c",surface:"#30331f",text:"#f3f3f7"},
    {id:"atelier-original-0450",name:"Lime Luminous 0450",accent:"#127591",bg:"#e4e8ee",surface:"#fcfcfd",text:"#352322"},
    {id:"atelier-original-0451",name:"Fuchsia Luminous 0451",accent:"#cb7ca2",bg:"#1a1212",surface:"#3d242b",text:"#f3f7f5"},
    {id:"atelier-original-0452",name:"Periwinkle Luminous 0452",accent:"#468736",bg:"#edf5ef",surface:"#fcfdfc",text:"#2e2235"},
    {id:"atelier-original-0453",name:"Cherry Luminous 0453",accent:"#a6a0d9",bg:"#211826",surface:"#322a46",text:"#f6f7f3"},
    {id:"atelier-original-0454",name:"Cerulean Luminous 0454",accent:"#af6e46",bg:"#f8f7f4",surface:"#fdfdfc",text:"#223135"},
    {id:"atelier-original-0455",name:"Pistachio Luminous 0455",accent:"#66c2a4",bg:"#0c1315",surface:"#1f3330",text:"#f7f3f4"},
    {id:"atelier-original-0456",name:"Lagoon Luminous 0456",accent:"#732f75",bg:"#f0e3ea",surface:"#fdfcfd",text:"#263522"},
    {id:"atelier-original-0457",name:"Bronze Luminous 0457",accent:"#c7ee58",bg:"#131a11",surface:"#313d24",text:"#f4f3f7"},
    {id:"atelier-original-0458",name:"Vermilion Luminous 0458",accent:"#1156ac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352922"},
    {id:"atelier-original-0459",name:"Saffron Luminous 0459",accent:"#f38697",bg:"#261d17",surface:"#462b2a",text:"#f3f7f6"},
    {id:"atelier-original-0460",name:"Mint Luminous 0460",accent:"#16df31",bg:"#f3f9f7",surface:"#fcfdfc",text:"#342235"},
    {id:"atelier-original-0461",name:"Cyan Luminous 0461",accent:"#873cec",bg:"#140d14",surface:"#2b1f33",text:"#f5f7f3"},
    {id:"atelier-original-0462",name:"Orchid Luminous 0462",accent:"#956f0f",bg:"#edeee4",surface:"#fdfdfc",text:"#222a35"},
    {id:"atelier-original-0463",name:"Garnet Luminous 0463",accent:"#73d2d3",bg:"#11151b",surface:"#24373d",text:"#f7f3f3"},
    {id:"atelier-original-0464",name:"Copper Luminous 0464",accent:"#8f2d72",bg:"#f5edef",surface:"#fdfcfc",text:"#223524"},
    {id:"atelier-original-0465",name:"Jade Luminous 0465",accent:"#b6df9a",bg:"#162719",surface:"#30462a",text:"#f5f3f7"},
    {id:"atelier-original-0466",name:"Aqua Luminous 0466",accent:"#3b49ba",bg:"#f5f4f8",surface:"#fcfcfd",text:"#353022"},
    {id:"atelier-original-0467",name:"Mulberry Luminous 0467",accent:"#cc705c",bg:"#14120d",surface:"#33261f",text:"#f3f6f7"},
    {id:"atelier-original-0468",name:"Papaya Luminous 0468",accent:"#277c4f",bg:"#e3f0ef",surface:"#fcfdfd",text:"#35222f"},
    {id:"atelier-original-0469",name:"Iris Luminous 0469",accent:"#c465e2",bg:"#1b1017",surface:"#3c243d",text:"#f4f7f3"},
    {id:"atelier-original-0470",name:"Teal Luminous 0470",accent:"#989f1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222435"},
    {id:"atelier-original-0471",name:"Cobalt Luminous 0471",accent:"#90cbea",bg:"#191a24",surface:"#2a3746",text:"#f7f4f3"},
    {id:"atelier-original-0472",name:"Amber Luminous 0472",accent:"#ce2763",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352b"},
    {id:"atelier-original-0473",name:"Mustard Luminous 0473",accent:"#55dd4b",bg:"#0d1411",surface:"#1f3321",text:"#f6f3f7"},
    {id:"atelier-original-0474",name:"Aurora Luminous 0474",accent:"#331a89",bg:"#ebe4ee",surface:"#fcfcfd",text:"#343522"},
    {id:"atelier-original-0475",name:"Flamingo Luminous 0475",accent:"#d8a56e",bg:"#1a1c10",surface:"#3d3624",text:"#f3f5f7"},
    {id:"atelier-original-0476",name:"Ice Luminous 0476",accent:"#289580",bg:"#edf3f5",surface:"#fcfdfd",text:"#352229"},
    {id:"atelier-original-0477",name:"Violet Luminous 0477",accent:"#e396dc",bg:"#25181c",surface:"#462a3e",text:"#f3f7f3"},
    {id:"atelier-original-0478",name:"Moss Luminous 0478",accent:"#8ac133",bg:"#f5f8f4",surface:"#fcfdfc",text:"#262235"},
    {id:"atelier-original-0479",name:"Ruby Luminous 0479",accent:"#567dd2",bg:"#0f0c15",surface:"#1f2133",text:"#f7f5f3"},
    {id:"atelier-original-0480",name:"Coral Luminous 0480",accent:"#812225",bg:"#f0e8e3",surface:"#fdfcfc",text:"#223531"},
    {id:"atelier-original-0481",name:"Moss Nocturne 0481",accent:"#5ceb81",bg:"#121a19",surface:"#243d30",text:"#f7f3f6"},
    {id:"atelier-original-0482",name:"Ruby Nocturne 0482",accent:"#6715a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2d3522"},
    {id:"atelier-original-0483",name:"Coral Nocturne 0483",accent:"#f0e189",bg:"#202618",surface:"#45462a",text:"#f3f4f7"},
    {id:"atelier-original-0484",name:"Ultramarine Nocturne 0484",accent:"#1bbfda",bg:"#f3f6f9",surface:"#fcfdfd",text:"#352222"},
    {id:"atelier-original-0485",name:"Lilac Nocturne 0485",accent:"#e7409f",bg:"#150c0c",surface:"#331f26",text:"#f3f7f5"},
    {id:"atelier-original-0486",name:"Denim Nocturne 0486",accent:"#359112",bg:"#e4eee6",surface:"#fcfdfc",text:"#2c2235"},
    {id:"atelier-original-0487",name:"Peach Nocturne 0487",accent:"#7d7ccb",bg:"#17111a",surface:"#2a243d",text:"#f6f7f3"},
    {id:"atelier-original-0488",name:"Tangerine Nocturne 0488",accent:"#874f36",bg:"#f5f3ed",surface:"#fdfdfc",text:"#223235"},
    {id:"atelier-original-0489",name:"Chartreuse Nocturne 0489",accent:"#a0d9c2",bg:"#172326",surface:"#2a4640",text:"#f7f3f4"},
    {id:"atelier-original-0490",name:"Petrol Nocturne 0490",accent:"#a346af",bg:"#f8f4f7",surface:"#fdfcfd",text:"#273522"},
    {id:"atelier-original-0491",name:"Olive Nocturne 0491",accent:"#b1c266",bg:"#0f140d",surface:"#2b331f",text:"#f4f3f7"},
    {id:"atelier-original-0492",name:"Rosewood Nocturne 0492",accent:"#2f5375",bg:"#e3e4f0",surface:"#fcfcfd",text:"#352822"},
    {id:"atelier-original-0493",name:"Lime Nocturne 0493",accent:"#ee587b",bg:"#1b1411",surface:"#3d2425",text:"#f3f7f6"},
    {id:"atelier-original-0494",name:"Fuchsia Nocturne 0494",accent:"#11ac1a",bg:"#eef4f1",surface:"#fcfdfc",text:"#332235"},
    {id:"atelier-original-0495",name:"Periwinkle Nocturne 0495",accent:"#ac86f3",bg:"#261627",surface:"#392a46",text:"#f5f7f3"},
    {id:"atelier-original-0496",name:"Cherry Nocturne 0496",accent:"#df9716",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222c35"},
    {id:"atelier-original-0497",name:"Cerulean Nocturne 0497",accent:"#3cece0",bg:"#0d1014",surface:"#1f3033",text:"#f7f3f3"},
    {id:"atelier-original-0498",name:"Pistachio Nocturne 0498",accent:"#950f76",bg:"#eee4e8",surface:"#fdfcfc",text:"#223523"},
    {id:"atelier-original-0499",name:"Lagoon Nocturne 0499",accent:"#a2d373",bg:"#101b11",surface:"#2b3d24",text:"#f5f3f7"},
    {id:"atelier-original-0500",name:"Bronze Nocturne 0500",accent:"#2d408f",bg:"#efedf5",surface:"#fcfcfd",text:"#352e22"},
    {id:"atelier-original-0501",name:"Vermilion Nocturne 0501",accent:"#dfa19a",bg:"#242119",surface:"#46322a",text:"#f3f6f7"},
    {id:"atelier-original-0502",name:"Saffron Nocturne 0502",accent:"#3bba6d",bg:"#f4f8f7",surface:"#fcfdfd",text:"#352231"},
    {id:"atelier-original-0503",name:"Mint Nocturne 0503",accent:"#a85ccc",bg:"#140d12",surface:"#311f33",text:"#f4f7f3"},
    {id:"atelier-original-0504",name:"Cyan Nocturne 0504",accent:"#7c7a27",bg:"#eaf0e3",surface:"#fdfdfc",text:"#222535"},
    {id:"atelier-original-0505",name:"Orchid Nocturne 0505",accent:"#65c0e2",bg:"#10121c",surface:"#24313d",text:"#f7f4f3"},
    {id:"atelier-original-0506",name:"Garnet Nocturne 0506",accent:"#9f1e57",bg:"#f4eeee",surface:"#fdfcfc",text:"#223529"},
    {id:"atelier-original-0507",name:"Copper Nocturne 0507",accent:"#9dea90",bg:"#18251e",surface:"#2a462b",text:"#f6f3f7"},
    {id:"atelier-original-0508",name:"Jade Nocturne 0508",accent:"#3f27ce",bg:"#f7f3f9",surface:"#fcfcfd",text:"#353422"},
    {id:"atelier-original-0509",name:"Aqua Nocturne 0509",accent:"#dd8a4b",bg:"#15150c",surface:"#332c1f",text:"#f3f5f7"},
    {id:"atelier-original-0510",name:"Mulberry Nocturne 0510",accent:"#1a896b",bg:"#e4ecee",surface:"#fcfdfd",text:"#35222a"},
    {id:"atelier-original-0511",name:"Papaya Nocturne 0511",accent:"#d86ed7",bg:"#1a1215",surface:"#3d2437",text:"#f3f7f3"},
    {id:"atelier-original-0512",name:"Iris Nocturne 0512",accent:"#739528",bg:"#eff5ed",surface:"#fcfdfc",text:"#252235"},
    {id:"atelier-original-0513",name:"Teal Nocturne 0513",accent:"#96b5e3",bg:"#1a1826",surface:"#2a3046",text:"#f7f5f3"},
    {id:"atelier-original-0514",name:"Cobalt Nocturne 0514",accent:"#c13343",bg:"#f8f5f4",surface:"#fdfcfc",text:"#223530"},
    {id:"atelier-original-0515",name:"Amber Nocturne 0515",accent:"#56d26d",bg:"#0c1513",surface:"#1f3326",text:"#f7f3f6"},
    {id:"atelier-original-0516",name:"Mustard Nocturne 0516",accent:"#4f2281",bg:"#efe3f0",surface:"#fdfcfd",text:"#2f3522"},
    {id:"atelier-original-0517",name:"Aurora Nocturne 0517",accent:"#ebca5c",bg:"#171a11",surface:"#3d3c24",text:"#f3f4f7"},
    {id:"atelier-original-0518",name:"Flamingo Nocturne 0518",accent:"#159fa8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352224"},
    {id:"atelier-original-0519",name:"Ice Nocturne 0519",accent:"#f089cc",bg:"#261718",surface:"#462a37",text:"#f3f7f4"},
    {id:"atelier-original-0520",name:"Violet Nocturne 0520",accent:"#5fda1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2b2235"},
    {id:"atelier-original-0521",name:"Flamingo Porcelain 0521",accent:"#404be7",bg:"#110d14",surface:"#211f33",text:"#f7f6f3"},
    {id:"atelier-original-0522",name:"Ice Porcelain 0522",accent:"#912f12",bg:"#eeebe4",surface:"#fdfcfc",text:"#223435"},
    {id:"atelier-original-0523",name:"Violet Porcelain 0523",accent:"#7ccba5",bg:"#111a1b",surface:"#243d36",text:"#f7f3f5"},
    {id:"atelier-original-0524",name:"Moss Porcelain 0524",accent:"#783687",bg:"#f5edf3",surface:"#fdfcfd",text:"#293522"},
    {id:"atelier-original-0525",name:"Ruby Porcelain 0525",accent:"#d3d9a0",bg:"#1c2716",surface:"#3e462a",text:"#f3f3f7"},
    {id:"atelier-original-0526",name:"Coral Porcelain 0526",accent:"#4685af",bg:"#f4f5f8",surface:"#fcfcfd",text:"#352622"},
    {id:"atelier-original-0527",name:"Ultramarine Porcelain 0527",accent:"#c26683",bg:"#140f0d",surface:"#331f21",text:"#f3f7f5"},
    {id:"atelier-original-0528",name:"Lilac Porcelain 0528",accent:"#30752f",bg:"#e3f0e8",surface:"#fcfdfc",text:"#312235"},
    {id:"atelier-original-0529",name:"Denim Porcelain 0529",accent:"#8158ee",bg:"#1a101b",surface:"#30243d",text:"#f6f7f3"},
    {id:"atelier-original-0530",name:"Peach Porcelain 0530",accent:"#ac6811",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222d35"},
    {id:"atelier-original-0531",name:"Tangerine Porcelain 0531",accent:"#86f3e3",bg:"#191f24",surface:"#2a4546",text:"#f7f3f4"},
    {id:"atelier-original-0532",name:"Chartreuse Porcelain 0532",accent:"#df16c2",bg:"#f9f3f6",surface:"#fdfcfd",text:"#223522"},
    {id:"atelier-original-0533",name:"Petrol Porcelain 0533",accent:"#9fec3c",bg:"#0d140d",surface:"#26331f",text:"#f5f3f7"},
    {id:"atelier-original-0534",name:"Olive Porcelain 0534",accent:"#0f3395",bg:"#e6e4ee",surface:"#fcfcfd",text:"#352d22"},
    {id:"atelier-original-0535",name:"Rosewood Porcelain 0535",accent:"#d37573",bg:"#1c1710",surface:"#3d2a24",text:"#f3f6f7"},
    {id:"atelier-original-0536",name:"Lime Porcelain 0536",accent:"#2d8f4c",bg:"#edf5f3",surface:"#fcfdfd",text:"#352232"},
    {id:"atelier-original-0537",name:"Fuchsia Porcelain 0537",accent:"#c49adf",bg:"#251823",surface:"#412a46",text:"#f4f7f3"},
    {id:"atelier-original-0538",name:"Periwinkle Porcelain 0538",accent:"#baad3b",bg:"#f7f8f4",surface:"#fdfdfc",text:"#222735"},
    {id:"atelier-original-0539",name:"Cherry Porcelain 0539",accent:"#5cb7cc",bg:"#0c0e15",surface:"#1f2b33",text:"#f7f4f3"},
    {id:"atelier-original-0540",name:"Cerulean Porcelain 0540",accent:"#7c2753",bg:"#f0e3e4",surface:"#fdfcfc",text:"#223528"},
    {id:"atelier-original-0541",name:"Pistachio Porcelain 0541",accent:"#81e265",bg:"#121a14",surface:"#253d24",text:"#f6f3f7"},
    {id:"atelier-original-0542",name:"Lagoon Porcelain 0542",accent:"#261e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353322"},
    {id:"atelier-original-0543",name:"Bronze Porcelain 0543",accent:"#eab090",bg:"#262518",surface:"#463a2a",text:"#f3f5f7"},
    {id:"atelier-original-0544",name:"Vermilion Porcelain 0544",accent:"#27ce93",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222c"},
    {id:"atelier-original-0545",name:"Saffron Porcelain 0545",accent:"#d44bdd",bg:"#150c10",surface:"#331f30",text:"#f3f7f3"},
    {id:"atelier-original-0546",name:"Mint Porcelain 0546",accent:"#6f891a",bg:"#e8eee4",surface:"#fcfdfc",text:"#232235"},
    {id:"atelier-original-0547",name:"Cyan Porcelain 0547",accent:"#6ea1d8",bg:"#12111a",surface:"#242b3d",text:"#f7f5f3"},
    {id:"atelier-original-0548",name:"Orchid Porcelain 0548",accent:"#95283c",bg:"#f5efed",surface:"#fdfcfc",text:"#22352e"},
    {id:"atelier-original-0549",name:"Garnet Porcelain 0549",accent:"#96e39e",bg:"#172622",surface:"#2a4633",text:"#f7f3f6"},
    {id:"atelier-original-0550",name:"Copper Porcelain 0550",accent:"#6c33c1",bg:"#f7f4f8",surface:"#fdfcfd",text:"#303522"},
    {id:"atelier-original-0551",name:"Jade Porcelain 0551",accent:"#d2ac56",bg:"#12140d",surface:"#33311f",text:"#f3f4f7"},
    {id:"atelier-original-0552",name:"Aqua Porcelain 0552",accent:"#22817f",bg:"#e3eaf0",surface:"#fcfdfd",text:"#352225"},
    {id:"atelier-original-0553",name:"Mulberry Porcelain 0553",accent:"#eb5cc4",bg:"#1b1112",surface:"#3d2431",text:"#f3f7f4"},
    {id:"atelier-original-0554",name:"Papaya Porcelain 0554",accent:"#55a815",bg:"#eef4ee",surface:"#fcfdfc",text:"#292235"},
    {id:"atelier-original-0555",name:"Iris Porcelain 0555",accent:"#8998f0",bg:"#1e1627",surface:"#2c2a46",text:"#f7f6f3"},
    {id:"atelier-original-0556",name:"Teal Porcelain 0556",accent:"#da371b",bg:"#f9f7f3",surface:"#fdfcfc",text:"#223535"},
    {id:"atelier-original-0557",name:"Cobalt Porcelain 0557",accent:"#40e78a",bg:"#0d1414",surface:"#1f332c",text:"#f7f3f5"},
    {id:"atelier-original-0558",name:"Amber Porcelain 0558",accent:"#6f1291",bg:"#eee4ec",surface:"#fdfcfd",text:"#2a3522"},
    {id:"atelier-original-0559",name:"Mustard Porcelain 0559",accent:"#c9cb7c",bg:"#151b10",surface:"#373d24",text:"#f3f3f7"},
    {id:"atelier-original-0560",name:"Aurora Porcelain 0560",accent:"#366d87",bg:"#edeff5",surface:"#fcfcfd",text:"#352522"},
    {id:"atelier-original-0561",name:"Amber Velvet 0561",accent:"#d9a0b7",bg:"#241b19",surface:"#462a2f",text:"#f3f7f5"},
    {id:"atelier-original-0562",name:"Mustard Velvet 0562",accent:"#50af46",bg:"#f4f8f5",surface:"#fcfdfc",text:"#302235"},
    {id:"atelier-original-0563",name:"Aurora Velvet 0563",accent:"#7766c2",bg:"#130d14",surface:"#271f33",text:"#f6f7f3"},
    {id:"atelier-original-0564",name:"Flamingo Velvet 0564",accent:"#75502f",bg:"#f0efe3",surface:"#fdfdfc",text:"#222f35"},
    {id:"atelier-original-0565",name:"Ice Velvet 0565",accent:"#58eecd",bg:"#10171c",surface:"#243d3c",text:"#f7f3f4"},
    {id:"atelier-original-0566",name:"Violet Velvet 0566",accent:"#ac11a1",bg:"#f4eef1",surface:"#fdfcfd",text:"#243522"},
    {id:"atelier-original-0567",name:"Moss Velvet 0567",accent:"#ccf386",bg:"#192518",surface:"#36462a",text:"#f4f3f7"},
    {id:"atelier-original-0568",name:"Ruby Velvet 0568",accent:"#165cdf",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352b22"},
    {id:"atelier-original-0569",name:"Coral Velvet 0569",accent:"#ec3c46",bg:"#15110c",surface:"#33221f",text:"#f3f7f6"},
    {id:"atelier-original-0570",name:"Ultramarine Velvet 0570",accent:"#0f952e",bg:"#e4eeeb",surface:"#fcfdfc",text:"#352234"},
    {id:"atelier-original-0571",name:"Lilac Velvet 0571",accent:"#a673d3",bg:"#1a1219",surface:"#36243d",text:"#f5f7f3"},
    {id:"atelier-original-0572",name:"Denim Velvet 0572",accent:"#8f7e2d",bg:"#f3f5ed",surface:"#fdfdfc",text:"#222835"},
    {id:"atelier-original-0573",name:"Peach Velvet 0573",accent:"#9ad8df",bg:"#181c26",surface:"#2a3d46",text:"#f7f3f3"},
    {id:"atelier-original-0574",name:"Tangerine Velvet 0574",accent:"#ba3b87",bg:"#f8f4f5",surface:"#fdfcfc",text:"#223526"},
    {id:"atelier-original-0575",name:"Chartreuse Velvet 0575",accent:"#7ecc5c",bg:"#0c150f",surface:"#21331f",text:"#f5f3f7"},
    {id:"atelier-original-0576",name:"Petrol Velvet 0576",accent:"#27287c",bg:"#e8e3f0",surface:"#fcfcfd",text:"#353122"},
    {id:"atelier-original-0577",name:"Olive Velvet 0577",accent:"#e28765",bg:"#1a1911",surface:"#3d3024",text:"#f3f6f7"},
    {id:"atelier-original-0578",name:"Rosewood Velvet 0578",accent:"#1e9f67",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222d"},
    {id:"atelier-original-0579",name:"Lime Velvet 0579",accent:"#dd90ea",bg:"#26171f",surface:"#462a44",text:"#f4f7f3"},
    {id:"atelier-original-0580",name:"Fuchsia Velvet 0580",accent:"#b4ce27",bg:"#f6f9f3",surface:"#fdfdfc",text:"#222235"},
    {id:"atelier-original-0581",name:"Periwinkle Velvet 0581",accent:"#4b9cdd",bg:"#0e0d14",surface:"#1f2633",text:"#f7f5f3"},
    {id:"atelier-original-0582",name:"Cherry Velvet 0582",accent:"#891a37",bg:"#eee6e4",surface:"#fdfcfc",text:"#22352d"},
    {id:"atelier-original-0583",name:"Cerulean Velvet 0583",accent:"#6ed871",bg:"#111b17",surface:"#243d2a",text:"#f7f3f6"},
    {id:"atelier-original-0584",name:"Pistachio Velvet 0584",accent:"#4b2895",bg:"#f3edf5",surface:"#fdfcfd",text:"#323522"},
    {id:"atelier-original-0585",name:"Lagoon Velvet 0585",accent:"#e3c596",bg:"#242716",surface:"#46412a",text:"#f3f4f7"},
    {id:"atelier-original-0586",name:"Bronze Velvet 0586",accent:"#33c1b4",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352227"},
    {id:"atelier-original-0587",name:"Vermilion Velvet 0587",accent:"#d256ba",bg:"#140d0f",surface:"#331f2b",text:"#f3f7f4"},
    {id:"atelier-original-0588",name:"Saffron Velvet 0588",accent:"#538122",bg:"#e4f0e3",surface:"#fcfdfc",text:"#282235"},
    {id:"atelier-original-0589",name:"Mint Velvet 0589",accent:"#5c7beb",bg:"#14101b",surface:"#24253d",text:"#f7f6f3"},
    {id:"atelier-original-0590",name:"Cyan Velvet 0590",accent:"#a81f15",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223533"},
    {id:"atelier-original-0591",name:"Orchid Velvet 0591",accent:"#89f0ae",bg:"#192424",surface:"#2a463a",text:"#f7f3f5"},
    {id:"atelier-original-0592",name:"Garnet Velvet 0592",accent:"#981bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2c3522"},
    {id:"atelier-original-0593",name:"Copper Velvet 0593",accent:"#e7de40",bg:"#10140d",surface:"#30331f",text:"#f3f3f7"},
    {id:"atelier-original-0594",name:"Jade Velvet 0594",accent:"#127391",bg:"#e4e7ee",surface:"#fcfcfd",text:"#352322"},
    {id:"atelier-original-0595",name:"Aqua Velvet 0595",accent:"#cb7ca1",bg:"#1c1110",surface:"#3d242b",text:"#f3f7f5"},
    {id:"atelier-original-0596",name:"Mulberry Velvet 0596",accent:"#448736",bg:"#edf5ef",surface:"#fcfdfc",text:"#2e2235"},
    {id:"atelier-original-0597",name:"Papaya Velvet 0597",accent:"#a7a0d9",bg:"#211825",surface:"#332a46",text:"#f6f7f3"},
    {id:"atelier-original-0598",name:"Iris Velvet 0598",accent:"#af7046",bg:"#f8f7f4",surface:"#fdfdfc",text:"#223035"},
    {id:"atelier-original-0599",name:"Teal Velvet 0599",accent:"#66c2a6",bg:"#0c1215",surface:"#1f3331",text:"#f7f3f4"},
    {id:"atelier-original-0600",name:"Cobalt Velvet 0600",accent:"#742f75",bg:"#f0e3ea",surface:"#fdfcfd",text:"#253522"},
    {id:"atelier-original-0601",name:"Iris Atelier 0601",accent:"#c4ee58",bg:"#131a12",surface:"#313d24",text:"#f4f3f7"},
    {id:"atelier-original-0602",name:"Teal Atelier 0602",accent:"#1153ac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352a22"},
    {id:"atelier-original-0603",name:"Cobalt Atelier 0603",accent:"#f38695",bg:"#261e18",surface:"#462c2a",text:"#f3f7f6"},
    {id:"atelier-original-0604",name:"Amber Atelier 0604",accent:"#16df35",bg:"#f3f9f7",surface:"#fcfdfc",text:"#352235"},
    {id:"atelier-original-0605",name:"Mustard Atelier 0605",accent:"#8b3cec",bg:"#150c15",surface:"#2c1f33",text:"#f5f7f3"},
    {id:"atelier-original-0606",name:"Aurora Atelier 0606",accent:"#95720f",bg:"#eceee4",surface:"#fdfdfc",text:"#222a35"},
    {id:"atelier-original-0607",name:"Flamingo Atelier 0607",accent:"#73d0d3",bg:"#11151a",surface:"#24373d",text:"#f7f3f3"},
    {id:"atelier-original-0608",name:"Ice Atelier 0608",accent:"#8f2d70",bg:"#f5edef",surface:"#fdfcfc",text:"#223525"},
    {id:"atelier-original-0609",name:"Violet Atelier 0609",accent:"#b5df9a",bg:"#17261a",surface:"#2f462a",text:"#f5f3f7"},
    {id:"atelier-original-0610",name:"Moss Atelier 0610",accent:"#3b47ba",bg:"#f5f4f8",surface:"#fcfcfd",text:"#353022"},
    {id:"atelier-original-0611",name:"Ruby Atelier 0611",accent:"#cc725c",bg:"#14120d",surface:"#33271f",text:"#f3f6f7"},
    {id:"atelier-original-0612",name:"Coral Atelier 0612",accent:"#277c51",bg:"#e3f0ef",surface:"#fcfdfd",text:"#35222f"},
    {id:"atelier-original-0613",name:"Ultramarine Atelier 0613",accent:"#c665e2",bg:"#1b1117",surface:"#3c243d",text:"#f4f7f3"},
    {id:"atelier-original-0614",name:"Lilac Atelier 0614",accent:"#959f1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222435"},
    {id:"atelier-original-0615",name:"Denim Atelier 0615",accent:"#90c9ea",bg:"#161727",surface:"#2a3646",text:"#f7f4f3"},
    {id:"atelier-original-0616",name:"Peach Atelier 0616",accent:"#ce2760",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352b"},
    {id:"atelier-original-0617",name:"Tangerine Atelier 0617",accent:"#53dd4b",bg:"#0d1411",surface:"#1f3322",text:"#f6f3f7"},
    {id:"atelier-original-0618",name:"Chartreuse Atelier 0618",accent:"#351a89",bg:"#ebe4ee",surface:"#fcfcfd",text:"#333522"},
    {id:"atelier-original-0619",name:"Petrol Atelier 0619",accent:"#d8a76e",bg:"#1a1b10",surface:"#3d3624",text:"#f3f5f7"},
    {id:"atelier-original-0620",name:"Olive Atelier 0620",accent:"#289582",bg:"#edf3f5",surface:"#fcfdfd",text:"#352228"},
    {id:"atelier-original-0621",name:"Rosewood Atelier 0621",accent:"#e396da",bg:"#24191c",surface:"#462a3d",text:"#f3f7f3"},
    {id:"atelier-original-0622",name:"Lime Atelier 0622",accent:"#87c133",bg:"#f5f8f4",surface:"#fcfdfc",text:"#262235"},
    {id:"atelier-original-0623",name:"Fuchsia Atelier 0623",accent:"#567bd2",bg:"#0f0d14",surface:"#1f2133",text:"#f7f5f3"},
    {id:"atelier-original-0624",name:"Periwinkle Atelier 0624",accent:"#812223",bg:"#f0e9e3",surface:"#fdfcfc",text:"#223532"},
    {id:"atelier-original-0625",name:"Cherry Atelier 0625",accent:"#5ceb84",bg:"#101c1a",surface:"#243d30",text:"#f7f3f6"},
    {id:"atelier-original-0626",name:"Cerulean Atelier 0626",accent:"#6915a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2d3522"},
    {id:"atelier-original-0627",name:"Pistachio Atelier 0627",accent:"#f0e389",bg:"#1f2518",surface:"#44462a",text:"#f3f4f7"},
    {id:"atelier-original-0628",name:"Lagoon Atelier 0628",accent:"#1bbcda",bg:"#f3f6f9",surface:"#fcfdfd",text:"#352222"},
    {id:"atelier-original-0629",name:"Bronze Atelier 0629",accent:"#e7409c",bg:"#150d0c",surface:"#331f26",text:"#f3f7f5"},
    {id:"atelier-original-0630",name:"Vermilion Atelier 0630",accent:"#339112",bg:"#e4eee6",surface:"#fcfdfc",text:"#2d2235"},
    {id:"atelier-original-0631",name:"Saffron Atelier 0631",accent:"#7e7ccb",bg:"#17121a",surface:"#2a243d",text:"#f6f7f3"},
    {id:"atelier-original-0632",name:"Mint Atelier 0632",accent:"#875036",bg:"#f5f3ed",surface:"#fdfdfc",text:"#223235"},
    {id:"atelier-original-0633",name:"Cyan Atelier 0633",accent:"#a0d9c3",bg:"#182326",surface:"#2a4641",text:"#f7f3f4"},
    {id:"atelier-original-0634",name:"Orchid Atelier 0634",accent:"#a546af",bg:"#f8f4f7",surface:"#fdfcfd",text:"#273522"},
    {id:"atelier-original-0635",name:"Garnet Atelier 0635",accent:"#afc266",bg:"#0e150c",surface:"#2b331f",text:"#f4f3f7"},
    {id:"atelier-original-0636",name:"Copper Atelier 0636",accent:"#2f5275",bg:"#e3e4f0",surface:"#fcfcfd",text:"#352822"},
    {id:"atelier-original-0637",name:"Jade Atelier 0637",accent:"#ee5878",bg:"#1a1411",surface:"#3d2425",text:"#f3f7f6"},
    {id:"atelier-original-0638",name:"Aqua Atelier 0638",accent:"#11ac1d",bg:"#eef4f1",surface:"#fcfdfc",text:"#332235"},
    {id:"atelier-original-0639",name:"Mulberry Atelier 0639",accent:"#ae86f3",bg:"#261726",surface:"#3a2a46",text:"#f5f7f3"},
    {id:"atelier-original-0640",name:"Papaya Atelier 0640",accent:"#df9b16",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222b35"},
    {id:"atelier-original-0641",name:"Aqua Dusk 0641",accent:"#3cece3",bg:"#0d1014",surface:"#1f3033",text:"#f7f3f3"},
    {id:"atelier-original-0642",name:"Mulberry Dusk 0642",accent:"#950f74",bg:"#eee4e7",surface:"#fdfcfc",text:"#223523"},
    {id:"atelier-original-0643",name:"Papaya Dusk 0643",accent:"#a0d373",bg:"#111b12",surface:"#2b3d24",text:"#f5f3f7"},
    {id:"atelier-original-0644",name:"Iris Dusk 0644",accent:"#2d3e8f",bg:"#efedf5",surface:"#fcfcfd",text:"#352e22"},
    {id:"atelier-original-0645",name:"Teal Dusk 0645",accent:"#dfa29a",bg:"#272216",surface:"#46332a",text:"#f3f6f7"},
    {id:"atelier-original-0646",name:"Cobalt Dusk 0646",accent:"#3bba6f",bg:"#f4f8f8",surface:"#fcfdfd",text:"#352230"},
    {id:"atelier-original-0647",name:"Amber Dusk 0647",accent:"#aa5ccc",bg:"#140d12",surface:"#311f33",text:"#f4f7f3"},
    {id:"atelier-original-0648",name:"Mustard Dusk 0648",accent:"#7c7c27",bg:"#eaf0e3",surface:"#fdfdfc",text:"#222535"},
    {id:"atelier-original-0649",name:"Aurora Dusk 0649",accent:"#65bee2",bg:"#10121b",surface:"#24313d",text:"#f7f4f3"},
    {id:"atelier-original-0650",name:"Flamingo Dusk 0650",accent:"#9f1e54",bg:"#f4eeee",surface:"#fdfcfc",text:"#22352a"},
    {id:"atelier-original-0651",name:"Ice Dusk 0651",accent:"#9bea90",bg:"#19241e",surface:"#2a462c",text:"#f6f3f7"},
    {id:"atelier-original-0652",name:"Violet Dusk 0652",accent:"#4227ce",bg:"#f7f3f9",surface:"#fcfcfd",text:"#353522"},
    {id:"atelier-original-0653",name:"Moss Dusk 0653",accent:"#dd8d4b",bg:"#14140d",surface:"#332c1f",text:"#f3f5f7"},
    {id:"atelier-original-0654",name:"Ruby Dusk 0654",accent:"#1a896d",bg:"#e4ecee",surface:"#fcfdfd",text:"#35222a"},
    {id:"atelier-original-0655",name:"Coral Dusk 0655",accent:"#d86ed4",bg:"#1c1014",surface:"#3d2437",text:"#f3f7f3"},
    {id:"atelier-original-0656",name:"Ultramarine Dusk 0656",accent:"#719528",bg:"#eff5ed",surface:"#fcfdfc",text:"#252235"},
    {id:"atelier-original-0657",name:"Lilac Dusk 0657",accent:"#96b3e3",bg:"#1b1825",surface:"#2a2f46",text:"#f7f5f3"},
    {id:"atelier-original-0658",name:"Denim Dusk 0658",accent:"#c13340",bg:"#f8f6f4",surface:"#fdfcfc",text:"#223530"},
    {id:"atelier-original-0659",name:"Peach Dusk 0659",accent:"#56d26f",bg:"#0c1513",surface:"#1f3327",text:"#f7f3f6"},
    {id:"atelier-original-0660",name:"Tangerine Dusk 0660",accent:"#512281",bg:"#efe3f0",surface:"#fdfcfd",text:"#2f3522"},
    {id:"atelier-original-0661",name:"Chartreuse Dusk 0661",accent:"#ebcc5c",bg:"#171a12",surface:"#3d3c24",text:"#f3f4f7"},
    {id:"atelier-original-0662",name:"Petrol Dusk 0662",accent:"#159ca8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352223"},
    {id:"atelier-original-0663",name:"Olive Dusk 0663",accent:"#f089ca",bg:"#261818",surface:"#462a36",text:"#f3f7f4"},
    {id:"atelier-original-0664",name:"Rosewood Dusk 0664",accent:"#5bda1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2b2235"},
    {id:"atelier-original-0665",name:"Lime Dusk 0665",accent:"#4048e7",bg:"#110c15",surface:"#221f33",text:"#f7f6f3"},
    {id:"atelier-original-0666",name:"Fuchsia Dusk 0666",accent:"#913112",bg:"#eeebe4",surface:"#fdfcfc",text:"#223335"},
    {id:"atelier-original-0667",name:"Periwinkle Dusk 0667",accent:"#7ccba6",bg:"#11191a",surface:"#243d36",text:"#f7f3f5"},
    {id:"atelier-original-0668",name:"Cherry Dusk 0668",accent:"#793687",bg:"#f5edf3",surface:"#fdfcfd",text:"#283522"},
    {id:"atelier-original-0669",name:"Cerulean Dusk 0669",accent:"#d2d9a0",bg:"#1b2617",surface:"#3d462a",text:"#f3f3f7"},
    {id:"atelier-original-0670",name:"Pistachio Dusk 0670",accent:"#4683af",bg:"#f4f5f8",surface:"#fcfcfd",text:"#352722"},
    {id:"atelier-original-0671",name:"Lagoon Dusk 0671",accent:"#c26681",bg:"#140f0d",surface:"#331f21",text:"#f3f7f6"},
    {id:"atelier-original-0672",name:"Bronze Dusk 0672",accent:"#2f752f",bg:"#e3f0e9",surface:"#fcfdfc",text:"#322235"},
    {id:"atelier-original-0673",name:"Vermilion Dusk 0673",accent:"#8458ee",bg:"#19111b",surface:"#30243d",text:"#f6f7f3"},
    {id:"atelier-original-0674",name:"Saffron Dusk 0674",accent:"#ac6b11",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222d35"},
    {id:"atelier-original-0675",name:"Mint Dusk 0675",accent:"#86f3e5",bg:"#161f27",surface:"#2a4446",text:"#f7f3f4"},
    {id:"atelier-original-0676",name:"Cyan Dusk 0676",accent:"#df16be",bg:"#f9f3f5",surface:"#fdfcfd",text:"#223522"},
    {id:"atelier-original-0677",name:"Orchid Dusk 0677",accent:"#9bec3c",bg:"#0d140d",surface:"#26331f",text:"#f5f3f7"},
    {id:"atelier-original-0678",name:"Garnet Dusk 0678",accent:"#0f3095",bg:"#e6e4ee",surface:"#fcfcfd",text:"#352d22"},
    {id:"atelier-original-0679",name:"Copper Dusk 0679",accent:"#d37773",bg:"#1b1710",surface:"#3d2a24",text:"#f3f6f7"},
    {id:"atelier-original-0680",name:"Jade Dusk 0680",accent:"#2d8f4e",bg:"#edf5f3",surface:"#fcfdfd",text:"#352232"},
    {id:"atelier-original-0681",name:"Garnet Daylight 0681",accent:"#c59adf",bg:"#241922",surface:"#412a46",text:"#f4f7f3"},
    {id:"atelier-original-0682",name:"Copper Daylight 0682",accent:"#baaf3b",bg:"#f7f8f4",surface:"#fdfdfc",text:"#222735"},
    {id:"atelier-original-0683",name:"Jade Daylight 0683",accent:"#5cb4cc",bg:"#0d0e14",surface:"#1f2b33",text:"#f7f4f3"},
    {id:"atelier-original-0684",name:"Aqua Daylight 0684",accent:"#7c2752",bg:"#f0e3e4",surface:"#fdfcfc",text:"#223528"},
    {id:"atelier-original-0685",name:"Mulberry Daylight 0685",accent:"#7fe265",bg:"#101c14",surface:"#253d24",text:"#f6f3f7"},
    {id:"atelier-original-0686",name:"Papaya Daylight 0686",accent:"#291e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353322"},
    {id:"atelier-original-0687",name:"Iris Daylight 0687",accent:"#eab190",bg:"#252418",surface:"#463a2a",text:"#f3f5f7"},
    {id:"atelier-original-0688",name:"Teal Daylight 0688",accent:"#27ce96",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222b"},
    {id:"atelier-original-0689",name:"Cobalt Daylight 0689",accent:"#d74bdd",bg:"#150c10",surface:"#331f30",text:"#f3f7f3"},
    {id:"atelier-original-0690",name:"Amber Daylight 0690",accent:"#6d891a",bg:"#e7eee4",surface:"#fcfdfc",text:"#232235"},
    {id:"atelier-original-0691",name:"Mustard Daylight 0691",accent:"#6e9fd8",bg:"#13121a",surface:"#242b3d",text:"#f7f5f3"},
    {id:"atelier-original-0692",name:"Aurora Daylight 0692",accent:"#95283a",bg:"#f5efed",surface:"#fdfcfc",text:"#22352f"},
    {id:"atelier-original-0693",name:"Flamingo Daylight 0693",accent:"#96e3a0",bg:"#182622",surface:"#2a4633",text:"#f7f3f6"},
    {id:"atelier-original-0694",name:"Ice Daylight 0694",accent:"#6f33c1",bg:"#f8f4f8",surface:"#fdfcfd",text:"#303522"},
    {id:"atelier-original-0695",name:"Violet Daylight 0695",accent:"#d2ae56",bg:"#12150c",surface:"#33311f",text:"#f3f4f7"},
    {id:"atelier-original-0696",name:"Moss Daylight 0696",accent:"#228181",bg:"#e3eaf0",surface:"#fcfdfd",text:"#352225"},
    {id:"atelier-original-0697",name:"Ruby Daylight 0697",accent:"#eb5cc1",bg:"#1a1112",surface:"#3d2431",text:"#f3f7f4"},
    {id:"atelier-original-0698",name:"Coral Daylight 0698",accent:"#52a815",bg:"#eef4ee",surface:"#fcfdfc",text:"#2a2235"},
    {id:"atelier-original-0699",name:"Ultramarine Daylight 0699",accent:"#8996f0",bg:"#1e1726",surface:"#2c2a46",text:"#f7f6f3"},
    {id:"atelier-original-0700",name:"Lilac Daylight 0700",accent:"#da3b1b",bg:"#f9f7f3",surface:"#fdfcfc",text:"#223535"},
    {id:"atelier-original-0701",name:"Denim Daylight 0701",accent:"#40e78d",bg:"#0d1314",surface:"#1f332c",text:"#f7f3f5"},
    {id:"atelier-original-0702",name:"Peach Daylight 0702",accent:"#721291",bg:"#eee4ec",surface:"#fdfcfd",text:"#2a3522"},
    {id:"atelier-original-0703",name:"Tangerine Daylight 0703",accent:"#c7cb7c",bg:"#141b11",surface:"#373d24",text:"#f3f3f7"},
    {id:"atelier-original-0704",name:"Chartreuse Daylight 0704",accent:"#366c87",bg:"#edeff5",surface:"#fcfcfd",text:"#352522"},
    {id:"atelier-original-0705",name:"Petrol Daylight 0705",accent:"#d9a0b5",bg:"#271a16",surface:"#462a2f",text:"#f3f7f5"},
    {id:"atelier-original-0706",name:"Olive Daylight 0706",accent:"#4eaf46",bg:"#f4f8f6",surface:"#fcfdfc",text:"#302235"},
    {id:"atelier-original-0707",name:"Rosewood Daylight 0707",accent:"#7966c2",bg:"#130d14",surface:"#271f33",text:"#f6f7f3"},
    {id:"atelier-original-0708",name:"Lime Daylight 0708",accent:"#75522f",bg:"#f0efe3",surface:"#fdfdfc",text:"#222e35"},
    {id:"atelier-original-0709",name:"Fuchsia Daylight 0709",accent:"#58eed0",bg:"#10171b",surface:"#243d3c",text:"#f7f3f4"},
    {id:"atelier-original-0710",name:"Periwinkle Daylight 0710",accent:"#ac119e",bg:"#f4eef1",surface:"#fdfcfd",text:"#233522"},
    {id:"atelier-original-0711",name:"Cherry Daylight 0711",accent:"#caf386",bg:"#192419",surface:"#36462a",text:"#f4f3f7"},
    {id:"atelier-original-0712",name:"Cerulean Daylight 0712",accent:"#1658df",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352b22"},
    {id:"atelier-original-0713",name:"Pistachio Daylight 0713",accent:"#ec3c43",bg:"#14110d",surface:"#33221f",text:"#f3f7f6"},
    {id:"atelier-original-0714",name:"Lagoon Daylight 0714",accent:"#0f9531",bg:"#e4eeeb",surface:"#fcfdfc",text:"#352233"},
    {id:"atelier-original-0715",name:"Bronze Daylight 0715",accent:"#a873d3",bg:"#1c101a",surface:"#36243d",text:"#f5f7f3"},
    {id:"atelier-original-0716",name:"Vermilion Daylight 0716",accent:"#8f7f2d",bg:"#f3f5ed",surface:"#fdfdfc",text:"#222835"},
    {id:"atelier-original-0717",name:"Saffron Daylight 0717",accent:"#9ad6df",bg:"#181c25",surface:"#2a3d46",text:"#f7f4f3"},
    {id:"atelier-original-0718",name:"Mint Daylight 0718",accent:"#ba3b85",bg:"#f8f4f5",surface:"#fdfcfc",text:"#223527"},
    {id:"atelier-original-0719",name:"Cyan Daylight 0719",accent:"#7ccc5c",bg:"#0c150f",surface:"#20331f",text:"#f6f3f7"},
    {id:"atelier-original-0720",name:"Orchid Daylight 0720",accent:"#28277c",bg:"#e9e3f0",surface:"#fcfcfd",text:"#353222"},
    {id:"atelier-original-0721",name:"Mint Midnight 0721",accent:"#e28a65",bg:"#1a1912",surface:"#3d3024",text:"#f3f6f7"},
    {id:"atelier-original-0722",name:"Cyan Midnight 0722",accent:"#1e9f6a",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222d"},
    {id:"atelier-original-0723",name:"Orchid Midnight 0723",accent:"#df90ea",bg:"#26181f",surface:"#462a44",text:"#f3f7f3"},
    {id:"atelier-original-0724",name:"Garnet Midnight 0724",accent:"#b1ce27",bg:"#f5f9f3",surface:"#fdfdfc",text:"#222235"},
    {id:"atelier-original-0725",name:"Copper Midnight 0725",accent:"#4b99dd",bg:"#0d0c15",surface:"#1f2533",text:"#f7f5f3"},
    {id:"atelier-original-0726",name:"Jade Midnight 0726",accent:"#891a35",bg:"#eee6e4",surface:"#fdfcfc",text:"#22352d"},
    {id:"atelier-original-0727",name:"Aqua Midnight 0727",accent:"#6ed873",bg:"#111a17",surface:"#243d2a",text:"#f7f3f6"},
    {id:"atelier-original-0728",name:"Mulberry Midnight 0728",accent:"#4d2895",bg:"#f3edf5",surface:"#fdfcfd",text:"#323522"},
    {id:"atelier-original-0729",name:"Papaya Midnight 0729",accent:"#e3c796",bg:"#232617",surface:"#46412a",text:"#f3f4f7"},
    {id:"atelier-original-0730",name:"Iris Midnight 0730",accent:"#33c1b6",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352226"},
    {id:"atelier-original-0731",name:"Teal Midnight 0731",accent:"#d256b7",bg:"#140d0f",surface:"#331f2b",text:"#f3f7f4"},
    {id:"atelier-original-0732",name:"Cobalt Midnight 0732",accent:"#518122",bg:"#e3f0e3",surface:"#fcfdfc",text:"#282235"},
    {id:"atelier-original-0733",name:"Amber Midnight 0733",accent:"#5c79eb",bg:"#14111b",surface:"#24243d",text:"#f7f6f3"},
    {id:"atelier-original-0734",name:"Mustard Midnight 0734",accent:"#a82215",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223533"},
    {id:"atelier-original-0735",name:"Aurora Midnight 0735",accent:"#89f0b0",bg:"#162726",surface:"#2a463a",text:"#f7f3f5"},
    {id:"atelier-original-0736",name:"Flamingo Midnight 0736",accent:"#9b1bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2b3522"},
    {id:"atelier-original-0737",name:"Ice Midnight 0737",accent:"#e7e240",bg:"#10140d",surface:"#30331f",text:"#f3f3f7"},
    {id:"atelier-original-0738",name:"Violet Midnight 0738",accent:"#127191",bg:"#e4e7ee",surface:"#fcfcfd",text:"#352422"},
    {id:"atelier-original-0739",name:"Moss Midnight 0739",accent:"#cb7c9f",bg:"#1b1210",surface:"#3d242a",text:"#f3f7f5"},
    {id:"atelier-original-0740",name:"Ruby Midnight 0740",accent:"#438736",bg:"#edf5ef",surface:"#fcfdfc",text:"#2f2235"},
    {id:"atelier-original-0741",name:"Coral Midnight 0741",accent:"#a8a0d9",bg:"#211924",surface:"#332a46",text:"#f6f7f3"},
    {id:"atelier-original-0742",name:"Ultramarine Midnight 0742",accent:"#af7246",bg:"#f8f8f4",surface:"#fdfdfc",text:"#223035"},
    {id:"atelier-original-0743",name:"Lilac Midnight 0743",accent:"#66c2a8",bg:"#0d1214",surface:"#1f3331",text:"#f7f3f4"},
    {id:"atelier-original-0744",name:"Denim Midnight 0744",accent:"#752f74",bg:"#f0e3ea",surface:"#fdfcfd",text:"#253522"},
    {id:"atelier-original-0745",name:"Peach Midnight 0745",accent:"#c1ee58",bg:"#111c10",surface:"#303d24",text:"#f4f3f7"},
    {id:"atelier-original-0746",name:"Tangerine Midnight 0746",accent:"#1150ac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352a22"},
    {id:"atelier-original-0747",name:"Chartreuse Midnight 0747",accent:"#f38693",bg:"#251e18",surface:"#462c2a",text:"#f3f7f6"},
    {id:"atelier-original-0748",name:"Petrol Midnight 0748",accent:"#16df39",bg:"#f3f9f7",surface:"#fcfdfc",text:"#352235"},
    {id:"atelier-original-0749",name:"Olive Midnight 0749",accent:"#8e3cec",bg:"#150c14",surface:"#2c1f33",text:"#f5f7f3"},
    {id:"atelier-original-0750",name:"Rosewood Midnight 0750",accent:"#95740f",bg:"#eceee4",surface:"#fdfdfc",text:"#222a35"},
    {id:"atelier-original-0751",name:"Lime Midnight 0751",accent:"#73ced3",bg:"#12151a",surface:"#24373d",text:"#f7f3f3"},
    {id:"atelier-original-0752",name:"Fuchsia Midnight 0752",accent:"#8f2d6e",bg:"#f5edef",surface:"#fdfcfc",text:"#223525"},
    {id:"atelier-original-0753",name:"Periwinkle Midnight 0753",accent:"#b3df9a",bg:"#18261b",surface:"#2f462a",text:"#f5f3f7"},
    {id:"atelier-original-0754",name:"Cherry Midnight 0754",accent:"#3b44ba",bg:"#f6f4f8",surface:"#fcfcfd",text:"#353022"},
    {id:"atelier-original-0755",name:"Cerulean Midnight 0755",accent:"#cc745c",bg:"#15130c",surface:"#33271f",text:"#f3f6f7"},
    {id:"atelier-original-0756",name:"Pistachio Midnight 0756",accent:"#277c52",bg:"#e3f0ef",surface:"#fcfdfd",text:"#35222e"},
    {id:"atelier-original-0757",name:"Lagoon Midnight 0757",accent:"#c965e2",bg:"#1a1117",surface:"#3d243d",text:"#f4f7f3"},
    {id:"atelier-original-0758",name:"Bronze Midnight 0758",accent:"#939f1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222335"},
    {id:"atelier-original-0759",name:"Vermilion Midnight 0759",accent:"#90c7ea",bg:"#171726",surface:"#2a3646",text:"#f7f4f3"},
    {id:"atelier-original-0760",name:"Saffron Midnight 0760",accent:"#ce275d",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352c"},
    {id:"atelier-original-0761",name:"Bronze Silk 0761",accent:"#50dd4b",bg:"#0d1411",surface:"#1f3322",text:"#f6f3f7"},
    {id:"atelier-original-0762",name:"Vermilion Silk 0762",accent:"#371a89",bg:"#ebe4ee",surface:"#fcfcfd",text:"#333522"},
    {id:"atelier-original-0763",name:"Saffron Silk 0763",accent:"#d8a96e",bg:"#191b11",surface:"#3d3724",text:"#f3f5f7"},
    {id:"atelier-original-0764",name:"Mint Silk 0764",accent:"#289584",bg:"#edf3f5",surface:"#fcfdfd",text:"#352228"},
    {id:"atelier-original-0765",name:"Cyan Silk 0765",accent:"#e396d9",bg:"#27161b",surface:"#462a3d",text:"#f3f7f4"},
    {id:"atelier-original-0766",name:"Orchid Silk 0766",accent:"#85c133",bg:"#f5f8f4",surface:"#fcfdfc",text:"#272235"},
    {id:"atelier-original-0767",name:"Garnet Silk 0767",accent:"#5679d2",bg:"#0f0d14",surface:"#1f2033",text:"#f7f6f3"},
    {id:"atelier-original-0768",name:"Copper Silk 0768",accent:"#812322",bg:"#f0e9e3",surface:"#fdfcfc",text:"#223532"},
    {id:"atelier-original-0769",name:"Jade Silk 0769",accent:"#5ceb87",bg:"#101b1a",surface:"#243d31",text:"#f7f3f5"},
    {id:"atelier-original-0770",name:"Aqua Silk 0770",accent:"#6c15a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2d3522"},
    {id:"atelier-original-0771",name:"Mulberry Silk 0771",accent:"#f0e589",bg:"#1f2419",surface:"#44462a",text:"#f3f3f7"},
    {id:"atelier-original-0772",name:"Papaya Silk 0772",accent:"#1bb8da",bg:"#f3f5f9",surface:"#fcfcfd",text:"#352222"},
    {id:"atelier-original-0773",name:"Iris Silk 0773",accent:"#e74099",bg:"#140d0d",surface:"#331f25",text:"#f3f7f5"},
    {id:"atelier-original-0774",name:"Teal Silk 0774",accent:"#309112",bg:"#e4eee7",surface:"#fcfdfc",text:"#2d2235"},
    {id:"atelier-original-0775",name:"Cobalt Silk 0775",accent:"#807ccb",bg:"#17101c",surface:"#2a243d",text:"#f6f7f3"},
    {id:"atelier-original-0776",name:"Amber Silk 0776",accent:"#875236",bg:"#f5f3ed",surface:"#fdfdfc",text:"#223135"},
    {id:"atelier-original-0777",name:"Mustard Silk 0777",accent:"#a0d9c5",bg:"#182225",surface:"#2a4642",text:"#f7f3f4"},
    {id:"atelier-original-0778",name:"Aurora Silk 0778",accent:"#a846af",bg:"#f8f4f7",surface:"#fdfcfd",text:"#263522"},
    {id:"atelier-original-0779",name:"Flamingo Silk 0779",accent:"#aec266",bg:"#0e150c",surface:"#2a331f",text:"#f4f3f7"},
    {id:"atelier-original-0780",name:"Ice Silk 0780",accent:"#2f5175",bg:"#e3e3f0",surface:"#fcfcfd",text:"#352822"},
    {id:"atelier-original-0781",name:"Violet Silk 0781",accent:"#ee5875",bg:"#1a1512",surface:"#3d2424",text:"#f3f7f6"},
    {id:"atelier-original-0782",name:"Moss Silk 0782",accent:"#11ac20",bg:"#eef4f1",surface:"#fcfdfc",text:"#342235"},
    {id:"atelier-original-0783",name:"Ruby Silk 0783",accent:"#b086f3",bg:"#251826",surface:"#3b2a46",text:"#f5f7f3"},
    {id:"atelier-original-0784",name:"Coral Silk 0784",accent:"#df9e16",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222b35"},
    {id:"atelier-original-0785",name:"Ultramarine Silk 0785",accent:"#3cece7",bg:"#0c1015",surface:"#1f3033",text:"#f7f3f3"},
    {id:"atelier-original-0786",name:"Lilac Silk 0786",accent:"#950f71",bg:"#eee4e7",surface:"#fdfcfc",text:"#223524"},
    {id:"atelier-original-0787",name:"Denim Silk 0787",accent:"#9ed373",bg:"#111a12",surface:"#2a3d24",text:"#f5f3f7"},
    {id:"atelier-original-0788",name:"Peach Silk 0788",accent:"#2d3c8f",bg:"#efedf5",surface:"#fcfcfd",text:"#352f22"},
    {id:"atelier-original-0789",name:"Tangerine Silk 0789",accent:"#dfa49a",bg:"#262217",surface:"#46342a",text:"#f3f6f7"},
    {id:"atelier-original-0790",name:"Chartreuse Silk 0790",accent:"#3bba72",bg:"#f4f8f8",surface:"#fcfdfd",text:"#352230"},
    {id:"atelier-original-0791",name:"Petrol Silk 0791",accent:"#ad5ccc",bg:"#140d12",surface:"#311f33",text:"#f4f7f3"},
    {id:"atelier-original-0792",name:"Olive Silk 0792",accent:"#7b7c27",bg:"#eaf0e3",surface:"#fdfdfc",text:"#222535"},
    {id:"atelier-original-0793",name:"Rosewood Silk 0793",accent:"#65bbe2",bg:"#11121b",surface:"#24303d",text:"#f7f4f3"},
    {id:"atelier-original-0794",name:"Lime Silk 0794",accent:"#9f1e52",bg:"#f4eeee",surface:"#fdfcfc",text:"#22352a"},
    {id:"atelier-original-0795",name:"Fuchsia Silk 0795",accent:"#9aea90",bg:"#16271e",surface:"#2a462d",text:"#f6f3f7"},
    {id:"atelier-original-0796",name:"Periwinkle Silk 0796",accent:"#4527ce",bg:"#f7f3f9",surface:"#fcfcfd",text:"#353522"},
    {id:"atelier-original-0797",name:"Cherry Silk 0797",accent:"#dd904b",bg:"#14140d",surface:"#332c1f",text:"#f3f5f7"},
    {id:"atelier-original-0798",name:"Cerulean Silk 0798",accent:"#1a896f",bg:"#e4ecee",surface:"#fcfdfd",text:"#352229"},
    {id:"atelier-original-0799",name:"Pistachio Silk 0799",accent:"#d86ed2",bg:"#1b1014",surface:"#3d2436",text:"#f3f7f3"},
    {id:"atelier-original-0800",name:"Lagoon Silk 0800",accent:"#6f9528",bg:"#eff5ed",surface:"#fcfdfc",text:"#252235"},
    {id:"atelier-original-0801",name:"Cerulean Eclipse 0801",accent:"#96b2e3",bg:"#1b1924",surface:"#2a2f46",text:"#f7f5f3"},
    {id:"atelier-original-0802",name:"Pistachio Eclipse 0802",accent:"#c1333d",bg:"#f8f6f4",surface:"#fdfcfc",text:"#223530"},
    {id:"atelier-original-0803",name:"Lagoon Eclipse 0803",accent:"#56d272",bg:"#0d1413",surface:"#1f3327",text:"#f7f3f6"},
    {id:"atelier-original-0804",name:"Bronze Eclipse 0804",accent:"#532281",bg:"#efe3f0",surface:"#fdfcfd",text:"#2e3522"},
    {id:"atelier-original-0805",name:"Vermilion Eclipse 0805",accent:"#ebcf5c",bg:"#171c10",surface:"#3c3d24",text:"#f3f4f7"},
    {id:"atelier-original-0806",name:"Saffron Eclipse 0806",accent:"#1599a8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352223"},
    {id:"atelier-original-0807",name:"Mint Eclipse 0807",accent:"#f089c8",bg:"#251819",surface:"#462a36",text:"#f3f7f4"},
    {id:"atelier-original-0808",name:"Cyan Eclipse 0808",accent:"#58da1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2c2235"},
    {id:"atelier-original-0809",name:"Orchid Eclipse 0809",accent:"#4045e7",bg:"#110c15",surface:"#221f33",text:"#f7f6f3"},
    {id:"atelier-original-0810",name:"Garnet Eclipse 0810",accent:"#913412",bg:"#eeebe4",surface:"#fdfcfc",text:"#223335"},
    {id:"atelier-original-0811",name:"Copper Eclipse 0811",accent:"#7ccba8",bg:"#12191a",surface:"#243d37",text:"#f7f3f5"},
    {id:"atelier-original-0812",name:"Jade Eclipse 0812",accent:"#7b3687",bg:"#f5edf3",surface:"#fdfcfd",text:"#283522"},
    {id:"atelier-original-0813",name:"Aqua Eclipse 0813",accent:"#d1d9a0",bg:"#1b2618",surface:"#3d462a",text:"#f4f3f7"},
    {id:"atelier-original-0814",name:"Mulberry Eclipse 0814",accent:"#4681af",bg:"#f4f5f8",surface:"#fcfcfd",text:"#352722"},
    {id:"atelier-original-0815",name:"Papaya Eclipse 0815",accent:"#c2667f",bg:"#150f0c",surface:"#331f20",text:"#f3f7f6"},
    {id:"atelier-original-0816",name:"Iris Eclipse 0816",accent:"#2f7530",bg:"#e3f0e9",surface:"#fcfdfc",text:"#322235"},
    {id:"atelier-original-0817",name:"Teal Eclipse 0817",accent:"#8658ee",bg:"#19111a",surface:"#31243d",text:"#f5f7f3"},
    {id:"atelier-original-0818",name:"Cobalt Eclipse 0818",accent:"#ac6e11",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222d35"},
    {id:"atelier-original-0819",name:"Amber Eclipse 0819",accent:"#86f3e7",bg:"#171f26",surface:"#2a4446",text:"#f7f3f3"},
    {id:"atelier-original-0820",name:"Mustard Eclipse 0820",accent:"#df16ba",bg:"#f9f3f5",surface:"#fdfcfc",text:"#223522"},
    {id:"atelier-original-0821",name:"Aurora Eclipse 0821",accent:"#98ec3c",bg:"#0d140e",surface:"#25331f",text:"#f5f3f7"},
    {id:"atelier-original-0822",name:"Flamingo Eclipse 0822",accent:"#0f2e95",bg:"#e7e4ee",surface:"#fcfcfd",text:"#352d22"},
    {id:"atelier-original-0823",name:"Ice Eclipse 0823",accent:"#d37973",bg:"#1b1711",surface:"#3d2b24",text:"#f3f6f7"},
    {id:"atelier-original-0824",name:"Violet Eclipse 0824",accent:"#2d8f50",bg:"#edf5f3",surface:"#fcfdfd",text:"#352231"},
    {id:"atelier-original-0825",name:"Moss Eclipse 0825",accent:"#c79adf",bg:"#271623",surface:"#422a46",text:"#f4f7f3"},
    {id:"atelier-original-0826",name:"Ruby Eclipse 0826",accent:"#bab23b",bg:"#f7f8f4",surface:"#fdfdfc",text:"#222635"},
    {id:"atelier-original-0827",name:"Coral Eclipse 0827",accent:"#5cb2cc",bg:"#0d0e14",surface:"#1f2a33",text:"#f7f4f3"},
    {id:"atelier-original-0828",name:"Ultramarine Eclipse 0828",accent:"#7c2750",bg:"#f0e3e3",surface:"#fdfcfc",text:"#223529"},
    {id:"atelier-original-0829",name:"Lilac Eclipse 0829",accent:"#7ce265",bg:"#101b15",surface:"#243d25",text:"#f6f3f7"},
    {id:"atelier-original-0830",name:"Denim Eclipse 0830",accent:"#2b1e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353422"},
    {id:"atelier-original-0831",name:"Peach Eclipse 0831",accent:"#eab390",bg:"#242419",surface:"#463b2a",text:"#f3f5f7"},
    {id:"atelier-original-0832",name:"Tangerine Eclipse 0832",accent:"#27ce99",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222b"},
    {id:"atelier-original-0833",name:"Chartreuse Eclipse 0833",accent:"#d94bdd",bg:"#140d10",surface:"#331f2f",text:"#f3f7f3"},
    {id:"atelier-original-0834",name:"Petrol Eclipse 0834",accent:"#6b891a",bg:"#e7eee4",surface:"#fcfdfc",text:"#242235"},
    {id:"atelier-original-0835",name:"Olive Eclipse 0835",accent:"#6e9dd8",bg:"#12101c",surface:"#242a3d",text:"#f7f5f3"},
    {id:"atelier-original-0836",name:"Rosewood Eclipse 0836",accent:"#952838",bg:"#f5efed",surface:"#fdfcfc",text:"#22352f"},
    {id:"atelier-original-0837",name:"Lime Eclipse 0837",accent:"#96e3a1",bg:"#182522",surface:"#2a4634",text:"#f7f3f6"},
    {id:"atelier-original-0838",name:"Fuchsia Eclipse 0838",accent:"#7133c1",bg:"#f8f4f8",surface:"#fdfcfd",text:"#303522"},
    {id:"atelier-original-0839",name:"Periwinkle Eclipse 0839",accent:"#d2b056",bg:"#12150c",surface:"#33321f",text:"#f3f4f7"},
    {id:"atelier-original-0840",name:"Cherry Eclipse 0840",accent:"#227f81",bg:"#e3eaf0",surface:"#fcfdfd",text:"#352225"},
    {id:"atelier-original-0841",name:"Fuchsia Mist 0841",accent:"#eb5cbe",bg:"#1a1212",surface:"#3d2430",text:"#f3f7f4"},
    {id:"atelier-original-0842",name:"Periwinkle Mist 0842",accent:"#4fa815",bg:"#eef4ee",surface:"#fcfdfc",text:"#2a2235"},
    {id:"atelier-original-0843",name:"Cherry Mist 0843",accent:"#8994f0",bg:"#1e1826",surface:"#2d2a46",text:"#f7f6f3"},
    {id:"atelier-original-0844",name:"Cerulean Mist 0844",accent:"#da3f1b",bg:"#f9f7f3",surface:"#fdfcfc",text:"#223435"},
    {id:"atelier-original-0845",name:"Pistachio Mist 0845",accent:"#40e790",bg:"#0c1415",surface:"#1f332c",text:"#f7f3f5"},
    {id:"atelier-original-0846",name:"Lagoon Mist 0846",accent:"#741291",bg:"#eee4ec",surface:"#fdfcfd",text:"#293522"},
    {id:"atelier-original-0847",name:"Bronze Mist 0847",accent:"#c6cb7c",bg:"#141a11",surface:"#363d24",text:"#f3f3f7"},
    {id:"atelier-original-0848",name:"Vermilion Mist 0848",accent:"#366a87",bg:"#edeef5",surface:"#fcfcfd",text:"#352522"},
    {id:"atelier-original-0849",name:"Saffron Mist 0849",accent:"#d9a0b4",bg:"#261a17",surface:"#462a2e",text:"#f3f7f5"},
    {id:"atelier-original-0850",name:"Mint Mist 0850",accent:"#4caf46",bg:"#f4f8f6",surface:"#fcfdfc",text:"#312235"},
    {id:"atelier-original-0851",name:"Cyan Mist 0851",accent:"#7b66c2",bg:"#130d14",surface:"#271f33",text:"#f6f7f3"},
    {id:"atelier-original-0852",name:"Orchid Mist 0852",accent:"#75532f",bg:"#f0efe3",surface:"#fdfdfc",text:"#222e35"},
    {id:"atelier-original-0853",name:"Garnet Mist 0853",accent:"#58eed2",bg:"#11171b",surface:"#243c3d",text:"#f7f3f4"},
    {id:"atelier-original-0854",name:"Copper Mist 0854",accent:"#ac119b",bg:"#f4eef1",surface:"#fdfcfd",text:"#233522"},
    {id:"atelier-original-0855",name:"Jade Mist 0855",accent:"#c8f386",bg:"#172716",surface:"#35462a",text:"#f4f3f7"},
    {id:"atelier-original-0856",name:"Aqua Mist 0856",accent:"#1654df",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352c22"},
    {id:"atelier-original-0857",name:"Mulberry Mist 0857",accent:"#ec3c3f",bg:"#14110d",surface:"#33221f",text:"#f3f7f6"},
    {id:"atelier-original-0858",name:"Papaya Mist 0858",accent:"#0f9533",bg:"#e4eeeb",surface:"#fcfdfc",text:"#352233"},
    {id:"atelier-original-0859",name:"Iris Mist 0859",accent:"#a973d3",bg:"#1b1019",surface:"#37243d",text:"#f5f7f3"},
    {id:"atelier-original-0860",name:"Teal Mist 0860",accent:"#8f812d",bg:"#f3f5ed",surface:"#fdfdfc",text:"#222835"},
    {id:"atelier-original-0861",name:"Cobalt Mist 0861",accent:"#9ad5df",bg:"#191c24",surface:"#2a3c46",text:"#f7f4f3"},
    {id:"atelier-original-0862",name:"Amber Mist 0862",accent:"#ba3b82",bg:"#f8f4f5",surface:"#fdfcfc",text:"#223527"},
    {id:"atelier-original-0863",name:"Mustard Mist 0863",accent:"#7acc5c",bg:"#0d140f",surface:"#20331f",text:"#f6f3f7"},
    {id:"atelier-original-0864",name:"Aurora Mist 0864",accent:"#29277c",bg:"#e9e3f0",surface:"#fcfcfd",text:"#353222"},
    {id:"atelier-original-0865",name:"Flamingo Mist 0865",accent:"#e28c65",bg:"#1c1a10",surface:"#3d3124",text:"#f3f5f7"},
    {id:"atelier-original-0866",name:"Ice Mist 0866",accent:"#1e9f6c",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222c"},
    {id:"atelier-original-0867",name:"Violet Mist 0867",accent:"#e190ea",bg:"#25181f",surface:"#462a43",text:"#f3f7f3"},
    {id:"atelier-original-0868",name:"Moss Mist 0868",accent:"#aece27",bg:"#f5f9f3",surface:"#fcfdfc",text:"#222235"},
    {id:"atelier-original-0869",name:"Ruby Mist 0869",accent:"#4b96dd",bg:"#0d0c15",surface:"#1f2533",text:"#f7f5f3"},
    {id:"atelier-original-0870",name:"Coral Mist 0870",accent:"#891a33",bg:"#eee7e4",surface:"#fdfcfc",text:"#22352d"},
    {id:"atelier-original-0871",name:"Ultramarine Mist 0871",accent:"#6ed875",bg:"#121a17",surface:"#243d2b",text:"#f7f3f6"},
    {id:"atelier-original-0872",name:"Lilac Mist 0872",accent:"#4f2895",bg:"#f4edf5",surface:"#fdfcfd",text:"#313522"},
    {id:"atelier-original-0873",name:"Denim Mist 0873",accent:"#e3c896",bg:"#222618",surface:"#46422a",text:"#f3f4f7"},
    {id:"atelier-original-0874",name:"Peach Mist 0874",accent:"#33c1b9",bg:"#f4f7f8",surface:"#fcfdfd",text:"#352226"},
    {id:"atelier-original-0875",name:"Tangerine Mist 0875",accent:"#d256b5",bg:"#150c0e",surface:"#331f2a",text:"#f3f7f4"},
    {id:"atelier-original-0876",name:"Chartreuse Mist 0876",accent:"#4f8122",bg:"#e3f0e3",surface:"#fcfdfc",text:"#292235"},
    {id:"atelier-original-0877",name:"Petrol Mist 0877",accent:"#5c76eb",bg:"#15111a",surface:"#25243d",text:"#f7f6f3"},
    {id:"atelier-original-0878",name:"Olive Mist 0878",accent:"#a82515",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223534"},
    {id:"atelier-original-0879",name:"Rosewood Mist 0879",accent:"#89f0b2",bg:"#172626",surface:"#2a463b",text:"#f7f3f5"},
    {id:"atelier-original-0880",name:"Lime Mist 0880",accent:"#9f1bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2b3522"},
    {id:"atelier-original-0881",name:"Olive Ink 0881",accent:"#e7e540",bg:"#10140d",surface:"#2f331f",text:"#f3f3f7"},
    {id:"atelier-original-0882",name:"Rosewood Ink 0882",accent:"#126e91",bg:"#e4e7ee",surface:"#fcfcfd",text:"#352422"},
    {id:"atelier-original-0883",name:"Lime Ink 0883",accent:"#cb7c9e",bg:"#1b1211",surface:"#3d242a",text:"#f3f7f5"},
    {id:"atelier-original-0884",name:"Fuchsia Ink 0884",accent:"#418736",bg:"#edf5ef",surface:"#fcfdfc",text:"#2f2235"},
    {id:"atelier-original-0885",name:"Periwinkle Ink 0885",accent:"#a9a0d9",bg:"#221627",surface:"#342a46",text:"#f6f7f3"},
    {id:"atelier-original-0886",name:"Cherry Ink 0886",accent:"#af7446",bg:"#f8f8f4",surface:"#fdfdfc",text:"#223035"},
    {id:"atelier-original-0887",name:"Cerulean Ink 0887",accent:"#66c2aa",bg:"#0d1214",surface:"#1f3332",text:"#f7f3f4"},
    {id:"atelier-original-0888",name:"Pistachio Ink 0888",accent:"#752f73",bg:"#f0e3ea",surface:"#fdfcfd",text:"#243522"},
    {id:"atelier-original-0889",name:"Lagoon Ink 0889",accent:"#bfee58",bg:"#111b10",surface:"#303d24",text:"#f4f3f7"},
    {id:"atelier-original-0890",name:"Bronze Ink 0890",accent:"#114dac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352a22"},
    {id:"atelier-original-0891",name:"Vermilion Ink 0891",accent:"#f38691",bg:"#241e19",surface:"#462d2a",text:"#f3f7f6"},
    {id:"atelier-original-0892",name:"Saffron Ink 0892",accent:"#16df3d",bg:"#f3f9f7",surface:"#fcfdfc",text:"#352234"},
    {id:"atelier-original-0893",name:"Mint Ink 0893",accent:"#913cec",bg:"#140d14",surface:"#2d1f33",text:"#f5f7f3"},
    {id:"atelier-original-0894",name:"Cyan Ink 0894",accent:"#95770f",bg:"#eceee4",surface:"#fdfdfc",text:"#222935"},
    {id:"atelier-original-0895",name:"Orchid Ink 0895",accent:"#73ccd3",bg:"#10141c",surface:"#24363d",text:"#f7f3f3"},
    {id:"atelier-original-0896",name:"Garnet Ink 0896",accent:"#8f2d6c",bg:"#f5edee",surface:"#fdfcfc",text:"#223526"},
    {id:"atelier-original-0897",name:"Copper Ink 0897",accent:"#b2df9a",bg:"#18251b",surface:"#2e462a",text:"#f5f3f7"},
    {id:"atelier-original-0898",name:"Jade Ink 0898",accent:"#3b42ba",bg:"#f6f4f8",surface:"#fcfcfd",text:"#353122"},
    {id:"atelier-original-0899",name:"Aqua Ink 0899",accent:"#cc775c",bg:"#15130c",surface:"#33281f",text:"#f3f6f7"},
    {id:"atelier-original-0900",name:"Mulberry Ink 0900",accent:"#277c54",bg:"#e3f0ef",surface:"#fcfdfd",text:"#35222e"},
    {id:"atelier-original-0901",name:"Papaya Ink 0901",accent:"#cb65e2",bg:"#1a1216",surface:"#3d243c",text:"#f4f7f3"},
    {id:"atelier-original-0902",name:"Iris Ink 0902",accent:"#909f1e",bg:"#f1f4ee",surface:"#fdfdfc",text:"#222335"},
    {id:"atelier-original-0903",name:"Teal Ink 0903",accent:"#90c5ea",bg:"#181826",surface:"#2a3546",text:"#f7f4f3"},
    {id:"atelier-original-0904",name:"Cobalt Ink 0904",accent:"#ce275a",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352c"},
    {id:"atelier-original-0905",name:"Amber Ink 0905",accent:"#4ddd4b",bg:"#0c1511",surface:"#1f3322",text:"#f6f3f7"},
    {id:"atelier-original-0906",name:"Mustard Ink 0906",accent:"#391a89",bg:"#ece4ee",surface:"#fcfcfd",text:"#333522"},
    {id:"atelier-original-0907",name:"Aurora Ink 0907",accent:"#d8ab6e",bg:"#191a11",surface:"#3d3724",text:"#f3f5f7"},
    {id:"atelier-original-0908",name:"Flamingo Ink 0908",accent:"#289586",bg:"#edf3f5",surface:"#fcfdfd",text:"#352228"},
    {id:"atelier-original-0909",name:"Ice Ink 0909",accent:"#e396d7",bg:"#26171b",surface:"#462a3c",text:"#f3f7f4"},
    {id:"atelier-original-0910",name:"Violet Ink 0910",accent:"#82c133",bg:"#f4f8f4",surface:"#fcfdfc",text:"#272235"},
    {id:"atelier-original-0911",name:"Moss Ink 0911",accent:"#5676d2",bg:"#0f0d14",surface:"#1f2033",text:"#f7f6f3"},
    {id:"atelier-original-0912",name:"Ruby Ink 0912",accent:"#812522",bg:"#f0e9e3",surface:"#fdfcfc",text:"#223532"},
    {id:"atelier-original-0913",name:"Coral Ink 0913",accent:"#5ceb8a",bg:"#111b1a",surface:"#243d31",text:"#f7f3f5"},
    {id:"atelier-original-0914",name:"Ultramarine Ink 0914",accent:"#6f15a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2c3522"},
    {id:"atelier-original-0915",name:"Lilac Ink 0915",accent:"#f0e789",bg:"#1f2716",surface:"#43462a",text:"#f3f3f7"},
    {id:"atelier-original-0916",name:"Denim Ink 0916",accent:"#1bb4da",bg:"#f3f5f9",surface:"#fcfcfd",text:"#352222"},
    {id:"atelier-original-0917",name:"Peach Ink 0917",accent:"#e74096",bg:"#140e0d",surface:"#331f25",text:"#f3f7f5"},
    {id:"atelier-original-0918",name:"Tangerine Ink 0918",accent:"#2e9112",bg:"#e4eee7",surface:"#fcfdfc",text:"#2e2235"},
    {id:"atelier-original-0919",name:"Chartreuse Ink 0919",accent:"#817ccb",bg:"#17101b",surface:"#2b243d",text:"#f6f7f3"},
    {id:"atelier-original-0920",name:"Petrol Ink 0920",accent:"#875336",bg:"#f5f4ed",surface:"#fdfdfc",text:"#223135"},
    {id:"atelier-original-0921",name:"Tangerine Luminous 0921",accent:"#a0d9c6",bg:"#192224",surface:"#2a4642",text:"#f7f3f4"},
    {id:"atelier-original-0922",name:"Chartreuse Luminous 0922",accent:"#aa46af",bg:"#f8f4f6",surface:"#fdfcfd",text:"#263522"},
    {id:"atelier-original-0923",name:"Petrol Luminous 0923",accent:"#acc266",bg:"#0e140d",surface:"#2a331f",text:"#f4f3f7"},
    {id:"atelier-original-0924",name:"Olive Luminous 0924",accent:"#2f4f75",bg:"#e3e3f0",surface:"#fcfcfd",text:"#352922"},
    {id:"atelier-original-0925",name:"Rosewood Luminous 0925",accent:"#ee5873",bg:"#1c1510",surface:"#3d2524",text:"#f3f7f6"},
    {id:"atelier-original-0926",name:"Lime Luminous 0926",accent:"#11ac23",bg:"#eef4f1",surface:"#fcfdfc",text:"#342235"},
    {id:"atelier-original-0927",name:"Fuchsia Luminous 0927",accent:"#b386f3",bg:"#251825",surface:"#3b2a46",text:"#f5f7f3"},
    {id:"atelier-original-0928",name:"Periwinkle Luminous 0928",accent:"#dfa216",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222b35"},
    {id:"atelier-original-0929",name:"Cherry Luminous 0929",accent:"#3cecea",bg:"#0c1015",surface:"#1f2f33",text:"#f7f3f3"},
    {id:"atelier-original-0930",name:"Cerulean Luminous 0930",accent:"#950f6f",bg:"#eee4e7",surface:"#fdfcfc",text:"#223524"},
    {id:"atelier-original-0931",name:"Pistachio Luminous 0931",accent:"#9cd373",bg:"#121a13",surface:"#2a3d24",text:"#f5f3f7"},
    {id:"atelier-original-0932",name:"Lagoon Luminous 0932",accent:"#2d3a8f",bg:"#efedf5",surface:"#fcfcfd",text:"#352f22"},
    {id:"atelier-original-0933",name:"Bronze Luminous 0933",accent:"#dfa59a",bg:"#262218",surface:"#46342a",text:"#f3f6f7"},
    {id:"atelier-original-0934",name:"Vermilion Luminous 0934",accent:"#3bba74",bg:"#f4f8f8",surface:"#fcfdfd",text:"#35222f"},
    {id:"atelier-original-0935",name:"Saffron Luminous 0935",accent:"#af5ccc",bg:"#150c12",surface:"#321f33",text:"#f4f7f3"},
    {id:"atelier-original-0936",name:"Mint Luminous 0936",accent:"#797c27",bg:"#eaf0e3",surface:"#fdfdfc",text:"#222435"},
    {id:"atelier-original-0937",name:"Cyan Luminous 0937",accent:"#65b9e2",bg:"#11121a",surface:"#24303d",text:"#f7f4f3"},
    {id:"atelier-original-0938",name:"Orchid Luminous 0938",accent:"#9f1e4f",bg:"#f4eeee",surface:"#fdfcfc",text:"#22352a"},
    {id:"atelier-original-0939",name:"Garnet Luminous 0939",accent:"#98ea90",bg:"#17261e",surface:"#2a462d",text:"#f6f3f7"},
    {id:"atelier-original-0940",name:"Copper Luminous 0940",accent:"#4827ce",bg:"#f7f3f9",surface:"#fcfcfd",text:"#343522"},
    {id:"atelier-original-0941",name:"Jade Luminous 0941",accent:"#dd934b",bg:"#13140d",surface:"#332d1f",text:"#f3f5f7"},
    {id:"atelier-original-0942",name:"Aqua Luminous 0942",accent:"#1a8971",bg:"#e4ecee",surface:"#fcfdfd",text:"#352229"},
    {id:"atelier-original-0943",name:"Mulberry Luminous 0943",accent:"#d86ed0",bg:"#1b1114",surface:"#3d2436",text:"#f3f7f3"},
    {id:"atelier-original-0944",name:"Papaya Luminous 0944",accent:"#6d9528",bg:"#eef5ed",surface:"#fcfdfc",text:"#262235"},
    {id:"atelier-original-0945",name:"Iris Luminous 0945",accent:"#96b0e3",bg:"#1a1627",surface:"#2a2e46",text:"#f7f5f3"},
    {id:"atelier-original-0946",name:"Teal Luminous 0946",accent:"#c1333a",bg:"#f8f6f4",surface:"#fdfcfc",text:"#223531"},
    {id:"atelier-original-0947",name:"Cobalt Luminous 0947",accent:"#56d274",bg:"#0d1413",surface:"#1f3328",text:"#f7f3f6"},
    {id:"atelier-original-0948",name:"Amber Luminous 0948",accent:"#552281",bg:"#f0e3f0",surface:"#fdfcfd",text:"#2e3522"},
    {id:"atelier-original-0949",name:"Mustard Luminous 0949",accent:"#ebd25c",bg:"#171b10",surface:"#3c3d24",text:"#f3f4f7"},
    {id:"atelier-original-0950",name:"Aurora Luminous 0950",accent:"#1597a8",bg:"#eef1f4",surface:"#fcfdfd",text:"#352223"},
    {id:"atelier-original-0951",name:"Flamingo Luminous 0951",accent:"#f089c6",bg:"#241919",surface:"#462a35",text:"#f3f7f4"},
    {id:"atelier-original-0952",name:"Ice Luminous 0952",accent:"#54da1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2c2235"},
    {id:"atelier-original-0953",name:"Violet Luminous 0953",accent:"#4041e7",bg:"#110d14",surface:"#231f33",text:"#f7f7f3"},
    {id:"atelier-original-0954",name:"Moss Luminous 0954",accent:"#913612",bg:"#eeece4",surface:"#fdfcfc",text:"#223335"},
    {id:"atelier-original-0955",name:"Ruby Luminous 0955",accent:"#7ccba9",bg:"#101a1c",surface:"#243d37",text:"#f7f3f5"},
    {id:"atelier-original-0956",name:"Coral Luminous 0956",accent:"#7c3687",bg:"#f5edf2",surface:"#fdfcfd",text:"#273522"},
    {id:"atelier-original-0957",name:"Ultramarine Luminous 0957",accent:"#d0d9a0",bg:"#1b2518",surface:"#3c462a",text:"#f4f3f7"},
    {id:"atelier-original-0958",name:"Lilac Luminous 0958",accent:"#467faf",bg:"#f4f4f8",surface:"#fcfcfd",text:"#352722"},
    {id:"atelier-original-0959",name:"Denim Luminous 0959",accent:"#c2667d",bg:"#150f0c",surface:"#331f20",text:"#f3f7f6"},
    {id:"atelier-original-0960",name:"Peach Luminous 0960",accent:"#2f7531",bg:"#e3f0e9",surface:"#fcfdfc",text:"#322235"},
    {id:"atelier-original-0961",name:"Lilac Nocturne 0961",accent:"#8958ee",bg:"#19121a",surface:"#31243d",text:"#f5f7f3"},
    {id:"atelier-original-0962",name:"Denim Nocturne 0962",accent:"#ac7111",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222c35"},
    {id:"atelier-original-0963",name:"Peach Nocturne 0963",accent:"#86f3e9",bg:"#181f26",surface:"#2a4346",text:"#f7f3f3"},
    {id:"atelier-original-0964",name:"Tangerine Nocturne 0964",accent:"#df16b6",bg:"#f9f3f5",surface:"#fdfcfc",text:"#223523"},
    {id:"atelier-original-0965",name:"Chartreuse Nocturne 0965",accent:"#95ec3c",bg:"#0c150d",surface:"#25331f",text:"#f5f3f7"},
    {id:"atelier-original-0966",name:"Petrol Nocturne 0966",accent:"#0f2b95",bg:"#e7e4ee",surface:"#fcfcfd",text:"#352e22"},
    {id:"atelier-original-0967",name:"Olive Nocturne 0967",accent:"#d37b73",bg:"#1a1711",surface:"#3d2b24",text:"#f3f6f7"},
    {id:"atelier-original-0968",name:"Rosewood Nocturne 0968",accent:"#2d8f52",bg:"#edf5f4",surface:"#fcfdfd",text:"#352231"},
    {id:"atelier-original-0969",name:"Lime Nocturne 0969",accent:"#c89adf",bg:"#261722",surface:"#422a46",text:"#f4f7f3"},
    {id:"atelier-original-0970",name:"Fuchsia Nocturne 0970",accent:"#bab43b",bg:"#f6f8f4",surface:"#fdfdfc",text:"#222635"},
    {id:"atelier-original-0971",name:"Periwinkle Nocturne 0971",accent:"#5cb0cc",bg:"#0d0f14",surface:"#1f2a33",text:"#f7f4f3"},
    {id:"atelier-original-0972",name:"Cherry Nocturne 0972",accent:"#7c274e",bg:"#f0e3e3",surface:"#fdfcfc",text:"#223529"},
    {id:"atelier-original-0973",name:"Cerulean Nocturne 0973",accent:"#7ae265",bg:"#111b15",surface:"#243d25",text:"#f6f3f7"},
    {id:"atelier-original-0974",name:"Pistachio Nocturne 0974",accent:"#2e1e9f",bg:"#f1eef4",surface:"#fcfcfd",text:"#353422"},
    {id:"atelier-original-0975",name:"Lagoon Nocturne 0975",accent:"#eab590",bg:"#272716",surface:"#463b2a",text:"#f3f5f7"},
    {id:"atelier-original-0976",name:"Bronze Nocturne 0976",accent:"#27ce9d",bg:"#f3f8f9",surface:"#fcfdfd",text:"#35222b"},
    {id:"atelier-original-0977",name:"Vermilion Nocturne 0977",accent:"#dc4bdd",bg:"#140d10",surface:"#331f2f",text:"#f3f7f3"},
    {id:"atelier-original-0978",name:"Saffron Nocturne 0978",accent:"#69891a",bg:"#e7eee4",surface:"#fcfdfc",text:"#242235"},
    {id:"atelier-original-0979",name:"Mint Nocturne 0979",accent:"#6e9bd8",bg:"#12101b",surface:"#242a3d",text:"#f7f5f3"},
    {id:"atelier-original-0980",name:"Cyan Nocturne 0980",accent:"#952836",bg:"#f5f0ed",surface:"#fdfcfc",text:"#22352f"},
    {id:"atelier-original-0981",name:"Orchid Nocturne 0981",accent:"#96e3a3",bg:"#192421",surface:"#2a4634",text:"#f7f3f6"},
    {id:"atelier-original-0982",name:"Garnet Nocturne 0982",accent:"#7433c1",bg:"#f8f4f8",surface:"#fdfcfd",text:"#2f3522"},
    {id:"atelier-original-0983",name:"Copper Nocturne 0983",accent:"#d2b356",bg:"#12140d",surface:"#33321f",text:"#f3f4f7"},
    {id:"atelier-original-0984",name:"Jade Nocturne 0984",accent:"#227d81",bg:"#e3e9f0",surface:"#fcfdfd",text:"#352224"},
    {id:"atelier-original-0985",name:"Aqua Nocturne 0985",accent:"#eb5cbb",bg:"#1c1011",surface:"#3d2430",text:"#f3f7f4"},
    {id:"atelier-original-0986",name:"Mulberry Nocturne 0986",accent:"#4ca815",bg:"#eef4ee",surface:"#fcfdfc",text:"#2b2235"},
    {id:"atelier-original-0987",name:"Papaya Nocturne 0987",accent:"#8992f0",bg:"#1f1825",surface:"#2d2a46",text:"#f7f6f3"},
    {id:"atelier-original-0988",name:"Iris Nocturne 0988",accent:"#da421b",bg:"#f9f7f3",surface:"#fdfcfc",text:"#223435"},
    {id:"atelier-original-0989",name:"Teal Nocturne 0989",accent:"#40e794",bg:"#0c1415",surface:"#1f332d",text:"#f7f3f5"},
    {id:"atelier-original-0990",name:"Cobalt Nocturne 0990",accent:"#771291",bg:"#eee4ec",surface:"#fdfcfd",text:"#293522"},
    {id:"atelier-original-0991",name:"Amber Nocturne 0991",accent:"#c4cb7c",bg:"#141a12",surface:"#363d24",text:"#f3f3f7"},
    {id:"atelier-original-0992",name:"Mustard Nocturne 0992",accent:"#366987",bg:"#edeef5",surface:"#fcfcfd",text:"#352622"},
    {id:"atelier-original-0993",name:"Aurora Nocturne 0993",accent:"#d9a0b3",bg:"#261b18",surface:"#462a2e",text:"#f3f7f5"},
    {id:"atelier-original-0994",name:"Flamingo Nocturne 0994",accent:"#4aaf46",bg:"#f4f8f6",surface:"#fcfdfc",text:"#312235"},
    {id:"atelier-original-0995",name:"Ice Nocturne 0995",accent:"#7d66c2",bg:"#140c15",surface:"#281f33",text:"#f6f7f3"},
    {id:"atelier-original-0996",name:"Violet Nocturne 0996",accent:"#75542f",bg:"#f0f0e3",surface:"#fdfdfc",text:"#222e35"},
    {id:"atelier-original-0997",name:"Moss Nocturne 0997",accent:"#58eed5",bg:"#11161a",surface:"#243c3d",text:"#f7f3f4"},
    {id:"atelier-original-0998",name:"Ruby Nocturne 0998",accent:"#ac1198",bg:"#f4eef1",surface:"#fdfcfd",text:"#233522"},
    {id:"atelier-original-0999",name:"Coral Nocturne 0999",accent:"#c6f386",bg:"#172617",surface:"#35462a",text:"#f5f3f7"},
    {id:"atelier-original-1000",name:"Ultramarine Nocturne 1000",accent:"#1651df",bg:"#f4f3f9",surface:"#fcfcfd",text:"#352c22"},
    {id:"atelier-original-1001",name:"Ruby Porcelain 1001",accent:"#ec3c3c",bg:"#14110d",surface:"#33231f",text:"#f3f7f7"},
    {id:"atelier-original-1002",name:"Coral Porcelain 1002",accent:"#0f9536",bg:"#e4eeec",surface:"#fcfdfc",text:"#352233"},
    {id:"atelier-original-1003",name:"Ultramarine Porcelain 1003",accent:"#ab73d3",bg:"#1b1119",surface:"#37243d",text:"#f5f7f3"},
    {id:"atelier-original-1004",name:"Lilac Porcelain 1004",accent:"#8f832d",bg:"#f2f5ed",surface:"#fdfdfc",text:"#222735"},
    {id:"atelier-original-1005",name:"Denim Porcelain 1005",accent:"#9ad4df",bg:"#161a27",surface:"#2a3c46",text:"#f7f4f3"},
    {id:"atelier-original-1006",name:"Peach Porcelain 1006",accent:"#ba3b80",bg:"#f8f4f4",surface:"#fdfcfc",text:"#223527"},
    {id:"atelier-original-1007",name:"Tangerine Porcelain 1007",accent:"#78cc5c",bg:"#0d140f",surface:"#20331f",text:"#f6f3f7"},
    {id:"atelier-original-1008",name:"Chartreuse Porcelain 1008",accent:"#2b277c",bg:"#e9e3f0",surface:"#fcfcfd",text:"#353322"},
    {id:"atelier-original-1009",name:"Petrol Porcelain 1009",accent:"#e28f65",bg:"#1b1a10",surface:"#3d3124",text:"#f3f5f7"},
    {id:"atelier-original-1010",name:"Olive Porcelain 1010",accent:"#1e9f6f",bg:"#eef4f4",surface:"#fcfdfd",text:"#35222c"},
    {id:"atelier-original-1011",name:"Rosewood Porcelain 1011",accent:"#e290ea",bg:"#24191f",surface:"#462a43",text:"#f3f7f3"},
    {id:"atelier-original-1012",name:"Lime Porcelain 1012",accent:"#abce27",bg:"#f5f9f3",surface:"#fcfdfc",text:"#232235"},
    {id:"atelier-original-1013",name:"Fuchsia Porcelain 1013",accent:"#4b94dd",bg:"#0d0d14",surface:"#1f2533",text:"#f7f5f3"},
    {id:"atelier-original-1014",name:"Periwinkle Porcelain 1014",accent:"#891a31",bg:"#eee7e4",surface:"#fdfcfc",text:"#22352e"},
    {id:"atelier-original-1015",name:"Cherry Porcelain 1015",accent:"#6ed877",bg:"#101c18",surface:"#243d2b",text:"#f7f3f6"},
    {id:"atelier-original-1016",name:"Cerulean Porcelain 1016",accent:"#512895",bg:"#f4edf5",surface:"#fdfcfd",text:"#313522"},
    {id:"atelier-original-1017",name:"Pistachio Porcelain 1017",accent:"#e3ca96",bg:"#222518",surface:"#46422a",text:"#f3f4f7"},
    {id:"atelier-original-1018",name:"Lagoon Porcelain 1018",accent:"#33c1bc",bg:"#f4f6f8",surface:"#fcfdfd",text:"#352226"},
    {id:"atelier-original-1019",name:"Bronze Porcelain 1019",accent:"#d256b3",bg:"#150c0e",surface:"#331f2a",text:"#f3f7f4"},
    {id:"atelier-original-1020",name:"Vermilion Porcelain 1020",accent:"#4d8122",bg:"#e3f0e3",surface:"#fcfdfc",text:"#292235"},
    {id:"atelier-original-1021",name:"Saffron Porcelain 1021",accent:"#5c73eb",bg:"#15121a",surface:"#25243d",text:"#f7f6f3"},
    {id:"atelier-original-1022",name:"Mint Porcelain 1022",accent:"#a82815",bg:"#f4f1ee",surface:"#fdfcfc",text:"#223534"},
    {id:"atelier-original-1023",name:"Cyan Porcelain 1023",accent:"#89f0b4",bg:"#182626",surface:"#2a463b",text:"#f7f3f5"},
    {id:"atelier-original-1024",name:"Orchid Porcelain 1024",accent:"#a31bda",bg:"#f9f3f8",surface:"#fdfcfd",text:"#2a3522"},
    {id:"atelier-original-1025",name:"Garnet Porcelain 1025",accent:"#e7e740",bg:"#10150c",surface:"#2f331f",text:"#f3f3f7"},
    {id:"atelier-original-1026",name:"Copper Porcelain 1026",accent:"#126c91",bg:"#e4e7ee",surface:"#fcfcfd",text:"#352422"},
    {id:"atelier-original-1027",name:"Jade Porcelain 1027",accent:"#cb7c9c",bg:"#1a1311",surface:"#3d242a",text:"#f3f7f5"},
    {id:"atelier-original-1028",name:"Aqua Porcelain 1028",accent:"#408736",bg:"#edf5f0",surface:"#fcfdfc",text:"#2f2235"},
    {id:"atelier-original-1029",name:"Mulberry Porcelain 1029",accent:"#aaa0d9",bg:"#221726",surface:"#342a46",text:"#f6f7f3"},
    {id:"atelier-original-1030",name:"Papaya Porcelain 1030",accent:"#af7646",bg:"#f8f8f4",surface:"#fdfdfc",text:"#222f35"},
    {id:"atelier-original-1031",name:"Iris Porcelain 1031",accent:"#66c2ab",bg:"#0d1214",surface:"#1f3332",text:"#f7f3f4"},
    {id:"atelier-original-1032",name:"Teal Porcelain 1032",accent:"#752f71",bg:"#f0e3e9",surface:"#fdfcfd",text:"#243522"},
    {id:"atelier-original-1033",name:"Cobalt Porcelain 1033",accent:"#bcee58",bg:"#111b11",surface:"#303d24",text:"#f4f3f7"},
    {id:"atelier-original-1034",name:"Amber Porcelain 1034",accent:"#114aac",bg:"#eeeef4",surface:"#fcfcfd",text:"#352b22"},
    {id:"atelier-original-1035",name:"Mustard Porcelain 1035",accent:"#f3868f",bg:"#271f16",surface:"#462d2a",text:"#f3f7f6"},
    {id:"atelier-original-1036",name:"Aurora Porcelain 1036",accent:"#16df41",bg:"#f3f9f7",surface:"#fcfdfc",text:"#352234"},
    {id:"atelier-original-1037",name:"Flamingo Porcelain 1037",accent:"#953cec",bg:"#140d13",surface:"#2d1f33",text:"#f5f7f3"},
    {id:"atelier-original-1038",name:"Ice Porcelain 1038",accent:"#95790f",bg:"#eceee4",surface:"#fdfdfc",text:"#222935"},
    {id:"atelier-original-1039",name:"Violet Porcelain 1039",accent:"#73cad3",bg:"#10141b",surface:"#24363d",text:"#f7f3f3"},
    {id:"atelier-original-1040",name:"Moss Porcelain 1040",accent:"#8f2d6a",bg:"#f5edee",surface:"#fdfcfc",text:"#223526"},
    {id:"atelier-original-1041",name:"Ice Velvet 1041",accent:"#b1df9a",bg:"#19241c",surface:"#2e462a",text:"#f5f3f7"},
    {id:"atelier-original-1042",name:"Violet Velvet 1042",accent:"#3b3fba",bg:"#f6f4f8",surface:"#fcfcfd",text:"#353122"},
    {id:"atelier-original-1043",name:"Moss Velvet 1043",accent:"#cc795c",bg:"#14130d",surface:"#33281f",text:"#f3f6f7"},
    {id:"atelier-original-1044",name:"Ruby Velvet 1044",accent:"#277c56",bg:"#e3f0f0",surface:"#fcfdfd",text:"#35222e"},
    {id:"atelier-original-1045",name:"Coral Velvet 1045",accent:"#ce65e2",bg:"#1c1017",surface:"#3d243c",text:"#f4f7f3"},
    {id:"atelier-original-1046",name:"Ultramarine Velvet 1046",accent:"#8e9f1e",bg:"#f0f4ee",surface:"#fdfdfc",text:"#222235"},
    {id:"atelier-original-1047",name:"Lilac Velvet 1047",accent:"#90c4ea",bg:"#181825",surface:"#2a3546",text:"#f7f5f3"},
    {id:"atelier-original-1048",name:"Denim Velvet 1048",accent:"#ce2757",bg:"#f9f4f3",surface:"#fdfcfc",text:"#22352c"},
    {id:"atelier-original-1049",name:"Peach Velvet 1049",accent:"#4bdd4c",bg:"#0c1511",surface:"#1f3323",text:"#f7f3f7"},
    {id:"atelier-original-1050",name:"Tangerine Velvet 1050",accent:"#3b1a89",bg:"#ece4ee",surface:"#fdfcfd",text:"#323522"},
    {id:"atelier-original-1051",name:"Chartreuse Velvet 1051",accent:"#d8ad6e",bg:"#181a12",surface:"#3d3724",text:"#f3f4f7"},
    {id:"atelier-original-1052",name:"Petrol Velvet 1052",accent:"#289588",bg:"#edf2f5",surface:"#fcfdfd",text:"#352227"},
    {id:"atelier-original-1053",name:"Olive Velvet 1053",accent:"#e396d6",bg:"#26181b",surface:"#462a3c",text:"#f3f7f4"},
    {id:"atelier-original-1054",name:"Rosewood Velvet 1054",accent:"#7fc133",bg:"#f4f8f4",surface:"#fcfdfc",text:"#282235"},
    {id:"atelier-original-1055",name:"Lime Velvet 1055",accent:"#5674d2",bg:"#0f0c15",surface:"#1f1f33",text:"#f7f6f3"},
    {id:"atelier-original-1056",name:"Fuchsia Velvet 1056",accent:"#812722",bg:"#f0e9e3",surface:"#fdfcfc",text:"#223533"},
    {id:"atelier-original-1057",name:"Periwinkle Velvet 1057",accent:"#5ceb8c",bg:"#111a1a",surface:"#243d31",text:"#f7f3f5"},
    {id:"atelier-original-1058",name:"Cherry Velvet 1058",accent:"#7215a8",bg:"#f4eef4",surface:"#fdfcfd",text:"#2c3522"},
    {id:"atelier-original-1059",name:"Cerulean Velvet 1059",accent:"#f0e989",bg:"#1e2617",surface:"#43462a",text:"#f3f3f7"},
    {id:"atelier-original-1060",name:"Pistachio Velvet 1060",accent:"#1bb1da",bg:"#f3f5f9",surface:"#fcfcfd",text:"#352322"},
    {id:"atelier-original-1061",name:"Lagoon Velvet 1061",accent:"#e74093",bg:"#140e0d",surface:"#331f25",text:"#f3f7f5"},
    {id:"atelier-original-1062",name:"Bronze Velvet 1062",accent:"#2b9112",bg:"#e4eee7",surface:"#fcfdfc",text:"#2e2235"},
    {id:"atelier-original-1063",name:"Vermilion Velvet 1063",accent:"#837ccb",bg:"#17111b",surface:"#2b243d",text:"#f6f7f3"},
    {id:"atelier-original-1064",name:"Saffron Velvet 1064",accent:"#875536",bg:"#f5f4ed",surface:"#fdfdfc",text:"#223135"},
    {id:"atelier-original-1065",name:"Mint Velvet 1065",accent:"#a0d9c7",bg:"#162327",surface:"#2a4643",text:"#f7f3f4"},
    {id:"atelier-original-1066",name:"Cyan Velvet 1066",accent:"#ac46af",bg:"#f8f4f6",surface:"#fdfcfd",text:"#263522"},
    {id:"atelier-original-1067",name:"Orchid Velvet 1067",accent:"#aac266",bg:"#0e140d",surface:"#2a331f",text:"#f4f3f7"},
    {id:"atelier-original-1068",name:"Garnet Velvet 1068",accent:"#2f4e75",bg:"#e3e3f0",surface:"#fcfcfd",text:"#352922"},
    {id:"atelier-original-1069",name:"Copper Velvet 1069",accent:"#ee5870",bg:"#1b1510",surface:"#3d2524",text:"#f3f7f6"},
    {id:"atelier-original-1070",name:"Jade Velvet 1070",accent:"#11ac26",bg:"#eef4f2",surface:"#fcfdfc",text:"#342235"},
    {id:"atelier-original-1071",name:"Aqua Velvet 1071",accent:"#b586f3",bg:"#241924",surface:"#3c2a46",text:"#f5f7f3"},
    {id:"atelier-original-1072",name:"Mulberry Velvet 1072",accent:"#dfa616",bg:"#f8f9f3",surface:"#fdfdfc",text:"#222a35"},
    {id:"atelier-original-1073",name:"Papaya Velvet 1073",accent:"#3ceaec",bg:"#0d1014",surface:"#1f2f33",text:"#f7f3f3"},
    {id:"atelier-original-1074",name:"Iris Velvet 1074",accent:"#950f6c",bg:"#eee4e7",surface:"#fdfcfc",text:"#223524"},
    {id:"atelier-original-1075",name:"Teal Velvet 1075",accent:"#9ad373",bg:"#101c12",surface:"#293d24",text:"#f5f3f7"},
    {id:"atelier-original-1076",name:"Cobalt Velvet 1076",accent:"#2d398f",bg:"#f0edf5",surface:"#fcfcfd",text:"#353022"},
    {id:"atelier-original-1077",name:"Amber Velvet 1077",accent:"#dfa69a",bg:"#252218",surface:"#46352a",text:"#f3f6f7"},
    {id:"atelier-original-1078",name:"Mustard Velvet 1078",accent:"#3bba76",bg:"#f4f8f8",surface:"#fcfdfd",text:"#35222f"},
    {id:"atelier-original-1079",name:"Aurora Velvet 1079",accent:"#b15ccc",bg:"#150c12",surface:"#321f33",text:"#f4f7f3"},
    {id:"atelier-original-1080",name:"Flamingo Velvet 1080",accent:"#787c27",bg:"#e9f0e3",surface:"#fdfdfc",text:"#222435"},
    {id:"atelier-original-1081",name:"Mustard Atelier 1081",accent:"#65b7e2",bg:"#12121a",surface:"#242f3d",text:"#f7f4f3"},
    {id:"atelier-original-1082",name:"Aurora Atelier 1082",accent:"#9f1e4d",bg:"#f4eeee",surface:"#fdfcfc",text:"#22352b"},
    {id:"atelier-original-1083",name:"Flamingo Atelier 1083",accent:"#96ea90",bg:"#18261f",surface:"#2a462e",text:"#f6f3f7"},
    {id:"atelier-original-1084",name:"Ice Atelier 1084",accent:"#4c27ce",bg:"#f7f3f9",surface:"#fcfcfd",text:"#343522"},
    {id:"atelier-original-1085",name:"Violet Atelier 1085",accent:"#dd964b",bg:"#14150c",surface:"#332d1f",text:"#f3f5f7"},
    {id:"atelier-original-1086",name:"Moss Atelier 1086",accent:"#1a8973",bg:"#e4ecee",surface:"#fcfdfd",text:"#352229"},
    {id:"atelier-original-1087",name:"Ruby Atelier 1087",accent:"#d86ece",bg:"#1a1114",surface:"#3d2435",text:"#f3f7f3"},
    {id:"atelier-original-1088",name:"Coral Atelier 1088",accent:"#6b9528",bg:"#eef5ed",surface:"#fcfdfc",text:"#262235"},
    {id:"atelier-original-1089",name:"Ultramarine Atelier 1089",accent:"#96afe3",bg:"#1b1726",surface:"#2a2d46",text:"#f7f5f3"},
    {id:"atelier-original-1090",name:"Lilac Atelier 1090",accent:"#c13338",bg:"#f8f6f4",surface:"#fdfcfc",text:"#223531"},
    {id:"atelier-original-1091",name:"Denim Atelier 1091",accent:"#56d276",bg:"#0d1413",surface:"#1f3328",text:"#f7f3f6"},
    {id:"atelier-original-1092",name:"Peach Atelier 1092",accent:"#572281",bg:"#f0e3f0",surface:"#fdfcfd",text:"#2e3522"},
    {id:"atelier-original-1093",name:"Tangerine Atelier 1093",accent:"#ebd55c",bg:"#161b11",surface:"#3b3d24",text:"#f3f4f7"},
    {id:"atelier-original-1094",name:"Chartreuse Atelier 1094",accent:"#1594a8",bg:"#eef0f4",surface:"#fcfdfd",text:"#352222"},
    {id:"atelier-original-1095",name:"Petrol Atelier 1095",accent:"#f089c4",bg:"#271716",surface:"#462a34",text:"#f3f7f5"},
    {id:"atelier-original-1096",name:"Olive Atelier 1096",accent:"#50da1b",bg:"#f3f9f4",surface:"#fcfdfc",text:"#2c2235"},
    {id:"atelier-original-1097",name:"Rosewood Atelier 1097",accent:"#4340e7",bg:"#110d14",surface:"#231f33",text:"#f6f7f3"},
    {id:"atelier-original-1098",name:"Lime Atelier 1098",accent:"#913912",bg:"#eeece4",surface:"#fdfdfc",text:"#223235"},
    {id:"atelier-original-1099",name:"Fuchsia Atelier 1099",accent:"#7ccbab",bg:"#10191b",surface:"#243d38",text:"#f7f3f4"},
    {id:"atelier-original-1100",name:"Periwinkle Atelier 1100",accent:"#7e3687",bg:"#f5edf2",surface:"#fdfcfd",text:"#273522"},
    {id:"atelier-original-1101",name:"Cherry Atelier 1101",accent:"#cfd9a0",bg:"#1c2419",surface:"#3b462a",text:"#f4f3f7"},
    {id:"atelier-original-1102",name:"Cerulean Atelier 1102",accent:"#467daf",bg:"#f4f4f8",surface:"#fcfcfd",text:"#352822"},
    {id:"atelier-original-1103",name:"Pistachio Atelier 1103",accent:"#c2667c",bg:"#140f0d",surface:"#331f1f",text:"#f3f7f6"},
    {id:"atelier-original-1104",name:"Lagoon Atelier 1104",accent:"#2f7532",bg:"#e3f0e9",surface:"#fcfdfc",text:"#332235"},
    {id:"atelier-original-1105",name:"Bronze Atelier 1105",accent:"#8c58ee",bg:"#1b101c",surface:"#32243d",text:"#f5f7f3"},
    {id:"atelier-original-1106",name:"Vermilion Atelier 1106",accent:"#ac7411",bg:"#f4f4ee",surface:"#fdfdfc",text:"#222c35"},
    {id:"atelier-original-1107",name:"Saffron Atelier 1107",accent:"#86f3ec",bg:"#181e25",surface:"#2a4246",text:"#f7f3f3"},
    {id:"atelier-original-1108",name:"Mint Atelier 1108",accent:"#df16b2",bg:"#f9f3f5",surface:"#fdfcfc",text:"#223523"},
    {id:"atelier-original-1109",name:"Cyan Atelier 1109",accent:"#91ec3c",bg:"#0c150d",surface:"#24331f",text:"#f5f3f7"},
    {id:"atelier-original-1110",name:"Orchid Atelier 1110",accent:"#0f2995",bg:"#e7e4ee",surface:"#fcfcfd",text:"#352e22"}
  ];}
  // V10: Resolve the selected HA theme locally. Never call setTheme() or mutate document styles.
  private crResolvedTheme(){
    const palette=this.crPalettes().find(p=>p.id===this.crTheme)||this.crPalettes()[0];
    const registry=(this.hass as unknown as {themes?:{themes?:Record<string,Record<string,unknown>>;darkMode?:boolean;theme?:string}})?.themes;
    const selected=this.crHATheme || registry?.theme || "";
    const raw=registry?.themes?.[selected];
    const dark=this.crHAMode==="dark" || (this.crHAMode==="auto" && !!registry?.darkMode);
    const modes=raw?.["modes"] as Record<string,Record<string,unknown>>|undefined;
    const mode=(modes?.[dark?"dark":"light"] || raw?.[dark?"dark":"light"] || {}) as Record<string,unknown>;
    const values:Record<string,string>={};
    const assign=(obj:Record<string,unknown>|undefined)=>{
      if(!obj)return;
      for(const [key,val] of Object.entries(obj)){
        if(typeof val==="string" || typeof val==="number") values[key.replace(/^--/,"")]=String(val).trim();
      }
    };
    assign(raw);assign(mode);
    // Resolve var(--some-token, fallback) inside theme definitions, including nested references.
    const resolve=(key:string,depth=0):string=>{
      if(depth>10)return "";
      let val=values[key]||"";
      if(!val)return "";
      return val.replace(/var\(\s*--([\w-]+)\s*(?:,\s*([^()]*))?\)/g,(_m,k:string,fallback:string)=>resolve(k,depth+1)||fallback?.trim()||"");
    };
    const ha=false;
    const fallback=ha?(dark?{accent:"#75a7dc",bg:"#141a22",surface:"#252d37",text:"#f4f6fa",muted:"#b7c0cc"}:{accent:"#386da6",bg:"#f5f6f9",surface:"#ffffff",text:"#202733",muted:"#586474"}):{accent:palette.accent,bg:palette.bg,surface:palette.surface,text:palette.text,muted:this.crIsLightColor(palette.bg)?"#746c80":"#b9b2c6"};
    const pick=(defaultValue:string,...keys:string[])=>{
      if(!ha)return defaultValue;
      for(const key of keys){const value=resolve(key);if(value)return value;}
      // Only read inherited HA variables for the current active theme, not a different selected theme.
      if(!raw && !this.crHATheme && this.crHAMode==="auto"){
        for(const key of keys){const value=getComputedStyle(document.documentElement).getPropertyValue(`--${key}`).trim();if(value)return value;}
      }
      return defaultValue;
    };
    const accent=pick(fallback.accent,"accent-color","primary-color","state-icon-color");
    const bg=pick(fallback.bg,"lovelace-background","primary-background-color");
    const surface=pick(fallback.surface,"ha-card-background","card-background-color","secondary-background-color");
    const fg=pick(fallback.text,"primary-text-color");
    const muted=pick(fallback.muted,"secondary-text-color","disabled-text-color");
    const light=this.crIsLightColor(bg) || (ha && !/^#[0-9a-f]{3,8}$/i.test(bg) && !dark);
    // Some HA themes declare light text over a light background (or the inverse)
    // because their text variables are intended for a different surface.
    const luminance=(color:string):number|null=>{
      const v=color.trim(); const hex=v.match(/^#([\da-f]{3}|[\da-f]{6}|[\da-f]{8})$/i);
      let rgb:number[]|null=null;
      if(hex){let h=hex[1];if(h.length===3)h=h.split("").map(c=>c+c).join("");rgb=[0,2,4].map(i=>parseInt(h.slice(i,i+2),16));}
      else {const m=v.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);if(m)rgb=[+m[1],+m[2],+m[3]];}
      if(!rgb)return null;
      const c=rgb.map(x=>{const n=x/255;return n<=0.04045?n/12.92:((n+0.055)/1.055)**2.4;});
      return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
    };
    const surfaceLum=luminance(surface)??luminance(bg);
    const bgLum=luminance(bg);
    const textLum=luminance(fg);
    const ratio=surfaceLum===null||textLum===null?99:(Math.max(surfaceLum,textLum)+0.05)/(Math.min(surfaceLum,textLum)+0.05);
    const safeFg=ratio<4.5?((surfaceLum??(light?1:0))>0.18?"#17202b":"#f7f8fc"):fg;
    const bgRatio=bgLum===null||textLum===null?99:(Math.max(bgLum,textLum)+0.05)/(Math.min(bgLum,textLum)+0.05);
    const bgFg=bgRatio<4.5?((bgLum??(light?1:0))>0.18?"#17202b":"#f7f8fc"):fg;
    const onAccent=(luminance(accent)??0.5)>0.18?"#10151d":"#ffffff";
    // HACS mode: neutral black/white controls, independent of the theme accent.
    const neutral=(value:string,defaultLight:boolean)=>((luminance(value)??(defaultLight?1:0))>0.179?"#111111":"#ffffff");
    const neutralBg=neutral(bg,light);
    const neutralSurface=neutral(surface,light);
    const neutralButton=neutralBg==="#111111"?"#111111":"#ffffff";
    const neutralButtonText=neutralButton==="#111111"?"#ffffff":"#111111";
    const mutedLum=luminance(muted);
    const mutedRatio=surfaceLum===null||mutedLum===null?99:(Math.max(surfaceLum,mutedLum)+0.05)/(Math.min(surfaceLum,mutedLum)+0.05);
    const safeMuted=mutedRatio<3?((surfaceLum??(light?1:0))>0.18?"#485363":"#bfc8d4"):muted;
    return {accent,bg,surface,fg:safeFg,bgFg,muted:safeMuted,onAccent,light,ha,resolve,pick,neutralBg,neutralSurface,neutralButton,neutralButtonText};
  }
  private crThemeVars(){
    const t=this.crResolvedTheme();
    const radius=this.crThemeStyle==="minimal"?"9px":this.crThemeStyle==="solid"?"15px":"22px";
    const css:Record<string,string>={
      "--cr-accent":t.accent,"--cr-bg":t.bg,"--cr-surface":t.surface,"--cr-text":t.fg,"--cr-bg-text":t.bgFg,"--cr-on-accent":t.onAccent,"--cr-muted":t.muted,
      "--cr-neutral-bg":t.neutralBg,"--cr-neutral-surface":t.neutralSurface,"--cr-neutral-button":t.neutralButton,"--cr-neutral-button-text":t.neutralButtonText,
      "--cr-is-light":t.light?"1":"0","--cr-radius":radius,"--cr-blur":this.crThemeStyle==="glass"?"blur(22px)":"none",
      "--primary-color":t.accent,"--accent-color":t.accent,"--primary-text-color":t.fg,"--secondary-text-color":t.muted,
      "--primary-background-color":t.bg,"--card-background-color":t.surface,"--ha-card-background":t.surface,
      "--paper-item-icon-color":t.accent,"--state-icon-color":t.accent,"--mdc-theme-primary":t.accent,"--mdc-theme-on-primary":t.onAccent
    };
    if(t.ha){
      // Forward *all* theme tokens to this dashboard's subtree (glass, border, shadow, etc.).
      const registry=(this.hass as unknown as {themes?:{themes?:Record<string,Record<string,unknown>>;theme?:string;darkMode?:boolean}})?.themes;
      const raw=registry?.themes?.[this.crHATheme||registry?.theme||""];
      const dark=this.crHAMode==="dark"||(this.crHAMode==="auto"&&!!registry?.darkMode);
      const modes=raw?.["modes"] as Record<string,Record<string,unknown>>|undefined;
      const mode=(modes?.[dark?"dark":"light"]||raw?.[dark?"dark":"light"]||{}) as Record<string,unknown>;
      for(const source of [raw,mode])for(const [key,value] of Object.entries(source||{})){
        if((typeof value==="string"||typeof value==="number") && !key.startsWith("modes")){
          const name=`--${key.replace(/^--/,"")}`;
          css[name]=String(value);
        }
      }
      // Semantic values win over theme aliases so ControlRoom components remain consistent.
      css["--primary-color"]=t.accent;css["--accent-color"]=t.accent;
      css["--primary-background-color"]=t.bg;css["--primary-text-color"]=t.fg;
      css["--secondary-text-color"]=t.muted;css["--card-background-color"]=t.surface;
      css["--paper-item-icon-color"]=t.accent;css["--state-icon-color"]=t.accent;
      css["--mdc-theme-primary"]=t.accent;css["--mdc-theme-on-primary"]=t.onAccent;css["--ha-card-background"]=t.surface;
    }
    return Object.entries(css).map(([key,value])=>`${key}:${value}`).join(";")+";";
  }
  private crThemeIsLight():boolean{return this.crResolvedTheme().light;}
  private crIsLightColor(color:string):boolean{
    const hex=color.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if(!hex)return false;
    const raw=hex[1].length===3?hex[1].split("").map(c=>c+c).join(""):hex[1];
    const n=parseInt(raw,16);
    return (0.2126*((n>>16)&255)+0.7152*((n>>8)&255)+0.0722*(n&255))>145;
  }
  private crAvailableHAThemes():string[]{
    const themes=(this.hass as unknown as {themes?:{themes?:Record<string,unknown>}})?.themes?.themes;
    return themes?Object.keys(themes).sort((a,b)=>a.localeCompare(b)):[];
  }
  private cancelCRTheme(){if(this.crThemeSnapshot){const v=JSON.parse(this.crThemeSnapshot);this.crTheme=v.theme;this.crThemeStyle=v.style;this.crThemeSource="controlroom";this.crHATheme="";this.crHAMode="auto";}this.settingsSection="overview";}
  private saveCRTheme(){
    try{localStorage.setItem("controlroom-theme-v1",JSON.stringify(this.crThemeData()));}catch(error){console.warn(error);}
    // External theme colors are applied locally; do not change the HA theme for other dashboards.
    this.crThemeSnapshot=JSON.stringify(this.crThemeData());this.settingsSection="overview";
  }
  private renderThemeSettings(){
    const all=this.crPalettes();
    const query=this.crThemeSearch.trim().toLocaleLowerCase();
    const filtered=all.filter(p=>{
      if(query && !p.name.toLocaleLowerCase().includes(query))return false;
      if(this.crThemeFilter==="light" && !this.crIsLightColor(p.bg))return false;
      if(this.crThemeFilter==="dark" && this.crIsLightColor(p.bg))return false;
      if(this.crThemeFilter==="favorites" && !["purple","blue","emerald","burgundy","rose-noir","gold","pearl","obsidian"].includes(p.id))return false;
      return true;
    });
    const perPage=24;
    const pages=Math.max(1,Math.ceil(filtered.length/perPage));
    const page=Math.min(this.crThemePage,pages-1);
    const visible=filtered.slice(page*perPage,(page+1)*perPage);
    const selected=all.find(p=>p.id===this.crTheme)||all[0];
    return html`<div class="settings-center cr-theme-studio cr-theme-studio-v17">
      <button class="settings-back" @click=${()=>this.cancelCRTheme()}>${this.renderIcon("mdi:arrow-left")} Einstellungen</button>
      <div class="cr-room-visual-head"><div class="cr-room-kicker">CONTROLROOM · DESIGN COLLECTION</div><h2>Theme Atelier</h2><p>${all.length} exklusive ControlRoom Farbwelten. Entdecke deinen persönlichen Look.</p></div>
      <div class="cr-theme-current"><span class="cr-theme-current-swatch" style=${`background:linear-gradient(135deg,${selected.bg},${selected.surface} 58%,${selected.accent})`}></span><span><small>AKTUELLE AUSWAHL</small><strong>${selected.name}</strong><small>${this.crThemeStyle==="glass"?"Glass Premium":this.crThemeStyle==="solid"?"Modern Solid":"Minimal"}</small></span>${this.renderIcon("mdi:check-decagram")}</div>
      <div class="cr-theme-tools"><label class="cr-theme-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Farbwelt suchen …" .value=${this.crThemeSearch} @input=${(e:Event)=>{this.crThemeSearch=(e.target as HTMLInputElement).value;this.crThemePage=0;}} /></label><div class="cr-theme-filters">${([['all','Alle'],['favorites','Klassiker'],['dark','Dunkel'],['light','Hell']] as const).map(([id,name])=>html`<button class=${this.crThemeFilter===id?'active':''} @click=${()=>{this.crThemeFilter=id;this.crThemePage=0;}}>${name}</button>`)}</div></div>
      <div class="cr-theme-collection-heading"><h3>Farbwelten</h3><span>${filtered.length} Designs · Seite ${page+1} / ${pages}</span></div>
      <div class="cr-theme-grid">${visible.map(p=>html`<button class="cr-theme-choice ${this.crTheme===p.id?'chosen':''}" @click=${()=>{this.crTheme=p.id;this.crThemeSource="controlroom";this.requestUpdate();}}><span class="cr-theme-preview" style=${`background:${p.bg};color:${p.text}`}><span style=${`background:${p.accent}`}></span><i style=${`background:${p.surface}`}></i><i style=${`background:${p.surface}`}></i></span><strong>${p.name}</strong>${this.crTheme===p.id?this.renderIcon("mdi:check-circle"):nothing}</button>`)}</div>
      ${filtered.length===0?html`<p class="settings-note">Keine Farbwelt gefunden. Probiere einen anderen Suchbegriff.</p>`:nothing}
      ${pages>1?html`<div class="cr-theme-pagination"><button ?disabled=${page===0} @click=${()=>{this.crThemePage=Math.max(0,page-1);}}>‹ Zurück</button><span>${page+1} / ${pages}</span><button ?disabled=${page>=pages-1} @click=${()=>{this.crThemePage=Math.min(pages-1,page+1);}}>Weiter ›</button></div>`:nothing}
      <h3>Visual Style</h3><div class="cr-theme-style-list">${([['glass','Glass Premium','Transparenz und weiche Glaseffekte'],['solid','Modern Solid','Klare, elegante Oberflächen'],['minimal','Minimal','Reduziert und kompakt']] as const).map(([id,title,desc])=>html`<button class=${this.crThemeStyle===id?'chosen':''} @click=${()=>{this.crThemeStyle=id;this.requestUpdate();}}><strong>${title}</strong><small>${desc}</small>${this.crThemeStyle===id?this.renderIcon("mdi:check-circle"):nothing}</button>`)}</div>
      <div class="cr-theme-actions"><span class="cr-theme-action-caption">${selected.name}</span><button @click=${()=>this.cancelCRTheme()}>Abbrechen</button><button @click=${()=>this.saveCRTheme()}>Speichern</button></div>
    </div>`;
  }

  private roomKind(name: string): string {
    const n=name.toLocaleLowerCase().replace(/([a-z])([A-Z])/g,"$1 $2").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    const rules: Array<[string,RegExp]> = [
      ["gastezimmer",/gastezimmer|gästezimmer|guest room|quarto de hospedes/],["kinderzimmer",/kinderzimmer|kids room|nursery|quarto infantil/],["fitnessraum",/fitnessraum|fitness room|gym|academia/],["controlraum",/controlraum|controlroom|control room|technikraum|technical room|sala tecnica|sala de controle|serverraum|server room|hauszentrale|smart home hub/],["pooltechnik",/pooltechnik|piscina tecnica|pumpenraum|pool equipment|pool plant/],["heizungsraum",/heizungsraum|heizraum|boiler room|heating room|sala de aquecimento/],["solartechnik",/solartechnik|solar room|pv technik|photovoltaik|inverterraum|sala solar/],["wintergarten",/wintergarten|conservatory|jardim de inverno/],["terrasse",/terrasse|terrace|terraco|patio/],["pool",/pool|piscina|schwimmbad|swimming/],["garten",/garten|garden|jardim|quintal/],["wohnzimmer",/wohn|living|lounge|sala/],["schlafzimmer",/schlaf|bedroom|quarto/],
      ["kuche",/kuche|kitchen|cozinha/],["badezimmer",/bad|bath|banho|wc|toilet/],
      ["esszimmer",/esszimmer|dining|jantar/],["balkon",/balkon|balcon/],
      ["flur",/flur|hall|eingang|corredor|foyer/],["buro",/buro|office|escritorio|arbeitszimmer/],
      ["garage",/garage|garagem|carport/],["keller",/keller|basement|por[aã]o|adega|cellar/],
      ["waschkuche",/wasch|laundry|lavanderia/],["hobbyraum",/hobby|spielzimmer|game|fitness|gym/]
    ];
    return rules.find(([,pattern])=>pattern.test(n))?.[0] || "generic";
  }

  private roomIcon(name: string): string {
    const icons:Record<string,string>={wohnzimmer:"mdi:sofa-outline",schlafzimmer:"mdi:bed-king-outline",kuche:"mdi:chef-hat",badezimmer:"mdi:bathtub-outline",esszimmer:"mdi:table-furniture",balkon:"mdi:flower-outline",flur:"mdi:door-open",buro:"mdi:desk",garage:"mdi:garage-variant",keller:"mdi:archive-outline",waschkuche:"mdi:washing-machine",hobbyraum:"mdi:controller-classic-outline",controlraum:"mdi:server-network",pool:"mdi:pool",garten:"mdi:flower-outline",pooltechnik:"mdi:pump",heizungsraum:"mdi:radiator",solartechnik:"mdi:solar-power",terrasse:"mdi:flower-outline",wintergarten:"mdi:greenhouse",gastezimmer:"mdi:bed-outline",kinderzimmer:"mdi:teddy-bear",fitnessraum:"mdi:dumbbell",generic:"mdi:home-outline"};
    return icons[this.roomKind(name)];
  }

  private roomArt(areaId:string,name:string) {
    const own=this.roomImages[areaId];
    const mode=this.roomStyleByArea[areaId] || this.roomStyle;
    const automatic=this.roomAutoSwitch && !this.roomStyleByArea[areaId] && mode!=="custom";
    const selected=automatic && Math.floor(this.currentTime.getTime()/86400000)%2===1 ? (mode==="3d"?"photos":"3d") : mode;
    const kind=this.roomKind(name);
    const fallback=`/local/controlroom-dashboard/Rooms_Assets/rooms/${kind}.webp`;
    const genericFallback=`/local/controlroom-dashboard/Rooms_Assets/rooms/wohnzimmer.webp`;
    const photoKinds:Record<string,string>={pooltechnik:"heizungsraum",solartechnik:"controlraum",wintergarten:"terrasse",generic:"wohnzimmer",esszimmer:"esszimmer"};
    const photoKind=photoKinds[kind] || kind;
    const premiumPhoto=`/local/controlroom-dashboard/Premium-Fotos/controlroom-premium-fotos/${photoKind}.webp`;
    const image=selected==="custom" ? (own || fallback) : selected==="photos" ? (this.roomPhotoUrls[kind] || premiumPhoto) : fallback;
    return image ? html`<img class=${selected==="3d"?"cr-art-3d":"cr-art-photo"} src=${image} alt=${name} loading="lazy" @error=${(e:Event)=>{const el=e.target as HTMLImageElement;if(el.dataset.fallbackStep==="2"){el.style.display="none";}else if(el.dataset.fallbackStep==="1"){el.dataset.fallbackStep="2";el.src=genericFallback;}else{el.dataset.fallbackStep="1";el.src=fallback;}}}/>${this.renderIcon(this.roomIcon(name))}` : this.renderIcon(this.roomIcon(name));
  }

  private saveRoomVisualSettings():void {
    try { localStorage.setItem("controlroom-room-style-v1",JSON.stringify({style:this.roomStyle,auto:this.roomAutoSwitch,byArea:this.roomStyleByArea,photos:this.roomPhotoUrls,images:this.roomImages})); }
    catch(error){console.warn("ControlRoom: room visual settings not saved",error);}
    try{localStorage.setItem("controlroom-room-images-v1",JSON.stringify(this.roomImages));}catch(error){console.warn(error);}
    this.roomStyleSnapshot=JSON.stringify(this.roomVisualData());this.roomStyleEditor=false;this.settingsSection="overview";
  }
  private roomVisualData(){return {style:this.roomStyle,auto:this.roomAutoSwitch,byArea:this.roomStyleByArea,photos:this.roomPhotoUrls,images:this.roomImages};}
  private cancelRoomVisualSettings():void {
    if(this.roomStyleSnapshot){const v=JSON.parse(this.roomStyleSnapshot);this.roomStyle=v.style;this.roomAutoSwitch=v.auto;this.roomStyleByArea=v.byArea;this.roomPhotoUrls=v.photos;this.roomImages=v.images||{};}
    this.roomStyleEditor=false;this.settingsSection="overview";
  }
  private renderRoomStyleEditor(areas:Array<[string,string]>) {
    return html`<div class="cr-room-visual-editor"><div class="cr-room-visual-head"><div class="cr-room-kicker">CONTROLROOM · PERSONALISIERUNG</div><h2>Räume – Bildstil</h2><p>Wähle Premium 3D, Premium Fotos oder eigene Bilder für jeden Raum.</p></div>
      <label class="welcome-setting-text">Standard-Bildstil<select .value=${this.roomStyle} @change=${(e:Event)=>this.roomStyle=(e.target as HTMLSelectElement).value as typeof this.roomStyle}><option value="3d">Premium 3D</option><option value="photos">Premium Fotos</option><option value="custom">Eigene Fotos</option></select></label>
      <label class="welcome-setting-row"><span>Automatischer Bildwechsel (täglich, 3D / Fotos)</span><input type="checkbox" .checked=${this.roomAutoSwitch} @change=${(e:Event)=>this.roomAutoSwitch=(e.target as HTMLInputElement).checked}/></label>
      <p class="settings-note">Premium Fotos enthält 20 fertige Motive. Optional kannst du eine Foto-URL je Raum hinterlegen. Eigene Bilder werden niemals automatisch gewechselt.</p>
      <div class="cr-room-visual-grid">${areas.map(([id,name])=>html`<details class="cr-room-visual-card"><summary><span class="cr-room-visual-title">${this.renderIcon(this.roomIcon(name))}<strong>${name}</strong></span><span class="cr-room-visual-summary">${this.roomStyleByArea[id]==="3d"?"Premium 3D":this.roomStyleByArea[id]==="photos"?"Premium Fotos":this.roomStyleByArea[id]==="custom"?"Eigenes Foto":"Standard"}</span>${this.renderIcon("mdi:chevron-down")}</summary><div class="cr-room-visual-fields"><label>Bildstil<select .value=${this.roomStyleByArea[id]||""} @change=${(e:Event)=>{const v=(e.target as HTMLSelectElement).value;this.roomStyleByArea={...this.roomStyleByArea,[id]:v};this.requestUpdate();}}><option value="">Standard</option><option value="3d">Premium 3D</option><option value="photos">Premium Fotos</option><option value="custom">Eigene Fotos</option></select></label><label>Premium-Foto URL <small>Optional · /local/... oder https://...</small><input type="text" placeholder="Foto-Adresse einfügen" .value=${this.roomPhotoUrls[this.roomKind(name)]||""} @change=${(e:Event)=>{this.roomPhotoUrls={...this.roomPhotoUrls,[this.roomKind(name)]:(e.target as HTMLInputElement).value};}}/></label><label>Eigenes Bild <small>Optional · /local/...</small><input type="text" placeholder="Eigenes Bild einfügen" .value=${this.roomImages[id]||""} @change=${(e:Event)=>{this.roomImages={...this.roomImages,[id]:(e.target as HTMLInputElement).value};}}/></label></div></details>`)}</div>
      <div class="cr-room-visual-actions"><button @click=${()=>this.cancelRoomVisualSettings()}>Abbrechen</button><button @click=${()=>this.saveRoomVisualSettings()}>Speichern</button></div></div>`;
  }

  private roomEntities(areaId:string):HAEntity[] {
    return Object.values(this.hass?.states || {}).filter(e=>{
      if(this.allEntityAreas[e.entity_id]!==areaId) return false;
      if(["unavailable","unknown"].includes(e.state)) return false;
      const domain=e.entity_id.split(".")[0];
      const name=String(e.attributes.friendly_name||e.entity_id).toLowerCase();
      if(/config|firmware|update|diagnos|debug|overtemp|do not disturb|signal|rssi|linkquality|reboot|restart|identify|calibrat|battery level|last seen|uptime|version|connection|pairing|child lock|led indicator|power on behavior|auto.update/.test(name)) return false;
      if(domain==="switch") return /steckdose|socket|outlet|plug|power strip|strom|sofa|tischlampe|dekolicht|schalter/.test(name) && !/update|config|lock|indicator/.test(name);
      return ["light","cover","scene","climate","media_player","vacuum","fan","humidifier","lock","alarm_control_panel","switch"].includes(domain);
    });
  }

  private async roomLightsToggle(lights:HAEntity[],on:boolean):Promise<void> {
    if(!this.hass?.callService || !lights.length) return;
    try { await this.hass.callService("light",on?"turn_on":"turn_off",{entity_id:lights.map(e=>e.entity_id)}); }
    catch(error) { console.warn("ControlRoom: room lights action failed",error); }
  }

  private saveRoomImage(areaId:string):void {
    const value=this.roomImageDraft.trim();
    this.roomImages={...this.roomImages,[areaId]:value};
    try { localStorage.setItem("controlroom-room-images-v1",JSON.stringify(this.roomImages)); } catch(error) { console.warn(error); }
    this.roomImageEditor=false;
  }

  private renderRoomsPage() {
    const areas=Object.entries(this.areaNames).sort((a,b)=>a[1].localeCompare(b[1],this.getLanguage()));
    const selected=areas.find(a=>a[0]===this.roomDetail);
    const types=[
      {label:"Lampen",domain:"light",icon:"mdi:lightbulb-outline"},
      {label:"Rollos",domain:"cover",icon:"mdi:blinds"},
      {label:"Szenen",domain:"scene",icon:"mdi:palette-outline"},
      {label:"Heizung",domain:"climate",icon:"mdi:thermostat"},
      {label:"Medien",domain:"media_player",icon:"mdi:music-note-outline"},
      {label:"Steckdosen",domain:"switch",icon:"mdi:power-socket-de"},
      {label:"Sonstiges",domain:"other",icon:"mdi:dots-horizontal-circle-outline"}
    ];
    if(selected) {
      const [areaId,name]=selected;
      const entities=this.roomEntities(areaId);
      const lights=entities.filter(e=>e.entity_id.startsWith("light."));
      const on=lights.filter(e=>e.state==="on").length;
      return html`<section class="cr-rooms-page">
        <button class="cr-room-back" type="button" @click=${(event:Event)=>{event.preventDefault();event.stopPropagation();this.roomDetail="";this.roomImageEditor=false;this.requestUpdate();}}>${this.renderIcon("mdi:arrow-left")} Alle Räume</button>
        <div class="cr-room-detail-head"><div><span class="cr-room-kicker">CONTROLROOM · RÄUME</span><h1>${name}</h1><p>${entities.length} Steuerungen · ${on} von ${lights.length} Lichtern an</p></div>
</div>

        <div class="cr-room-detail-hero"><div class="cr-room-detail-art">${this.roomArt(areaId,name)}</div><div><span>RAUMSTATUS</span><h2>${on?"Gemütlich beleuchtet":"Alles ruhig"}</h2><p>${lights.length} Lampen · ${entities.length} Steuerungen</p><div class="cr-room-actions"><button ?disabled=${!lights.length} @click=${()=>this.roomLightsToggle(lights,true)}>Alle an</button><button ?disabled=${!on} @click=${()=>this.roomLightsToggle(lights,false)}>Alle aus</button></div></div></div>
        <div class="cr-room-sections">${types.map(t=>{
          const members=entities.filter(e=>t.domain==="other"?!types.some(x=>x.domain!=="other"&&e.entity_id.startsWith(x.domain+".")):e.entity_id.startsWith(t.domain+"."));
          return members.length?html`<article class="cr-room-section"><header>${this.renderIcon(t.icon)} <strong>${t.label}</strong><span>${members.length}</span></header>
            ${members.length?members.map(e=>html`<div class="cr-room-device"><div><strong>${String(e.attributes.friendly_name||e.entity_id)}</strong><small>${e.state}</small></div>${["light","switch"].some(d=>e.entity_id.startsWith(d+"."))?html`<button ?disabled=${!["on","off"].includes(e.state)} @click=${()=>this.hass?.callService?.(e.entity_id.split(".")[0],"toggle",{entity_id:e.entity_id})}>${this.renderIcon(e.state==="on"?"mdi:toggle-switch":"mdi:toggle-switch-off-outline")}</button>`:nothing}</div>`):html`<p class="cr-room-empty">Keine Geräte zugeordnet</p>`}</article>`:nothing;
        })}</div>
      </section>`;
    }
    return html`<section class="cr-rooms-page"><div class="cr-rooms-heading"><span class="cr-room-kicker">CONTROLROOM · SMART HOME</span><h1>Räume</h1><p>Dein Zuhause. Jeder Raum, perfekt verbunden.</p></div>
      ${areas.length?html`<div class="cr-room-grid">${areas.map(([id,name])=>{
        const entities=this.roomEntities(id),lights=entities.filter(e=>e.entity_id.startsWith("light.")),on=lights.filter(e=>e.state==="on").length;
        const temps=entities.filter(e=>e.entity_id.startsWith("sensor.") && (e.attributes.device_class==="temperature" || e.entity_id.includes("temperature"))).find(e=>!isNaN(Number(e.state)));
        return html`<button class="cr-room-tile ${on?"cr-room-lit":""}" @click=${()=>{this.roomDetail=id;this.roomImageEditor=false;}}>
          <div class="cr-room-tile-art">${this.roomArt(id,name)}<span class="cr-room-tile-arrow">${this.renderIcon("mdi:arrow-top-right")}</span></div>
          <div class="cr-room-tile-body"><h2>${name}</h2><p>${entities.length} Steuerungen ${temps?html`· ${temps.state} °C`:nothing}</p><div class="cr-room-tile-footer"><span class="cr-room-led ${on?"active":""}"></span>${on} / ${lights.length} Lampen an</div></div>
        </button>`;
      })}</div>`:html`<div class="cr-room-empty-state">${this.renderIcon("mdi:home-search-outline")}<h2>Keine Räume gefunden</h2><p>Erstelle Bereiche in Home Assistant unter Einstellungen → Bereiche, Labels & Zonen.</p></div>`}
    </section>`;
  }

  private renderPage() {
    if (this.activePage === "home") return this.renderHome();
    if (this.activePage === "lights") return this.renderLightsPage();
    if (this.activePage === "rooms") return this.renderRoomsPage();
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
    /* ControlRoom Rooms Premium */
    .cr-rooms-page{padding:clamp(10px,2vw,26px) 0 45px;color:#f5eff9;min-width:0}
    .cr-room-kicker{font-size:10px;letter-spacing:2.4px;color:var(--cr-muted);font-weight:750}
    .cr-rooms-heading h1,.cr-room-detail-head h1{font-size:clamp(29px,3vw,43px);margin:9px 0 5px;font-weight:760;letter-spacing:-1px}
    .cr-rooms-heading p,.cr-room-detail-head p{color:var(--cr-muted);margin:0 0 24px;font-size:13px}
    .cr-room-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:17px}
    .cr-room-tile{min-width:0;padding:0;border:1px solid color-mix(in srgb,var(--cr-accent) 15%,transparent);border-radius:23px;overflow:hidden;background:linear-gradient(150deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)));text-align:left;color:inherit;cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s}
    .cr-room-tile:hover{transform:translateY(-4px);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent);box-shadow:0 16px 45px #09061166}
    .cr-room-tile-art{height:clamp(155px,17vw,220px);position:relative;display:grid;place-items:center;background:radial-gradient(ellipse at 55% 70%,#65477580,transparent 65%),linear-gradient(140deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)));overflow:hidden}
    .cr-room-tile-art>ha-icon{--mdc-icon-size:88px;color:var(--cr-text);filter:drop-shadow(0 15px 20px color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-tile-art img,.cr-room-detail-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
    .cr-room-tile-art:has(img) > ha-icon,.cr-room-detail-art:has(img) > ha-icon{position:absolute;opacity:0;pointer-events:none}
    .cr-room-tile-art:has(img[style*="display: none"]) > ha-icon,.cr-room-detail-art:has(img[style*="display: none"]) > ha-icon{opacity:1}
    .cr-room-tile-art:after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,color-mix(in srgb,var(--cr-accent) 48%,transparent));pointer-events:none}
    .cr-room-lit .cr-room-tile-art img{filter:brightness(1.1) saturate(1.08)}
    .cr-room-visual-editor{margin:16px 0 22px;padding:22px;border:1px solid #cba7e344;border-radius:20px;background:linear-gradient(145deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-visual-head h2{margin:8px 0;font-size:23px}.cr-room-visual-head p{font-size:12px;color:var(--cr-muted)}
    .cr-room-visual-row{display:grid;grid-template-columns:minmax(130px,1fr) minmax(130px,1fr);gap:10px;padding:12px 0;border-bottom:1px solid #ffffff13}
    .cr-room-visual-row strong{display:flex;align-items:center;gap:7px;font-size:13px}.cr-room-visual-row strong ha-icon{--mdc-icon-size:19px}
    .cr-room-visual-row select,.cr-room-visual-row input{min-width:0;padding:10px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));border:1px solid #ffffff28;border-radius:10px;color:white}
    .cr-room-visual-row input{grid-column:1/-1}
    .cr-room-visual-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}
    .cr-room-visual-actions button{padding:11px 18px;border:1px solid #cba7e344;border-radius:10px;background:color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));color:white;cursor:pointer}
    .cr-room-visual-actions button:last-child{background:var(--cr-accent)}
    @container(max-width:470px){.cr-room-visual-row{grid-template-columns:1fr}.cr-room-visual-row input{grid-column:auto}}
    .cr-room-tile-arrow{position:absolute;right:14px;top:14px;border-radius:50%;background:#ffffff22;padding:8px;display:flex}
    .cr-room-tile-arrow ha-icon{--mdc-icon-size:17px}
    .cr-room-tile-body{padding:18px 19px 17px}
    .cr-room-tile-body h2{font-size:18px;margin:0 0 5px}
    .cr-room-tile-body p{font-size:12px;color:var(--cr-muted);margin:0 0 18px}
    .cr-room-tile-footer{display:flex;align-items:center;gap:8px;color:var(--cr-muted);font-size:11px;border-top:1px solid #ffffff15;padding-top:13px}
    .cr-room-led{height:7px;width:7px;border-radius:50%;background:color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent))}
    .cr-room-led.active{background:#eabf82;box-shadow:0 0 11px #eabf82}
    .cr-room-lit .cr-room-tile-art{background:radial-gradient(ellipse at 55% 75%,#aa7c6480,transparent 65%),linear-gradient(140deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-back,.cr-room-image-edit{border:1px solid #ffffff25;background:#ffffff0a;color:#e8ddeb;border-radius:12px;padding:10px 13px;display:inline-flex;gap:8px;align-items:center;cursor:pointer}
    .cr-room-back ha-icon,.cr-room-image-edit ha-icon{--mdc-icon-size:17px}
    .cr-room-detail-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:23px;flex-wrap:wrap}
    .cr-room-detail-hero{display:grid;grid-template-columns:minmax(160px,1fr) minmax(170px,1fr);gap:22px;align-items:center;padding:20px;border-radius:22px;border:1px solid #ffffff20;background:linear-gradient(120deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)));margin-bottom:22px}
    .cr-room-detail-art{position:relative;min-width:0;height:230px;display:grid;place-items:center;border-radius:17px;overflow:hidden;background:radial-gradient(ellipse,color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)),color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)))}
    .cr-room-detail-art>ha-icon{--mdc-icon-size:115px;color:var(--cr-text)}
    .cr-room-detail-hero span{font-size:10px;letter-spacing:1.8px;color:var(--cr-muted)}
    .cr-room-detail-hero h2{font-size:25px;margin:10px 0}
    .cr-room-detail-hero p{color:var(--cr-muted);font-size:13px}
    .cr-room-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}
    .cr-room-actions button,.cr-room-image-form button{background:var(--cr-accent);color:white;border:0;border-radius:10px;padding:10px 15px;cursor:pointer}
    .cr-room-actions button:disabled{opacity:.4;cursor:default}
    .cr-room-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:14px}
    .cr-room-section{background:#ffffff08;border:1px solid #ffffff17;border-radius:17px;padding:17px;min-width:0}
    .cr-room-section header{display:flex;align-items:center;gap:9px;padding-bottom:14px;border-bottom:1px solid #ffffff17}
    .cr-room-section header ha-icon{color:var(--cr-muted);--mdc-icon-size:20px}
    .cr-room-section header span{margin-left:auto;color:var(--cr-muted);font-size:12px}
    .cr-room-section:has(.cr-room-device){box-shadow:0 10px 30px #00000014}
    .cr-room-device{display:flex;align-items:center;justify-content:space-between;gap:9px;padding:12px 0;border-bottom:1px solid #ffffff0c}
    .cr-room-device strong{display:block;font-size:12px;overflow-wrap:anywhere}
    .cr-room-device small{display:block;color:var(--cr-muted);margin-top:4px;font-size:11px}
    .cr-room-device button{background:none;color:var(--cr-text);border:0;cursor:pointer}
    .cr-room-empty{color:var(--cr-muted);font-size:12px}
    .cr-room-empty-state{padding:65px 20px;text-align:center;color:var(--cr-muted)}
    .cr-room-empty-state>ha-icon{--mdc-icon-size:50px}
    .cr-room-image-form{background:#ffffff0b;border:1px solid #ffffff20;border-radius:15px;padding:17px;margin-bottom:17px;display:grid;gap:10px}
    .cr-room-image-form label{font-size:12px;color:var(--cr-muted)}
    .cr-room-image-form input{width:100%;min-width:0;border:1px solid #ffffff30;border-radius:10px;padding:12px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:white}
    .cr-room-image-form>div{display:flex;gap:10px}
    @media(max-width:640px){.cr-room-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.cr-room-tile-art{height:130px}.cr-room-tile-art>ha-icon{--mdc-icon-size:62px}.cr-room-tile-body{padding:12px}.cr-room-tile-body h2{font-size:14px}.cr-room-tile-body p,.cr-room-tile-footer{font-size:10px}.cr-room-detail-hero{grid-template-columns:1fr}.cr-room-detail-art{height:190px}}
    @media(max-width:350px){.cr-room-grid{grid-template-columns:1fr}}
    @media(prefers-reduced-motion:reduce){.cr-room-tile{transition:none}}


    /* Theme Studio: isolated to this dashboard, preserving original purple default */
    .dashboard { color:var(--cr-text,#f6f3fb); background:radial-gradient(ellipse at 65% 0%,color-mix(in srgb,var(--cr-accent,var(--cr-accent)) 15%,transparent),transparent 48%),var(--cr-bg,#111019); border-radius:var(--cr-radius,22px); }
    .dashboard .sidebar { background:linear-gradient(180deg,color-mix(in srgb,var(--cr-accent,var(--cr-accent)) 13%,transparent),transparent); }
    .dashboard .main { background:transparent; }
    .dashboard .overview-card,.dashboard .cr-room-tile,.dashboard .cr-room-section,.dashboard .settings-option {border-radius:var(--cr-radius,22px);}
    .dashboard.cr-theme-solid .overview-card,.dashboard.cr-theme-solid .cr-room-section,.dashboard.cr-theme-solid .settings-option {background:var(--cr-surface)!important;backdrop-filter:none!important;}
    .dashboard.cr-theme-minimal .overview-card,.dashboard.cr-theme-minimal .cr-room-section,.dashboard.cr-theme-minimal .settings-option {background:color-mix(in srgb,var(--cr-surface) 80%,var(--cr-bg))!important;box-shadow:none!important;backdrop-filter:none!important;}
    .dashboard.cr-theme-glass .overview-card,.dashboard.cr-theme-glass .cr-room-section {backdrop-filter:var(--cr-blur);}
    .dashboard.cr-theme-light .page-heading,.dashboard.cr-theme-light .cr-rooms-heading h1,.dashboard.cr-theme-light .cr-room-tile-body h2,.dashboard.cr-theme-light .settings-intro h1 {color:var(--cr-text);}
    .cr-theme-studio h3{font-size:15px;margin:22px 0 12px;color:var(--cr-text)}
    .cr-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:12px}
    .cr-theme-choice{position:relative;display:grid;gap:10px;text-align:left;padding:9px;border-radius:16px;border:1px solid #ffffff25;background:#ffffff09;color:var(--cr-text);cursor:pointer}
    .cr-theme-choice.chosen,.cr-theme-style-list button.chosen{border-color:var(--cr-accent);box-shadow:0 0 0 1px var(--cr-accent)}
    .cr-theme-choice>ha-icon{position:absolute;right:12px;bottom:13px;color:var(--cr-accent);--mdc-icon-size:16px}
    .cr-theme-preview{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:16px;border-radius:12px;min-height:86px}
    .cr-theme-preview span{grid-column:1/-1;width:45%;height:7px;border-radius:20px}
    .cr-theme-preview i{height:34px;border-radius:8px}
    .cr-theme-choice strong{font-size:12px;padding:0 4px 4px}
    .cr-theme-style-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}
    .cr-theme-style-list button{display:grid;gap:6px;position:relative;text-align:left;padding:15px;border:1px solid #ffffff22;border-radius:13px;background:#ffffff09;color:var(--cr-text);cursor:pointer}
    .cr-theme-style-list small{opacity:.7}.cr-theme-style-list ha-icon{position:absolute;right:10px;top:10px;color:var(--cr-accent);--mdc-icon-size:17px}
    .cr-theme-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:22px}
    .cr-theme-actions button{border:1px solid #ffffff30;border-radius:12px;padding:11px 20px;background:#ffffff10;color:var(--cr-text);cursor:pointer}
    .cr-theme-actions button:last-child{background:var(--cr-accent);color:#fff;border-color:transparent}

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
          color-mix(in srgb,var(--cr-accent) 22%,transparent),
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
        color-mix(in srgb,var(--cr-accent) 13%,transparent),
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
      background: linear-gradient(135deg, var(--cr-accent), color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)));
      font-size: 25px;
      font-weight: 700;
      box-shadow: 0 8px 24px color-mix(in srgb,var(--cr-accent) 20%,transparent);
    }

    .brand-name {
      font-size: 19px;
      font-weight: 750;
      letter-spacing: -0.05em;
    }

    .brand-subtitle {
      margin-top: 3px;
      color: var(--cr-muted);
      font-size: 11px;
    }

    .navigation-label {
      margin: 0 13px 12px;
      font-size: 10px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));
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
      color: var(--cr-muted);
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
        color-mix(in srgb,var(--cr-accent) 40%,transparent),
        color-mix(in srgb,var(--cr-accent) 23%,transparent)
      );
      border-color: color-mix(in srgb,var(--cr-accent) 35%,transparent);
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
      background: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));
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
      color: var(--cr-muted);
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
      color: var(--cr-muted);
    }

    .weather {
      display: flex;
      align-items: center;
      gap: 13px;
      min-width: 165px;
      background: linear-gradient(
        130deg,
        color-mix(in srgb,var(--cr-accent) 15%,transparent),
        rgba(255,255,255,0.04)
      );
    }

    .weather-icon {
      color: var(--cr-text);
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
      color: var(--cr-muted);
      font-size: 11px;
      white-space: nowrap;
    }

    .weather-empty {
      color: var(--cr-muted);
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
      color: var(--cr-muted);
    }

    .eyebrow {
      color: var(--cr-muted);
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
      color: var(--cr-muted);
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
      border-color: color-mix(in srgb,var(--cr-accent) 30%,transparent);
    }

    .card-icon { color: var(--cr-text); }
    .card-icon ha-icon { --mdc-icon-size: 27px; }

    .card-title {
      font-size: 17px;
      font-weight: 650;
    }

    .card-subtitle {
      margin-top: 6px;
      font-size: 12px;
      color: var(--cr-muted);
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
      border: 1px solid color-mix(in srgb,var(--cr-accent) 17%,transparent);
      border-radius: 999px;
      background: linear-gradient(120deg, color-mix(in srgb,var(--cr-accent) 17%,transparent), rgba(255,255,255,0.035));
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
      background: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent));
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
    .pill-location { color: var(--cr-muted); font-size: 11px; font-weight: 600; }
    .pill-location.at-home { color: #67dfb2; }


    .lights-card { gap: 13px; order: 3; }
    .premium-lights { position: relative; min-height: 190px; overflow: hidden; }
    .premium-lights.has-light { border-color: rgba(215,165,104,.32); }
    .premium-lights-content { position:relative; z-index:1; display:flex; flex-direction:column; gap:12px; height:100%; }
    .premium-lights .card-icon { color:#f1bf77; }
    .pendant-corner { position:absolute; right:-6px; top:-20px; width:135px; pointer-events:none; }
    .pendant { display:block; width:100%; height:auto; }
    .premium-count { font-size:13px; color:var(--cr-muted); }
    .premium-count strong { font-size:28px; color:#fff; }
    .premium-count span { color:var(--cr-muted); }
    /* Home overview: atmosphere first, subtle live light count below. */
    .premium-mood { font-size:clamp(17px,1.6vw,21px);font-weight:750;letter-spacing:-.045em;line-height:1.12;color:#fff3f8;max-width:calc(100% - 48px);text-shadow:0 1px 16px rgba(0,0,0,.18); }
    .premium-light-status { display:flex;align-items:center;gap:7px;min-width:0;font-size:10px;line-height:1.3;color:var(--cr-muted);white-space:nowrap; }
    .premium-status-dot { flex:none;width:6px;height:6px;border-radius:50%;background:var(--cr-muted); }
    .premium-status-dot.lit { background:#f3c384;box-shadow:0 0 10px rgba(245,193,118,.55); }
    .premium-actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:auto; }
    .glass-action { display:flex; align-items:center; justify-content:center; gap:6px; padding:9px 11px; color:var(--cr-text); background:color-mix(in srgb,var(--cr-accent) 25%,transparent); border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent); border-radius:999px; cursor:pointer; font-size:11px; }
    .premium-actions-three { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; }
    .premium-actions-three .glass-action { min-width:0; padding:9px 7px; white-space:nowrap; }
    .premium-actions-three .premium-light-link { grid-column:1/-1; }
    .glass-action:disabled { opacity:.45; cursor:not-allowed; }
    .glass-action ha-icon { --mdc-icon-size:16px; }
    .premium-rooms { display:flex; flex-wrap:wrap; gap:5px; }
    .room-chip { display:flex; align-items:center; gap:4px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.05); padding:5px 8px; border-radius:999px; font-size:10px; color:var(--cr-muted); }
    .room-chip ha-icon { --mdc-icon-size:13px; color:#e6b877; }
    .lighting-studio { max-width:1100px; margin:auto; }
    .studio-heading { display:flex; justify-content:space-between; align-items:center; gap:15px; margin-bottom:20px; }
    .studio-heading-left {display:flex;align-items:center;gap:12px;min-width:0;flex:1}
    .studio-back,.studio-settings {display:grid;place-items:center;width:38px;height:38px;flex:none;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(255,255,255,.05);color:var(--cr-text);cursor:pointer}
    .studio-back:hover,.studio-settings:hover {background:color-mix(in srgb,var(--cr-accent) 20%,transparent)}
    .lighting-preferences {margin:0 0 17px;padding:18px;border:1px solid color-mix(in srgb,var(--cr-accent) 22%,transparent);border-radius:20px;background:linear-gradient(130deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface))}
    .preferences-header {display:flex;justify-content:space-between;align-items:center;gap:10px}
    .preferences-header button {border:0;background:transparent;color:var(--cr-muted);cursor:pointer}
    .pref-title {margin:18px 0 9px;color:var(--cr-muted);font-size:12px;font-weight:650}
    .pref-modes {display:flex;gap:7px;flex-wrap:wrap}
    .pref-modes button {padding:8px 12px;border:1px solid rgba(255,255,255,.13);border-radius:999px;background:rgba(255,255,255,.04);color:var(--cr-text);cursor:pointer;font-size:12px}
    .pref-modes button.active {background:color-mix(in srgb,var(--cr-accent) 30%,transparent);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent);color:#fff}
    .pref-list {display:grid;grid-template-columns:repeat(auto-fit,minmax(225px,1fr));gap:7px}
    .pref-check {display:flex;align-items:center;gap:9px;min-width:0;padding:9px 11px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025);font-size:12px;color:#e7deee;cursor:pointer}
    .pref-check input {accent-color:var(--cr-accent)}
    .pref-label-name {min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap} .pref-check input {flex:none} .pref-check .pref-hint {flex:none;white-space:nowrap;margin-left:auto}
    .pref-hint {color:var(--cr-muted);font-size:10px}
    .pref-entities {display:grid;grid-template-columns:repeat(auto-fit,minmax(245px,1fr));gap:7px;max-height:270px;overflow-y:auto}
    .pref-entity {display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 10px;border:1px solid rgba(255,255,255,.06);border-radius:11px;background:rgba(255,255,255,.025)}
    .pref-entity-name {display:flex;align-items:center;gap:8px;min-width:0;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .pref-entity-name ha-icon {--mdc-icon-size:17px;color:var(--cr-muted);flex:none}
    .pref-entity-name small {color:var(--cr-muted);font-size:10px}
    .pref-entity select {max-width:105px;padding:6px;border:1px solid rgba(255,255,255,.15);border-radius:8px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:#f5eef9;font-size:11px}
    
    .studio-heading h1 { margin:7px 0 0; }
    .studio-total { font-size:12px; color:var(--cr-muted); }
    .studio-hero { position:relative; display:flex; min-height:220px; overflow:hidden; padding:26px 28px; border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent); border-radius:22px; background:linear-gradient(110deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface)); }
    .studio-hero.lit { background:radial-gradient(ellipse at 88% 85%,rgba(223,158,78,.22),transparent 48%),linear-gradient(110deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface)); }
    .studio-hero-info { position:relative; z-index:1; width:min(70%,540px); }
    .studio-kicker { font-size:11px; font-weight:700; letter-spacing:.15em; color:var(--cr-muted); }
    .studio-mood { margin:13px 0 4px; font-size:clamp(23px,2.6vw,34px); font-weight:750; letter-spacing:-.045em; color:#fff5fa; line-height:1.15; }
    .studio-mood-subtitle { color:var(--cr-muted); font-size:12px; line-height:1.5; }
    .studio-hero.lit .studio-mood { text-shadow:0 0 28px rgba(247,194,120,.15); }
    .studio-number { margin:9px 0 13px; font-size:14px; }
    .studio-number strong { font-size:28px; }
    .studio-progress { height:7px; margin-top:20px; background:color-mix(in srgb,var(--cr-accent) 20%,transparent); border:1px solid rgba(255,255,255,.07); border-radius:999px; overflow:hidden; cursor:help; }
    .studio-progress span { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,var(--cr-accent),var(--cr-text)); box-shadow:0 0 15px color-mix(in srgb,var(--cr-accent) 30%,transparent); transition:width .55s ease; }
    .studio-actions { display:flex; gap:10px; margin-top:19px; }
    .studio-actions button { display:flex; align-items:center; justify-content:center; gap:9px; flex:1; padding:12px; border:1px solid rgba(255,255,255,.17); border-radius:999px; background:rgba(255,255,255,.035); color:#f1eaf6; cursor:pointer; }
    .studio-actions button:disabled { opacity:.4; }
    .studio-actions ha-icon { --mdc-icon-size:16px; }
    .studio-pendant { position:absolute; right:30px; top:-21px; width:195px; pointer-events:none; }
    .ambient-rooms { display:grid; grid-template-columns:repeat(auto-fit,minmax(135px,1fr)); gap:10px; margin-top:14px; }
    .ambient-room { position:relative; display:flex; flex-direction:column; align-items:flex-start; gap:7px; min-height:105px; padding:14px; overflow:hidden; border-radius:16px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.035); color:var(--cr-muted); text-align:left; cursor:pointer; }
    .ambient-room.illuminated { border-color:rgba(231,178,109,.35); }
    .ambient-room-glow { position:absolute; inset:0; pointer-events:none; opacity:0; background:radial-gradient(ellipse at 80% 90%,rgba(247,184,96,.35),transparent 72%); transition:opacity 450ms ease; }
    .ambient-room.illuminated .ambient-room-glow { opacity:1; }
    .ambient-room-icon,.ambient-room-name,.ambient-room-count { position:relative; z-index:1; }
    .ambient-room-icon { color:var(--cr-muted); }
    .ambient-room.illuminated .ambient-room-icon { color:#f4c786; }
    .ambient-room-name { font-size:12px; font-weight:650; }
    .ambient-room-count { color:var(--cr-muted); font-size:11px; }
    @media (prefers-reduced-motion:reduce) { .ambient-room-glow { transition:none; } }
    .studio-tabs { display:grid; grid-template-columns:1fr 1fr; margin:18px 0 12px; padding:4px; border-radius:999px; background:rgba(255,255,255,.035); }
    .studio-tabs button { border:0; padding:9px; border-radius:999px; color:var(--cr-muted); background:transparent; cursor:pointer; }
    .studio-tabs button.active { background:color-mix(in srgb,var(--cr-accent) 20%,transparent); color:#fff; }
    .room-filters { display:flex; gap:7px; overflow-x:auto; padding-bottom:12px; }
    .room-filters button { white-space:nowrap; padding:7px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.16); background:transparent; color:var(--cr-muted); cursor:pointer; }
    .room-filters button.active { background:#e6dbe9; color:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)); }
    .studio-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .studio-light { position:relative; min-height:100px; padding:12px; border-radius:18px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.045); }
    .studio-light.selected { border-color:color-mix(in srgb,var(--cr-accent) 65%,transparent); background:color-mix(in srgb,var(--cr-accent) 14%,transparent); }
    .studio-light.active { box-shadow:inset 0 0 32px rgba(244,190,105,.045); }
    .studio-light-select { display:flex; flex-direction:column; align-items:flex-start; width:100%; height:100%; border:0; background:transparent; color:inherit; cursor:pointer; text-align:left; }
    .studio-light-icon { display:grid; place-items:center; width:30px; height:30px; border-radius:11px; color:var(--cr-muted); background:rgba(255,255,255,.06); }
    .studio-light.active .studio-light-icon { color:#f2c887; background:rgba(232,179,96,.16); }
    .studio-light-state { position:absolute; right:14px; top:16px; color:var(--cr-muted); font-size:10px; }
    .studio-light.active .studio-light-state { color:#87d5ad; }
    .studio-light-name { margin-top:8px; font-size:14px; font-weight:650; }
    .studio-light-room { margin-top:4px; color:var(--cr-muted); font-size:11px; }
    .studio-light-level { margin-top:5px; color:var(--cr-muted); font-size:11px; }
    .studio-toggle { position:absolute; right:12px; bottom:12px; padding:4px; border:0; background:transparent; color:color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)); cursor:pointer; }
    .studio-toggle.on { color:var(--cr-text); }
    .studio-toggle ha-icon { --mdc-icon-size:23px; }
    .studio-detail { position:relative; margin-top:15px; padding:22px; border-radius:20px; border:1px solid color-mix(in srgb,var(--cr-accent) 25%,transparent); background:color-mix(in srgb,var(--cr-accent) 10%,transparent); }
    .studio-detail-head h2 { margin:6px 0; font-size:20px; }
    .studio-detail-head span { font-size:12px; color:var(--cr-muted); }
    .studio-detail .studio-toggle { top:20px; bottom:auto; }
    .studio-color-row {display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;padding:12px 14px;border:1px solid rgba(255,255,255,.08);border-radius:13px;background:rgba(255,255,255,.035)}
    .studio-color-row strong {display:block;font-size:12px;font-weight:600}
    .studio-color-row small {display:block;margin-top:4px;color:var(--cr-muted);font-size:11px}
    .studio-color-picker {width:45px;height:37px;padding:3px;border:1px solid rgba(255,255,255,.2);border-radius:11px;background:rgba(255,255,255,.06);cursor:pointer}
    .studio-temp-range {display:flex;align-items:center;gap:12px;color:var(--cr-text)}
    .studio-temp-range ha-icon {--mdc-icon-size:18px}
    .studio-temp-range input {flex:1;min-width:0}
    .brightness-label { display:flex; justify-content:space-between; margin-top:22px; margin-bottom:12px; font-size:13px; }
    .brightness-slider { width:100%; accent-color:var(--cr-text); cursor:pointer; }
    .studio-empty { display:flex; align-items:center; gap:12px; padding:25px; color:var(--cr-muted); border:1px solid rgba(255,255,255,.08); border-radius:18px; }
    @media (max-width:600px) {
      .studio-grid { grid-template-columns:1fr; }
      .studio-hero-info { width:80%; }
      .studio-pendant { right:-40px; opacity:.6; }
      .studio-heading { align-items:start; flex-direction:column; }
    }

    .overview-card:nth-child(3) { order: 4; }
    .overview-card:nth-child(4) { order: 5; }
    .lights-card-heading { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .lights-summary { display: flex; align-items: baseline; gap: 5px; color: var(--cr-muted); font-size: 11px; white-space: nowrap; }
    .lights-count { font-size: 20px; color: var(--cr-text); font-weight: 750; }
    .lights-summary-separator { color: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)); }
    .light-list { display: flex; flex-direction: column; gap: 7px; max-height: 245px; overflow-y: auto; padding-right: 2px; }
    .light-row { display: flex; align-items: center; gap: 9px; width: 100%; padding: 9px 10px; border: 1px solid rgba(255,255,255,.07); border-radius: 12px; background: rgba(255,255,255,.035); color: #c6bfce; text-align: left; cursor: pointer; transition: background 160ms, border-color 160ms; }
    .light-row:hover:not(:disabled) { background: color-mix(in srgb,var(--cr-accent) 12%,transparent); border-color: color-mix(in srgb,var(--cr-accent) 30%,transparent); }
    .light-row:focus-visible { outline: 2px solid var(--cr-text); outline-offset: 2px; }
    .light-row:disabled { opacity: .48; cursor: not-allowed; }
    .light-row.is-on { background: color-mix(in srgb,var(--cr-accent) 12%,transparent); border-color: color-mix(in srgb,var(--cr-accent) 18%,transparent); }
    .light-row-icon { display: flex; color: var(--cr-muted); }
    .light-row.is-on .light-row-icon { color: var(--cr-text); }
    .light-row-icon ha-icon { --mdc-icon-size: 20px; }
    .light-row-name { min-width: 0; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
    .light-row-status { font-size: 10px; color: var(--cr-muted); }
    .light-row-switch { display: flex; align-items: center; flex: 0 0 31px; height: 18px; padding: 2px; border-radius: 999px; background: color-mix(in srgb,var(--cr-surface) 82%,var(--cr-accent)); }
    .light-row-switch span { width: 14px; height: 14px; border-radius: 50%; background: #d6d0dd; transition: transform 160ms; }
    .light-row-switch.on { background: var(--cr-accent); }
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
      color: var(--cr-text);
      background: color-mix(in srgb,var(--cr-accent) 14%,transparent);
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
        background: color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));
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
    .studio-light.active { border-color:color-mix(in srgb,var(--cr-accent) 28%,transparent); background:color-mix(in srgb,var(--cr-accent) 9%,transparent); }
    .studio-light-top { display:flex;align-items:center;gap:12px;min-height:36px; }
    .studio-light-icon { width:36px;height:36px;flex:none; }
    .studio-light-name { margin:0;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px; }
    .studio-light .studio-toggle { position:static;flex:none;display:grid;place-items:center;padding:3px; }
    .studio-light-state-inline,.studio-light-room { display:block;margin:5px 0 0 48px;color:var(--cr-muted);font-size:11px; }
    .studio-inline-brightness { display:flex;align-items:center;gap:11px;margin:12px 0 0 48px;min-width:0; }
    .studio-inline-slider { flex:1;min-width:0;width:100%;height:4px;margin:0;accent-color:var(--cr-accent,var(--cr-text));cursor:pointer; }
    .studio-inline-value { min-width:38px;text-align:right;font-size:12px;color:var(--cr-muted);font-variant-numeric:tabular-nums; }
    .studio-color-trigger { display:grid;place-items:center;flex:none;width:26px;height:26px;padding:2px;border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent);border-radius:9px;background:rgba(255,255,255,.045);color:var(--cr-accent,var(--cr-muted));cursor:pointer; }
    .studio-color-trigger ha-icon { --mdc-icon-size:17px; }
    .studio-color-trigger.open { background:color-mix(in srgb,var(--cr-accent) 25%,transparent);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent); }
    .studio-color-alone { margin:9px 0 0 48px; }
    .studio-inline-colors { margin:12px 0 0 48px;padding-top:9px;border-top:1px solid rgba(255,255,255,.08);display:grid;gap:9px; }
    .studio-inline-color-line { display:flex;align-items:center;justify-content:space-between;gap:12px;color:var(--cr-muted);font-size:11px; }
    .studio-inline-color-line .studio-inline-slider { max-width:65%; }
    .studio-inline-color-line .studio-color-picker { width:35px;height:29px; }
    @media (max-width:600px) { .studio-grid { grid-template-columns:1fr; } .studio-hero { padding:22px 18px; } .studio-hero-info { width:80%; } .studio-mood { font-size:23px; } .studio-mood-subtitle { max-width:220px; } .studio-pendant { right:-38px; opacity:.65; } }

    @media (prefers-reduced-motion: reduce) {
      .weather-icon { animation: none; }
    }
    .settings-center {display:grid;gap:24px;max-width:820px;width:100%;min-width:0}
    .settings-intro h1 {font-size:clamp(27px,4vw,38px);letter-spacing:-.045em;margin:9px 0 6px;color:#f7eefc}
    .settings-intro p,.settings-local-note,.settings-empty {font-size:13px;color:var(--cr-muted);margin:0}
    .settings-search {display:flex;align-items:center;gap:12px;padding:12px 15px;border-radius:15px;background:rgba(255,255,255,.045);border:1px solid color-mix(in srgb,var(--cr-accent) 15%,transparent);color:var(--cr-muted)}
    .settings-search ha-icon {--mdc-icon-size:20px}
    .settings-search input {background:transparent;border:0;outline:0;color:#f7eefc;font:inherit;width:100%;min-width:0}
    .settings-search input::placeholder {color:var(--cr-muted)}
    .settings-category {display:grid;gap:11px;min-width:0}
    .settings-category h2 {font-size:13px;font-weight:700;color:var(--cr-muted);margin:0 0 2px 3px}
    .settings-options {display:grid;gap:9px}
    .settings-option {display:flex;align-items:center;text-align:left;gap:14px;width:100%;min-width:0;padding:16px;border:1px solid color-mix(in srgb,var(--cr-accent) 14%,transparent);border-radius:17px;background:rgba(255,255,255,.035);color:#e9dff0;cursor:pointer;font:inherit;transition:background .15s,border-color .15s}
    .settings-option:hover,.settings-option:focus-visible {background:color-mix(in srgb,var(--cr-accent) 14%,transparent);border-color:color-mix(in srgb,var(--cr-accent) 36%,transparent)}
    .settings-option-icon {display:grid;place-items:center;flex:0 0 42px;width:42px;height:42px;border-radius:13px;background:color-mix(in srgb,var(--cr-accent) 16%,transparent);color:var(--cr-text)}
    .settings-option-icon ha-icon {--mdc-icon-size:22px}
    .settings-option-copy {display:grid;gap:4px;min-width:0;flex:1}
    .settings-option-copy strong {font-size:14px;font-weight:650}
    .settings-option-copy small {font-size:11px;color:var(--cr-muted);line-height:1.5}
    .settings-option>ha-icon {--mdc-icon-size:18px;color:var(--cr-muted)}
    .settings-back {display:flex;align-items:center;gap:8px;justify-self:start;padding:8px 0;border:0;background:transparent;color:var(--cr-text);font:inherit;font-size:13px;cursor:pointer}
    .settings-back ha-icon {--mdc-icon-size:18px}
    @media(max-width:650px){.settings-center{gap:19px}.settings-option{padding:13px;gap:11px}.settings-option-icon{flex-basis:38px;width:38px;height:38px}}
    .settings-stack {display:grid;gap:18px;max-width:740px}
    .settings-stack .welcome-settings {max-width:none}
    .settings-subheading {font-size:13px;font-weight:700;color:var(--cr-text);margin-top:25px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)}
    .welcome-setting-text select {width:100%;padding:10px;border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent);border-radius:10px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:#fff}
    .welcome-setting-text input {width:100%}
    .settings-note {margin:12px 0 0!important;color:var(--cr-muted)!important;font-size:12px!important}
    .smart-part {display:flex;align-items:center;min-width:0}
    /* Compact information bar and personalized greeting */
    .smart-bar {display:flex;align-items:center;gap:14px;min-height:62px;padding:8px 15px;border:1px solid color-mix(in srgb,var(--cr-accent) 13%,transparent);border-radius:18px;background:color-mix(in srgb,var(--cr-accent) 10%,transparent);backdrop-filter:blur(18px)}
    .smart-bar .weather {min-width:0;min-height:0;padding:0;border:0;background:none;gap:8px;backdrop-filter:none}
    .smart-bar .weather-icon ha-icon {--mdc-icon-size:27px}
    .smart-bar .weather-temp,.smart-segment strong {font-size:15px;font-weight:700;white-space:nowrap}
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:10px;color:var(--cr-muted);white-space:nowrap;margin-top:2px}
    .smart-divider {width:1px;height:32px;flex:none;background:color-mix(in srgb,var(--cr-accent) 19%,transparent)}
    .smart-segment {display:flex;align-items:center;gap:9px;min-width:0}
    .smart-segment>ha-icon {--mdc-icon-size:21px;color:var(--cr-muted);flex:none}
    .smart-segment>div {min-width:0}
    .smart-waste strong {display:block;max-width:210px;overflow:hidden;text-overflow:ellipsis}
    .welcome-title {display:flex;align-items:center;gap:14px}
    .welcome-title h1 {margin:12px 0 10px}
    .pill-avatar.avatar-large {flex:0 0 49px;width:49px;height:49px;border:1px solid color-mix(in srgb,var(--cr-accent) 40%,transparent)}
    .welcome-settings {max-width:680px;padding:25px;border:1px solid color-mix(in srgb,var(--cr-accent) 17%,transparent);border-radius:22px;background:rgba(255,255,255,.035)}
    .welcome-settings h2 {margin:12px 0;font-size:24px}
    .welcome-settings p {color:var(--cr-muted);font-size:12px;margin-bottom:24px}
    .welcome-setting-row {display:flex;justify-content:space-between;align-items:center;gap:20px;padding:14px 0;border-bottom:1px solid rgba(255,255,255,.07);font-size:13px}
    .welcome-setting-row select,.welcome-setting-text input {padding:10px;border:1px solid color-mix(in srgb,var(--cr-accent) 20%,transparent);border-radius:10px;background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent));color:#fff;max-width:100%}
    .welcome-setting-row input {accent-color:var(--cr-accent)}
    .welcome-setting-text {display:flex;flex-direction:column;gap:8px;margin-top:17px;color:var(--cr-muted);font-size:12px}
    @media(max-width:1100px){.topbar{align-items:flex-start;flex-wrap:wrap}.topbar-right{margin-left:auto}.smart-bar{gap:10px}}
    @media(max-width:650px){.smart-bar{gap:8px;padding:8px}.smart-bar{flex-wrap:wrap}.smart-waste strong{max-width:105px}.smart-bar .weather-condition{display:none}.hero-content{align-items:flex-start}.welcome-title h1{font-size:clamp(24px,6vw,36px)}}

    /* Mobile layout: keep the page title and Smart Glass Bar in separate rows. */
    @media (max-width: 650px) {
      .main { width:100%; min-width:0; padding:18px 16px 32px; }
      .topbar { display:flex; flex-direction:column; align-items:stretch; gap:14px; margin-bottom:32px; }
      .topbar-left { width:100%; min-width:0; justify-content:flex-start; }
      .page-heading { font-size:15px; }
      .topbar-right { display:block; width:100%; min-width:0; margin:0; }
      .smart-bar { width:100%; max-width:100%; min-width:0; min-height:58px; padding:10px 12px; display:flex; flex-wrap:wrap; justify-content:space-between; gap:10px 8px; }
      .smart-part { min-width:0; flex:1 1 auto; }
      .smart-bar .weather { gap:7px; }
      .smart-bar .weather-temp,.smart-segment strong { font-size:13px; }
      .smart-bar .weather-condition,.smart-segment small { font-size:10px; }
      .smart-divider { height:26px; }
      .smart-segment { gap:6px; }
      .smart-segment>ha-icon { --mdc-icon-size:19px; }
      .smart-waste strong { max-width:155px; }
      .hero { min-width:0; }
      .hero-content { display:flex; flex-direction:column; align-items:flex-start; gap:18px; }
      .hero-message { width:100%; min-width:0; }
      .welcome-title { display:flex; align-items:center; gap:11px; min-width:0; }
      .welcome-title h1 { min-width:0; overflow-wrap:anywhere; font-size:clamp(25px,6.5vw,34px); line-height:1.17; letter-spacing:-.045em; }
      .pill-avatar.avatar-large { flex:0 0 43px; width:43px; height:43px; }
      .hero-message p { font-size:13px; line-height:1.55; }
      .people-pills { max-width:100%; }
      .overview-grid { margin-top:28px; gap:13px; }
      .overview-card { min-width:0; }
      .welcome-settings { padding:17px; }
      .welcome-setting-row { flex-wrap:wrap; gap:10px; }
    }
    /* Readable Smart Bar secondary labels across screen sizes */
    .smart-bar .weather-temp,.smart-segment strong {font-size:17px;font-weight:700}
    .smart-bar .weather-condition,.smart-segment small {display:block;font-size:13px;color:var(--cr-text);line-height:1.35}
    .smart-segment>ha-icon {--mdc-icon-size:24px}
    @media(max-width:650px){.smart-bar .weather-temp,.smart-segment strong{font-size:16px}.smart-bar .weather-condition,.smart-segment small{display:block;font-size:12px}.smart-bar{row-gap:9px}}
    .smart-settings-module{border:1px solid color-mix(in srgb,var(--cr-accent) 15%,transparent);border-radius:15px;background:rgba(255,255,255,.035);overflow:hidden;margin-top:12px}
    .smart-settings-head{display:flex;align-items:center;gap:12px;padding:12px 14px}
    .smart-settings-open{display:flex;align-items:center;gap:10px;flex:1;text-align:left;background:none;border:0;color:#f4e9fa;cursor:pointer;font:inherit}
    .smart-settings-open strong{flex:1}.smart-settings-open ha-icon{--mdc-icon-size:21px;color:var(--cr-text)}
    .smart-settings-toggle input{accent-color:var(--cr-accent);width:18px;height:18px}
    .smart-settings-body{padding:8px 15px 17px;border-top:1px solid color-mix(in srgb,var(--cr-accent) 12%,transparent);display:grid;gap:12px}
    @media (max-width: 390px) {
      .main { padding-left:12px; padding-right:12px; }
      .smart-bar { justify-content:flex-start; }
      .smart-part { flex:0 1 auto; }
      .smart-divider { display:none; }
      .welcome-title h1 { font-size:24px; }
    }


    .settings-save-bar {position:sticky;bottom:14px;z-index:5;display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:14px 16px;border:1px solid color-mix(in srgb,var(--cr-accent) 30%,transparent);border-radius:17px;background:linear-gradient(120deg,color-mix(in srgb,var(--cr-accent) 97%,transparent),color-mix(in srgb,var(--cr-accent) 97%,transparent));box-shadow:0 12px 35px rgba(0,0,0,.3);backdrop-filter:blur(20px)}
    .settings-save-copy {flex:1;min-width:170px;display:grid;gap:3px}
    .settings-save-copy strong {font-size:13px;color:var(--cr-text)}
    .settings-save-copy small {font-size:11px;color:var(--cr-muted);line-height:1.4}
    .settings-cancel,.settings-save {display:inline-flex;align-items:center;justify-content:center;gap:7px;padding:10px 14px;border-radius:11px;border:1px solid color-mix(in srgb,var(--cr-accent) 23%,transparent);font:inherit;font-size:12px;font-weight:650;cursor:pointer}
    .settings-cancel {background:rgba(255,255,255,.05);color:var(--cr-text)}
    .settings-save {background:linear-gradient(120deg,var(--cr-accent,var(--cr-accent)),color-mix(in srgb,var(--cr-accent,var(--cr-accent)) 70%,black));color:white;border-color:color-mix(in srgb,var(--cr-accent) 40%,transparent)}
    .settings-save:disabled {opacity:.45;cursor:not-allowed}
    .settings-save-bar ha-icon {--mdc-icon-size:17px}
    @media(max-width:500px){.settings-save-bar{bottom:8px;padding:12px}.settings-save-copy{flex-basis:100%}.settings-cancel,.settings-save{flex:1}}

    /* ControlRoom mobile compact: overrides only at phone widths. */
    @media (max-width: 650px) {
      .main { padding: 12px 12px 24px; }
      .topbar { gap: 9px; margin-bottom: 18px; }
      .topbar-left { min-height: 28px; }
      .page-heading { font-size: 14px; }
      .smart-bar {
        box-sizing: border-box; display: grid; width: 100%;
        grid-template-columns: minmax(0,1fr) minmax(0,1fr);
        gap: 10px 8px; padding: 12px; min-height: 0;
        border-radius: 17px; align-items: center;
      }
      .smart-bar .smart-part { min-width: 0; width: auto; flex: initial; }
      .smart-bar .smart-part:has(.smart-waste) { grid-column: 1 / -1; }
      .smart-bar .smart-divider { display: none; }
      .smart-bar .weather { gap: 7px; }
      .smart-bar .weather-icon ha-icon { --mdc-icon-size: 22px; }
      .smart-bar .weather-temp, .smart-bar .smart-segment strong { font-size: 14px; }
      .smart-bar .weather-condition, .smart-bar .smart-segment small { font-size: 11px; }
      .smart-bar .smart-segment > ha-icon { --mdc-icon-size: 21px; }
      .smart-bar .smart-waste strong { max-width: none; white-space: normal; line-height: 1.25; }
      .hero-content { gap: 10px; }
      .eyebrow { font-size: 10px; }
      .welcome-title { gap: 9px; }
      .welcome-title h1 { font-size: clamp(21px, 5.7vw, 27px); line-height: 1.18; margin: 6px 0; }
      .pill-avatar.avatar-large { flex-basis: 35px; width: 35px; height: 35px; }
      .hero-message p { font-size: 12px; line-height: 1.4; }
      .person-pill { padding: 3px 10px 3px 3px; gap: 7px; }
      .person-pill .pill-avatar { flex-basis: 29px; width: 29px; height: 29px; }
      .overview-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; margin-top: 20px; }
      .overview-card { min-height: 118px; padding: 14px; border-radius: 17px; }
      .card-icon ha-icon { --mdc-icon-size: 22px; }
      .card-title { font-size: 14px; }
      .card-subtitle { font-size: 10px; line-height: 1.35; }
    }
    @media (max-width: 360px) {
      .main { padding-left: 10px; padding-right: 10px; }
      .overview-card { min-height: 110px; padding: 11px; }
      .welcome-title h1 { font-size: 20px; }
      .smart-bar { padding: 10px; }
    }


    /* Adaptive Premium: respond to available dashboard width, not just screen width. */
    .main { container-type: inline-size; min-width: 0; }
    .overview-grid {
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 185px), 1fr));
      gap: clamp(10px, 1.4vw, 16px);
    }
    .overview-card {
      min-width: 0;
      min-height: clamp(122px, 13vw, 175px);
      padding: clamp(13px, 1.6vw, 22px);
    }
    .hero-message h1 { overflow-wrap: anywhere; }
    .smart-bar { max-width: 100%; box-sizing: border-box; }
    .smart-part { min-width: 0; }
    .smart-waste strong { overflow-wrap: anywhere; }

    @container (max-width: 720px) {
      .topbar { flex-wrap: wrap; gap: 10px; }
      .topbar-right { max-width: 100%; min-width: 0; }
      .overview-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 22px; }
      .overview-card { min-height: 125px; padding: 15px; border-radius: 17px; }
      .hero-content { gap: 12px; }
      .welcome-title h1 { font-size: clamp(21px, 4.5cqw, 30px); line-height: 1.2; }
    }
    @container (max-width: 470px) {
      .topbar { margin-bottom: 16px; }
      .smart-bar {
        display: grid;
        width: 100%;
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: 10px 8px;
        padding: 11px;
        min-height: 0;
      }
      .smart-bar .smart-part { width: auto; flex: initial; }
      .smart-bar .smart-part:has(.smart-waste) { grid-column: 1 / -1; }
      .smart-bar .smart-divider { display: none; }
      .smart-bar .smart-waste strong { max-width: 100%; white-space: normal; }
      .hero-content { gap: 10px; }
      .welcome-title h1 { font-size: clamp(20px, 5.4cqw, 26px); }
      .hero-message p { font-size: 12px; }
      .overview-grid { gap: 9px; margin-top: 18px; }
      .overview-card { min-height: 116px; padding: 12px; }
      .card-title { font-size: 14px; }
      .card-subtitle { font-size: 10px; }
    }
    @container (max-width: 315px) {
      .overview-grid { grid-template-columns: 1fr; }
      .overview-card { min-height: 105px; }
      .smart-bar { grid-template-columns: 1fr; }
      .smart-bar .smart-part:has(.smart-waste) { grid-column: auto; }
    }


    /* Theme Studio v2: global palette, not just the navigation */
    .dashboard{background:radial-gradient(ellipse at 65% 0%,color-mix(in srgb,var(--cr-accent) 12%,transparent),transparent 50%),var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .sidebar{background:color-mix(in srgb,var(--cr-surface) 75%,var(--cr-bg))!important;border-right-color:color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
    .dashboard .main{background:transparent!important;color:var(--cr-text)!important}
    .dashboard .brand-symbol{background:linear-gradient(135deg,var(--cr-accent),color-mix(in srgb,var(--cr-accent) 45%,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent))))!important;color:#fff!important;box-shadow:0 8px 24px color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
    .dashboard .nav-item.active,.dashboard .settings-option:hover{background:color-mix(in srgb,var(--cr-accent) 23%,var(--cr-surface))!important;border-color:color-mix(in srgb,var(--cr-accent) 50%,transparent)!important}
    .dashboard .nav-item.active ha-icon,.dashboard .nav-item:hover ha-icon{color:var(--cr-accent)!important}
    .dashboard .page-heading,.dashboard .brand-name,.dashboard .cr-rooms-heading h1,.dashboard .cr-room-tile-body h2,.dashboard .cr-room-visual-head h2,.dashboard .settings-center h2,.dashboard .settings-center h3{color:var(--cr-text)!important}
    .dashboard .brand-subtitle,.dashboard .cr-room-tile-body p,.dashboard .cr-room-tile-footer,.dashboard .cr-room-visual-head p,.dashboard .settings-note{color:var(--cr-muted)!important}
    .dashboard .smart-bar,.dashboard .overview-card,.dashboard .cr-room-tile,.dashboard .cr-room-section,.dashboard .settings-option,.dashboard .cr-room-detail-hero{background:color-mix(in srgb,var(--cr-surface) 84%,transparent)!important;border-color:color-mix(in srgb,var(--cr-accent) 19%,transparent)!important;color:var(--cr-text)!important}
    .dashboard .smart-bar{background:color-mix(in srgb,var(--cr-surface) 90%,transparent)!important}
    .dashboard .cr-room-tile-art{background:color-mix(in srgb,var(--cr-surface) 76%,var(--cr-bg))!important}
    .dashboard .cr-room-tile-art img.cr-art-3d,.dashboard .cr-room-detail-art img.cr-art-3d{object-fit:contain!important;object-position:center!important;filter:none!important}
    .dashboard .cr-room-tile-art img.cr-art-photo,.dashboard .cr-room-detail-art img.cr-art-photo{object-fit:contain!important;object-position:center!important;filter:none!important}
    .dashboard .cr-room-tile-art:after{background:linear-gradient(transparent 60%,color-mix(in srgb,var(--cr-bg) 28%,transparent))!important}
    .dashboard .cr-theme-choice.chosen,.dashboard .cr-theme-style-list button.chosen{border-color:var(--cr-accent)!important}
    .dashboard.cr-theme-solid .smart-bar,.dashboard.cr-theme-solid .cr-room-tile{backdrop-filter:none!important;background:var(--cr-surface)!important}
    .dashboard.cr-theme-minimal .smart-bar,.dashboard.cr-theme-minimal .cr-room-tile{box-shadow:none!important;backdrop-filter:none!important}
    .dashboard.cr-theme-light .cr-room-tile-body,.dashboard.cr-theme-light .settings-option{color:var(--cr-text)!important}
    /* Theme Studio v4 — dynamic accent across buttons, toggles and lighting */
    .dashboard .overview-card-icon,.dashboard .card-icon,.dashboard .card-icon-wrap,.dashboard .light-icon,.dashboard .cr-room-tile-arrow,.dashboard .cr-room-actions button:first-child,
    .dashboard .settings-save,.dashboard .studio-color-trigger,.dashboard .studio-inline-slider,.dashboard .light-toggle.active,.dashboard .toggle.active,
    .dashboard .segment.active,.dashboard .tab.active,.dashboard .mode-button.active,.dashboard .scene-button.active,
    .dashboard input[type="range"],.dashboard input[type="checkbox"],.dashboard input[type="radio"]{accent-color:var(--cr-accent)!important}
    .dashboard .cr-room-actions button:first-child,.dashboard .settings-save{background:var(--cr-accent)!important;border-color:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .cr-room-tile-art,.dashboard .cr-room-detail-art{background:color-mix(in srgb,var(--cr-surface) 80%,var(--cr-bg))!important}
    .dashboard .cr-room-tile-art img,.dashboard .cr-room-detail-art img{max-width:100%;max-height:100%;object-fit:contain!important}
    .dashboard .cr-room-tile-art:after{opacity:.25!important}
    .dashboard .cr-room-lit .cr-room-tile-art{background:color-mix(in srgb,var(--cr-accent) 15%,var(--cr-surface))!important}
    .dashboard .cr-room-tile-art>ha-icon,.dashboard .cr-room-detail-art>ha-icon{color:var(--cr-accent)!important}
    .dashboard .cr-room-tile,.dashboard .cr-room-detail-hero{overflow:hidden}
    .dashboard .cr-room-tile-body,.dashboard .cr-room-tile-footer{background:transparent!important}
    /* Theme Studio v3 — unified icon and control colors */
    .dashboard ha-icon:not(.cr-keep-color),.dashboard .settings-option-icon ha-icon,.dashboard .overview-card ha-icon,.dashboard .nav-item ha-icon,.dashboard .cr-room-section ha-icon{color:var(--cr-accent)!important}
    .dashboard .settings-option-icon,.dashboard .overview-card-icon,.dashboard .card-icon,.dashboard .nav-item.active{color:var(--cr-accent)!important}
    .dashboard button:focus-visible,.dashboard select:focus-visible{outline:2px solid var(--cr-accent)!important;outline-offset:2px}
    .dashboard .cr-theme-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .cr-theme-choice,.dashboard .cr-theme-style-list button{background:color-mix(in srgb,var(--cr-surface) 80%,transparent)!important;color:var(--cr-text)!important}
    .dashboard.cr-theme-glass .overview-card,.dashboard.cr-theme-glass .smart-bar,.dashboard.cr-theme-glass .settings-option,.dashboard.cr-theme-glass .cr-room-tile,.dashboard.cr-theme-glass .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 67%,transparent)!important;backdrop-filter:blur(24px) saturate(145%)!important;box-shadow:0 14px 40px #00000022,inset 0 1px #ffffff18!important;border:1px solid color-mix(in srgb,var(--cr-text) 16%,transparent)!important;border-radius:22px!important}
    .dashboard.cr-theme-solid .overview-card,.dashboard.cr-theme-solid .smart-bar,.dashboard.cr-theme-solid .settings-option,.dashboard.cr-theme-solid .cr-room-tile,.dashboard.cr-theme-solid .cr-room-section{background:var(--cr-surface)!important;backdrop-filter:none!important;box-shadow:0 4px 12px #00000016!important;border:1px solid color-mix(in srgb,var(--cr-text) 11%,transparent)!important;border-radius:15px!important}
    .dashboard.cr-theme-minimal .overview-card,.dashboard.cr-theme-minimal .smart-bar,.dashboard.cr-theme-minimal .settings-option,.dashboard.cr-theme-minimal .cr-room-tile,.dashboard.cr-theme-minimal .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 58%,var(--cr-bg))!important;backdrop-filter:none!important;box-shadow:none!important;border:1px solid color-mix(in srgb,var(--cr-text) 10%,transparent)!important;border-radius:9px!important}
    .dashboard.cr-theme-minimal .overview-card{min-height:85px!important;padding:13px!important}
    .dashboard.cr-theme-minimal .settings-option{padding:11px!important}
    .dashboard.cr-theme-light .nav-item,.dashboard.cr-theme-light .settings-option,.dashboard.cr-theme-light .overview-card{color:var(--cr-text)!important}
    /* V5: room art is always clipped inside its own positioned container. */
    .dashboard .cr-room-detail-art{position:relative!important;isolation:isolate;width:100%;min-width:0;overflow:hidden!important;aspect-ratio:16/9;height:auto!important;max-height:300px}
    .dashboard .cr-room-detail-art img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center!important;pointer-events:none!important}
    .dashboard .cr-room-tile-art img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center!important;pointer-events:none!important}
    .dashboard .cr-room-detail-hero{grid-template-columns:minmax(0,1.25fr) minmax(180px,.75fr);align-items:center;min-width:0}
    .dashboard .cr-room-back{position:relative;z-index:5;pointer-events:auto;color:var(--cr-text)!important;border-color:color-mix(in srgb,var(--cr-text) 22%,transparent)!important}
    .dashboard .cr-room-detail-hero span,.dashboard .cr-room-kicker{color:var(--cr-accent)!important}
    .dashboard .cr-room-detail-hero p,.dashboard .cr-room-detail-head p{color:var(--cr-muted)!important}
    .dashboard .cr-room-sections{position:relative;z-index:1}
    .dashboard .cr-theme-choice strong,.dashboard .cr-theme-style-list strong,.dashboard .cr-theme-style-list small{color:var(--cr-text)!important}
    @media(max-width:640px){.dashboard .cr-room-detail-hero{grid-template-columns:minmax(0,1fr)}}
    .dashboard.cr-theme-light .nav-item:not(.active) ha-icon{color:color-mix(in srgb,var(--cr-accent) 65%,var(--cr-text))!important}
    /* V6: prevent art and device grids from escaping the room content area. */
    .dashboard .cr-rooms-page{position:relative;min-width:0;max-width:100%;overflow:hidden;color:var(--cr-text)!important}
    .dashboard .cr-room-detail-hero{position:relative;display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr)!important;gap:20px;max-width:100%;padding:16px!important}
    .dashboard .cr-room-detail-art{position:relative!important;display:block!important;width:100%!important;height:148px!important;max-height:148px!important;aspect-ratio:auto!important;overflow:hidden!important}
    .dashboard .cr-room-detail-art img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}
    .dashboard .cr-room-sections{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));align-items:start;gap:12px;max-width:100%;min-width:0}
    .dashboard .cr-room-section{min-width:0;max-width:100%;overflow:hidden}
    .dashboard .cr-room-back{display:inline-flex;align-items:center;gap:6px;cursor:pointer;z-index:20!important;position:relative!important}
    .dashboard .cr-room-detail-hero,.dashboard .cr-room-section,.dashboard .cr-room-device,.dashboard .cr-room-back{color:var(--cr-text)!important}
    .dashboard .cr-theme-choice strong,.dashboard .cr-theme-style-list strong,.dashboard .cr-theme-style-list small{color:var(--cr-text)!important;opacity:1!important}
    .dashboard .cr-theme-studio{color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice{border-color:color-mix(in srgb,var(--cr-text) 25%,transparent)!important}
    .dashboard .cr-theme-studio .cr-theme-choice.chosen{border-color:var(--cr-accent)!important}
    @media(max-width:640px){.dashboard .cr-room-detail-hero{grid-template-columns:minmax(0,1fr)!important}.dashboard .cr-room-detail-art{height:160px!important;max-height:160px!important}}
    /* V6: use HA-selected palette throughout the internal ControlRoom shell. */
    .dashboard{background:var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .main,.dashboard .sidebar{color:var(--cr-text)!important}
    .dashboard .nav-item.active,.dashboard .settings-option:hover{border-color:var(--cr-accent)!important}
    .dashboard .cr-room-kicker,.dashboard .cr-rooms-heading p{color:var(--cr-muted)!important}

    /* V7: semantic colors for every surface, including settings and room details. */
    .dashboard .settings-intro h1,.dashboard .settings-option-copy strong,.dashboard .settings-save-copy strong,
    .dashboard .welcome-title h1,.dashboard .page-heading,.dashboard .cr-room-detail-head h2,
    .dashboard .cr-room-section h3,.dashboard .lights-count{color:var(--cr-text)!important}
    .dashboard .settings-intro p,.dashboard .settings-option-copy small,.dashboard .settings-category h2,
    .dashboard .settings-note,.dashboard .settings-local-note,.dashboard .settings-save-copy small,
    .dashboard .light-row-status,.dashboard .studio-inline-value{color:var(--cr-muted)!important}
    .dashboard .settings-option,.dashboard .settings-search,.dashboard .settings-save-bar,
    .dashboard .welcome-setting-row select,.dashboard .welcome-setting-text input,
    .dashboard .welcome-setting-text select,.dashboard .cr-room-device{
      background:var(--cr-surface)!important;color:var(--cr-text)!important;
      border-color:color-mix(in srgb,var(--cr-text) 15%,transparent)!important}
    .dashboard input,.dashboard select,.dashboard textarea{accent-color:var(--cr-accent);color:var(--cr-text)}
    .dashboard .settings-save,.dashboard .cr-theme-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .settings-cancel,.dashboard .cr-theme-actions button:first-child{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-room-detail-art img.cr-art-3d,.dashboard .cr-room-tile-art img.cr-art-3d{object-fit:contain!important}
    .dashboard .cr-room-detail-art img.cr-art-photo,.dashboard .cr-room-tile-art img.cr-art-photo{object-fit:cover!important}
  
    /* V8: every dashboard surface follows the selected theme, including HA/HACS */
    .dashboard .studio-hero,.dashboard .lighting-preferences{background:linear-gradient(115deg,color-mix(in srgb,var(--cr-bg) 78%,var(--cr-accent)),var(--cr-surface))!important;border-color:color-mix(in srgb,var(--cr-accent) 22%,transparent)!important}
    .dashboard .studio-hero.lit{background:radial-gradient(ellipse at 85% 80%,color-mix(in srgb,var(--cr-accent) 17%,transparent),transparent 55%),linear-gradient(115deg,var(--cr-surface),var(--cr-bg))!important}
    .dashboard .sidebar{background:color-mix(in srgb,var(--cr-bg) 82%,var(--cr-surface))!important}
    .dashboard .main{background:var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-studio,.dashboard .settings-center,.dashboard .settings-option,.dashboard .studio-hero,.dashboard .studio-mood,.dashboard .studio-mood-subtitle{color:var(--cr-text)!important}
    .dashboard .overview-card,.dashboard .settings-option,.dashboard .cr-room-section,.dashboard .cr-room-tile,.dashboard .studio-room-card{border-color:color-mix(in srgb,var(--cr-text) 11%,transparent)!important}
    .dashboard.cr-theme-light .sidebar,.dashboard.cr-theme-light .main,.dashboard.cr-theme-light .settings-center{color:var(--cr-text)!important}
    .dashboard.cr-theme-light .settings-option,.dashboard.cr-theme-light .overview-card,.dashboard.cr-theme-light .cr-room-section{background:color-mix(in srgb,var(--cr-surface) 92%,var(--cr-bg))!important}
    .dashboard.cr-theme-light .studio-mood,.dashboard.cr-theme-light .studio-mood-subtitle,.dashboard.cr-theme-light .nav-item,.dashboard.cr-theme-light .settings-note{color:var(--cr-text)!important}

    /* V10: bridge HA/HACS theme tokens to custom ControlRoom surfaces only. */
    .dashboard .topbar,.dashboard .studio-mood,.dashboard .settings-center{color:var(--cr-text)!important}
    .dashboard .studio-hero,.dashboard .lighting-preferences,.dashboard .cr-room-tile,.dashboard .cr-room-section,
    .dashboard .overview-card,.dashboard .settings-option,.dashboard .studio-room-card{
      box-shadow:var(--ha-card-box-shadow,0 8px 28px rgba(0,0,0,.10));
      border-radius:var(--ha-card-border-radius,var(--cr-radius));
    }
    .dashboard.cr-theme-light .studio-mood,.dashboard.cr-theme-light .overview-card,
    .dashboard.cr-theme-light .studio-room-card,.dashboard.cr-theme-light .cr-room-tile,
    .dashboard.cr-theme-light .settings-option{color:var(--cr-text)!important}
    /* V9: one scoped color system; no global HA theme mutation */
    .dashboard { color:var(--cr-text)!important; background:var(--cr-bg)!important; }
    .dashboard .sidebar {background:color-mix(in srgb,var(--cr-bg) 74%,var(--cr-surface))!important;border-color:color-mix(in srgb,var(--cr-text) 10%,transparent)!important}
    .dashboard .main {background:var(--cr-bg)!important;color:var(--cr-text)!important}
    .dashboard .topbar,.dashboard .topbar-left,.dashboard .cr-theme-studio,.dashboard .settings-center {color:var(--cr-text)!important}
    .dashboard .nav-item.active,.dashboard .settings-nav-item.active {background:color-mix(in srgb,var(--cr-accent) 22%,var(--cr-surface))!important;border-color:var(--cr-accent)!important;color:var(--cr-accent)!important}
    .dashboard .nav-item.active ha-icon,.dashboard .nav-item.active svg {color:var(--cr-accent)!important}
    .dashboard .studio-mood,.dashboard .studio-mood-subtitle,.dashboard .settings-intro h1,.dashboard .page-heading,.dashboard .cr-rooms-heading h1,.dashboard .cr-room-tile-body h2,.dashboard .settings-search input {color:var(--cr-text)!important}
    .dashboard .studio-hero,.dashboard .lighting-preferences {background:linear-gradient(120deg,color-mix(in srgb,var(--cr-accent) 13%,var(--cr-surface)),var(--cr-bg))!important;border-color:color-mix(in srgb,var(--cr-accent) 20%,transparent)!important}
    .dashboard .studio-hero.lit {background:radial-gradient(ellipse at 80% 75%,color-mix(in srgb,var(--cr-accent) 16%,transparent),transparent 58%),linear-gradient(120deg,var(--cr-surface),var(--cr-bg))!important}
    .dashboard .overview-card,.dashboard .studio-room-card,.dashboard .cr-room-tile,.dashboard .cr-room-section,.dashboard .cr-room-device,.dashboard .settings-option,.dashboard .cr-theme-choice,.dashboard .cr-theme-style-list button {background:color-mix(in srgb,var(--cr-surface) 91%,var(--cr-bg))!important;color:var(--cr-text)!important;border-color:color-mix(in srgb,var(--cr-text) 12%,transparent)!important}
    .dashboard .overview-card ha-icon,.dashboard .studio-room-card ha-icon,.dashboard .cr-room-device ha-icon,.dashboard .cr-theme-studio ha-icon {color:var(--cr-accent)}
    .dashboard .cr-theme-choice.chosen,.dashboard .cr-theme-style-list button.chosen {border-color:var(--cr-accent)!important;box-shadow:0 0 0 1px var(--cr-accent)!important}
    .dashboard .settings-save,.dashboard .cr-theme-actions button:last-child {background:var(--cr-accent)!important;color:var(--cr-bg)!important}
    .dashboard .settings-cancel,.dashboard .cr-theme-actions button:first-child {background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .settings-note,.dashboard .overview-card small,.dashboard .studio-mood-subtitle {color:var(--cr-muted)!important}
    .dashboard .cr-room-detail-art {position:relative!important;overflow:hidden!important}
    .dashboard .cr-room-detail-art img {max-width:100%!important;max-height:100%!important}
    /* V11: readable text across native HA theme variants; icons follow the chosen theme. */
    .dashboard .settings-center,.dashboard .settings-center h1,.dashboard .settings-center h2,
    .dashboard .settings-center h3,.dashboard .settings-center p,.dashboard .settings-center label,
    .dashboard .settings-center span,.dashboard .settings-center strong,
    .dashboard .cr-theme-studio h2,.dashboard .cr-theme-studio h3,
    .dashboard .cr-theme-studio .welcome-setting-row,
    .dashboard .cr-theme-studio .settings-note,
    .dashboard .cr-theme-studio .cr-theme-style-list strong,
    .dashboard .cr-theme-studio .cr-theme-style-list small,
    .dashboard .cr-theme-studio .cr-theme-choice strong,
    .dashboard .cr-theme-studio .cr-room-visual-head p,
    .dashboard .cr-theme-studio .cr-room-kicker {color:var(--cr-text)!important}
    .dashboard .cr-theme-studio select,.dashboard .cr-theme-studio option,
    .dashboard .cr-theme-studio input {color:var(--cr-text)!important;background:var(--cr-surface)!important;border-color:color-mix(in srgb,var(--cr-text) 20%,transparent)!important}
    .dashboard .cr-theme-studio .cr-theme-choice,
    .dashboard .cr-theme-studio .cr-theme-style-list button {color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview {color:inherit}
    .dashboard .sidebar ha-icon,.dashboard .main ha-icon,
    .dashboard .sidebar svg,.dashboard .main svg {color:var(--cr-accent)!important}
    .dashboard .settings-back,.dashboard .cr-theme-actions button:first-child {color:var(--cr-text)!important}
    .dashboard .cr-theme-actions button:last-child {color:var(--cr-bg)!important}
    .dashboard .settings-center,.dashboard .cr-theme-studio {background:transparent!important}

    /* V12: consistent semantic colors scoped to ControlRoom only. */
    .dashboard .main,.dashboard .sidebar,.dashboard .topbar,.dashboard .settings-center,.dashboard .cr-theme-studio{color:var(--cr-bg-text)!important}
    .dashboard .main .page-heading,.dashboard .main .settings-intro,.dashboard .main .settings-intro h1,.dashboard .main .settings-center h1,.dashboard .main .settings-center h2,.dashboard .main .settings-center h3,.dashboard .main .settings-center p,.dashboard .main .settings-center label,.dashboard .main .settings-center span:not(.cr-theme-preview):not(.cr-theme-preview *),.dashboard .main .settings-center strong,.dashboard .main .settings-center small{color:var(--cr-bg-text)!important}
    .dashboard .sidebar .nav-item,.dashboard .sidebar .nav-item span,.dashboard .sidebar .nav-item strong,.dashboard .sidebar .sidebar-title,.dashboard .sidebar .sidebar-footer{color:var(--cr-bg-text)!important}
    .dashboard .overview-card,.dashboard .overview-card *,.dashboard .settings-option,.dashboard .settings-option *,.dashboard .cr-room-section,.dashboard .cr-room-section *,.dashboard .cr-room-tile-body,.dashboard .cr-room-tile-body *,.dashboard .cr-theme-choice,.dashboard .cr-theme-choice strong,.dashboard .cr-theme-style-list button,.dashboard .cr-theme-style-list button strong,.dashboard .cr-theme-style-list button small{color:var(--cr-text)!important}
    .dashboard .sidebar ha-icon,.dashboard .main ha-icon,.dashboard .sidebar svg,.dashboard .main svg,.dashboard .nav-item.active,.dashboard .nav-item.active ha-icon,.dashboard .cr-theme-style-list button.chosen ha-icon,.dashboard .cr-theme-choice.chosen ha-icon{color:var(--cr-accent)!important}
    .dashboard .cr-theme-actions button:last-child,.dashboard .settings-save,.dashboard button.primary,.dashboard .cr-room-actions button,.dashboard .cr-room-image-form button,.dashboard .cr-room-visual-actions button:last-child{background:var(--cr-accent)!important;color:var(--cr-on-accent)!important;border-color:var(--cr-accent)!important}
    .dashboard .cr-theme-actions button:last-child *,.dashboard .settings-save *,.dashboard button.primary *{color:var(--cr-on-accent)!important}
    .dashboard .cr-theme-studio select,.dashboard .cr-theme-studio input,.dashboard .cr-theme-studio option{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview{color:inherit!important}
    .dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview span,.dashboard .cr-theme-studio .cr-theme-choice .cr-theme-preview i{color:inherit!important}
    .dashboard .cr-theme-actions button:first-child{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-studio .cr-theme-choice.chosen,.dashboard .cr-theme-studio .cr-theme-style-list button.chosen{border-color:var(--cr-accent)!important}


    /* V13: HACS-only neutral interaction layer. Built-in palettes are unchanged. */
    .dashboard.cr-hacs-neutral {--cr-accent:var(--cr-neutral-bg);--cr-on-accent:var(--cr-neutral-button-text);}
    .dashboard.cr-hacs-neutral .sidebar ha-icon,
    .dashboard.cr-hacs-neutral .main ha-icon,
    .dashboard.cr-hacs-neutral .sidebar svg,
    .dashboard.cr-hacs-neutral .main svg,
    .dashboard.cr-hacs-neutral .nav-item.active,
    .dashboard.cr-hacs-neutral .nav-item.active ha-icon,
    .dashboard.cr-hacs-neutral .cr-theme-style-list button.chosen ha-icon,
    .dashboard.cr-hacs-neutral .cr-theme-choice.chosen ha-icon {color:var(--cr-neutral-bg)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child,
    .dashboard.cr-hacs-neutral .settings-save,
    .dashboard.cr-hacs-neutral button.primary,
    .dashboard.cr-hacs-neutral .cr-room-actions button,
    .dashboard.cr-hacs-neutral .cr-room-image-form button,
    .dashboard.cr-hacs-neutral .cr-room-visual-actions button:last-child {background:var(--cr-neutral-button)!important;color:var(--cr-neutral-button-text)!important;border-color:var(--cr-neutral-button)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child *,
    .dashboard.cr-hacs-neutral .settings-save *,
    .dashboard.cr-hacs-neutral button.primary * {color:var(--cr-neutral-button-text)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-choice.chosen,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list button.chosen,
    .dashboard.cr-hacs-neutral .nav-item.active {border-color:var(--cr-neutral-bg)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-choice,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list button {color:var(--cr-bg-text)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-choice strong,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list strong,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-style-list small {color:var(--cr-bg-text)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio select,
    .dashboard.cr-hacs-neutral .cr-theme-studio input {color:var(--cr-text)!important;background:var(--cr-surface)!important;}
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-preview,
    .dashboard.cr-hacs-neutral .cr-theme-studio .cr-theme-preview * {color:inherit!important;}


    /* V15: legibility first — readable surfaces regardless of the HA gradient. */
    .dashboard .sidebar,
    .dashboard .main {text-shadow:none!important}
    .dashboard .sidebar .nav-item,
    .dashboard .sidebar .sidebar-title,
    .dashboard .sidebar .sidebar-footer,
    .dashboard .main .settings-intro,
    .dashboard .main .page-heading,
    .dashboard .main .cr-rooms-heading {color:var(--cr-bg-text)!important}
    .dashboard .cr-theme-studio,
    .dashboard .settings-center {isolation:isolate}
    .dashboard .cr-theme-style-list button,
    .dashboard .cr-theme-choice,
    .dashboard .settings-option,
    .dashboard .overview-card,
    .dashboard .cr-room-section,
    .dashboard .cr-room-device,
    .dashboard .studio-room-card {
      background:var(--cr-surface)!important;
      color:var(--cr-text)!important;
      backdrop-filter:none!important;
      -webkit-backdrop-filter:none!important;
    }
    .dashboard .cr-theme-style-list button *,
    .dashboard .cr-theme-choice strong,
    .dashboard .settings-option *,
    .dashboard .overview-card *,
    .dashboard .cr-room-section *,
    .dashboard .cr-room-device *,
    .dashboard .studio-room-card * {color:var(--cr-text)!important}
    .dashboard .cr-theme-choice .cr-theme-preview,
    .dashboard .cr-theme-choice .cr-theme-preview * {color:inherit!important}
    .dashboard .cr-theme-actions button:last-child,
    .dashboard .settings-save,
    .dashboard button.primary {color:var(--cr-on-accent)!important}
    .dashboard .cr-theme-actions button:last-child *,
    .dashboard .settings-save *,
    .dashboard button.primary * {color:var(--cr-on-accent)!important}
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child,
    .dashboard.cr-hacs-neutral .settings-save,
    .dashboard.cr-hacs-neutral button.primary,
    .dashboard.cr-hacs-neutral .cr-theme-actions button:last-child *,
    .dashboard.cr-hacs-neutral .settings-save *,
    .dashboard.cr-hacs-neutral button.primary * {color:var(--cr-neutral-button-text)!important}
    /* Premium room cards: no dead band above photo, no giant blank section. */
    .dashboard .cr-room-grid {
      grid-template-columns:repeat(auto-fill,minmax(min(100%,210px),1fr))!important;
      gap:16px!important;
      align-items:stretch;
    }
    .dashboard .cr-room-tile {
      display:flex!important;
      flex-direction:column!important;
      border-radius:18px!important;
      background:var(--cr-surface)!important;
      color:var(--cr-text)!important;
      min-height:0!important;
      overflow:hidden!important;
      backdrop-filter:none!important;
      -webkit-backdrop-filter:none!important;
    }
    .dashboard .cr-room-tile-art {
      height:auto!important;
      aspect-ratio:16/10!important;
      flex:0 0 auto!important;
      display:block!important;
      background:var(--cr-surface)!important;
      overflow:hidden!important;
    }
    .dashboard .cr-room-tile-art img.cr-art-photo {
      position:absolute!important;inset:0!important;
      width:100%!important;height:100%!important;
      object-fit:cover!important;object-position:center!important;
    }
    .dashboard .cr-room-tile-art img.cr-art-3d {
      position:absolute!important;inset:0!important;
      width:100%!important;height:100%!important;
      object-fit:contain!important;object-position:center!important;
    }
    .dashboard .cr-room-tile-art:after {display:none!important}
    .dashboard .cr-room-tile-arrow {z-index:2!important}
    .dashboard .cr-room-tile-body {
      display:flex!important;
      flex:1 1 auto!important;
      flex-direction:column!important;
      gap:5px!important;
      padding:14px 15px 13px!important;
      background:var(--cr-surface)!important;
      color:var(--cr-text)!important;
    }
    .dashboard .cr-room-tile-body h2 {
      margin:0!important;font-size:15px!important;
      line-height:1.3!important;color:var(--cr-text)!important;
    }
    .dashboard .cr-room-tile-body p {
      margin:0!important;font-size:12px!important;
      line-height:1.5!important;color:var(--cr-text)!important;
    }
    .dashboard .cr-room-tile-footer {
      margin-top:auto!important;padding-top:12px!important;
      color:var(--cr-text)!important;
      font-size:11px!important;
    }
    .dashboard .cr-room-tile-footer * {color:var(--cr-text)!important}
    @media(max-width:640px){
      .dashboard .cr-room-grid {grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:11px!important}
      .dashboard .cr-room-tile-body {padding:11px!important}
      .dashboard .cr-room-tile-body h2 {font-size:13px!important}
      .dashboard .cr-room-tile-art {aspect-ratio:4/3!important}
    }


    /* V16: readable premium settings, no inherited orange focus or dim text */
    .dashboard .cr-theme-studio,.dashboard .cr-room-visual-editor{color:var(--cr-bg-text)!important}
    .dashboard .cr-theme-studio h2,.dashboard .cr-theme-studio h3,.dashboard .cr-theme-studio p,.dashboard .cr-theme-studio .settings-note,
    .dashboard .cr-theme-studio .welcome-setting-row>span,.dashboard .cr-room-visual-editor h2,.dashboard .cr-room-visual-editor p,
    .dashboard .cr-room-visual-editor .welcome-setting-text,.dashboard .cr-room-visual-editor .welcome-setting-row>span,
    .dashboard .cr-room-visual-editor .settings-note{color:var(--cr-bg-text)!important;opacity:1!important}
    .dashboard .cr-theme-style-list button,.dashboard .cr-theme-choice{background:var(--cr-surface)!important;color:var(--cr-text)!important;border-color:color-mix(in srgb,var(--cr-text) 22%,transparent)!important}
    .dashboard .cr-theme-style-list button strong,.dashboard .cr-theme-style-list button small,.dashboard .cr-theme-choice strong{color:var(--cr-text)!important;opacity:1!important}
    .dashboard .cr-theme-studio select,.dashboard .cr-room-visual-editor select,.dashboard .cr-room-visual-editor input{background:var(--cr-surface)!important;color:var(--cr-text)!important;border:1px solid color-mix(in srgb,var(--cr-text) 30%,transparent)!important;outline:none!important;box-shadow:none!important;accent-color:var(--cr-accent)!important}
    .dashboard .cr-theme-studio select:focus-visible,.dashboard .cr-room-visual-editor select:focus-visible,.dashboard .cr-room-visual-editor input:focus-visible{outline:2px solid var(--cr-bg-text)!important;outline-offset:2px!important;border-color:var(--cr-bg-text)!important}
    .dashboard .cr-theme-studio select option,.dashboard .cr-room-visual-editor select option{background:var(--cr-surface);color:var(--cr-text)}
    .dashboard .cr-theme-actions,.dashboard .cr-room-visual-actions{position:sticky!important;bottom:0!important;z-index:30!important;display:flex!important;justify-content:flex-end!important;gap:10px!important;padding:15px!important;margin:22px -10px -10px!important;background:var(--cr-bg)!important;border-top:1px solid color-mix(in srgb,var(--cr-bg-text) 18%,transparent)!important;box-shadow:0 -12px 25px color-mix(in srgb,var(--cr-bg) 70%,transparent)!important;border-radius:14px!important}
    .dashboard .cr-room-visual-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,270px),1fr));gap:12px;margin:22px 0}
    .dashboard .cr-room-visual-card{border:1px solid color-mix(in srgb,var(--cr-text) 18%,transparent);border-radius:16px;background:var(--cr-surface);color:var(--cr-text);overflow:hidden;align-self:start}
    .dashboard .cr-room-visual-card summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:9px;padding:17px 15px;min-height:58px}
    .dashboard .cr-room-visual-card summary::-webkit-details-marker{display:none}
    .dashboard .cr-room-visual-title{display:flex;align-items:center;gap:9px;flex:1;min-width:0}
    .dashboard .cr-room-visual-title strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--cr-text)!important}
    .dashboard .cr-room-visual-summary{font-size:11px;opacity:.8;white-space:nowrap;color:var(--cr-text)!important}
    .dashboard .cr-room-visual-card summary ha-icon{color:var(--cr-text)!important;--mdc-icon-size:19px}
    .dashboard .cr-room-visual-card[open] summary>ha-icon:last-child{transform:rotate(180deg)}
    .dashboard .cr-room-visual-fields{display:grid;gap:13px;padding:15px;border-top:1px solid color-mix(in srgb,var(--cr-text) 16%,transparent)}
    .dashboard .cr-room-visual-fields label{display:grid;gap:7px;font-size:12px;font-weight:650;color:var(--cr-text)!important}
    .dashboard .cr-room-visual-fields small{font-weight:400;color:var(--cr-text)!important;opacity:.75}
    .dashboard .cr-room-visual-fields input::placeholder{color:var(--cr-text)!important;opacity:.65!important}
    .dashboard .cr-room-visual-fields input,.dashboard .cr-room-visual-fields select{width:100%;box-sizing:border-box;padding:11px 12px;border-radius:10px}
    .dashboard .cr-room-visual-actions button,.dashboard .cr-theme-actions button{min-height:42px;border-radius:12px;padding:10px 19px;font-weight:650}
    .dashboard .cr-room-visual-actions button:last-child,.dashboard .cr-theme-actions button:last-child{background:var(--cr-neutral-button)!important;color:var(--cr-neutral-button-text)!important;border:1px solid var(--cr-neutral-button)!important}
    .dashboard .cr-room-visual-actions button:first-child,.dashboard .cr-theme-actions button:first-child{background:var(--cr-surface)!important;color:var(--cr-text)!important;border:1px solid color-mix(in srgb,var(--cr-text) 25%,transparent)!important}
    .dashboard .cr-theme-choice.chosen,.dashboard .cr-theme-style-list button.chosen{border-color:var(--cr-bg-text)!important;box-shadow:inset 0 0 0 1px var(--cr-bg-text)!important}
    .dashboard .cr-theme-choice.chosen>ha-icon,.dashboard .cr-theme-style-list button.chosen>ha-icon{color:var(--cr-text)!important}
    @media(max-width:640px){.dashboard .cr-room-visual-grid{grid-template-columns:1fr}.dashboard .cr-room-visual-summary{max-width:95px;overflow:hidden;text-overflow:ellipsis}}


    /* V17 — Curated ControlRoom Theme Atelier */
    .dashboard .cr-theme-studio-v17{padding-bottom:115px!important;max-width:1000px!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice{position:relative;min-width:0;text-align:left;transition:transform .18s ease,box-shadow .18s ease}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice:hover{transform:translateY(-3px)}
    .dashboard .cr-theme-current{display:flex;align-items:center;gap:16px;padding:14px;background:var(--cr-surface);border:1px solid color-mix(in srgb,var(--cr-text) 20%,transparent);border-radius:18px;color:var(--cr-text)}
    .dashboard .cr-theme-current-swatch{display:block;width:74px;height:62px;flex-shrink:0;border-radius:12px;border:1px solid color-mix(in srgb,var(--cr-text) 15%,transparent)}
    .dashboard .cr-theme-current>span:nth-child(2){display:flex;flex-direction:column;gap:4px;flex:1;min-width:0}
    .dashboard .cr-theme-current strong{font-size:18px!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-current small{font-size:11px;color:var(--cr-muted)!important}
    .dashboard .cr-theme-current ha-icon{color:var(--cr-text)!important}
    .dashboard .cr-theme-tools{display:grid;gap:12px}
    .dashboard .cr-theme-search{display:flex;align-items:center;gap:9px;background:var(--cr-surface);border:1px solid color-mix(in srgb,var(--cr-text) 22%,transparent);border-radius:13px;padding:10px 13px;color:var(--cr-text)}
    .dashboard .cr-theme-search input{border:0!important;outline:0!important;background:transparent!important;color:var(--cr-text)!important;flex:1;min-width:0;font:inherit}
    .dashboard .cr-theme-search input::placeholder{color:var(--cr-muted)!important}
    .dashboard .cr-theme-filters{display:flex;gap:8px;flex-wrap:wrap}
    .dashboard .cr-theme-filters button,.dashboard .cr-theme-pagination button{padding:9px 14px;border-radius:100px;border:1px solid color-mix(in srgb,var(--cr-text) 22%,transparent);background:var(--cr-surface);color:var(--cr-text);cursor:pointer}
    .dashboard .cr-theme-filters button.active{background:var(--cr-text)!important;color:var(--cr-bg)!important;border-color:var(--cr-text)!important}
    .dashboard .cr-theme-collection-heading{display:flex;align-items:baseline;justify-content:space-between;gap:12px;flex-wrap:wrap}
    .dashboard .cr-theme-collection-heading h3{margin:0}
    .dashboard .cr-theme-collection-heading span{font-size:12px;color:var(--cr-muted)}
    .dashboard .cr-theme-pagination{display:flex;align-items:center;justify-content:center;gap:18px;color:var(--cr-text)}
    .dashboard .cr-theme-pagination button:disabled{opacity:.35;cursor:default}
    .dashboard .cr-theme-studio-v17 .cr-theme-actions{position:fixed!important;bottom:0!important;right:0!important;left:0!important;width:100%!important;box-sizing:border-box!important;margin:0!important;padding:14px max(22px,env(safe-area-inset-right)) calc(14px + env(safe-area-inset-bottom))!important;border-radius:0!important;z-index:9999!important;background:var(--cr-surface)!important;box-shadow:0 -10px 38px rgba(0,0,0,.24)!important;align-items:center!important;backdrop-filter:blur(22px);border-top:1px solid color-mix(in srgb,var(--cr-text) 18%,transparent)!important}

    .dashboard .navigation-label{color:var(--cr-text)!important;opacity:.78!important;font-weight:800!important;letter-spacing:.18em!important;text-shadow:0 1px 2px color-mix(in srgb,var(--cr-bg) 30%,transparent)!important}
    .dashboard .cr-theme-studio-v17{padding-bottom:110px!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(auto-fill,minmax(150px,1fr))!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice{min-width:0}
    .dashboard .cr-theme-studio-v17 .cr-theme-choice strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
    .dashboard .cr-theme-action-caption{margin-right:auto;color:var(--cr-text);font-weight:700;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    /* V19: all settings save/discard actions use a full-viewport, always-visible footer. */
    .dashboard .settings-save-bar,
    .dashboard .cr-room-visual-actions,
    .dashboard .cr-theme-studio-v17 .cr-theme-actions{
      position:fixed!important;inset:auto 0 0 0!important;width:100%!important;
      max-width:none!important;min-width:0!important;box-sizing:border-box!important;
      margin:0!important;border-radius:0!important;z-index:9999!important;
      padding:12px max(16px,env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left))!important;
      background:var(--cr-surface)!important;border:0!important;
      border-top:1px solid color-mix(in srgb,var(--cr-text) 20%,transparent)!important;
      box-shadow:0 -12px 32px rgba(0,0,0,.22)!important;
      display:flex!important;align-items:center!important;justify-content:flex-end!important;
      gap:10px!important;flex-wrap:wrap!important;
    }
    .dashboard .settings-save-bar .settings-save-copy{margin-right:auto!important;flex:1 1 190px!important}
    .dashboard .settings-center:has(.settings-save-bar),
    .dashboard .settings-center:has(.cr-room-visual-actions),
    .dashboard .cr-theme-studio-v17{padding-bottom:130px!important}
    .dashboard .settings-center{width:100%!important;max-width:none!important;box-sizing:border-box!important}
    .dashboard .settings-center .welcome-settings{max-width:1080px!important;width:100%!important;box-sizing:border-box!important}
    @media(max-width:600px){
      .dashboard .settings-save-bar .settings-save-copy{flex-basis:100%!important}
      .dashboard .settings-save-bar .settings-cancel,.dashboard .settings-save-bar .settings-save{flex:1 1 120px!important}
      .dashboard .settings-center:has(.settings-save-bar){padding-bottom:175px!important}
    }
    @media(max-width:700px){.dashboard .cr-theme-studio-v17 .cr-theme-actions{left:0!important;width:100%!important;border-radius:16px 16px 0 0!important}.dashboard .cr-theme-action-caption{display:none}.dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
`;

  protected render() {
    return html`
      <div class=${`dashboard cr-theme-${this.crThemeStyle} ${this.crThemeIsLight() ? "cr-theme-light" : ""} ${""}`} style=${this.crThemeVars()}>
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
