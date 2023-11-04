import { useEffect, useRef } from "react"

type IntervalFunction = () => unknown | void

export default function useInterval(
	callback: IntervalFunction,
	delay: number | null
): number | null {
	const intervalId = useRef<number | null>(null)
	const savedCallback = useRef<IntervalFunction | null>(callback)

	useEffect(() => {
		savedCallback.current = callback
	})

	useEffect(() => {
		const tick = (): void => {
			if (typeof savedCallback.current === "function") {
				savedCallback.current()
			}
		}

		if (delay !== null) {
			intervalId.current = setInterval(tick, delay)
			return (): void => {
				if (intervalId.current) {
					clearInterval(intervalId.current)
				}
			}
		}
	}, [delay])

	return intervalId.current
}
