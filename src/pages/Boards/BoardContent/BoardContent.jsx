import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ListColumn from './ListColumns/ListColumns';
import { MapOrder } from '~/utils/sort';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Cart/Cart';
import { cloneDeep } from 'lodash';
import {
    DndContext,
    // PointerSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    closestCorners,
} from '@dnd-kit/core';

const ACTIVE_DRAG_ITEM_TYPE = {
    COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
    CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
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
    const [oldColumnWhenDragingCard, setOldColumnWhenDragingCard] = useState(null);

    useEffect(() => {
        setOrderedColumns(MapOrder(board?.columns, board?.columnOrderIds, '_id'));
    }, [board]);
    const findColumnByCardId = (cardId) => {
        /* lưu ý : nên dùng c.cardId thay vì c.cardOderIds bởi vì ở bước handleDragOver chúng ta sẽ
    làm dữ liệu cho cards hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới*/
        return orderedColumns.find((column) => column.cards.map((card) => card._id)?.includes(cardId));
    };
    //function chung cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
    const moveCardBetweenDifferentColumn = (
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDragingCardData,
    ) => {
        setOrderedColumns((prevColumns) => {
            const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId);
            // logic tính toán cho cardIndex mới
            let newCardIndex;
            const isBelowOverItem =
                active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
            const modifier = isBelowOverItem ? 1 : 0;

            newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;
            // console.log('overCardIndex', overCardIndex);
            // console.log('newCardIndex', newCardIndex);
            // console.log('modifier', modifier);
            // clone mảng orderedColumns ra 1 cái mới để xử lý data rồi return - cập nhật lại orderedColumns mới
            const nextColumns = cloneDeep(prevColumns);
            const nextActiveColumn = nextColumns.find((c) => c._id === activeColumn._id);
            const nextOverColumn = nextColumns.find((c) => c._id === overColumn._id);
            if (nextActiveColumn) {
                // xóa card ở column active
                nextActiveColumn.cards = nextActiveColumn.cards.filter((c) => c._id !== activeDragingCardId);
                // console.log('activeDragingCardId', activeDragingCardId);
                // cập nhật lại cardOrderIds
                nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((c) => c._id);
            }
            if (nextOverColumn) {
                // kiểm tra xem card đang kéo có tồn tại trong overcolumn chưa ,nếu có thì cần xóa nó trước
                nextOverColumn.cards = nextOverColumn.cards.filter((c) => c._id !== activeDragingCardId);
                // const rebuild_activeDragingCardData = {
                //     ...activeDragingCardData,
                //     columnId: nextOverColumn._id,
                // };
                // console.log('rebuild_activeDragingCardData', rebuild_activeDragingCardData);

                // thêm card đang kéo vào overColumn theo index mới
                // toSpliced khác splice là nó trả ra 1 mảng mới ko lien quan đến mảng cũ
                nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, {
                    ...activeDragingCardData,
                    columnId: nextOverColumn._id,
                });
                // cập nhật lại cardOrderIds
                nextOverColumn.cardOrderIds = nextOverColumn.cards.map((c) => c._id);
            }
            return nextColumns;
        });
    };
    const handleDragStart = (event) => {
        // console.log("handleDragStart :>> ", event);
        setActiveDragItemId(event?.active?.id);
        // nếu tồn tại columnId(tức là đang kéo card ) sẽ thuộc kiểu card và ngược lại
        setActiveDragItemType(
            event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN,
        );
        setActiveDragItemData(event?.active?.data?.current);

        //
        if (event?.active?.data?.current?.columnId) {
            setOldColumnWhenDragingCard(findColumnByCardId(event?.active?.id));
        }
    };
    const handleDragOver = (event) => {
        // COLUMN
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            return;
        }
        // console.log("handleDragOver", event);
        const { active, over } = event;
        if (!over || !active) return;
        // console.log("evhandleDragOverent", event);
        //  activeDragingCardId: là card đang được kéo
        const {
            id: activeDragingCardId,
            data: { current: activeDragingCardData },
        } = active;
        // overCardId là cái card đang tương tác trên hoặc dưới
        const { id: overCardId } = over;
        // tìm 2 columns theo cardId
        const activeColumn = findColumnByCardId(activeDragingCardId);
        const overColumn = findColumnByCardId(overCardId);
        if (!activeColumn || !overColumn) return;
        // phải kéo card qua column khác thì mới xử lý
        if (activeColumn._id !== overColumn._id) {
            // console.log("activeColumn", activeColumn);
            // console.log("overColumn", overColumn);
            // console.log("check khác column : ", "kéo hợp lệ");
            // tìm vị trí(index) của overCard(column đích)
            moveCardBetweenDifferentColumn(
                overColumn,
                overCardId,
                active,
                over,
                activeColumn,
                activeDragingCardId,
                activeDragingCardData,
            );
        }
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        // console.log('handleDragEnd :>> ', event);
        if (!active || !over) return;
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
            // console.log('bạn vừa kéo thẻ card');
            //  activeDragingCardId: là card đang được kéo
            const {
                id: activeDragingCardId,
                data: { current: activeDragingCardData },
            } = active;
            // overCardId là cái card đang tương tác trên hoặc dưới
            const { id: overCardId } = over;
            // tìm 2 columns theo cardId
            const activeColumn = findColumnByCardId(activeDragingCardId);
            const overColumn = findColumnByCardId(overCardId);
            if (!activeColumn || !overColumn) return;
            // console.log('activeDragingCardData', activeDragingCardData);
            console.log('activeDragItemData', activeDragItemData);
            console.log('overColumn', overColumn);
            if (activeDragItemData.columnId !== overColumn._id) {
                console.log('kéo card giữa 2 column khác nhau');
                moveCardBetweenDifferentColumn(
                    overColumn,
                    overCardId,
                    active,
                    over,
                    activeColumn,
                    activeDragingCardId,
                    activeDragingCardData,
                );
                // copy từ dragover
                // FUNCTION
            } else {
                console.log('kéo card trong cùng 1 column');
                // console.log('oldColumnWhenDragingCard', oldColumnWhenDragingCard);
                // console.log('activeDragItemId', activeDragItemId);
                // lấy vị trí cũ từ active
                const oldCardIndex = oldColumnWhenDragingCard?.cards?.findIndex((c) => c._id === activeDragItemId);
                // lấy vị trí cũ từ over
                const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId);
                const dndOrderedCards = arrayMove(oldColumnWhenDragingCard?.cards, oldCardIndex, newCardIndex);
                // console.log('dndOrderedCards', dndOrderedCards);

                setOrderedColumns((prevColumns) => {
                    const nextColumns = cloneDeep(prevColumns);
                    // tìm tới column đang thả
                    const targetColumn = nextColumns.find((c) => c._id === overColumn._id);
                    // console.log(targetColumn);
                    // cập nhật lại 2 giá trị cards và ccardOrderIds
                    targetColumn.cards = dndOrderedCards;
                    targetColumn.cardOrderIds = dndOrderedCards.map((c) => c._id);
                    // đến đây mảng nextColumns đã ăn đc giá trị thay đổi trên
                    return nextColumns;
                });
            }
        }
        if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
            // console.log('bạn vừa kéo thẻ column');
            if (active.id !== over.id) {
                // console.log('keo tha cho anh');
                // lấy vị trí cũ từ active
                const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id);
                // lấy vị trí cũ từ over
                const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id);
                // dùng arayMove để sắp xếp lại mảng
                const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex);
                //const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
                // mảng nhận đc sau khi kéo
                // console.log(dndOrderedColumns);
                // sau này có api phải cập nhật lại sữ liệu này vào db, vì bậy giờ reresh lại trang sẽ về như cũ
                // console.log(dndOrderedColumnsIds);
                setOrderedColumns(dndOrderedColumns);
            }
        }
        // kéo xong thả ra sẽ xét lại null
        setActiveDragItemId(null);
        setActiveDragItemType(null);
        setActiveDragItemData(null);
        setOldColumnWhenDragingCard(null);
    };
    // fix lỗi dựt dựt khi kéo thả column dự chỗ
    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };
    return (
        <DndContext
            // thuật toán va chạm fix lỗi kéo card to qua card nhỏ ko đc
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <Box
                sx={{
                    p: '10px 0',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                    width: '100%',
                    height: (theme) => theme._boardcontentHeight,
                    '*::-webkit-scrollbar-track': {
                        m: '10px',
                    },
                }}
            >
                <ListColumn columns={orderedColumns} />
                <DragOverlay dropAnimation={dropAnimation}>
                    {!activeDragItemType && null}
                    {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                        <Column column={activeDragItemData} />
                    )}
                    {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                        <Card card={activeDragItemData} />
                    )}
                </DragOverlay>
            </Box>
        </DndContext>
    );
}

export default BoardContent;
