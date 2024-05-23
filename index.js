const notifier = require("node-notifier");
const args = process.argv.slice(2);

// input arguments validation
if (args.length === 0) console.error("There's no parameters");
try {
	Number(args[0]).toFixed(2);
} catch {
	console.error("Parameter is not a valid number");
}

const priceToSearch = Number(args[0]).toFixed(2);

const BASE_URL =
	"https://api.guildwars2.com/v2/commerce/exchange/coins?quantity=100000";

// return price in gold for 100 gems
async function fetch_gemprice() {
	const response = await fetch(BASE_URL);
	let gems_price = await response.json();
	gems_price = (gems_price.coins_per_gem / 100).toFixed(2);

	return gems_price;
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
		if (gemPrice >= priceToSearch) {
			console.log("Not today.");
			process.exit(0);
		}
		const message = `Current price is ${gemPrice} gold for 100 gems.`;
		desktop_notification("Time to buy GEMS in GW2!", message);
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
	});
