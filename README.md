# Group BWT assignment

Created by Mykyta Cherevatyi

## Requirements

* Node.js >= 20

### Usage

Main script is located here:
>**./index.js**

Main parser is located here:
>**./helpers/calculators.js**

1. Install dependencies by command:

        npm install

2. Place your .json file with orders in the 'dumps' directory
3. Run script by command:

        node index.js <fileName.json>

### Tests

Test are located in the directory *./tests*
You can run and test application by command:

        npm run test
        

### Questions

How to extend functionality
1. Client could ask to add possibility to parse different file formats
- Then we will need to clearly define with the client what file formats
we will be processing and what the structure of these files will be.
After that, we will add support for these formats depending on the input parameters.
In the end, new functionality will be added with minor changes to the existing one.

2. Client can request to make fee parameters different
- Currently, the parser parameters are hardcoded in our class. If we are requested to receive this data 
via API, we will only slightly modify our code to retrieve the parser variables
from the network and pass them to the parser class when creating its instance.
