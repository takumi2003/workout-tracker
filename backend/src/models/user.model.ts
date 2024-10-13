import db from "../db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export class UserModel {
  static async create(user: User): Promise<User> {
    const { name, email, password } = user;
    const query =
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<User[]> {
    const query = "SELECT * FROM users";
    const result = await db.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
  }

  static async update(id: number, user: Partial<User>): Promise<User | null> {
    const { name, email, password } = user;
    const query =
      "UPDATE users SET name = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *";
    const values = [name, email, password, id];
    const result = await db.query(query, values);
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM users WHERE id = $1";
      const result = await db.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}
