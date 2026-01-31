'use client';
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from './sidebarThin';

import { Link } from 'react-router';
import { cn } from '@/lib/utils';
// import TeamDropdown from '../shared/TeamDropdown';
import { Inbox , MessageCircleMore, UsersRound, LayoutDashboard, FileText, SquareKanban, HardDrive, CalendarCheck2, Video, Bot, ListTodo, Music, Disc, Settings, Calendar1, SendHorizontal} from 'lucide-react';

export default function Thinsidebar() {

  const links = [
    {
      label: 'Dashboard',
      href: 'https://conferio-calls.vercel.app/maindashboard',
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Mail',
      href: '/mail/inbox',
      icon: (
        <SendHorizontal className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Meetings',
      href: 'https://conferio-calls.vercel.app/meetings/page',
      icon: (
        <Video className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Chat',
      href: 'https://conferio-calls.vercel.app/chat',
      icon: (
        <MessageCircleMore className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: 'Docs',
      href: 'https://conferio-calls.vercel.app/docs',
      icon: (
        <FileText className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },


    {
      label: 'Srumboard',
      href: 'https://conferio-calls.vercel.app/board/index',
      icon: (
        <SquareKanban className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Drive',
      href: 'https://conferio-calls.vercel.app/drive/page',
      icon: (
        <HardDrive className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Events',
      href: 'https://conferio-calls.vercel.app/events/page',
      icon: (
        <CalendarCheck2 className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'AI',
      href: 'https://conferio-ai.vercel.app',
      icon: (
        <Bot className="text-neutral-700  dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },


    {
      label: 'Calendar',
      href: 'https://conferio-calls.vercel.app/calendar/page',
      icon: (
        <Calendar1 className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: 'Clips',
      href: 'https://conferio-calls.vercel.app/clips',
      icon: (
        <Disc className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Bookings",
      href: "https://conferio-calls.vercel.app/bookings/page",
      icon: (
        <ListTodo  className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },


    {
      label: 'Music',
      href: 'https://conferio-calls.vercel.app/music/page',
      icon: (
        <Music className="text-neutral-700  dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: 'Settings',
      href: 'https://conferio-calls.vercel.app/settings/page',
      icon: (
        <Settings className="text-neutral-700 dark:text-white/70 h-5 w-5 flex-shrink-0" />
      ),
    },
   
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-950 overflow-hidden',
        'h-screen w-fit'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <></>}
            <div className="mt-6 flex flex-col gap-2 px-4">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            {/* <TeamDropdown /> */}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link to="/" className="flex pl-3 items-center space-x-2">
      <img
        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png"
        alt="logo"
        className="text-black bg-black p-1 rounded-md h-8 w-8"
       
      />
      <span className="dark:text-white text-black font-normal text-lg">
        Conferio
      </span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black relative z-20"
    >
      <img
        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1718475378/CONFERIO/gbkp0siuxyro0cgjq9rq.png"
        alt="logo"
        className="text-black p-1 bg-black rounded-md h-6 w-auto"
      />{' '}
    </Link>
  );
};
