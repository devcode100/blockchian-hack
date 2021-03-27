// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract ReliefRequest {
    struct ReliefRequestMaster {
        string userId;
        string userMappedId;
        string status;
        string helpGoodsPhotoHash;
        string receivedGoodsPhotoHash;
        string goodsReceivedDate;
    }

    string[] reliefRequestIds;

    mapping(string => ReliefRequestMaster) public reliefRequestMasterList;

    function saveReliefRequest(
        string memory _requestId,
        string memory _userId,
        string memory _userMappedId,
        string memory _status
    ) public {
        reliefRequestMasterList[_requestId] = ReliefRequestMaster(
            _userId,
            _userMappedId,
            _status,
            "",
            "",
            ""
        );

        reliefRequestIds.push(_requestId);
    }

    function getReliefRequestCount() public view returns (uint256) {
        return reliefRequestIds.length;
    }

    function checkIsRequestValid(string memory _requestId)
        public
        view
        returns (bool)
    {
        string memory userId = reliefRequestMasterList[_requestId].userId;

        if (bytes(userId).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function updateStatusAndMappedUser(
        string memory _id,
        string memory status,
        string memory mapepdUserId
    ) public {
        reliefRequestMasterList[_id].userMappedId = mapepdUserId;
        reliefRequestMasterList[_id].status = status;
    }

    function updateStatusMappedHelperGoodsHash(
        string memory _id,
        string memory status,
        string memory mapepdUserId,
        string memory helpGoodsPhotoHash
    ) public {
        reliefRequestMasterList[_id].userMappedId = mapepdUserId;
        reliefRequestMasterList[_id].status = status;
        reliefRequestMasterList[_id].helpGoodsPhotoHash = helpGoodsPhotoHash;
    }

    function updateStatusMappedReceiveGoodsHash(
        string memory _id,
        string memory status,
        string memory mapepdUserId,
        string memory receivedGoodsPhotoHash,
        string memory goodsReceivedDate
    ) public {
        reliefRequestMasterList[_id].userMappedId = mapepdUserId;
        reliefRequestMasterList[_id].status = status;
        reliefRequestMasterList[_id]
            .receivedGoodsPhotoHash = receivedGoodsPhotoHash;
        reliefRequestMasterList[_id].goodsReceivedDate = goodsReceivedDate;
    }
}
