const notifier = require("node-notifier");
const args = process.argv.slice(2);

// notifier.notify({
// 	title: "GW2 Price Notification",
// 	message: "hello!",
// });

const BASE_URL =
	"https://api.guildwars2.com/v2/commerce/exchange/coins?quantity=100000";

// return price in gold for 100 gems
async function fetch_gemprice() {
	const response = await fetch(BASE_URL);
	let gems_price = await response.json();
	console.log(gems_price);
	gems_price = (gems_price.coins_per_gem / 100).toFixed(2);

	return gems_price;
}

const currentCourse = fetch_gemprice();
currentCourse
	.then((data) => {
		//
		console.log(`Current price is ${data} gold for 100 gems.`);
	})
	.catch((err) => {
		console.log(err);
	});
