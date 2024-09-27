import { routes } from "./route";

describe("Users API", () => {
  
  describe("POST /users", () => {
    it("should return 200 with valid data", async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify({
          username: "tester"
        }),
      });

      expect(response.status).toBe(200);
    });

    it('should return 400 with invalid data', async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify({
          name: null,
        }),
      });

      expect(response.status).toBe(400);
    });
  })
}) 
  
