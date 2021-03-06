const { stat, createReadStream, createWriteStream } = require("fs");
const { createServer } = require("http");
const { promisify } = require("util");
const info = promisify(stat);
const file = "./vedio.mp4";

const resFn = async (req, res) => {
  const { size } = await info(file);
  //console.log(size);
  //////////// range
  console.log(req.headers);

  //////// playing the range to  change the video timing when playing , this is a must for safari
  const range = req.headers.range;

  if (range) {
    let [start, end] = range.replace(/bytes=/g, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : size - 1;
    ///////////////////// writing the head properly
    res.writeHead(206, {
      "Content-range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-type": "video/mp4"
    });
    createReadStream(file, { start, end }).pipe(res);
  }
  /////////////////// streaming video to browser
  else {
    res.writeHead(200, { "Content-Length": size, "Content-type": "video/mp4" });
    createReadStream(file).pipe(res);
  }
};

const server = createServer((req, res) => {
  ////////////////////////////////// piping the form file to multiple writable streams
  if (req.method === "POST") {
    req.pipe(res); // req is readable stream  , res is writable stream
    req.pipe(process.stdout);
    req.pipe(createWriteStream("./uploaded.txt"));
  }
  /////////////////////  piping the video to the browser
  else if (req.url === "/video") {
    resFn(req, res);
  }
  ///////////////////////////////////// sending a form to browser
  else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<form enctype="multipart/form-data" method="POST" action="/">
        <input type="file" name="upload-file"/>
        <button>upload file</button>
        </form>`);
  }
});
server.listen(3000, () => {
  console.log("== server is running on 3000");
});
