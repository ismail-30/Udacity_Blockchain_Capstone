pragma solidity >=0.4.21 <0.6.0;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721MintableComplete.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete{
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address addr;
    }

    Verifier public solVerifier;

    constructor(address solVerifierAddr, string name, string symbol) 
    ERC721MintableComplete(name, symbol) 
    public
    {
            solVerifier = Verifier(solVerifierAddr);
    }


    // TODO define an array of the above struct
    Solution[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solution) solutionsMap;

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 solIndex, address indexed solAddress);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 _idx, address _addr, bytes32 _key) public {
        Solution memory newSolution = Solution({index: _idx, addr:_addr});
        solutions.push(newSolution);
        solutionsMap[_key] = newSolution;
        emit SolutionAdded(_idx, _addr); 

    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly







}






















  


























