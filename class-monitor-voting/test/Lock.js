const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Voting Contract", function () {
  async function deployVotingContract() {
    const [owner, account1, account2, account3, account4] =
      await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    return { voting, owner, account1, account2, account3, account4 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { voting, owner } = await loadFixture(deployVotingContract);

      expect(await voting.owner()).to.equal(owner.address);
    });
  });

  describe("Add student Function", function () {
    it("only Owner should be able to call function", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName = "abc";
      const rollNo = 1;

      await expect(
        voting
          .connect(account1)
          .addStudent(account2.address, rollNo, studentName)
      ).to.be.revertedWith("You are not the owner.");
    });
    it("Should Not add student twice with same account no", async function () {
      const { voting, owner, account1 } = await loadFixture(
        deployVotingContract
      );

      const studentName = "abc";
      const rollNo = 1;

      await voting.addStudent(account1.address, rollNo, studentName);

      await expect(
        voting.addStudent(account1.address, rollNo, studentName)
      ).to.be.revertedWith(
        "You can't add this address twice :- Duplicate address"
      );
    });
    it("Should Not add student twice with same Roll no", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName = "abc";
      const rollNo = 1;

      await voting.addStudent(account1.address, rollNo, studentName);

      await expect(
        voting.addStudent(account2.address, rollNo, studentName)
      ).to.be.revertedWith(
        "You can't add this address twice :- Duplicate Roll No"
      );
    });

    it("Should add Data to both the mappings if everything is fine", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName = "abc";
      const rollNo = 1;

      await voting.addStudent(account1.address, rollNo, studentName);

      const obj = await voting.students(account1.address);

      expect(obj[0]).to.equal(studentName);
      expect(obj[1]).to.equal(rollNo);
      expect(obj[2]).to.equal(false);

      expect(await voting.studentsRollNos(rollNo)).to.equal(account1.address);
    });
  });
  describe("Vote Function", function () {
    it("Should not allow to outsider to vote", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName = "abc";
      const rollNo = 1;

      await voting.addStudent(account1.address, rollNo, studentName);

      await expect(voting.connect(account2).vote(1)).to.be.revertedWith(
        "You are not listed in the class"
      );
    });

    it("Should not allow to vote outsiders", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName = "abc";
      const rollNo = 1;

      await voting.addStudent(account1.address, rollNo, studentName);

      await expect(voting.connect(account1).vote(2)).to.be.revertedWith(
        "You cant't Vote for student outsie the class"
      );
    });

    it("Should not allow to vote twice", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName1 = "abc";
      const rollNo1 = 1;

      const studentName2 = "abc";
      const rollNo2 = 2;

      await voting.addStudent(account1.address, rollNo1, studentName1);
      await voting.addStudent(account2.address, rollNo2, studentName2);

      await voting.connect(account1).vote(rollNo2);

      await expect(voting.connect(account1).vote(rollNo2)).to.be.revertedWith(
        "You can't vote twice"
      );
    });

    it("Registers Votes Correctly", async function () {
      const { voting, owner, account1, account2 } = await loadFixture(
        deployVotingContract
      );

      const studentName1 = "abc";
      const rollNo1 = 1;

      const studentName2 = "abc";
      const rollNo2 = 2;

      await voting.addStudent(account1.address, rollNo1, studentName1);
      await voting.addStudent(account2.address, rollNo2, studentName2);

      await voting.connect(account1).vote(rollNo2);

      expect(await voting.votes(rollNo2)).to.equal(1);
    });

    it("Adds candidates to candidates array", async function () {
      const { voting, owner, account1, account2, account3 } = await loadFixture(
        deployVotingContract
      );

      const studentName1 = "abc";
      const rollNo1 = 1;

      const studentName2 = "abc";
      const rollNo2 = 2;

      const studentName3 = "abc";
      const rollNo3 = 3;

      await voting.addStudent(account1.address, rollNo1, studentName1);
      await voting.addStudent(account2.address, rollNo2, studentName2);
      await voting.addStudent(account3.address, rollNo3, studentName3);

      await voting.connect(account1).vote(rollNo3);
      await voting.connect(account2).vote(rollNo2);

      expect(await voting.candidates(0)).to.equal(rollNo3);
      expect(await voting.candidates(1)).to.equal(rollNo2);
    });
  });

  describe("Calculate Winner Function", function () {
    it("Should only be called by Owner", async function () {
      const { voting, owner, account1 } = await loadFixture(
        deployVotingContract
      );
      await expect(
        voting.connect(account1).calculateWinner()
      ).to.be.revertedWith("You are not the owner.");
    });

    it("Should Return  Correct Winner", async function () {
      const { voting, owner, account1, account2, account3, account4 } =
        await loadFixture(deployVotingContract);
      const studentName1 = "abc";
      const rollNo1 = 1;

      const studentName2 = "abc";
      const rollNo2 = 2;

      const studentName3 = "abc";
      const rollNo3 = 3;

      const studentName4 = "abc";
      const rollNo4 = 4;

      await voting.addStudent(account1.address, rollNo1, studentName1);
      await voting.addStudent(account2.address, rollNo2, studentName2);
      await voting.addStudent(account3.address, rollNo3, studentName3);
      await voting.addStudent(account4.address, rollNo4, studentName4);

      await voting.connect(account1).vote(rollNo3);
      await voting.connect(account2).vote(rollNo3);
      await voting.connect(account3).vote(rollNo2);
      await voting.connect(account4).vote(rollNo4);

      await voting.calculateWinner();
      expect(await voting.winner()).to.equal(rollNo3);
    });
  });
});
