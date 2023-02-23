// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voting{
    address public owner;
    uint8 public winner;

    struct Student{
        string name;
        uint8 rollNo;
        bool voted;
    }

    mapping(address=>Student) public students;
    mapping(uint8=>address) public studentsRollNos;
    mapping(uint8=>uint8) public votes;

    uint8[] public candidates;

    constructor(){
        owner=msg.sender;
    }

    modifier onlyOwner{
        require(msg.sender==owner,"You are not the owner.");
        _;
    }

    function addStudent(address _studentAddress,uint8 _rollNo,string memory _name) onlyOwner public {
        require(students[_studentAddress].rollNo==0,"You can't add this address twice :- Duplicate address");
        require(studentsRollNos[_rollNo]==address(0),"You can't add this address twice :- Duplicate Roll No");
         Student memory newStudent=Student(_name,_rollNo,false);
         students[_studentAddress]=newStudent;
         studentsRollNos[_rollNo]=_studentAddress;
    }

     function vote(uint8 _rollNo) public {
         require(students[msg.sender].rollNo!=0,"You are not listed in the class");
         require(!students[msg.sender].voted,"You can't vote twice");
         require(studentsRollNos[_rollNo]!=address(0),"You cant't Vote for student outsie the class");
         if(votes[_rollNo]==0){
             candidates.push(_rollNo);
         }
         votes[_rollNo]++;
         students[msg.sender].voted=true;

     }

    function calculateWinner() onlyOwner public{
        uint8 maxVotes=0;
        uint8 winnerRollNo=0;
        if(candidates.length==0){
            revert("No Candidates");
        }
        for(uint8 i=0;i<candidates.length;i++){
            uint8 currentCandidate=candidates[i];
            if(votes[currentCandidate]>maxVotes){
                winnerRollNo=currentCandidate;
                maxVotes=votes[currentCandidate];
        
            }
        }
        winner=winnerRollNo;
    }
}