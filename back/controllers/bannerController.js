const { Banner } = require('../models/models')
// fs = require('fs');
// path = require('path')

// const { Sequelize } = require('sequelize')
// const Op = Sequelize.Op

class BannerController {
    async create(req, res, next) {
        try {
            const data = JSON.parse(req.body.data)
            await Banner.create({ ...data, image: req.file.path.replace('assets', '') })
            return res.json('ok')
        } catch (error) {
            return res.json(error)
        }
    }
    async getAll(req, res) {
        try {
            const data = await Banner.findAll()
            return res.json(data)
        } catch (error) {
            return res.json(error)
        }
    }
    async getOne(req, res) {
        try {
            const data = await Banner.findOne({ where: { id: req.query.id } })
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
            await Banner.destroy({ where: { id: req.body.id } })
            return res.json('delete')
        }
        catch (e) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new BannerController()
