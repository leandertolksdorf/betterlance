import { ArchiveIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import classNames from "classnames";

import { useState } from "react";
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
import { Modal } from "../Modal";

type KanbanBoardViewProps = {
  todo: definitions["task"][];
  inProgress: definitions["task"][];
  done: definitions["task"][];
  archived: definitions["task"][];
  onDropTask: (
    taskId: string,
    column: definitions["task"]["state"],
    index: number
  ) => void;
};

export const KanbanBoardView = (props: KanbanBoardViewProps) => {
  const [archiveOpen, setArchiveOpen] = useState(false);
  const onDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (result.destination) {
      props.onDropTask(
        result.draggableId,
        result.destination.droppableId as definitions["task"]["state"],
        result.destination.index
      );
    }
  };

  const onDragEndArchive = (
    result: DropResult,
    provided: ResponderProvided
  ) => {
    props.onDropTask(
      result.draggableId,
      (result.destination?.droppableId ||
        "todo") as definitions["task"]["state"],
      result.destination?.index || 0
    );
  };

  return (
    <>
      <Modal
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        title={"Archiv"}
      >
        <DragDropContext onDragEnd={onDragEndArchive}>
          <Droppable droppableId="archived">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {props.archived.map((task, i) => (
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
                          isOutside={snapshot.draggingOver !== "archived"}
                          isDropping={snapshot.isDropAnimating}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Modal>
      <Box>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classNames("grow", "grid", "grid-cols-3")}>
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
                Offen
              </div>
              <Droppable droppableId="todo">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classNames(
                      snapshot.isDraggingOver && "bg-primary-200",
                      "rounded",
                      "p-2",
                      "transition",
                      "h-[34rem]",
                      "overflow-y-scroll"
                    )}
                  >
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
                    className={classNames(
                      "h-[34rem]",
                      "overflow-y-scroll",
                      "rounded",
                      "p-2",
                      "transition",
                      snapshot.isDraggingOver && "bg-primary-200"
                    )}
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
                    className={classNames(
                      "h-[34rem]",
                      "overflow-y-scroll",
                      "rounded",
                      "p-2",
                      "transition",
                      snapshot.isDraggingOver && "bg-primary-200"
                    )}
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
            <div className={classNames("col-span-full")}>
              <Droppable droppableId="archived">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={classNames("p-2")}
                  >
                    <div
                      className={classNames(
                        snapshot.isDraggingOver
                          ? classNames("bg-red-200", "text-red-500")
                          : classNames(
                              "bg-gray-200",
                              "text-gray-500",
                              "hover:bg-primary-200",
                              "hover:text-primary-500"
                            ),
                        "transition",
                        "flex",
                        "flex-col",
                        "justify-center",
                        "items-center",
                        "h-16",
                        "rounded",
                        "cursor-pointer",
                        "font-bold"
                      )}
                      onClick={() => setArchiveOpen(true)}
                    >
                      <ArchiveIcon className={classNames("w-6", "h-6")} />
                      Archiv
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </Box>
    </>
  );
};
