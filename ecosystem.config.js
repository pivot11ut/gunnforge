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
