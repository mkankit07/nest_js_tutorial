import {  EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
}