export const RowHeader: React.FC = () => {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between gap-6 px-3 py-2 text-sm text-gray-500">
        <div className="min-w-0 flex-1 font-medium text-gray-600">
          Week / Project / Member / Task
        </div>
        <div className="flex items-center gap-6">
          <span className="whitespace-nowrap">Mon</span>
          <span className="whitespace-nowrap">Tue</span>
          <span className="whitespace-nowrap">Wed</span>
          <span className="whitespace-nowrap">Thu</span>
          <span className="whitespace-nowrap">Fri</span>
          <span className="whitespace-nowrap">Sat</span>
          <span className="whitespace-nowrap">Sun</span>
          <span className="whitespace-nowrap">Total</span>
        </div>
      </div>
    </div>
  );
};
