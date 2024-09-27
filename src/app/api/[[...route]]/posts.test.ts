import { routes } from "./route";

describe("Posts API", () => {
  describe("GET /posts", () => {
    it("should return 200 with valid data", async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
        method: "GET",
        body: new URLSearchParams({
          community: "History",
          search: "vi",
          page: "1",
          limit: "5",
        }).toString(),
      });

      expect(response.status).toBe(200);
    });
  })

  describe("GET /posts/:id", () => {
    it("should return 200 with valid data", async () => {
      const postId = "dbaf65d6-125a-4804-bb4e-32b54c8f5570";

      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`, {
        method: "GET",
      });

      expect(response.status).toBe(200);
    });

    it("should return 404 for a non-existent post", async () => {
      const nonExistentPostId = "1-24-4"; 

      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${nonExistentPostId}`, {
        method: "GET",
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Not found");
    });
  })

  describe("GET /posts/our/id", () => {
    it("should return 200 with valid data", async () => {
      const userId = "3a6df3c0-bb25-42a7-86ec-ed786724febc"

      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/our/${userId}`, {
        method: "GET",
        body: new URLSearchParams({
          community: "History",
          search: "vi",
          page: "1",
          limit: "5",
        }).toString(),
      });

      expect(response.status).toBe(200);
    });

    it("should return 404 for a non-existent post", async () => {
      const nonExistentUserId = "1-24-4"; 

      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/our/${nonExistentUserId}`, {
        method: "GET",
        body: new URLSearchParams({
          community: "exampleCommunity",
          search: "vi",
          page: "1",
          limit: "5",
        }).toString(),
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Not found");
    });
  })

  describe("POST /posts", () => {
    it("should return 200 with valid data", async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: "test",
          description: "description",
          community: "History" as "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others" | undefined,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(200);
    });

    it("should return 404 for a non-existent post", async () => {
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: "test",
          description: "description",
          community: "History" as "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others" | undefined,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(404);
    });
  });

  describe("PATCH /posts/:id", () => {
    it("should return 200 with valid data", async () => {
      const postId = "dbaf65d6-125a-4804-bb4e-32b54c8f5570";
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: "test",
          description: "description",
          community: "History" as "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others" | undefined,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(200);
    });

    it("should return 404 for a non-existent post", async () => {
      const nonExistentPostId = "1-24-4"; 
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${nonExistentPostId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: "test",
          description: "description",
          community: "History" as "History" | "Food" | "Pets" | "Health" | "Fashion" | "Exercise" | "Others" | undefined,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Not found");
    });
  });

  describe("DELETE /posts/:id", () => {
    it("should return 200 with valid data", async () => {
      const postId = "dbaf65d6-125a-4804-bb4e-32b54c8f5570";
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`, {
        method: "DELETE",
      });

      expect(response.status).toBe(200);
    });

    it("should return 404 for a non-existent post", async () => {
      const nonExistentPostId = "1-24-4"; 
      const response = await routes.request(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${nonExistentPostId}`, {
        method: "DELETE",
      });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "Not found");
    });
  });

})