const { MongoClient } = require("mongodb");

async function transferData() {
  // Thông tin kết nối đến MongoDB Atlas
  const atlasUri =
    "mongodb+srv://anhnmthe176111:B6KBisyOZm4zZMOu@nerdify-cluster.vuyoirn.mongodb.net";
  const atlasClient = new MongoClient(atlasUri);

  // Thông tin kết nối đến MongoDB local
  const localUri = "mongodb://nerd:123@localhost:27018/";
  const localClient = new MongoClient(localUri);

  try {
    await atlasClient.connect();
    await localClient.connect();

    console.log("Connected to both Atlas and local MongoDB!");
    const arrayDB = [
      "authdb",
      "coursedb",
      "paymentdb:authdb",
      "flashcarddb",
      "blogdb:authdb",
    ];

    for (let dbName of arrayDB) {
      const atlasDb = atlasClient.db(dbName);
      if (dbName == "paymentdb:authdb") {
        dbName = "paymentdb";
      }
      if (dbName == "blogdb:authdb") {
        dbName = "blogdb";
      }
      const localDb = localClient.db(dbName); // Tên database trên MongoDB local

      // Lấy danh sách collections trong database MongoDB Atlas
      const collections = await atlasDb.listCollections().toArray();

      for (const collectionInfo of collections) {
        const collectionName = collectionInfo.name;
        console.log(`Transferring collection: ${collectionName}`);

        // Lấy dữ liệu từ collection trên Atlas
        const atlasCollection = atlasDb.collection(collectionName);
        const data = await atlasCollection.find({}).toArray();

        // Chèn dữ liệu vào collection trên MongoDB local
        const localCollection = localDb.collection(collectionName);
        if (data.length > 0) {
          await localCollection.insertMany(data);
          console.log(
            `Transferred ${data.length} documents to ${collectionName}`
          );
        }
      }

      console.log("Data transfer completed successfully!");
    }
  } catch (err) {
    console.error("Error occurred during data transfer:", err);
  } finally {
    await atlasClient.close();
    await localClient.close();
  }
}

transferData();
