# Simple util to check Guild Wars 2 stock exchange course with notifier

## Tech stack

* Node.js > 20 (uses fetch, in older Node's its experimental)

* [Guild Wars 2 API](https://wiki.guildwars2.com/wiki/API:2/commerce/exchange/coins) (no need API key to usage)

* [node-notifier](https://github.com/mikaelbr/node-notifier) for notification in MacOS, Windows and Linux

## Usage

`node index.js -n "39.40"`

`-n` -display notifaction on desctop screen, otherwise return json:
``` 
{
  "current_price": "41.66",
  "you_favorable_price": "39.40",
  "result": false
}
```

"39.40" -  price in gold for 100 gems, you looking for. Check [this site](https://www.gw2tp.com/gems) for gold-gems exchange to choose a favourable exchange rate for you

## Usage in Windows sheduler

docs picture

## TODO

* Implement message sending to you Telegram via bot
