// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Metacrafters is ERC20, Ownable {

    address[] public candidates;

    constructor(address[] memory _candidates) ERC20("Metacrafters", "MTC") {
        candidates=_candidates;
    }

    function mint(address to) public onlyOwner {
        require(balanceOf(to)==0,"Token already given");
        _mint(to, 1);
    }

    function isCandidate(address _candidateAddress) internal view returns(bool){
        for(uint i=0;i<candidates.length;i++){
            if(candidates[i]==_candidateAddress){
                return true;
            }
        }
        return false;
    }

    function vote(address _to) public {
        require(isCandidate(_to),"Not a candidate");
        bool sent=transfer(_to,1);
        require(sent,"Error in Voting");
    }

    function calculateWinner() public view onlyOwner returns(address,uint256){
        address winner=candidates[0];
        uint256 winVotes=balanceOf(candidates[0]);
        for(uint256 i=1;i<candidates.length;i++){
            if(balanceOf(candidates[i])>winVotes){
                winner=candidates[i];
                winVotes=balanceOf(candidates[i]);
            }
        }
        return (winner,winVotes);
    }
}