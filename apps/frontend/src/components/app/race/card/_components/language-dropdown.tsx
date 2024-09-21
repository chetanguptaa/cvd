import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { snippetLanguages } from "@/config/languages";

const LanguageDropdown = ({
  className,
  value,
  onChange,
}: {
  className?: string;
  value: string;
  onChange: (props: React.SetStateAction<string>) => void;
}) => {
  useEffect(() => {
    const savedCodeLanguage = window.localStorage.getItem("codeLanguage");
    if (savedCodeLanguage) {
      onChange(savedCodeLanguage);
    }
  }, []);

  return (
    <div
      role="combobox"
      className={cn(
        "justify-between flex w-full h-10 items-center px-4 py-3 border border-black",
        className
      )}
      data-cy="language-dropdown"
    >
      <p>
        {value ?
          snippetLanguages.find((language) => language.value === value)?.label
        : "Select language..."}
      </p>
      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
    </div>
  );
};

export default LanguageDropdown;
