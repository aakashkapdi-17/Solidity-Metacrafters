// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract GettersAndSetters{
    uint256 uintVariable;
    int256 intVariable;
    bool boolVariable;
    address addressVariable;

    function getVariables()public view returns(uint256,int256,bool,address){
        return  (uintVariable,intVariable,boolVariable,addressVariable);
    }

    function setVariables(uint256 _uintVariable, int256 _intVariable,bool _boolVariable,address _addressVariable) public {
     uintVariable=_uintVariable;
     intVariable=  _intVariable;
     boolVariable=_boolVariable;
     addressVariable=     _addressVariable;
    }
}