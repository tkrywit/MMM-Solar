//Magic Mirror module for displaying Enphase Solar data

Module.register("MMM-Solar",{
    // Default module config.
    defaults: {
        url: "https://api.enphaseenergy.com/api/v2/systems/",
        apiKey: "452a5aac149b0fe246999de0455a7575", //Sample API key
        userId: "4d7a45774e6a41320a", //Sample user ID
	      systemId: "67", //Sample system
	      refInterval: 1000 * 60 * 5, //5 minutes
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        this.titles = ["Current Power:", "Daily Power:", "Lifetime Power:", "Active Inverters: ", "Current Status:"];
	      this.suffixes = ["Watts", "kWh", "mWh", "", ""];
	      this.results = ["Loading", "Loading", "Loading", "Loading", "Loading"];
        this.loaded = false;
        this.getSolarData();

        var self = this;
        //Schedule updates
        setInterval(function() {
            self.getSolarData();
            self.updateDom();
        }, this.config.refInterval);
    },

    //Import additional CSS Styles
    getStyles: function() {
        return ['solar.css']
    },

    //Contact node helper for solar data
    getSolarData: function() {
        Log.info("SolarApp: getting data");

        this.sendSocketNotification("GET_SOLAR", {
            config: this.config
          });
    },

    //Handle node helper response
    socketNotificationReceived: function(notification, payload) {
      	if (notification === "SOLAR_DATA") {

            this.results[0] = payload.current_power;
  		      this.results[1] = (payload.energy_today / 1000).toFixed(2);
            this.results[2] = (payload.energy_lifetime / 1000000).toFixed(1);
  		      this.results[3] = payload.modules;

            var statusNew = payload.status.charAt(0).toUpperCase() + payload.status.slice(1);
  		      this.results[4] = statusNew;
            this.loaded = true;
          	this.updateDom(1000);
        }
    },

    // Override dom generator.
    getDom: function() {

        var wrapper = document.createElement("div");
        //Display loading while waiting for API response
        if (!this.loaded) {
      	    wrapper.innerHTML = "Loading...";
            return wrapper;
      	}

        var tb = document.createElement("table");

        var imgDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = "/modules/MMM-Solar/solar_white.png";

        var sTitle = document.createElement("p");
        sTitle.innerHTML = "Solar PV";
        sTitle.className += " thin normal";
        imgDiv.appendChild(img);
	      imgDiv.appendChild(sTitle);

        var divider = document.createElement("hr");
        divider.className += " dimmed";
        wrapper.appendChild(imgDiv);
        wrapper.appendChild(divider);

      	for (var i = 0; i < this.results.length; i++) {
        		var row = document.createElement("tr");

        		var titleTr = document.createElement("td");
        		var dataTr = document.createElement("td");

        		titleTr.innerHTML = this.titles[i];
        		dataTr.innerHTML = this.results[i] + " " + this.suffixes[i];

        		titleTr.className += " medium regular bright";
        		dataTr.classname += " medium light normal";

        		row.appendChild(titleTr);
        		row.appendChild(dataTr);

        		tb.appendChild(row);
      	}
        wrapper.appendChild(tb);

        //Enphase API attribution requirements
        var attrib = document.createElement("p");
        attrib.innerHTML = "Powered by Enphase Energy";
	      attrib.id = "attribution";
	      attrib.className += "light";
        wrapper.appendChild(attrib);

        return wrapper;
    }
});
