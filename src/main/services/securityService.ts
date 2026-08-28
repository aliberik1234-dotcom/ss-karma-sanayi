import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export class SecurityService {
  private static masterKey: Buffer | null = null;

  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  public static async verifyPassword(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) return false;
    return bcrypt.compare(password, hash);
  }

  public static generateSecureToken(byteLength: number = 32): string {
    return crypto.randomBytes(byteLength).toString('hex');
  }

  private static getMasterKey(): Buffer {
    if (!this.masterKey) {
      const machineGuid = process.env.COMPUTERNAME || 'SS_KARMA_SANAYI_DEFAULT_NODE';
      const userProfile = process.env.USERPROFILE || 'LOCAL_USER';
      const rawSeed = `SS_KARMA_SANAYI_ENC_${machineGuid}_${userProfile}_2026`;
      this.masterKey = crypto.createHash('sha256').update(rawSeed, 'utf8').digest();
    }
    return this.masterKey;
  }

  public static encrypt(plainText: string): string {
    const iv = crypto.randomBytes(16);
    const key = this.getMasterKey();
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    
    return JSON.stringify({
      iv: iv.toString('hex'),
      authTag,
      content: encrypted
    });
  }

  public static decrypt(cipherJson: string): string {
    try {
      const parsed = JSON.parse(cipherJson);
      const iv = Buffer.from(parsed.iv, 'hex');
      const authTag = Buffer.from(parsed.authTag, 'hex');
      const key = this.getMasterKey();
      
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(parsed.content, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (err) {
      throw new Error('Şifre çözme hatası: Veri bozulmuş veya anahtar uyuşmuyor.');
    }
  }

  public static sha256(data: string): string {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
  }
}
