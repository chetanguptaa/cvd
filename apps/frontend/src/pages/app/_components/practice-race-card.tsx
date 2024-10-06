import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import LanguageDropdown from "./language-dropdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PracticeRaceCard() {
  const [selectedPracticeLanguage, setSelectedPracticeLanguage] =
    useState("go");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSetCodeLanguage(props: SetStateAction<string>) {
    setSelectedPracticeLanguage(props);
    setError("");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (!selectedPracticeLanguage)
      return setError("please select a language to practice");
    navigate(
      `/race/practice?lang=${encodeURIComponent(selectedPracticeLanguage)}`
    );
  }

  return (
    <Card
      className="flex flex-col justify-between flex-1 border-2 border-warning"
      data-cy="practice-card"
    >
      <CardHeader>
        <div className="grid text-center place-content-center">
          <Target className="justify-self-center" size={40} />
          <h2 className="text-3xl font-bold text-warning font-special">
            Practice
          </h2>
          <p className="font-light">
            Practice typing with a random snippet from your snippets
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid items-start grid-cols-subgrid gap-1"
        >
          <div className="flex flex-col">
            <LanguageDropdown
              className={cn(error && "border-red-500")}
              value={selectedPracticeLanguage}
              onChange={handleSetCodeLanguage}
            />
            <span className="text-red-500">{error}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-red-500">{error}</span>
          </div>
          <Button
            variant={"ghost"}
            className="relative justify-start border"
            data-cy="practice-button"
          >
            Practice{" "}
            <ArrowRight
              size="20"
              className="absolute -translate-y-1/2 right-4 top-1/2"
            />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
