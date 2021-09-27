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

fetch('https://jsonplaceholder.typicode.com/pots/1')
  .then(data => {
    if (!data.ok){
      throw Error(data.status);
    }
    return data.json();
  })
  .then(post => {
    console.log(post.title);
  })
  .catch(e => {
    console.log(e);
  });
