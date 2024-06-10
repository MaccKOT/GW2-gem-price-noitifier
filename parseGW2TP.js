import * as cheerio from "cheerio";
import axios from "axios";

// we dont need 4 mb file
// we can scrap current price from main page https://www.gw2tp.com/ -> inside span.gold and span.silver for 100 gems

// load and find data

async function fetch_page() {
	const response = await axios.get("https://www.gw2tp.com/");
	//console.log(response.data);
	const $ = cheerio.load(response.data);
	const price = $(".formatgw2money").text();

	const gold = price.slice(0, 2);
	const silver = price.slice(2, 4);
	const date = new Date().toLocaleDateString();

	return [date, { gold, silver }];
}

fetch_page()
	.then((res) => console.log(res))
	.catch((err) => console.log(err));

// return data [date, price]
