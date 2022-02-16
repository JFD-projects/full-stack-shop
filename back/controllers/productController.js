const { Product } = require('../models/models')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

class ProductController {
    async create(req, res, next) {
        try {
            const data = JSON.parse(req.body.data)
            await Product.create({ ...data, image: req.file.path.replace('assets', '') })
            return res.json('ok')
        } catch (error) {
            return res.json(error)
        }
    }
    async edit(req, res) {
        try {
            const product = JSON.parse(req.body.data)
            const data = await Product.findOne({ where: { id: product.id } })
            if (data === null) {
                throw new Error({ error: 'не найдено' })
            }
            await data.set(product)
            await data.save()
            return res.json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getAll(req, res) {
        try {
            const data = await Product.findAll()
            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }
    async getOne(req, res) {
        try {
            const data = await Product.findOne({ where: { id: req.query.id } })
            if (data === null) {
                return res.status(404).json({ error: 'не найдено' })
            }
            return res.json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async getMany(req, res) {
        try {
            const data = await Product.findAll({ where: { id: { [Op.in]: req.body } } })
            if (data === null) {
                return res.status(404).json({ error: 'не найдено' })
            }
            return res.json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async remove(req, res) {
        try {
            await Product.destroy({ where: { id: req.body.id } })
            return res.json('delete')
        }
        catch (e) {
            return res.status(500).json(error)
        }
    }

}

module.exports = new ProductController()
