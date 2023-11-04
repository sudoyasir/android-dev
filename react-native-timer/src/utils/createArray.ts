const createArray = (length: number): string[] => {
	const arr = []
	let i = 0
	while (i < length) {
		arr.push(i.toString())
		i++
	}
	return arr
}

export default createArray
