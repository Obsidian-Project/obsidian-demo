pragma solidity ^0.4.0;
contract Obsidian {
    
    address public owner;
    uint256 public numberOfGroups;
    uint256 public numberOfMembers;
    uint256 public numberOfPrograms;
    uint256 public numberOfRequest;
    uint256 public numberOfProgramsDelivered;
    
    mapping(address => bool) public members; //para validar si es parte de algun grupo
    mapping(uint256 => bool) public programs;// para validar si existe el programa
    
    mapping(address => uint256) public balances;
    mapping(uint256 => Group) groupInfo; //id of group and groupInfo
    mapping(address => Member) public memberInfo;
    mapping(uint256 => Program) public programInfo;
    mapping(uint256 => address) public requestInfo;
    
   // struct Request {
  //      address sender;
//    }
    struct Program {
        //TODO: beneficiary (the group)
        bool delivered;
        string ipfsHash;
    }
    struct Group {
        address[] members;
    }
    
    struct Member {
        string latitude;
        string longitude;
        uint256 sizeOfLand;
    }
    
    //TODO: event for new groups
    event newMemberAdded(address memberAdress, bool isRegistered);
    event newProgramAdded(uint256 programId, string ipfsHash);
    event newEquipmentRequested(uint256 programId, address beneficiary);
    
    //proposals ( I need to track the requests)
    function Obsidian() public {
        numberOfGroups = 0;
        numberOfMembers = 0;
        numberOfPrograms = 0;
    }
    
    function addProgram(string ipfsHash) public returns(bool result) {
         numberOfPrograms++;
         programs[numberOfPrograms] = true;
         programInfo[numberOfPrograms] = Program(false, ipfsHash);
         newProgramAdded(numberOfPrograms, ipfsHash);
         result = true;
         return result;
    }
    function addMember(address newMember, string latitude, string longitude, uint256 sizeOfLand) 
        public returns(bool result){
        //TODO: validate if it is already member to avoid increasing numberOfMembers
        numberOfMembers++;
        memberInfo[newMember] = Member(latitude, longitude, sizeOfLand);
        members[newMember] = true;
        result = true;
        newMemberAdded(newMember, result);
        return result;
    }
    
    function requestEquipment(uint256 programId, address requester) public returns (bool result) {
        numberOfRequest++;
        newEquipmentRequested(programId, requester);   
        requestInfo[numberOfRequest] = requester;
        result = true;
        return result;
    }
    
    //TODO: DO the transfer
    
    //in reality it should be a multisignature wallet, or something like that?
    //because I can just do simple smart contract to get the info, but not sure if it 
    //is going to be totally effective as a scalable solution
    function registerGroup(address[] newGroupMembers) public returns (bool result) {
        //for demo just use 2 members
        //add require to check lenght
        numberOfGroups++;
        groupInfo[numberOfGroups] = Group(newGroupMembers);
        result = true;
        return result;
    }
    
    function getGroupInfo(uint element) public constant returns (Group groupInformation){
        return groupInfo[element];
    }
    //transfer token
    //demo con 2 miembros
    //crear token
}

//when I tokenize an item, I just create a token with x supply, right?


//how to transfer to this group the token?
//approve transactions, 
//require equipment
//


//model smart contract

//I request equipment 
    //For demo, If I request and my friend approves, then we get it.
    //maybe just send the requestId and the answer
    //yeah, I need to check the tutorial
    
//I approve equipment
    //as pointed above
    
//I need to transfer tokens
    //create token contract
    
//I need to create tokens
    //as pointed above? Maybe for demo I can use Solc to deploy a smart contract and
    //use the ID of the element selected, then how do I share this information with 
    //the customers? I think I need to have an API with 2 extra fields, ABI and Address,
    //So that I can make the transaction from the other side
    
//I create subsidies, which I think it is the token creation? Maybe just Update the supply?
    //Same as above, however, Remember that I need to notify members
    
//I create a group, I have a group, then what?
    //then, In order to receive a token, they need to approve it. This process can start
    //by the request of a equipment from a mobile application
    
//Then we have both members, and they request equipment
    
//notify the other and send a transaction with an answer
//do you approve it?

//que informacion necesito? 

//maybe we need like an inventory to refer to the item?
//like refering to the id of the item ?


//TODO
//Create token smart contract
    //Model Tractor token, I need to have an inventory? How do I get the data? IPFS?
    //Maybe for demo purposes I can just store a link to my Private IP and when we receive
    //the response, then we can get the information of the machine
    //I just can store basic informacion off chain and Linked with the Token, The supply
    //and the owners