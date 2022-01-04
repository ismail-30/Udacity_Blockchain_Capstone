const ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const account_five = accounts[4];
    const account_six = accounts[5];
    const name = "MyMintableToken";
    const symbol = "TKN";
    const baseTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/";

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new(name, symbol, {from: account_one});

            // TODO: mint multiple tokens
             await this.contract.mint(account_two,1,{from:account_one});
             await this.contract.mint(account_three,2,{from:account_one});
             await this.contract.mint(account_four,3,{from:account_one});
             await this.contract.mint(account_five,4,{from:account_one});
             await this.contract.mint(account_six,5,{from:account_one});
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply.toNumber(), 5);
            
        })

        it('should get token balance', async function () { 
            let balance_acc_2 = await this.contract.balanceOf.call(account_two);
            assert.equal(balance_acc_2.toNumber(), 1);
            
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            
            let tokenURI_1 =baseTokenURI + "1";
            let tokenURI_1_res = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI_1, tokenURI_1_res); 
            
            let tokenURI_2 =baseTokenURI + "2";
            let tokenURI_2_res = await this.contract.tokenURI.call(2);
            assert.equal(tokenURI_2, tokenURI_2_res);  
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_six, 1, {from: account_two});
            let tokenOwner = await this.contract.ownerOf.call(1);
            assert.equal(tokenOwner, account_six);

            //check if balance of account_two is set to zero
            let balance_acc_2 = await this.contract.balanceOf.call(account_two);
            assert.equal(balance_acc_2,0);
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let boolean = false;
            try {
                await this.contract.mint(account_two,1,{from:account_two});
            }
            catch(e) {
                boolean = true;
            }
            //Since account_two is not the owner, it should not be able to mint
            assert.equal(boolean, true);
        })

        it('should return contract owner', async function () { 
            let result = await this.contract.getOwner.call();
            assert.equal(result, account_one);
            
        })

    });
})