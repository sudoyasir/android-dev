import React from "react"
import { Dimensions, Text, TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import normalize from "../../utils/normalize"

const { width } = Dimensions.get("window")

interface TimerButtonProps {
	isRunning: boolean
}

interface Props {
	isRunning: boolean
	onPress: () => void
}

const TimerButton: React.FC<Props> = ({ isRunning, onPress }) => {
	return (
		<Button isRunning={isRunning} onPress={onPress}>
			<ButtonText isRunning={isRunning}>
				{isRunning ? "Stop" : "Start"}
			</ButtonText>
		</Button>
	)
}

const Button = styled(TouchableOpacity)<TimerButtonProps>`
	align-items: center;
	border-color: ${(props): string =>
		props.isRunning ? props.theme.accentColor : props.theme.secondaryColor};
	border-radius: ${`${width / 2}px`};
	border-width: 10px;
	height: ${`${width / 2}px`};
	justify-content: center;
	width: 50%;
`

const ButtonText = styled(Text)<TimerButtonProps>`
	color: ${(props): string =>
		props.isRunning ? props.theme.accentColor : props.theme.secondaryColor};
	font-size: ${normalize(38) + "px"};
`

export default TimerButton
