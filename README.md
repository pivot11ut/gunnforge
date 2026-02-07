# GunnForge

A Next.js website showcasing projects and crafts with a protected members-only section.

## Features

- **Public Pages**: Projects and Crafts galleries accessible to everyone
- **Authentication**: Secure JWT-based authentication with HTTP-only cookies
- **Protected Content**: Members-only area requiring authentication
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **TypeScript**: Fully typed for better developer experience

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: JWT with jose library
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (optional - defaults are provided):

Create a `.env.local` file:

```env
JWT_SECRET=your-secret-key-change-this-in-production
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Default Credentials

For testing purposes, a default user is included:

- **Username**: `admin`
- **Password**: `admin123`

> **Security Note**: Change these credentials before deploying to production!

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/          # Authentication API routes
│   ├── projects/          # Projects showcase page
│   ├── crafts/            # Crafts showcase page
│   ├── members/           # Protected members area
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout with navigation
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navigation.tsx     # Site navigation
│   └── LoginForm.tsx      # Login form
├── lib/                   # Utility libraries
│   ├── auth.ts           # JWT utilities
│   └── users.ts          # User management
├── types/                 # TypeScript type definitions
│   └── auth.ts           # Auth-related types
└── middleware.ts          # Route protection middleware

data/
└── users.json            # User credentials (bcrypt hashed)
```

## Adding Users

To add a new user:

1. Generate a password hash:

```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-password', 10);
console.log(hash);
```

2. Add the user to `data/users.json`:

```json
{
  "users": [
    {
      "id": "2",
      "username": "newuser",
      "passwordHash": "<generated-hash>"
    }
  ]
}
```

## Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens stored in HTTP-only cookies (XSS protection)
- ✅ Server-side token validation via middleware
- ✅ Environment variables for secrets
- ✅ HTTPS-only cookies in production
- ✅ SameSite cookie protection

## License

ISC

## Contributing

Feel free to submit issues and enhancement requests!
