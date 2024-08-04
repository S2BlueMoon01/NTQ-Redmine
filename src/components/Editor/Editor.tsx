import React, { useState, useRef } from "react";
import icons from "./icons";

const Editor = () => {
  const [text, setText] = useState<string>("");
  const [selectionStart, setSelectionStart] = useState<number>(0);
  const [selectionEnd, setSelectionEnd] = useState<number>(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTextAtCurrentLine = (textToInsert: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart ?? 0;

      const before = text.slice(0, start);
      const after = text.slice(start);

      const beforeLine = before.slice(0, before.lastIndexOf("\n") + 1);
      const currentLine = before.slice(before.lastIndexOf("\n") + 1);
      const lineEnd = currentLine.indexOf("\n") !== -1 ? currentLine.indexOf("\n") : currentLine.length;

      let newText;

      if (textToInsert === "h1. " || textToInsert === "h3. " || textToInsert === "h2. ") {
        if (
          !currentLine.startsWith(textToInsert) &&
          (currentLine.startsWith("h1. ") || currentLine.startsWith("h2. ") || currentLine.startsWith("h3. "))
        ) {
          newText = `${beforeLine}${textToInsert}${currentLine.substring(4, lineEnd)}${after}`;
        } else if (currentLine.startsWith(textToInsert)) {
          newText = `${beforeLine}${currentLine.substring(0, lineEnd)}${after}`;
        } else {
          newText = `${beforeLine}${textToInsert}${currentLine.substring(0, lineEnd)}${after}`;
        }
      } else if (textToInsert === "* " || textToInsert === "# ") {
        if ((textToInsert === "* " && currentLine.startsWith("# ")) || (textToInsert === "# " && currentLine.startsWith("* "))) {
          newText = `${beforeLine}${textToInsert}${currentLine.substring(2, lineEnd)}${after}`;
        } else {
          newText = `${beforeLine}${textToInsert}${currentLine.substring(0, lineEnd)}${after}`;
        }
      } else if (textToInsert === "> " || textToInsert === "< ") {
        if (currentLine.startsWith("> ") && textToInsert === "< ") {
          newText = `${beforeLine}${currentLine.substring(2, lineEnd)}${after}`;
        } else if (textToInsert === "< " && !currentLine.startsWith("> ")) {
          newText = `${beforeLine}${currentLine.substring(0, lineEnd)}${after}`;
        } else {
          newText = `${beforeLine}${textToInsert}${currentLine.substring(0, lineEnd)}${after}`;
        }
      } else if (textToInsert === "<pre>") {
        console.log("after", after);
        newText = `${beforeLine}${textToInsert}${currentLine.substring(0, lineEnd)}${after}</pre>`;
      } else if (textToInsert === "[[") {
        newText = `${beforeLine}${textToInsert}${currentLine.substring(0, lineEnd)}${after}]]`;
      } else {
        newText = `${beforeLine}${textToInsert}${currentLine.substring(0, lineEnd)}${after}`;
      }

      setText(newText);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = start + textToInsert.length;
          textareaRef.current.selectionEnd = start + textToInsert.length;
        }
      }, 0);
      // Chèn ký tự vào đầu dòng hiện tại
    }
  };

  const formatText = (prefix: string) => {
    const start = selectionStart;
    const end = selectionEnd;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newText = selected ? `${before}${prefix}${selected}${prefix}${after}` : `${before}${prefix}${prefix}${after}`;

    setText(newText);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.selectionStart = start + 2;
        textareaRef.current.selectionEnd = start + 2;
      }
    }, 0);
  };

  const itemToolbar = [
    {
      label: "Bold",
      icon: icons.bold,
      action: () => formatText("*"),
    },
    {
      label: "Italic",
      icon: icons.italic,
      action: () => formatText("_"),
    },
    {
      label: "Underline",
      icon: icons.underline,
      action: () => formatText("+"),
    },
    {
      label: "Delete",
      icon: icons.del,
      action: () => formatText("-"),
    },
    {
      label: "Code",
      icon: icons.code,
      action: () => formatText("@"),
    },
    {
      label: "Heading1",
      icon: icons.heading1,
      action: () => insertTextAtCurrentLine("h1. "),
    },
    {
      label: "Heading2",
      icon: icons.heading2,
      action: () => insertTextAtCurrentLine("h2. "),
    },
    {
      label: "Heading3",
      icon: icons.heading3,
      action: () => insertTextAtCurrentLine("h3. "),
    },
    {
      label: "UnOrderList",
      icon: icons.unorderedList,
      action: () => insertTextAtCurrentLine("* "),
    },
    {
      label: "OrderList",
      icon: icons.orderedList,
      action: () => insertTextAtCurrentLine("# "),
    },
    {
      label: "TextRight",
      icon: icons.rightAlign,
      action: () => insertTextAtCurrentLine("> "),
    },
    {
      label: "TextLeft",
      icon: icons.leftAlign,
      action: () => insertTextAtCurrentLine("< "),
    },
    {
      label: "TextPre",
      icon: icons.pre,
      action: () => insertTextAtCurrentLine("<pre>"),
    },
    {
      label: "Link",
      icon: icons.link,
      action: () => insertTextAtCurrentLine("[["),
    },
    {
      label: "Image",
      icon: icons.image,
      action: () => formatText("!"),
    },
    {
      label: "Help",
      icon: icons.help,
      action: () => {
        const width = 400;
        const height = 300;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(
          "https://redmine.ntq.solutions/help/en/wiki_syntax.html",
          "_blank",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );
      },
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectionStart(e.target.selectionStart ?? 0);
    setSelectionEnd(e.target.selectionEnd ?? 0);
  };
  return (
    <>
      <div className="ml-2" style={{ width: "calc(100% - 225px)" }}>
        <div className="pb-1.5 flex items-center gap-1">
          {itemToolbar.map((item) => {
            return (
              <button
                key={item.label}
                className="border bg-[#f7f7f7] hover:bg-[#e5e5e5] w-6 h-6 flex items-center justify-center"
                onClick={item.action}
              >
                <img src={item.icon} alt={item.label} className="" />
              </button>
            );
          })}
        </div>

        <textarea
          ref={textareaRef}
          name=""
          id="textareaEdit"
          className="border w-full h-36 px-1 text-sm"
          value={text}
          onChange={handleChange}
          onSelect={handleSelect}
        ></textarea>
      </div>
    </>
  );
};

export default Editor;
