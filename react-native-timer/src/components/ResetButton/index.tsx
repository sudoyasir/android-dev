import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styled from "styled-components/native"

import normalize from "../../utils/normalize"

interface Props {
	onPress: () => void
}
const ResetButton: React.FC<Props> = ({ onPress }) => {
	return (
		<Button onPress={onPress}>
			<ButtonText>Reset</ButtonText>
		</Button>
	)
}

const Button = styled(TouchableOpacity)`
	align-items: center;
	justify-content: center;
	margin-top: 10%;
`

const ButtonText = styled(Text)`
	color: ${(props): string => props.theme.dimTextColorOnPrimary};
	font-size: ${normalize(22) + "px"};
`

export default ResetButton
