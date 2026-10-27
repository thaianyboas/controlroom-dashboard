
interface HomeAssistant {
  language?: string;
  config?: {
    location_name?: string;
  };
}

interface StrategyConfig {
  title?: string;
}

interface DashboardStrategyResult {
  title: string;
  views: Array<{
    title: string;
    path: string;
    type: string;
    icon: string;
    cards: Array<{
      type: string;
    }>;
  }>;
}

interface CustomStrategy {
  type: string;
  strategyType: "dashboard";
  name: string;
  description: string;
  documentationURL?: string;
}

declare global {
  interface Window {
    customStrategies?: CustomStrategy[];
  }
}

class ControlRoomDashboardStrategy extends HTMLElement {
  static noEditor = true;

  static getCreateSuggestions() {
    return {
      title: "ControlRoom",
      icon: "mdi:home-automation"
    };
  }

  static async generate(
    config: StrategyConfig,
    _hass: HomeAssistant
  ): Promise<DashboardStrategyResult> {
    return {
      title: config.title || "ControlRoom",
      views: [
        {
          title: "ControlRoom",
          path: "home",
          type: "panel",
          icon: "mdi:home-automation",
          cards: [
            {
              type: "custom:controlroom-dashboard"
            }
          ]
        }
      ]
    };
  }
}

if (
  !customElements.get(
    "ll-strategy-dashboard-controlroom"
  )
) {
  customElements.define(
    "ll-strategy-dashboard-controlroom",
    ControlRoomDashboardStrategy
  );
}

window.customStrategies = window.customStrategies || [];

if (
  !window.customStrategies.some(
    (strategy) => strategy.type === "controlroom"
  )
) {
  window.customStrategies.push({
    type: "controlroom",
    strategyType: "dashboard",
    name: "ControlRoom Dashboard",
    description:
      "Premium intelligent smart home dashboard with automatic Home Assistant integration.",
    documentationURL:
      "https://github.com/thaianyboas/controlroom-dashboard"
  });
}
