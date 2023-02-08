// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ArithmaticOperations{
    function add(int256 num1,int256 num2) public pure returns(int256){
        return num1+num2;
    }
        function subtract(int256 num1,int256 num2) public pure returns(int256){
        return num1-num2;
    }
        function multiply(int256 num1,int256 num2) public pure returns(int256){
        return num1*num2;
    }
        function divide(int256 num1,int256 num2) public pure returns(int256){
        require(num2!=0,"Zero Division error, Exiting");
        return num1/num2;
    }
}