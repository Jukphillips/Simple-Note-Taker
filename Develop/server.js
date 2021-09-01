const express =  require('express')
const api = require('./routes/index')


const PORT = process.env.PORT || 3001;

const app = express();

app.use("/api", api)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})



app.get('/notes', (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")

})

app.listen(PORT, () => {
    console.log(`App listening at ${PORT}`)
});