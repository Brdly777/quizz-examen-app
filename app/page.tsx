import { button as buttonStyles } from "@nextui-org/theme";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@nextui-org/button";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Examen&nbsp;</h1>
        <h1 className={title({ color: "cyan" })}>Quizz&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: "mt-4" })}>
          Haz click en el botón de abajo para iniciar tu examén.
        </h2>
      </div>

      <div className="flex">
        <Button
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Empezar Examen
          <FaArrowRight size={20} />
        </Button>
      </div>
    </section>
  );
}
