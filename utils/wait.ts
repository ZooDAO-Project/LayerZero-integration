export async function wait(seconds: number) {
	return new Promise((resolve, reject) => setTimeout((resolve) => resolve(), seconds * 1000))
}
