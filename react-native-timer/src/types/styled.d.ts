import "styled-components/native"

declare module "styled-components" {
	export interface DefaultTheme {
		accentColor: string
		dimTextColorOnPrimary: string
		primaryColor: string
		secondaryColor: string
		textColorOnPrimary: string
	}
}
