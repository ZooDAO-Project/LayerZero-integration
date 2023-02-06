import { log } from 'console'
import attributes from '../attributes.json'
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
		description: "One of ZooDAO's Limited Edition Genesis Cards",
		image: 'https://gateway.pinata.cloud/ipfs/QmTcsJujMBvRQL3gR6TeT4CBfUFayQScLYSKdViyCki7vR/' + item.id + '.gif',
		attributes: [getAttribute('rarity', item.rarity), getAttribute('type', item.type)],
	}

	fs.writeFile('./metadata/metadata/' + item.id.toString() + '.json', JSON.stringify(metadata), (err) => {
		if (err) {
			console.error(err)
		}
	})
}
