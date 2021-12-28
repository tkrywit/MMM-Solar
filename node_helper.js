var https = require("https");
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting node helper: " + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    var self = this;
    console.log("Notification: " + notification + " Payload: " + payload);

    if (notification === "GET_SOLAR") {
      var enlightenUrl =
        payload.config.url +
        payload.config.systemId +
        "/summary?&key=" +
        payload.config.apiKey +
        "&user_id=" +
        payload.config.userId;
      https.get(enlightenUrl, function (response) {
        if (response.statusCode == 200) {
          response.on("data", function (body) {
            var jsonData = JSON.parse(body);
            self.sendSocketNotification("SOLAR_DATA", jsonData);
          });
        }
      });
    }
  },
});
