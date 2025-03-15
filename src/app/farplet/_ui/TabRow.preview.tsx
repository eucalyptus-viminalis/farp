export default function TabRow() {
  return (
    <div className="flex bg-app h-16 sticky top-0 flex-row items-center justify-between text-gray-400 text-xl font-semibold">
      <span className="text-center w-full h-full flex flex-col justify-center border-b-4">
        Tokens
      </span>
      <span className="flex flex-col justify-center h-full text-center w-full">
        Activity
      </span>
      <span className="flex flex-col justify-center h-full text-center w-full">
        Collectibles
      </span>
    </div>
  );
}
