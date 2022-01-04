let SquareVerifier = artifacts.require('Verifier');
let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let zokratesProof = require('../../zokrates/code/square/proof');

// Test if a new solution can be added for contract - SolnSquareVerifier

contract('TestSolnSquareVerifier', accounts => {
    const account_1 = accounts[0]
    const account_2 = accounts[1]

    beforeEach(async function () {
        const squareVerifier = await SquareVerifier.new({ from: account_1 })
        this.contract = await SolnSquareVerifier.new(squareVerifier.address, {
            from: account_1
        })
    })

    it('can add a new solution for SolnSquareVerifier contract', async function () {
        let result = await this.contract.mintToken(account_2, 1,
            zokratesProof.proof.a,
            zokratesProof.proof.b,
            zokratesProof.proof.c,
            zokratesProof.inputs,
            { from: account_1 }
        )

        assert.equal(result.logs[0].event, 'SolutionAdded')
    })
    // Test if an ERC721 token can be minted for contract - SolnSquareVerifier

    it('can mint an ERC721 token for SolnSquareVerifier contract', async function () {
        let mint = true
        try {
            await this.contract.mintToken(account_2, 1,
                zokratesProof.proof.a,
                zokratesProof.proof.b,
                zokratesProof.proof.c,
                zokratesProof.inputs,
                { from: account_1 }
            )
        } catch (e) {
            mint = false
        }

        assert.equal(mint, true);
    })
})