type Props = {
  children: JSX.Element | JSX.Element[];
};

const ModalContainer = ({ children }: Props) => {
  return (
    /* background blur window */
    <div
      className="overflow-auto transition-all
    fixed inset-0 flex justify-center items-center backdrop-blur-sm z-60">
      {/* main modal window */}
      <div className="relative space-y-4 flex flex-col w-1/3 min-w-fit min-h-fit p-6 bg-white dark:text-black">
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
