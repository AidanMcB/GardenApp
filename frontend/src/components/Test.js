import { createMedia } from "@artsy/fresnel";
import React from "react";
import { Segment } from "semantic-ui-react";

const AppMedia = createMedia({
	breakpoints: {
		smallMobile: 100,
		mobile: 320,
		tablet: 768,
		computer: 992,
		largeScreen: 1200,
		widescreen: 1920,
	},
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;
export default function Test() {
	return (
		<>
			<style>{mediaStyles}</style>
			<MediaContextProvider>
				<Segment.Group>
					<Segment as={Media} at="smallMobile">
						Small Mobile
					</Segment>
					<Segment as={Media} at="mobile">
						Mobile
					</Segment>
					<Segment as={Media} at="tablet">
						Tablet
					</Segment>
					<Segment as={Media} greaterThanOrEqual="computer">
						Computer
					</Segment>
					<Segment as={Media} at="largeScreen">
						Large Screen
					</Segment>
					<Segment as={Media} at="widescreen">
						Widescreen
					</Segment>
				</Segment.Group>
			</MediaContextProvider>
		</>
	);
}

// const [btnSize, setBtnSize] = useState("medium")
// const [btnPadding, setBtnPad] = useState("auto")

// const isDesktopOrLaptop = useMediaQuery({
//     query: '(min-device-width: 1224px)'
// })
// const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
// const isSmallMobile = useMediaQuery({ query: '(max-width: 480px)' })
// const isSmallerMobile = useMediaQuery({ query: '(max-width: 370px)' })

// const isTabletOrMobileDevice = useMediaQuery({
//     query: '(max-device-width: 1224px)'
// })
// const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
// const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

// //manage button size based on screen size constants defined above
// useEffect( () => {
//     if(isSmallerMobile){
//         setBtnSize("mini")
//         setBtnPad("0.5em")
//     }
//     else if(isSmallMobile){
//         setBtnSize("mini")
//     }
// }, [])

// import MediaQuery, { useMediaQuery } from 'react-responsive'
