import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  title: string;
  link: string;
  active?: boolean;
}

interface PageTitleProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: React.ReactNode;
}

export default function PageTitle({
  title,
  description,
  breadcrumb,
  actions,
}: PageTitleProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-2">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center text-sm text-gray-500">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
                )}
                {item.active ? (
                  <span className="font-medium text-[#C40503]">{item.title}</span>
                ) : (
                  <Link href={item.link} className="hover:text-[#DAA625] transition-colors">
                    {item.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-2xl md:text-3xl font-bold text-[#C40503]">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
