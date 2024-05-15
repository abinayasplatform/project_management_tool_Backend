const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://abinayaraja1617:Abinaya%401624@cluster0.mj6rrle.mongodb.net/"
    // "mongodb+srv://abinayaraja1617:Abinaya%401624@cluster0.mj6rrle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    console.log("Connected to MongoDB");
    /* Remove the index on the 'username' field
    await mongoose.connection.collection('users').dropIndex("username_1");

    // Delete documents with a null 'username' field
    await mongoose.connection.collection('users').deleteMany({ username: null });*/
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
