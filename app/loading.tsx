export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      <div className="h-full w-full bg-[#FF9E75]/20 dark:bg-[#ff7c50]/10">
        <div className="h-full bg-[#FF9E75] dark:bg-[#ff7c50] animate-[loading-bar_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
