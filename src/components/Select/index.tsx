import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import _ from "lodash";
import {
  ChangeEventHandler,
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  MouseEventHandler,
  useState,
} from "react";
import { animated, useSpring } from "react-spring";
import { Button } from "../Button";

export type SelectProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  options: { label: string; value: string }[];
  search?: boolean;
};

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (props, ref) => {
    const inputProps = _.omit(props, ["options", "search"]);
    const [selected, setSelected] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const [open, setOpen] = useState(false);

    const handleButtonClick: MouseEventHandler<Element> = (e) => {
      e.preventDefault();
      setOpen(!open);
    };

    const handleOptionClick = (option: { value: string; label: string }) => {
      setSelected(option.label);
      setSearch("");
      setOpen(false);
    };

    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) =>
      setSearch(e.target.value);

    const styles = useSpring({
      maxHeight: open ? "16rem" : "0",
    });

    return (
      <div className={classNames("relative", "mb-2")}>
        <Button
          asDiv
          className={classNames(
            "bg-white",
            "hover:bg-white",
            "active:bg-white",
            "px-2",
            "py-1",
            "text-lg",
            "border-2",
            open ? "border-primary-500" : "border-gray-300",
            open ? "text-primary-500" : "text-black",
            "font-normal",
            "normal-case"
          )}
          light
          icon={
            <ChevronDownIcon
              className={classNames(open && "rotate-180", "transition")}
            />
          }
          onClick={handleButtonClick}
        >
          {selected || "Auswählen"}
        </Button>
        <animated.div
          className={classNames(
            "absolute",
            "w-full",
            "h-auto",
            "bg-white",
            "rounded-b",
            "overflow-hidden"
          )}
          style={styles}
        >
          {props.search && (
            <input
              type="text"
              value={search}
              placeholder="Suchen..."
              onChange={handleSearchChange}
              className={classNames(
                "rounded-none",
                "m-0",
                "border-0",
                "border-b",
                "border-gray-300"
              )}
            />
          )}
          <div className={classNames("overflow-y-scroll", "max-h-[10rem]")}>
            {props.options
              .filter((option) =>
                option.label.toLowerCase().includes(search.toLowerCase() || "")
              )
              .map((option, i) => (
                <div
                  key={i}
                  className={classNames("flex")}
                  onClick={() => handleOptionClick(option)}
                >
                  <input
                    ref={ref}
                    {...inputProps}
                    type="radio"
                    id={option.value}
                    value={option.value}
                    className={classNames("peer", "hidden")}
                  />
                  <label
                    htmlFor={option.value}
                    className={classNames(
                      "w-full",
                      "p-2",
                      "text-black",
                      "hover:text-white",
                      "peer-checked:text-white",
                      "normal-case",
                      "font-normal",
                      "peer-checked:font-bold",
                      "hover:bg-primary-500",
                      "peer-checked:bg-primary-500",
                      "cursor-pointer"
                    )}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
          </div>
        </animated.div>
      </div>
    );
  }
);

Select.displayName = "Select";
