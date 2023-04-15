import $ from "jquery";

const baseUrl = "http://api.openweathermap.org/data/2.5/";
const apiKey = "edbe2e94a8e1860c098561b102cb3b99";

let locationData = null;

export default {
	// All API methods get the relevant location (either current or one passed) and call the relevant endpoint and just return the data straight away

	//fetch for typed location only (use this if location name can be found in props or state of a component)
    fetchWeatherForLocation(locationName) {
		return new Promise((resolve, reject) => {
            //create url
            var url =baseUrl+"weather?q="+locationName+"&units=metric&APPID="+apiKey;
            $.ajax({
                url: url,
                dataType: "jsonp",
                success: (data) => resolve(data),
				error: (error) => reject(error),
            })
            
		});
	},

	//fetch weaather data for either current location or typed in location
    getLocData(locationName) {
		return new Promise((resolve, reject) => {
            if (locationName !== null) {
                var url =baseUrl+"weather?q="+locationName+"&units=metric&APPID="+apiKey;
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    success: (data) => resolve(data),
                    error: (error) => reject(error),
            });
            }
			else if (this.locationData) {
			// If no coord was passed and we've already cached location data, return that
			resolve(this.locationData);
			}
            else if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition((pos) => {
					const lat = pos.coords.latitude;
					const lon = pos.coords.longitude;
					$.ajax({
						url: `${baseUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
						dataType: "jsonp",
						success: (data) => {
							this.locationData = {
								name: data.name,
							};
							resolve(this.locationData);
						},
					});
				});
            }
            else if(lon && lat){
                reject("No location permissions")
            }
            
		});
	},

	//return all data from 5day 3hr forecast -> will return all data -> use .list to get array of locations
	weeklyForecast(locationName) {
		return new Promise((resolve, reject) => {
            var url =baseUrl+"forecast?q="+locationName+"&units=metric&APPID="+apiKey;
            $.ajax({
                url: url,
                dataType: "jsonp",
                success: (data) => resolve(data),
				error: (error) => reject(error),
            })
            
		});
	},


} 