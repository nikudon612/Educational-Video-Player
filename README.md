This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

LearnWell is an educational video hosting platform that allows users to engage with each other - similar to Youtube. 
The Application:
- Hosts a homepage which displays videos users have uploaded
- Allows users to upload videos to the platform, including custom title and description
- Has a comment section that allows community members to engage and comment on any video
- Employes a video player that allows for fullscreen and playback speed adjustments

Currently logged in as my own user. There are currently a set number of users to view content from, which are all predefined in the api.js file. As of the first day, this application only takes videos from Youtube but I want to add in the feature for users to upload their own videos. Changing user_ids in the api file will allow you to change your active user, allowing you to upload and comment as other users. This would also like to be changed to include some sort of user auth in the future.
