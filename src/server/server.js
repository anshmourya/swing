import { createServer } from "miragejs";
import Data from "../main.json";

createServer({
    routes() {
        this.passthrough("https://maps.googleapis.com/**"); //passingthrough route
        this.passthrough("http://localhost:3000/**"); //passingthrough route

        //route to get alll the data available in the Main.json file
        this.get("/product", () => Data);

        //gettin data based on the id using filter method to get the required data
        this.get("/product/:id", (schema, request) => {
            const { id } = request.params;
            const data = Data.filter((item) => item.id === Number(id));
            return data

        })
    },
});
