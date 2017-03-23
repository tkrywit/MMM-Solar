# MMM-Solar
A Solar Module for MagicMirror2 designed to integrate with an Enphase Solar System

## Dependencies
  * A [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror) installation

## Installation
  1. Clone repo into MagicMirror/modules directory
  2. Get an Enlighten API key and authorize your application (instructions below).
  3. Create an entry in 'config/config.js' with your API Key, UserId, SystemID, and any config options.

 **Example:**
```
 {
    module: 'MMM-Solar',
	position: 'bottom_left',
	config: {
		apiKey: "452a5aac149b0fe246999de0455a7575",
		userId: "4d7a45774e6a41320a",
		systemId: 67,
	}
 },
```
## Sample
![alt text](https://github.com/tkrywit/MMM-Solar/blob/master/AppSample.PNG "Example")

## Optional Config
| **Option** | **Description** |
| --- | --- |
| `basicHeader` | Set to `true` to substitute the 'Solar PV' text and graphic for the default MagicMirror header |

## API Key
Use of this module requires
  1. An API Key, which you can obtain at [The Enphase Developer Portal](https://developer.enphase.com/)
  2. The User Id of the User whose system you wish to integrate. This can be found in your [Enlighten Manager Portal](https://enlighten.enphaseenergy.com/).
  3. The System ID of the solar system you wish to monitor, which can also be found in the Enlighten Manager.

## Attribution
This module is powered by [Enphase](http://enphase.com/ "Enphase Homepage") and the [Enlighten API](https://developer.enphase.com/ "Enlighten API")
