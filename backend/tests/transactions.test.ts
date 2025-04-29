import request from "supertest";
import app from "../src/app";

describe("Transaction API", () => {
  let createdTransactionId: string = "";

  it("should fetch all transactions", async () => {
    const res = await request(app).get("/api/transactions");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it("should create a new transaction", async () => {
    const res = await request(app)
      .post("/api/transactions")
      .send({
        amount: 123,
        date: "2024-04-28",
        category: "Test Category",
        status: "pending",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.amount).toBe(123);
    expect(res.body.category).toBe("Test Category");

    createdTransactionId = res.body.id;
  });

  it("should update the created transaction", async () => {
    const res = await request(app)
      .put(`/api/transactions/${createdTransactionId}`)
      .send({
        amount: 999,
        date: "2024-04-30",
        category: "Updated Category",
        status: "completed",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.amount).toBe(999);
    expect(res.body.category).toBe("Updated Category");
    expect(res.body.status).toBe("completed");
  });

  it("should delete the created transaction", async () => {
    const res = await request(app).delete(`/api/transactions/${createdTransactionId}`);
    expect(res.statusCode).toEqual(204);
  });

  it("should return 404 when trying to update a non-existing transaction", async () => {
    const res = await request(app)
      .put(`/api/transactions/nonexistent-id`)
      .send({
        amount: 100,
        date: "2024-05-01",
        category: "Test",
        status: "pending",
      });

    expect(res.statusCode).toEqual(404);
  });

  it("should return 404 when trying to delete a non-existing transaction", async () => {
    const res = await request(app).delete(`/api/transactions/nonexistent-id`);
    expect(res.statusCode).toEqual(404);
  });
});