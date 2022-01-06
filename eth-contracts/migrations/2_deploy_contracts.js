// migrating the appropriate contracts
var SquareVerifier = artifacts.require("Verifier");
var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

let name   = "ERC721MintableToken";
let symbol = "TKN";

const myProof  = require('../../zokrates/code/proof.json');

module.exports = async (deployer) => {
  await deployer.deploy(SquareVerifier);
  SolnSquareVerifierInstance = await deployer.deploy(SolnSquareVerifier, SquareVerifier.address, name, symbol);

  for(tokenId=1;tokenId<=5;tokenId++){
    
          await SolnSquareVerifierInstance.mintNewToken(
                                                    myProof.proof.A,
                                                    myProof.proof.A_p,
                                                    myProof.proof.B,
                                                    myProof.proof.B_p,
                                                    myProof.proof.C,
                                                    myProof.proof.C_p,
                                                    myProof.proof.H,
                                                    myProof.proof.K,
                                                    myProof.input,
                                                    tokenId,
                                                    "0x501f478159D380Fa97fC05dc8c4373BF9352Acd5"
                                                    );
  }


};