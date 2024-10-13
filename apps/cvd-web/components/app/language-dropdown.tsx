"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { snippetLanguages } from "@/lib/languages";
import { ChevronsUpDown } from "lucide-react";

const LanguageDropdown = ({
  className,
  value,
}: {
  className?: string;
  value: string;
  onChange: (props: React.SetStateAction<string>) => void;
}) => {
  // TODO add more languages
  if (!window) return;
  window.localStorage.setItem("codeLanguage", "go");
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
