

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

// V38: Approved original 3D diorama artwork, embedded for offline Home Assistant use.
const LIGHT_ROOM_DIORAMAS: Record<string,string> = {
  'badezimmer': 'data:image/webp;base64,UklGRoAeAABXRUJQVlA4IHQeAAAwtQCdASpYAgABPl0qk0ajqaajJnRZ+TALiWUHFOCvV3jZerFQ8A3FpVuzpgUHuy16dNxN5l/OF9In+P9QD+wdUH6DfTD/3j/vZQhxHCRw2gPHkcnWf97wKiHSZmr//9l696AW7DYI0Z4GMY2AWXUqvJv+xsGGLcsM/RrYyMMwhLU9F+RI1RMdPpD93F0DxT8iqIpbmGTQKuiwKE+WkC7P55RCg+ruV8A9LqQaMy9oKEMPYc+DtFjKk+p/BtgsYRj1/pgWAcYqbwm15YrrRISe+2Ja3PoOMWQBOGR0rbvfO+28tTRBuPhX8r5kRvHLdpuv0iJ7At/q/2/uNmvC8eXJR2TTgrT5XGnr3/uZVpHsOrosEZzM5TjTYLQcf1165A0NJEB4NP2roxUrOvSVNfe1s8pbcViFMlZY/gX0qb2YJpJ3afz9tXYSMG4JmeDbCHJQCn+dri8YyyILhkCaGGKJ1ue292upuRYyCLqUr7ld6H9VodM79XLPvtrtmi1q/avILPQJr1tl8NFQn/zjsdiv6ylR5G6/tmkF7qUfyT5rBaH7Ghbdu+pcyNI9IgY3j8rdPqVy5wAHDj2h/yTFOCLA7ro9BNqU6yNXmw+ntoXAW2eRlZ+9iMeoPss82wD0HU8BELRGXr+U/BcuDJI/K2BG7a8uf0nC3Nu25FELiL/wZkmNw3CgFwhbYzCxi1BPA+HOSSBz6FVWPFan6dHtoiayGvGZzdrlqonQogVPaO5ypyEXfj2H314m59rEr4fXqDm2oQ4lAaRes4SKioHu/fyf/8n987UtzUTO4MWI+qbjNkEaGsT89xJ8oKLBhTxWV84AvhIa5HQNduXTr17MFOfUD85h4QDzBbfhD4plEUoC7oqj1IByosxEhc6XuEKIP65IlKXWZbXyiJ2N6S6bIM4O+ivvqCQKaa/sh1Q2eUJ80yNcua58AO43pKu29nHoqVErQ3RMJADKpW2yXsIjqMwU/rb53XsE09++SV3UittbaMDyJ630gfuCP2rpqNg5ag9ylZ0H1EzfOAS/gp6T8J5Saln2H7XZ27u7vycZX/S9ecWlQALh0n3YLoWoudG9PNeuA+Pl6WYw8JdkGhZyVlg/dJ2DhZChcoRYkc+QDo6/dvGCRIMcZqFe63EgNPXlPg9c2eYyc0fAmRTPNpQ/D7un/sy2cThfLTApPNBUEMNBbCMuy7bqyoagqqpj83TKT198ARwwVRSb217UKw6nSyqDOvARNmbevd68qoUdnOeoCNKTNGE6QSrjleUzMKEEZtdMYLaYJoJEA8eovM+StloqZI9A83Ps24HhObklAimlO2SvcBh9Z35nsqaEG16k6FYiB8Gu6xZVcZGeTmNHjDhqwgP//wpzKF8fFgIxpgW59Z1Jmm4UqZG7iBgblDmo/ISTBN+4u63i2vz9uv0CpFpvOxojM/Nu/P6xWsydwD5xL4QSCgGZ8xOu8XLgf5hG9Dzj7zfRN9rs2pqPyXxPDEiQjMVfSW985EHlzf/1DJ8mYNIKQJuCyBtDOBPe0cPhnOt6Moi9LJjM7Ppf8V5p+fvsN4Y/LfyBDEK/ApNnnOlTwoqSyMYEvmolPL8bOf6Si/9IrYwqkUtgBud3qzrpHC7Nl4nSEOVBkSh5P4vzqTZyBMIiskwaLRn4+ShSN99YolLb+uSLeCkhd/qhdgNAT+35Zl5lPgwhEgdHu5EmkaDdJzntqzvky2IoUVvVZhMtLz77R+N05QdX9yEPQPTSauxkH0vhUtJmkr9opdinYQQ8AnS++TzjeyXeDCJstTKP0KRqTY3A1hNDQ6iUOtoxwolbzArk4yM5QwIXayp0xSXV0TReWQ41gY7MYPht5NxF517LzEsjnibQxXcEM3ntK77FxG7OfbvNS3DFWThl6S/aaqmIFXCh5O8G4o9aVAfIaV4hv8PUVzthUb7XlAYBlb6ieswA/vvgEeqclz4qViQE6TnNXgOsU24WiXZJ8zQaxNy7eosHGBIa/gwrj/xZZXsq+PF72R6Gys2V7AA43GF7/ilttQbeTMYB8ERFhL10PQSNoXqPpZ0TYq/q5svGtKWtju6IWG1gsCwciP1TB6/H7dXApRr0JLBfJkRWhYZR4GVrO4eKHDWwXCFXLigN6o+/3kPbhqFIHfhQrIdm0qMou6JoYHCOVygM4W7g2ft0P97vCsQ+Jx56psEy3a5phoejMNNbAvGV5WzLzlkXKbJtZkVM4JoJIVylPTMNCylxGUz0uadcBr3hw9HF1IGkym3CrtQ2lChkNj6ywcxQi+i39vuPY8r8ASQPMFi83kqhYpWl6/A0n3xkCsho9LTnNQ58Td2kVGJT5XMF6t4Trbi06H8vJ7Q3jSSvcxTyDczUWql9g9qb/RmvFGqrL39Aag7LY+pnOzYkY6ujGO+gQR5yr9lpsxMBGY6zZclRYoC0JAKV0FbyvxhKGMtmVwP8Zerh1cLxu8T6UEotgANZnoxFgJ9pKDsqOGoTW9y0HXtD0dAukb8ahfwbNtSL6nwZD5KKdFE05VZUjqW4NdljCRG4ggWezRORmNS4H7y+BjVzTQNRDaM8zgdncmmNeLTHf5Xrljt8crKaFxV3jqgIOsj5r74XcE2FDycy8b8LRZept9gPCnk2jG7tbIM2PzT+z3dxfkauL1AshHlDfMl9XjCBFcq33UWtb7Xh0Q6Ni7hkedMuJABzfWcQw0iUA7DkK94Fpn01HMV2xQcS5qc1+JMQSnJirTC1DzoZLShBhrQGPkEKpppSUreMfL0f1OrNWfLIOlJzFB152uxWPFC8CNxpunQyvE1jPEz5OpR4B0IZL5TWyy6Gr0BYXbXhutaw0DOgeJUWoz/xX6w/IGRhvShsxDCzT6DbzgeaOYVb2L7nsMB7DUBC7bg+t7lOoXknNMB9nUfvYzbq2ccC0vrdDg6GEtdRyr/Ja5QEe+zkuErKt5RjrGqQO2in109TFQ9h9lnzJQh6IcO1EdNFSx25ALyuiJSR/CsGQ487OudgFwPtgc2dbzYD5hYcyfe3vP2HvpZpBFNRzAMAT1fkzC1QBzSFrO2asbustsw3Nb63Z031Uwm8tpfIXtSx9UdDpG18z/fYuZgaWkWIwktSDrAPTvPEbteEF5z3UdHb1+MDRdmEPlqQqwE4wsc4yMhc1AoWWMWj+wpzqNBk6R+0co/GplpVDp7tY5C7MANBRY/GzbLlHGF8PvjikGeIgZM1HUshRv13cnGnYsh/417c/0wvaJiBzMRawdE9gGhDa9n3ug6/FLXGbtxEX+tmmLTNzNn1beG+XUSRW0ErpRSPB/41XJEO6rQ3oLv+xf1D2KJh4lCEU6TLoYTn9YnVdtWAH1mp/C0USDaRfU7T+B22TGlTqd1D0NWQAqiZQ04qmPYAcGL6i9zsoPpgqoX/7Q0fS1Y++9ByxyfjP77CET/aD5nKmZ/1I8GvsL9QmUrNmOIeBlwwwTM1/lquxnKVf9rmakuqHlN6UzAlvMmQFwqTNgfosHaJ/hLFD0OzH5jcDzDK/n9NYbxipObCIPcZJZjxVgqZRutYilryz5JjDIhBIMboTTeey+sbiYoLbjcJuBLGGFlZb5Z6J5/XlGtRZLg+NIKFt7FY6D1AJH3X7lpxx/sH8Wl3xObV6mjGAdSkLROiDm4176EX8EV0QUb9GtkThDrP5aSavN/CklJIIzyt4C15oqR9VVfZ70n1rQAov0y5OU3tl/h+ILBlyubXHIBEi3IstX+z75VMvADtl1VdwVyZJMNPmU7duMhE43v1qQFyRKykQzh3NlUglool+xnQQSadjCn5mgUfxOFVIuG6vJF4lV1sj7Kgwom9eR/u9m3u/RHR4+I7QIjdC+GmWf/VoSf8lfAsqXYgfMTDV46HlFjvhdQBT/U2ju3AH6Oj+AaQcBKaBJJdc2UgzuuNgIUSWH796Rc9q8fvhEL3K+kdJbEhCo9Lu2AAwk0hN1BcPlXuoMN28LuMWBsVwmn5piVGOIlxkWEdocBT/boPc3VVIu8jgKkCEiyowOqgXPOhbDWJoaOQPOF6+F9PjQuI5G4QsELJ0EXmY2sGGLTDSPf5+Eopw0w5hagnGGZw4q7UPD34bLZueDZMvawKSfFeujzXOXPv40T/+N0nwFeZ7OG8mh+9Khg26XxH55LIoIvv6bzZS1/kRBs//G1BE1HR1Ie6aTdSBqUnvsR9ZQ5MFBUvEXdnxo3S9UtQQw9J5vGvC9tcm7wXGjdFeqDC/jD2n7G1k7IVbxA9NfreEGNfpxJFMtyE6G5rMNsmkWliLHhMhZhNd+qvnbVzFdo8x+8nyNGCeLDnfMEuEMoGbPaeufpi9hZpSl2xTtTrliLqMD/lYXNEdyylWxkHOhn7Td6qVwXIO7AoIfGqnCgrANj0/ThTiwG6+K2dAsRM/ICZ6f9xcym0nVwDXTV98p4wKVl0MlkQyOz/lybv4zXDHNExvEJIg2K7gS9e1m0oOrl1Hg8BtCvKJfUrSdzVRqGnjgO06d1AeQzhySsQCGYUA57N6fPiAB+slol8J/yDRtAHiidNE/SQnSx166ltxmJ1psrS0zJm/v9QdjrZEEZTqclbv7v9xAf9bkMr4ZcLWXkmeaVqAwLj3jJLAt8CeYParUcT9Fyiyvx/MRuR8FWxBjag14ElTUHBNJD79WrZCeSCK71yefW0XNdH5WJ72+gnGaNCxZLKjkC0dPqnbdc+Ws8Myh8CPgcovgP4BgnNFiUPotYk+nhkX+kOPF5syKVqYgwQzbNDD2DCNgj4Ja8D7jJqAwxC3MqVW8Hro/5JYfV+FQfxZ8VcdGohCIz9dccwGdD4Ihk1zjlL6CRYDgIz/Q1dsDKAECqjfg+0M/eSN9iuQl5Yjsc1jNVvu9NIfDTiPEho7DG/sYLCrDioUdWgydoltdVY3j7NguKQ1Wix89Gbx103GhI2ynvQ8JLpEqIy0oKDB0OxOX3wXtleSgnKwBd9MfkXje6NvQ7zKIGXXvOLe6Osazlp4gco6WqzczyWvRoxy+5KtwoebGttsWXybU0lgVikfHJEs7HS6ONmf+w3pcjlh+5306ByIVns5/GeJ+GSW4nOIKxxIxvN5SfAlH4NYkdOCERLjC2t8UnMMhG7F9vB+VchpeI8Mik49dqcn93Z3NAGHKya8EmuvqvWQJOkJSzFEtoRTxBifSdbkNd6NJNO2Y/itzw/4UWazjCj20MokvmBFeIM57JIuNGf09N+VS0bBFXk4H1LboWwhBbIYS7zCfBQAskaqsbfS5ipahrmXhuzrN+Z3pPj3wodlQyQHT2/OlCZh+vA4LTVov/WJ95YdxiU10Os05olyyCXwS2XJjZbyWxxO/kQ9aeaeKrOgtQ8T6k/1SiM7KnVAUq0cXLvyG3/K/Q+w7MXRg07oSjbSPPkiZvwrHTgI6xIRTXBQUhhJbHlJ6YQzeEWS0vyreCXocHu/K4vYyEeUnjSs1qJqIMqMRAP1IqCSZjZLdV6clMo8Dg+bEbniSPOe/R140SjXOE9AWiirvZl1FdeapxMLFIWvLfXnuVnCh45kkHJlTHF6L8nBi967/IGIE9R7zb8e72y8WRrvAg8ACibjFYEyvC8GdoRwax8IUwuf1HtnlY109z+ZWlpweZ5IfpvFmNBUWihA9E6bJNfjdOwn53SBrm079ieckHq7OnXD3PfcvopxpDqom85u2UXRj1uNEwQZzNVanGyn58zoT3JguFtk/rWMmiEt9hoj927gBMXMd6zGpdY7GvKmrYpvkPfu6tE0eoNew6tp2dJeBmQQx61ElaVDGjd0NgwWdcRASCa1VwgF4jOuPXZ95d3HfjWm3yDiiz1twAy+A3pMrcfYHdRbuL+cPzywsI9RY4n90+COCBwcVzhvDb+JRTjnRCVizurZatZMufPbVwTF37FFBYPQhYOnXVCpNUMfxtW+FQkZ/oJ6Oxoe5EI9dsr3RZGSjV17ZsZXl5qvzvdGTxtr7PiHuu+CLYVHnIRTsTeLnVF/MlxT5bhTWApMcEEKR4azuHL19hhSzxb61ULGlb0JYADEJsAX0IRyCcr5e/Yu95KFdaqZPC+YAcxxHZRYTJGBVLKlQLgn5qHFKWIZFGEGmdG3ZlWWTrFCfzlprWa9pB/bgU0bA2DaWd/pbEvsTDsgHR8A8TsLXfNnFEvoVhx+71TCObSQ4vZeuU3+EfMFyuUSa/xo5/5sxmFVK4NoInUgCAgJDfbgPmdUfWUIed9idYlpr1HNRIiPuKSQTqHdekTGXbNRhtnYqIjpazEmAtWLqDSm5hIKdqnEe6xM7Lhhao2gWC7zH6oBWo9ee+yv4Nd1yOPGkBrhc6m3/NMH7mmK7vqz0DLrqS28AEepMOgayWrT/M7k3j19SlSNDIiMUjwu5xzUjGAY3LD7PL/rHskL/qws/UWwvx4BFduI5ZziR5mVzSnPb5uSCsMVM5oLTIa9/jtWkAxxDMd7AJJeXgz7dL30jSXlR+Gzd+tW9motZuSdQKYpNdJ0TwXWq5NexVOks5Yn1nD6dJY+UQIcXaV4MuQjdS6dOMjhgOifVSATezEYWo9XoUcmuLBIYKJHSZhId13XBiviD5Kj/vLALfoEMlkGkKVxr3RTd7L+gCqt/OnJa2j6oZ4BcYgTz2LHZo5OTU/tHICo/R3FYsTqlEdQ0GtKB5Fj90KhTFgXdbXy9TcGw8cHW+HdLKbwRHyzvTJmaG2d0rvt9KO5ZdD5dnUO0kt9yGpe1Sskr0NK2kzj4qPr39nC27036AkVsvxdSl/wu7q6Nw2NukIALcS6Id3WfUvTW3+coClNNatuDU3NhC+A6+olHh+D30fxrFW8hQVXuFz3lI8jcZY00JdlzZYYZAaRV7I3sxqolKGZMZsUzsQdSIG9PJy3K5fYln4vlMK0Jlu0Gn48yNIfr/0UpBGW5iITp3Y8NwuFq2CnTUhPyPj6q01TDaXt7qj8TcuwUs/B2AWgHFstUH4E1dBSSlGAQLVNTY4/AOh33bP5wUoWnrX2IZiz3iitQwyrwGYxIBPeXnd3xxLc53GMDbjt65RM87W9N2jWtxu4QySiEAH/tIdl/z3aDr8tXNfma70m13x2skzX8g9yQptIrZ7oIwMt52va69ixma4E5yS2QUgWQTY/ylKSUlKfyBHcQO1LBIPhy/F6AfNGXXOeDmdvEX/dNAHfPid13Gm+6HrHR0PgEx+SqmLb9+B1uzJZWMvov1qm4lTlZDdOIQh3qzXbpjkpW1J9F9ABUn4a0YtsFsyZbYcNxTuq6QLwpdTdZNm1pWnmhTiNfx3Ft1CG6dTefIv1PRAFbaxGx6APyWnBiUoKwkCQr2/MvzNdhK/JqzvHM6b7wzFBozVItt4G65uuZt/v9v+Pan9lZrLekvMg3UV677LRjUdG5rAvhEfyy+fGStYRfjMIf6tZGpRMiaXnRKn4Bv/lL3HzND/dc2g5l2cHhKISOTNyVT7wqs9t8B08EXVKeMFpb1Qd/zvUQtve1wnNt2XYl2J110nHEurqUqX2h1CPVxCGH5Vbo8Or8a6gu6QeNX39iTbAzycrYD6SItAdVdnEt5oxdAulkgQmYUJj6lXOTn/NZlwPp+zBjNJs78m5GNO+agY9aIGqrZKsH4zv0GhNNSdIHBtBu72J7OPe7iV7uaNEOVIZaPKcf1RQbfpLCjRCDWla1EoOdQzrrwf7u8Kl2u6qgJFQqSJjPzh249dvYqD6Vmjg510bIvxjA1ocDhZWkuiBKj/jSra/PLN8QGTZWbpmVkjZh8jXcbNCFb//+28wpGpE99wOyxKtHwFTngY75SIEPCuxug2mpiPJLZdzElxHx6ZvuMDsQMNPwHh5f8/aEYqgCtHCn+5pAWDb0gjj6f/ChDb29pKus6x7G3leBXY6VEb+shueF+5M4yfLHYMBCVbS10DhdsIxVmcsjLlm8j5hTig6FIs9Fr092sZCAsxAlsAHfu9QNNT46K6x9GccGuwxYdBe2G3WyVh5zvLM9bpji0yy4jIxJyjGJfsvaI5OiicKg62eFmIUJm3HJx8g3TZ90MLmdKP2KvKQLiq02HedmcMQCfpGcDRoF9fjEocK7uynKbDDuCMVd09sk0wxpU1LB4GBBvCRmnUpgbGC2ctOI2/Zewjs6rceLNiUQ8OkVaKCpsl2uQ00Tu1fE9MYoMGlxyoYHhCUjava+JjaUZYafRolsisIrjxtl8lXp7O8uKSFDCALE9V2vqr5XSh/cr6bDJmebnKbaMo8rPpOOFt2jXfDqb8NroTiZsXifV3OlczTZnvbbDjMBW97e1e3143na8UxGcu33kN29nXbpg6/iFDP0Spmnt+cfHobUYEzP2gLZ79wy25R9K3FZyMs13kEfWgo5hwR+nbSVDoTrVkRdw5Em8KdcfBjZcKUIEYSyx/gjljI8meFe/Q5Jc53z6g+/9aG0GGYFMrpuMj3Z8GnrbRXukn0xTQcd07oUTRrh3uBoc/BkQymr4aADpn/Pqn5N0QW4ATZE6v57t6hLquFyySaZln0Zdp8LQ4W2eUmz/WkuqO0iXXtTakwgwyxGKgpmCS3WDL2FqpDAcNs6Ixr5WgfEy6Fzbil1KX1UHe5G4LzVBN7K3/fSGpyXxtVPTTzqg2OThgaoae1cFjaydx2poGoFjPGJoBS9qaHPFolCufD8tBBKj0yBnY4iXqGaW8OsLllw8wLN3fME43SxrA+HcBdsJlZFbg2AqRBwsXtqMpNM2m4cxgOa+tEa1BjCC+gJEy6atDU/ac3MFKCfGw/EcYYbUk1GOb1KbOVQZ+n1YGs96YaVdUjCMA+Exu+oT3G0ROzPaYvIcX7fbHlWsUIoq92pKZV2tXX6sTzrXx8B8gS8JkSm592Lj9RVePl1inFP/36pRJ2kQrLZKRddyrYi6BC0mo0QABy3hvpFuqqfis6yScYg4SPfbyKCu2CxyB6EpnGvWhn6Y3+/Joc/qIc1Ez2EmpfsDfxRZsfgU2R5GuNDGr1+95RrQG49elRthq1hQT++aXdiS1hwje9ycsiBz3YtGuGS/F6Xyf6ZDHXBaUK27bS5rp4OwVzcp/EzCiDDgRTuLrN4tgYFoUod4bqpU5fOM6mGOgCGrZd+PVeHNnn54b7OGRKDy7lD+ibgevCrvuM2ZzvMskCx8YE9FhsK858X1MAU2R28YQqlRNB52VmAZzUjN6m2WbcbTy+nc3RFfie36OyHvBlfBNgKDRDU64Dg+xM4+1fvTqbVryfun3DIyijYGi8WF7KqbIfA74Ms486bktTw1WVofSPgBLCyCK4DbhOk47Qo4CCb8iwoKivhiI5vdGophlRrrQBSQ1SKLciyOTOm50CJuuMf4SUvoL/QfjCOIoZgf5fABk73yaefSehUthP06hZSry6zL5O/5iRT1HPxG1hxu5SZTOHEx+6dPb++jxNlDxUf8CsS+ugnovB+7luq3vsDQ+4PEMrNgIFsHLRasPBbow8BgN4zK5cAVWqROHfqSop6U1Zhv4CKHlLeYmmgMqKyeygwmV8xgyX6sYz9NYyfVPBYfeDgr2F/t6jqX7nXgwwqHg/7mZAGOqtdoer2HMkKFZ0Q5gj/bvcfd1j1afrVEGJDX33fecqnmtwc9NytVZXxzgObFsjhtCCVxVzg1Se+jtUKEfXBG/NvE1h9DI6XIslp+tyuCZ3qzJrkCybQDaRWkF+7hLcbhrzgoLmOrMbno/bsmwx2JAZfMnbptQkB9R+gx21o+hHaQgT6o6wktpLQy/g9unFirzn2IrRK6AyQhKIEuCH4c3v0TMZsfErEeKTQ5WwwiDUlxF+2O2ofjTlrGnQ1evjxo59J2J/CKLsj3a5mGVqaXKgjKvdla/AFnD6Q/1vwnOa6EiS3ev0GLaMRyqLyCDhGCh6/p1OdJUhYi6oD/alZgLLifVc9Z8HoWWEkPycvUkNqVrT4ndRWyUvR0aj2GnWoXvPxge5IXzjqZVtIWfA62Ihvez7ik97i1xmAg4ssm1LB5sUmx7eleS0FwstnkiVvfkUsNZWwq42QC/eb8COEdgaO5L8icQzz23mGPS/1r8nCb/Vt9u0FNKRm1OisoVrsFs4XTEfEGD+CLei+eKP5q7qzqZeYRJELydEACHMemXfoFJTWhXr5MVndpcKC9ZC+N/eAFOhzBD97Uw6IawqwaAZTtM1bwyV5rYAJ24oUW5F8XousyiqlLTOLX0gK4Q1i9obkzUTvQbiaBmOWHRIfXtzyJNp38G72upp3c61q+erqwYnBSZziCWkSsvKlIgsVAFwUTXtIK2CFdzGxeZpRaq0z5akn9RPYxLWqTYhs/E0A8ro13mp10/h+En40t+IT3W0tKgTrQQO5lqxyCJzjtqF4ydWUjor4KwcxY5CPEUkHLoE1CWDX3Y4fR0TqiPn0QQ1U74b2KrdNcYBbos541D7AAAAA==',
  'kuche': 'data:image/webp;base64,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',
  'schlafzimmer': 'data:image/webp;base64,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',
  'wohnzimmer': 'data:image/webp;base64,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',
  'esszimmer': 'data:image/webp;base64,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',
  'flur': 'data:image/webp;base64,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',
  'balkon': 'data:image/webp;base64,UklGRhAnAABXRUJQVlA4IAQnAAAw8wCdASpYAgABPl0qkUWjoqIUOW3IOAXEsbc1+JeEZv3n4Vz13H1W+GUj/HPjGG/37yXXzf+r63P65/qfYZ/s/9x6en+A9Cf7Zerx/2f209+/939RD++dU56TnTJ/13/zemg+GduOk47unoWO0kMTspEOyp2taCu07PpBUe66E3bmVuNqQM0iCHiBMV6dk0sbUS49452eyWebLH5I+3jcyp1qKp1qg61qIfKDrNGa3tgv5sqQ53nRsfBUJ6T/wfM1kQ333BSiZ8tVN3Fp/B+jHHWTy58TOjp89H9sdvbg3RtHj+PXvmDUW8Q6KxMKg1YfbennCP1Jv46iqmUzMX74Ob64fVISeIPDtjCxJol6bTjqbvYuDP6Zt5Ld58ViNk1xZA2u6XD1puxAVcc767pmAj7dGfN1o0T26daSy/JXhOjcIAkhY9yX/AIKRAJTKkRs/w1jxxvM0Mz3NSIxverYwhkD3ykjM6C6mP9yyYUbzEGUJG9clguOe6YTlUS6NJSDDH+tOhaVKpYxOrT+iEmMYXz+MzqLv4d+kTB3i+VxTgZIKALzHcEqvWQ+GNXxtFfMTC4HNOfZvSnAy5ZojwNuWktZuuCd+kn6haODASM0/s4AG//0kF5w8rZvT2/SnUZlmcn5sFgaJxe+mcw/kvrOcpuc1GMiP7NrrLFkQWJLsz9Y3KZvwldnQ4lT5GITy8MS6S/+Gis4GgeimQVEaApp3jqwK8CbcZgkvdvDuQza+m2XKZQ4xfGhFPqo7i2yvoxLhtmk46aBEYAO/YEJde8pjllET6HcuW8d+if+sTdfDhqiZgi1+Foz4XoAzkNPB1zAYs3+O5qapPI6+vglV1o0cNDmH0q8Zh545zSMByyeyIGViQ9mL5KG97Ti85EFe/61CQ5+5KCgmbGfgHERuLP7n/rYyWpZSrIjcBR5HHyf/xOnqi5Saf2GX0OaISf4WLF1a7L8aIcayX0liJrgRmsEHt1CSJIQsK2phqDLDZuKsR83u6uVxG0aSrW6PpbvMyusKM1Iq/6h5nSvcPubNLKysCqeYGHWQlovyNSMAn2GTTjPR6XKWdth96eLHytZ0tguvnn9vznVFaWmkFhGU7L/grjU7HIx2c/xgEJZZCXtPOdWh/Z+UPk/uN+xmg2A6uaCOhAfLlk3OL2/tCsGFlO7tYRVd9o4lEg06qMW9IAs5iBE4Xvmj45O50JgrXfT/wxZc5/yvaIq+BTnhzet01ZI/mIkez0aBznxEm0cm5BgaeQqJdU7+gWM56E8254emRHbWCfB+93wOJjBeT4zu03kkTZOgy3evivCPy/+b+4I3bhkERi7CIcPAMWIu56HK8LAT4IYGR66UNstMvN502ROQm1W8NX9zJVBEMFIyAtVsC+aIB6aLTDpthewnITzzuwEPiWg0uZWZE294DgghXlAk46YYOk3Az7t/daqQXhOFnhs2zWzLODLQX63nln0T2A9wLHgvljNEoXBDimwsRHW9FUqzVXmcNYRIhXNc5BgvblykZdtRCDIJIwt8EKR2TQbKWQxMZJJGk/EqdrZ9Yk4Up7v8ucLS44vsaQpYfcdiMddar7B+ZXQLyqmgG33okQZ9+x4Qqpr0m37nE3kWV3Z/c/7DZC/9kS3TrxuBRMgqB58bO58Ra9WCVLxKZfX66Lw8VzQ1p+HLdZyvDab8oCl4IMqNXrDpK4SsHQoSDR139MlKulBtXQI3RPGZHfe1bdLcc62BVbN12dFhqURKZAAEqNn0Sg/Y64Y0SjdfKTaQN+7k6mxRdlDbQnGniWZLlcCsAsAKkjjMcLQEoTylRUGROqEeySU/PICWlLPRBQVWoRIS0j5L+BEg3RrbGHMBpJyD5J4DM6GfdZfDH1dUuX/0nLiWmenueiicZxlQe+zBQV9z42ng1H6tJ7hK8SSl2+FstjBZSbq1G0HBRf3rdg1h7e1s8HpWVrIfEdvwEJfuyrCjV8xTPubr+tOLvJz6EeOlgKiGyBcnfiV2yD5MwTCw2fefBB8O682g73RDgbHsKRTz11+7xDsEbi/P0YAq3Mg+7YLlErgPFcG/ERgmoY4dcTOdjDWbP8QHQ5HO5oO4f+UcbQ8gnMggcrv9an6XXEX/AjWHdO2dm6a6ZGkebBZdGnmnI/W4Ag3PB9yswICSNXp2y5jDql7S65T5hyoinbJsIvJeTv6QU8ehow5/6us/Sn3h6V+SdzXkeQT38I1zdIx8cUDlEdKO/EA5lwedLFx3ieMXiKGvgpRqEZ7AiubI9h6FZvsHv/0p8Wubb0MBSpI51iUZixc2jtDC7WYHG5KP6WoQdViDyyCSGqezoO1fNvhBWx1E1/TO2kV7cLk37s5Qjd7e5SCaRq6wnzPBXimpMIECr9HAnO0C8gY26FfoWSfnqYOKQ8Ma0s1FuFIU1huTPtfkyOGQvDicfwKDdlIAiqCJACUWx/t3xmi3TOYmGxWrhWFgmYJLchagtA1t3YrRIizJkHWZEAjRlqfJAWge6rrpCPT872icqRFAstPTZ/M0G86bWSZcn11DqlrBd0sQKKJP+2AeJyKNA7wZuWIhgAv78LyeEU66L/sxrnHp4NrUOOPAx3AdRecWurWtStAAP78dYKPyxxLFIyMIvfBqWKHBOhVZRxSobD8C2ReC22n23fqWpedjz4GDRga3GcejMKhghhPvlAMhPaI7dpPLJPGFfU1CDgLdtwrcsAjiolT8GzaEOThfYcHbpRd/gBIu0fHBi5sX8xYEuMa8AcTVA5ezMsF32wIrXIQutFjVzwFpgX6jfNm0wNPChWSCZN9AIh32DwtJLJ29qHhVMJyWQXBsM27zfmQHWfpz956iswdM/auLcJsU2dOqenawPdjPkIKfS7Ket8tP4RN2atlhoihwz7zBVmb5xlFL9S5rvHWfwi+qX4RgCtPn63oc/Sm168GrcXISNfqu+nPUjj4odLVsY4ZEr5mrziE+dtwvWmZGURtpd6zfhu+GSfQE6RRJzBphlvICMsb3NgAhU+bXdI4M4dZdfc1+J5YF+Z3H6c1HqzbZOEuY/SlRjAw0ZF3k+B9kCNPaInyBF78tWr8YCIAxQnaphABttPNmTdWbdTT9K0edQ+yZNLT6YBtxwC7Rrbhvo7zeNzoJDPS6cY/T/vcyboab9I3vUDVP5PQ3/8xRHI50+hlIdmmuFmuTMER3WAYn564dRbfO4p9pkALBWcntRTFL1cc4qJqKNiKTd2ssi7zb7kQ6szUTndpRaqn7yyuSjGJYyB93zEEMhbgs4ckwT3xfm+ntV7NSkRul+YqQUFkFUvtp+0zHlP+ipR9lpZXPJeYrVTgo1Zotiopr8ZZgPNgJg8bvO13opkOXdynao/tJW4KJfGMOBHwS0yysewm11AtRrfsTVr8dqX4mVu4mI+qkcNZuEoQd0GT8K73ypxWYyQgjuHjR96PYdz7RaascMCUyrb5i/oKWyUgnNe6y9N136zVPatljpIO1Y2YgcGbMLjAGNC01/AAAAB1ja2Q7jmgo9DpNPTe4QHN2VFoZQ+rbo9d1+KZU9AD8pEo/cJ/rqCbViV+ao3AI5SaZphp49oLWWTy/F3I+Ga1RHyV6YIby1WoZ8X5aQxx8EThPI4nU4RJkBGQcOj2A8gjZwQjGh07pmxy3Ck5eYOgUq81/8y936zc613mNWdDmcEK3SkvzbJUqRO5cArXlZRLr/QLBJM+0XTzZa7AlsqNl4t4TYvXmgsyOYLzhB2BYOBBxmZlUkpmcD52/f4uByQG62n1+6FRVyUart2fqlCr3UJdtfb5ThkAwroxb0HzbWPdHInsfGs7lDZqOz8gpfufc0FFrbczWVM2fy2vpIsG3UDIIAQAIhWZV6wmTcmwnPc2oXtJTjKOCGH+RgAuLpVEWoLwLWVzoTF4v7yXzsgQcngDo2W/axtH/dPTEn14k0zvHjtkIiSFdaQc2PxYwAcAuhGK8gDAx6TzNaSJ+jpBR2Fuzs3jqjUor6db8YAOtNEggW/SsQdkl/pjCXz6g0oe8ZIdTW4S+ueLIDmLSZR8H+ACjfTaf/Df49JVRxy6LO7wH0FjiSgcqQ2oX93AO2mpOGh3mZMYkXj4snr+rf16JfPZbgWzOcJAB54VQRp8G5pT5YP6obiwE2ah8y4rJBGrZY0WbKKPijnK2c6DI08734iteIhDEdIXzjFmpJ8H4Pn6TtmATnCbC6JoTmmR4sLpD04xGkxt83Cr9hqJIHqnYvWC/nIVwFg2Tr5sC+3ZGlBz3VF1re4wdJzhEzjlgMa79PKkU7GPTLK+1v3bqYXw74MLzGJ3ImoHapMliD7UqrZa4caudwFpw87cc0rZ2HuF3w3npe19UzGhM1vtFZQApIeKgk0besBaO7qA6T2kv43C0Hsi9fmvb5aihNqRZGFwbe49hsMu6cFvHwKvu4sTEC2M6Utje2iVNa/d7ebBmJirLXYdCXzSftgLjhulPJ88XucJbuS+IjEzjEaBWTL92mhxdKYsaxytaXvWx/+qnz1iwDzHE7Tl9U6kl5Hnwtal4ebZTqry/YWYdD9jyjkkUdlFzQiAWTlpGnqvkN6FbxPgIz+i0ThZmMNRwCT9O7Zf14LF0fwdV6fixcIfHYa7KsSnov3gL3paFf/UjD+TlFTe7tOOkHk1o7m0czNtJ/VfSbadYMDWmJYfe3irhOc/E9IDZoy7vXi8A4EiJEbrgw+aj+5DKN66jcGj4ouit5joJbj1lWVVPbHd8xaTAJSKBfpLEYaV6FHfkJkTwPI2JHjjo5RPu31E0n0O5rgpWrCo5ryG6t44oQ2NmZ8mjcIG+dIkKYSRGO1t0jDDxg1BrAcxG6t0nMsVovgDsK3xL4vFzQv9TdMGgP/3ekVbTnbHRpiViaISMDpBsOZTsg8WJ0rXIHWspvrUaeFrAhSm/w/oq4Vnzn5cAltUXx7J5mr1oUW9F8Km+fSVG2/OHPrW2znzS4sBbvGTakDRUBk6H0Hk2UG+EdiYEHmos5MAsKLuC6q7GH/xvh03PeuCBobj+0eBDUbS/HfQZoCNczxCKELln26MTQqC7oOpLXAgf7VswymmcU3soU5ZM60xAHo7xSlqtHymYHXnTHQU98QarJe2/Ah64SAFdUVD8W2pKojixIZXu5nAbC9P1J4kGAaAyED7TCEuPYsWzBwID321Bh76hH1dexwXh4558VQaATDVoQ4HNcDwEMKvsB6r0cPt9keoDAQ71RH/dNGj1039E2/YQcazY3Dd3vWhIPHj8MfBORYOwMUQeNpMCSZvApBzHG/5XXC0wEwm78wCmixhp21L3SUPHi3cyvVO6oiNOp5j/3//O5NRPc6n1n6dPf9lIU4Tv8b5A43ghxq7jOBYjWEkrMhXDphvhuUFAFwmchduBjP6I2DF50AHG/PqmIXw8v20NCOpCMxZxc4OhCck49JHaSAg9hTQVyzAQ/zleQ7qvZI1sC1h74tPiyCwohKtsMvBCuFH84C9LK/Z+RgvNuQckO5vYKPWbyNsls/Hg7aWQxSaazHUDc7rGlHeuXWMxq+/6vg+JF5XAToXtro1hxGAJqkJKhWsxAO9j7tK5GYsgY8F8T45DbZu9XbPptB0uDd8sV5mJ0/WIBjOxL78Zr/lF1arO1enJecFpak5M5ecTBjflyRn3aLA1hjCrbGLSxXLWmHhiusdELXQvQuyPvKSAFsZa3M+4/IWoVxbkjNtvoQ8xwVB0grVwwghyfwqR+v1xGrtniCudjnIAs7gRREmOCdbhF3XmsAY9npjwtuBKgZO+Yye7OpAm/V/01Bx6hCB+AB5dlBqvkYQAwqh33PWZEuKJIwLQflImquCkN+v4GUB8/4rquMsFzhv/t+OLl+5e3c0M9ZP+w6gDURtVTqE9xp2dUA1JK72rGgQx+iHUnFVykNdBww1Jf0mDt+rUSb7cR+YwFMTF5QDnUIXUUvk3I9CmIj+T+C0QciAbgdQlDw0XMF28klLIMvFRgjyqiKkAVnZzL8CzDm01zP//7+PnQ3M4hyIV0OXkS1yl/S9fbsfcgYVEtOJgLLrRmXihqLM7DDPo+F1AInzoIUXGQt6uuLpwYfIRwbYSws5nYXptQTmdYkYce5qiJKRiRExFiwZa4+916dvllEFJVvvCoCfrjWw9nHboQyDkY+vSD4nKTlzo9O8m0Mw19NckOj4JM+BadSpFZ+EjteRkB7adM/p/nLq/ITnJNtIMTiAdAKEVLGH4SOW+/9jfGqF/1ybN7/Zs/q7s/n1VLZBsjzlvICrfkudT76fII6AI1J/OscVfi+VpQ2/WHYViMibOty2QcbzcN5HnLDgG/yRQ2qSaKPlET41fM+EB0TjQHzJC44k7rvtrsyNtd0PfScHRhY0DuNbNM61hWPFGvMTwy5BskEox11bU4EURALVvpp7xMBEyMixYYJfvvxjHinwZTgtloND32EniG1F6VwartANd6g/5z7boQfgUq7C4ThzOwtIaQzB5ABhbGrAEZvLLOVCQCZm8t2jZzaTt9rcyItMofEpFlXx4cSjA1y6dVkH6mDifh66vWbVkywALsqPSDNUCVP0lvAPLmVq7alpGaIpzJRCfJFv1Mq2wvnXR8sqEYK3EQ++A6glQTMF0lFnuStn26stMif51zmHK0pqIO634sCtcHt8v9xX+Z4gQDMLFEnwq6d2ht9bTXJVZE5F1KeeY4gmfM6yr+Qu3Ay9tXnxaaSL3uJdzKb/SSsdxn/XUktABn7RkxQ0qO1TQSupux2+jMxFTc7a3XPgOXcnWEaDYZwwr0paAGvbcxfrT5yCTmVxKZfhz9MCxLrCXFE8thDJmgYtbPRImzAjzNeh9z1On2P95wPtvUI5FPFyCdDHGw3UQyPyzMcZYp0BXQfv3SPY1yR9U67RDMty9+ck2R7+4R1hjvOfHyI7DDvKrymKuStmF6RKDdx06gNqlz+KzeGfdv9f9qeTK3yzjggLb+0y0id7GnWJawWZdGe6ygLVCIPTCZ+bP35P831UtKC7CnuMo7CN/5Zr91XCDVnVwwc2Us4JKudvVS0HqoqETSBCA7466Giv1758NPB7XotehqD38yIUWD136sVoZZ8MZupu0QewI9j0i7dV4dLgkAqGwAdxoEyNLfx0hj5ZjflYoEzXnXkWcoHGQyI6B+ueUVF/6C6uoup5VwVLSfOEhQyJPTT5Fcvj/qzz6SMWP80Uwh9gIPffXB5djXR3pJ7NyZTh1teCzvgjlcwatm+hE2zHIHK420kx3dIhp7O2A0w0hwuXVOGgj29AZCWTv0YJsYv3mP0kXbTB3NqZ826BUMLb1OMbGdynMJDsM+5Ci4dpIMNsfAb09TsaFykKQ7yM279C9GTThlt1pM74KggA1waYmhADbR83XBL3yndaE4isW3QVplvLi7NRUF4TRa/HfiZQ2PXGyuiKIoTPM+2qgCviOw/1zW+p8bIK2L20/K5vlRR/XFiLu7l3w4A1CpELEAnjS1JzMSiiBZvhKPlzu9MTsAG+tSkgM+2JBA1ui1SVcvfOo8egQzsO2ND7dBgQC566MOqG1OZnjhrMsOyogng/RY8f73jy0EiURVig/sr/PLKWY8UdtzfY9DU2d1OcY6vPYok1q1HCRDwvtf40o72JItJ/dbZB+p5b0IeYv8bKj6cuYBwAY5JQVBgy/sJof7sswz4xRFWoRDcQJJNR0udq8QlckHB7cex3PkFk32nDhm64z+fIyhNLA2w8bdri5UehdUOk3JWIG6D2j5LeOSWG86RjHxmDAslruJxajEl+ZUYkRnh4vZ+LbFhN+qVXiQWZX1cYjsdkS4diO2CPtBKlyHyuk6h1mAG1Zq0HaAsRplSS9nbeXKJx9ECyoDWKYFr/sxNRqXIfLEGI0ovK/1f7xLdqhedITDBGZNsmyyVDWeEEG0bIYrv8MWdlVLXgZwyn5NeDkXgAihw3nGBdK3nwg6xGBGgnjf3UFCFLlnv5M+ghpOOkq6E3ILTLmUWldLbPzsRbJooNe5B3K1ilFhW1LFp6f1xBuvm7Wq2MDHiwZkvCzc0Y0NWEmXxGAnt6m0mYUxZGtDehs/AkVlimU2cpW/ctJSavnRWqGYASa6cqW9J2oWeLU1H9cDSDYhCTgicCVFY1FPXdg+l0wIYWpmuPyc22BdwzGPi6L+elN6pQHDugHgv8KGYqje1rDChWd5RianM26sPVh1UkQS+hLT9gEFTZDF3aKiNyEnM2l/8fSlQL8/df3w3VbJtaW8j7LPWZeF+JUW7z/+wmZbBcRWJ38lMEPt1yUQY/6qJuA7gBV1ARODZXzegOp61ivb66QrFWsCtfD13D9XwuMRJnapMwNNyF5pN9paCGzaPECRmvobso/nZPrLVB6P7J2RSu2nKS9OOgrTqtf+hzCLxqiHqux6avprGQzChjBG0V0Nu0R1dP/eaxlKcF1TD7l/MkypdRWGSTaDEzvFIwY1e1jy4w+iK4ngjUsYiRmNvuziPL65U2IUt02InldTRXE5byx0HzjhgFgFJy/WCdzsq2yBui3NlUEjZsXn7X9+9YvSLfoG3tdDvAdMKP+vvhWEc96xmjgvMc8YqPYVLKmpNMM1VfISimPGh3OFcmMZRUcvOjCa9CJ5cVOzbVaG69jsoO2uZy28reFrVU4KFdHPXOqaqz46XxGpSoSE9uoTw9FPPAOkFYBjT8DUdUFIMLxooWzo2fHLA2aLnYP/yVrtqcGv+WnRrEsFM+JukMy9kgcShOCOZcYaW80dmT+NQ17nB4HD/m0KgxqjhLQWI/bQeY53OsHgWj7H6mVbGjArY57sFikW587UcxJ1G82fPPStC6B/oc6imPL8emJQ3xuCEAseagDSLBDhNfksDFuB5+NwP8m3O6VDonWUkYXD3huwdUDJxcAQPCImUfJRZWl0dpvvwrQObRbA2tJIHu+qHVuAWbXwue88QU3WyOejeLn1FDbY8qQH4+iiYLY7nZgA6bB2YkvQ2143yw+TGhlOIZDAH7R0Qg7Dj88YBVdjzT/Q/WydVZZQvav8vYnZb1wEfwD1SoVZOkjU/PRTrHWbnNOPCOMyorXlXVW8yrvJoRaBHpAQ6A/eteXLiFcBDM3Zld8PmC3OXnW7AlymCSwM+4SLV5DrU2LdK+hSPdpl0e+lUvHWqiHRMWfzlow9OPMSwwwmtnFKil57coM6X6dcmpl0z7OtLlQQwT4UxTNQPxarE3DYumUOOd9brgKgatdUwj4hAvOKew1mne3g2ghdTk1T+lZZffxOqQ07I66w6JFi+nmLtgw9PwkVeoSuVLR5OnqaFn7vcQGelLLG+Rj3eqZnyCAwvUwqpaQNIZxpw6SrjXkUDFLffqhQSQ01zPf8dtYLjFZgbbfthREGaVMH87MQph0p1S6MCyhBl7jTnaTjl0ATCS3e9yO9ffIDOj6uMiV7rjWRLOpY7xe3hJHoQu+NDKiHiLVs+fGaYb95yPZl01kK/fa+kbZUkSl3Em3B5xKJtx/vOu5T4w4TmrE+wJupaaRFID0A+BUevvLgXwHxIB9kWYKMUlwk3WOncyPSt7biBSOMk4Y7Y1r/dS5tXJ5GEuYxG4stkN3CpOP+o7rt+D6bkGy9y1+NFq3AxC7oUP7t4pWIE7lnViTp3HGZm3rBdQXbX9Tia75ZMWWsUJOBt7IafBZFNBx2M6UMJuHVA+4jIoMlZgPr4GjFtqVGD2wRZJKRfqg2pIlxjqBDik3QDNCWdWx7oCamEVhcEtmYoG1DxEXwNVdPQFPN+TMD+pWd408sKFhpq5bRwm+K1AHbXr/70Vxyj9ok2x7exs60fMGS1buimDnhYcXanP3PM/PyB2SPcGpSTgvqGrwFEga804ZKX8jcE1grxHy636xrSKMpIzge3PEXiv/8b2fWMywV57jkLITrFkZfZc8/pyp+d+IrxA0gy/dcIrUeXzg4ckbT7IPwPxX1Bu1aXEkRsbwjRqFfPXjsJYBjvdlYD5ZciSm7uonJXR61G/S3WqbasQRQMYF36yoYrpzQ+nYs0mjmXSrmbP+vZ+fV3z5qNuBpRkmlxqQuQ+aJzEUbfDx95C+dlrKFvvrNwIR2cAkqUxCUmRZCqFE1z7zCWMKpMmGc28U17RHfxwvkgqhG4GNSK7DGqTWeGg3f8mRB8KaIU+mjvg8krTSEPWQEFeiqlcBXn+A/vY4AwMUTlaRN8HUHJsjC0bl+z/T8t6w5s8njenYsg4ghvgxYPeh1oA5xYLF8RnUlOrlezTy9gSExNtN1ute+6OZtTb7fr/QjLW2wYcMxsi8yReaCrU3pUeUGh3jD0JdVbH6qjhJ+DwAfVUaUtPCeI8fIJQBkjxOSwH8FSE+UIROrZQ4rZtptaH6KPBRhvBo2e4yJRmjOx4Cf2KmZ1+68p9suiCO0I0Mv3FGwGQTQqX6dTu3yVOM4IS+nyTi1yImpa2043kSXCwrbD2l3eKTiaq9WwdPFeI9oyrFvHvyrM4KsFGB8dKvBs1TkwkqMrAnpv8es59SE1UL/+Wph0Jsojqr3mNLm34IK2cxfmwIGcBEQxWBzSu1lrJPWK26ZBbwIVdPnrwUIZi4Jv44Tf8uX/VSfa/cE27+I2B+51QX2wlJs1SIDupWAWW1pDbZbaKiCcJlogZy4Bt21PCwu+Cz2TQ97EP4vOOh/m+THi6njLarX5CrXganJxVPaCnU/X96jtmqkpik+uCfFw6y7Oi3fAzUQ4SoRvet4zCI0HceOtGG9CsJbR96nbJs7vQp4kS2KuyQMWAQ9W88ebgni+4L48N/7yl2T90YD6rxQtCkG4gi37uXez5rRzZZof4DNmWc0ru3J1UDVt51aNi76WxtNHpF4reIRNPyiDrbu5dU8DIwmBSMBoYXaTJ6lNIr5yr2FyR0367QBHTzqbZOMbXsMuev0+GDz+Q/rP4f2BOcuWtE3ZFgucHiGsVijWHSiLnivD9rJ6jVPX03llBljXeCpKjgkXl6iicXoX5FIMDpH5Dog0jCWjW4mokVoQhDN6yml75VI+326kF0w/UOFx8GNmsf5XxW2kKqt7QlGKtIsQxRJt/A2sTgpJeLP9zmUDt8gMnxNo6Ngcla4zs1gpXUC/mbYqslkXT3LwujXocpy35m3dmo78soUEXkg9SpwALRVcKWL7OBMAVwM06Fkc1A3AgxyP7MGyA/rYGfxf8fk1r79uqhGWggGhOcVIOrgrSQDND92ET6kS20qR6LYjl4nv9fCe9SV/1uyua/u6Zpl+KxRFWNjGOf4KYrII7fc0APwex3b4c67VmxDCTtQPjcrT9zsgkDrWTXTCupaCWPZdgIN/FitORx/XSeTBgE8TZ4tqeYscH34XCFcdw0EkL7HfettRdl6faY9lCdlmk1SWplixU3hSGOosiUAcup7UXRiKTLhGqrM1XgRqkvKi4wNsd45V0lb7SrWCG79DVsAHOIxOnnQymzefGW6SBfy2qyCdaNfcG0CgzTsJl8IeR0TgZL2mJ+4Jey5kdW5bd1s9KAieu+F5+Vcaanrl6pNK630kZdMawjjE93u1sTmZF5DwO05zpQ5QArOAX7ZH1m3mj5EXhAnQZkYOfjsyvmb37P5vwJ3QD0s+KPMaCS6rNgD5XbhaFqs0JcV0W2VDyPw5eNbJZZkQHuZEq0sZJwZtGJe7dEk3OazqZvFyvLSc8y1hpwzfANfuImJxZMAiGG/Io7/HZt9DKmN+TbxflauboTCCccMwGlKN6pdfceyFlxh3IjHDPMOkNjld9EGuBvmp51StP2VpYKE2/Q7gMnQ0r2Nj+kIQsGckUTLliiwrWvZ0BHFAAoeA3og6ZSJRzMEe8619XYSkI1VR26+J7e61CpmOafBDYROkoIVnv+TJ29xLjIrhga4s61oyom4N944Ts5miHYcWWZkxcBa4il55LyE6mYde6uB274e1tFSkKRE+6ClMuZmfkKIQ5rKW7CzZamx8V3h8uiG4C4gJ7YS5CH5eR9sytaA8/IZZEQ7qmrDVAn8HVxJn7/rJjvW3cR5+1cMEGBqu2aZZRO7s+9vjGBZDsmQ2ZnCfAmfha0ZuBAADUd8xSblhGrlgvafXNFukMlUosq7K6tS0wvpoZsuWs9JyGQSslsaEWjJYugbNhHod9ERXv4kQ4HQndv3fmLo5EnCGrrCNgIMnls+vtyeijr+jN5Ust7K2pVNoOLc/ENUc9ofOogdkp+YaYKxs19M5UOFijH0FTOkvbgSGK6LyebJOOLchnQtj6q37sjMO2AOSpvEc5lmawXsnactc5InP0s0ZmXNxLWdm+PV1R9N/chazYu2e2G+3l1FXiNwGNhDP32ybF2CCl9Q33Fwi76pvQQ/YPrOJKiYU6yHvxfTF4YwmjL2xUon5oNZbAthyTa+p/knT6twJBGKK3q8MNflwQsSIuAip/QCcml50IwV0pfUq2cLrUJnqij8R6r83PoJhmWqCsBw+M1aNbtS/yly/CFo7dzftODdFZWnubdw5Z9u1U08tyh2eYutTPBlnMXUQTpWmi6DojaEZGqfX4qdifS0x2jlLtfV7jsAqQ3FKiXvtli0Tqve7CYhZkNv7nm+nNbP9NDa+DphyesdIIj9VFeF1iMzDWRBdyyj+HwXbKNfYyEnuCOQBhNeh6uqggNL9Pk1WFvvnk6ugK4eqBIrjERiAB8r3v0MI1t8gSVn4UGyHJ1uqmjyxMNIWLSoixqHWNehbUsCnGxXnaQnajv+65mYa1CenYhMx4kc+/L0eFGGvjvtwEat2MMvgIjjroNaJ0Z+1sWYP9Em6tzQM8HQVI+n1DfAF/ftcZ0XvOTyiyLxwKDVTuNZNCHMZztnEkYV1Db5El1Z+xtud8h1vFQgM+uuWNFsTKbpXPWR1LFFZOLQHAugR66hhLZ0H6nOldoqum7yb/I1LjjRAuIioJv2DxXPDcMYDT3Vxf+NPE1fGZ0jUDUl8x+tTAvr9FVNtCUKGBS2tvewfPwS/GAKdsUiIxQnG7l4K2DsW4ayF8V107hQhWsFC/bGO86Mv9JKFQzfb9RN69goaGXuVNnBI08hK3nc0WUl7PEqDYCyv+UOLYzFdeUxaFTsDcLbHftTNGaGodQoZ4WJMrJqTVcHmJsFNeCHQfUJqjHLiDkpDXVct/PszZhk0mEkocgjzujCf9iAwmUw1ejtDem5fnewZQLCwP1C89kA7mXE9jHZpNv8LY3a79FcaR3qn7xvjwx0ky5c6WrKkxbsNEokdHeOHxfvsCmKmexM6zZ7PeCqPIOyXan8C+4QYqQZfJkUceU1QO9txJfosiOp5IoMKlIjp80pjdju/ogX9fSo67BsiBqkDJF652pA9PW9w/vJ6I6KOlAsjuOLWuCAAA',
  'controlraum': 'data:image/webp;base64,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',
};


