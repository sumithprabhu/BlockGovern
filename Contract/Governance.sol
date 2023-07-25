// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract governance{
    struct vote_format{
        uint256 yes;
        uint256 no;
    }
    struct account{
        string cont_id;
        address owner;
        string org_name;
        uint256 post_amount;
        string [] posts;
    }

    
    mapping (string=>account) name_account;
    mapping (string=>vote_format) pc_vf;
    mapping( string=>uint256) vote_cost;

    function create_account(string memory org_name,uint256 post_amount,string memory cont_id) public{
        require(name_account[org_name].owner!=msg.sender,"Name already taken/Address already in use");
        string[] memory arr;
        name_account[org_name]=account(cont_id,msg.sender,org_name,post_amount ,arr);  
    }

    function post(string memory org_name,string memory post_cont_id,uint256 cost) payable public{
        name_account[org_name].posts.push(post_cont_id);
        vote_cost[post_cont_id]=cost;
        address payable recipient = payable(name_account[org_name].owner);
        recipient.transfer(name_account[org_name].post_amount);
    }

    function vote(string memory org_name,uint256 vote_ans,string memory post_cont_id)payable public{
        address payable recipient = payable(name_account[org_name].owner);
        recipient.transfer(vote_cost[post_cont_id]);
        if (vote_ans==1){
            pc_vf[post_cont_id].yes+=1;
        }
        else{
            pc_vf[post_cont_id].no+=1;
        }
    }

    function retrieve_post(string memory org_name) public view returns(string[] memory){
        return name_account[org_name].posts;
    }
    
    function retrieve_vote_yes(string memory post_cont_id) public view returns(uint256){
        return pc_vf[post_cont_id].yes;
    }
    function retrieve_vote_no(string memory post_cont_id) public view returns(uint256){
        return pc_vf[post_cont_id].no;
    }
    function retrieve_about(string memory org_name) public view returns(string memory){
        return name_account[org_name].cont_id;
    }
    function retrieve_post_amount(string memory org_name)public view returns(uint256){
        return name_account[org_name].post_amount;
    }
    function retrieve_vote_amount(string memory post_cont_id) public view returns(uint256){
        return vote_cost[post_cont_id];
    }
    
    
}