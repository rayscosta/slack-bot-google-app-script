const SN_INSTANCE_URL = 'https://stonedev.service-now.com/';
const CHANGE_PATH = 'api/sn_chg_rest/change';
const USERNAME = PropertiesService.getScriptProperties().getProperty("LOGIN_SERVICENOW");
const PASSWORD = PropertiesService.getScriptProperties().getProperty("PASSWORD_SERVICENOW");
function getUserInfo(email) {
  let query = 'email=' + encodeURIComponent(email);
  let table = 'sys_user';
  try {
    let response = getFromServiceNow(table, query)
    if (response.result.length > 0) {
      let userInfo = response.result[0];
      return userInfo;
    } else {
      return null;
    }
  } catch (error) {
    let logJson = {
      "log": "FUNÇÃO getUserInfo: " + error.toString()
    };
    let optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    }
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
  }
}

function getAreaInfo(sysId) {
  let query = 'sys_id=' + encodeURIComponent(sysId);
  let table = 'u_mindsight_area';
  try {
    let response = getFromServiceNow(table, query)
    if (response.result.length > 0) {
      let area = response.result[0];
      return area;
    } else {
      return null;
    }
  } catch (error) {
    let logJson = {
      "log": "FUNÇÃO getAreaInfo: " + error.toString()
    };
    let optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    }
    UrlFetchApp.fetch('https://hooks.slack.com/triggers/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', optionsPost);
  }
}

function checkUserGroup(groupName, userSysID) {
  try {
    let url = "https://stonedev.service-now.com/api/now/table/sys_user_grmember?sysparm_query=group.name=" + groupName + "&sysparm_display_value=all";
    let response = UrlFetchApp.fetch(url, options);
    let content = JSON.parse(response.getContentText());
    let arrayRecords = content.result;
    arrayRecords.forEach(object => {
      let userID = object.user.value;
      if (userID == userSysID){
        return true;
      }
    })
    return false;
  } catch (error) {
    let logJson = {
      "logErros": "FUNÇÃO checkUserGroup: " + error.toString()
    };
    let optionsPost = {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify(logJson)
    }
    UrlFetchApp.fetch('https://hooks.slack.com/workflows/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', optionsPost);
  }
}

function exportRecordAsPDF(number) {
  let table = 'change_request';
  let query = 'number=' + encodeURIComponent(number);
  
  var response = getFromServiceNow(table, query);

  if (response.getResponseCode() == 200) {
    var blob = response.getBlob();
    var file = DriveApp.createFile(blob).setName('registro.pdf');
    Logger.log('PDF exportado com sucesso: ' + file.getUrl());
  } else {
    Logger.log('Erro ao exportar PDF. Status: ' + response.getResponseCode());
  }
}
