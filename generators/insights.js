const axios = require("axios");

let instrumentationKey = "53d02343-02a7-4e07-bbbf-6672ae216f42";
let endpoint = "https://dc.services.visualstudio.com/v2/track";

const Events = {
  GeneratorStarted: "GeneratorStarted",
  GitHubActionStarted: "GitHubActionStarted",
  ResxStarted: "ResxStarted",
  ReadmeStarted: "ReadmeStarted"
};

module.exports = {
  trackEvent,
  Events
};

function trackEvent(eventName) {
  const eventData = JSON.stringify({
    name: "Microsoft.ApplicationInsights." + instrumentationKey + ".Event",
    time: new Date().toISOString(),
    iKey: instrumentationKey,
    data: {
      baseType: "EventData",
      baseData: {
        name: eventName
      }
    }
  });

  axios.post(endpoint, eventData).catch(error => {
    console.error(error);
  });
}
