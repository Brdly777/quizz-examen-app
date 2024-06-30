'use client';

import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function RulesModal({ isOpen, onOpenChange }) {
  const router = useRouter();

  const handleStart = () => {
    router.push('/questions');
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" placement="center">
      <ModalContent className="5xl">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 font-bold">Reglas</ModalHeader>
            <ModalBody>
              <p>1. Solo tendrás 15 segundos para responder cada pregunta.</p>
              <p>2. Una vez que seleccionas tu respuesta, no se puede deshacer.</p>
              <p>3. No puedes seleccionar ninguna opción una vez que se acaba el tiempo.</p>
              <p>4. No puedes salir del Quizz mientras está corriendo el tiempo.</p>
              <p>5. Obtendrás puntos con base en tus respuestas correctas.</p>
            </ModalBody>
            <ModalFooter className="mt-4">
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" variant="solid" onPress={handleStart}>
                Empezar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}