import express from "Express";

const articleInfo = [
  { name: "learn-react", upvotes: 0, comments: [] },
  { name: "learn-node", upvotes: 0, comments: [] },
  { name: "mongodb", upvotes: 0, comments: [] },
];

const app = express();

// to bind request parameters and body
app.use(express.json());

// app.get('/hello', function (req, res) {
//     res.send('Hello from GET endpoint!');
// });

// app.get('/hello/:name', function (req, res) {
//     res.send('Hello,' + req.params.name);
// })

// app.post('/hello', function (req, res) {
//     res.send('Hello, ' + req.body.name + ' from a POST endpoint!');
// });

app.post("/api/articles/:name/upvote", (req, res) => {
  const article = articleInfo.find((a) => a.name === req.params.name);
  article.upvotes += 1;

  res.send(article);

  // for sending text output
  //res.send('The article ' + req.params.name + 'has ' + article.upvotes + ' upvotes!');
});

app.post("/api/articles/:name/comments", (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  const article = articleInfo.find((a) => a.name === req.params.name);
  article.comments.push({ text, postedBy });

  res.send(article);
  // for sending text output
  //res.send('The article ' + req.params.name + 'has ' + article.upvotes + ' upvotes!');
});

app.listen(8000, function () {
  console.log("Server is listening on port 8000");
});
