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
  const [archiveIsOpen, setArchiveIsOpen] = useState(false);

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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classNames("flex")}>
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
          </div>
          <div>
            <div
              className={classNames(
                "font-bold",
                "uppercase",
                "text-center",
                "text-primary-500",
                "mb-4"
              )}
            >
              Archiv
            </div>
            <Droppable droppableId="archived">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classNames("flex", "justify-end")}
                >
                  <div
                    className={classNames(
                      archiveIsOpen ? "w-44" : "w-0",
                      "h-[34rem]",
                      "overflow-y-scroll",
                      "overflow-hidden",
                      "transition-all"
                    )}
                  >
                    <div className={classNames("p-2")}>
                      {props.archived.map((task, i) => (
                        <Draggable
                          draggableId={task.id}
                          index={i}
                          key={task.id}
                        >
                          {(provided, snapshot) => {
                            return (
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
                            );
                          }}
                        </Draggable>
                      ))}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      snapshot.isDraggingOver
                        ? classNames("border-red-400", "text-red-400")
                        : classNames(
                            "border-gray-300",
                            "text-gray-300",
                            "hover:border-primary-500",
                            "hover:text-primary-500"
                          ),
                      "transition",
                      "flex",
                      "flex-col",
                      "justify-center",
                      "items-center",
                      "border-2",
                      "w-12",
                      "rounded",
                      "cursor-pointer"
                    )}
                    onClick={() => setArchiveIsOpen(!archiveIsOpen)}
                  >
                    <ArchiveIcon className={classNames("w-6", "h-6")} />
                    <ChevronLeftIcon
                      className={classNames(
                        archiveIsOpen && "rotate-180",
                        "w-4",
                        "h-4",
                        "transition"
                      )}
                    />
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </Box>
  );
};
