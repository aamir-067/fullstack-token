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

        it("should not change price if supplu is less then 10M", async () => {
            const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
            await presale.purchaseTokens(50000 * 1000, {value: ethers.parseEther(`${pricebefore * 50000}`)});

            const priceafter = Number(ethers.formatEther(await presale.getTokenPriceInEth()));

            expect(priceafter).to.equal(pricebefore);
        })

        it("should able to stop selling if supply is equals or greater then 80M", async () => {
            
            for(let i=0 ; i < 8; i++){
                const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
                await presale.purchaseTokens(10000000 * 1000, {value: ethers.parseEther(`${pricebefore * 10000000}`)});
            }
            const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
            await expect(presale.purchaseTokens(50 * 1000, {value: ethers.parseEther(`${pricebefore * 50}`)})).to.be.revertedWith("token already sold");
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

        it("should emit events on token purchase and the priceChange", async ()=>{
            var p;
            presale.on("priceChange", res => {
                p = ether.formatEther(res);
                expect(priceChange).to.equal("0.0001");
                console.log("p ==> " + p);
            })

            let purchaseRes = ["", 0];
            presale.on("tokenSold", (adr, amount)=>{
                purchaseRes[0] = adr;
                purchaseRes[1] = ethers.toNumber(amount);
                expect(purchaseRes[0]).to.equal(adr1.address);
                expect(purchaseRes[1]).to.equal(500);

                console.log("details of token sold", purchaseRes);
            })

            const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
            await presale.connect(adr1).purchaseTokens(500 * 1000, {value: ethers.parseEther(`${pricebefore * 500}`)});

            const newPrice = ethers.parseEther("0.0001");
            await presale.changePrice(newPrice);

            
        });
    });

    describe("stacking", ()=>{
        it("should able to stack tokens and fail if tokens are less then 50", async ()=>{
            await mytoken.approve(stacking.target, 100 * 1000);
            await stacking.stackToken(100 * 1000);

            const result = await stacking.stackers(owner.address);

            expect(result[0]).to.equal(100000n);
            expect(ethers.toNumber(result[1])).greaterThan(0);
        });

        it("should able to save record and update data on next stack",async () =>{
            await mytoken.approve(stacking.target, 100 * 1000);
            await stacking.stackToken(100 * 1000);

            const result = await stacking.stackers(owner.address);

            await mytoken.approve(stacking.target, 100 * 1000);
            await stacking.stackToken(100 * 1000);
            const result2 = await stacking.stackers(owner.address);

            expect(result2[0]).to.equal(result[0] + 100000n);
            expect(result2[1]).greaterThan(result[1]);

        });

        it("should able to unstack tokens with the reword and maintain reword", async ()=>{
            const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
            await presale.connect(adr1).purchaseTokens(200000n, {value: ethers.parseEther(`${pricebefore * 200}`)});

            await mytoken.connect(adr1).approve(stacking.target, 100 * 1000);
            await stacking.connect(adr1).stackToken(100 * 1000);


            await mytoken.connect(adr1).approve(stacking.target, 100 * 1000);
            await stacking.connect(adr1).stackToken(100 * 1000);

            const result = await stacking.stackers(adr1.address);
            await stacking.connect(adr1).unStackToken(50 * 1000);
            const result2 = await stacking.stackers(adr1.address);

            const adr1Bal = await mytoken.balanceOf(adr1.address);


            expect(adr1Bal).greaterThanOrEqual(50000n);
            expect(result[0]).to.equal(result2[0] + 50000n);
            expect(result[1]).lessThanOrEqual(result2[1]);

            

        });

        it("should not stack tokens if supply raech 80M", async ()=>{
            const pricebefore = Number(ethers.formatEther(await presale.getTokenPriceInEth()));
            await presale.connect(adr1).purchaseTokens(8000005000, {value: ethers.parseEther(`${pricebefore * 8000005}`)});
            
            await mytoken.approve(stacking.target, 5000000);
            const res = await stacking.stackToken(5000000);

            expect(res).to.revertedWith("Stacking: max supply reached cant stack anymore");

        });

        it("should emit event on stack and unstack of the token", async ()=>{
            const val = 100;
            stacking.on("tokenStacked", res =>{
                expect(ethers.toNumber(res)).to.equal(val)
            })
            await mytoken.approve(stacking.target, val * 1000);
            await stacking.stackToken(val * 1000);

            // for unstack

            stacking.on("tokenUnStacked", (value , reward)=>{
                expect(ethers.toNumber(value)).to.equal(val);
                expect(ethers.toNumber(reward)).to.be.not.null();
            })

            await stacking.unStackToken(val * 1000);

            

        });
    })
})