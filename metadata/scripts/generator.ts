import { log } from 'console'
import attributes from '../attributesGenP.json'
import * as fs from 'fs'

interface Metadata {
	description: string
	external_url: string
	image: string
	name: string
	attributes: Attribute[]
}

interface Attribute {
	trait_type: string
	value: string | number
}

function getAttribute(trait_type: string, value: string): Attribute {
	return { trait_type, value: value[0].toUpperCase() + value.slice(1) }
}

for (const item of attributes) {
	const words = item.name.split(' ')

	for (let i = 0; i < words.length; i++) {
		words[i] = words[i][0].toUpperCase() + words[i].substr(1)
	}

	const metadata = {
		name: words.join(' '),
		// name: item.name,
		description: "One of ZooDAO's Special Edition Cards.",
		image: 'https://gateway.pinata.cloud/ipfs/QmXG7wiLfqCMK9h1VY1675rKXJMmdCBCrKecQLuxPbASf4/' + item.id + '.gif',
		attributes: [
			getAttribute('rarity', item.rarity),
			getAttribute('type', item.type),
			getAttribute('family', item.family),
		],
	}

	fs.writeFile('./metadata/metadata/GenP/' + item.id.toString() + '.json', JSON.stringify(metadata), (err) => {
		if (err) {
			console.error(err)
		}
	})
}
