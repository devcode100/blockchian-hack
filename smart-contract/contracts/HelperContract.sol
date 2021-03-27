// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract HelperContract {
    struct HelperMasterContract {
        string helpUserId;
        string localAddress;
        string reliefDetails;
        string reliefPhotoHash;
    }

    string[] helperMasterContractIds;

    mapping(string => HelperMasterContract) public helperMasterContractList;

    function saveReliefHelperInfo(
        string memory _reliefRequestId,
        string memory _helpUserId,
        string memory _localAddress,
        string memory _reliefDetails,
        string memory _reliefPhotoHash
    ) public {
        helperMasterContractList[_reliefRequestId] = HelperMasterContract(
            _helpUserId,
            _localAddress,
            _reliefDetails,
            _reliefPhotoHash
        );
        helperMasterContractIds.push(_reliefRequestId);
    }

    function getAllReliefHelpersCount() public view returns (uint256) {
        return helperMasterContractIds.length;
    }
}
