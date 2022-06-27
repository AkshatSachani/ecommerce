const express = require("express");
const res = require("express/lib/response");
const router = express.Router()
const User = require('../models/User')
const { BillingAddress, ShippingAddress } = require('../models/Address')


// user Signup
router.post('/user/signup', async (req, res) => {
    const msg = 'User created'
    try {
        const user = await User(req.body)
        const addressDetails = { user_id: user._id, address: req.body.address }
        await user.save()
        await BillingAddress(addressDetails).save()
        await ShippingAddress(addressDetails).save()
        res.status(201).send({ code: 201, message: msg, data: user })
    } catch (error) {
        res.status(400).send({ code: 400, message: error.message })
    }
})

//user signin
router.get('/user/signin', async (req, res) => {
    const msg = 'user signin'
    try {
        const user = await User.findByCredentials(req.body.emailId, req.body.password)
        res.status(200).send({ code: 200, message: msg, data: user })

    } catch (error) {
        res.status(404).send({ code: 404, message: error.message })
    }
})


// update user details
router.patch('/update/user/:id', async (req, res) => {
    const msg = 'User updated'
    try {
        const update_fields = Object.keys(req.body)
        const allowUpdate = ['first_name', 'last_name', 'emailId', 'contact_no', 'alterContact_no', 'password']
        const updateValidation = update_fields.every((update_fields) => allowUpdate.includes(update_fields))
        if (!updateValidation) {
            throw new Error('Invalid update')
        }
        const id = req.params.id
        const user = await User.findById(id)
        if (!user) {
            throw new Error('User not found')
        }
        update_fields.forEach((update_fields) => {
            user[update_fields] = req.body[update_fields]
        })
        await user.save()
        res.status(200).send({ code: 200, message: msg, data: user })
    } catch (error) {
        res.status(400).send({ code: 400, message: error.message })
    }
})

// add


module.exports = router