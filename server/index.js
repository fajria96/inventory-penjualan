import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import itemRoute from "./routes/itemRoute.js";
import customerRoute from "./routes/customerRoute.js";
import salesRoute from "./routes/salesRoute.js";

const app = express();

app.use(cors());
app.use(FileUpload());
app.use(express.static("public"));
app.use(itemRoute);
app.use(customerRoute);
app.use(salesRoute);

app.listen(4000, () => console.log('Server up and running'));