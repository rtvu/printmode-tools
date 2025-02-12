import { Fragment, ReactNode, useEffect, useState } from "react";

export type TabsProps = {
  children: ReactNode | ReactNode[];
  tabs: string[];
};

export function Tabs({ children, tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const moveLeftHandler = (event: KeyboardEvent) => {
      if (!event.altKey && event.ctrlKey && !event.metaKey && event.shiftKey && event.key === "ArrowLeft") {
        setActiveIndex((activeIndex) => (tabs.length + activeIndex - 1) % tabs.length);
      }
    };

    const moveRightHandler = (event: KeyboardEvent) => {
      if (!event.altKey && event.ctrlKey && !event.metaKey && event.shiftKey && event.key === "ArrowRight") {
        setActiveIndex((activeIndex) => (activeIndex + 1) % tabs.length);
      }
    };

    window.addEventListener("keydown", moveLeftHandler);
    window.addEventListener("keydown", moveRightHandler);

    return () => {
      window.removeEventListener("keydown", moveLeftHandler);
      window.removeEventListener("keydown", moveRightHandler);
    };
  }, [tabs, setActiveIndex]);

  let renderedChildren = children;
  if (Array.isArray(children)) {
    renderedChildren = children.map((child, index) => {
      if (index === activeIndex) {
        return <div key={index}>{child}</div>;
      } else {
        return (
          <div key={index} className="hidden">
            {child}
          </div>
        );
      }
    });
  }

  return (
    <Fragment>
      <div role="tablist" className="tabs tabs-lift tabs-lg">
        {tabs.map((tab, index) => (
          <a
            role="tab"
            key={tab}
            className={`tab ${activeIndex === index ? "tab-active" : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab}
          </a>
        ))}
        <span className="border-base-300 grow border-b"></span>
      </div>
      {renderedChildren}
    </Fragment>
  );
}
