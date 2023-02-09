import { ethers } from 'hardhat'

async function main() {
	const nonce = await ethers.provider.getTransactionCount('0xbe1f1f4e1a4907d3a6debc110e1e9f551909c89c')
	console.log(nonce)
}

main().then(process.exit(0)).catch(process.exit(1))
