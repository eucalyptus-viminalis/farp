export default function TabRow() {
  return (
    <div className="flex bg-app sticky top-0 flex-row items-center justify-between text-gray-400 text-base font-semibold">
      <span className="text-center p-1 w-full h-full flex flex-col justify-center border-b-2">
        Tokens
      </span>
      <span className="flex flex-col p-1 justify-center h-full text-center w-full">
        Activity
      </span>
      <span className="flex flex-col p-1 justify-center h-full text-center w-full">
        Collectibles
      </span>
    </div>
  );
}
