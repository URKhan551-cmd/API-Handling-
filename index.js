import express from "express"


const app = express();
app.get("/api/products", (req, res) => {
    const products = [
        {
            id: 1,
            name: "Metal Table",
            price: 100

        },
        {
            id: 2,
            name: "Wood Table",
            price: 200
        },
        {
            id: 3,
            name: "Glass Table",
            price: 300
        },
        {
            id: 4,
            name: "Griggor",
            price: 400
        },
        {
            id: 5,
            name: "Double Bed",
            price: 600
        },
        {
            id: 6,
            name: "Laptops",
            price: 800
        },
    ];
    // to filtered out by name or by anything else http://localhost:3000/api/products?search=name
    // how to handle the kind of condition in backend if user do query 
    const {search} = req.query
    if (search) {
        const filterProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
        res.send(filterProducts);
        return;
    }


    setTimeout(() => {
        res.send(products);
    }, 3000);

});



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)})

