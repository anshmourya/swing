import { createServer } from "miragejs";
import Data from "../main.json";

createServer({
    routes() {
        this.passthrough("https://maps.googleapis.com/**");
        this.get("/product", () => Data);
    },
});
