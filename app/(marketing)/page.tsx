import Footer from "./_components/footer";
import Heading from "./_components/heading";

const MarketingLayout = () => {
  return (
    <>
      <div className="min-h-full flex flex-col">
        <div
          className="flex flex-col items-center justify-center
    md:  text-center gap-y-8 flex-1 px-6 pb-10 "
        >
          <Heading />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MarketingLayout;
