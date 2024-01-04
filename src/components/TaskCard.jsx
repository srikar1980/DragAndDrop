import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ text, category, index }) => {
  const id = `${category}-${index}`;
  const draggableId = `task-${id}`;

  const taskCardStyle = {
    background: "#EDFED7",
    height: "40px",
    borderRadius: "8px",
    border: "1.2px solid #71CA00",
    padding: "8px 10px",
    marginBottom: "8px",
  };

  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided?.innerRef}
          {...provided?.draggableProps}
          {...provided?.dragHandleProps}
        >
          <div style={taskCardStyle}>{text}</div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
