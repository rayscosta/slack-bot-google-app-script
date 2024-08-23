// Função para lidar com eventos Slack
function handleEvent(payload) {
  try {
    let event = payload.event;
    let eventType = event.type;
    let tab = event.tab;


    if (eventType === 'message') {
      return handleMessageEvent(event);
    };

    if (eventType === 'app_home_opened' && tab === 'home') {
      homeView = callAPIMethodPost('views.publish', PAYLOADS.homeView({
        "user_id": event.user
      }));
      return ack('OK');
    };

    if (eventType === 'app_mention') {
      // let user = event.user;
      // let text = event.text;
      // let ts = event.ts;
      // let changeNumber = extractChangeNumber(text)
      // homeView = callAPIMethodPost('chat.postMessage', {
      //   "channel": user,
      //   "text": changeNumber,
      //   "thread_ts": ts
      // });
      return ack('OK');
    };
  } catch (error) {
    let logJson = {
      "log": "handleEvent: " + error.toString()
    };
    let optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    }
    let log = UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
  }
}

// Função para lidar com eventos de mensagem
function handleMessageEvent(event) {
  var user = event.user;
  var text = event.text;
  var channelType = event.channel_type;

  if (channelType === 'im') {
    callAPIMethodPost('', PAYLOADS.homeView({
      "user_id": event.user
    }));
  };
}
