// Framework para crear un servidor web facilmente
const express = require('express')


//Pluggin para leer archivos
const fs = require('fs')

// Iniciamos el servidor Web desde el metodo express()
const app = express()

// Middlewares
app.use(express.json())

// Rutas
app.get('/productos/:nombre?', (req, res) => {
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    let response = []
    //si el parametro nombre existe
    if (req.params.nombre) {
        productos.map((value) => {
            if (req.params.nombre == value.nombre) {
                //Aqui se encuentra una coincidencia
                response.push(value)
            }
        })
    }
    else {
        response = productos
    }

    res.json(response)
})

app.post('/productos', (req, res) => {
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))

    productos.push(req.body)

    fs.writeFileSync("./src/db/productos.json", JSON.stringify(productos))
    res.json(productos)
})

app.delete('/productos/:nombre', (req, res) => {
   

        let nombre = req.params.nombre
        let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
        let index

        productos.map((value, i) => {
            if (value.nombre == nombre) {
                index = i
            }
        })
        productos.splice(index,1)

        fs.writeFileSync("./src/db/productos.json", JSON.stringify(productos))

        res.json(productos)
    })

app.put('/productos/:nombre', (req, res) => {

    //Actualizar un recurso
    let nombre = req.params.nombre
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    //si el parametro nombre existe

    productos.map((value, i) => {
        if (value.nombre == nombre) {
            value = req.body
            productos[i] = value
        }
    })
    fs.writeFileSync("./src/db/productos.json", JSON.stringify(productos))
    res.json(req.body)
    // res.send('Respuesta desde PUT')
})

/*app.put('/:nombre', (req, res) => {

    //Actualizar un recurso
    let nombre = req.params.nombre
    let productos = JSON.parse(fs.readFileSync('src/db/productos.json', 'utf8'))
    let index
    //si el parametro nombre existe

    productos.map((value, i) => {
        if (value.nombre == nombre) {
            index = i
        }
    })
    productos[index] = req.body

    fs.writeFileSync("./src/db/productos.json", JSON.stringify(productos))

    // res.send('Respuesta desde PUT')
})*/

// Metodo que permite al servidor web escuchar en un puerto especifico

app.get("/usuario",(req,res)=>
{
    res.send("Desde get usuario")
})

app.listen(3000, () => {
    console.log('El servidor esta ejecutandose en http://localhost:3000/')
})