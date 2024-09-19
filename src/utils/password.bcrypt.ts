import crypto from 'crypto';

/**
 * Encrypt password
 * @param password 
 * @returns 
 */
export function encryptPassword(password: string, secret: string): string {
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash;
}

/**
 * Compare password
 * @param password 
 * @returns 
 */
export function comparePassword(password: string, secret: string, hashPassword: string): boolean {
    const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return hash === hashPassword;
}