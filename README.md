# Group BWT assignment

Created by Mykyta Cherevatyi

## Requirements

* Node.js >= 20

## Local development

The server is hosted here: [http://localhost:3010](http://localhost:3010)

### Questions

1. How to change the code to support different file versions?
   - The parser is capable of processing text files line by line using the split2 library.
   Supported formats are .txt, .csv, .json, etc. If there is a need to support specific formats,
   it will be necessary to determine the list of all possible input formats
   and use appropriate libraries designed specifically for reading certain formats.

2. How the import system will change if data on exchange rates disappears from
   the file, and it will need to be received asynchronously (via API)?
   - Slightly. Implementing doesn't require much effort, just adding
   an asynchronous request (like node-fetch, for example) to fetch currency rates data.
   As a result, the load on the parser will decrease, but
   the dependency on the network and other factors will increase.
   There are more risks of consistency violations.

3. In the future the client may want to import files via the web interface,
   how can the system be modified to allow this?
   - Reuse the parser logic in the API of our service. In my version, the parser works as a script.
   If it is necessary to add it into the API, the service logic will expand.
   In this case, instead of reading the dump file from the file system,
   we will receive it from the user over the network and process it accordingly with the parser.