// V40: independent transparent miniature objects; no fixed background or baked-in illumination.
const LIGHT_ROOM_TRANSPARENT: Record<string,string> = {
  'badezimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik00MCA2MmgxNjB2NDJxMCAxMy0xNyAxM0g1OHEtMTggMC0xOC0xM1oiIGZpbGw9InVybCgjd2hpdGUpIiBzdHJva2U9IiM3Yzg5ODYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik00MCA2NnE4MCAxMSAxNjAgMCIgc3Ryb2tlPSIjZmFmOGVmIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNDggNTloMTQ0IiBzdHJva2U9IiNlOGVlZTgiIHN0cm9rZS13aWR0aD0iOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTcyIDU2VjM1cTAtOSAxMC05aDEzIiBmaWxsPSJub25lIiBzdHJva2U9IiNhYWI4YjMiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTk1IDI2djgiIHN0cm9rZT0iI2FhYjhiMyIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTk0IDM0aDE0IiBzdHJva2U9IiM5YmFiYTYiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik01OSAxMTd2N20xMjEtN3Y3IiBzdHJva2U9IiM4ZTlkOTgiIHN0cm9rZS13aWR0aD0iNyIvPjxlbGxpcHNlIGN4PSIxMTkiIGN5PSI2MiIgcng9IjY0IiByeT0iNyIgZmlsbD0iI2I3YzZiZSIgb3BhY2l0eT0iLjY1Ii8+PC9zdmc+',
  'kuche': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzUiIHJ4PSIxMDUiIHJ5PSI2IiBmaWxsPSIjMTcyMzIxIiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNMjggNDMgODMgMjVsMTE3IDEwLTUzIDE5WiIgZmlsbD0iI2Q4ZDVjOSIvPjxwYXRoIGQ9Ik0yOCA0M3Y1M2w1NSAxNFY1NFoiIGZpbGw9IiM3ODg5N2UiLz48cGF0aCBkPSJNODMgNTR2NTZsMTE3LTEzVjM1WiIgZmlsbD0iI2IwYjdhOSIvPjxwYXRoIGQ9Ik05MSA1NXY0NGw0Ni01VjUyWiIgZmlsbD0iIzRhNWI1NSIvPjxwYXRoIGQ9Ik0xNDQgNTF2NDJsNDctNVY0NFoiIGZpbGw9IiM1ODZiNjEiLz48cGF0aCBkPSJNODggNTQgMjAwIDM1IiBzdHJva2U9IiNlN2U0ZDkiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0yOSA0NCA4MyA1NCIgc3Ryb2tlPSIjZjVmMGU0IiBzdHJva2Utd2lkdGg9IjUiLz48cGF0aCBkPSJNNDcgNzN2MjJtMTUtMTd2MjFtNTAtNDJ2MzdtNTQtNDZ2NDQiIHN0cm9rZT0iI2QxZDVjNyIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTU2IDExMCAxMjQgODZsNjggMTctNjggMjZaIiBmaWxsPSIjZjFlZWU0IiBzdHJva2U9IiNhOGIwYTgiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik01NiAxMTB2MTRsNjggMTV2LTEwWiIgZmlsbD0iIzdkOGY4MyIvPjxwYXRoIGQ9Ik0xMjQgMTI5djEwbDY4LTE5di0xN1oiIGZpbGw9IiM1NDZjNjIiLz48cGF0aCBkPSJNNzUgMTI0djEybTEwMC0xNnYxMiIgc3Ryb2tlPSIjNDY1NjRkIiBzdHJva2Utd2lkdGg9IjYiLz48ZWxsaXBzZSBjeD0iMTI5IiBjeT0iMTA0IiByeD0iMTQiIHJ5PSI1IiBmaWxsPSIjN2I4OTgxIi8+PGVsbGlwc2UgY3g9IjEyOSIgY3k9IjEwMyIgcng9IjEwIiByeT0iMyIgZmlsbD0iI2MzYzhjMSIvPjxwYXRoIGQ9Ik0xMjkgMTAxVjg3cTAtOCA5LTgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZmN2Y3YSIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTcwIDEydjI1bTQ4LTI3djI2bTQ4LTIzdjIyIiBzdHJva2U9IiM2Yzc3NzEiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik01NyAzN3ExMy0yMiAyNiAwWm00OC0xcTEzLTIyIDI2IDBabTQ4LTFxMTMtMjIgMjYgMFoiIGZpbGw9IiMzYjQ5NDkiLz48ZWxsaXBzZSBjeD0iNzAiIGN5PSIzOCIgcng9IjEwIiByeT0iMyIgZmlsbD0iI2YwZDlhOCIvPjxlbGxpcHNlIGN4PSIxMTgiIGN5PSIzNyIgcng9IjEwIiByeT0iMyIgZmlsbD0iI2YwZDlhOCIvPjxlbGxpcHNlIGN4PSIxNjYiIGN5PSIzNiIgcng9IjEwIiByeT0iMyIgZmlsbD0iI2YwZDlhOCIvPjwvc3ZnPg==',
  'schlafzimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9IjUyIiB5PSI1NCIgd2lkdGg9IjEzNSIgaGVpZ2h0PSI0NSIgcng9IjExIiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHBvbHlnb24gcG9pbnRzPSIzOCw4NyAxNzYsODcgMTk5LDEwOSA2MSwxMDkiIGZpbGw9InVybCgjY2xvdGgpIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwb2x5Z29uIHBvaW50cz0iNjEsMTA5IDE5OSwxMDkgMTk0LDEyNyA1NywxMjciIGZpbGw9IiMyYjM0MzAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHJlY3QgeD0iNjkiIHk9Ijc4IiB3aWR0aD0iNDgiIGhlaWdodD0iMTciIHJ4PSI2IiBmaWxsPSIjZTBkN2M4IiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMjMiIHk9Ijc4IiB3aWR0aD0iNDciIGhlaWdodD0iMTciIHJ4PSI2IiBmaWxsPSIjZDVjOGI3IiBzdHJva2U9Im5vbmUiLz48cG9seWdvbiBwb2ludHM9IjU2LDk4IDE4Myw5OCAxOTUsMTEzIDY3LDExMyIgZmlsbD0iIzljOTI4NiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cG9seWdvbiBwb2ludHM9IjY3LDExMyAxOTUsMTEzIDE5MSwxMjQgNjMsMTI0IiBmaWxsPSIjNjU1ZjVhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxyZWN0IHg9IjE4IiB5PSI5MiIgd2lkdGg9IjI5IiBoZWlnaHQ9IjI1IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTk5IiB5PSI5MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI1IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTMxIDU4TDMxIDg4IiBzdHJva2U9IiNhNmE1YTAiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBvbHlnb24gcG9pbnRzPSIxNyw1OCA0NSw1OCAzOSw3MCAyMyw3MCIgZmlsbD0idXJsKCNtZXRhbCkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIxMSA2MUwyMTEgODkiIHN0cm9rZT0iI2E2YTVhMCIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cG9seWdvbiBwb2ludHM9IjE5OCw2MCAyMjQsNjAgMjE5LDcxIDIwNCw3MSIgZmlsbD0idXJsKCNtZXRhbCkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+',
  'wohnzimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9IjQyIiB5PSI1MyIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI1MSIgcng9IjE0IiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMjkiIHk9Ijc2IiB3aWR0aD0iMjkiIGhlaWdodD0iNDMiIHJ4PSI5IiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTY5IiB5PSI3NiIgd2lkdGg9IjI5IiBoZWlnaHQ9IjQzIiByeD0iOSIgZmlsbD0idXJsKCNjbG90aCkiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjU3IiB5PSI4NCIgd2lkdGg9IjUzIiBoZWlnaHQ9IjI3IiByeD0iNyIgZmlsbD0iIzY0NzI2YSIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTE2IiB5PSI4NCIgd2lkdGg9IjUxIiBoZWlnaHQ9IjI3IiByeD0iNyIgZmlsbD0iIzY0NzI2YSIgc3Ryb2tlPSJub25lIi8+PHBvbHlnb24gcG9pbnRzPSI0MywxMDcgMTg0LDEwNyAxNzcsMTI1IDQ5LDEyNSIgZmlsbD0iIzMzM2MzNyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cG9seWdvbiBwb2ludHM9IjkyLDExMyAxNjAsMTEzIDE3MiwxMjEgMTA0LDEyMSIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cmVjdCB4PSIxMDUiIHk9IjEyMCIgd2lkdGg9IjY1IiBoZWlnaHQ9IjkiIHJ4PSIyIiBmaWxsPSIjNGEzODJlIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTEzIDEyOUwxMTMgMTM1IiBzdHJva2U9IiM1NTUyNGEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTE2MiAxMjlMMTYyIDEzNSIgc3Ryb2tlPSIjNTU1MjRhIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMTEgMzlMMjExIDExNyIgc3Ryb2tlPSIjYTJhNmExIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwb2x5Z29uIHBvaW50cz0iMTkyLDM4IDIyOSwzOCAyMjIsNTggMTk5LDU4IiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZWxsaXBzZSBjeD0iMjExIiBjeT0iMTE3IiByeD0iMTUiIHJ5PSI0IiBmaWxsPSIjM2Q0NTQyIi8+PC9zdmc+',
  'esszimmer': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxwb2x5Z29uIHBvaW50cz0iNTcsODEgMTc0LDgxIDE5NSw5NyA3Nyw5NyIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cG9seWdvbiBwb2ludHM9Ijc3LDk3IDE5NSw5NyAxOTEsMTA0IDc0LDEwNCIgZmlsbD0iIzRiMzMyNyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNODcgMTAzTDgzIDEzMiIgc3Ryb2tlPSIjNmU1OTQ0IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xODIgMTAzTDE4NSAxMzIiIHN0cm9rZT0iIzZlNTk0NCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSI0NCIgeT0iNzciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMyIgcng9IjQiIGZpbGw9InVybCgjY2xvdGgpIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNNDcgOThMNDQgMTMyIiBzdHJva2U9IiM2MjYzNWIiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTY0IDk4TDY4IDEzMiIgc3Ryb2tlPSIjNjI2MzViIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjE4NSIgeT0iNzUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyMyIgcng9IjQiIGZpbGw9InVybCgjY2xvdGgpIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTg4IDk2TDE4NSAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjA1IDk2TDIwOSAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSI3NiIgeT0iMTExIiB3aWR0aD0iMjQiIGhlaWdodD0iMjMiIHJ4PSI0IiBmaWxsPSJ1cmwoI2Nsb3RoKSIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTc5IDEzMkw3NiAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNOTYgMTMyTDEwMCAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxNTkiIHk9IjExMiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjIzIiByeD0iNCIgZmlsbD0idXJsKCNjbG90aCkiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xNjIgMTMzTDE1OSAxMzIiIHN0cm9rZT0iIzYyNjM1YiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMTc5IDEzM0wxODMgMTMyIiBzdHJva2U9IiM2MjYzNWIiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTEyNCAxMEwxMjQgNDgiIHN0cm9rZT0iIzlhOWY5YyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cG9seWdvbiBwb2ludHM9Ijk5LDQ3IDE0OSw0NyAxMzksNjUgMTEwLDY1IiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZWxsaXBzZSBjeD0iMTI0IiBjeT0iNjYiIHJ4PSIxMyIgcnk9IjMiIGZpbGw9IiM0NTRiNDgiLz48L3N2Zz4=',
  'flur': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzUiIHJ4PSIxMDUiIHJ5PSI2IiBmaWxsPSIjMTcyMzIxIiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNNDQgMzEgMTAxIDU0djY2bC01NyA5WiIgZmlsbD0iIzliOTU4NyIvPjxwYXRoIGQ9Ik0xOTYgMzEgMTM5IDU0djY2bDU3IDlaIiBmaWxsPSIjYzNiYWFhIi8+PHBhdGggZD0iTTQ0IDMxIDk5IDEyaDQybDU1IDE5LTU3IDIzaC0zOFoiIGZpbGw9IiNlNWRkZDAiLz48cGF0aCBkPSJNNDQgMTI5IDEwMSAxMjBoMzhsNTcgOS03NiAxMFoiIGZpbGw9IiNiNWExOGIiLz48cGF0aCBkPSJNMTAxIDU0aDM4djY2aC0zOFoiIGZpbGw9IiNlMWQ3YzciLz48cGF0aCBkPSJNNTcgNTMgODkgNjR2NDNsLTMyIDhaIiBmaWxsPSIjNTE0NjNmIi8+PHBhdGggZD0iTTYyIDYxIDgzIDY4djMzbC0yMSA1WiIgZmlsbD0iIzhjNzA1YSIvPjxjaXJjbGUgY3g9Ijc5IiBjeT0iODYiIHI9IjIiIGZpbGw9IiNlYmQ0YTgiLz48cGF0aCBkPSJNMTUxIDY0IDE4MyA1M3Y2MmwtMzItOFoiIGZpbGw9IiM2NTVhNTAiLz48cGF0aCBkPSJNMTU2IDY4IDE3OCA2MXY0NWwtMjItNVoiIGZpbGw9IiNhODhlNzQiLz48Y2lyY2xlIGN4PSIxNjEiIGN5PSI4NiIgcj0iMiIgZmlsbD0iI2YzZGZiYSIvPjxwYXRoIGQ9Ik0xMTUgMTl2MjEiIHN0cm9rZT0iIzg1Nzk2YiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTEwNCA0MHExMS0yMCAyMiAwWiIgZmlsbD0iIzM2M2Y0MiIvPjxlbGxpcHNlIGN4PSIxMTUiIGN5PSI0MCIgcng9IjkiIHJ5PSIzIiBmaWxsPSIjZTdjODhmIi8+PHBhdGggZD0iTTEwNCAxMTVoMzJtLTI3IDZoMjIiIHN0cm9rZT0iI2VlZTJjOSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTU5IDExOWgyOCIgc3Ryb2tlPSIjZWRlMmNlIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTUzIDExOWgyNyIgc3Ryb2tlPSIjZWRlMmNlIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=',
  'balkon': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik0yOCAxMDEgMTI0IDc3bDkwIDI1LTkzIDI1WiIgZmlsbD0idXJsKCN3b29kKSIgc3Ryb2tlPSIjYTQ4YzZjIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMjggMTAxVjQwbTkzIDg3VjUwbTkzIDUyVjQwIiBzdHJva2U9IiNhYWI3YjMiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0yOCA0MmgxODYiIHN0cm9rZT0iI2I5YzhjNSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHBhdGggZD0iTTMwIDQ3aDE4MXY0OWwtOTAtMjAtOTEgMjBaIiBmaWxsPSIjODViNGI2IiBmaWxsLW9wYWNpdHk9Ii4xNiIgc3Ryb2tlPSIjODI5ZTllIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNzYgNDZ2NDJtODktNDJ2NDIiIHN0cm9rZT0iIzk0YWZhZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTczIDg5bC00LTI2cS0zLTEzIDExLTEzaDIwcTEyIDAgMTIgMTNsLTQgMjZaIiBmaWxsPSJ1cmwoI3NhZ2UpIi8+PHBhdGggZD0iTTgwIDg4IDcyIDExMG0zMi0yMiA3IDIyIiBzdHJva2U9IiNhYWEyOWEiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNDMgODRsLTUtMjFxLTMtMTMgMTEtMTNoMThxMTIgMCAxMiAxM2wtNCAyMVoiIGZpbGw9InVybCgjc2FnZSkiLz48cGF0aCBkPSJNMTQ4IDg0bC04IDI0bTI5LTI0IDggMjQiIHN0cm9rZT0iI2FhYTI5YSIgc3Ryb2tlLXdpZHRoPSI1Ii8+PGVsbGlwc2UgY3g9IjEyNCIgY3k9Ijg2IiByeD0iMTYiIHJ5PSI2IiBmaWxsPSJ1cmwoI3doaXRlKSIvPjxwYXRoIGQ9Ik0xMjQgOTB2MjQiIHN0cm9rZT0iIzljOTU4OSIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHJlY3QgeD0iMTgzIiB5PSI4NiIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIxIiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIvPjxwYXRoIGQ9Ik0xOTIgODRxLTE1LTE5LTktMzBtOSAzMHExNS0yMCAxMy0zMyIgc3Ryb2tlPSIjNjg4NzY1IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==',
  'controlraum': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9IjMyIiB5PSIyMCIgd2lkdGg9IjU4IiBoZWlnaHQ9IjEwNiIgcng9IjUiIGZpbGw9IiMzNDNmNDQiIHN0cm9rZT0iIzhjOWI5YyIvPjxyZWN0IHg9Ijk3IiB5PSIzNCIgd2lkdGg9IjU3IiBoZWlnaHQ9IjkyIiByeD0iNCIgZmlsbD0iIzM0NDE0NiIgc3Ryb2tlPSIjOGM5YjljIi8+PHJlY3QgeD0iMTYxIiB5PSI0NyIgd2lkdGg9IjUwIiBoZWlnaHQ9Ijc5IiByeD0iNCIgZmlsbD0iIzQ0NTI1NyIgc3Ryb2tlPSIjOGM5YjljIi8+PHJlY3QgeD0iMzgiIHk9IjMwIiB3aWR0aD0iNDYiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0MiIgeT0iMzQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0OSIgeT0iMzQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNNTkgMzZMNzkgMzYiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIzOCIgeT0iNDQiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQyIiB5PSI0OCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQ5IiB5PSI0OCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik01OSA1MEw3OSA1MCIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjM4IiB5PSI1OCIgd2lkdGg9IjQ2IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iNDIiIHk9IjYyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iNDkiIHk9IjYyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTU5IDY0TDc5IDY0IiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMzgiIHk9IjcyIiB3aWR0aD0iNDYiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0MiIgeT0iNzYiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0OSIgeT0iNzYiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNNTkgNzhMNzkgNzgiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIzOCIgeT0iODYiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQyIiB5PSI5MCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQ5IiB5PSI5MCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik01OSA5Mkw3OSA5MiIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjM4IiB5PSIxMDAiIHdpZHRoPSI0NiIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjQyIiB5PSIxMDQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI0OSIgeT0iMTA0IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTU5IDEwNkw3OSAxMDYiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxMDMiIHk9IjQyIiB3aWR0aD0iNDUiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMDciIHk9IjQ2IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTE0IiB5PSI0NiIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xMjQgNDhMMTQzIDQ4IiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMTAzIiB5PSI1NiIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTA3IiB5PSI2MCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjExNCIgeT0iNjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTI0IDYyTDE0MyA2MiIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjEwMyIgeT0iNzAiIHdpZHRoPSI0NSIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjEwNyIgeT0iNzQiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMTQiIHk9Ijc0IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTEyNCA3NkwxNDMgNzYiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxMDMiIHk9Ijg0IiB3aWR0aD0iNDUiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMDciIHk9Ijg4IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTE0IiB5PSI4OCIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xMjQgOTBMMTQzIDkwIiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMTAzIiB5PSI5OCIgd2lkdGg9IjQ1IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTA3IiB5PSIxMDIiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxMTQiIHk9IjEwMiIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xMjQgMTA0TDE0MyAxMDQiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxNjciIHk9IjU1IiB3aWR0aD0iMzgiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxNzEiIHk9IjU5IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iIzZhYjRhMCIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTc4IiB5PSI1OSIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiNkNGFhNmMiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0xODggNjFMMjAwIDYxIiBzdHJva2U9IiM1MzYzNmEiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHJlY3QgeD0iMTY3IiB5PSI2OSIgd2lkdGg9IjM4IiBoZWlnaHQ9IjExIiByeD0iMiIgZmlsbD0iIzFkMjcyYiIgc3Ryb2tlPSJub25lIi8+PHJlY3QgeD0iMTcxIiB5PSI3MyIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjE3OCIgeT0iNzMiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjZDRhYTZjIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTg4IDc1TDIwMCA3NSIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxyZWN0IHg9IjE2NyIgeT0iODMiIHdpZHRoPSIzOCIgaGVpZ2h0PSIxMSIgcng9IjIiIGZpbGw9IiMxZDI3MmIiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjE3MSIgeT0iODciIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIHJ4PSIxIiBmaWxsPSIjNmFiNGEwIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxNzgiIHk9Ijg3IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTE4OCA4OUwyMDAgODkiIHN0cm9rZT0iIzUzNjM2YSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIxNjciIHk9Ijk3IiB3aWR0aD0iMzgiIGhlaWdodD0iMTEiIHJ4PSIyIiBmaWxsPSIjMWQyNzJiIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSIxNzEiIHk9IjEwMSIgd2lkdGg9IjQiIGhlaWdodD0iMyIgcng9IjEiIGZpbGw9IiM2YWI0YTAiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9IjE3OCIgeT0iMTAxIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiByeD0iMSIgZmlsbD0iI2Q0YWE2YyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTE4OCAxMDNMMjAwIDEwMyIgc3Ryb2tlPSIjNTM2MzZhIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xOSAxMiBWMTExIEgzMCBNMjE1IDE3IFYzOCBIMTg3IFY0NiIgc3Ryb2tlPSIjYjY2ZTU4IiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjIzIDEzIFYzMiBIMjAyIFY0NSIgc3Ryb2tlPSIjNjk5Y2I1IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=',
  'generic': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjkiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDdkOWQzIi8+PHN0b3Agb2Zmc2V0PSIuMzYiIHN0b3AtY29sb3I9IiM3MzdkODAiLz48c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzMwM2EzZCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWIyMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ3b29kIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYjg5YTc1Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM3OTU0M2MiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzYjI5MjUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iY2xvdGgiIHgyPSIuNyIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiM4ZTk1OGEiLz48c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzUxNWU1NyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzI1MmUyYiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnbGFzcyIgeDI9IjEiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjZDJkZWQ5IiBzdG9wLW9wYWNpdHk9Ii44MyIvPjxzdG9wIG9mZnNldD0iLjYiIHN0b3AtY29sb3I9IiM3YzlhOWIiIHN0b3Atb3BhY2l0eT0iLjM0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTJlZWU3IiBzdG9wLW9wYWNpdHk9Ii42OCIvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJ3YXJtIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU0IiBzdG9wLW9wYWNpdHk9Ii44NiIvPjxzdG9wIG9mZnNldD0iLjM1IiBzdG9wLWNvbG9yPSIjZmZkZjlkIiBzdG9wLW9wYWNpdHk9Ii40OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmZGE4YyIgc3RvcC1vcGFjaXR5PSIwIi8+PC9yYWRpYWxHcmFkaWVudD48ZmlsdGVyIGlkPSJzaGFkb3ciPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjMiLz48L2ZpbHRlcj48L2RlZnM+PGVsbGlwc2UgY3g9IjEyMCIgY3k9IjEzMyIgcng9IjkxIiByeT0iOCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iLjE4IiBmaWx0ZXI9InVybCgjc2hhZG93KSIvPjxyZWN0IHg9Ijc3IiB5PSIzNiIgd2lkdGg9Ijg2IiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9InVybCgjbWV0YWwpIiBzdHJva2U9Im5vbmUiLz48cmVjdCB4PSI4NiIgeT0iNDYiIHdpZHRoPSI2OCIgaGVpZ2h0PSI2MSIgcng9IjYiIGZpbGw9IiMyNjM1M2EiIHN0cm9rZT0ibm9uZSIvPjxyZWN0IHg9Ijk2IiB5PSI1NyIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjM0IiByeD0iNCIgZmlsbD0idXJsKCNnbGFzcykiIHN0cm9rZT0ibm9uZSIvPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSI5OCIgcng9IjQiIHJ5PSI0IiBmaWxsPSIjYTZiN2FkIi8+PC9zdmc+',
  'buro': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxyZWN0IHg9IjQxIiB5PSI3MCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxMCIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz48cGF0aCBkPSJNNDkgODB2MzltMTQzLTM5djM5IiBzdHJva2U9IiM2ODUzNDIiIHN0cm9rZS13aWR0aD0iNyIvPgo8cmVjdCB4PSI4MiIgeT0iMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI1MiIgcng9IjYiIGZpbGw9InVybCgjbWV0YWwpIi8+PHJlY3QgeD0iODkiIHk9IjI3IiB3aWR0aD0iNjYiIGhlaWdodD0iMzciIHJ4PSIzIiBmaWxsPSJ1cmwoI2dsYXNzKSIvPgo8cGF0aCBkPSJNMTE3IDcydjdtLTE3IDBoMzQiIHN0cm9rZT0iIzhiOTk5MiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTcxIDEwOHExLTE5IDE4LTE5aDMycTE1IDAgMTYgMTkiIGZpbGw9InVybCgjZGFyaykiLz48cGF0aCBkPSJNMTA1IDEwOHYxNCIgc3Ryb2tlPSIjNzg4MjdjIiBzdHJva2Utd2lkdGg9IjUiLz4KPHBhdGggZD0iTTE3MCA3MHYtMjVsMTUtMTciIHN0cm9rZT0iI2E5YjFhYSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTE3MSAyNmgyOGwtNiAxNGgtMThaIiBmaWxsPSJ1cmwoI2RhcmspIi8+CjxyZWN0IHg9IjQ5IiB5PSI1OCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0idXJsKCN3aGl0ZSkiLz48L3N2Zz4=',
  'garage': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik0zMSA0OCAxMjAgMTVsODkgMzN2NzRIMzFaIiBmaWxsPSJ1cmwoI21ldGFsKSIgc3Ryb2tlPSIjOGU5Yzk1IiBzdHJva2Utd2lkdGg9IjMiLz48cmVjdCB4PSI0NCIgeT0iNTAiIHdpZHRoPSIxNTIiIGhlaWdodD0iNjgiIHJ4PSIzIiBmaWxsPSJ1cmwoI2RhcmspIiBzdHJva2U9IiNhMWFiYTQiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik00OCA2MGgxNDRtLTE0NCAxMmgxNDRtLTE0NCAxMmgxNDRtLTE0NCAxMmgxNDRtLTE0NCAxMmgxNDQiIHN0cm9rZT0iIzczODc4MyIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTM5IDEyMGgxNjIiIHN0cm9rZT0iIzhkOTg5MiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PHJlY3QgeD0iNTUiIHk9IjEwMiIgd2lkdGg9IjE5IiBoZWlnaHQ9IjciIHJ4PSIzIiBmaWxsPSIjZDljNjljIiBvcGFjaXR5PSIuOCIvPjxyZWN0IHg9IjE2NiIgeT0iMTAyIiB3aWR0aD0iMTkiIGhlaWdodD0iNyIgcng9IjMiIGZpbGw9IiNkOWM2OWMiIG9wYWNpdHk9Ii44Ii8+PC9zdmc+',
  'garten': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzUiIHJ4PSIxMDUiIHJ5PSI2IiBmaWxsPSIjMTcyMzIxIiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNMTMgMTIwcTQ4LTE4IDk1LTYgNTMtMTYgMTE3IDMiIHN0cm9rZT0iIzY1ODU2YiIgc3Ryb2tlLXdpZHRoPSI5IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNODggMTI4cTI3LTI3IDYyLTM0dDYwLTI2IiBmaWxsPSJub25lIiBzdHJva2U9IiNjNmI1OWEiIHN0cm9rZS13aWR0aD0iMTciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik04OCAxMjhxMjctMjcgNjItMzR0NjAtMjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UyZDNiNSIgc3Ryb2tlLXdpZHRoPSIxMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTU2IDExNFY0OSIgc3Ryb2tlPSIjNzI1OTQyIiBzdHJva2Utd2lkdGg9IjEwIi8+PHBhdGggZD0iTTU2IDg4IDM3IDY1bTE5IDkgMTgtMjAiIHN0cm9rZT0iIzcyNTk0MiIgc3Ryb2tlLXdpZHRoPSI1Ii8+PGNpcmNsZSBjeD0iNDIiIGN5PSI0MyIgcj0iMjciIGZpbGw9IiM3MThlNzciLz48Y2lyY2xlIGN4PSI2NiIgY3k9IjMzIiByPSIyOSIgZmlsbD0iIzhmYTY4YiIvPjxjaXJjbGUgY3g9IjgyIiBjeT0iNTYiIHI9IjI0IiBmaWxsPSIjNjQ3ZTY5Ii8+PGNpcmNsZSBjeD0iMjkiIGN5PSI2NSIgcj0iMTgiIGZpbGw9IiNhM2I0OWIiLz48cGF0aCBkPSJNMTc1IDEwM1Y1MSIgc3Ryb2tlPSIjNzQ1YjQyIiBzdHJva2Utd2lkdGg9IjciLz48Y2lyY2xlIGN4PSIxNjMiIGN5PSI0MyIgcj0iMjMiIGZpbGw9IiM3ZjlkODQiLz48Y2lyY2xlIGN4PSIxODgiIGN5PSI0MSIgcj0iMjUiIGZpbGw9IiM5OGI0OWEiLz48Y2lyY2xlIGN4PSIxNzkiIGN5PSIyMiIgcj0iMjEiIGZpbGw9IiM3ODk0N2IiLz48cGF0aCBkPSJNMjAgMTE3cS0yLTI0IDEyLTMybS02IDMycTEyLTI0IDI1LTI1bS05IDI2cTktMjAgMTktMjRtMTM0IDE5cS0xLTIyIDExLTMwbS0yIDMxcTgtMTcgMTctMjEiIHN0cm9rZT0iIzY4ODU2YSIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48Y2lyY2xlIGN4PSI5OSIgY3k9IjEwNiIgcj0iNCIgZmlsbD0iI2M2YTVhMSIvPjxjaXJjbGUgY3g9IjEwNyIgY3k9IjEwMiIgcj0iMyIgZmlsbD0iI2U1Y2Y5ZCIvPjxjaXJjbGUgY3g9IjExNiIgY3k9IjEwMCIgcj0iNCIgZmlsbD0iI2EzYjlhZCIvPjxwYXRoIGQ9Ik0xMjEgMTE3di0yMyIgc3Ryb2tlPSIjN2U4NTgxIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMTE0IDk1cTctMTIgMTQgMFoiIGZpbGw9IiMzNTNmM2YiLz48L3N2Zz4=',
  'hobbyraum': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMzUiIHJ4PSIxMDUiIHJ5PSI2IiBmaWxsPSIjMTcyMzIxIiBvcGFjaXR5PSIuMTQiLz48cGF0aCBkPSJNMzAgNjYgMTMyIDQybDc4IDIzLTEwMSAyOVoiIGZpbGw9IiM3ODUzM2QiIHN0cm9rZT0iI2E1ODQ2MiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTQyIDY2IDEzMSA0OWw2NSAxNy04OCAyMVoiIGZpbGw9IiMzMTcyNjUiIHN0cm9rZT0iIzcxOWU4NyIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTMwIDY2djE5bDc5IDI4Vjk0WiIgZmlsbD0iIzViNDIzNiIvPjxwYXRoIGQ9Ik0xMDkgOTR2MTlsMTAxLTMwVjY1WiIgZmlsbD0iIzY4NGMzYiIvPjxwYXRoIGQ9Ik00OSA5MXYzNG0xNDEtMzZ2MzYiIHN0cm9rZT0iIzRjMzkzMCIgc3Ryb2tlLXdpZHRoPSI4Ii8+PGNpcmNsZSBjeD0iNzIiIGN5PSI2OCIgcj0iNSIgZmlsbD0iI2U5ZTRkNSIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjY1IiByPSI1IiBmaWxsPSIjZDliNDdlIi8+PGNpcmNsZSBjeD0iMTMzIiBjeT0iNzYiIHI9IjUiIGZpbGw9IiNiNmMyYmIiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3OSIgcj0iNSIgZmlsbD0iI2YwZWNlMyIvPjxwYXRoIGQ9Ik0zNyA0OSAxNDUgMTgiIHN0cm9rZT0iI2M4YTY3YyIgc3Ryb2tlLXdpZHRoPSI0Ii8+PHBhdGggZD0iTTE0NSAxOCAxNTUgMjQiIHN0cm9rZT0iI2FlOGM2MiIgc3Ryb2tlLXdpZHRoPSIzIi8+PHBhdGggZD0iTTE4OCAyNXY5MW0tMjItNjhoNDRtLTQ0IDB2MTJtNDQtMTJ2MTIiIHN0cm9rZT0iIzhlOWI5OCIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMTcwIDY4aDM2bS0zMCA0NiAxMi0yNyAxMiAyNyIgc3Ryb2tlPSIjNmM3Nzc1IiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48cmVjdCB4PSIxNTciIHk9IjEwMyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSIjMzk0YjRhIi8+PHJlY3QgeD0iMjA1IiB5PSIxMDMiIHdpZHRoPSIxNCIgaGVpZ2h0PSI4IiByeD0iMiIgZmlsbD0iIzM5NGI0YSIvPjwvc3ZnPg==',
  'keller': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxyZWN0IHg9IjM2IiB5PSIxOCIgd2lkdGg9IjE2OSIgaGVpZ2h0PSIxMDIiIHJ4PSIzIiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjkzOTAiIHN0cm9rZS13aWR0aD0iNiIvPgo8cGF0aCBkPSJNNDAgNTFoMTYybS0xNjIgMzRoMTYyIiBzdHJva2U9IiM4ODkyOGIiIHN0cm9rZS13aWR0aD0iNiIvPgo8cmVjdCB4PSI0OSIgeT0iMjQiIHdpZHRoPSIzNCIgaGVpZ2h0PSIyNSIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz48cmVjdCB4PSI5MSIgeT0iMjgiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyMSIgcng9IjIiIGZpbGw9InVybCgjd2hpdGUpIi8+PHJlY3QgeD0iMTI4IiB5PSIyMiIgd2lkdGg9IjU4IiBoZWlnaHQ9IjI3IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIvPgo8cmVjdCB4PSI0OCIgeT0iNTgiIHdpZHRoPSI0NCIgaGVpZ2h0PSIyNCIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz48cmVjdCB4PSIxMDAiIHk9IjU2IiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHJ4PSIzIiBmaWxsPSJ1cmwoI21ldGFsKSIvPjxyZWN0IHg9IjEzNCIgeT0iNjAiIHdpZHRoPSI1MSIgaGVpZ2h0PSIyMiIgcng9IjMiIGZpbGw9InVybCgjd29vZCkiLz4KPHJlY3QgeD0iNTEiIHk9IjkxIiB3aWR0aD0iMzkiIGhlaWdodD0iMjYiIHJ4PSIzIiBmaWxsPSJ1cmwoI3dvb2QpIi8+PHJlY3QgeD0iMTAxIiB5PSI5MyIgd2lkdGg9IjQyIiBoZWlnaHQ9IjI0IiByeD0iMyIgZmlsbD0idXJsKCN3b29kKSIvPgo8cGF0aCBkPSJNMTY4IDExNlY5MyIgc3Ryb2tlPSIjODc5NDg4IiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMTYwIDk3aDE2bC0zIDE5aC0xMFoiIGZpbGw9InVybCgjbWV0YWwpIi8+PC9zdmc+',
  'pool': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNDAgMTQ1Ij48ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id29vZCIgeDI9Ii4xNSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNhODg0NjMiLz48c3RvcCBvZmZzZXQ9Ii40OCIgc3RvcC1jb2xvcj0iIzc0NTEzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQyMmQyOCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1ldGFsIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYzVjY2M3Ii8+PHN0b3Agb2Zmc2V0PSIuMzUiIHN0b3AtY29sb3I9IiM3ODg2ODIiLz48c3RvcCBvZmZzZXQ9Ii43NSIgc3RvcC1jb2xvcj0iIzM3NDEzZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFlMjkyYiIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdsYXNzIiB4Mj0iLjgiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjYTJjMWJiIiBzdG9wLW9wYWNpdHk9Ii45Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM0NzZjNzAiIHN0b3Atb3BhY2l0eT0iLjg1Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjAzYjQ0Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0id2hpdGUiIHgyPSIuMSIgeTI9IjEiPjxzdG9wIHN0b3AtY29sb3I9IiNmNGVlZTMiLz48c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjYzJjM2I5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzQ3ZDc5Ii8+PC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ic2FnZSIgeDI9Ii4zIiB5Mj0iMSI+PHN0b3Agc3RvcC1jb2xvcj0iI2EwYWE5NSIvPjxzdG9wIG9mZnNldD0iLjUiIHN0b3AtY29sb3I9IiM2NzdjNzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNTRiNDUiLz48L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJkYXJrIiB4Mj0iLjIiIHkyPSIxIj48c3RvcCBzdG9wLWNvbG9yPSIjNTE1ZjYxIi8+PHN0b3Agb2Zmc2V0PSIuNSIgc3RvcC1jb2xvcj0iIzI5MzYzYiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzE1MWQyNCIvPjwvbGluZWFyR3JhZGllbnQ+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9InNoaW5lIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9Ii44Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmOWU1IiBzdG9wLW9wYWNpdHk9IjAiLz48L3JhZGlhbEdyYWRpZW50PgogICAgPC9kZWZzPjxlbGxpcHNlIGN4PSIxMjAiIGN5PSIxMjgiIHJ4PSI4OSIgcnk9IjciIGZpbGw9IiMwOTBkMTAiIG9wYWNpdHk9Ii4xNyIvPjxwYXRoIGQ9Ik0yNCA3NCAxMTEgNTVsMTA3IDIxLTg3IDQ2WiIgZmlsbD0idXJsKCNtZXRhbCkiLz48cGF0aCBkPSJNMzQgNzggMTExIDYybDk1IDE2LTc2IDM1WiIgZmlsbD0idXJsKCNnbGFzcykiIHN0cm9rZT0iI2E1YzRjMCIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxwYXRoIGQ9Ik00NyA4NXEyMS03IDQzLTJ0NDMgMSA0MCAwbS0xMTQgMTRxMjEtNyA0My0ydDQzIDEgNDAgMCIgc3Ryb2tlPSIjYjlkZWQ3IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIG9wYWNpdHk9Ii42NSIvPgo8cGF0aCBkPSJNNjQgNTZWMzJxMC05IDExLTltMyAzM1YzMnEwLTkgMTEtOSIgc3Ryb2tlPSIjYzJjYmM0IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8cGF0aCBkPSJNNjQgNDNoMTRtLTE0IDEwaDE0IiBzdHJva2U9IiNjMmNiYzQiIHN0cm9rZS13aWR0aD0iNCIvPgo8cGF0aCBkPSJNMTcxIDYwVjMwIiBzdHJva2U9IiM2YjdkNjkiIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0xNTUgMzJxMTUtMzEgMzEgMFoiIGZpbGw9InVybCgjc2FnZSkiLz4KPHJlY3QgeD0iMTczIiB5PSIxMDQiIHdpZHRoPSIyOSIgaGVpZ2h0PSI5IiByeD0iMiIgZmlsbD0idXJsKCN3b29kKSIvPjwvc3ZnPg==',
};

