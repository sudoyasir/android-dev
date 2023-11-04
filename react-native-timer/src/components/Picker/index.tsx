import React from "react"
import { Platform, Text, View } from "react-native"
import { Picker as RNCPicker } from "@react-native-community/picker"
import styled, { css } from "styled-components/native"

import { AVAILABLE_MINUTES, AVAILABLE_SECONDS } from "../../constants"
import normalize from "../../utils/normalize"

interface Props {
	selectedMinutes: string
	selectedSeconds: string
	setSelectedMinutes: (itemValue: string) => void
	setSelectedSeconds: (itemValue: string) => void
}

const Picker: React.FC<Props> = ({
	selectedMinutes,
	selectedSeconds,
	setSelectedMinutes,
	setSelectedSeconds,
}) => {
	return (
		<PickerContainer>
			<StyledPicker
				itemStyle={pickerItemStyle}
				mode="dropdown"
				selectedValue={selectedMinutes}
				onValueChange={(itemValue): void => {
					setSelectedMinutes(itemValue.toString())
				}}
			>
				{AVAILABLE_MINUTES.map(value => (
					<RNCPicker.Item key={value} label={value} value={value} />
				))}
			</StyledPicker>
			<PickerLabel>minutes</PickerLabel>
			<StyledPicker
				itemStyle={pickerItemStyle}
				mode="dropdown"
				selectedValue={selectedSeconds}
				onValueChange={(itemValue): void => {
					setSelectedSeconds(itemValue.toString())
				}}
			>
				{AVAILABLE_SECONDS.map(value => (
					<RNCPicker.Item key={value} label={value} value={value} />
				))}
			</StyledPicker>
			<PickerLabel>seconds</PickerLabel>
		</PickerContainer>
	)
}

const pickerItemStyle = { color: "#FFF", fontSize: 20 }

const PickerContainer = styled(View)`
	align-items: center;
	flex-direction: row;
	margin-bottom: 10%;
	${Platform.select({
		ios: css`
			margin-top: -43%;
		`,
	})};
`

const StyledPicker = styled(RNCPicker)`
	width: 25%;
	${Platform.select({
		android: css`
			background-color: ${(props): string => props.theme.primaryColor};
			color: ${(props): string => props.theme.textColorOnPrimary};
			margin-left: 5%;
			margin-right: -15%;
		`,
	})};
`

const PickerLabel = styled(Text)`
	color: white;
	font-size: ${normalize(18) + "px"};
`

export default Picker
