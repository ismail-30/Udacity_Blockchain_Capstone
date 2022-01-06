let SquareVerifier = artifacts.require('Verifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let zokratesProof = require('../../zokrates/code/proof.json');

// Test if a new solution can be added for contract - SolnSquareVerifier

contract('TestSolnSquareVerifier', accounts => {
    const account_1 = accounts[0];
    const account_2 = accounts[1];
    const name = "MyMintableToken";
    const symbol = "TKN";

    beforeEach(async function () {
        const squareVerifier = await SquareVerifier.new({ from: account_1 })
        this.contract = await SolnSquareVerifier.new(squareVerifier.address, name, symbol, {from: account_1})
    })

    it('can add a new solution for SolnSquareVerifier contract', async function () {
        let num_before = await this.contract.getNumSolutions.call();
        await this.contract.addSolution(1, account_2, { from: account_1 })
        let num_after = await this.contract.getNumSolutions.call();
        assert.equal(num_after.toNumber() - num_before.toNumber(), 1)
    })
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier

    it('can mint an ERC721 token for SolnSquareVerifier contract', async function () {
        let flag = true
        let num_before = await this.contract.getNumSolutions.call();
        try {
            await this.contract.mintNewToken(
                zokratesProof.proof.A,
                zokratesProof.proof.A_p,
                zokratesProof.proof.B,
                zokratesProof.proof.B_p,
                zokratesProof.proof.C,
                zokratesProof.proof.C_p,
                zokratesProof.proof.H,
                zokratesProof.proof.K,
                zokratesProof.input,
                1,
                account_2,
                { from: account_1 }
            )
        } catch (e) {
            flag = false
        }
        let num_after = await this.contract.getNumSolutions.call();
        assert.equal(flag, true);
        assert.equal(num_after.toNumber() - num_before.toNumber(), 1);
    })
})