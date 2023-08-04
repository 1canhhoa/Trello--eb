import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumn from "./ListColumns/ListColumns";
import { MapOrder } from "~/utils/sort";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Cart/Cart";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  // fix click chuột:yêu cầu chuột di chuyển 10px thì mới kích hoạt event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  // nhấn giữ 250ms và dung sai của cảm ứng(dễ hiểu là di chuyển chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 100, tolerance: 5 },
  });
  // ưu tiên sử dụng touch và mouse để sử dụng mượt mà trên mobile
  const sensors = useSensors(mouseSensor, touchSensor);

  // set lại Mảng hiển thị, dựa vào 3 dữ liệu (originArray,orderArray,key)
  const [orderedColumns, setOrderedColumns] = useState([]);
  // cùng 1 thời điểm chỉ có 1 phần tử đc kéo (column hoặc id)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  // lấy type để biết là đang kéo COLUMN HAY CARD từ đó render ra <Column/> hay <Cart/>(phần dự chỗ)
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  // lấy data của Card hay Column truyền vào làm prop để render ra <Card/> hay <Column/>
  const [activeDragItemData, setActiveDragItemData] = useState(null);

  useEffect(() => {
    setOrderedColumns(MapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragStart = (event) => {
    console.log("e :>> ", event);
    setActiveDragItemId(event?.active?.id);
    // nếu tồn tại columnId(tức là đang kéo card ) sẽ thuộc kiểu card và ngược lại
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragEnd = (event) => {
    // console.log("e :>> ", event);
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      // console.log("keo tha cho anh");
      // lấy vị trí cũ từ active
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
      // lấy vị trí cũ từ over
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id);
      // dùng arayMove để sắp xếp lại mảng
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
      //const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
      // mảng nhận đc sau khi kéo
      // console.log(dndOrderedColumns);
      // sau này có api phải cập nhật lại sữ liệu này vào db, vì bậy giờ reresh lại trang sẽ về như cũ
      // console.log(dndOrderedColumnsIds);
      setOrderedColumns(dndOrderedColumns);
    }
    // kéo xong thả ra sẽ xét lại null
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };
  // fix lỗi dựt dựt khi kéo thả column dự chỗ
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Box
        sx={{
          p: "10px 0",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme._boardcontentHeight,
          "*::-webkit-scrollbar-track": {
            m: "10px",
          },
        }}
      >
        <ListColumn columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
