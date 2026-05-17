/**
 * Node modules
 */
import { useAnimate } from 'motion/react';
import { useEffect } from 'react';

type PokeButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  ref?: React.Ref<SVGSVGElement>;
} & Omit<React.ComponentProps<'button'>, 'ref'>;

const PokeButton = ({ isOpen, onClick, ref }: PokeButtonProps) => {
  const [scope, animate] = useAnimate();

 useEffect(() => {
    animate(
      '[data-top]',
      { translateY: isOpen ? -22 : 0 },
      { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    );
  }, [isOpen]);

  return (
    <button
      ref={scope}
      onClick={onClick}
      aria-label={isOpen ? 'Chiudi il menu' : 'Apri il menu'}
      className='cursor-pointer'
    >
      <svg
        ref={ref}
        viewBox='0 0 100 100'
        width='44'
        height='44'
        overflow='visible'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <clipPath id='clip-top'>
            <rect
              x='0'
              y='0'
              width='100'
              height='53'
            />
          </clipPath>
          <clipPath id='clip-bottom'>
            <rect
              x='0'
              y='53'
              width='100'
              height='47'
            />
          </clipPath>
        </defs>

        <g clipPath='url(#clip-bottom)'>
          <circle
            cx='50'
            cy='50'
            r='44'
            fill='#f0f0f0'
          />
          <circle
            cx='50'
            cy='50'
            r='44'
            fill='none'
            stroke='#1a1a1a'
            strokeWidth='3'
          />
        </g>

        <g
          data-top
          clipPath='url(#clip-top)'
        >
          <circle
            cx='50'
            cy='50'
            r='44'
            fill='#e53e3e'
          />
          <circle
            cx='50'
            cy='50'
            r='44'
            fill='none'
            stroke='#1a1a1a'
            strokeWidth='3'
          />
          <ellipse
            cx='35'
            cy='30'
            rx='8'
            ry='5'
            fill='white'
            opacity={0.2}
            transform='rotate(-20 35 30)'
          />
        </g>

        <g data-top>
          <rect
            x='4'
            y='47'
            width='92'
            height='6'
            fill='#1a1a1a'
            rx='1'
          />
          <circle
            cx='50'
            cy='50'
            r='11'
            fill='#1a1a1a'
          />
          <circle
            cx='50'
            cy='50'
            r='8'
            fill='#f0f0f0'
          />
          <circle
            cx='50'
            cy='50'
            r='5'
            fill='white'
            stroke='#aaa'
            strokeWidth='1'
          />
        </g>
      </svg>
    </button>
  );
};

export default PokeButton;
