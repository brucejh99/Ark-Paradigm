Ark Paradigm co-op coding challenge. Details can be found here: https://gist.github.com/The-Pied-Piper/d1722a7ceb9bfdf4c5064fbfeebd8c5e.
Unfortunately, this is the time when a lot of coding challenges come out at once so I won't be refactoring anything. But, it's short so hopefully it's good enough. :)

## Instructions:
1. To sample this project, navigate to the root directory and run `npm start`. This should start the server at `localhost:3000`.
2. Open `localhost:3000` in your favourite browser and you will see a page that says: "Ark Paradigm Coding Challenge" and "Updates:". This page uses socket.io to display live updates when PUT requests occur.
3. To test endpoints, keep the project running (don't press `Ctrl + C` after `npm start`) and follow the instructions under "Endpoints" below.

## Endpoints:
There are 2 endpoints you can ping, a PUT endpoint which will update the store.json file with a key-value pair and a GET endpoint which will fetch a value corresponding to a give key. To use them, open up something that can make GET and PUT requests (I like to use Postman) and:

**GET:**
Set your program to `GET` and add a body with a field called key and the key you want to get a corresponding value for. For example, to get the value associated with key 1:
```json
{
    "key": 1
}
```
Then, when you send the request, you should see a response associated with that key. The default value for the command above should be "Ark Paradigm".

**PUT:**
Set your program to `PUT` and add a body with fields called key and value. Then, assign each one some value you want to be added as a key-value pair to the file. For example, to set key 5 to have value "sample":
```json
{
    "key": 5,
    "value": "sample"
}
Then, when you send your request, you should see a response 200 if it succeeded or a code 400+ with a message describing the problem. Note that this will overwrite the existing value if a key already exists. If you have the browser open to the server, you should also be able to see a message appear stating the key and value that you added.

To shut down the server, press `Ctrl + C`.
