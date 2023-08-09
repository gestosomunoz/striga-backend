import crypto from 'crypto'

export function getAuthHeaderv2(body: any, path: string, method: string): string {
    const hmac = crypto.createHmac('sha256', process.env.API_SECRET!);
    const time = Date.now().toString();
  
    hmac.update(time);
    hmac.update(method);
    hmac.update(path);
  
    const contentHash = crypto.createHash('md5');
    contentHash.update(JSON.stringify(body));
  
    hmac.update(contentHash.digest('hex'));
    return `HMAC ${time}:${hmac.digest('hex')}`
  }