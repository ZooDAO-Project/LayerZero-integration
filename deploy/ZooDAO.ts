import hre from 'hardhat'
import { verifyContract } from '../utils/verifyContract'
const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json')

module.exports = async function ({ deployments, getNamedAccounts }: any) {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()
	console.log(`>>> your address: ${deployer}`)

	const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
	const args = [lzEndpointAddress]
	console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

	const result = await deploy('ZooDAO', {
		from: deployer,
		args,
		log: true,
		waitConfirmations: 1,
	})

	await verifyContract(result.address, args, 'contracts/ZooDAO.sol:ZooDAO')

	// console.log(result)

	// await hre.run('verify:verify', {
	// 	address: contractAddress,
	// 	constructorArguments: [
	// 		50,
	// 		'a string argument',
	// 		{
	// 			x: 10,
	// 			y: 5,
	// 		},
	// 		'0xabcdef',
	// 	],
	// })
}

module.exports.tags = ['ZooDAO']
