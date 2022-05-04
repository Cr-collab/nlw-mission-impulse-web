import html2canvas from "html2canvas";
import { backgroundPosition } from "html2canvas/dist/types/css/property-descriptors/background-position";
import { image } from "html2canvas/dist/types/css/types/image";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";

interface ScreenButtonProps {
  setScreenshot: (base64image: string | null) => void
  screenshot: string | null
}

export function ScreenshotButton({ setScreenshot, screenshot }: ScreenButtonProps) {

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)
    const canvas = await html2canvas(document.querySelector('html')!);

    const base64image = canvas.toDataURL('image/png');
    // reprensentação em texto da nossa imagem 

    setScreenshot(base64image);
    setIsTakingScreenshot(false)
  }


  if (screenshot) {
    return (
      <button
        type="button"
        className={`
          p-1 w-10 h-10
          rounded-md  flex
          border-transparent
          justify-end items-end
          text-zinc-400 
          hover:text-zinc-100
          transition-colors
        `}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 145
        }}
        onClick={() => setScreenshot(null)}
      >

        <Trash
          weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className={`
      p-2
      bg-zinc-800
      rounded-md
      border-trasparent
      hover:bg-zinc-700
      transition-colors
      focus:outline-none focus:ring-2
      focus:ring-offset-2 focus:ring-brand-500
      focus:ring-offset-zinc-900
      transition-colors
    `}
    >
      {isTakingScreenshot ? (
        <Loading />
      ) : (
        <Camera
          className="w-6 h-6"
        />
      )
      }
    </button>
  )
}