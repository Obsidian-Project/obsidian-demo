import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { createSmartContractObject, setDefaultAccount, obsidianContract } from './utils/smartcontract';
import { SMART_CONTRACT_INFO_URL, ACCOUNT_INFO_URL } from './constants';

localStorage.clear();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

axios.get(SMART_CONTRACT_INFO_URL)
    .then((smartContractInfo) => {
        axios.get(ACCOUNT_INFO_URL)
            .then((accountInfo) => {                      
                let contractObject = createSmartContractObject(smartContractInfo.data, accountInfo.data.account);                
                setDefaultAccount(accountInfo.data.account);
                //setSmartContractObject(contractObject);
                let obsidianActions = obsidianContract(contractObject);
                const createStoreWithMiddleware = applyMiddleware(reduxThunk.withExtraArgument({ ObsidianSmartContract: contractObject, Obsidian: obsidianActions }))(createStore);
                const store = createStoreWithMiddleware(reducers);
                ReactDOM.render(
                    <App store={store} />,
                    document.getElementById("root"));
            });
    });    