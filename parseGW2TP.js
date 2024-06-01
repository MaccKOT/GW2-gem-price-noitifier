import fs from "node:fs";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";

// download gw2tp site whole source code
const stream = fs.createWriteStream("gw2tp.txt");
const { body } = await fetch("https://www.gw2tp.com/gems");
await finished(Readable.fromWeb(body).pipe(stream));

// find data in txt file or in stream: var data = [ ...... ] and extract last element []

// convert to human readeable format and return data [date, price]