// V39: dedicated unlit variants, with warm highlights neutralized.
const LIGHT_ROOM_DIORAMAS_OFF: Record<string,string> = {
  'badezimmer': 'data:image/webp;base64,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',
  'kuche': 'data:image/webp;base64,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',
  'schlafzimmer': 'data:image/webp;base64,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',
  'wohnzimmer': 'data:image/webp;base64,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',
  'esszimmer': 'data:image/webp;base64,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',
  'flur': 'data:image/webp;base64,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',
  'balkon': 'data:image/webp;base64,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',
  'controlraum': 'data:image/webp;base64,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',
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
  @state() private crFontSize = 110;
  @state() private crFontSaving = false;
  @state() private crFontMessage = "";
  private crFontRequest = 0;
  private crFontCacheKey(user: string) { return `controlroom-font-v34:${user}`; }
  private crValidFont(value: unknown): number | null {
    const n = Number(value);
    return Number.isFinite(n) && [90, 100, 110, 120].includes(n) ? n : null;
  }
  private crRestoreFont(user: string): void {
    try { const n=this.crValidFont(localStorage.getItem(this.crFontCacheKey(user))); if(n!==null) this.crFontSize=n; } catch { /* storage blocked */ }
  }
  private async crSetFontSize(size: number): Promise<void> {
    if(this.crValidFont(size)===null)return;
    this.crFontSize=size;
    const user=this.hass?.user?.id;
    if(user) try {localStorage.setItem(this.crFontCacheKey(user),String(size));} catch { /* storage blocked */ }
    if(!user || !this.hass?.callWS){this.crFontMessage="Lokal gespeichert";return;}
    const request=++this.crFontRequest;
    this.crFontSaving=true;this.crFontMessage="";
    try {
      await this.hass.callWS({type:"controlroom_preferences/set_font",font_size:size});
      if(request===this.crFontRequest)this.crFontMessage="Synchronisiert ✓";
    }catch(error){
      if(request===this.crFontRequest)this.crFontMessage="Lokal gespeichert · Integration aktualisieren";
      console.warn("ControlRoom: font sync requires Preferences v1.1",error);
    }finally{if(request===this.crFontRequest)this.crFontSaving=false;}
  }
  private renderFontSetting(){
    return html`<div class="cr-font-setting">
      <div class="cr-font-label"><span>${this.renderIcon("mdi:format-size")}<strong>Schriftgröße</strong></span><span class="cr-font-percent">${this.crFontSize}%</span></div>
      <div class="cr-font-choices" role="group" aria-label="Schriftgröße">
        ${([90,100,110,120] as const).map(size=>html`<button type="button" class=${size===this.crFontSize?"active":""} aria-pressed=${size===this.crFontSize} @click=${()=>{void this.crSetFontSize(size);}}>${size}%</button>`)}
      </div>
      ${this.crFontMessage?html`<small class="cr-font-status">${this.crFontMessage}</small>`:nothing}
    </div>`;
  }

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
  private crRemoteUser = "";
  private crCacheUser = "";
  private crRemoteLoading = false;
  private crRemoteReady = false;
  private crRemoteSaving = false;
  @state() private crDefaultTheme = "purple";
  @state() private crDefaultFeedback = "";
  @state() private crDefaultStyle: "glass" | "solid" | "minimal" = "glass";

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

  // Apply the last verified theme for this HA user before the first paint.
  protected willUpdate(): void {
    const user = this.hass?.user?.id;
    if (!user || user === this.crCacheUser) return;
    this.crCacheUser = user;
    try {
      const saved = JSON.parse(localStorage.getItem(`controlroom-theme-user-v32:${user}`) || "null");
      if (saved && this.crPalettes().some(p => p.id === saved.theme)) {
        this.crTheme = saved.theme;
        if (["glass", "solid", "minimal"].includes(saved.style)) this.crThemeStyle = saved.style;
        this.crRemoteReady = true; // cached presentation; remote still refreshes it
      } else {
        this.crRemoteReady = false;
      }
    } catch { this.crRemoteReady = false; }
  }

  private cacheVerifiedTheme(user: string): void {
    try {
      localStorage.setItem(`controlroom-theme-user-v32:${user}`, JSON.stringify({theme:this.crTheme,style:this.crThemeStyle}));
    } catch { /* Private mode / storage unavailable */ }
  }

  protected updated(): void {
    void this.refreshWasteEvents();
    if(this.hass?.user?.id && this.hass.callWS && this.crRemoteUser!==this.hass.user.id && !this.crRemoteLoading){
      void this.loadRemoteCRTheme();
    }
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
    if(this.hass?.user?.id)this.crRestoreFont(this.hass.user.id);
    try {
      const saved=JSON.parse(localStorage.getItem("controlroom-theme-v1")||"{}");
      const standard=JSON.parse(localStorage.getItem("controlroom-theme-default-v1")||"{}");
      this.crDefaultTheme=standard.theme||"purple";
      this.crDefaultStyle=(["glass","solid","minimal"].includes(standard.style)?standard.style:saved.style)||"glass";
      const migrateTheme=(id:string)=>{
        const match=/^signature-(\d+)$/.exec(id);
        if(!match)return id;
        const available=this.crPalettes();
        if(available.some(p=>p.id===id))return id;
        const generated=available.filter(p=>p.id.startsWith("signature-"));
        return generated.length?generated[(Number(match[1])-1)%generated.length].id:"purple";
      };
      this.crDefaultTheme=migrateTheme(this.crDefaultTheme);
      this.crTheme=migrateTheme(saved.theme||this.crDefaultTheme);
      this.crThemeStyle=(["glass","solid","minimal"].includes(saved.style)?saved.style:this.crDefaultStyle) as "glass" | "solid" | "minimal";
      this.crThemeSource="controlroom";this.crHATheme="";this.crHAMode="auto";
    }catch(error){console.warn("ControlRoom: unable to restore theme",error);}
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
      {id:"themes", title:"Themes", description:"Exklusive ControlRoom-Farbwelten und Designstile", icon:"mdi:palette-outline", group:"Darstellung"},
      {id:"devices", title:"Geräte & Bereiche", description:"Bereiche und Entitäten · in Vorbereitung", icon:"mdi:devices", group:"Geräte & Bereiche"},
      {id:"system", title:"System", description:"Informationen und Verwaltung · in Vorbereitung", icon:"mdi:cog-outline", group:"System"}
    ] as const;
    const matches = categories.filter(c => `${c.title} ${c.description} ${c.group}`.toLocaleLowerCase().includes(this.settingsSearch.toLocaleLowerCase().trim()));
    if (section === "overview") return html`<div class="settings-center">
      <div class="settings-intro"><h1>Einstellungen</h1><p>Gestalte dein Zuhause, ganz nach deinen Wünschen.</p></div>
      <label class="settings-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Einstellungen durchsuchen…" .value=${this.settingsSearch} @input=${(e:Event) => {this.settingsSearch = (e.target as HTMLInputElement).value;}} aria-label="Einstellungen durchsuchen" /></label>
      ${matches.length ? [...new Set(matches.map(c => c.group))].map(group => html`<section class="settings-category"><h2>${group}</h2><div class="settings-options">${matches.filter(c=>c.group===group).map(c=>html`<button class="settings-option" @click=${()=>{if(c.id==="welcome" || c.id==="smartbar") this.beginSettingsEdit(c.id); else {this.settingsSection=c.id;if(c.id==="rooms") this.roomStyleSnapshot=JSON.stringify({style:this.roomStyle,auto:this.roomAutoSwitch,byArea:this.roomStyleByArea,photos:this.roomPhotoUrls,images:this.roomImages});if(c.id==="themes")this.crThemeSnapshot=JSON.stringify(this.crThemeData());}}}><span class="settings-option-icon">${this.renderIcon(c.icon)}</span><span class="settings-option-copy"><strong>${c.title}</strong><small>${c.description}</small></span>${this.renderIcon("mdi:chevron-right")}</button>`)}</div>${group==="Darstellung" && (!this.settingsSearch.trim() || "schriftgröße typografie darstellung".includes(this.settingsSearch.toLocaleLowerCase().trim()))?this.renderFontSetting():nothing}</section>`) : html`<p class="settings-empty">Keine passenden Einstellungen gefunden.</p>`}
      <p class="settings-local-note">Änderungen werden auf diesem Browser / Display gespeichert.</p>
    </div>`;
    if (section === "themes") return this.renderThemeSettings();
    if (section === "rooms") return html`<div class="settings-center"><button class="settings-back" @click=${()=>{this.cancelRoomVisualSettings();this.settingsSection="overview";}}>${this.renderIcon("mdi:arrow-left")} Zurück</button>${this.renderRoomStyleEditor(Object.entries(this.areaNames).sort((a,b)=>a[1].localeCompare(b[1])))}</div>`;
    if (section === "appearance" || section === "devices" || section === "system") return html`<div class="settings-center"><button class="settings-back" @click=${()=>{this.settingsSection="overview";}}>${this.renderIcon("mdi:arrow-left")} Zurück</button><section class="welcome-settings"><div class="eyebrow">CONTROLROOM</div><h2>${categories.find(c=>c.id===section)?.title}</h2><p>Dieser Bereich wird in einer späteren Etappe eingerichtet. Bestehende Einstellungen bleiben unverändert.</p></section></div>`;
    const candidates = this.getWasteCandidates().filter(e =>
      this.wasteSource === "auto" || e.entity_id.startsWith(`${this.wasteSource}.`));
    const wasteInfo = this.getWasteInfo();
    return html`<div class="settings-stack"><button class="settings-back" @click=${()=>{this.cancelSettingsEdit();}}>${this.renderIcon("mdi:arrow-left")} Zurück</button>
      ${section === "welcome" ? html`<section class="welcome-settings">
        <h2>Begrüßung & Personen</h2>
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
        <h2>Smart Glass Bar</h2>
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

  private pendantLightColor(_lights: HAEntity[]): string {
    // Decorative illumination is deliberately independent from RGB light colors.
    return "#ffe9bc";
  }

  private renderPendant(on: boolean, brightness: number = 75, emission = "#fff4dd") {
    // The pendant keeps its signature silhouette. Its light and metallic details
    // follow the selected ControlRoom palette instead of hardcoded purple.
    const theme = this.crResolvedTheme();
    const accent = "#ffe7b5";
    const glowStrength = Math.min(0.72, Math.max(0.30, brightness / 145));
    const metal = theme.light ? "#373b43" : "#292b30";
    const metalShadow = theme.light ? "#17191e" : "#101115";
    const rim = theme.light ? "#626873" : "#555963";
    return html`<svg class="pendant" viewBox="0 0 150 180" aria-hidden="true">
      <defs>
        <radialGradient id="cr-ambient-glow">
          <stop offset="0" stop-color=${accent} stop-opacity=${on ? glowStrength : 0}/>
          <stop offset="1" stop-color=${accent} stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="cr-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${rim}/>
          <stop offset=".5" stop-color=${metalShadow}/>
          <stop offset="1" stop-color=${metal}/>
        </linearGradient>
      </defs>
      <ellipse cx="75" cy="127" rx="74" ry="52" fill="url(#cr-ambient-glow)"/>
      <path d="M75 0V54" stroke=${rim} stroke-width="2"/>
      <rect x="69" y="51" width="12" height="12" rx="3" fill=${metalShadow}/>
      <path d="M69 60Q45 69 31 111Q75 127 119 111Q105 69 81 60Z"
        fill="url(#cr-metal)" stroke=${rim}/>
      <ellipse cx="75" cy="111" rx="44" ry="8" fill=${on ? "#b79a6a" : metal}/>
      <ellipse cx="75" cy="112" rx="26" ry="4" fill=${on ? emission : rim} opacity=${on ? "0.95" : "0.35"}/>
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
        <div class="pendant-corner">${this.renderPendant(on>0,avg,this.pendantLightColor(lights))}</div>
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
          <div class="studio-pendant">${this.renderPendant(on>0,avg,this.pendantLightColor(lights))}</div>
        </div>
        <div class="ambient-rooms">
          ${rooms.map(room=>{
            const roomLights=lights.filter(l=>this.getLightRoom(l)===room);
            const roomOn=roomLights.filter(l=>l.state==="on").length;
            return html`<button type="button" class="ambient-room ${roomOn?"illuminated":""}"
              @click=${()=>{this.selectedRoom=room;this.openLightColorId="";this.lightsTab="lights";}}>
              <span class="ambient-room-glow"></span>
              <span class="ambient-room-art" aria-hidden="true">${this.lightingDiorama(room,roomOn>0)}</span>
              <span class="ambient-room-details"><span class="ambient-room-name">${room}</span>
              <span class="ambient-room-count"><span class="ambient-room-status ${roomOn?"is-on":""}"></span>${roomOn} / ${roomLights.length} ${this.getLanguage()==="de"?"an":this.getLanguage()==="pt"?"acesas":"on"}</span></span>
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
          <div class="brand-symbol" aria-label="ControlRoom">
            <svg viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
              <path d="M24 3 40 12v18L24 44 8 34V16Z" fill="none" stroke="#d7b783" stroke-width="2.5" stroke-linejoin="round"/>
              <path d="M30 15 22 11 14 18v14l10 7" fill="none" stroke="#f5f0e9" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 22h9v9l-8 5" fill="none" stroke="#d7b783" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="32" cy="22" r="2" fill="#f5f0e9"/>
            </svg>
          </div>
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

    {id:"black-gold-royal",name:"Black & Gold · Imperial",accent:"#D9B76E",bg:"#050505",surface:"#18140D",text:"#E8C77D"},
    {id:"black-bordeaux-royal",name:"Black & Bordeaux · Prestige",accent:"#C35B76",bg:"#050505",surface:"#1B0D13",text:"#E3A0B1"},
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
    // Signature collections: contrasting ink, metals, jewels, pastels and unexpected pairings.
    // The text color is deliberately a design choice, not always white or charcoal.
    ...(() => {
      const signatures: Array<[string,string,string,string,string]> = [
        ["Black & Gold","#d9b765","#090909","#201b13","#f2d58d"],
        ["Bordeaux & Gold","#e5bf75","#2b091b","#49172c","#f5d99a"],
        ["Onyx & Platinum","#c9d1d8","#090b0e","#22272c","#e8edf2"],
        ["Silver Monochrome","#555d67","#e2e5e8","#f9fafb","#222830"],
        ["Scarlet Opera","#ffb3a6","#690b16","#a51928","#fff0e8"],
        ["Sunflower Silk","#785016","#fff19c","#fffbd8","#44300e"],
        ["Golden Hour","#53320b","#f5c652","#ffe9a0","#392407"],
        ["Ruby & Champagne","#f3c6a0","#3b0818","#681b31","#ffe2c0"],
        ["Emerald & Brass","#d8b76e","#08251e","#174437","#f0d79c"],
        ["Cobalt & Copper","#e6a676","#0a1a59","#203b82","#f5d3b5"],
        ["Ivory & Ink","#242a34","#f8f1e5","#fffdf8","#23262c"],
        ["Midnight & Neon","#7dffcf","#080e18","#142432","#d8fff1"],
        ["Cherry Lacquer","#ffc4bf","#530914","#8f1c2d","#ffe5e2"],
        ["Citrus Noir","#e7ee5b","#11160c","#30391a","#f3f5b4"],
        ["Lavender & Espresso","#dfc2f8","#261621","#4c3048","#f8e4ff"],
        ["Coral & Teal","#ff9a80","#092e37","#155263","#ffe4d6"],
        ["Rose & Chocolate","#6b2e45","#f4d6d9","#fff1e9","#562d3b"],
        ["Copper Foundry","#efad78","#20100c","#4b271c","#ffe0b7"],
        ["Pistachio Cream","#496633","#e9f2ca","#fafbed","#304629"],
        ["Ultramarine Pop","#ffd25d","#1429a8","#344bdb","#fff2bc"],
        ["Crimson & Ivory","#fff1d9","#8c1323","#b8323b","#fff3e1"],
        ["Aubergine & Lime","#d4f77a","#26102d","#4a2354","#edffb3"],
        ["Teal & Champagne","#eacba1","#07373b","#17585b","#fff0d8"],
        ["Blush & Burgundy","#7a2642","#f9dfe6","#fff3f5","#672039"],
        ["Ice & Vermilion","#c53c28","#e9f5ff","#ffffff","#233747"],
        ["Saffron & Charcoal","#ffcb45","#17191d","#303338","#ffedb6"],
        ["Peacock & Gold","#e5c477","#062a38","#145267","#ffe5a4"],
        ["Lilac & Cobalt","#3454aa","#e8ddff","#f7f2ff","#30305e"],
        ["Moss & Rose Gold","#eab7a5","#1a291b","#354934","#f8d8c8"],
        ["Porcelain & Brass","#8b662b","#f9f8f3","#ffffff","#403625"],
        ["Vermilion Studio","#ffe1a5","#a72616","#d54a28","#fff1d6"],
        ["Butter & Graphite","#292d35","#ffe778","#fff5bd","#292d35"],
        ["Fuchsia Night","#ff85e1","#210b28","#4b1b4b","#ffe3f8"],
        ["Cerulean & Sand","#e7c28c","#073e73","#176299","#fff1d5"],
        ["Olive & Terracotta","#bc6248","#eee9d0","#faf7e7","#463c29"],
        ["Tangerine & Navy","#ffae57","#0b1a31","#1b3552","#ffe3bd"],
        ["Mint & Espresso","#163e34","#bff4d8","#e5fff0","#173a32"],
        ["Plum & Copper","#df9a71","#290e24","#51203e","#ffe0c9"],
        ["Arctic & Electric","#294bff","#e9f1ff","#ffffff","#1b2c5d"],
        ["Bronze & Midnight","#c59b5c","#101b24","#293943","#f0d4a1"],
        ["Racing Green & Cream","#f2dfb1","#052e20","#17533a","#fff1cc"],
        ["Petal & Graphite","#33333b","#f9c7d8","#ffe6ee","#3b2630"],
        ["Lemon & Ink","#f4ed53","#11151d","#2a303b","#fffda9"],
        ["Indigo & Apricot","#ffb989","#211747","#42316b","#ffe6d3"],
        ["Wine & Sage","#d7e6b1","#40182d","#63324b","#f0f4d5"],
        ["Pearl & Black","#151515","#f5f5f2","#ffffff","#151515"],
        ["Steel & Amber","#e5a645","#29313a","#44505c","#ffdfa5"],
        ["Lagoon & Flamingo","#ff9fae","#073b42","#15616b","#ffe4ea"],
        ["Marigold & Plum","#ffc54d","#281126","#4d2649","#ffe7aa"],
        ["Dusty Blue & Rust","#a94d33","#dbe6ed","#f5f8f9","#293b4b"],
        ["Brick & Mint","#b7ffe4","#512319","#7b3b2a","#dcfff1"],
        ["Chocolate & Vanilla","#cfa56b","#24180f","#463023","#ffe9c9"],
        ["Turquoise & Ink","#53eadb","#0a1520","#163344","#d5fff8"],
        ["Poppy & Cream","#b72e28","#fff0df","#fffaf3","#4e3028"],
        ["Amethyst & Gold","#e5c578","#20102d","#40274e","#ffe7b0"],
        ["Slate & Coral","#ff9c89","#182b3a","#32475a","#ffe5df"],
        ["Jade & Ivory","#205747","#d9f4e9","#f7fffb","#183c32"],
        ["Papaya & Orchid","#6e2b71","#ffd8b0","#fff0db","#552d55"],
        ["Violet & Chartreuse","#e4fa7d","#2e1649","#553070","#f4ffc2"],
        ["Flame & Carbon","#ff734b","#111214","#302222","#ffe1ce"],
      ];
      // Each subsequent collection changes the background and surface, not just the accent.
      // The permutation spreads signature families across every page instead of repeating triples.
      const families=["Signature"];
      const hex=(value:string)=>[1,3,5].map(k=>parseInt(value.slice(k,k+2),16));
      const rgb=(values:number[])=>`#${values.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("")}`;
      const mix=(a:string,b:string,t:number)=>rgb(hex(a).map((v,k)=>v*(1-t)+hex(b)[k]*t));
      // Each signature appears once per collection. Families change the whole visual
      // composition, not just a tiny opacity shift. IDs stay stable for saved themes.
      const generated=Array.from({length:signatures.length},(_,i)=>{
        const signature=signatures[i%signatures.length];
        const family=Math.floor(i/signatures.length);
        const [name,accent,bg,surface,text]=signature;
        const mode=family%9;
        const variants:[number,number,number][]=[
          [0,0,0], [.13,.27,.16], [.28,.49,.28], [.43,.15,.42],
          [.08,.61,.08], [.35,.37,.54], [.56,.21,.22], [.20,.73,.40], [.47,.56,.10]
        ];
        const [accentBlend,bgBlend,surfaceBlend]=variants[mode];
        // Stronger variations distinguish Velvet, Lacquer, Satin etc. even at thumbnail size.
        const accent2=mix(accent,text,accentBlend);
        const bg2=mix(bg,surface,bgBlend);
        const surface2=mix(surface,bg,surfaceBlend);
        const finalAccent=family>=9?mix(accent2,bg,(family-8)*.018):accent2;
        const finalBg=family>=9?mix(bg2,surface,(family-8)*.032):bg2;
        const finalSurface=family>=9?mix(surface2,bg,(family-8)*.024):surface2;
        return {id:`signature-${String(i+1).padStart(4,"0")}`,name:`${name} · ${families[family%families.length]} ${String(i+1).padStart(4,"0")}`,accent:finalAccent,bg:finalBg,surface:finalSurface,text};
      });
      return generated;
    })(),
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
    const fallback=ha?(dark?{accent:"#75a7dc",bg:"#141a22",surface:"#252d37",text:"#f4f6fa",muted:"#b7c0cc"}:{accent:"#386da6",bg:"#f5f6f9",surface:"#ffffff",text:"#202733",muted:"#586474"}):{accent:palette.accent,bg:palette.bg,surface:palette.surface,text:palette.text,muted:palette.text};
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
    const muted=ha?pick(fallback.muted,"secondary-text-color","disabled-text-color"):fallback.muted;
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
    const safeMuted=ha?(mutedRatio<3?((surfaceLum??(light?1:0))>0.18?"#485363":"#bfc8d4"):muted):muted;
    return {accent,bg,surface,fg:safeFg,bgFg,muted:safeMuted,onAccent,light,ha,resolve,pick,neutralBg,neutralSurface,neutralButton,neutralButtonText};
  }
  private crThemeVars(){
    const t=this.crResolvedTheme();
    const radius=this.crThemeStyle==="minimal"?"9px":this.crThemeStyle==="solid"?"15px":"22px";
    const css:Record<string,string>={
      "--cr-font-scale":String(this.crFontSize/100),"--cr-accent":t.accent,"--cr-bg":t.bg,"--cr-surface":t.surface,"--cr-text":t.fg,"--cr-bg-text":t.bgFg,"--cr-on-accent":t.onAccent,"--cr-muted":t.muted,"--cr-secondary":`color-mix(in srgb, ${t.fg} 77%, ${t.accent} 23%)`,
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
  private async loadRemoteCRTheme(){
    const user=this.hass?.user?.id;
    if(!user || !this.hass?.callWS || this.crRemoteLoading)return;
    this.crRemoteLoading=true;
    try{
      this.crRestoreFont(user);
      const result=await this.hass.callWS({type:"controlroom_preferences/get"}) as Record<string,unknown>;
      if(this.hass?.user?.id!==user)return;
      const valid=(v:unknown)=>typeof v==="string" && this.crPalettes().some(p=>p.id===v);
      const style=(v:unknown):v is "glass"|"solid"|"minimal"=>v==="glass"||v==="solid"||v==="minimal";
      if(valid(result.theme))this.crTheme=result.theme as string;
      if(style(result.style))this.crThemeStyle=result.style;
      if(valid(result.default_theme))this.crDefaultTheme=result.default_theme as string;
      if(style(result.default_style))this.crDefaultStyle=result.default_style;
      const remoteFont=this.crValidFont(result.font_size);
      if(remoteFont!==null){this.crFontSize=remoteFont;try{localStorage.setItem(this.crFontCacheKey(user),String(remoteFont));}catch{ /* storage blocked */ }}
      this.cacheVerifiedTheme(user);
      this.crRemoteUser=user;this.crRemoteReady=true;
      this.requestUpdate();
    }catch(error){
      // Integration missing: retain local settings, retry after a later HA reload.
      this.crRemoteUser=user;
      this.crRemoteReady=true;
      this.requestUpdate();
      console.warn("ControlRoom Preferences: install/configure integration",error);
    }finally{this.crRemoteLoading=false;}
  }
  private async persistRemoteCRTheme(makeDefault=false){
    if(!this.hass?.callWS || !this.hass.user?.id){
      this.crDefaultFeedback="Home Assistant Verbindung erforderlich";return false;
    }
    this.crRemoteSaving=true;
    try{
      await this.hass.callWS({type:"controlroom_preferences/set",theme:this.crTheme,style:this.crThemeStyle,default:makeDefault});
      this.crRemoteReady=true;
      this.cacheVerifiedTheme(this.hass.user.id);
      if(makeDefault){this.crDefaultTheme=this.crTheme;this.crDefaultStyle=this.crThemeStyle;}
      this.crDefaultFeedback=makeDefault?"Als Standard gespeichert ✓":"Gespeichert ✓";
      this.requestUpdate();return true;
    }catch(error){
      this.crDefaultFeedback="Synchronisierung fehlgeschlagen – ControlRoom Preferences prüfen";
      console.warn("ControlRoom Preferences: save failed",error);
      this.requestUpdate();return false;
    }finally{this.crRemoteSaving=false;}
  }
  private cancelCRTheme(){
    if(this.crThemeSnapshot){
      const v=JSON.parse(this.crThemeSnapshot);
      this.crTheme=v.theme;this.crThemeStyle=v.style;
      this.crThemeSource="controlroom";this.crHATheme="";this.crHAMode="auto";
      try{localStorage.setItem("controlroom-theme-v1",this.crThemeSnapshot);}catch(error){console.warn(error);}
    }
    this.crDefaultFeedback="";
    this.settingsSection="overview";
  }
  private previewAndPersistCRTheme(){
    try{localStorage.setItem("controlroom-theme-v1",JSON.stringify(this.crThemeData()));}
    catch(error){console.warn("ControlRoom: theme preview could not be persisted",error);}
    this.crDefaultFeedback="";
    this.requestUpdate();
  }
  private async saveCRTheme(){
    if(!(await this.persistRemoteCRTheme(false)))return;
    try{localStorage.setItem("controlroom-theme-v1",JSON.stringify(this.crThemeData()));}catch(error){console.warn(error);}
    this.crThemeSnapshot=JSON.stringify(this.crThemeData());this.settingsSection="overview";
  }
  private async setCRThemeAsDefault(){
    if(!(await this.persistRemoteCRTheme(true)))return;
    const payload=JSON.stringify(this.crThemeData());
    try{localStorage.setItem("controlroom-theme-default-v1",payload);localStorage.setItem("controlroom-theme-v1",payload);}catch(error){console.warn(error);}
    this.crThemeSnapshot=payload;
  }
  private renderThemeSettings(){
    // Show only one entry per visually equivalent palette; keep the selected palette visible.
    const rawPalettes=this.crPalettes();
    const seen=new Set<string>();
    const all=rawPalettes.filter(p=>{
      const key=[p.accent,p.bg,p.surface,p.text].map(v=>v.toLowerCase()).join("|");
      if(seen.has(key) && p.id!==this.crTheme)return false;
      seen.add(key);return true;
    });
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
      <div class="cr-atelier-heading"><button class="cr-atelier-back" type="button" title="Zurück zu Einstellungen" aria-label="Zurück zu Einstellungen" @click=${()=>this.cancelCRTheme()}>${this.renderIcon("mdi:arrow-left")}</button><div><div class="cr-room-kicker">CONTROLROOM · DESIGN COLLECTION</div><h2>Theme Atelier</h2><p>${all.length} Farbwelten · Dein persönlicher Look.</p></div></div>
      <div class="cr-theme-current"><span class="cr-theme-current-swatch" style=${`background:linear-gradient(135deg,${selected.bg},${selected.surface} 58%,${selected.accent})`}></span><span><small>AKTUELLE AUSWAHL</small><strong>${selected.name}</strong><small>${this.crThemeStyle==="glass"?"Glass Premium":this.crThemeStyle==="solid"?"Modern Solid":"Minimal"}</small></span><span class="cr-current-default-indicator">${this.crDefaultTheme===this.crTheme && this.crDefaultStyle===this.crThemeStyle?html`★ Standard`:nothing}</span></div>
      ${this.crDefaultFeedback?html`<div class="cr-default-feedback" role="status">${this.crDefaultFeedback}</div>`:nothing}
      <section class="cr-style-gallery" aria-label="Visual Style"><div class="cr-style-gallery-head"><span class="cr-room-kicker">OBERFLÄCHEN · LIVE-VORSCHAU</span><h3>Visual Style</h3><p>Wähle die Oberfläche – die Vorschau übernimmt deine aktuelle Farbwelt.</p></div><div class="cr-theme-style-list">${([['glass','Glass Premium','Transparenz und weiche Glaseffekte'],['solid','Modern Solid','Klare, elegante Oberflächen'],['minimal','Minimal','Reduziert und kompakt']] as const).map(([id,title,desc])=>html`<button type="button" class="cr-style-option ${id} ${this.crThemeStyle===id?'chosen':''}" aria-pressed=${this.crThemeStyle===id?'true':'false'} @click=${()=>{this.crThemeStyle=id;this.previewAndPersistCRTheme();}}><span class="cr-style-scene"><span class="cr-style-scene-header"><i></i><i></i><i></i></span><span class="cr-style-scene-body"><span class="cr-style-scene-main"><i></i><i></i><i></i></span><span class="cr-style-scene-side"><i></i><i></i></span></span></span><span class="cr-style-option-info"><strong>${title}</strong><small>${desc}</small></span>${this.crThemeStyle===id?html`<span class="cr-style-selected">${this.renderIcon("mdi:check-circle")}</span>`:nothing}</button>`)}</div></section>
      <div class="cr-theme-tools"><label class="cr-theme-search">${this.renderIcon("mdi:magnify")}<input type="search" placeholder="Farbwelt suchen …" .value=${this.crThemeSearch} @input=${(e:Event)=>{this.crThemeSearch=(e.target as HTMLInputElement).value;this.crThemePage=0;}} /></label><div class="cr-theme-filters">${([['all','Alle'],['favorites','Klassiker'],['dark','Dunkel'],['light','Hell']] as const).map(([id,name])=>html`<button class=${this.crThemeFilter===id?'active':''} @click=${()=>{this.crThemeFilter=id;this.crThemePage=0;}}>${name}</button>`)}</div></div>
      <div class="cr-theme-collection-heading"><h3>Farbwelten</h3><span>${filtered.length} Designs · Seite ${page+1} / ${pages}</span></div>
      <div class="cr-theme-grid">${visible.map(p=>html`<button class="cr-theme-choice ${this.crTheme===p.id?'chosen':''}" @click=${()=>{this.crTheme=p.id;this.crThemeSource="controlroom";this.previewAndPersistCRTheme();}}><span class="cr-theme-preview" style=${`background:${p.bg};color:${p.text}`}><span style=${`background:${p.accent}`}></span><i style=${`background:${p.surface};color:${p.text}`}></i><i style=${`background:${p.surface};color:${p.text}`}></i><em class="cr-theme-sample-text" style=${`color:${p.text}`}>Aa</em><b class="cr-theme-sample-action" style=${`background:${p.accent};border:1px solid ${p.text}55`}></b></span><strong>${p.name}</strong>${this.crTheme===p.id?this.renderIcon("mdi:check-circle"):nothing}</button>`)}</div>
      ${filtered.length===0?html`<p class="settings-note">Keine Farbwelt gefunden. Probiere einen anderen Suchbegriff.</p>`:nothing}
      ${pages>1?html`<nav class="cr-theme-pagination" aria-label="Farbwelten Seiten"><button class="cr-page-nav cr-atelier-page-button" ?disabled=${page===0} @click=${()=>{this.crThemePage=Math.max(0,page-1);}}><span>Zurück</span></button><div class="cr-page-center"><span class="cr-page-eyebrow">KOLLEKTION</span><label class="cr-page-select"><select aria-label="Seite auswählen" .value=${String(page)} @change=${(e:Event)=>{this.crThemePage=Number((e.target as HTMLSelectElement).value);}}>${Array.from({length:pages},(_,i)=>html`<option value=${String(i)}>Seite ${i+1} / ${pages}</option>`)}</select>${this.renderIcon("mdi:chevron-down")}</label><div class="cr-page-progress"><span style=${`width:${((page+1)/pages)*100}%`}></span></div></div><button class="cr-page-nav cr-atelier-page-button" ?disabled=${page>=pages-1} @click=${()=>{this.crThemePage=Math.min(pages-1,page+1);}}><span>Weiter</span></button></nav>`:nothing}

      <div class="cr-theme-actions"><span class="cr-theme-action-caption">${selected.name}${this.crDefaultTheme===this.crTheme && this.crDefaultStyle===this.crThemeStyle?" · Standard":""}</span><button type="button" class="cr-set-default" @click=${()=>this.setCRThemeAsDefault()}>${this.renderIcon(this.crDefaultTheme===this.crTheme && this.crDefaultStyle===this.crThemeStyle?"mdi:star":"mdi:star-outline")} ${this.crDefaultTheme===this.crTheme && this.crDefaultStyle===this.crThemeStyle?"Als Standard gespeichert":"Als Standard festlegen"}</button><button @click=${()=>this.cancelCRTheme()}>Abbrechen</button><button @click=${()=>this.saveCRTheme()}>Speichern</button></div>
    </div>`;
  }

  private lightingDiorama(name:string, illuminated=false) {
    const normalized=name.trim().toLocaleLowerCase('de-DE');
    const unknown=!normalized || /^(ohne raum|unassigned|unknown|sem ambiente|no room)$/.test(normalized);
    const kind=unknown ? 'generic' : this.roomKind(name);
    const fallback=this.roomKind(name.replace(/raum$/i,'zimmer'));
    const art=LIGHT_ROOM_TRANSPARENT[kind] || LIGHT_ROOM_TRANSPARENT[fallback] || LIGHT_ROOM_TRANSPARENT.generic;
    return html`<span class="cr-light-object-wrap"><img class="cr-light-object" src=${art} alt="" loading="lazy" decoding="async" /><span class="cr-light-emission" aria-hidden="true"></span></span>`;
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

  // V35: original, lightweight vector interiors. No external images or network requests.
  private roomArt(areaId:string,name:string,premiumLighting=false) {
    const kind=this.roomKind(name);
    const interiors:Record<string,string>={
      wohnzimmer:`<path d="M65 120h195v39H65z" fill="#716d5b"/><rect x="78" y="89" width="164" height="53" rx="13" fill="#a99b7e"/><rect x="89" y="99" width="65" height="36" rx="8" fill="#c3b69a"/><rect x="164" y="99" width="65" height="36" rx="8" fill="#c3b69a"/><path d="M79 135v17m161-17v17" stroke="#5c4e43" stroke-width="7"/><path d="M280 56v84" stroke="#b4a18a" stroke-width="5"/><path d="M263 74q18-32 35 0z" fill="#302f31"/><ellipse cx="280" cy="76" rx="19" ry="4" fill="#ffdda1"/><path d="M29 144v-40" stroke="#7d6753" stroke-width="6"/><path d="M29 109q-37-19-12-42 25 6 12 42m0 0q6-42 31-38 10 28-31 38" fill="#657d55"/><rect x="14" y="137" width="31" height="25" rx="5" fill="#98816c"/><rect x="121" y="148" width="78" height="9" rx="5" fill="#6d5342"/>`,
      badezimmer:`<rect x="71" y="106" width="176" height="54" rx="7" fill="#8d8274"/><rect x="82" y="114" width="155" height="15" rx="7" fill="#d7cdbb"/><path d="M157 119v-19q0-11 10-11t10 11" stroke="#d4c3a3" stroke-width="5" fill="none"/><circle cx="165" cy="67" r="42" fill="#272c2a" stroke="#b9a17a" stroke-width="5"/><circle cx="165" cy="67" r="35" fill="#7e897f" opacity=".27"/><path d="M265 65v86" stroke="#bba98f" stroke-width="5"/><path d="M265 79h28v54h-28" fill="#d5c8ad"/><rect x="34" y="142" width="34" height="24" rx="5" fill="#9a8570"/><path d="M50 143q-30-30-8-50 22 18 8 50m0 0q5-37 26-34 8 22-26 34" fill="#657f5e"/>`,
      schlafzimmer:`<rect x="58" y="78" width="204" height="67" rx="12" fill="#756759"/><rect x="66" y="104" width="190" height="50" rx="9" fill="#c2b19b"/><rect x="72" y="98" width="80" height="27" rx="9" fill="#eee0c5"/><rect x="164" y="98" width="80" height="27" rx="9" fill="#eee0c5"/><path d="M67 149v13m186-13v13" stroke="#56483d" stroke-width="7"/><rect x="15" y="122" width="38" height="29" rx="3" fill="#7a6552"/><rect x="270" y="122" width="38" height="29" rx="3" fill="#7a6552"/><path d="M34 119V88m254 31V88" stroke="#c0a88a" stroke-width="4"/><path d="M18 91q16-28 32 0zm254 0q16-28 32 0z" fill="#3e3b39"/><ellipse cx="34" cy="93" rx="16" ry="4" fill="#f9d79e"/><ellipse cx="288" cy="93" rx="16" ry="4" fill="#f9d79e"/>`,
      kuche:`<rect x="24" y="88" width="273" height="70" rx="5" fill="#64665b"/><rect x="24" y="88" width="273" height="12" rx="3" fill="#c7b9a3"/><path d="M94 103v53m85-53v53m-85-27h85m0-27v53" stroke="#999483" stroke-width="2"/><rect x="75" y="118" width="65" height="35" rx="2" fill="#494b45"/><path d="M102 23v35m108-35v35" stroke="#b6a994" stroke-width="3"/><path d="M78 68q24-38 48 0zm108 0q24-38 48 0z" fill="#343536"/><ellipse cx="102" cy="69" rx="24" ry="5" fill="#f9d79e"/><ellipse cx="210" cy="69" rx="24" ry="5" fill="#f9d79e"/><rect x="252" y="71" width="23" height="17" rx="3" fill="#a69b83"/>`,
      esszimmer:`<ellipse cx="164" cy="120" rx="100" ry="21" fill="#8e6b51"/><path d="M157 131v35m-34 0h70" stroke="#79563f" stroke-width="9"/><path d="M164 17v38" stroke="#aea39a" stroke-width="3"/><path d="M126 73q38-56 76 0z" fill="#393a39"/><ellipse cx="164" cy="74" rx="38" ry="7" fill="#ffdda1"/><path d="M46 120v35m0-32q-23-13-31 10v25m267-35q23-13 31 10v25" stroke="#897963" stroke-width="8" fill="none"/><rect x="134" y="103" width="24" height="10" rx="5" fill="#d2b69b"/>`,
      flur:`<rect x="40" y="128" width="246" height="12" rx="3" fill="#8f735d"/><path d="M61 139v26m203-26v26" stroke="#745945" stroke-width="7"/><rect x="110" y="38" width="94" height="84" rx="44" fill="#78877d" opacity=".35" stroke="#d4b38b" stroke-width="5"/><path d="M264 28v30" stroke="#a99d86" stroke-width="3"/><path d="M249 59q15-28 30 0z" fill="#373637"/><ellipse cx="264" cy="61" rx="15" ry="4" fill="#ffdda1"/><rect x="62" y="110" width="23" height="17" rx="3" fill="#b9a58d"/><path d="M73 112q-25-26-8-42 17 13 8 42m0 0q6-29 25-24 5 19-25 24" fill="#70845f"/>`,
      balkon:`<path d="M16 115h294m-270 0v48m42-48v48m42-48v48m42-48v48m42-48v48m42-48v48m42-48v48" stroke="#988b77" stroke-width="5"/><path d="M112 112q18-42 63-25l-9 54h-64z" fill="#b6a58d"/><path d="M116 143v19m45-21v21" stroke="#7c6653" stroke-width="7"/><rect x="194" y="133" width="57" height="9" rx="4" fill="#99785c"/><path d="M221 141v22" stroke="#99785c" stroke-width="6"/><rect x="44" y="140" width="32" height="23" rx="4" fill="#98836b"/><path d="M60 141q-39-42-12-61 23 20 12 61m0 0q10-46 35-32 4 24-35 32" fill="#6c845f"/><path d="M278 36v31" stroke="#b8a88f" stroke-width="3"/><path d="M263 70q15-25 30 0z" fill="#3b3b3b"/><ellipse cx="278" cy="71" rx="15" ry="4" fill="#ffdda1"/>`
    };
    // Detailed, layered SVG miniatures exclusively for Startseite > Lichter.
    // Bereiche > Räume continues using its original independent illustrations.
    const premium:Record<string,string>={
      badezimmer:`<ellipse cx="172" cy="164" rx="135" ry="10" fill="#050b09" opacity=".27"/>
        <path d="M66 111h188v12H66z" fill="#e0d4bf"/><path d="M73 123h174v40H73z" fill="#786e60"/><path d="M73 123h174v5H73z" fill="#aa9b83"/><path d="M160 129v34" stroke="#554d43" opacity=".5"/><path d="M73 161h174" stroke="#413b34" stroke-width="3"/>
        <ellipse cx="164" cy="117" rx="47" ry="10" fill="#f1e8d8"/><ellipse cx="164" cy="115" rx="31" ry="5" fill="#b8b4a8"/><path d="M164 113V99q0-9 8-9t8 9" fill="none" stroke="#bda47a" stroke-width="4"/>
        <circle cx="164" cy="59" r="45" fill="#171e1c" stroke="#dbc19a" stroke-width="7"/><circle cx="164" cy="59" r="37" fill="#5e6e66" opacity=".27"/><path d="M139 33q23-13 43 0" fill="none" stroke="#fff6dc" stroke-opacity=".17" stroke-width="4"/>
        <path d="M277 72v79" stroke="#ae9471" stroke-width="5"/><path d="M278 85h24v51h-24" fill="#d5c3a8"/><path d="M278 85h24v6h-24" fill="#f5e7d0"/>
        <rect x="31" y="141" width="33" height="23" rx="5" fill="#a28a71"/><path d="M47 143q-33-27-13-50 25 13 13 50m0 0q6-36 30-33 7 24-30 33" fill="#677f5d"/><rect x="221" y="99" width="11" height="13" rx="2" fill="#c7b89b"/><rect x="223" y="96" width="7" height="4" rx="1" fill="#d9c6a1"/>`,
      wohnzimmer:`<ellipse cx="166" cy="164" rx="155" ry="11" fill="#050b09" opacity=".25"/>
        <path d="M72 107q0-23 23-23h134q23 0 23 23v42H72z" fill="#847964"/><rect x="81" y="101" width="164" height="49" rx="13" fill="#b7a88c"/><rect x="89" y="105" width="70" height="36" rx="10" fill="#cfc1a4"/><rect x="166" y="105" width="70" height="36" rx="10" fill="#c8b89b"/>
        <path d="M73 118q-15-3-15 12v19q0 10 12 10h183q13 0 13-11v-19q0-15-15-12v27H73z" fill="#9b8d76"/><path d="M85 159v7m163-7v7" stroke="#655342" stroke-width="6"/><path d="M190 114l26-6 13 27-29 4z" fill="#734f54"/><path d="M103 112l23-6 14 27-30 5z" fill="#e0c6a3"/>
        <path d="M282 149V69q0-48-41-48" fill="none" stroke="#252624" stroke-width="5"/><path d="M224 45q17-29 35 0z" fill="#2a2c2a" stroke="#6b665b" stroke-width="1.5"/><ellipse cx="241" cy="45" rx="18" ry="4" fill="#ffe4ad"/>
        <ellipse cx="170" cy="150" rx="45" ry="10" fill="#805c44"/><path d="M144 156v10m52-10v10" stroke="#614631" stroke-width="4"/><rect x="166" y="137" width="9" height="13" rx="2" fill="#e7d5b6"/><path d="M170 138q-5-7 1-11 5 6-1 11" fill="#ffe7a6"/>
        <rect x="20" y="140" width="31" height="24" rx="5" fill="#777d68"/><path d="M36 142q-36-29-19-52 26 8 19 52m0 0q7-48 36-42 6 27-36 42m0 0q-9-45-28-34-3 20 28 34" fill="#4d6848"/>`
    };
    const art=interiors[kind] || `<circle cx="165" cy="82" r="51" fill="#9e927d" opacity=".35"/><path d="M103 91l62-54 62 54v65H103z" fill="#8f8774"/><path d="M145 156v-40h40v40" fill="#514b43"/>`;
    return html`<svg class="cr-room-illustration" viewBox="0 0 330 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label=${`Illustration: ${name}`} preserveAspectRatio="xMidYMid meet">
      <defs><radialGradient id=${`cr-light-${areaId}`} cx="70%" cy="48%" r="55%"><stop offset="0%" stop-color="#ffe9bd" stop-opacity=".25"/><stop offset="100%" stop-color="#ffe9bd" stop-opacity="0"/></radialGradient></defs>
      <path d="M0 157h330" stroke="currentColor" opacity=".12"/>
      <defs>
        <linearGradient id=${`cr-premium-material-${areaId}`} x1="0" y1="0" x2="0.15" y2="1"><stop offset="0" stop-color="#fff5dd" stop-opacity=".16"/><stop offset=".6" stop-color="#fff5dd" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".19"/></linearGradient>
        <filter id=${`cr-premium-shadow-${areaId}`} x="-20%" y="-30%" width="145%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#050a08" flood-opacity=".33"/></filter>
      </defs>
      <g class="cr-room-interior-shapes" filter=${premiumLighting?`url(#cr-premium-shadow-${areaId})`:"none"} .innerHTML=${premiumLighting?(premium[kind]||art):art}></g>
      ${premiumLighting?html`<rect x="0" y="0" width="330" height="180" fill=${`url(#cr-premium-material-${areaId})`} opacity=".35" pointer-events="none"/>`:nothing}
      <ellipse class="cr-room-illustration-light" cx="219" cy="101" rx="133" ry="86" fill=${`url(#cr-light-${areaId})`}/>
    </svg>`;
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
        <div class="cr-room-detail-head"><div><h1>${name}</h1><p>${entities.length} Steuerungen · ${on} von ${lights.length} Lichtern an</p></div>
</div>

        <div class="cr-room-detail-hero"><div class="cr-room-detail-art">${this.roomArt(areaId,name)}</div><div><span>RAUMSTATUS</span><h2>${on?"Gemütlich beleuchtet":"Alles ruhig"}</h2><p>${lights.length} Lampen · ${entities.length} Steuerungen</p><div class="cr-room-actions"><button ?disabled=${!lights.length} @click=${()=>this.roomLightsToggle(lights,true)}>Alle an</button><button ?disabled=${!on} @click=${()=>this.roomLightsToggle(lights,false)}>Alle aus</button></div></div></div>
        <div class="cr-room-sections">${types.map(t=>{
          const members=entities.filter(e=>t.domain==="other"?!types.some(x=>x.domain!=="other"&&e.entity_id.startsWith(x.domain+".")):e.entity_id.startsWith(t.domain+"."));
          return members.length?html`<article class="cr-room-section"><header>${this.renderIcon(t.icon)} <strong>${t.label}</strong><span>${members.length}</span></header>
            ${members.length?members.map(e=>html`<div class="cr-room-device"><div><strong>${String(e.attributes.friendly_name||e.entity_id)}</strong><small>${e.state}</small></div>${["light","switch"].some(d=>e.entity_id.startsWith(d+"."))?html`<button ?disabled=${!["on","off"].includes(e.state)} @click=${()=>this.hass?.callService?.(e.entity_id.split(".")[0],"toggle",{entity_id:e.entity_id})}>${this.renderIcon(e.state==="on"?"mdi:toggle-switch":"mdi:toggle-switch-off-outline")}</button>`:nothing}</div>`):html`<p class="cr-room-empty">Keine Geräte zugeordnet</p>`}</article>`:nothing;
        })}</div>
      </section>`;
    }
    return html`<section class="cr-rooms-page"><div class="cr-rooms-heading"><h1>Räume</h1><p>Dein Zuhause. Jeder Raum, perfekt verbunden.</p></div>
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
    .premium-lights .card-icon { color:var(--cr-accent); }
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
    .pref-modes button.active {background:color-mix(in srgb,var(--cr-accent) 24%,var(--cr-surface));border-color:var(--cr-accent);color:var(--cr-text)}
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
    .studio-hero { position:relative; display:flex; min-height:220px; overflow:hidden; padding:26px 28px; border:0; border-radius:22px; background:linear-gradient(110deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface)); }
    .studio-hero.lit { background:radial-gradient(ellipse at 88% 85%,rgba(223,158,78,.22),transparent 48%),linear-gradient(110deg,color-mix(in srgb,var(--cr-bg) 82%,var(--cr-accent)),var(--cr-surface)); }
    .studio-hero-info { position:relative; z-index:1; width:min(70%,540px); min-width:0; }
    .studio-kicker { font-size:11px; font-weight:700; letter-spacing:.15em; color:var(--cr-muted); }
    .studio-mood { margin:13px 0 4px; font-size:clamp(23px,2.6vw,34px); font-weight:750; letter-spacing:-.045em; color:var(--cr-text); line-height:1.15; }
    .studio-mood-subtitle { color:var(--cr-muted); font-size:12px; line-height:1.5; }
    .studio-hero.lit .studio-mood { text-shadow:0 0 28px rgba(247,194,120,.15); }
    .studio-number { margin:9px 0 13px; font-size:14px; }
    .studio-number strong { font-size:28px; }
    .studio-progress { height:7px; margin-top:20px; background:color-mix(in srgb,var(--cr-accent) 20%,transparent); border:1px solid rgba(255,255,255,.07); border-radius:999px; overflow:hidden; cursor:help; }
    .studio-progress span { display:block; height:100%; border-radius:999px; background:linear-gradient(90deg,var(--cr-accent),var(--cr-text)); box-shadow:0 0 15px color-mix(in srgb,var(--cr-accent) 30%,transparent); transition:width .55s ease; }
    .studio-actions { display:flex; gap:10px; margin-top:19px; }
    .studio-actions button { display:flex; align-items:center; justify-content:center; gap:9px; flex:1; padding:12px; border:1px solid color-mix(in srgb,var(--cr-text) 15%,transparent); border-radius:14px; background:var(--cr-surface); color:var(--cr-text); font-weight:650; cursor:pointer; }
    .studio-actions button:disabled { opacity:.55; cursor:not-allowed; }
    .studio-actions ha-icon { --mdc-icon-size:16px; }
    .studio-pendant { position:absolute; right:30px; top:-21px; width:195px; pointer-events:none; }
    @media (min-width:601px) and (max-width:950px) {
      .studio-pendant {right:-12px; width:clamp(125px,19vw,185px);}
      .studio-hero-info {width:calc(100% - 135px);}
    }

    .ambient-rooms { display:grid; grid-template-columns:repeat(auto-fit,minmax(135px,1fr)); gap:10px; margin-top:14px; }
    .ambient-room { position:relative; display:flex; flex-direction:column; align-items:flex-start; gap:7px; min-height:105px; padding:14px; overflow:hidden; border-radius:16px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.035); color:var(--cr-muted); text-align:left; cursor:pointer; }
    .ambient-room.illuminated { border-color:rgba(231,178,109,.35); }
    .ambient-room-glow { position:absolute; inset:0; pointer-events:none; opacity:0; background:radial-gradient(ellipse at 80% 90%,rgba(255,233,190,.17),transparent 72%); transition:opacity 450ms ease; }
    .ambient-room.illuminated .ambient-room-glow { opacity:1; }
    .ambient-room-icon,.ambient-room-name,.ambient-room-count { position:relative; z-index:1; }
    .ambient-room-icon { color:var(--cr-muted); }
    .ambient-room.illuminated .ambient-room-icon { color:#f4c786; }
    /* V36: Lichter-only illustrated room tiles; Räume layout/settings untouched. */
    .dashboard .ambient-rooms{grid-template-columns:repeat(auto-fill,minmax(min(100%,195px),1fr));gap:13px;margin-top:18px}
    .dashboard .ambient-room{min-height:190px;padding:0;display:flex;flex-direction:column;gap:0;align-items:stretch;border-radius:19px;isolation:isolate;background:color-mix(in srgb,var(--cr-surface) 90%,var(--cr-bg));border:1px solid color-mix(in srgb,var(--cr-text) 12%,transparent);color:var(--cr-text);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}
    .dashboard .ambient-room:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent);box-shadow:0 13px 30px rgba(0,0,0,.13)}
    .dashboard .ambient-room.illuminated{border-color:color-mix(in srgb,var(--cr-accent) 45%,transparent)}
    .dashboard .ambient-room-art{position:relative;z-index:1;display:grid;place-items:center;width:100%;height:132px;overflow:hidden;background:radial-gradient(ellipse at 50% 100%,color-mix(in srgb,var(--cr-accent) 9%,transparent),transparent 75%)}
    .dashboard .ambient-room-art .cr-room-illustration{width:100%;height:100%;max-width:265px;max-height:145px;display:block;pointer-events:none}
    .dashboard .ambient-room-art .cr-room-illustration-light{opacity:0;transition:opacity .3s ease}
    .dashboard .ambient-room.illuminated .ambient-room-art .cr-room-illustration-light{opacity:1}
    .dashboard .ambient-room-details{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:7px;width:100%;padding:12px 15px 14px;border-top:1px solid color-mix(in srgb,var(--cr-text) 7%,transparent)}
    .dashboard .ambient-room-name{font-size:13px;font-weight:700;color:var(--cr-text);line-height:1.25}
    .dashboard .ambient-room-count{display:flex;align-items:center;gap:7px;color:var(--cr-muted);font-size:11px}
    .dashboard .ambient-room-status{width:7px;height:7px;flex:none;border-radius:50%;background:color-mix(in srgb,var(--cr-muted) 70%,transparent)}
    .dashboard .ambient-room-status.is-on{background:var(--cr-accent);box-shadow:0 0 10px var(--cr-accent)}
    @media(max-width:520px){.dashboard .ambient-rooms{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.dashboard .ambient-room{min-height:165px}.dashboard .ambient-room-art{height:110px}.dashboard .ambient-room-details{padding:10px 11px 12px}}
    @media(prefers-reduced-motion:reduce){.dashboard .ambient-room{transition:none}.dashboard .ambient-room-art .cr-room-illustration-light{transition:none}}
    /* V38: original premium rendered dioramas; text and state remain native and live. */
    .dashboard .ambient-rooms{grid-template-columns:repeat(auto-fit,minmax(min(100%,245px),1fr));gap:16px}
    .dashboard .ambient-room{min-height:228px;border-radius:21px;overflow:hidden;background:#15271f;border:1px solid rgba(220,223,188,.23);box-shadow:inset 0 1px rgba(255,255,255,.04)}
    .dashboard .ambient-room-art{height:175px;background:#172b22;display:block;overflow:hidden;isolation:isolate}
    .dashboard .ambient-room-art::after{content:"";position:absolute;inset:35% 0 0;pointer-events:none;background:linear-gradient(to bottom,transparent 5%,rgba(11,27,21,.24) 65%,rgba(11,27,21,.82) 100%);z-index:2}
    .dashboard .ambient-room-art .cr-light-diorama{display:block;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.92) brightness(.87);transition:filter .35s ease,transform .35s ease}
    .dashboard .ambient-room.illuminated .cr-light-diorama{filter:saturate(1.05) brightness(1.06)}
    .dashboard .ambient-room:hover .cr-light-diorama{transform:scale(1.045)}
    .dashboard .ambient-room-glow{opacity:0!important}
    .dashboard .ambient-room-details{background:#14281f;border-top:0;padding:12px 15px 15px;gap:6px}
    .dashboard .ambient-room-name{font-size:calc(15px * var(--cr-font-scale,1));font-weight:700}
    .dashboard .ambient-room-count{font-size:calc(12px * var(--cr-font-scale,1))}
    @media(max-width:520px){.dashboard .ambient-rooms{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.dashboard .ambient-room{min-height:184px}.dashboard .ambient-room-art{height:119px}.dashboard .ambient-room-details{padding:10px 11px 12px}}
    @media(prefers-reduced-motion:reduce){.dashboard .ambient-room-art .cr-light-diorama{transition:none}}

    /* V39: compact responsive lighting cards, real OFF/ON image switching. */
    .dashboard .ambient-rooms{grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:14px}
    .dashboard .ambient-room{min-width:0;min-height:0;border-radius:15px;overflow:hidden;box-shadow:none}
    .dashboard .ambient-room-art{height:auto;aspect-ratio:1.85/1;min-height:0}
    .dashboard .ambient-room-art .cr-light-diorama{filter:none;transform:none}
    .dashboard .ambient-room.illuminated .cr-light-diorama{filter:none}
    .dashboard .ambient-room-art::after{inset:52% 0 0;background:linear-gradient(transparent,rgba(9,25,20,.36))}
    .dashboard .ambient-room-details{padding:9px 11px 10px;gap:4px}
    .dashboard .ambient-room-name{font-size:calc(12px * var(--cr-font-scale,1));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .dashboard .ambient-room-count{font-size:calc(10px * var(--cr-font-scale,1))}
    .dashboard .ambient-room.illuminated{border-color:rgba(239,221,172,.44);box-shadow:0 0 18px rgba(255,231,182,.055)}
    @media(max-width:1100px){.dashboard .ambient-rooms{grid-template-columns:repeat(4,minmax(0,1fr))}}
    @media(max-width:850px){.dashboard .ambient-rooms{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:540px){.dashboard .ambient-rooms{grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.dashboard .ambient-room-art{aspect-ratio:1.7/1}.dashboard .ambient-room-details{padding:8px 9px 9px}}
    /* V40: transparent object miniatures, native theme surface and live warm emission. */
    .dashboard .ambient-room{background:color-mix(in srgb,var(--cr-surface) 86%,var(--cr-bg))!important;border-color:color-mix(in srgb,var(--cr-text) 12%,transparent)!important}
    .dashboard .ambient-room.illuminated{border-color:color-mix(in srgb,var(--cr-accent) 48%,transparent)!important}
    .dashboard .ambient-room-art{background:transparent!important;overflow:visible;isolation:isolate;display:grid;place-items:center}
    .dashboard .ambient-room-art::after{display:none!important}
    .dashboard .cr-light-object-wrap{position:relative;display:block;width:100%;height:100%;min-height:85px;isolation:isolate}
    .dashboard .cr-light-object{display:block;width:100%;height:100%;object-fit:contain;object-position:center;position:relative;z-index:2;filter:drop-shadow(0 7px 5px rgba(0,0,0,.20));transition:filter .35s ease,transform .35s ease}
    .dashboard .cr-light-emission{position:absolute;z-index:1;inset:8% 13% 3%;background:radial-gradient(ellipse at 53% 42%,rgba(255,248,222,.84) 0%,rgba(255,226,158,.45) 34%,rgba(255,213,135,.12) 58%,transparent 82%);filter:blur(9px);opacity:0;transition:opacity .35s ease;pointer-events:none}
    .dashboard .ambient-room.illuminated .cr-light-emission{opacity:1;filter:blur(12px);transform:scale(1.22)}
    .dashboard .ambient-room.illuminated .cr-light-object{filter:drop-shadow(0 7px 5px rgba(0,0,0,.20)) brightness(1.16)}
    .dashboard .ambient-room:hover .cr-light-object{transform:translateY(-2px)}
    .dashboard .ambient-room-details{background:transparent!important;border-top:1px solid color-mix(in srgb,var(--cr-text) 8%,transparent)!important}
    .dashboard .ambient-room-glow{opacity:0!important}
    @media(prefers-reduced-motion:reduce){.dashboard .cr-light-object,.dashboard .cr-light-emission{transition:none}}




    .ambient-room-name { font-size:12px; font-weight:650; }
    .ambient-room-count { color:var(--cr-muted); font-size:11px; }
    @media (prefers-reduced-motion:reduce) { .ambient-room-glow { transition:none; } }
    .studio-tabs { display:grid; grid-template-columns:1fr 1fr; margin:18px 0 12px; padding:4px; border-radius:999px; background:rgba(255,255,255,.035); }
    .studio-tabs button { border:0; padding:9px; border-radius:999px; color:var(--cr-muted); background:transparent; cursor:pointer; }
    .studio-tabs button.active { background:color-mix(in srgb,var(--cr-accent) 20%,var(--cr-surface)); color:var(--cr-text); }
    .room-filters { display:flex; gap:7px; overflow-x:auto; padding-bottom:12px; }
    .room-filters button { white-space:nowrap; padding:7px 12px; border-radius:999px; border:1px solid rgba(255,255,255,.16); background:transparent; color:var(--cr-muted); cursor:pointer; }
    .room-filters button.active { background:color-mix(in srgb,var(--cr-accent) 24%,var(--cr-surface)); color:var(--cr-text); border-color:var(--cr-accent); }
    .studio-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }
    .studio-light { position:relative; min-height:100px; padding:12px; border-radius:18px; border:1px solid rgba(255,255,255,.09); background:rgba(255,255,255,.045); }
    .studio-light.selected { border-color:color-mix(in srgb,var(--cr-accent) 65%,transparent); background:color-mix(in srgb,var(--cr-accent) 14%,transparent); }
    .studio-light.active { box-shadow:inset 0 0 32px rgba(244,190,105,.045); }
    .studio-light-select { display:flex; flex-direction:column; align-items:flex-start; width:100%; height:100%; border:0; background:transparent; color:inherit; cursor:pointer; text-align:left; }
    .studio-light-icon { display:grid; place-items:center; width:30px; height:30px; border-radius:11px; color:var(--cr-muted); background:rgba(255,255,255,.06); }
    .studio-light.active .studio-light-icon { color:var(--cr-accent); background:color-mix(in srgb,var(--cr-accent) 16%,transparent); }
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
    @media (max-width:600px) { .studio-grid { grid-template-columns:1fr; } .studio-hero { padding:22px 18px; } .studio-hero-info { width:80%; } .studio-mood { font-size:23px; } .studio-mood-subtitle { max-width:220px; } .studio-pendant { right:-18px; width:135px; opacity:.85; } }

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
    .smart-settings-open{display:flex;align-items:center;gap:10px;flex:1;text-align:left;background:none;border:0;color:var(--cr-text);cursor:pointer;font:inherit}
    .dashboard .smart-settings-head .smart-settings-open,.dashboard .smart-settings-head .smart-settings-open strong{color:var(--cr-text)!important}
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
    /* V35 living illustrations: compact, theme-aware, GPU-free */
    .dashboard .cr-room-illustration{display:block;width:100%;height:100%;max-width:100%;max-height:100%;overflow:visible;color:var(--cr-text);pointer-events:none}
    .dashboard .cr-room-illustration-light{opacity:0;transition:opacity .22s ease}
    .dashboard .cr-room-lit .cr-room-illustration-light{opacity:1}
    .dashboard .cr-room-tile-art:has(.cr-room-illustration){display:grid!important;place-items:center!important;padding:5px 3px 0!important}
    .dashboard .cr-room-detail-art:has(.cr-room-illustration){display:grid!important;place-items:center!important;padding:8px!important}
    .dashboard .cr-room-tile-art:has(.cr-room-illustration):after{display:none!important}
    @media(prefers-reduced-motion:reduce){.dashboard .cr-room-illustration-light{transition:none}}

    .dashboard .cr-room-lit .cr-room-tile-art{background:color-mix(in srgb,var(--cr-accent) 15%,var(--cr-surface))!important}
    .dashboard .cr-room-tile-art>ha-icon,.dashboard .cr-room-detail-art>ha-icon{color:var(--cr-accent)!important}
    .dashboard .cr-room-tile,.dashboard .cr-room-detail-hero{overflow:hidden}
    .dashboard .cr-room-tile-body,.dashboard .cr-room-tile-footer{background:transparent!important}
    /* Theme Studio v3 — unified icon and control colors */
    .dashboard ha-icon:not(.cr-keep-color),.dashboard .settings-option-icon ha-icon,.dashboard .overview-card ha-icon,.dashboard .nav-item ha-icon,.dashboard .cr-room-section ha-icon{color:var(--cr-accent)!important}
    .dashboard .settings-option-icon,.dashboard .overview-card-icon,.dashboard .card-icon,.dashboard .nav-item.active{color:var(--cr-accent)!important}
    .dashboard button:focus-visible,.dashboard select:focus-visible{outline:2px solid var(--cr-accent)!important;outline-offset:2px}
    .dashboard .cr-theme-actions .cr-set-default{background:var(--cr-surface)!important;color:var(--cr-text)!important;border:1px solid var(--cr-accent)!important;display:inline-flex;align-items:center;gap:7px;font-weight:700}
    .dashboard .cr-theme-actions .cr-set-default *{color:inherit!important}
    @media(max-width:700px){.dashboard .cr-theme-actions{flex-wrap:wrap}.dashboard .cr-theme-actions .cr-theme-action-caption{display:none}.dashboard .cr-theme-actions .cr-set-default{flex:1 1 100%;justify-content:center}}
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


    .dashboard .cr-theme-preview{position:relative;overflow:hidden}
    .dashboard .cr-theme-preview .cr-theme-sample-text{position:absolute;right:13px;top:9px;font:700 14px/1 sans-serif;opacity:.95;z-index:2}
    .dashboard .cr-theme-preview .cr-theme-sample-action{position:absolute;right:13px;bottom:10px;width:28px;height:10px;border-radius:12px;z-index:2}
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
    /* V20: full-width premium pagination, adaptive to mobile and tablets. */
    .dashboard .cr-theme-pagination{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(180px,260px) minmax(0,1fr)!important;align-items:center!important;gap:clamp(8px,2vw,24px)!important;width:100%!important;padding:18px clamp(12px,2vw,24px)!important;box-sizing:border-box!important;margin:16px 0 28px!important;border:1px solid color-mix(in srgb,var(--cr-text) 17%,transparent)!important;border-radius:20px!important;background:color-mix(in srgb,var(--cr-surface) 88%,transparent)!important;box-shadow:0 12px 30px rgba(0,0,0,.08)!important;backdrop-filter:blur(18px)!important}
    .dashboard .cr-theme-pagination .cr-page-nav{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;width:min(100%,210px)!important;padding:13px 18px!important;border-radius:12px!important;font-weight:700!important;background:color-mix(in srgb,var(--cr-accent) 14%,var(--cr-surface))!important;color:var(--cr-text)!important;border:1px solid color-mix(in srgb,var(--cr-accent) 28%,transparent)!important;transition:transform .15s ease,background .15s ease!important}
    .dashboard .cr-theme-pagination .cr-page-nav:last-child{justify-self:end!important}
    .dashboard .cr-theme-pagination .cr-page-nav:not(:disabled):hover{transform:translateY(-2px)!important;background:color-mix(in srgb,var(--cr-accent) 24%,var(--cr-surface))!important}
    .dashboard .cr-theme-pagination .cr-page-center{display:flex!important;align-items:center!important;flex-direction:column!important;gap:7px!important;min-width:0!important}
    .dashboard .cr-theme-pagination .cr-page-eyebrow{font-size:9px!important;font-weight:800!important;letter-spacing:.18em!important;color:var(--cr-muted)!important}
    .dashboard .cr-theme-pagination .cr-page-select{display:flex!important;align-items:center!important;justify-content:center!important;gap:5px!important;color:var(--cr-text)!important;position:relative!important}
    .dashboard .cr-theme-pagination .cr-page-select select{appearance:none!important;background:transparent!important;border:0!important;color:var(--cr-text)!important;font:inherit!important;font-weight:800!important;text-align:center!important;cursor:pointer!important;padding:2px 20px 2px 5px!important;outline-offset:3px!important}
    .dashboard .cr-theme-pagination .cr-page-select select option{background:var(--cr-surface)!important;color:var(--cr-text)!important}
    .dashboard .cr-theme-pagination .cr-page-select ha-icon{position:absolute!important;right:0!important;pointer-events:none!important;--mdc-icon-size:15px!important}
    .dashboard .cr-theme-pagination .cr-page-progress{height:4px!important;width:min(100%,210px)!important;border-radius:20px!important;background:color-mix(in srgb,var(--cr-text) 13%,transparent)!important;overflow:hidden!important}
    .dashboard .cr-theme-pagination .cr-page-progress span{display:block!important;height:100%!important;border-radius:20px!important;background:var(--cr-accent)!important;transition:width .2s ease!important}
    @media(max-width:550px){.dashboard .cr-theme-pagination{grid-template-columns:1fr auto 1fr!important;padding:12px 8px!important;gap:5px!important}.dashboard .cr-theme-pagination .cr-page-nav{padding:11px 6px!important;font-size:12px!important;gap:3px!important}.dashboard .cr-theme-pagination .cr-page-select select{font-size:12px!important}.dashboard .cr-theme-pagination .cr-page-eyebrow{font-size:8px!important}}

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

    .dashboard .cr-current-default-button{margin-left:auto;flex-shrink:0;display:inline-flex;align-items:center;gap:6px;padding:9px 12px;border:1px solid var(--cr-accent);border-radius:12px;background:var(--cr-surface);color:var(--cr-text);font-weight:700;cursor:pointer;position:relative;z-index:2}
    .dashboard .cr-current-default-button *{color:inherit!important}
    .dashboard .cr-default-feedback{margin:10px 0 0;padding:11px 14px;border:1px solid var(--cr-accent);border-radius:12px;background:var(--cr-surface);color:var(--cr-text);font-weight:700}
    @media(max-width:550px){.dashboard .cr-current-default-button{padding:9px}.dashboard .cr-current-default-button span{display:none}}
    /* V22: Visual Style gallery, with responsive live previews */
    .dashboard .cr-theme-studio-v17{container-type:inline-size;min-width:0!important;width:100%!important;max-width:none!important;box-sizing:border-box!important}
    .dashboard .cr-style-gallery{margin:22px 0 26px;min-width:0}
    .dashboard .cr-style-gallery-head{margin-bottom:15px}
    .dashboard .cr-style-gallery-head h3{margin:5px 0 4px;font-size:19px;color:var(--cr-text)!important}
    .dashboard .cr-style-gallery-head p{margin:0;font-size:12px;color:var(--cr-muted)!important;line-height:1.5}
    .dashboard .cr-style-gallery .cr-theme-style-list{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:13px!important}
    .dashboard .cr-style-gallery .cr-style-option{display:flex!important;flex-direction:column!important;align-items:stretch!important;position:relative!important;min-width:0!important;padding:10px!important;gap:10px!important;text-align:left!important;overflow:hidden!important;border-radius:17px!important;cursor:pointer!important;transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease!important}
    .dashboard .cr-style-gallery .cr-style-option:hover{transform:translateY(-2px)}
    .dashboard .cr-style-gallery .cr-style-option.chosen{border-color:var(--cr-accent)!important;box-shadow:inset 0 0 0 1px var(--cr-accent),0 7px 25px color-mix(in srgb,var(--cr-accent) 14%,transparent)!important}
    .dashboard .cr-style-scene{display:flex;flex-direction:column;gap:9px;position:relative;isolation:isolate;height:115px;min-width:0;overflow:hidden;border-radius:12px;padding:11px;background:linear-gradient(140deg,var(--cr-bg),var(--cr-surface));border:1px solid color-mix(in srgb,var(--cr-text) 13%,transparent)}
    .dashboard .cr-style-scene-header{display:flex;gap:5px;align-items:center}
    .dashboard .cr-style-scene-header i{display:block;width:7px;height:7px;border-radius:50%;background:var(--cr-accent)}
    .dashboard .cr-style-scene-header i:nth-child(2){opacity:.55}.dashboard .cr-style-scene-header i:nth-child(3){opacity:.25}
    .dashboard .cr-style-scene-body{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:8px;flex:1;min-height:0}
    .dashboard .cr-style-scene-main,.dashboard .cr-style-scene-side{display:flex;flex-direction:column;gap:7px;padding:10px;min-width:0;border:1px solid color-mix(in srgb,var(--cr-text) 14%,transparent)}
    .dashboard .cr-style-scene-main i,.dashboard .cr-style-scene-side i{display:block;height:7px;border-radius:6px;background:color-mix(in srgb,var(--cr-text) 20%,transparent)}
    .dashboard .cr-style-scene-main i:first-child{background:var(--cr-accent);width:65%}.dashboard .cr-style-scene-main i:nth-child(2){width:88%}.dashboard .cr-style-scene-main i:nth-child(3){width:55%}.dashboard .cr-style-scene-side i{height:24px}
    .dashboard .cr-style-option.glass .cr-style-scene-main,.dashboard .cr-style-option.glass .cr-style-scene-side{border-radius:13px;background:color-mix(in srgb,var(--cr-text) 10%,transparent);backdrop-filter:blur(12px);box-shadow:inset 0 1px color-mix(in srgb,var(--cr-text) 15%,transparent),0 8px 18px #0002}
    .dashboard .cr-style-option.solid .cr-style-scene-main,.dashboard .cr-style-option.solid .cr-style-scene-side{border-radius:9px;background:var(--cr-surface);box-shadow:0 4px 8px #0001}
    .dashboard .cr-style-option.minimal .cr-style-scene-main,.dashboard .cr-style-option.minimal .cr-style-scene-side{border-radius:3px;background:transparent;border:0;border-top:1px solid color-mix(in srgb,var(--cr-text) 24%,transparent);padding:8px 2px;box-shadow:none}
    .dashboard .cr-style-option-info{display:flex;flex-direction:column;gap:4px;min-width:0;padding:2px 3px 4px}
    .dashboard .cr-style-option-info strong{font-size:13px!important;line-height:1.35}.dashboard .cr-style-option-info small{font-size:11px!important;line-height:1.45}
    .dashboard .cr-style-selected{position:absolute;right:16px;top:16px;color:var(--cr-accent)!important;background:var(--cr-surface);border-radius:50%;padding:3px;display:flex}
    .dashboard .cr-style-selected ha-icon{--mdc-icon-size:19px;color:var(--cr-accent)!important}
    .dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,145px),1fr))!important}
    @container (max-width:650px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @container (max-width:420px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:minmax(0,1fr)!important}.dashboard .cr-style-scene{height:105px}.dashboard .cr-theme-studio-v17 .cr-theme-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:650px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:400px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:1fr!important}}


    /* V23 — compact, fluid Atelier composition */
    .dashboard .cr-atelier-heading{display:flex;align-items:center;gap:16px;min-width:0;margin:0 0 10px!important}
    .dashboard .cr-atelier-heading h2{font-size:clamp(22px,2.4vw,30px)!important;margin:3px 0!important}
    .dashboard .cr-atelier-heading p{margin:3px 0 0!important;font-size:12px!important;color:var(--cr-muted)!important}
    .dashboard .cr-atelier-back{display:grid!important;place-items:center!important;flex:0 0 42px!important;width:42px!important;height:42px!important;border-radius:14px!important;border:1px solid color-mix(in srgb,var(--cr-text) 18%,transparent)!important;background:var(--cr-surface)!important;color:var(--cr-text)!important;cursor:pointer!important}
    .dashboard .cr-style-gallery{margin:10px 0 18px!important}
    .dashboard .cr-style-gallery-head{margin-bottom:9px!important}
    .dashboard .cr-style-gallery-head h3{font-size:16px!important}
    .dashboard .cr-style-gallery-head p{font-size:11px!important}
    .dashboard .cr-style-gallery .cr-theme-style-list{gap:10px!important}
    .dashboard .cr-style-gallery .cr-style-option{display:grid!important;grid-template-columns:minmax(0,110px) minmax(0,1fr)!important;align-items:center!important;gap:11px!important;min-height:95px!important;padding:9px!important;border-radius:14px!important}
    .dashboard .cr-style-gallery .cr-style-scene{height:72px!important;padding:7px!important;gap:5px!important;border-radius:9px!important}
    .dashboard .cr-style-gallery .cr-style-scene-body{gap:5px!important}
    .dashboard .cr-style-gallery .cr-style-scene-main,.dashboard .cr-style-gallery .cr-style-scene-side{padding:6px!important;gap:4px!important}
    .dashboard .cr-style-gallery .cr-style-scene-side i{height:13px!important}
    .dashboard .cr-style-gallery .cr-style-option-info strong{font-size:12px!important}
    .dashboard .cr-style-gallery .cr-style-option-info small{font-size:10px!important}
    .dashboard .cr-style-gallery .cr-style-selected{top:5px!important;right:5px!important}
    .dashboard .cr-theme-pagination{display:grid!important;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)!important;gap:12px!important;align-items:center!important;max-width:100%!important;padding:12px 16px!important;margin:18px 0 26px!important;border-radius:16px!important}
    .dashboard .cr-theme-pagination .cr-atelier-page-button{display:inline-flex!important;position:static!important;inset:auto!important;transform:none!important;min-width:0!important;width:auto!important;max-width:160px!important;min-height:42px!important;padding:9px 17px!important;border-radius:12px!important;white-space:nowrap!important;font-size:13px!important;line-height:1.3!important;box-shadow:none!important}
    .dashboard .cr-theme-pagination .cr-atelier-page-button:first-child{justify-self:start!important}
    .dashboard .cr-theme-pagination .cr-atelier-page-button:last-child{justify-self:end!important}
    .dashboard .cr-theme-pagination .cr-page-center{min-width:110px!important;max-width:200px!important}
    .dashboard .cr-theme-pagination .cr-page-select select{max-width:180px!important}
    @container (max-width:900px){.dashboard .cr-style-gallery .cr-style-option{grid-template-columns:1fr!important}.dashboard .cr-style-gallery .cr-style-scene{height:78px!important}}
    @container (max-width:500px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:1fr!important}.dashboard .cr-style-gallery .cr-style-option{grid-template-columns:100px minmax(0,1fr)!important}.dashboard .cr-theme-pagination{grid-template-columns:auto minmax(0,1fr) auto!important;gap:5px!important;padding:10px 7px!important}.dashboard .cr-theme-pagination .cr-atelier-page-button{padding:9px 10px!important;font-size:12px!important}.dashboard .cr-theme-pagination .cr-page-center{min-width:0!important}.dashboard .cr-theme-pagination .cr-page-select select{max-width:125px!important;font-size:11px!important}}
    @media(max-width:520px){.dashboard .cr-style-gallery .cr-theme-style-list{grid-template-columns:1fr!important}.dashboard .cr-style-gallery .cr-style-option{grid-template-columns:95px minmax(0,1fr)!important}}


    /* V27: consistent theme tokens and legible text throughout the dashboard. */
    .dashboard .premium-lights .card-icon,
    .dashboard .studio-light.active .studio-light-icon,
    .dashboard .lights-card .card-icon,
    .dashboard .studio-light-icon ha-icon {color:var(--cr-accent)!important}
    .dashboard .premium-lights.has-light {border-color:color-mix(in srgb,var(--cr-accent) 38%,transparent)!important}
    .dashboard .studio-light.active .studio-light-icon {background:color-mix(in srgb,var(--cr-accent) 17%,var(--cr-surface))!important}
    .dashboard .welcome-title h1,.dashboard .welcome-title,
    .dashboard .welcome-subtitle,.dashboard .welcome-eyebrow,
    .dashboard .hero-content p,.dashboard .person-status,
    .dashboard .person-chip small,.dashboard .brand-subtitle,
    .dashboard .sidebar-subtitle,.dashboard .navigation-label,
    .dashboard .premium-mood,.dashboard .studio-mood,
    .dashboard .premium-lights .light-count,
    .dashboard .premium-lights .card-subtitle {color:var(--cr-text)!important}
    .dashboard .welcome-subtitle,.dashboard .person-status,
    .dashboard .brand-subtitle,.dashboard .sidebar-subtitle,
    .dashboard .premium-lights .light-count {opacity:.88!important}
    .dashboard .premium-lights .light-count,
    .dashboard .premium-lights .card-subtitle {text-shadow:none!important}
    .dashboard .lights-card .premium-light-actions button,
    .dashboard .lights-card .light-action,
    .dashboard .studio-light.active {border-color:color-mix(in srgb,var(--cr-accent) 28%,transparent)}


    /* V28: One semantic secondary-color contract for every page and every theme. */
    .dashboard .eyebrow,.dashboard .cr-room-kicker,.dashboard .cr-rooms-heading p,
    .dashboard .cr-room-detail-head p,.dashboard .cr-room-detail-hero p,
    .dashboard .cr-room-detail-hero span:not(.cr-room-kicker),
    .dashboard .welcome-subtitle,.dashboard .welcome-eyebrow,
    .dashboard .brand-subtitle,.dashboard .sidebar-subtitle,
    .dashboard .person-status,.dashboard .person-chip small,
    .dashboard .settings-intro p,.dashboard .settings-local-note,
    .dashboard .settings-note,.dashboard .settings-save-copy small,
    .dashboard .settings-category h2,.dashboard .settings-option-copy small,
    .dashboard .settings-search input::placeholder,
    .dashboard .welcome-settings p,.dashboard .welcome-setting-text,
    .dashboard .cr-room-tile-body p,.dashboard .cr-room-tile-footer,
    .dashboard .cr-room-visual-head p,.dashboard .cr-room-device small,
    .dashboard .cr-theme-collection-heading span,
    .dashboard .cr-style-gallery-head p,.dashboard .cr-atelier-heading p,
    .dashboard .studio-mood-subtitle,.dashboard .studio-inline-value,
    .dashboard .light-row-status,.dashboard .premium-lights .light-count,
    .dashboard .premium-lights .card-subtitle,
    .dashboard .overview-card small,.dashboard .settings-empty,
    .dashboard .settings-save-copy small,
    .dashboard .user-status {color:var(--cr-secondary)!important;opacity:1!important}
    .dashboard .eyebrow,.dashboard .cr-room-kicker{letter-spacing:.13em}
    .dashboard .settings-search input{color:var(--cr-text)!important}
    .dashboard .settings-save-bar{background:var(--cr-surface)!important}
    .dashboard .settings-save-copy strong{color:var(--cr-text)!important}
    .dashboard .settings-save-bar .settings-save-copy{min-width:0}
    .dashboard .settings-back{color:var(--cr-accent)!important}
    .dashboard .brand-subtitle{color:var(--cr-secondary)!important}
    @media(max-width:600px){
      .dashboard .settings-save-bar .settings-save-copy{flex:1 1 100%!important}
      .dashboard .settings-save-bar .settings-cancel,
      .dashboard .settings-save-bar .settings-save{flex:1 1 0!important}
    }


    /* V33 — Lighting room selectors and filters respect the active Theme Atelier palette. */
    .dashboard .room-filters button {
      background:color-mix(in srgb,var(--cr-surface) 88%,transparent)!important;
      border-color:color-mix(in srgb,var(--cr-text) 17%,transparent)!important;
      color:var(--cr-muted)!important;
    }
    .dashboard .room-filters button.active {
      background:color-mix(in srgb,var(--cr-accent) 25%,var(--cr-surface))!important;
      border-color:var(--cr-accent)!important;
      color:var(--cr-text)!important;
    }
    .dashboard .room-filters button:focus-visible,
    .dashboard .studio-tabs button:focus-visible,
    .dashboard .ambient-room:focus-visible {outline:2px solid var(--cr-accent)!important;outline-offset:2px}
    .dashboard .studio-tabs {background:color-mix(in srgb,var(--cr-surface) 87%,transparent)!important}
    .dashboard .studio-tabs button {color:var(--cr-muted)!important}
    .dashboard .studio-tabs button.active {
      background:color-mix(in srgb,var(--cr-accent) 22%,var(--cr-surface))!important;
      color:var(--cr-text)!important;
    }
    .dashboard .pref-modes button.active {
      background:color-mix(in srgb,var(--cr-accent) 25%,var(--cr-surface))!important;
      border-color:var(--cr-accent)!important;
      color:var(--cr-text)!important;
    }


    /* V34: typography scales independently of component geometry. */
    .dashboard .cr-font-setting{margin-top:9px;padding:12px 13px;border:1px solid color-mix(in srgb,var(--cr-accent) 23%,transparent);border-radius:15px;background:color-mix(in srgb,var(--cr-surface) 90%,var(--cr-accent));display:grid;gap:9px;min-width:0}
    .dashboard .cr-font-label,.dashboard .cr-font-label>span{display:flex;align-items:center;justify-content:space-between;gap:8px}
    .dashboard .cr-font-label strong{font-size:13px;color:var(--cr-text)}
    .dashboard .cr-font-label ha-icon{--mdc-icon-size:18px;color:var(--cr-accent)}
    .dashboard .cr-font-percent{font-size:12px;font-weight:700;color:var(--cr-muted)}
    .dashboard .cr-font-choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px}
    .dashboard .cr-font-choices button{min-width:0;min-height:34px;border:1px solid color-mix(in srgb,var(--cr-text) 12%,transparent);border-radius:9px;background:color-mix(in srgb,var(--cr-surface) 85%,transparent);color:var(--cr-text);font:600 12px inherit;cursor:pointer;touch-action:manipulation}
    .dashboard .cr-font-choices button.active{background:color-mix(in srgb,var(--cr-accent) 23%,var(--cr-surface));border-color:var(--cr-accent);color:var(--cr-text)}
    .dashboard .cr-font-status{color:var(--cr-muted);font-size:10px}
    .dashboard .page-heading{font-size:calc(15px * var(--cr-font-scale))!important}
    .dashboard .nav-item,.dashboard .sidebar-nav button{font-size:calc(13px * var(--cr-font-scale))!important}
    .dashboard .card-title{font-size:calc(14px * var(--cr-font-scale))!important}
    .dashboard .card-subtitle{font-size:calc(10px * var(--cr-font-scale))!important;line-height:1.4!important}
    .dashboard .light-row-name{font-size:calc(12px * var(--cr-font-scale))!important}
    .dashboard .light-row-status{font-size:calc(10px * var(--cr-font-scale))!important}
    .dashboard .studio-light-name{font-size:calc(14px * var(--cr-font-scale))!important}
    .dashboard .studio-light-state-inline,.dashboard .studio-light-room{font-size:calc(11px * var(--cr-font-scale))!important}
    .dashboard .studio-inline-value{font-size:calc(12px * var(--cr-font-scale))!important}
    .dashboard .settings-option-copy strong{font-size:calc(14px * var(--cr-font-scale))!important}
    .dashboard .settings-option-copy small{font-size:calc(11px * var(--cr-font-scale))!important}
    .dashboard .settings-category h2{font-size:calc(13px * var(--cr-font-scale))!important}
    .dashboard .cr-room-tile-body h2{font-size:calc(13px * var(--cr-font-scale))!important}
    .dashboard .smart-bar .weather-condition,.dashboard .smart-bar .smart-segment small{font-size:calc(12px * var(--cr-font-scale))!important}
    @media(max-width:650px){.dashboard .page-heading{font-size:calc(14px * var(--cr-font-scale))!important}.dashboard .card-title{font-size:calc(14px * var(--cr-font-scale))!important}}

`;

  protected render() {
    if (this.hass?.user?.id && !this.crRemoteReady && !this.crRemoteLoading && this.crRemoteUser !== this.hass.user.id) {
      // First-time device: use neutral surface rather than painting the wrong theme.
      return html`<div class="cr-first-load" style="min-height:100vh;display:grid;place-items:center;background:#191d20;color:#e8e8e8;font:600 14px system-ui">ControlRoom</div>`;
    }
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
                ${this.activePage==="settings" ? "" : this.t(this.activePage)}
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

