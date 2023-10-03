"use client";
import "./index.scss";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-white">
      <div className="absolute flex items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="loading_ w-5 h-5 bg-2586A3 rounded-50%"></div>
        <div className="loading_ w-5 h-5 bg-2586A3 rounded-50%"></div>
        <div className="loading_ w-5 h-5 bg-2586A3 rounded-50%"></div>
        <div className="loading_ w-5 h-5 bg-2586A3 rounded-50%"></div>
      </div>
    </div>
  );
};

export default Loading;
