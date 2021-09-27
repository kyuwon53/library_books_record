fetch('https://jsonplaceholder.typicode.com/posts/1');

// {
//   userId: 1,
//   id: 1,
//   title: 'First Post',
//   body: 'This is my first post...',
// }

fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => {
    return data.json();
  })
  .then(post => {
    console.log(post.title);
  });

