const { ethers } = require("hardhat");
const {expect} = require("chai");
const axios = require('axios');


describe("DeployTokens", function () {
    const mintedAmount = ethers.utils.parseEther("1234567891");
    let wethContract;
    let pedroTokenContract;
    let obxTokenContract;
    let USDCTokenContract;
    beforeEach(async function () {
        const [owner] = await ethers.getSigners();
        let signValue = ""
        await axios
            .get('http://127.0.0.1:3001/generateviewingkey')
            .then(res => {
                signValue = res.data;
            })
            .catch(error => {
                console.error(error);
            });

        let signed_msg = await owner.signMessage("vk" + signValue);

        await axios
            .post('http://127.0.0.1:3001/submitviewingkey/',
                JSON.stringify({"address": owner.address.toString(), "signature": signed_msg})
                , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch(error => {
                console.error(error);
            });

        const Weth = await ethers.getContractFactory("WETHToken");
        wethContract = await Weth.deploy(mintedAmount, {gasLimit: 50000000000});

        const PedroToken = await ethers.getContractFactory("PedroToken");
        pedroTokenContract = await PedroToken.deploy(mintedAmount, {gasLimit: 50000000000});

        const Obx = await ethers.getContractFactory("OBXToken");
        obxTokenContract = await Obx.deploy(mintedAmount, {gasLimit: 50000000000});

        const USDC = await ethers.getContractFactory("USDC");
        USDCTokenContract = await USDC.deploy(mintedAmount, {gasLimit: 50000000000});

        console.log("Owner Address of tokens: ");
        console.log(owner.address);
    });

    describe("Deployment", function () {
        it("Should deploy the contracts correctly", async function () {
            console.log(await wethContract.symbol())
            expect(await wethContract.symbol()).to.equal("WETH");
            expect(await wethContract.totalSupply()).to.equal(mintedAmount);
            console.log("weth address: ")
            console.log(wethContract.address);

            expect(await pedroTokenContract.symbol()).to.equal("PTK");
            expect(await pedroTokenContract.totalSupply()).to.equal(mintedAmount);
            console.log("PedroToken address: ")
            console.log(pedroTokenContract.address);

            expect(await obxTokenContract.symbol()).to.equal("OBX");
            expect(await obxTokenContract.totalSupply()).to.equal(mintedAmount);
            console.log("obxTokenContract address: ")
            console.log(obxTokenContract.address);

            expect(await USDCTokenContract.symbol()).to.equal("USDC");
            expect(await USDCTokenContract.totalSupply()).to.equal(mintedAmount);
            console.log("USDCTokenContract address: ")
            console.log(USDCTokenContract.address);

            console.log("done")
        });

    });
});
