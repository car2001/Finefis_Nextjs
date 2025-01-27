import crypto from "crypto";

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY_CRYPTO || process.env.NEXT_PUBLIC_SECRET_KEY_CRYPTO;
const iv = crypto.randomBytes(16);


if (!secretKey) {
    throw new Error("SECRET_KEY_CRYPTO no está definido en las variables de entorno.");
}

const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
};


const decrypt = (encryptedText: string) => {
    const [ivText, encrypted] = encryptedText.split(':');
    const ivBuffer = Buffer.from(ivText, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), ivBuffer);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};


const Encrypt = {
    encrypt,
    decrypt
};

export default Encrypt;