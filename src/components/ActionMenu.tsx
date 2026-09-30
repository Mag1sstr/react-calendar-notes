import { Delete, Edit, Plus } from "lucide-react";
import { useStore } from "../store/store";
import { observer } from "mobx-react-lite";
interface IProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
const ActionMenu = observer(({ onAdd, onDelete, onEdit }: IProps) => {
  const { menu } = useStore();

  if (!menu) return null;
  return (
    <div
      className="
        fixed z-50 w-auto 
        rounded-xl
        border border-[#EAEAEA]
        bg-white
        p-1.5
        shadow-[0_10px_35px_rgba(0,0,0,0.12)]
        animate-in fade-in zoom-in-95 duration-100

      [&>button>p]:hidden
      sm:[&>button>p]:block
      sm:w-[180px]
      "
      style={{
        visibility: menu ? "visible" : "hidden",
        left: menu.x + 16,
        top: menu.y - 42,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute  w-3 h-3 bg-white top-10 right-full translate-x-1/2 rotate-45 z-40"></div>
      <button
        className="
          flex w-full items-center gap-3
          rounded-lg px-3 py-2.5
          text-[14px] font-medium text-[#333]
          transition-colors
          hover:bg-[#F5F5F5]
        "
        onClick={onAdd}
      >
        <Plus size={18} />
        <p>Добавить</p>
      </button>

      <button
        className="
          flex w-full items-center gap-3
          rounded-lg px-3 py-2.5
          text-[14px] font-medium text-[#333]
          transition-colors
          hover:bg-[#F5F5F5]
        "
        onClick={onEdit}
      >
        <Edit size={18} />
        <p>Изменить</p>
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
        onClick={onDelete}
      >
        <Delete size={18} />
        <p>Удалить</p>
      </button>
    </div>
  );
});

export default ActionMenu;
