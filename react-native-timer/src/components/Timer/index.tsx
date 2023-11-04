import React from "react"
import { Text } from "react-native"
import styled from "styled-components/native"

import { getRemaining } from "../../utils/timerHelpers"
import normalize from "../../utils/normalize"

interface Props {
	remainingSeconds: number
}

const Timer: React.FC<Props> = ({ remainingSeconds }) => {
	const { minutes, seconds } = getRemaining(remainingSeconds)

	return <TimerText>{`${minutes}:${seconds}`}</TimerText>
}

const TimerText = styled(Text)`
	color: white;
	font-size: ${normalize(75) + "px"};
	margin-bottom: 10%;
`
export default Timer
