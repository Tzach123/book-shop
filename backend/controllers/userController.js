import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../util/generateToken.js'

//@ Auth user & get token
//@route  POST /api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)
    const date = new Date()
    const expires = new Date(date.setMonth(date.getMonth() + 1))

    res.cookie(
      'USER_DETAILS',
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        date,
      },
      {
        secure: false,
        httpOnly: false,
        expires: expires,
      }
    )

    res.cookie('_secure_token', token, {
      secure: true,
      httpOnly: true,
      expires: expires,
      date,
    })

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    })
  } else {
    res.status(401).json('Invalid email or password')
  }
})

//@des  Register a new user
//@route  POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })

  if (userExist) {
    res.status(400).json({ message: 'User alresdy exists' })
  } else {
    const user = await User.create({
      name,
      email,
      password,
    })

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ messege: 'Invalid status data' })
    }
  }
})

//@des  Update user profile
//@route  PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()

    return res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    res.status(400).json({ messege: 'User not found' })
  }
})

//@des  Get user profile
//@route  GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    res.status(400).json({ messege: 'User not found' })
  }
})

//@des  Get all users
//@route  GET /api/users/
//@access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.send(users)
})

export { authUser, registerUser, updateUserProfile, getUserProfile, getUsers }
