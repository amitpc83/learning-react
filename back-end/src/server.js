import express from "Express";
import { MongoClient, ReturnDocument, ServerApiVersion } from "mongodb";

const articleInfo = [
  { name: "learn-react", upvotes: 0, comments: [] },
  { name: "learn-node", upvotes: 0, comments: [] },
  { name: "mongodb", upvotes: 0, comments: [] },
];

const app = express();

// to bind request parameters and body
app.use(express.json());

let db;
async function connectToDB() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  db = client.db("full-stack-react-db");
}

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  const article = await db.collection("articles").findOne({ name });
  return res.json(article);
});

app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name },
    {
      $inc: { upvotes: 1 },
    },
    {
      returnDocument: "after",
    }
  );
  return res.json(updatedArticle);
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  const newComment = { postedBy, text };
  const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name },
    {
      $push: { comments: newComment },
    },
    { returnDocument: "after" }
  );
  return res.json(updatedArticle);
});

async function start() {
  await connectToDB();
  app.listen(8000, function () {
    console.log("Server is listening on port 8000");
  });
}

start();
