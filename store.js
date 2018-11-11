const fs = require('fs');

function writeToFile(key, value) {
    // create file if it doesn't already exist
    if(!fs.existsSync('./store.json')) {
        console.log('File does not exist, creating new store.json file');
        const template = { table: [] };
        fs.writeFile('store.json', template, () => {});
    }
    fs.readFile('store.json', 'utf8', function callback(err, data) {
        if(err) {
            // throw error which will send 404 status
            console.log(err);
            throw err;
        } else {
            // update existing values if key already exists
            var updated = false;
            var object = JSON.parse(data);
            object.table.forEach(function(obj) {
                if(obj.key == key) {
                    obj.value = value;
                    updated = true;
                }
            });
            // add key-value to array if the value did not already exist
            if(!updated) {
                object.table.push({ key, value });
                console.log('Adding key-value');
            }
            // write back to file
            const jsonString = JSON.stringify(object);
            fs.writeFile('store.json', jsonString, function(err) {
                if(err) {
                    console.log(err);
                    throw 'Failed to write';
                }
            });
        }
    });
}

function getValue(key) {
    var value = undefined;
    const data = fs.readFileSync('store.json', 'utf8');
    // update existing values if key already exists
    const object = JSON.parse(data);
    object.table.forEach(function(obj) {
        if(obj.key == key) {
            value = obj.value;
        }
    });
    console.log(value);
    return value;
}

module.exports = { writeToFile, getValue };
