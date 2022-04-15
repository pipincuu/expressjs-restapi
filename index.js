const express = require("express");
const books = require("./data"); 

const app = express()
const port = 8000;

app.use(express.json());
app.use(express.urlencoded ({ extended:false }));

app.get("/api/books", (request, response) => {
    response.status(200).json(books);
});

app.get("/api/books/:bookId", (request, response) => {
    const book = books.find((e) => e.bookId === Number(request.params.bookId));
    response.status(200).json(book);
});

app.post("/api/books", (request, response) => {
    // Destructuring
    const { judulBuku, author, genre, penerbit, tahunTerbit } = request.body;

    // Dapatkan ID dari item terakhir
    const lastId = books[books.length - 1].bookId;
    const newId = lastId + 1;

    const contohBuku = {
        bookId: newId,
        judulBuku,
        author,
        genre,
        penerbit,
        tahunTerbit,
    };

    books.push(contohBuku);

    response.status(201).json(contohBuku);
});

app.put("/api/books/:bookId", (request, response) => {
    const { judulBuku, author, genre, penerbit, tahunTerbit } = request.body;

    const indexBuku = books.findIndex(
        (e) => e.bookId === Number(request.params.bookId)
    );

    books[indexBuku] = {
        bookId: Number(request.params.bookId),
        judulBuku,
        author,
        genre,
        penerbit,
        tahunTerbit,
    };

    response.status(200).json(books[indexBuku]);
});

app.delete("/api/books/:bookId", (request, response) => {
    const indexBuku = books.findIndex(
        (e) => e.bookId === Number(request.params.bookId)
    );

    books.splice(indexBuku, 1);

    response.status(200).json({
        message: `Buku dengan ID ${request.params.bookId} sudah terhapus`,
    });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})