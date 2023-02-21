import hre from 'hardhat'

export async function verifyContract(address: string, constructorArguments: any, contract?: string) {
	console.log('Contract verification...')
	await hre.run('verify:verify', {
		address: address,
		constructorArguments: constructorArguments,
		contract,
	})
}
