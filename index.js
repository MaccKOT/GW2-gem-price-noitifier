import notifier from "node-notifier";
import * as cheerio from "cheerio";
import axios from "axios";

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
	const response = await axios.get("https://www.gw2tp.com/");
	const $ = cheerio.load(response.data);
	const price = $(".formatgw2money").text();

	const gold = price.slice(0, 2);
	const silver = price.slice(2, 4);
	// const date = new Date().toLocaleDateString();

	return Number(`${gold}.${silver}`).toFixed(2);
}

function desktop_notification(title, message) {
	notifier.notify({
		title: title,
		message: message,
	});
}

const currentCourse = fetch_gemprice();
currentCourse
	.then((gemPrice) => {
		if (gemPrice > priceToSearch) {
			console.log(
				`Priced checked: ${gemPrice} gold coins per 100 gems. Not today.`,
			);
			return;
		}

		const message = `Current price is ${gemPrice} gold for 100 gems.`;
		console.log(`${message} Time for shopping!`);
		desktop_notification("Time to buy GEMS in GW2!", message);
		return;
	})
	.catch((err) => {
		console.error(err);
	});
