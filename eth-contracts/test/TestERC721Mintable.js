const ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_1 = accounts[0];
    const account_2 = accounts[1];
    const account_3 = accounts[2];
    const account_4 = accounts[3];
    const account_5 = accounts[4];
    const account_6 = accounts[5];
    const name = "MyMintableToken";
    const symbol = "TKN";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_1});

            // TODO: mint multiple tokens
             await this.contract.mint(account_2,1,{from:account_1});
             await this.contract.mint(account_3,2,{from:account_1});
             await this.contract.mint(account_4,3,{from:account_1});
             await this.contract.mint(account_5,4,{from:account_1});
             await this.contract.mint(account_6,5,{from:account_1});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply.toNumber(), 5);
            
        })

        it('should get token balance', async function () { 
            let balance_acc_2 = await this.contract.balanceOf.call(account_2);
            assert.equal(balance_acc_2.toNumber(), 1);
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
            let tokenURI_1 =baseTokenURI + "1";
            let tokenURI_1_res = await this.contract.getTokenURI.call(1);
            assert.equal(tokenURI_1, tokenURI_1_res); 
            
            let tokenURI_2 =baseTokenURI + "2";
            let tokenURI_2_res = await this.contract.getTokenURI.call(2);
            assert.equal(tokenURI_2, tokenURI_2_res);  
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_2, account_6, 1, {from: account_2});
            let tokenOwner = await this.contract.ownerOf.call(1);
            assert.equal(tokenOwner, account_6);

            //check if balance of account_two is set to zero
            let balance_acc_2 = await this.contract.balanceOf.call(account_2);
            assert.equal(balance_acc_2,0);
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_1});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let flag = false;
            try {
                await this.contract.mint(account_2,1,{from:account_2});
            }
            catch(e) {
                flag = true;
            }
            //Since account_two is not the owner, it should not be able to mint
            assert.equal(flag, true);
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner.call();
            assert.equal(result, account_1);
            
        })

    });
})