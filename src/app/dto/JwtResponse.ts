import { UserDto } from "./UserDto";

export class JwtResponse {
    public token: string = "";
    public userDto: UserDto = new UserDto();
}