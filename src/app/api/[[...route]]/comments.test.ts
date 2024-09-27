import { routes } from "./route";

describe("Comments API", () => {
  describe("GET /comments/:id", () => {
    it("should return 200 with valid data", async () => {
      const postId = "dbaf65d6-125a-4804-bb4e-32b54c8f5570";
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/comments/${postId}`, {
        method: "GET",
        body: new URLSearchParams({
          page: "1",
          limit: "5",
        }).toString(),
      });

      expect(response.status).toBe(200);
    });

    it('should return 404 with invalid data', async () => {
      const nonExistentUserId = "1-24-4"; 
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/comments/${nonExistentUserId}`, {
        method: "GET",
        body: new URLSearchParams({
          page: "1",
          limit: "5",
        }).toString(),
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Not found");
    });
  });

  describe("POST /comments", () => {
    it("should return 200 with valid data", async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          message: "test"
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(200);
    });

    it('should return 400 with invalid data', async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/comments`, {
        method: "POST",
        body: JSON.stringify({
          message: null,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(400);
    });
  })
}) 
  