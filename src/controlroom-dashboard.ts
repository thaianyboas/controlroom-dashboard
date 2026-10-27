
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

type SupportedLanguage = "en" | "de" | "pt";

const translations = {
  en: {
    welcome: "Welcome home",
    subtitle: "Your intelligent home, beautifully connected.",
    connected: "Home Assistant connected",
    waiting: "Waiting for Home Assistant",
    overview: "Overview",
    rooms: "Rooms",
    people: "People",
    energy: "Energy",
    security: "Security",
    media: "Media",
    comingSoon: "Your ControlRoom experience is taking shape.",
    foundation: "Dashboard foundation"
  },
  de: {
    welcome: "Willkommen zu Hause",
    subtitle: "Dein intelligentes Zuhause. Alles verbunden.",
    connected: "Mit Home Assistant verbunden",
    waiting: "Warte auf Home Assistant",
    overview: "Übersicht",
    rooms: "Räume",
    people: "Personen",
    energy: "Energie",
    security: "Sicherheit",
    media: "Medien",
    comingSoon: "Dein ControlRoom nimmt Gestalt an.",
    foundation: "Dashboard-Grundstruktur"
  },
  pt: {
    welcome: "Bem-vindo à sua casa",
    subtitle: "Sua casa inteligente, perfeitamente conectada.",
    connected: "Conectado ao Home Assistant",
    waiting: "Aguardando o Home Assistant",
    overview: "Visão geral",
    rooms: "Ambientes",
    people: "Pessoas",
    energy: "Energia",
    security: "Segurança",
    media: "Multimídia",
    comingSoon: "Seu ControlRoom está tomando forma.",
    foundation: "Estrutura do dashboard"
  }
};

type TranslationKey = keyof typeof translations.en;

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
    return 12;
  }

  private getLanguage(): SupportedLanguage {
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

  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100dvh - 56px);
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    .dashboard {
      min-height: calc(100dvh - 56px);
      padding: 28px;
      color: #f7f7fa;
      background:
        radial-gradient(
          ellipse at 85% 0%,
          rgba(91, 76, 133, 0.18),
          transparent 45%
        ),
        #101017;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 22px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 20px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 13px;
    }

    .logo {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      background: linear-gradient(
        135deg,
        #8876b7,
        #51466e
      );
      font-size: 23px;
      font-weight: 700;
    }

    .brand-name {
      font-size: 19px;
      font-weight: 700;
      letter-spacing: -0.04em;
    }

    .brand-subtitle {
      font-size: 11px;
      color: #a8a5b8;
      margin-top: 3px;
    }

    .status {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 11px 15px;
      border-radius: 14px;
      background: rgba(255,255,255,0.055);
      border: 1px solid rgba(255,255,255,0.06);
      color: #d7d5e0;
      font-size: 12px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #43d6a0;
      box-shadow: 0 0 12px rgba(67,214,160,0.35);
    }

    .content {
      max-width: 1600px;
      margin: 0 auto;
      padding-top: 40px;
    }

    .eyebrow {
      font-size: 11px;
      font-weight: 650;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #aaa2c9;
    }

    h1 {
      margin: 13px 0 10px;
      font-size: clamp(30px, 4vw, 48px);
      font-weight: 700;
      letter-spacing: -0.045em;
    }

    .subtitle {
      margin: 0;
      font-size: 15px;
      color: #aaa8b9;
    }

    .modules {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin-top: 38px;
    }

    .module {
      min-height: 150px;
      padding: 24px;
      border-radius: 22px;
      background: rgba(255,255,255,0.035);
      border: 1px solid rgba(255,255,255,0.08);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .module-icon {
      font-size: 25px;
    }

    .module-title {
      font-size: 16px;
      font-weight: 650;
    }

    .footer {
      margin-top: 45px;
      font-size: 12px;
      color: #777587;
    }

    @media (max-width: 900px) {
      .modules {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 550px) {
      .dashboard {
        padding: 18px;
        border-radius: 0;
      }

      .modules {
        grid-template-columns: 1fr;
      }

      .content {
        padding-top: 30px;
      }
    }
  `;

  protected render() {
    const connected = Boolean(this.hass);

    const modules: Array<{
      key: TranslationKey;
      icon: string;
    }> = [
      { key: "overview", icon: "⌂" },
      { key: "rooms", icon: "▦" },
      { key: "people", icon: "♙" },
      { key: "energy", icon: "ϟ" },
      { key: "security", icon: "◇" },
      { key: "media", icon: "♫" }
    ];

    return html`
      <main class="dashboard">
        <header class="header">
          <div class="brand">
            <div class="logo">C</div>
            <div>
              <div class="brand-name">ControlRoom</div>
              <div class="brand-subtitle">
                Smart Home Dashboard
              </div>
            </div>
          </div>

          <div class="status">
            <span class="dot"></span>
            ${connected
              ? this.t("connected")
              : this.t("waiting")}
          </div>
        </header>

        <section class="content">
          <div class="eyebrow">
            ${this.t("foundation")}
          </div>

          <h1>${this.t("welcome")}</h1>

          <p class="subtitle">
            ${this.t("subtitle")}
          </p>

          <div class="modules">
            ${modules.map(
              (module) => html`
                <div class="module">
                  <div class="module-icon">
                    ${module.icon}
                  </div>
                  <div class="module-title">
                    ${this.t(module.key)}
                  </div>
                </div>
              `
            )}
          </div>

          <div class="footer">
            ${this.t("comingSoon")}
          </div>
        </section>
      </main>
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
