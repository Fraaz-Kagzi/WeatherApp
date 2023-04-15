import $ from "jquery";

let baseUrl ='http://airlabs.co/api/v9/flight?flight_iata='
let apiKey ='ca38bf04-5523-41f3-91e7-657bd5ad972a'
export default {
	// All API methods get the relevant location (either current or one passed) and call the relevant endpoint and just return the data straight away

	//fetch for typed location only (use this if location name can be found in props or state of a component)
    fetchFlightData(iata) {
		return new Promise((resolve, reject) => {
            //create url
            var url =baseUrl+iata+"&api_key="+apiKey;
            $.ajax({
                url: url,
                dataType: "json",
                success: (data) => resolve(data),
				error: (error) => reject(error),
            })
            
		});
	},

}