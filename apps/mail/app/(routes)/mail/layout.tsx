import { HotkeyProviderWrapper } from '@/components/providers/hotkey-provider-wrapper';
// import { OnboardingWrapper } from '@/components/onboarding';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { Outlet } from 'react-router';

export default function MailLayout() {
  return (
    <HotkeyProviderWrapper>
      {/* <Thinsidebar /> */}
      <AppSidebar />
      <div className="bg-sidebar dark:bg-[#080808] w-full">
        <Outlet />
      </div>
      {/* <OnboardingWrapper /> */}
    </HotkeyProviderWrapper>
  );
}
