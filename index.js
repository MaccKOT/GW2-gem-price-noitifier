import notifier from "node-notifier";
import * as cheerio from "cheerio";
import syncFetch from "sync-fetch";

const args = process.argv.slice(2);

// Input arguments check
if (args.length === 0 || Number.isNaN(Number(args[0]))) {
	console.error("Parameter is not a valid number");
	console.log("Usage: node ./index.js <Number>");
	process.exit(1);
}

const priceToSearch = Number(args[0]).toFixed(2);

// Price parsing from site
function fetchGemPriceSync() {
	const response = syncFetch("https://www.gw2tp.com/");
	const data = response.text();
	const $ = cheerio.load(data);
	const price = $(".formatgw2money").text();

	const gold = price.slice(0, 2);
	const silver = price.slice(2, 4);

	if (Number.isNaN(gold) || Number.isNaN(silver)) {
		throw new Error("Unable to translate price into a number");
	}

	return Number(`${gold}.${silver}`).toFixed(2);
}

function desktopNotification(title, message) {
	notifier.notify({
		title: title,
		message: message,
		wait: false, 
	});

}

// Main logic
try {
	const gemPrice = fetchGemPriceSync();

	if (gemPrice > priceToSearch) {
		console.log(
			`Price checked: ${gemPrice} gold coins per 100 gems. Not today.`,
		);
		process.exit(0);
	}

	// Success
	const message = `Current price is ${gemPrice} gold for 100 gems.`;
	console.log(`${message} Time for shopping!`);
	desktopNotification("Time to buy GEMS 💎 in GW2!", message);
} catch (err) {
	console.error("Error:", err.message);
	process.exit(1);
}
