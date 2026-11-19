'use client';

import { Drawer } from 'vaul';

export default function MyDrawer() {
  return (
    <div className='flex justify-center'>
      <Drawer.Root shouldScaleBackground>
        <Drawer.Trigger asChild>
          <button className='inline-flex h-11 w-fit mx-auto items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'>
            Open Drawer
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className='fixed inset-0 bg-black/60' />
          <Drawer.Content className='bg-card border-t border-border flex flex-col rounded-t-[16px] mt-24 h-[78%] fixed bottom-0 left-0 right-0 outline-none'>
            <div className='p-4 bg-card rounded-t-[16px] flex-1'>
              <div className='mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted mb-8' />
              <div className='max-w-md mx-auto'>
                <Drawer.Title className='font-medium mb-4 text-foreground'>Drawer for React.</Drawer.Title>
                <p className='text-muted-foreground mb-2'>
                  This component can be used as a Dialog replacement on mobile and tablet devices.
                </p>
                <p className='text-muted-foreground mb-2'>
                  It comes unstyled and has gesture-driven animations.
                </p>
                <p className='text-muted-foreground mb-6'>
                  It uses{' '}
                  <a
                    href='https://www.radix-ui.com/docs/primitives/components/dialog'
                    className='underline'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    Radix&rsquo;s Dialog primitive
                  </a>{' '}
                  under the hood and is inspired by{' '}
                  <a
                    href='https://twitter.com/devongovett/status/1674470185783402496'
                    className='underline'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    this tweet.
                  </a>
                </p>
                <Drawer.NestedRoot>
                  <Drawer.Trigger className='rounded-md mb-6 w-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600'>
                    Open Second Drawer
                  </Drawer.Trigger>
                  <Drawer.Portal>
                    <Drawer.Overlay className='fixed inset-0 bg-black/60' />
                    <Drawer.Content className='bg-card border-t border-border flex flex-col rounded-t-[16px] mt-24 h-[70%] fixed bottom-0 left-0 right-0 outline-none'>
                      <div className='p-4 bg-card rounded-t-[16px] flex-1'>
                        <div className='mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted mb-8' />
                        <div className='max-w-md mx-auto'>
                          <Drawer.Title className='font-medium mb-4 text-foreground'>
                            This drawer is nested.
                          </Drawer.Title>
                          <p className='text-muted-foreground mb-2'>
                            Place a{' '}
                            <span className='font-mono text-[15px] font-semibold'>
                              `Drawer.NestedRoot`
                            </span>{' '}
                            inside another drawer and it will be nested automatically for you.
                          </p>
                          <p className='text-muted-foreground mb-2'>
                            You can view more examples{' '}
                            <a
                              href='https://github.com/emilkowalski/vaul#examples'
                              className='underline'
                              target='_blank'
                              rel='noreferrer noopener'
                            >
                              here
                            </a>
                            .
                            <Drawer.NestedRoot>
                              <Drawer.Trigger className='rounded-md mb-6 w-full bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600'>
                                Open third Drawer
                              </Drawer.Trigger>
                              <Drawer.Portal>
                                <Drawer.Overlay className='fixed inset-0 bg-black/60' />
                                <Drawer.Content className='bg-card border-t border-border flex flex-col rounded-t-[16px] mt-24 h-[70%] fixed bottom-0 left-0 right-0 outline-none'>
                                  <div className='p-4 bg-card rounded-t-[16px] flex-1'>
                                    <div className='mx-auto w-12 h-1.5 shrink-0 rounded-full bg-muted mb-8' />
                                    <div className='max-w-md mx-auto'>
                                      <Drawer.Title className='font-medium mb-4 text-foreground'>
                                        This drawer is nested.
                                      </Drawer.Title>
                                      <p className='text-muted-foreground mb-2'>
                                        Place a{' '}
                                        <span className='font-mono text-[15px] font-semibold'>
                                          `Drawer.NestedRoot`
                                        </span>{' '}
                                        inside another drawer and it will be nested automatically
                                        for you.
                                      </p>
                                      <p className='text-muted-foreground mb-2'>
                                        You can view more examples{' '}
                                        <a
                                          href='https://github.com/emilkowalski/vaul#examples'
                                          className='underline'
                                          target='_blank'
                                          rel='noreferrer noopener'
                                        >
                                          here
                                        </a>
                                        .
                                      </p>
                                    </div>
                                  </div>
                                  <div className='p-4 bg-muted/40 border-t border-border mt-auto'>
                                    <div className='flex gap-6 justify-end max-w-md mx-auto'>
                                      <a
                                        className='text-xs text-muted-foreground flex items-center gap-0.25'
                                        href='https://github.com/emilkowalski/vaul'
                                        target='_blank'
                                        rel='noreferrer noopener'
                                      >
                                        GitHub
                                        <svg
                                          fill='none'
                                          height='16'
                                          stroke='currentColor'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='2'
                                          viewBox='0 0 24 24'
                                          width='16'
                                          aria-hidden='true'
                                          className='w-3 h-3 ml-1'
                                        >
                                          <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
                                          <path d='M15 3h6v6'></path>
                                          <path d='M10 14L21 3'></path>
                                        </svg>
                                      </a>
                                      <a
                                        className='text-xs text-muted-foreground flex items-center gap-0.25'
                                        href='https://twitter.com/emilkowalski_'
                                        target='_blank'
                                        rel='noreferrer noopener'
                                      >
                                        Twitter
                                        <svg
                                          fill='none'
                                          height='16'
                                          stroke='currentColor'
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          strokeWidth='2'
                                          viewBox='0 0 24 24'
                                          width='16'
                                          aria-hidden='true'
                                          className='w-3 h-3 ml-1'
                                        >
                                          <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
                                          <path d='M15 3h6v6'></path>
                                          <path d='M10 14L21 3'></path>
                                        </svg>
                                      </a>
                                    </div>
                                  </div>
                                </Drawer.Content>
                              </Drawer.Portal>
                            </Drawer.NestedRoot>
                          </p>
                        </div>
                      </div>
                      <div className='p-4 bg-muted/40 border-t border-border mt-auto'>
                        <div className='flex gap-6 justify-end max-w-md mx-auto'>
                          <a
                            className='text-xs text-muted-foreground flex items-center gap-0.25'
                            href='https://github.com/emilkowalski/vaul'
                            target='_blank'
                            rel='noreferrer noopener'
                          >
                            GitHub
                            <svg
                              fill='none'
                              height='16'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              viewBox='0 0 24 24'
                              width='16'
                              aria-hidden='true'
                              className='w-3 h-3 ml-1'
                            >
                              <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
                              <path d='M15 3h6v6'></path>
                              <path d='M10 14L21 3'></path>
                            </svg>
                          </a>
                          <a
                            className='text-xs text-muted-foreground flex items-center gap-0.25'
                            href='https://twitter.com/emilkowalski_'
                            target='_blank'
                            rel='noreferrer noopener'
                          >
                            Twitter
                            <svg
                              fill='none'
                              height='16'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              viewBox='0 0 24 24'
                              width='16'
                              aria-hidden='true'
                              className='w-3 h-3 ml-1'
                            >
                              <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
                              <path d='M15 3h6v6'></path>
                              <path d='M10 14L21 3'></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.NestedRoot>
              </div>
            </div>
            <div className='p-4 bg-muted/40 border-t border-border mt-auto'>
              <div className='flex gap-6 justify-end max-w-md mx-auto'>
                <a
                  className='text-xs text-muted-foreground flex items-center gap-0.25'
                  href='https://github.com/emilkowalski/vaul'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  GitHub
                  <svg
                    fill='none'
                    height='16'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    width='16'
                    aria-hidden='true'
                    className='w-3 h-3 ml-1'
                  >
                    <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
                    <path d='M15 3h6v6'></path>
                    <path d='M10 14L21 3'></path>
                  </svg>
                </a>
                <a
                  className='text-xs text-muted-foreground flex items-center gap-0.25'
                  href='https://twitter.com/emilkowalski_'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  Twitter
                  <svg
                    fill='none'
                    height='16'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    viewBox='0 0 24 24'
                    width='16'
                    aria-hidden='true'
                    className='w-3 h-3 ml-1'
                  >
                    <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6'></path>
                    <path d='M15 3h6v6'></path>
                    <path d='M10 14L21 3'></path>
                  </svg>
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
