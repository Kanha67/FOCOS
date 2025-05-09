import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAppContext } from "@/context/AppContext";
import FinancialAdvisorChat from "./FinancialAdvisorChat";

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings } = useAppContext();
  const [showButton, setShowButton] = useState(true);

  // Don't show the button on the chat page or index page
  useEffect(() => {
    setShowButton(
      location.pathname !== "/financial-chat" &&
      location.pathname !== "/index"
    );
  }, [location.pathname]);

  // Handle button click
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  // Navigate to full chat page
  const handleExpandChat = () => {
    setIsOpen(false);
    navigate("/financial-chat");
  };

  if (!showButton) return null;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            className="fixed bottom-28 right-6 z-40 lg:bottom-auto lg:top-24 lg:right-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="icon"
              className={`h-14 w-14 rounded-full shadow-xl ${
                settings.divineMode
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border border-amber-400/30"
                  : "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 border border-blue-400/30"
              }`}
              onClick={handleButtonClick}
              style={{
                boxShadow: settings.divineMode
                  ? '0 10px 25px -5px rgba(251, 191, 36, 0.3), 0 8px 10px -6px rgba(251, 191, 36, 0.2)'
                  : '0 10px 25px -5px rgba(79, 70, 229, 0.3), 0 8px 10px -6px rgba(79, 70, 229, 0.2)'
              }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className={`sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-[80vh] flex flex-col rounded-xl shadow-2xl ${
            settings.divineMode
              ? "bg-gradient-to-b from-amber-950/90 to-amber-900/95 border-amber-500/30"
              : "bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black border-gray-200 dark:border-gray-800"
          } lg:desktop-hover-lift`}
        >
          <DialogHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-800">
            <DialogTitle className={`text-lg font-semibold ${settings.divineMode ? "text-amber-400" : ""}`}>
              {settings.divineMode ? "Spiritual Guide" : "AI Assistant"}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant={settings.divineMode ? "default" : "outline"}
                size="sm"
                onClick={handleExpandChat}
                className={`text-xs ${
                  settings.divineMode
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : ""
                }`}
              >
                Expand
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-1">
            <FinancialAdvisorChat isFloating={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
