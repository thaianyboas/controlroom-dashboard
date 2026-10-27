
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

interface HomeAssistant {
  language?: string;
  states: Record<string, unknown>;
  user?: {
    name?: string;
  };
}

interface DashboardConfig {
  type?: string;
  title?: string;
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

type TranslationKey =
  | "welcome"
  | "description"
  | "connected"
  | "waiting";

type SupportedLanguage = "en" | "de" | "pt";

const translations: Record<
  SupportedLanguage,
  Record<TranslationKey, string>
> = {
  en: {
    welcome: "Welcome to ControlRoom",
    description:
      "Your intelligent Home Assistant experience starts here.",
    connected: "Home Assistant connected",
    waiting: "Waiting for Home Assistant"
  },

  de: {
    welcome: "Willkommen bei ControlRoom",
    description:
      "Dein intelligentes Home-Assistant-Erlebnis beginnt hier.",
    connected: "Mit Home Assistant verbunden",
    waiting: "Warte auf Home Assistant"
  },

  pt: {
    welcome: "Bem-vindo ao ControlRoom",
    description:
      "Sua experiência inteligente com o Home Assistant começa aqui.",
    connected: "Conectado ao Home Assistant",
    waiting: "Aguardando o Home Assistant"
  }
};

@customElement("controlroom-dashboard")
export class ControlRoomDashboard extends LitElement {
  @property({ attribute: false })
  public hass?: HomeAssistant;

  @property({ attribute: false })
  public config: DashboardConfig = {};

  public setConfig(config: DashboardConfig): void {
    this.config = config;
  }

  public getCardSize(): number {
    return 6;
  }

  private getLanguage(): SupportedLanguage {
    const language = (
      this.hass?.language || "en"
    ).toLowerCase().split(/[-_]/)[0];

    if (language === "de" || language === "pt") {
      return language;
    }

    return "en";
  }

  private t(key: TranslationKey): string {
    return translations[this.getLanguage()][key];
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif;
    }

    .dashboard {
      padding: 28px;
      border-radius: 24px;
      background: #15151e;
      color: #ffffff;
      border: 1px solid #30303d;
    }

    .brand {
      font-size: 14px;
      font-weight: 600;
      color: #a7a3b5;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    h1 {
      margin: 18px 0 8px;
      font-size: 30px;
      font-weight: 650;
    }

    p {
      color: #aaa9b8;
      font-size: 15px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      margin-top: 18px;
      padding: 11px 15px;
      border-radius: 12px;
      background: #242530;
      font-size: 13px;
    }

    .dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: #38d39f;
    }
  `;

  protected render() {
    const connected = Boolean(this.hass);

    return html`
      <section class="dashboard">
        <div class="brand">
          ControlRoom Dashboard
        </div>

        <h1>${this.t("welcome")}</h1>

        <p>${this.t("description")}</p>

        <div class="status">
          <span class="dot"></span>
          ${connected
            ? this.t("connected")
            : this.t("waiting")}
        </div>
      </section>
    `;
  }
}

window.customCards = window.customCards || [];

window.customCards.push({
  type: "controlroom-dashboard",
  name: "ControlRoom Dashboard",
  description:
    "Premium intelligent dashboard for Home Assistant",
  preview: true
});
