const express = require('express')

let contadorVisitas = 0

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//console.log('dirname:', __dirname)

/* --------------------------------------------------------- */
/*                Proceso de las rutas GET                   */
/* --------------------------------------------------------- */
app.get('/', (req,res) => {
    contadorVisitas++
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/saludo/:empresa?/:encargado?', (req,res) => {
    const { url:ruta, method, query, params } = req
    res.send(`
        <h4>Hola Node.JS - fyh: ${new Date().toLocaleString()}</h4>
        <p>
            url: ${ruta}<br>
            method: ${method}<br> 
            query: ${JSON.stringify(query)}<br>
            params: ${JSON.stringify(params)}
        </p>        
    `)
})

app.get('/contador', (req,res) => {
    res.status(200).send(`
        <h3 style="color:crimson;">
            Ud. visitó el sitio root ${contadorVisitas} ${contadorVisitas == 1? 'vez': 'veces'}
        </h3>
    `)
})

app.get('*', (req,res) => {
    let { url } = req
    res.status(404).send(`
        <h3 style="color:red;">
            La ruta GET ${url} no es válida
        </h3>
    `)    
})

/* --------------------------------------------------------- */
/*               Proceso de las rutas POST                   */
/* --------------------------------------------------------- */
app.post('/', (req,res) => {
    const { url:ruta, method, query, params, body } = req
    res.send(`
        <h4>Hola Node.JS - fyh: ${new Date().toLocaleString()}</h4>
        <p>
            url: ${ruta}<br>
            method: ${method}<br> 
            query: ${JSON.stringify(query)}<br>
            params: ${JSON.stringify(params)}<br>
            buffer: ${JSON.stringify(body)}
        </p>        
    `)
})

app.post('/datos', (req,res) => {
    const { email, password } = req.body

    console.log(/* req.body,  */email, password)

    //res.send('Recibido!')
    //res.redirect('/')
    res.sendFile(__dirname + '/views/ok.html')
})

app.post('*', (req,res) => {
    let { url } = req
    res.status(500).send(`
        <h3 style="color:red;">
            La ruta POST ${url} no es válida
        </h3>
    `)    
})

/* --------------------------------------------------------- */
/*               Proceso de las rutas PUT                    */
/* --------------------------------------------------------- */
app.put('*', (req,res) => {
    let { url } = req
    res.status(500).send(`
        <h3 style="color:red;">
            La ruta PUT ${url} no es válida
        </h3>
    `)    
})

/* --------------------------------------------------------- */
/*              Proceso de las rutas DELETE                  */
/* --------------------------------------------------------- */
app.delete('*', (req,res) => {
    let { url } = req
    res.status(500).send(`
        <h3 style="color:red;">
            La ruta DELETE ${url} no es válida
        </h3>
    `)    
})

const PORT = process.env.PORT || 8080
const srv = app.listen(PORT, () => console.log('Servidor express escuchando en http://localhost:' + PORT))
srv.on('error', error => console.log(`Error en servidor http: ${error.message}`))

