const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
db.serialize(() => {
//     // criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
    
//     `)

//     const query =` INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items

//     ) VALUES (
//         ?,?,?,?,?,?,?
//     ); 
//     `  
//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
//         "PaperSider",
//         "Guilherme Gamballa, Jardim América",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e papelão"

//     ]


//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("dados cadastrados com sucesso")
//         console.log(this)

//     }

//     db.run(query, values,afterInsertData)

 

    // db.run(`DELETE FROM places WHERE id = ?`,[6], function(err){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")
    // })

       db.all(`SELECT * FROM places`, function(err,rows){
        if(err){
            return console.log(err)
        }

        console.log("aqui estão seus registros")
        console.log(rows)
    })



})