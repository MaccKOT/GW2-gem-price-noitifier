# Simple Node.js util to check Guild Wars 2 stock exchange prices with notifier

## Tech stack

* Node.js (cheerio)

* Prices transmitted through the official API do not correspond to the real exchange rate in the game client and differ. Actual prices only at [this site](https://www.gw2tp.com/gems).

* [node-notifier](https://github.com/mikaelbr/node-notifier) for notification in macOS, Windows and Linux.

## Usage

```bash
node index.js <number>
```

`<number>` - price in gold for 100 gems, you are looking for. Check [this site](https://www.gw2tp.com/gems) for gold-gems exchange to choose a favourable exchange rate for you

## Usage in scheduler

You can use this util with the task scheduler (crontab or Windows Scheduler) in your operating system to run the utility from command line.

## TODO

* Save log in txt file

* Implement message sending to you Telegram via bot

* Implement some tests (vitest)
