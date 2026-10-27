
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("controlroom-dashboard")
export class ControlRoomDashboard extends LitElement {
  @property({ attribute: false })
  public hass?: any;

  @property({ attribute: false })
  public config?: any;

  public setConfig(config: any): void {
    this.config = config;
  }

  public getCardSize(): number {
    return 6;
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
        <div class="brand">ControlRoom Dashboard</div>

        <h1>Welcome to ControlRoom</h1>

        <p>
          Your intelligent Home Assistant experience
          starts here.
        </p>

        <div class="status">
          <span class="dot"></span>
          ${connected
            ? "Home Assistant connected"
            : "Waiting for Home Assistant"}
        </div>
      </section>
    `;
  }
}

window.customCards = window.customCards || [];

window.customCards.push({
  type: "controlroom-dashboard",
  name: "ControlRoom Dashboard",
  description: "Premium intelligent dashboard for Home Assistant"
});
