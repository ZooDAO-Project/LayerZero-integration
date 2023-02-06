const { ethers } = require('hardhat')
const { deploy } = require('hardhat-deploy')
const { expect } = require('chai')

describe('ZooDAOGen0', function () {
	let contract

	beforeEach(async function () {
		const ZooDAOGen0 = await ethers.getContractFactory('ZooDAOGen0')
		contract = await ZooDAOGen0.deploy('1000000', '0x73f6D60439046681f4Ce35665583a39f25E138B0')
	})

	it('tokenURI()', async function () {
		contract.mintTo('0x73f6D60439046681f4Ce35665583a39f25E138B0')
		const uri = await contract.tokenURI(1)
		expect(uri).to.be.eq('https://gateway.pinata.cloud/ipfs/QmaT9UEzDdxAQRrUWbcXF9j82tjhBXMwZgBrUYgsPfxyxb/1.json')
	})
})
