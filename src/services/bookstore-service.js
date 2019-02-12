export default class BookstoreService {
    data = [
        {
            id: 1,
            title: "Test Book 1",
            author: "Test author 1",
            price: 100,
            coverImage: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/children_bookcover.png"
        },
        {
            id: 2,
            title: "Test Book 2",
            author: "Test author 2",
            price: 40,
            coverImage: "https://www.bookish.com/wp-content/uploads/the-night-gardener-9781481439787_hr.jpg"
        }
    ];

    getBooks() {
        return new Promise((resolve) => {
           setTimeout(() => {
               resolve(this.data)
           }, 700)
        });
    }
}