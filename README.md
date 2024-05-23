# Simple util to check Guild Wars 2 stock exchange prices with notifier

## Tech stack

* Node.js > 20 (uses fetch, in older Node's its experimental)

* [Guild Wars 2 API](https://wiki.guildwars2.com/wiki/API:2/commerce/exchange/coins) (no need API key for usage). Disclaimer: prices transmitted through the official API do not always correspond to the real exchange rate in the game client and may differ.

* [node-notifier](https://github.com/mikaelbr/node-notifier) for notification in macOS, Windows and Linux.

## Usage

```bash
node .\index.js <number>
```

`<number>` - price in gold for 100 gems, you are looking for. Check [this great site](https://www.gw2tp.com/gems) for gold-gems exchange to choose a favourable exchange rate for you

## Usage in scheduler

You can use this util with the task scheduler (crontab or Windows Scheduler) in your operating system to run the utility from command line.

## TODO

* Implement message sending to you Telegram via bot
