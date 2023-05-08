// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./SBETERC223.sol";

contract Vesting {
    SBETERC223 public token;
    address public founderWallet;
    address public advisorAddress;
    address public teamAddress;
    uint256 public vestingStartTime;

    uint256 public constant INVESTOR_VESTING_AMOUNT = 120000000 * 10 ** 18;
    uint256 public constant ADVISOR_VESTING_AMOUNT = 16000000 * 10 ** 18;
    uint256 public constant TEAM_VESTING_AMOUNT = 24000000 * 10 ** 18;
    uint256 public constant VESTING_DURATION = 1200; // 10 minutes * 1200 = 20 hours

    mapping(address => uint256) public investorVesting;
    mapping(address => uint256) public advisorVesting;
    mapping(address => uint256) public teamVesting;

    constructor(
        uint256 _vestingStartTime,
        address _founderWallet,
        address _advisorAddress,
        address _teamAddress,
        address _tokenContractAddress
    ) {
        token = SBETERC223(0xc22062447e742e45F6f2fda32Aa65275b914e544);
        founderWallet = _founderWallet;
        advisorAddress = _advisorAddress;
        teamAddress = _teamAddress;
        vestingStartTime = _vestingStartTime;

        investorVesting[founderWallet] = INVESTOR_VESTING_AMOUNT;
        advisorVesting[advisorAddress] = ADVISOR_VESTING_AMOUNT;
        teamVesting[teamAddress] = TEAM_VESTING_AMOUNT;
    }

    function calculateVestedTokens(
        address _beneficiary,
        uint256 _vestingAmount
    ) public view returns (uint256) {
        uint256 elapsedTime = block.timestamp - vestingStartTime;
        uint256 vestingPeriods = elapsedTime / VESTING_DURATION;
        uint256 totalVestingAmount = vestingPeriods * _vestingAmount;
        return totalVestingAmount;
    }

    function withdrawInvestorTokens() public {
        uint256 vestedTokens = calculateVestedTokens(
            msg.sender,
            INVESTOR_VESTING_AMOUNT
        );
        require(vestedTokens > 0, "No tokens are available to withdraw");
        investorVesting[msg.sender] -= vestedTokens;
        token.transfer(msg.sender, vestedTokens);
    }

    function withdrawAdvisorTokens() public {
        uint256 vestedTokens = calculateVestedTokens(
            msg.sender,
            ADVISOR_VESTING_AMOUNT
        );
        require(vestedTokens > 0, "No tokens are available to withdraw");
        advisorVesting[msg.sender] -= vestedTokens;
        token.transfer(msg.sender, vestedTokens);
    }

    function withdrawTeamTokens() public {
        uint256 vestedTokens = calculateVestedTokens(
            msg.sender,
            TEAM_VESTING_AMOUNT
        );
        require(vestedTokens > 0, "No tokens are available to withdraw");
        teamVesting[msg.sender] -= vestedTokens;
        token.transfer(msg.sender, vestedTokens);
    }
}
