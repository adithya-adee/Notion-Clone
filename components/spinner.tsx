const Spinner = () => {
  return (
    <>
      <div className="flex justify-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-white"
          role="status"
        >
          <div className="inner-circle absolute top-0 left-0 w-1/2 h-1/2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
