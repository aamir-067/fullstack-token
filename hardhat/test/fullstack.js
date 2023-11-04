const {expect} = require("chai");
let mytoken, presale, stacking, owner, adr1, adr2;

describe("AllTests",()=>{
    beforeEach(async ()=>{
        const contract1 = await ethers.getContractFactory("MyToken");
        const contract2 = await ethers.getContractFactory("PreSale");
        const contract3 = await ethers.getContractFactory("Stacking");
        mytoken = await contract1.deploy(); 
        presale = await contract2.deploy(mytoken.target); 
        stacking = await contract3.deploy(mytoken.target); 
        [owner, adr1, adr2] = await ethers.getSigners();
    })

    describe("MyToken", ()=>{
        it("Should set the correct name, symbol and decimals", async()=>{
            const name = await mytoken.name();
            const symbol = await mytoken.symbol();
            const decimals = await mytoken.decimals();

            expect(name).to.equal("MyToken");
            expect(symbol).to.equal("MTK");
            expect(decimals).to.equal(3);
        });

        it("Should send the 10M tokens to owner", async () =>{
            const balance = await mytoken.balanceOf(owner.address);
            expect(balance).to.equal(10000000000n);
        });

        it("Should able to use transfer function", async () =>{
            await mytoken.transfer(adr1.address, 100 * (10 ** 3));
            const balance = await mytoken.balanceOf(adr1.address);
            expect(balance).to.equal(100 * (10 ** 3));
            await mytoken.transfer(adr2.address, 100 * (10 ** 3));
            const balance2 = await mytoken.balanceOf(adr2.address);
            expect(balance2).to.equal(100 * (10 ** 3));
        });

        it("Should able to mint new tokens", async () =>{
            const bal = await mytoken.balanceOf(adr1.address);
            await mytoken.connect(adr1).mint(adr1.address,10 * (10 ** 3));
            const bal2 = await mytoken.balanceOf(adr1.address);
            expect(ethers.toNumber(bal2)).to.equal(ethers.toNumber(bal) + (10 * (10 ** 3)));
        });

        it("should able to approve , and use transferFrom function and send accurate tokens", async ()=>{
            const init = await mytoken.allowance(owner.address, adr1.address);
            await mytoken.approve(adr1.address, 100 * (10 ** 3));
            const allowance = await mytoken.allowance(owner.address, adr1.address);

            await mytoken.connect(adr1).transferFrom(owner.address, adr2.address, 100 * (10 ** 3));
            const bal = await mytoken.balanceOf(adr2.address);

            // again test it
            await mytoken.connect(adr2).approve(adr1.address, 50 * (10 ** 3));
            await mytoken.connect(adr1).transferFrom(adr2.address, adr1.address, 50 * (10 ** 3));
            const bal2 = await mytoken.balanceOf(adr1.address);
            const bal3 = await mytoken.balanceOf(adr2.address);


            expect(init).to.equal(0n);
            expect(allowance).to.equal(100 * (10 ** 3));
            expect(bal).to.equal(100 * (10 ** 3));
            expect(bal2).to.equal(50 * (10 ** 3));
            expect(bal3).to.equal(50 * (10 ** 3));
        });
    
    });
    
    describe("PreSale", ()=>{
        it("should set accurate token rate, set correct token & owner addresses", async ()=>{
            const tokeAddress = await presale.mytoken();
            const ownerr = await presale.owner();
            const rate = await presale.currentRate();
            expect(tokeAddress).to.equal(mytoken.target);
            expect(ownerr).to.equal(owner.address);
            expect(rate).to.equal(10000000000000n);

        });
        
        // ! ============== error in this ====================== 
        it("should able to purchase tokens and track totalSoldTokens", async ()=>{
            const totalBefore = await presale.totalSoldAmount();
            const bal = await mytoken.balanceOf(adr1.address);
            const price = ethers.toNumber(await presale.currentRate());
            await presale.connect(adr1).purchaseTokens( 100 * 1000, {value:  price * 100});

            const bal2 = await mytoken.balanceOf(adr1.address);
            const totalAfter = await presale.totalSoldAmount();

            expect(ethers.toNumber(totalBefore)).to.equal(0,"totalBefore is greater then 0");
            expect(bal).to.equal(0n, "init bal not equal to 0");
            expect(bal2).to.equal(100000n, "balance not added to the buyers address");
            expect(totalAfter).to.equal(100000n, "record not maintained after purchaing a tokens");
        });

        it("should able to change token price automatically if supply is equal or greater then 10M", async () => {
            const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
            await presale.purchaseTokens(9999999000n, {value: ethers.parseEther(`${pricebefore * 9999999}`)});
            // await presale.purchaseTokens(999000n, {value: ethers.parseEther(`${pricebefore * 999}`)});

            const priceafter = await presale.getTokenPriceInEth();
            // console.log("new price :", ethers.toNumber(priceafter));
            expect(priceafter).to.equal(ethers.parseEther("0.00005"));
        });

        it("should able to stop selling if supply is equals or greater then 80M", async () => {

        });

        it("should able to change token price manually", async () => {
            const pricebefore = await presale.getTokenPriceInEth();
            const newPrice = ethers.parseEther("0.0001");
            await presale.changePrice(newPrice);
            const priceafter = await presale.getTokenPriceInEth();

            expect(ethers.formatEther(pricebefore)).to.equal("0.00001");
            expect(pricebefore).not.equal(priceafter);
            expect(ethers.toNumber(priceafter)).to.equal(newPrice);
        });
    });
})