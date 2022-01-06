pragma solidity ^0.5.0;

import "./ERC721MintableComplete.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import "./Verifier.sol";


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is ERC721MintableComplete{
    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address addr;
    }

    using SafeMath for uint256;

    // TODO define an array of the above struct
    Solution[] private solutions;

    // TODO define a mapping to store unique solutions submitted
    mapping (bytes32 => Solution) solutionsMap;

    Verifier public solVerifier;

    constructor(address solVerifierAddr, string memory _name, string memory _symbol) 
    ERC721MintableComplete(_name, _symbol) 
    public
    {
            solVerifier = Verifier(solVerifierAddr);
    }

    // TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 indexed solIndex, address indexed solAddress);
    event TokenMinted(uint256 indexed idx, address indexed addr);

    // Modifier to check if solution is unique
    modifier isUnique(uint256 _idx, address _addr) {
        bytes32 key = keccak256(abi.encodePacked(_idx, _addr));
        require(solutionsMap[key].addr == address(0), "Solution already exists");
        _;
    }


    // TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 _idx, address _addr) public {
        Solution memory newSolution = Solution({index: _idx, addr:_addr});
        solutions.push(newSolution);
        bytes32 key = keccak256(abi.encodePacked(_idx, _addr));
        solutionsMap[key] = newSolution;
        emit SolutionAdded(_idx, _addr); 
    }


    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSuplly
    function mintNewToken(
            uint[2] memory A,
            uint[2] memory A_p,
            uint[2][2] memory B,
            uint[2] memory B_p,
            uint[2] memory C,
            uint[2] memory C_p,
            uint[2] memory H,
            uint[2] memory K,
            uint[2] memory input,
            uint256 index,
            address to
            ) 
    public
    isUnique(index, to)
    {
        require(solVerifier.verifyTx(A, A_p, B, B_p, C, C_p, H, K, input), "Solution verification failed");
        addSolution(index, to);
        super.mint(to, index);
        emit TokenMinted(index, to);

    }

}
