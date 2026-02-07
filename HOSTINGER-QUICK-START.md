# Hostinger Quick Deployment Checklist

## Before You Start

**What you need:**
- ✅ Hostinger VPS or Cloud hosting (not shared hosting)
- ✅ SSH access to your server
- ✅ Domain pointed to your server IP

## Quick Setup (10 Steps)

### 1. Check Your Hostinger Plan
```
SSH into your server:
ssh root@your-server-ip
```

If this works, you have VPS/Cloud hosting ✅
If not, you need to upgrade from shared hosting ❌

### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
node --version  # Should show v20.x.x
```

### 3. Install PM2
```bash
npm install -g pm2
```

### 4. Clone Your Repository
```bash
cd /var/www
git clone https://github.com/pivot11ut/gunnforge.git
cd gunnforge
```

### 5. Install Dependencies
```bash
npm install
```

### 6. Create Environment File
```bash
nano .env.local
```

Paste this (replace the secret):
```
JWT_SECRET=$(openssl rand -base64 32)
NODE_ENV=production
```

Save: `Ctrl+X`, `Y`, `Enter`

### 7. Change Admin Password
```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourNewSecurePassword123!', 10));"
```

Copy the output and edit users.json:
```bash
nano data/users.json
```

Replace the passwordHash with your new hash.

### 8. Build & Start
```bash
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow the command it gives you
```

### 9. Configure Nginx
```bash
nano /etc/nginx/sites-available/gunnforge
```

Copy content from `nginx.conf.sample` and update `yourdomain.com`

```bash
ln -s /etc/nginx/sites-available/gunnforge /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 10. Set Up SSL
```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Verify Deployment

Visit: `https://yourdomain.com`

You should see the GunnForge homepage!

## Useful Commands

```bash
# Check if app is running
pm2 status

# View logs
pm2 logs gunnforge

# Restart app
pm2 restart gunnforge

# Update app
cd /var/www/gunnforge
git pull
npm install
npm run build
pm2 restart gunnforge
```

## Troubleshooting

**App not starting?**
```bash
pm2 logs gunnforge --lines 50
```

**Can't access site?**
```bash
# Check nginx
systemctl status nginx

# Check if app is listening
netstat -tulpn | grep 3000
```

**Port 3000 already in use?**
```bash
# Find what's using it
lsof -i :3000
# Kill the process
kill -9 <PID>
pm2 restart gunnforge
```

## Need Easier Deployment?

Consider deploying to **Vercel** instead (free, zero config):

```bash
npm i -g vercel
vercel
```

Follow the prompts - done in 2 minutes! ✨

## Support Links

- Hostinger Support: https://www.hostinger.com/tutorials/vps
- Next.js Deployment: https://nextjs.org/docs/deployment
- Need help? Check DEPLOYMENT.md for detailed guide
