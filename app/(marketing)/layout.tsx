import Navbar from "./_components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <div className="h-full pt-6">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </div>
    </div>
  );
};

export default MarketingLayout;
