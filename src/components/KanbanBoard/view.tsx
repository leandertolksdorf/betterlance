import classNames from "classnames";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import { definitions } from "../../types/supabase";
import { Box } from "../Box";
import { KanbanBoardTask } from "../KanbanBoardTask";

type KanbanBoardViewProps = {
  todo: definitions["task"][];
  inProgress: definitions["task"][];
  done: definitions["task"][];
  onDropTask: (
    taskId: string,
    column: definitions["task"]["state"],
    index: number
  ) => void;
};

export const KanbanBoardView = (props: KanbanBoardViewProps) => {
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (result.destination) {
      props.onDropTask(
        result.draggableId,
        result.destination.droppableId as definitions["task"]["state"],
        result.destination.index
      );
    }
  };

  return (
    <Box>
      <div
        className={classNames("grid", "gap-4", "grid-cols-3", "min-h-[34rem]")}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classNames("col-span-1")}>
            <div
              className={classNames(
                "font-bold",
                "uppercase",
                "text-center",
                "text-primary-500",
                "mb-4"
              )}
            >
              Offen
            </div>
            <Droppable droppableId="todo">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {props.todo.map((task, i) => (
                    <Draggable draggableId={task.id} index={i} key={task.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanBoardTask
                            task={task}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className={classNames("col-span-1", "flex", "flex-col")}>
            <div
              className={classNames(
                "font-bold",
                "uppercase",
                "text-center",
                "text-primary-500",
                "mb-4"
              )}
            >
              In Bearbeitung
            </div>

            <Droppable droppableId="in_progress">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classNames("grow")}
                >
                  {props.inProgress.map((task, i) => (
                    <Draggable draggableId={task.id} index={i} key={task.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanBoardTask
                            task={task}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className={classNames("col-span-1", "flex", "flex-col")}>
            <div
              className={classNames(
                "font-bold",
                "uppercase",
                "text-center",
                "text-primary-500",
                "mb-4"
              )}
            >
              Erledigt
            </div>
            <Droppable droppableId="done">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classNames("grow")}
                >
                  {props.done.map((task, i) => (
                    <Draggable draggableId={task.id} index={i} key={task.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <KanbanBoardTask
                            task={task}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </Box>
  );
};