const TITLE = 'Conferio-Mail';
const DESCRIPTION =
  'Conferio-Mail is an Mailing service, privacy-focused email client designed to enhance your email experience with AI-powered features and seamless management tools.';

export const siteConfig = {
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: '/favicon.ico',
  },
  applicationName: 'Conferio-Mail',
  creator: '@Kanishkkb_18 on Instagram @k9codrr on instagram',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${import.meta.env.VITE_PUBLIC_APP_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: TITLE,
      },
    ],
  },
  category: 'Email Client',
  alternates: {
    canonical: import.meta.env.VITE_PUBLIC_APP_URL,
  },
  keywords: [
    'Mail',
    'Email',
    'Open Source',
    'Email Client',
    'Gmail Alternative',
    'Webmail',
    'Secure Email',
    'Email Management',
    'Email Platform',
    'Communication Tool',
    'Productivity',
    'Business Email',
    'Personal Email',
    'Mail Server',
    'Email Software',
    'Collaboration',
    'Message Management',
    'Digital Communication',
    'Email Service',
    'Web Application',
  ],
  //   metadataBase: new URL(import.meta.env.VITE_PUBLIC_APP_URL!),
};
