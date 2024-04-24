const initialState = {
    posts: [
        {
            id: '1',
            title: 'Article title',
            shortDescription: 'Short description of the article...',
            content: 'Main content of the article',
            publishedDate: new Date('02-02-2024'),
            author: 'John Doe',
            imgPath: 'images/post-1.jpg',
            price: '34',
            address: 'Poland',
        },
        {
            id: '2',
            title: 'Article title2',
            shortDescription: 'Short description  description description description description description of the article...',
            content: 'Main content of the article',
            publishedDate: new Date('2-12-2023'),
            author: 'John Doe',
            imgPath: 'images/post-1.jpg',
            price: '34',
            address: 'Poland',
        },
        {
            id: '3',
            title: 'Article title3',
            shortDescription: 'Short description of the article...',
            content: 'Main content of the article',
            publishedDate: new Date('12-01-2024'),
            author: 'John Doe',
            imgPath: 'images/post-1.jpg',
            price: '34',
            address: 'Poland',
        },
        {
            id: '4',
            title: 'Article title4',
            shortDescription: 'Short description of the article...',
            content: 'Main content of the article',
            publishedDate: new Date('02-02-2022'),
            author: 'John Doe',
            imgPath: 'images/post-1.jpg',
            price: '34',
            address: 'Poland',
        },
    ],
    users: [
        {
            id: '1',
            firstName: 'John',
            secondName: 'Doe',
            login: 'funnkyBoy',
            password: 'pass',
            avatar: 'pathToPicture.jpg',
            phone: '123456',
        },
        {
            id: '2',
            firstName: 'Leon',
            secondName: 'Monte',
            login: 'leeMon',
            password: 'pass',
            avatar: 'pathToPicture.jpg',
            phone: '123456',
        }
    ]
};

export default initialState;