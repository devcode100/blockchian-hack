// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserMaster {
    struct UserDetails {
        string username;
        string role;
        bool isRegistered;
    }

    string[] usersList;

    mapping(string => UserDetails) public userDetailsList;

    function addUserDetails(
        string memory _id,
        string memory _username,
        string memory _role,
        bool _isRegistered
    ) public returns (bool) {
        userDetailsList[_id] = UserDetails(_username, _role, _isRegistered);
        usersList.push(_id);

        return true;
    }

    function checkIfUserisRegistered(string memory _id)
        public
        view
        returns (bool)
    {
        bool isRegistered = userDetailsList[_id].isRegistered;
        return isRegistered;
    }

    function updateisRegisteredData(string memory _id, bool isRegistered)
        public
    {
        userDetailsList[_id].isRegistered = isRegistered;
    }

    function getUserName(string memory _id)
        public
        view
        returns (string memory)
    {
        return userDetailsList[_id].username;
    }

    function getUserCount() public view returns (uint256) {
        return usersList.length;
    }
}
