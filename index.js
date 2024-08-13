import notifier from "node-notifier";
import * as cheerio from "cheerio";

const args = process.argv.slice(2);

// input arguments validation
if (args.length === 0) {
	console.error("There's no parameters");
	process.exit(0);
}
try {
	Number(args[0]).toFixed(2);
} catch {
	console.error("Parameter is not a valid number");
}

const priceToSearch = Number(args[0]).toFixed(2);

// data fetching and scrapping
async function fetch_gemprice() {
	const response = await fetch("https://www.gw2tp.com/");
	const data = await response.text();
	const $ = cheerio.load(data);
	const price = $(".formatgw2money").text();

	const gold = price.slice(0, 2);
	const silver = price.slice(2, 4);
	if (Number.isNaN(gold) || Number.isNaN(silver))
		throw new Error("Unable to translate price into a number");

	return Number(`${gold}.${silver}`).toFixed(2);
}

function desktop_notification(title, message) {
	notifier.notify({
		title: title,
		message: message,
	});
}

fetch_gemprice()
	.then((gemPrice) => {
		if (gemPrice > priceToSearch) {
			console.log(
				`Price checked: ${gemPrice} gold coins per 100 gems. Not today.`,
			);
			process.exit(0);
		}

		// Success
		const message = `Current price is ${gemPrice} gold for 100 gems.`;
		console.log(`${message} Time for shopping!`);
		desktop_notification("Time to buy GEMS in GW2!", message);
	})
	.catch((err) => {
		console.error(err);
	});
