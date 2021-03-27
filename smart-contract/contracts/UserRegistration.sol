// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserRegistration {
    struct UserMasterRegistration {
        string name;
        uint256 age;
        string state;
        string district;
        string dob;
        string phoneNumber;
        string profession;
    }

    string[] userMasterRegistrationIds;

    mapping(string => UserMasterRegistration) public userMasterRegistrationList;

    function saveUserRegistrationDetails(
        string memory _userMasterId,
        string memory _name,
        uint256 _age,
        string memory _state,
        string memory _district,
        string memory _dob,
        string memory _phoneNumber,
        string memory _profession
    ) public {
        userMasterRegistrationList[_userMasterId] = UserMasterRegistration(
            _name,
            _age,
            _state,
            _district,
            _dob,
            _phoneNumber,
            _profession
        );

        userMasterRegistrationIds.push(_userMasterId);
    }

    function displayDetails(string memory _userMasterId)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            userMasterRegistrationList[_userMasterId].name,
            userMasterRegistrationList[_userMasterId].age,
            userMasterRegistrationList[_userMasterId].state,
            userMasterRegistrationList[_userMasterId].district,
            userMasterRegistrationList[_userMasterId].dob,
            userMasterRegistrationList[_userMasterId].phoneNumber,
            userMasterRegistrationList[_userMasterId].profession
        );
    }
}
