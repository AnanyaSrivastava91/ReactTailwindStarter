# Vercel Deployment Guide for Sentence Construction App

This guide explains how to deploy this application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Git installed on your machine
3. The Vercel CLI (optional but recommended)

## Deployment Steps

### 1. Prepare Your Project

Before deploying to Vercel, make the following modifications:

1. **Update the package.json** script section to include:
   ```json
   "scripts": {
     "vercel-build": "npm run build"
   }
   ```

2. **Create a `vercel.json` file** in the root directory with the following content:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server/index.ts",
         "use": "@vercel/node"
       },
       {
         "src": "client/**",
         "use": "@vercel/static-build",
         "config": { "distDir": "dist" }
       }
     ],
     "routes": [
       { 
         "src": "/api/(.*)", 
         "dest": "server/index.ts" 
       },
       { 
         "src": "/(.*)", 
         "dest": "dist/$1",
         "continue": true
       },
       {
         "src": "/(.*)",
         "dest": "index.html"
       }
     ]
   }
   ```

3. **Ensure your API endpoints use relative paths** in the client code.

### 2. Deploy Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. In your project directory, run:
   ```bash
   vercel login
   vercel
   ```

3. Follow the prompts to configure and deploy your project.

### 3. Deploy Using Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).

2. Log in to your Vercel dashboard.

3. Click "New Project" and import your repository.

4. Configure your project settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

5. Click "Deploy" to start the deployment process.

## Environment Variables

If your application requires environment variables, add them in the Vercel dashboard under your project settings:

1. Go to your project in the Vercel dashboard.
2. Navigate to "Settings" > "Environment Variables".
3. Add your environment variables.

## Troubleshooting

- If you encounter routing issues, check your `vercel.json` configuration.
- For build errors, check the build logs in the Vercel dashboard.
- Make sure all dependencies are properly listed in your package.json.

## Custom Domain

To set up a custom domain:

1. Go to your project in the Vercel dashboard.
2. Navigate to "Settings" > "Domains".
3. Add your domain and follow the instructions to set up DNS records.