import React from 'react';
import { FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <section>
      <div className="flex justify-center text-sm mb-2">
        <h3 className="flex gap-1 dark:text-white">
          Made By
          <a
            href="https://github.com/azboss2021/sorting-practice"
            target="#"
            className="flex gap-2 items-center"
          >
            Caleb Wilson <FaGithub className="inline text-xl" />
          </a>
        </h3>
      </div>
    </section>
  );
}

export default Footer;
