import axios from "axios";

export default async function makeNetworkCall(props) {
	const { HTTPmethod, path, params, accessToken } = props;
	console.log(params);
	try {
		const resp = await axios({
			url: `https://yfe9h86dc9.execute-api.us-east-2.amazonaws.com/Prod/${path}`,
			method: `post`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Access-Control-Allow-Origin": "*",
				// Access-Control-Allow-Origin: "*"
			},
			params: params,
		}).then(console.log(resp));
		console.log(resp);
		const responseData = resp.data;

		if ("errors" in responseData) {
			console.log(responseData);
		}
		console.log(responseData);
		return responseData;
	} catch (error) {
		console.log("there was an error ", error);
		return { error: true };
	}
}
