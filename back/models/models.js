const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    name: { type: DataTypes.STRING, defaultValue: "NAME" },
})

const Product = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    currency: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    fullDescription: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.INTEGER, defaultValue: 0 },
    image: { type: DataTypes.STRING, allowNull: true, defaultValue: '/images/defaultImage.png' },
})

const Banner = sequelize.define('banners', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true, defaultValue: '/images/defaultImage.png' },
})



// const Page = sequelize.define('pages', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     metaTitle: { type: DataTypes.STRING, allowNull: false },
//     metaDescription: { type: DataTypes.STRING },
//     url: { type: DataTypes.STRING, allowNull: false },
// })

// const Template = sequelize.define('templates', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     content: { type: DataTypes.STRING, allowNull: false },
//     preview: { type: DataTypes.STRING },
//     name: { type: DataTypes.STRING, allowNull: false },
// })
// const Layout = sequelize.define('layouts', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

// })


// Page.hasOne(Template)
// Template.belongsTo(Page)


module.exports = {
    User,
    Product,
    Banner
}
