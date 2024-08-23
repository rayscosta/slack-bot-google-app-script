const LEGACY_VERIFICATION_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_VERIFICATION_TOKEN");
const SLACK_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_ACCESS_TOKEN");


/**
 * Handles HTTP POST requests.
 * 
 * @param {Object} e - The event object containing the POST data.
 * @returns {string} - The acknowledgment response.
 */
function doPost(e) {
  if (typeof e.postData === "undefined") {
    return ack("invalid request");
  }

  if (e.postData.type === "application/json") {

    // Events API / url_verification
    const payload = JSON.parse(e.postData.getDataAsString());
    if (payload.token !== LEGACY_VERIFICATION_TOKEN) {
      console.log(`Invalid verification token detected (actual: ${payload.token}, expected: ${LEGACY_VERIFICATION_TOKEN})`);
      return ack("invalid request");
    }
    if (typeof payload.challenge !== "undefined") {
      return ack(payload.challenge);
    }

    // Check if the payload is an event
    if (payload.type === 'event_callback') {
      handleEvent(payload);
    }
    return ack("");

  } else if (e.postData.type === "application/x-www-form-urlencoded") {
    if (typeof e.parameters.payload !== "undefined") {
      // ----------------------------
      // Interactivity & Shortcuts
      // ----------------------------

      const payload = JSON.parse(e.parameters.payload[0]);
      if (payload.token !== LEGACY_VERIFICATION_TOKEN) {
        console.log(`Invalid verification token detected (actual: ${payload.token}, expected: ${LEGACY_VERIFICATION_TOKEN})`);
        return ack("invalid request");
      }
      console.log(`Interactivity payload: ${JSON.stringify(payload)}`);
      if (payload.type === "shortcut") {
        // Handle shortcut
      } else if (payload.type === "message_action") {
        if (payload.callback_id === "gas-msg") {
          respond(payload.response_url, "Thanks for running a message shortcut!");
        }
      } else if (payload.type === "block_actions") {
        console.log(`Action data: ${JSON.stringify(payload.actions[0])}`);
      } else if (payload.type === "view_submission") {
        if (payload.view.callback_id === "modal-id") {
          const stateValues = payload.view.state.values;
          console.log(`View submission data: ${JSON.stringify(stateValues)}`);
          return ack("");
        }
      }
    } else if (typeof e.parameters.command !== "undefined") {
      // ----------------------------
      // Slash Commands
      // ----------------------------

      const payload = {};
      for (const [key, value] of Object.entries(e.parameters)) {
        payload[key] = value[0];
      }
      if (payload.token !== LEGACY_VERIFICATION_TOKEN) {
        console.log(`Invalid verification token detected (actual: ${payload.token}, expected: ${LEGACY_VERIFICATION_TOKEN})`);
        return ack("invalid request");
      }
      console.log(`Slash command payload: ${JSON.stringify(payload)}`);

      // -------------------------------------------------------------
      // TODO: Implement your own logic here
      if (payload.command === "/gas") {
        return ack("Hi there!");
      }
      // -------------------------------------------------------------
    }
  }
}

