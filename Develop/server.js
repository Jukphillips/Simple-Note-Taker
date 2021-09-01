const express =  require('express')
const util = require('util')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})



app.get('/notes', (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")

})

app.get('/api/notes', (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
})

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};



app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`)
});