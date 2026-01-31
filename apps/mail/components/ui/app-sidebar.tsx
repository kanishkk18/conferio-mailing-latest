import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { useCommandPalette } from '../context/command-palette-context';
import { navigationConfig, bottomNavItems } from '@/config/navigation';
import React, { useCallback, useMemo, useState } from 'react';
import { Compose } from '../animate-ui/icons/composePencil';
import { AnimateIcon } from '../animate-ui/icons/icon';
import { useTRPC } from '@/providers/query-provider';
import { useSidebar } from '@/components/ui/sidebar';
import { CreateEmail } from '../create/create-email';
import { useMutation } from '@tanstack/react-query';
import { useBilling } from '@/hooks/use-billing';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/auth-client';
import { useAIFullScreen } from './ai-sidebar';
import { useStats } from '@/hooks/use-stats';
import { Search, X } from '../icons/icons';
import { useLocation } from 'react-router';
import { cn, FOLDERS } from '@/lib/utils';
import { m } from '@/paraglide/messages';
import Thinsidebar from './thinSidebar';
import { isMac } from '@/lib/platform';
import { NavUser } from './nav-user';
import { NavMain } from './nav-main';
import { useQueryState } from 'nuqs';
import { toast } from 'sonner';
import {
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
  FloatingPanelBody
} from "@/components/ui/floating-panel"
import { Badge } from './badge';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isPro, isLoading } = useBilling();
  const trpc = useTRPC();
  const { mutateAsync: createMeet } = useMutation(trpc.meet.create.mutationOptions());
  const [showUpgrade, setShowUpgrade] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hideUpgradeCard') !== 'true';
    }
    return true;
  });
  const [, setPricingDialog] = useQueryState('pricingDialog');
  const { isFullScreen } = useAIFullScreen();
  const { data: stats } = useStats();
  const location = useLocation();
  const { data: session } = useSession();
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const [dialogOpen, setDialogOpen] = useQueryState('isComposeOpen');
  const [, setDraftId] = useQueryState('draftId');
  const [, setTo] = useQueryState('to');
  const [, setActiveReplyId] = useQueryState('activeReplyId');
  const [, setMode] = useQueryState('mode');
  const { activeFilters, clearAllFilters } = useCommandPalette();
  const [, setIsCommandPaletteOpen] = useQueryState('isCommandPaletteOpen');
  const handleOpenChange = async (open: boolean) => {
    if (!open) {
      setDialogOpen(null);
    } else {
      setDialogOpen('true');
    }
    setDraftId(null);
    setTo(null);
    setActiveReplyId(null);
    setMode(null);
  };

  const handleOpenCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen('true');
  }, [setIsCommandPaletteOpen]);

  const handleClearFilters = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      clearAllFilters();
    },
    [clearAllFilters],
  );
  
  const { currentSection, navItems } = useMemo(() => {
    // Find which section we're in based on the pathname
    const section = Object.entries(navigationConfig).find(([, config]) =>
      location.pathname.startsWith(config.path),
    );

    const currentSection = section?.[0] || 'mail';
    if (navigationConfig[currentSection]) {
      const items = [...navigationConfig[currentSection].sections];

      if (currentSection === 'mail' && stats && stats.length) {
        if (items[0]?.items[0]) {
          items[0].items[0].badge =
            stats.find((stat) => stat.label?.toLowerCase() === FOLDERS.INBOX)?.count ?? 0;
        }
        if (items[0]?.items[3]) {
          items[0].items[3].badge =
            stats.find((stat: any) => stat.label?.toLowerCase() === FOLDERS.SENT)?.count ?? 0;
        }
      }

      return { currentSection, navItems: items };
    } else {
      return {
        currentSection: '',
        navItems: [],
      };
    }
  }, [location.pathname, stats]);

  const showComposeButton = currentSection === 'mail';
  

//   const handleCreateMeet = async () => {
//   try {
//     const { id } = await createMeet();

//     const meetingUrl = `https://conferio-calls.vercel.app/meeting/${id}`;

