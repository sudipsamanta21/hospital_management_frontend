import React from "react";
import { LoaderCircle } from "lucide-react";
const Loading = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <LoaderCircle className="animate-spin text-blue-600" size={34} />
      <p className="text-sm text-slate-500">Loading...</p>
    </div>
  );
}
export default Loading;
