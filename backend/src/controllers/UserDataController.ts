import { Request, Response } from "express"
import { getRepository } from 'typeorm'
// import * as Yup from 'yup'

import UsersLogin from '../models/UserLoginData'

export default {
  async index(request: Request, response: Response) {
    const UserRepository = getRepository(UsersLogin)

    const Users = await UserRepository.find()

    return response.json(Users)
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const UserRepository = getRepository(UsersLogin)

    const orphanage = await UserRepository.findOneOrFail(id)

    return response.json(orphanage)
  },

  async create(request: Request, response: Response) {
    const {
      userEmail,
      password
    } = request.body

    const UsersRepository = getRepository(UsersLogin)

    const User = UsersRepository.create({
      userEmail,
      password
    })

    await UsersRepository.save(User)

    return response.status(201).json(User)
  }
}