"use client";

import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  description?: string;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  variant?: "default" | "pills" | "underline";
}

export function TabNavigation({ 
  tabs, 
  activeTab, 
  onTabChange, 
  children, 
  className = "",
  variant = "default"
}: TabNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Auto-detect active tab based on pathname
    const currentPath = pathname.split('/').pop() || '';
    const matchingTab = tabs.find(tab => 
      tab.href?.includes(currentPath) || 
      tab.value === currentPath ||
      (currentPath === '' && tab.value === 'overview')
    );
    
    if (matchingTab && matchingTab.value !== activeTab) {
      onTabChange(matchingTab.value);
    }
  }, [pathname, tabs, activeTab, onTabChange]);

  const handleTabChange = (value: string) => {
    onTabChange(value);
    const tab = tabs.find(t => t.value === value);
    if (tab?.href) {
      router.push(tab.href);
    }
  };

  const getTabListClassName = () => {
    switch (variant) {
      case "pills":
        return "grid w-full bg-gray-100 p-1 rounded-lg";
      case "underline":
        return "w-full border-b border-gray-200";
      default:
        return "grid w-full bg-gray-100 p-1 rounded-lg";
    }
  };

  const getTabTriggerClassName = () => {
    switch (variant) {
      case "pills":
        return "data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs";
      case "underline":
        return "data-[state=active]:border-b-2 data-[state=active]:border-[#C40503] data-[state=active]:text-[#C40503] rounded-none";
      default:
        return "data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs";
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-center">
        <TabsList className={getTabListClassName()}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={getTabTriggerClassName()}
            >
              {tab.icon && <span className="mr-1">{tab.icon}</span>}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value={activeTab} className="mt-6">
        {children}
      </TabsContent>
    </Tabs>
  );
}
