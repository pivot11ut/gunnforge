# Deploying GunnForge to Hostinger

## Prerequisites

**Important**: Next.js requires Node.js hosting. You'll need:
- **Hostinger VPS Hosting** or **Cloud Hosting** (shared hosting won't work)
- SSH access to your server
- Node.js 18+ installed on the server
- Domain/subdomain configured

## Pre-Deployment Checklist

### 1. Update Environment Variables

Create a production `.env.local` file:

```env
# Generate a strong secret: openssl rand -base64 32
JWT_SECRET=your-production-secret-key-here
NODE_ENV=production
```

⚠️ **Critical**: Change the JWT_SECRET to a strong random value!

### 2. Update Default Credentials

Edit `data/users.json` and change the default admin password:

```bash
# Generate a new password hash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('your-new-secure-password', 10));"
```

Update `data/users.json` with the new hash.

### 3. Build the Application

Test the production build locally:

```bash
npm run build
npm start
```

Visit http://localhost:3000 to verify everything works.

## Deployment Steps for Hostinger VPS/Cloud

### Step 1: Prepare Your Server

SSH into your Hostinger server:

```bash
ssh root@your-server-ip
```

Install Node.js (if not already installed):

```bash
# Using NodeSource repository for Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

Install PM2 (process manager):

```bash
npm install -g pm2
```

### Step 2: Upload Your Code

Option A: Using Git (Recommended)

```bash
# On server
cd /var/www
git clone https://github.com/pivot11ut/gunnforge.git
cd gunnforge
```

Option B: Using FTP/SFTP
- Use FileZilla or similar
- Upload entire project to `/var/www/gunnforge`

### Step 3: Install Dependencies

```bash
cd /var/www/gunnforge
npm install --production
```

### Step 4: Create Production Environment File

```bash
nano .env.local
```

Add:
```env
JWT_SECRET=your-production-secret-here
NODE_ENV=production
```

Save and exit (Ctrl+X, Y, Enter)

### Step 5: Build the Application

```bash
npm run build
```

### Step 6: Start with PM2

Create PM2 configuration:

```bash
nano ecosystem.config.js
```

Add:
```javascript
module.exports = {
  apps: [{
    name: 'gunnforge',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/gunnforge',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

Start the application:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 7: Configure Nginx Reverse Proxy

Hostinger likely uses nginx. Create a configuration:

```bash
nano /etc/nginx/sites-available/gunnforge
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
ln -s /etc/nginx/sites-available/gunnforge /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### Step 8: Configure Firewall

```bash
ufw allow 80
ufw allow 443
ufw enable
```

### Step 9: Set Up SSL (HTTPS)

Install Certbot:

```bash
apt-get install certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically update your nginx config.

## Using Hostinger's hPanel (If Available)

If Hostinger provides a Node.js app manager in hPanel:

1. Log into hPanel
2. Go to "Node.js" section
3. Create new Node.js app:
   - **Node version**: 18 or higher
   - **Application mode**: Production
   - **Application root**: `/gunnforge`
   - **Application URL**: your domain
   - **Application startup file**: `npm start` or `server.js`

4. Upload files via File Manager or FTP
5. Set environment variables in the Node.js app settings
6. Run `npm install` and `npm run build` via SSH/terminal

## Alternative: Deploy to Vercel (Easier Option)

For easier deployment, consider Vercel (made for Next.js):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts to deploy
```

Benefits:
- Zero configuration
- Automatic HTTPS
- Global CDN
- CI/CD from GitHub
- Free tier available

## Post-Deployment

### Monitor Your Application

```bash
pm2 status
pm2 logs gunnforge
pm2 monit
```

### Update Your Application

```bash
cd /var/www/gunnforge
git pull
npm install
npm run build
pm2 restart gunnforge
```

### Manage Users

To add/remove users, edit `data/users.json` and restart:

```bash
nano data/users.json
pm2 restart gunnforge
```

## Troubleshooting

### Application won't start
```bash
pm2 logs gunnforge --lines 50
```

### Check if port 3000 is in use
```bash
netstat -tulpn | grep 3000
```

### Restart services
```bash
pm2 restart gunnforge
systemctl restart nginx
```

### Check nginx configuration
```bash
nginx -t
```

## Security Recommendations

1. ✅ Change JWT_SECRET in production
2. ✅ Change default admin password
3. ✅ Enable HTTPS (SSL/TLS)
4. ✅ Keep Node.js and dependencies updated
5. ✅ Set up firewall rules
6. ✅ Regular backups of `data/users.json`
7. ✅ Monitor PM2 logs for suspicious activity

## Support

- Hostinger Docs: https://www.hostinger.com/tutorials/
- Next.js Docs: https://nextjs.org/docs/deployment
- PM2 Docs: https://pm2.keymetrics.io/docs/usage/quick-start/
