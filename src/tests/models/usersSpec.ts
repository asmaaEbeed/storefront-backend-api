import client from "../../database";
import {makeUserModel, User} from "../../models/users";
import { authenticate } from "../../services/auth";

const authenticateService = new authenticate();
const userModel = new makeUserModel();

let user: { id: string};

describe("Users Model Test Suite", () => {
    beforeAll(async () => {

      user = await authenticateService.create({
        firstName: "name1",
        lastName: "name2",
        password: "pass",
        email: "modynegm22@gmail.com",
      });
      });

      it("gets user by id", async () => {
        const user_required = await userModel.showUser(user.id);
        expect(user_required.id).toBe(user.id);
      });

      it("Lists all users", async () => {
        
        const users = await userModel.index();
        expect(users.length).toBeDefined();
      });

     

})