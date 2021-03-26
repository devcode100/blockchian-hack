// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract NgoRegistration {
    struct NgoMasterRegistration {
        string name;
        string state;
        string district;
        string phoneNumber;
        string emailAddress;
        string establishedDate;
    }

    string[] ngoMasterRegistrationIds;

    mapping(string => NgoMasterRegistration) public ngoMasterRegistrationList;

    function saveUserRegistrationDetails(
        string memory _userMasterId,
        string memory _name,
        string memory _state,
        string memory _district,
        string memory phoneNumber,
        string memory _emailAddress,
        string memory _establishedDate
    ) public {
        ngoMasterRegistrationList[_userMasterId] = NgoMasterRegistration(
            _name,
            _state,
            _district,
            phoneNumber,
            _emailAddress,
            _establishedDate
        );

        ngoMasterRegistrationIds.push(_userMasterId);
    }
}
