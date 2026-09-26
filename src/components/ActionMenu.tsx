function ActionMenu() {
  return (
    <div
      className="
        fixed z-50 w-[180px]
        overflow-hidden
        rounded-xl
        border border-[#EAEAEA]
        bg-white
        p-1.5
        shadow-[0_10px_35px_rgba(0,0,0,0.12)]
        animate-in fade-in zoom-in-95 duration-100
      "
    >
      <button
        className="
          flex w-full items-center gap-3
          rounded-lg px-3 py-2.5
          text-[14px] font-medium text-[#333]
          transition-colors
          hover:bg-[#F5F5F5]
        "
      >
        <span className="text-[18px]">＋</span>
        Добавить
      </button>

      <button
        className="
          flex w-full items-center gap-3
          rounded-lg px-3 py-2.5
          text-[14px] font-medium text-[#333]
          transition-colors
          hover:bg-[#F5F5F5]
        "
      >
        <span className="text-[17px]">✎</span>
        Изменить
      </button>

      <div className="my-1 h-px bg-[#F0F0F0]" />

      <button
        className="
          flex w-full items-center gap-3
          rounded-lg px-3 py-2.5
          text-[14px] font-medium text-[#E53935]
          transition-colors
          hover:bg-[#FFF1F1]
        "
      >
        <span className="text-[17px]">⌫</span>
        Удалить
      </button>
    </div>
  );
}

export default ActionMenu;
