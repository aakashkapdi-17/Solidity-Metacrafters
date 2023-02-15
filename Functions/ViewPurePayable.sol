// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

// For this challenge, write a smart contract that uses view, pure, and payable functions. 
// Ensure that the functions are accessible within the contract and derived contracts as well.

contract ViewPurePayable{
    uint8 var1;
    address payable owner;
    
    constructor(){
        owner=payable(msg.sender);
    }

    function setVar(uint8 _var) public {
        var1=_var;
    }

    function getVar() public view returns(uint8){
        return var1;
    }

    function payOwner() public payable{
        require(msg.value >= 1 ether,"Send more ether");
        owner.transfer(msg.value);
    }

    //Pure function 
    function pureFunc(uint8 a ,uint8 b ) public pure returns(uint8){
        if(a<b){
            uint8 temp=a;
            a=b;
            b=temp;
        }
        return a-b;
    }
}