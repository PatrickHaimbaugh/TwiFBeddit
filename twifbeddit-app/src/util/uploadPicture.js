import { assignWith, create } from "lodash";
import React from "react";
import AWS from "aws-sdk";

const uploadPicture = async (file, type) => {
	const createUUID = () => {
		var dt = new Date().getTime();
		var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
			/[xy]/g,
			function (c) {
				var r = (dt + Math.random() * 16) % 16 | 0;
				dt = Math.floor(dt / 16);
				return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
			}
		);

		return uuid;
	};

	AWS.config.region = "us-east-2";
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: "us-east-2:2ca808d1-ec6b-4130-8914-a80b447048f5",
	});
	const uuid = createUUID();
	const bucket = new AWS.S3({
		params: {
			Bucket: "twifbeddit-assets-prod",
		},
	});
	const imageUrlForMongoDB =
		"https://twifbeddit-assets-prod.s3.us-east-2.amazonaws.com/" +
		`${type}/` +
		uuid +
		".png"; // change this for image post or profile post
	const keyForS3Upload = `${type}/` + uuid + ".png";
	const params = {
		Key: keyForS3Upload,
		ContentType: file.type,
		Body: file,
	};
	bucket.upload(params, (err, data) => {
		if (err) {
			console.log(err);
			return { error: true };
		} else {
			return { data, imageUrlForMongoDB };
		}
	});
	return { imageUrlForMongoDB };
};

export default uploadPicture;
