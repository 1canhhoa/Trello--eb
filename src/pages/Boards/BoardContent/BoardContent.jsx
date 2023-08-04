import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ListColumn from "./ListColumns/ListColumns";
import theme from "~/Theme";
import { MapOrder } from "~/utils/sort";
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

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

  //
  const [orderedColumns, setOrderedColumns] = useState([]);
  useEffect(() => {
    setOrderedColumns(MapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    console.log("e :>> ", event);
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
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
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
      </Box>
    </DndContext>
  );
}

export default BoardContent;
