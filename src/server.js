const express = require ("express")
const server = express()

// pegar o banco de dados

const db = require("./database/db")


//configura pasta publica
server.use(express.static("public"))


// habilitar o uso do req.body na aplicacao

server.use(express.urlencoded({extended:true}))



const nunjuckes = require("nunjucks")
nunjuckes.configure("src/views", {
    "express":server,
    "noCache":true,

})

server.get("/", (req,res) =>{
  return  res.render( "index.html")

})
server.get("/create-point", (req,res) =>{

  // console.log(req.query)
  return  res.render( "create-point.html")

})

server.post("/savepoint",(req,res) =>{

  // // req.body = corpo do formulario 
  // console.log(req.body)


  // inserir dados no banco

  const query =` INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
    
        ) VALUES (
            ?,?,?,?,?,?,?
        ); 
        `  
        const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]


    function afterInsertData(err){
        if(err){
          console.log(err)
            return res.send("erro no cadastro")
        }
        console.log("dados cadastrados com sucesso")
        console.log(this)

        
      return res.render("create-point.html",{saved: true})

    }

    db.run(query, values,afterInsertData)




})

  server.get("/search", (req,res) =>{


  const search = req.query.search

  if(search == ""){
    return  res.render("search-result.html", { total: 0 })
  }
    // pegar os dados do banco
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%' `, function(err,rows){
            if(err){
                return console.log(err)
            }
    
            // console.log("aqui estão seus registros")
            // console.log(rows)

            const total = rows.length


            return  res.render("search-result.html", { places:rows , total: total })
        })


})


server.listen(3000)