//     await navigator.clipboard.writeText(meetingUrl);
//     toast.success('Meeting link copied to clipboard');
//   } catch (error) {
//     console.error(error);
//     toast.error('Failed to create meeting');
//   }
// };


  return (
    <div className="">
      <Thinsidebar />
      {!isFullScreen && (
        <Sidebar
          collapsible="icon"
          {...props}
          className={`bg-sidebar dark:!bg-transparent ml-0.5 flex h-screen select-none flex-col items-center ${state === 'collapsed' ? '' : ''} pb-0`}
        >
          <SidebarHeader
            className={`relative top-2.5 flex flex-col gap-2 ${state === 'collapsed' ? 'px-2' : 'md:px-4'}`}
          >
            {session && <NavUser />}

            {showComposeButton && (
              <div className="flex gap-1">
                <div className={cn('w-full ')}>
                {state === "collapsed" ? (
                  <ComposeButton />
                ): null}
                  {state === "expanded" ? (
                //   <Button
                //     // onClick={handleCreateMeet}
                //     variant="outline"
                //     className="w-full mt-1.5 flex items-center dark:border-border/30 bg-black justify-between gap-2 px-3 py-4  h-0"
                //   >
                //     <Video className="text-muted-foreground h-4 w-4" /> <p className='text-sm font-medium text-[#A0A0A9]'>Create</p>
                //     <kbd className="bg-muted border-border/40 dark:bg-muted/40 pointer-events-none hidden h-4 select-none items-center gap-1 rounded border px-1 text-xs font-medium opacity-80 sm:flex">
                //   <span className={cn('text-xs', isMac ? 'text-xs' : 'text-xs')}>
                //     {isMac ? '⌘' : 'Ctrl'}
                //   </span>
                //   <span className="text-xs">M</span>  
                // </kbd>
                //   </Button>
                 <Button
              variant="outline"
              className={cn(
                'text-muted-foreground w-full border-border/40 bg-background/50 hover:bg-accent/30 focus-visible:ring-ring dark:border-border/30 dark:bg-black relative flex h-8 flex-1 select-none items-center justify-start overflow-hidden rounded-lg border pl-3 text-left text-sm font-normal shadow-none ring-0 backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              onClick={handleOpenCommandPalette}
            >
              <Search className="fill-muted-foreground h-4 w-4" />

              <span className="ml-3 hidden truncate pr-20 lg:inline-block">
                {activeFilters.length > 0
                  ? activeFilters.map((f) => f.display).join(', ')
                  : 'Search'}
              </span>
              <span className="ml-1 inline-block truncate pr-20 lg:hidden">
                {activeFilters.length > 0
                  ? `${activeFilters.length} filter${activeFilters.length > 1 ? 's' : ''}`
                  : 'Search'}
              </span>

              <div className="absolute right-2 flex items-center gap-2">
                 {activeFilters.length > 0 && (
                            <Badge variant="secondary" className="ml-2 h-5 rounded px-1">
                              {activeFilters.length}
                            </Badge>
                          )} 
                {activeFilters.length > 0 && (
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-3 rounded-md px-1 py-1 text-xs"
                    onClick={handleClearFilters}
                  >
                    Clear
                  </Button>
                )}
                <kbd className="bg-muted border-border/40 dark:bg-muted/40 pointer-events-none hidden h-4 select-none items-center gap-1 rounded border px-1 text-xs font-medium opacity-80 sm:flex">
                  <span className={cn('text-xs', isMac ? 'text-xs' : 'text-xs')}>
                    {isMac ? '⌘' : 'Ctrl'}
                  </span>
                  <span className="text-xs">K</span>
                </kbd>
              </div>
            </Button> 
        
                  ): null} 
                </div>
              </div>
            )}
          </SidebarHeader>
          <SidebarContent
            className={`scrollbar scrollbar-w-1 scrollbar-thumb-accent/40 scrollbar-track-transparent hover:scrollbar-thumb-accent scrollbar-thumb-rounded-full -py-3 overflow-x-hidden pt-0 ${state !== 'collapsed' ? 'mt-5 md:px-4' : 'px-2'}`}
          >
            <AnimateIcon animateOnHover className="flex-1 py-0">
              <NavMain items={navItems} />
            </AnimateIcon>
          </SidebarContent>
          <SidebarFooter className={`px-0 pb-0 ${state === 'collapsed' ? 'md:px-2' : 'md:px-4'}`}>
            <NavMain items={bottomNavItems} />
          </SidebarFooter>
        </Sidebar>
      )}
    </div>
  );
}

function ComposeButton() {
  const { state } = useSidebar();
  const isMobile = useIsMobile();

  const [dialogOpen, setDialogOpen] = useQueryState('isComposeOpen');
  const [, setDraftId] = useQueryState('draftId');
  const [, setTo] = useQueryState('to');
  const [, setActiveReplyId] = useQueryState('activeReplyId');
  const [, setMode] = useQueryState('mode');
  const { activeFilters, clearAllFilters } = useCommandPalette();
  const [, setIsCommandPaletteOpen] = useQueryState('isCommandPaletteOpen');
  const handleOpenChange = async (open: boolean) => {
    if (!open) {
      setDialogOpen(null);
    } else {
      setDialogOpen('true');
    }
    setDraftId(null);
    setTo(null);
    setActiveReplyId(null);
    setMode(null);
  };

  const handleOpenCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen('true');
  }, [setIsCommandPaletteOpen]);

  const handleClearFilters = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      clearAllFilters();
    },
    [clearAllFilters],
  );

  return (
    <>

    <FloatingPanelRoot >
      <FloatingPanelTrigger
        title=""
        className="flex items-center px-0 py-0 transition-colors"
      >
       
          <AnimateIcon animateOnHover>
            <button
              type="button"
              className="relative mb-1.5 inline-flex h-8 w-full cursor-pointer items-center justify-center gap-1 self-stretch overflow-hidden rounded-lg border border-gray-200 bg-[#006FFE] text-black transition-colors hover:bg-[#0056CC] dark:border-none dark:text-white dark:hover:bg-[#0056CC]"
            >
              <Compose className="mt-0.5" />
            </button>
          </AnimateIcon>
 
      </FloatingPanelTrigger>
      <FloatingPanelContent className=" max-w-none border-none bg-[#FAFAFA] p-0 shadow-none dark:bg-[#141414]">
        <CreateEmail />
      </FloatingPanelContent> 
      
    </FloatingPanelRoot>
    </>
  );
}
