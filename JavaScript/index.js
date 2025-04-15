console.log("Salut, lume");

function book(i, n, a, p){
    this.img = i;
    this.name = n;
    this.author = a;
    this.price = p;
}

function add(book){
    const art = document.getElementById('art');
    const div = document.createElement('div');
    div.className = 'book';

    let img = document.createElement('img');
    img.src = book.img;
    div.append(img);

    let name = document.createElement('p');
    name.className = 'name';
    name.textContent = book.name;
    div.append(name);

    let author = document.createElement('p');
    author.className = 'author';
    author.textContent = book.author;
    div.append(author);

    let br = document.createElement('br');
    div.append(br);

    let price = document.createElement('p');
    price.className = 'price';
    price.textContent = book.price;
    div.append(price);

    art.append(div);
}
const nouaPatru = new book("C:/Users/Admin/Desktop/Practica/BookFan/img/1984.png", "1984", "George Orwell", "131 DML")
add(nouaPatru);
const atomicHabits = new book("C:/Users/Admin/Desktop/Practica/BookFan/img/Atomic_Habits.png", "Atomic Habits", "James Clear", "254 DML");
add(atomicHabits);
const bigInJapan = new book("C:/Users/Admin/Desktop/Practica/BookFan/img/Big_in_Japan.png", "Big in Japan", "Cosmin Leucuta", "151 MDL");
add(bigInJapan);
const celMaiBogatuOmDinBabilon = new book("C:\Users\Admin\Desktop\Practica\BookFan\img\Cel-mai-bogat.png", "Cel mai bogat om din babilon", "", "")