import LoadingEffect from "~/assets/images/loading.gif";

const Loading = () => {
  return (
    <div className="flex items-center w-96 h-5 p-3 border border-[#bbb] gap-2 justify-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] opacity-50 z-50 bg-[#eee]">
      <img src={LoadingEffect} alt="" className="opacity-35" />
      <span className="font-bold opacity-35">Loading...</span>
    </div>
  );
};

export default Loading;
