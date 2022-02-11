const path = require('path')
const knex = require('knex')({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: path.resolve(__dirname, "./tourism.sqlite")
  }
})

const bookshelf = require('bookshelf')(knex)


module.exports = bookshelf

// const User = bookshelf.model('User', {
//   tableName: 'users',
// })

// async function getUsers() {
//   const users = await new User().fetchAll()
//   console.log(users.toJSON())
// }
// async function createUser() {
//   const user = await new User({
//     name: 'vaa',
//     password: '123',
//     tel: '15577987842',
//     avatar_url: 'https://avatars2.githubusercontent.com/u/8186664?s=460&v=4',
//     type: 0
//   }).save()
//   console.log(user.toJSON())
// }
// createUser()
// getUsers()

// const Post = bookshelf.model('Post', {
//   tableName: 'posts',
//   tags() {
//     return this.belongsToMany(Tag)
//   }
// })

// const Tag = bookshelf.model('Tag', {
//   tableName: 'tags'
// })

// new User({ id: 1 }).fetch({ withRelated: ['posts.tags'] }).then((user) => {
//   console.log(user.related('posts').toJSON())
// }).catch((error) => {
//   console.error(error)
// })