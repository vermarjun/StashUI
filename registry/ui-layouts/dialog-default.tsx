'use client';
import { FramerModal, ModalContent } from '@/registry/ui-layouts/dialog';
import type React from 'react';
import { useState } from 'react';

const DialogDefault: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className=' h-full flex justify-center items-center'>
      <button
        onClick={() => setModalOpen(true)}
        className='h-11 rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
      >
        Open Dialog
      </button>

      <FramerModal open={modalOpen} setOpen={setModalOpen}>
        <ModalContent>
          <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
            <h2 className='text-lg font-semibold leading-none tracking-tight'>Edit profile</h2>
            <p className='text-sm text-muted-foreground'>
              Make changes to your profile here. Click save when you're done.
            </p>
          </div>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label className='text-sm font-medium leading-none text-right'>Name</label>
              <input
                className='flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3'
                id='name'
                defaultValue='Pedro Duarte'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label className='text-sm font-medium leading-none text-right'>Username</label>
              <input
                className='flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 col-span-3'
                id='username'
                defaultValue='@peduarte'
              />
            </div>
          </div>
          <div className='mt-4'>
            <button
              onClick={() => setModalOpen(false)}
              className='w-full rounded-md bg-primary p-3 text-primary-foreground'
              type='button'
            >
              Got it, thanks!
            </button>
          </div>
        </ModalContent>
      </FramerModal>
    </div>
  );
};

export default DialogDefault;
