import axios from "axios";

export default async function makeNetworkCall(props) {
	const { HTTPmethod, path, params, data, accessToken } = props;
	console.log(data);
	try {
		const resp = await axios({
			url: `https://yfe9h86dc9.execute-api.us-east-2.amazonaws.com/Prod/${path}`,
			method: `${HTTPmethod}`,
			headers: {
				// Authorization: `Bearer ${accessToken}`,
				// "Access-Control-Allow-Origin": "*",
				// Connection: "keep-alive",
				// "Sec-Fetch-Mode": "no-cors",
				// mode: "cors",
			},
			params: params,
			data: JSON.stringify(data),
		});

		// console.log(resp);
		const responseData = resp.data;

		if ("errors" in responseData) {
			console.log(responseData);
		}
		// console.log(responseData);
		// console.log(resp.headers);
		return responseData;
	} catch (error) {
		console.log("there was an error ", error);
		return { error: true };
	}
}
