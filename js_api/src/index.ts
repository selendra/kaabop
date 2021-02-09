import "@babel/polyfill";
import { WsProvider, ApiPromise } from "@polkadot/api";
import { subscribeMessage, getNetworkConst, getNetworkProperties } from "./service/setting";
import keyring from "./service/keyring";
import account from "./service/account";
import staking from "./service/staking";
import gov from "./service/gov";
import { genLinks } from "./utils/config/config";
import { Abi, ContractPromise } from '@polkadot/api-contract';
import metadata from "./metadata.json";

// send message to JSChannel: PolkaWallet
function send(path: string, data: any) {
  if (window.location.href === "about:blank") {
    PolkaWallet.postMessage(JSON.stringify({ path, data }));
  } else {
    console.log(path, data);
  }
}
send("log", "main js loaded");
(<any>window).send = send;

/**
 * connect to a specific node.
 *
 * @param {string} nodeEndpoint
 */
async function connect(nodes: string[]) {
  return new Promise(async (resolve, reject) => {
    const wsProvider = new WsProvider(nodes);
    try {
      const res = await ApiPromise.create({
        provider: wsProvider,
      });
      (<any>window).api = res;
      const url = nodes[(<any>res)._options.provider.__private_9_endpointIndex];
      send("log", `${url} wss connected success`);
      resolve(url);
    } catch (err) {
      send("log", `connect failed`);
      wsProvider.disconnect();
      resolve(null);
    }
  });
}

async function callContract(api: ApiPromise) {
  return new Promise(async (resolve, reject) => {
    //const ERC20 = '5CyvZsXQAUNKYH6f38vCku9bXkWVAxaAwksFYRDpGJYcx4Vv';
    const ERC1400 = '5DyX3Fwjqo9MKRtg77ukLEYfeC9mfeJPq7MNTgcu7r5oc7P9';
    const abiJSONobj = (<any>metadata);
    const abi = new Abi(abiJSONobj);
    const res = new ContractPromise(api, abi, ERC1400);
    (<any>window).apiContract = res;
    resolve(res.address);
    send("log", `${res.address} contract connected success`);
  });

}

async function contractSymbol(apiContract: ContractPromise, from: string) {
  return new Promise(async (resolve, reject) => {
    try {

      const result = await apiContract.query.symbol(from, 0, -1);
      resolve(result.output);
      send("log", `${result.output} contract connected success`);
      return result.output.toString();


    } catch (e) {
      resolve({ err: e.message });
    }
  });
}

async function totalSupply(apiContract: ContractPromise, from: string) {
  return new Promise(async (resolve, reject) => {

    try {
      const result = await apiContract.query.totalSupply(from, 0, -1);

      resolve(result);
      send('log', result.output.toString);

      return result.output.toString();
      // resolve(result);
    } catch (err) {
      resolve({ err: err.message });
    }
  });
}
// const result = await this.polkadotApiService.apiContract.query.balanceOf(from, 0, -1, who);

async function balanceOf(apiContract: ContractPromise, from: string, who: string) {
  return new Promise(async (resolve, reject) => {

    try {
      const result = await apiContract.query.balanceOf(from, 0, -1, who);

      resolve(result);
      send('log', result.output.toString);

      return result.output.toString;
      // resolve(result);
    } catch (err) {
      resolve({ err: err.message });
    }
  });
}


async function balanceOfByPartition(apiContract: ContractPromise, from: string, who: string, hash: string) {
  return new Promise(async (resolve, reject) => {

    try {
      const result = await apiContract.query.balanceOfByPartition(from, 0, -1, who, hash); //.query.balanceOfByPartition(from, 0, -1, who);

      resolve(result);
      send('log', result.output.toString);

      return result.output.toString;
      // resolve(result);
    } catch (err) {
      resolve({ err: err.message });
    }
  });
}


async function getPartitionHash(apiContract: ContractPromise, from: string) {
  return new Promise(async (resolve, reject) => {

    try {
      const result = await apiContract.query.listOfPartition(from, 0, -1);

      resolve(result);
      send('log', result.output.toString);

      return result.output.toString;
      // resolve(result);
    } catch (err) {
      resolve({ err: err.message });
    }
  });
}

async function getHashBySymbol(apiContract:ContractPromise,from:string,symbol:string) {
  return new Promise(async (resolve, reject) => {

    try {
      const result = await apiContract.query.getHashBySymbol(from,0,-1,symbol);

      resolve(result.output);
      send('log', result.output.toString);

      return result.output.toString;
      // resolve(result);
    } catch (err) {
      resolve({ err: err.message });
    }
  });
}

//const result = await this.polkadotApiService.apiContract.query.allowance(owner, 0, -1, owner, spender);

async function allowance(apiContract: ContractPromise, owner: string, spender: string) {
  return new Promise(async (resolve, reject) => {

    try {
      const result = await apiContract.query.allowance(owner, 0, -1, owner, spender);

      resolve(result);

      return result.output.toString;
      // resolve(result);
    } catch (err) {
      resolve({ err: err.message });
    }
  });
}


// async function totalSupply(apiContract: ContractPromise, from: string) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await apiContract.query.totalSupply(from, 0, -1);

//       send('log', result.output.toString);
//       resolve(result);
//     } catch (e) {
//       send('error', e.message);
//     }
//   });
// }

const test = async () => {
  // const props = await api.rpc.system.properties();
  // send("log", props);
};

const settings = {
  test,
  connect,
  callContract,
  contractSymbol,
  totalSupply,
  balanceOf,
  balanceOfByPartition,
  getPartitionHash,
  getHashBySymbol,
  allowance,
  subscribeMessage,
  getNetworkConst,
  getNetworkProperties,
  // generate external links to polkascan/subscan/polkassembly...
  genLinks,
};

(<any>window).settings = settings;
(<any>window).keyring = keyring;
(<any>window).account = account;
(<any>window).staking = staking;
(<any>window).gov = gov;

export default settings;
