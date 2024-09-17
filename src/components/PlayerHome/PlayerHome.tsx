'use client';
import NextNProgress from 'nextjs-progressbar';
import Link from "next/link";
import screenfull from "screenfull";
import Image from "next/image";
import styles from './styles/PlayerHome.module.scss';
import Classname from "@/utils/models/classname";

const buttonClassname = new Classname(styles.playerHomeButton);
buttonClassname.addIf('btn');
buttonClassname.addIf('btn--accent');

const PlayerHome = () => {
  const handlerClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log('uru');
    e.preventDefault();
console.log('uru');
    const popupWin = window.open(
      'https://thatsnotmyneighbor.online/',
      'uchet',
      'location, width=1300,height=730, left=150, top=0, toolbar=0, directories=0, status=0, scrollbars=0, menubar=0, fullscreen=0, resizable=0'
    );
    if (popupWin) {
      popupWin.focus();
      return false;
    }
  }

  return (
    <div
      className={styles.playerHome}
    >
      <Image
        src="/home.webp"
        alt="Thats not my neighbor"
        width="880"
        height="495"
        className={styles.playerHomeImage}
      />
      <div className={styles.playerHomeContent}>
        <Link
          href="#"
          className={buttonClassname.toString()}
          title="Fullscreen"
          onClick={(e) => handlerClick(e)}
        >
          Play
        </Link>
      </div>
    </div>
  );
};

export default PlayerHome;