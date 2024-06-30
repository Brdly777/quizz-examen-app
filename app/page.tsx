'use client';

import { button as buttonStyles } from '@nextui-org/theme';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '@nextui-org/button';
import RulesModal from '@/components/rules-modal';
import { useDisclosure } from '@nextui-org/modal';
import { title, subtitle } from '@/components/primitives';
import confetti from 'canvas-confetti';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onOpen();
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Examen&nbsp;</h1>
        <h1 className={title({ color: 'cyan' })}>Quizz&nbsp;</h1>
        <br />
        <h2 className={subtitle({ class: 'mt-4 mb-20' })}>
          Haz click en el botón de abajo para iniciar con tu Quizz.
        </h2>
      </div>

      <div className="flex">
        <Button
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
          onPress={handleConfetti}
        >
          Empezar Quizz
          <FaArrowRight size={20} />
        </Button>
        <RulesModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </section>
  );
}
