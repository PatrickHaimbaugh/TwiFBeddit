import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLottie, Lottie } from "react-lottie-hook";
import animationData from "../assests/lottie-files/8555-loading.json";

const LoaderWrapper = styled.div`
	position: abosulte;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.35s cubic-bezier(0.33, 1, 0.68, 1);
	z-index: 999999;
`;

const Loader = (props) => {
	const { loading } = props,
		[localLoading, setLocalLoading] = useState(loading),
		[lottieRef] = useLottie({
			renderer: "svg",
			rendererSettings: {
				preserveAspectRatio: "xMidYMid slice",
				progressiveLoad: true,
			},
			animationData,
		});

	useEffect(() => {
		if (!loading) {
			setTimeout(() => {
				setLocalLoading(false);
			}, 450);
		} else {
			setLocalLoading(true);
		}
	}, [loading]);

	return (
		<LoaderWrapper loading={localLoading.toString()} test={"this"}>
			<Lottie lottieRef={lottieRef} width={300} height={300} />
		</LoaderWrapper>
	);
};

export default Loader;
