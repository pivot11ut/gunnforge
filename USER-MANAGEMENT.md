# User Management Guide

Complete guide for adding, listing, and removing users from GunnForge.

## 🚀 Quick Start

### Add a New User

```bash
npm run user:add <username> <password>
```

**Example:**
```bash
npm run user:add john SecurePassword123!
```

### List All Users

```bash
npm run user:list
```

### Remove a User

```bash
npm run user:remove <username>
```

**Example:**
```bash
npm run user:remove john
```

## 📋 Detailed Commands

### 1. Add User

**Command:**
```bash
npm run user:add <username> <password>
```

**Requirements:**
- Username: At least 3 characters
- Password: At least 8 characters (recommend using special characters)

**Example:**
```bash
npm run user:add alice MySecurePass789!
```

**Output:**
```
✅ User added successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Username: alice
  Password: MySecurePass789!
  User ID:  3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️  Make sure to save this password securely!
💡 Tip: The user can now login at /login
```

**What happens:**
- Password is hashed using bcrypt (10 rounds)
- User is added to `data/users.json`
- Unique ID is automatically generated

### 2. List Users

**Command:**
```bash
npm run user:list
```

**Output:**
```
📋 Current Users:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ID: 1 | Username: admin
  ID: 2 | Username: jane
  ID: 3 | Username: alice
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Total users: 3
```

### 3. Remove User

**Command:**
```bash
npm run user:remove <username>
```

**Example:**
```bash
npm run user:remove alice
```

**Output:**
```
✅ User removed successfully!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Username: alice
  User ID:  3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🔐 Password Requirements

### Recommended Password Format:
- Minimum 8 characters
- Include uppercase letters
- Include lowercase letters
- Include numbers
- Include special characters (!@#$%^&*)

**Good Examples:**
- `MySecure123!`
- `Craft$Project2025`
- `Welcome@GunnForge99`

**Bad Examples:**
- `password` (too simple)
- `12345678` (only numbers)
- `abc` (too short)

## 📁 File Structure

User data is stored in:
```
data/users.json
```

**Format:**
```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "passwordHash": "$2b$10$CRES77ZoDSbV2SxnhsLlvulb5h0f6UtlAIYHIO23ZrU.Ij.mDrGku"
    },
    {
      "id": "2",
      "username": "jane",
      "passwordHash": "$2b$10$kc3WIlyB6shqeDvW.V95euaMEV0J81KVsBxOAuSx75wqxcFzVesKa"
    }
  ]
}
```

## 🛠️ Manual Method (Advanced)

If you prefer to add users manually:

### Step 1: Generate Password Hash

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourPassword123!', 10));"
```

### Step 2: Edit users.json

Open `data/users.json` and add:

```json
{
  "id": "3",
  "username": "newuser",
  "passwordHash": "<paste-hash-from-step-1>"
}
```

### Step 3: Save and Test

The new user can immediately login at `/login`

## 🚀 Production Deployment

### On Hostinger (or your server):

```bash
# SSH into your server
ssh your-username@your-server

# Navigate to project
cd /path/to/gunnforge

# Add a user
npm run user:add john SecurePassword123!

# List users to verify
npm run user:list

# Restart the application (if using PM2)
pm2 restart gunnforge
```

## 🔄 Bulk User Import

To add multiple users at once, create a script:

```bash
#!/bin/bash
npm run user:add alice Password123!
npm run user:add bob SecurePass456!
npm run user:add carol MyPass789!
```

Save as `add-bulk-users.sh`, make executable, and run:

```bash
chmod +x add-bulk-users.sh
./add-bulk-users.sh
```

## 📊 User Roles

Currently, all users have the same access level:
- ✅ Can login
- ✅ Can access `/members` area
- ✅ Can view projects and crafts

### To implement different roles (future enhancement):

Add a `role` field to users:

```json
{
  "id": "1",
  "username": "admin",
  "role": "admin",
  "passwordHash": "..."
}
```

## 🔒 Security Best Practices

1. **Strong Passwords**: Always use complex passwords
2. **Unique Passwords**: Each user should have a different password
3. **Change Default**: Change the default admin password immediately
4. **Backup users.json**: Keep a secure backup of this file
5. **Don't Commit Passwords**: Never commit plain passwords to git
6. **HTTPS Only**: Always use HTTPS in production

## ❓ Troubleshooting

### "User already exists"
```bash
# Remove the existing user first
npm run user:remove john

# Then add again
npm run user:add john NewPassword123!
```

### "Password must be at least 8 characters"
```bash
# Use a longer password
npm run user:add john MyLongerPassword123!
```

### "Error reading users.json"
```bash
# Make sure the file exists
ls -la data/users.json

# If missing, create it:
echo '{"users":[]}' > data/users.json
```

## 📝 Testing New Users

After adding a user:

1. Visit: `http://localhost:3000/login` (or your domain)
2. Enter the username and password
3. You should be redirected to the homepage
4. Navigate to `/members` to verify access

## 🎯 Common Workflows

### Add a Team Member
```bash
npm run user:add sarah TeamPass2025!
# Share credentials securely (use encrypted communication)
```

### Audit Users
```bash
npm run user:list
# Review all current users
# Remove any unnecessary accounts
```

### Remove Inactive User
```bash
npm run user:remove olduser
```

### Reset a User's Password
```bash
# Remove old user
npm run user:remove john

# Add with new password
npm run user:add john NewSecurePass123!
```

## 🔗 Related Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploying to production
- [README.md](./README.md) - General project information
- [TERMINAL-REDESIGN.md](./TERMINAL-REDESIGN.md) - Terminal interface guide

---

**Need Help?** Check the main README or open an issue on GitHub.
