import { SearchX } from "lucide-react";

export function EmptyState({ message = "Không tìm thấy dữ liệu" }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <SearchX className="w-12 h-12 mb-3 text-gray-400" />
      <p className="text-lg">{message}</p>
    </div>
  );
}
