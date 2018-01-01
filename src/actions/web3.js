import Web3 from 'web3';

const ETHEREUM_PROVIDER = "http://52.178.92.72:8545";

const web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER));

export default web3;
