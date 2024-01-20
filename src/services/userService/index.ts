import { UserRepository } from "../../models/User";
import { User, UserDTO } from "./types";

export default class UserService {
    private userRepository: UserRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    createUser = async (userRequest:UserDTO):Promise<User>=> {
        try {
            // VALIDATE USER REQUEST
            return this.userRepository.createUser(userRequest);
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
