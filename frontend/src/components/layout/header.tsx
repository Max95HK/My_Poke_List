/**
 * Node modules
 */
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/**
 * Assets
 */
import { pokeLogoMd } from '@/assets';

/**
 * Motion variants
 */
import {
  menuVariants,
  navItemVariants,
  navVariants
} from '@/variants';

/**
 * Constant
 */
import { navLinks } from '@/constants';
import { NavLink } from 'react-router';
import PokeButton from '../poke-button';

const Header = () => {
  const [menuBtnPos, setMenuBtnPos] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);

  const menuBtnRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateMenuBtnPos = () => {
      if (menuBtnRef.current) {
        const menuBtnRect = menuBtnRef.current.getBoundingClientRect();

        setMenuBtnPos({
          x: menuBtnRect.left + menuBtnRect.width / 2,
          y: menuBtnRect.top + menuBtnRect.height / 2,
        });
      }
    };

    updateMenuBtnPos();
    window.addEventListener('resize', updateMenuBtnPos);

    return () => window.removeEventListener('resize', updateMenuBtnPos);
  }, []);

  return (
    <>
      <header className='fixed top-0 left-0 w-full h-30 z-50 py-4 flex items-center'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <img
              src={pokeLogoMd}
              width={150}
              height={150}
              alt='Logo pokémon'
            />

            <PokeButton
              ref={menuBtnRef}
              onClick={() => setIsOpen((presIsOpen) => !presIsOpen)}
              isOpen={isOpen}
            />
          </div>
        </div>
      </header>

      <motion.div
        custom={menuBtnPos}
        className='fixed inset-0 bg-foreground z-40'
        variants={menuVariants}
        animate={isOpen ? 'open' : 'closed'}
      >
        <div className='container h-full'>
          <motion.ul
            variants={navVariants}
            className='flex h-1/2 flex-col justify-center items-center mt-30 gap-4 w-full'
          >
            {navLinks.map(({ label, to }) => (
              <motion.li
                key={label}
                variants={navItemVariants}
                className='nav-link-wrapper max-w-3xl w-full'
              >
                <NavLink
                  to={to}
                  className='nav-link'
                >
                  <span className='relative z-10'>{label}</span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
