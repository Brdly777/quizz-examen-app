'use client';

import { button as buttonStyles } from '@nextui-org/theme';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '@nextui-org/button';
import RulesModal from '@/components/rules-modal';
import { useDisclosure } from '@nextui-org/modal';

import { title, subtitle } from '@/components/primitives';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Examen&nbsp;</h1>
        <h1 className={title({ color: 'cyan' })}>Quizz&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: 'mt-4' })}>
          Haz click en el botón de abajo para iniciar tu examen.
        </h2>
      </div>

      <div className="flex">
        <Button
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
          onPress={onOpen}
        >
          Empezar Examen
          <FaArrowRight size={20} />
        </Button>
        <RulesModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
}