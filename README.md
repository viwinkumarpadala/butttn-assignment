# Butttn assignment Submission

## Author
Padala Viwin Kumar

## Description

This repository contains the code for the Butttn assignment submission to build a dynamic drag and drop form builder.

## Technologies Used

- **Tech stack:**
  - NextJS
  - Tailwind CSS
  - Shadcn/UI
  - Prisma
  - dnd kit


## Hosted Website

The hosted website is available [here](https://butttn-assignment.vercel.app/).

## Steps to Use the Repository

### Clone the repository
git clone https://github.com/viwinkumarpadala/butttn-assignment.git

### Frontend

1. Navigate to the frontend directory: `cd butttn-assignment`.
2. Install dependencies: `npm install`.
3. Start the client: `npm run dev`.

### Build the Database
Run the commands in dbhelper.txt in vercel storage with postgresql to build the database

### Sample dot env file

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
POSTGRES_URL=POSTGRES_URL
POSTGRES_PRISMA_URL=POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING=POSTGRES_URL_NON_POOLING



