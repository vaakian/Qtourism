const bookshelf = require('./connection')

const User = bookshelf.model('User', {
  tableName: 'users',
  comments() {
    return this.hasMany('Comment', 'user_id', 'id')
  },
  orders() {
    return this.hasMany('Order', 'user_id', 'id')
  }
})

const Merchant = bookshelf.model('Merchant', {
  tableName: 'merchants',
  packages() {
    return this.hasMany('Package', 'merchant_id', 'id')
  }
})

const Package = bookshelf.model('Package', {
  tableName: 'packages',
  merchant() {
    return this.belongsTo('Merchant', 'merchant_id', 'id')
  },
  comments() {
    return this.hasMany('Comment', 'package_id', 'id')
  },
  orders() {
    return this.hasMany('Order', 'package_id', 'id')
  }
})

const Comment = bookshelf.model('Comment', {
  tableName: 'comments',
  user() {
    return this.belongsTo('User', 'user_id', 'id')
  },
  package() {
    return this.belongsTo('Package', 'package_id', 'id')
  }
})

const Order = bookshelf.model('Order', {
  tableName: 'orders',
  user() {
    return this.belongsTo('User', 'user_id', 'id')
  },
  package() {
    return this.belongsTo('Package', 'package_id', 'id')
  }
})


module.exports = {
  User,
  Merchant,
  Package,
  Comment,
  Order
}