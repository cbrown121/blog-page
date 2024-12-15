import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";


const app = express();
const port = 3000;

// Simulating a database with an in-memory array
const posts = [];


// Middleware
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Route to display posts
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// Route to display about page
app.get("/about", (req, res) => {
  res.render("about");
});

// Route to display the edit form
app.get("/posts/:id/edit", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render("edit", { post });
});


app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  // Add the new post to the posts array
  const newPost = {
    id: Date.now(), // Use timestamp as the ID
    title,
    content,
  };
  posts.push(newPost);

  // Redirect back to the homepage
  res.redirect("/");
});


// Route to handle delete
app.delete("/posts/:id", (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex((post) => post.id === postId);

  if (postIndex === -1) {
    return res.status(404).send("Post not found");
  }

  // Remove the post from the array
  posts.splice(postIndex, 1);

  res.status(200).send("Post deleted successfully");
});


// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});