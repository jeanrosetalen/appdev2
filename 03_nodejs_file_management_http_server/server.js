const http = require('http');
const url = require('url')
const path = require('path')
const fs = require('fs')

const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const filename = parsedUrl.query.filename;
  const filePath = path.join(__dirname, parsedUrl.query.filename || "default.txt");

  if (!filename) {
    res.writeHead(400)
    return res.end("file name is required.")
  }

  if (req.method === "GET") {

    if (parsedUrl.pathname === "/create") {
      fs.writeFile(filePath, "New File created.", (err) => {
        if (err){
          res.writeHead(500)
          return res.end("Error creating file.")
        }else{
          res.writeHead(200)
          return res.end(`File '${filename}' created successfully.`)
        }

      });
    } else if (parsedUrl.pathname === "/read") {

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          return res.end("File not found.")
        } else{
          res.writeHead(200, {"Content-Type" : "text/plain"})
          return res.end(data)
        }

      });
    } else if (parsedUrl.pathname === "/update") {

      fs.appendFile(filePath, "\nUpdates content.", (err) => {
        if (err) {
          res.writeHead(500)
          return res.end("Error updating file.")
        } else {
          res.writeHead(200)
          return res.end(`File '${filename}' updated successfully. `)
        }

      });
    } else if (parsedUrl.pathname === "/delete") {
      fs.unlink(filePath, (err) => {
        if (err) {
          res.writeHead(404)
          return res.end("File not found.")
        } else {
          res.writeHead(200)
          return res.end(`File '${fielname}' deleted successfully.`)
        }

      });
    } else {
      res.writeHead(404);
      return res.end("Ivalid Route")
    }
  } else {
    res.writeHead(405)
    res.end("Method not allowed")
  }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
