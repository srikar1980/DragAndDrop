import React from "react";
import { useTaskContext } from "./TaskContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Container, Row, Col, Card } from "react-bootstrap";
import Title from "./Header";

const TaskManager = () => {
  const { taskState, updateTaskState } = useTaskContext();

  const levelStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
    background: "#71CA00",
    height: "155px",
    borderRadius: "8px",
    padding: "8px",
    color: "#ffffff",
  };

  const skillsSelectedStyle = {
    background: "#CAD7F2",
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const updatedState = { ...taskState };

    const sourceTasks = Array.from(
      updatedState.categories[source.droppableId] || []
    );
    const destinationTasks = Array.from(
      updatedState.priorities[destination.droppableId] || []
    );

    const movedTask = sourceTasks.splice(source.index, 1)[0];
    destinationTasks.splice(destination.index, 0, movedTask);

    updatedState.categories[source.droppableId] = sourceTasks;
    updatedState.priorities[destination.droppableId] = destinationTasks;

    updateTaskState(updatedState);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container fluid>
        <Row className="d-flex justify-content-center mt-3 mb-3">
          <Col md={4}>
            <div className="flex-fill">
              <Title title="School Level" />
              <Card className="mb-3">
                <Card.Body style={levelStyle}>
                  <Card.Title>Level 0</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>

          <Col md={4} className="d-flex">
            <div className="flex-fill">
              <Title title="Skills Selected" />

              {Object.keys(taskState.categories).map((category) => (
                <Droppable
                  key={category}
                  droppableId={category}
                  direction="vertical"
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <Card className="mb-3">
                        <Card.Body style={skillsSelectedStyle}>
                          <Card.Title>{category}</Card.Title>
                          {taskState.categories[category].map((task, index) => (
                            <TaskCard
                              key={`${category}-${index}`}
                              text={task}
                              category={category}
                              index={index}
                            />
                          ))}
                        </Card.Body>
                      </Card>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </Col>

          <Col md={4} className="d-flex">
            <div className="flex-fill">
              <Title title="Set Skill Priority" />

              <Droppable droppableId="priorities" direction="vertical">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Card className="mb-3">
                      <Card.Body>
                        {Object.keys(taskState.priorities).map(
                          (priority, index) => (
                            <Draggable
                              key={priority}
                              draggableId={priority}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card className="mb-2">
                                    <Card.Body>
                                      <Card.Title>{priority}</Card.Title>
                                      <Droppable
                                        droppableId={priority}
                                        direction="vertical"
                                      >
                                        {(provided) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                          >
                                            {taskState.priorities[priority].map(
                                              (task, index) => (
                                                <TaskCard
                                                  key={task}
                                                  id={task}
                                                  text={task}
                                                  category={priority}
                                                  index={index}
                                                />
                                              )
                                            )}
                                            {provided.placeholder}
                                          </div>
                                        )}
                                      </Droppable>
                                    </Card.Body>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          )
                        )}
                      </Card.Body>
                    </Card>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </Col>
        </Row>
      </Container>
    </DragDropContext>
  );
};

export default TaskManager;
