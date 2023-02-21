import { log } from 'console'
import * as fs from 'fs'

interface Card {
	rarity: string
	type: string
	name: string
	id: number
}

function readFiles(dirname: string, onFileContent: Function, onError: Function) {
	const data: Card[] = []

	fs.readdir(dirname, function (err, filenames) {
		if (err) {
			onError(err)
			return
		}

		filenames.forEach(function (filename) {
			fs.readFile(dirname + filename, 'utf-8', function (err, content) {
				if (err) {
					onError(err)
					return
				}

				const card = onFileContent(filename, content)
				data.push(card)
			})
		})
	})

	log(data)
	return data
}

const onErr = (err: any) => log('Error in reading:', err)
const onFileContent = (filename: string, content: any) => {
	const dataArr = filename.split('_')

	const [id, , type, rarity] = dataArr

	let name: string

	if (dataArr.length > 5) {
		name = dataArr[4] + ' ' + dataArr[5].split('.')[0]
	} else {
		name = dataArr[4].split('.')[0]
	}

	const card: Card = {
		id: Number(id),
		type,
		rarity,
		name,
	}

	log(JSON.stringify(card))
}

const cards = readFiles('./metadata/assets/GenP/', onFileContent, onErr)
fs.writeFile('./metadata/attributesGenP.json', JSON.stringify(cards), (err) => {
	if (err) {
		console.error(err)
	}
})
// fs.writeFile('./metadata/attributes.json', JSON.stringify(cards), { flag: 'w+' }, onErr)
