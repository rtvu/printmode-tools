import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useId, useState } from "react";

import { ColorantDictionary } from "./components/ColorantDictionary";
import { KeyboardShortcuts } from "./components/KeyboardShortcuts";

type ModalContent = "KeyboardShortcuts" | "ColorantDictionary";

function showModal(id: string, modalContent: ModalContent, setState: Dispatch<SetStateAction<ModalContent>>) {
  const element = document.getElementById("modal-" + id);
  if (element instanceof HTMLDialogElement) {
    setState(modalContent);
    element.showModal();
  }
}

export type ModalManagerProps = {
  className?: string;
};

export function ModalManager({ className }: ModalManagerProps) {
  const id = useId();
  const [modalContent, setModalContent] = useState<ModalContent>("KeyboardShortcuts");

  useEffect(() => {
    const keyboardShortcutsHandler = (event: KeyboardEvent) => {
      if (!event.altKey && event.ctrlKey && !event.metaKey && event.shiftKey && event.key === "/") {
        showModal(id, "KeyboardShortcuts", setModalContent);
      }
    };

    const colorantDictionaryHandler = (event: KeyboardEvent) => {
      if (!event.altKey && event.ctrlKey && !event.metaKey && event.shiftKey && event.key === "Enter") {
        showModal(id, "ColorantDictionary", setModalContent);
      }
    };

    window.addEventListener("keydown", keyboardShortcutsHandler);
    window.addEventListener("keydown", colorantDictionaryHandler);

    return () => {
      window.removeEventListener("keydown", keyboardShortcutsHandler);
      window.removeEventListener("keydown", colorantDictionaryHandler);
    };
  }, [id, setModalContent]);

  const onClickButton = () => {
    showModal(id, "KeyboardShortcuts", setModalContent);
  };

  let renderedModal: ReactNode = <KeyboardShortcuts />;
  if (modalContent === "ColorantDictionary") {
    renderedModal = <ColorantDictionary />;
  }

  return (
    <Fragment>
      <button className={className} onClick={onClickButton}>
        ?
      </button>
      <dialog id={"modal-" + id} className="modal">
        <div className="modal-box max-w-[800px] p-0">{renderedModal}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Fragment>
  );
}
