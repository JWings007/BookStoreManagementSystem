var mysql = require("mysql");
var express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dba2003",
  port: 3306,
  connectTimeout: 20000,
  database: "library",
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  }
  console.log("Database connected....");
});

app.post("/signup", (req, res) => {
  con.query(
    `select username from users where username = '${req.body.username}'`,
    function (err, result) {
      if (req.body.username == result[0]?.username) {
        res.send({ alreadyPresent: true });
      } else {
        con.query(
          `insert into users values('${req.body.name}', '${req.body.username}', '${req.body.email}', '${req.body.password}')`,
          function (err, result) {
            if (err) console.log(err);
            res.send({ alreadyPresent: false });
          }
        );
      }
    }
  );
});

app.get("/users", (req, res)=> {
  con.query("select name from users", (err, result)=> {
    if(err)
      console.log(err)
    else
      res.send(result)
  })
})

app.get("/book/:bid", (req, res) => {
  con.query(
    `select * from books where id = ${req.params.bid}`,
    function (err, result) {
      if (err) console.log("err");
      else res.send(result);
    }
  );
});

app.get("/books", (req, res) => {
  con.query("select * from books", function (err, result) {
    if (err) console.log(err);
    else {
      res.send(result);
    }
  });
});

app.post("/deletebook/:bid", (req, res) => {
  con.query(`delete from books where id = ${req.params.bid}`, (err, result) => {
    if (err) console.log(err);
    else res.send({ result: result.affectedRows });
  });
});

app.get("/users/:id", (req, res) => {
  con.query(
    `select name from users where username = '${req.params.id}'`,
    function (err, result) {
      if (err) console.log(err);
      else res.send({ user: result[0].name });
    }
  );
});

app.post("/member", (req, res) => {
  con.query(
    `insert into members values ( ${
      Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    }, '${req.body.mname}', '${req.body.memail}', ${req.body.rent_books})`,
    function (err, result) {
      if (err) console.log(err);
      else console.log("added", req.body.mname);
    }
  );
});

app.get("/member", async (req, res) => {
  try {
    var updatedData = [];
    const result = await new Promise((resolve, reject) => {
      con.query(`select * from members`, function (err, result) {
        if (err) reject(err);
        else resolve(result);
      });
    });

    for (const mem of result) {
      const response = await new Promise((resolve, reject) => {
        con.query(
          `select * from bookinfo where due_date != "-" and memberid = ?`,
          [mem.mid],
          function (err, response) {
            if (err) reject(err);
            else resolve(response);
          }
        );
      });

      var quantity = 0;
      response.forEach((book) => {
        quantity += book.quantity;
      });
      mem.books_rented = quantity;
      updatedData.push(mem);
    }
    res.send(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.post("/updatequantity/:bid", (req, res) => {
  con.query(
    `SELECT quantity FROM books WHERE id = ${req.params.bid}`,
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occurred while processing your request.");
      }

      if (result.length === 0) {
        return res.status(404).send("Book not found.");
      }

      const currentQuantity = result[0].quantity;
      const requestedQuantity = req.body.quantity;

      if (currentQuantity < requestedQuantity) {
        return res.send({ notAvailable: true });
      }

      const updatedQuantity = currentQuantity - requestedQuantity;

      con.query(
        `UPDATE books SET quantity = ${updatedQuantity} WHERE id = ${req.params.bid}`,
        (err, response) => {
          if (err) {
            console.log(err);
            return res.status(500).send("An error occurred while updating book quantity.");
          }

          console.log(response.affectedRows);
          return res.status(200).send("Quantity updated successfully.");
        }
      );
    }
  );
});



app.get("/member/:mid", (req, res) => {
  con.query(
    `select * from members where mid = ${req.params.mid}`,
    function (err, result) {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.get("/bookinfo", (req, res) => {
  con.query(
    `select * from bookinfo where due_date != '-'`,
    function (err, result) {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.get("/allbookinfo", (req, res) => {
  con.query(
    `select bookid, SUM(quantity) as total_quantity from bookinfo where due_date is not NULL group by bookid`,
    function (err, result) {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.get("/bookinfo/:mid", (req, res) => {
  con.query(
    `select * from bookinfo where due_date != '-' and memberid = ${req.params.mid}`,
    function (err, result) {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.post("/bookinfo", (req, res) => {
  const book = req.body;
    con.query(
      `insert into bookinfo values (${parseInt(book.mid)}, ${book.id}, '${
        book.due_date
      }', ${book.quantity})`,
      function (err, result) {
        if (err) console.log(err);
        else res.send({result: true});
      }
    );
});

app.post("/deletemember/:mid", (req, res) => {
  con.query(
    `delete from members where mid = ${req.params.mid}`,
    (err, result) => {
      if (err) console.log(err);
      else res.send({ result: result.affectedRows });
    }
  );
});

app.post("/signin", (req, res) => {
  con.query(
    `select username, password, name from users where username = '${req.body.username}'`,
    function (err, result) {
      if (req.body.username == result[0]?.username) {
        if (req.body.password == result[0]?.password) {
          res.send({ redirect: true, username: result[0]?.username });
        } else res.send({ redirect: false });
      } else {
        res.send({ redirect: false });
      }
    }
  );
});

app.post("/editbook", (req, res) => {
  con.query(
    `update books set name = "${req.body.title}", author="${req.body.author}",publisher="${req.body.publisher}",genre='${req.body.genre}',description="${req.body.description}",quantity = ${req.body.qunatity},location = '${req.body.location}',price = ${req.body.price}, imageurl = '${req.body.imageurl}', id = ${req.body.id} where id = ${req.body.id}`,
    function (err, result) {
      if (err) console.log(err);
      else res.send({ result: result.affectedRows });
    }
  );
});

app.post("/addbook", (req, res) => {
  con.query(
    `insert into books values("${req.body.title}", "${req.body.author}","${req.body.publisher}",'${req.body.genre}',"${req.body.description}",${req.body.qunatity},'${req.body.location}',${req.body.price}, '${req.body.imageurl}',${req.body.id})`,
    function (err, result) {
      if (err) console.log(err);
      else res.send(result);
    }
  );
});

app.listen(5000, function () {
  console.log("Server started at port 5000");
});
