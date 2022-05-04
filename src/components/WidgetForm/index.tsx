import { CloseButton } from "../CloseButton";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypesStep } from "./Steps/FeedbackTypesStep";
import { FeedbackContentStep } from "./Steps/FeedebackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagen de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagen de uma lampada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagen de balão de pensamento"
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {


  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedBack() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }


  return (
    <div
      className={`
      bg-zinc-900
      p-4
      relative
      rounded-2xl
      mb-4
      flex
      flex-col
      items-center
      shadow-lg
      w-[calc(100vw-2rem)]
      md:w-auto
    `}>
      {
        feedbackSent ? (
          <FeedbackSucessStep handleRestartFeedBack={handleRestartFeedBack} />
        ) :
          !feedbackType ? (
            <FeedbackTypesStep setFeedbackType={setFeedbackType} />
          )
            : (
              <FeedbackContentStep
                feedbackType={feedbackType}
                handleRestartFeedBack={handleRestartFeedBack}
                onFeedbackSent={() => setFeedbackSent(true)}
              />
            )
      }




      <footer
        className={`
       text-xs
       text-neutral-400
      `}
      >
        Feito com ♥ pela
        <a
          href="https://rocketseat.com.br"
          target="_blank"
          className={`
          underline
          underline-offset-2
          `}
        >
          Rocketseat
        </a>
      </footer>
    </div>
  )
}