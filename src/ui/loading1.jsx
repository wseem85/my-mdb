export default function Loading1() {
  return (
    <div className="flex gap-1 min-h-[48px] items-center w-full justify-center">
      {[0, 1, 2].map((el) => (
        <span
          key={el}
          className={`w-4 h-4  md:w-6 md:h-6 transition-opacity duration-300  ${
            el === 1
              ? " animate-pulse2 "
              : el === 2
              ? " animate-pulse4"
              : " animate-pulse "
          }    bg-primary rounded-full 
           
          `}
        ></span>
      ))}
    </div>
  );
}
