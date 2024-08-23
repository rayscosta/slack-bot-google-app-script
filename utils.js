const endPointSlackApi = 'https://slack.com/api';

/**
 * Generates a text output response based on the provided payload.
 * 
 * @param {string|Object} payload - The data to be converted into a text output. 
 *                                  If it's a string, it will be returned as is.
 *                                  If it's an object, it will be converted to a JSON string.
 * @returns {TextOutput} - The text output response created from the payload.
 */
function ack(payload) {
  if (typeof payload === "string") {
    return ContentService.createTextOutput(payload);
  } else {
    return ContentService.createTextOutput(JSON.stringify(payload));
  }
}

/**
 * Sends a thank you message to a specified user in a given channel.
 *
 * @param {string} channel - The ID of the channel where the message will be sent.
 * @param {string} user - The ID of the user to whom the thank you message is addressed.
 */
function sendThankYouMessage(channel, user) {
  let payload = {
    channel: channel,
    text: 'Obrigado pela sua interação, <@' + user + '>!',
  };
  callAPIMethodPost('chat.postMessage', payload);
}


/**
 * Sends a thank you message to a specified response URL.
 *
 * @param {string} responseUrl - The URL to which the thank you message will be sent.
 */
function sendThankYouMessageToAction(responseUrl) {
  let payload = {
    text: 'Obrigado pela sua interação!',
    response_type: 'ephemeral'
  };

  let options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(responseUrl, options);
}


/**
 * Calls a Slack API method using a POST request.
 *
 * @param {string} method - The Slack API method to call.
 * @param {Object} payload - The payload to send with the POST request.
 * @returns {Object} The parsed JSON response from the Slack API.
 */
const callAPIMethodPost = (method, payload) => {
  try {
    const logJson = {
      log: method
    };
    const optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    };
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
    const response = UrlFetchApp.fetch(`${endPointSlackApi}/${method}`, {
      method: 'post',
      contentType: 'application/json; charset=utf-8',
      payload: JSON.stringify(payload),
      headers: { Authorization: `Bearer ${SLACK_ACCESS_TOKEN}` }
    });
    const result = JSON.parse(response.getContentText());
    return result;
  } catch (error) {
    const logJson = {
      log: `callAPIMethodPost: ${error.toString()}`
    };
    const optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    };
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
  }
};


/**
 * Calls a Slack API method using a GET request.
 *
 * @param {string} method - The Slack API method to call.
 * @param {Object} params - The parameters to include in the API call.
 * @returns {Object} The result of the API call.
 */
const callAPIMethodGet = (method, params) => {
  try {
    const encodedParams = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");
    const URL = `${endPointSlackApi}/${method}?${encodedParams}`;
    let response = UrlFetchApp.fetch(URL, {
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      headers: { Authorization: "Bearer " + SLACK_ACCESS_TOKEN }
    });
    let result = JSON.parse(response.getContentText());
    return result;
  } catch (error) {
    let logJson = {
      "log": "callAPIMethodGet: " + error.toString()
    };
    let optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    };
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
  }
};



/**
 * Fetches data from a ServiceNow table based on the provided query.
 *
 * @param {string} tableName - The name of the ServiceNow table to query.
 * @param {string} query - The query string to filter the results.
 * @returns {HTTPResponse|null} The response from the ServiceNow API, or null if an error occurs.
 */
function getFromServiceNow(tableName, query) {
  const url = `${SN_INSTANCE_URL}api/now/table/${tableName}?sysparm_query=${query}`;
  const options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Basic " + Utilities.base64Encode(USERNAME + ":" + PASSWORD)
    }
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    return response;
  } catch (error) {
    const logJson = {
      "log": "getFromServiceNow: " + error.toString()
    };
    const optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    };
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
    return null;
  }
}


/**
 * Posts a payload to a specified ServiceNow table.
 *
 * @param {string} tableName - The name of the ServiceNow table to post to.
 * @param {Object} payload - The data to be posted to the ServiceNow table.
 * @returns {Object|null} - The response from the ServiceNow API, or null if an error occurs.
 */
function postToServiceNow(tableName, payload) {
  const url = `${servicenowInstance}/api/now/table/${tableName}`;

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      "Authorization": `Basic ${Utilities.base64Encode(USERNAME + ":" + PASSWORD)}`,
      'Accept': 'application/json'
    },
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    return result;
  } catch (error) {
    const logJson = {
      "log": `postToServiceNow: ${error.toString()}`
    };
    const optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    };
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
    return null;
  }
}


/**
 * Extracts change numbers from the given text.
 * 
 * A change number is defined as a string starting with "CHG" followed by at least seven digits.
 * 
 * @param {string} text - The text from which to extract change numbers.
 * @returns {Array<string>} An array of matched change numbers, or an empty array if no matches are found.
 */
function extractChangeNumber(text) {
  const pattern = /CHG\d{7,}/g;
  const matches = text.match(pattern);
  return matches || [];
}


/**
 * Deletes a message from a specified channel.
 *
 * This function constructs a payload with the channel ID and timestamp of the message to be deleted,
 * and then calls the API method to delete the message.
 */
async function deleteMessage() {
  const payload = {
    channel: 'C05CUEDN3PA', // Channel ID where the message is located
    ts: '1722383030.263869' // Timestamp of the message to be deleted
  };

  try {
    let result = await callAPIMethodPost('chat.delete', payload);
    console.log('Message deleted successfully:', result);
  } catch (error) {
    console.error('Error deleting message:', error);
  }
}
