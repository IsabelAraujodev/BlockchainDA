// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataRegistry {
    struct DataRecord {
        address uploader;
        string dataHash; // hash do arquivo de dados
        uint256 timestamp;
    }

    mapping(string => DataRecord) public records;

    event DataRegistered(address uploader, string dataHash, uint256 timestamp);

    function registerData(string memory _dataHash) public {
        require(bytes(_dataHash).length > 0, "Hash de dados vazio");
        require(records[_dataHash].timestamp == 0, "Este dado já foi registrado");

        records[_dataHash] = DataRecord(msg.sender, _dataHash, block.timestamp);
        
        emit DataRegistered(msg.sender, _dataHash, block.timestamp);
    }

    function getDataRecord(string memory _dataHash) public view returns (address, string memory, uint256) {
        DataRecord memory record = records[_dataHash];
        require(record.timestamp > 0, "Dado não encontrado");
        return (record.uploader, record.dataHash, record.timestamp);
    }
}
