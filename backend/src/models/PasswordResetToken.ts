import { pool } from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export interface PasswordResetToken {
  id: string;
  user_id: string;
  token: string;
  expires_at: Date;
  used: boolean;
  created_at: Date;
}

export class PasswordResetTokenModel {
  static async create(userId: string, expiresInHours: number = 1): Promise<PasswordResetToken> {
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + expiresInHours);

    const query = `
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
      RETURNING *
    `;

    const values = [userId, token, expiresAt];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByToken(token: string): Promise<PasswordResetToken | null> {
    const query = `
      SELECT * FROM password_reset_tokens 
      WHERE token = $1 AND used = false AND expires_at > NOW()
    `;
    const result = await pool.query(query, [token]);
    return result.rows[0] || null;
  }

  static async markAsUsed(token: string): Promise<void> {
    const query = 'UPDATE password_reset_tokens SET used = true WHERE token = $1';
    await pool.query(query, [token]);
  }

  static async invalidateUserTokens(userId: string): Promise<void> {
    const query = 'UPDATE password_reset_tokens SET used = true WHERE user_id = $1 AND used = false';
    await pool.query(query, [userId]);
  }
}

