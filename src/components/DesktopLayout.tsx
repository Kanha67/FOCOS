import { ReactNode } from "react";
import { motion } from "framer-motion";

interface DesktopLayoutProps {
  children?: ReactNode;
  leftColumn?: ReactNode;
  middleColumn?: ReactNode;
  rightColumn?: ReactNode;
  pageTitle: string;
  pageIcon: ReactNode;
  pageDescription?: string;
  headerActions?: ReactNode;
}

export default function DesktopLayout({
  children,
  leftColumn,
  middleColumn,
  rightColumn,
  pageTitle,
  pageIcon,
  pageDescription = "Manage your tasks and activities",
  headerActions
}: DesktopLayoutProps) {
  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {children}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Desktop Header */}
        <motion.div 
          className="flex justify-between items-center mb-8 px-4 py-3 glass-card"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                {pageIcon}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{pageTitle}</h2>
                <p className="text-xs text-muted-foreground">{pageDescription}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {headerActions}
          </div>
        </motion.div>

        {/* Desktop Multi-column Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - 3/12 width */}
          {leftColumn && (
            <div className="col-span-3 space-y-6">
              {leftColumn}
            </div>
          )}

          {/* Middle Column - adjustable width based on columns present */}
          <div className={`${
            leftColumn && rightColumn ? 'col-span-5' : 
            leftColumn || rightColumn ? 'col-span-9' : 
            'col-span-12'
          } space-y-6`}>
            {middleColumn}
          </div>

          {/* Right Column - 4/12 width */}
          {rightColumn && (
            <div className="col-span-4 space-y-6">
              {rightColumn}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
