import { authenticate } from "../../services/auth";

const authenticateService = new authenticate();

let token: string;
describe("Auth Service Test Suite", () => {
  it("Creates an account", async () => {
    const user = await authenticateService.create({
      firstName: "New User",
      lastName: "student",
      password: "password",
      email: "test@test.com",
    });

    expect(user.id).toBeDefined();
  });

  it("Logs in to an account", async () => {
    const user = await authenticateService.login({
      email: "test@test.com",
      password: "password",
    });

    expect(user.id).toBeDefined();
    expect(user.token).toBeDefined();
    token = user.token;
  });

  it("Fails to login with invalid creds", async () => {
    await expectAsync(
      authenticateService.login({
        email: "wrong@test.com",
        password: "notarealpassword",
      })
    ).toBeRejected();
  });

  it("Verifies a token if valid", () => {
    const user = authenticateService.verify(token) as { id: number };
    expect(user.id).toBeDefined();
  });

  it("Fails to verify if token is invalid", () => {
    expect(() => authenticateService.verify(token + "any text")).toThrow();
  });
});
