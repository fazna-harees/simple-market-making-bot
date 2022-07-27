const axios = require("axios");

let balance = {
    ETH: 10,
    USD: 2000
}

let priceFeed;
let bestBid;
let bestAsk;

// get price
const getPrice = async() => {
    const { data } = await axios.get("https://api.rhino.fi/bfx/v2/book/tETHUSD/R0");
    // console.log(data)
    priceFeed = data;
}

const getBestData = () => {
    bestBid = priceFeed[0]
    bestAsk = priceFeed[priceFeed.length-1]
    const randBids = getRandomFivePrices(bestBid[1], true);
    const randAsks = getRandomFivePrices(bestAsk[1], false);
}

const sortPriceFeed = () => {
    let data = priceFeed;
    data  = data.sort((a,b) => a[2]<b[2] ? 1 : -1)
}

const getRandomBetweenRange = (max, min) => {
    let difference = max - min;
    let rand = Math.random();
    rand = rand * difference;
    rand = rand + min;
    return Math.round(rand *100)/100;
}

const getRandomFivePrices = (bestBid,isBid) => {
    let min = bestBid*0.95
    let max = bestBid*1.05
    const bestFive = []
    for(let i=0;i<5;i++) {
        let randomNum = getRandomBetweenRange(max,min)
        let randomQuantity = getRandomBetweenRange(0,isBid ? balance.ETH/10 : balance.USD/200)
        bestFive.push([randomNum, randomQuantity])
        console.log(`Placed ${isBid ? "BID" : "ASK" } @ ${randomNum} , ${randomQuantity} `)
    }
    console.log("\n")
    return bestFive;
}

// Show balance
const showBalance = () => {
    console.log(balance)
}

// Repeat a function fn every x seconds
const repeat = (fn, seconds) => {
    setTimeout(() => {
        fn()
    },seconds*1000)
}

// repeat(showBalance, 30);
getPrice()
getBestData()
