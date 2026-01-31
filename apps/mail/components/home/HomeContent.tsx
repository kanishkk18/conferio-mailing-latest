import {
  ChevronDown,
  CurvedArrow,
  GitHub,
  Plus,
  Cube,
  MediumStack,
  Clock,
  PanelLeftOpen,
  Check,
  Filter,
  Search,
  User,
  Lightning,
  ExclamationTriangle,
  Bell,
  Tag,
  GroupPeople,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Figma,
  Docx,
  ImageFile,
  Expand,
} from '../icons/icons';
import { PixelatedBackground, PixelatedLeft, PixelatedRight } from '@/components/home/pixelated-bg';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { signIn, useSession } from '@/lib/auth-client';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Balancer } from 'react-wrap-balancer';
import { Navigation } from '../navigation';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Footer from './footer';
import React from 'react';

const firstRowQueries: string[] = [
  'Show recent design feedback',
  'Reply to Nick',
  'Find invoice from Stripe',
];

const secondRowQueries: string[] = [
  'Schedule meeting with Sarah',
  'What did alex say about the design',
];

const tabs = [
  { label: 'Chat With Your Inbox', value: 'smart-categorization' },
  { label: 'Smart Labels', value: 'ai-features' },
  { label: 'Write Better Emails', value: 'feature-3' },
];

export default function HomeContent() {
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { data: session } = useSession();

  useEffect(() => {
    setTheme('dark');
  }, [setTheme]);

  return (
    <main className="relative flex h-full flex-1 flex-col overflow-x-hidden px-2">
      {/* <PixelatedBackground
        className="z-1 absolute left-1/2 top-[-40px] h-auto w-screen min-w-[1920px] -translate-x-1/2 object-cover"
        style={{
          mixBlendMode: 'screen',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      /> */}

      {/* <Navigation /> */}

      <section className="z-10 mt-32 flex flex-col items-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-4xl font-medium md:text-6xl"
        >
          <Balancer className="mb-3 max-w-[1130px]">
            Conferio Mail – Smarter Email, Powered by AI.
          </Balancer>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mb-4 max-w-2xl text-center text-base font-medium text-[#B7B7B7] md:text-lg"
        >
Conferio Mail is an intelligent email client that takes the inbox off your hands.        </motion.p>
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6 "
        >
          <Button
            onClick={() => {
              if (session) {
                navigate('/mail/inbox');
              } else {
                toast.promise(
                  signIn.social({
                    provider: 'google',
                    callbackURL: `${window.location.origin}/mail`,
                  }),
                  {
                    error: 'Login redirect failed',
                  },
                );
              }
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </section>
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden lg:block"
      >
        <div className="mx-auto max-w-[920px] text-center text-4xl font-normal leading-[48px] text-white">
          <span className="text-[#B7B7B7]">Work smarter, not harder.</span>{' '}
          <span className="pr-12 text-white">Automate repetitive</span>{' '}
          <span className="text-[#B7B7B7]">email</span>
          <span className="text-[#B7B7B7]"> tasks with</span>{' '}
          <span className="pr-14 text-white">smart templates, </span>{' '}
          <span className="text-white">scheduled sends</span>
          <span className="text-[#B7B7B7]">
            , follow-up reminders, and batch processing capabilities that
          </span>{' '}
          <br />
          <span className="text-white underline">save hours every week.</span>
        </div>
        <div className="flex items-center justify-center">
          <img
            className="relative bottom-12 right-[162px]"
            src="/verified-home.png"
            alt="tasks"
            width={50}
            height={50}
          />
          <img
            className="relative bottom-[145px] right-[47px]"
            src="/snooze-home.png"
            alt="tasks"
            width={50}
            height={50}
          />
          <img
            className="relative bottom-[195px] left-[210px]"
            src="/star-home.png"
            alt="tasks"
            width={50}
            height={50}
          />
        </div>
      </motion.div>
 */}

    </main>
  );
}